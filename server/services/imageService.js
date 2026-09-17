import dotenv from 'dotenv'

// Load .env initially
dotenv.config()

// Supported Aspect Ratios for Image Generation
export const SUPPORTED_ASPECT_RATIOS = ['1:1', '16:9', '9:16', '4:3', '3:4', '3:2', '2:3']

// Aspect Ratio to Pixel Dimensions Mapping
export const ASPECT_RATIO_DIMENSIONS = {
  '1:1': { width: 1024, height: 1024, size: '1024x1024' },
  '16:9': { width: 1024, height: 576, size: '1024x576' },
  '9:16': { width: 576, height: 1024, size: '576x1024' },
  '4:3': { width: 1024, height: 768, size: '1024x768' },
  '3:4': { width: 768, height: 1024, size: '768x1024' },
  '3:2': { width: 1024, height: 680, size: '1024x680' },
  '2:3': { width: 680, height: 1024, size: '680x1024' }
}

/**
 * Enhance user prompt with model-tailored aesthetic attributes
 */
function enhancePrompt(rawPrompt, selectedModel) {
  const clean = (rawPrompt || '').trim()
  if (!clean) return 'South Indian Tamil heritage temple architecture, golden hour cinematic'

  const modelLower = (selectedModel || '').toLowerCase()
  let enhancements = []

  if (modelLower.includes('pro+') || modelLower.includes('proplus') || modelLower.includes('ultra') || modelLower.includes('realism')) {
    enhancements.push('8k UHD masterpiece, shot on 85mm f/1.4 lens, natural lighting, ultra high detail, photorealistic')
  } else if (modelLower === 'pro' || modelLower.includes('pro')) {
    enhancements.push('highly detailed, professional composition, vivid lighting, sharp focus, 4k master quality')
  } else {
    enhancements.push('crisp clean details, vivid colors, aesthetic presentation, high quality')
  }

  // Detect Tamil cultural keywords and enrich with Dravidian aesthetic context
  const tamilKeywords = ['tamil', 'temple', 'gopuram', 'pongal', 'mandapam', 'tanjore', 'meenakshi', 'madurai', 'saree', 'kanjivaram', 'chola', 'pallava', 'jallikattu', 'bharatanatyam']
  const hasTamil = tamilKeywords.some(kw => clean.toLowerCase().includes(kw))
  if (hasTamil) {
    enhancements.push('authentic Tamil Dravidian cultural heritage, intricate temple stone carvings, majestic divine atmosphere')
  }

  return `${clean}, ${enhancements.join(', ')}`
}

/**
 * Fast, Accurate, Watermark-Free AI Image Generator (FLUX / Turbo Engine)
 */
async function generateFastFlux({ prompt, width = 1024, height = 1024, selectedModel = 'Basic' }) {
  const modelLower = (selectedModel || '').toLowerCase()
  let aiModel = 'flux'
  if (modelLower === 'basic' || modelLower.includes('turbo')) {
    aiModel = 'turbo'
  } else if (modelLower.includes('pro+') || modelLower.includes('realism')) {
    aiModel = 'flux-realism'
  }

  const seed = Math.floor(Math.random() * 9999999)
  const encodedPrompt = encodeURIComponent(prompt)
  
  // Notice: nologo=true ensures 100% NO WATERMARK
  const endpointUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&model=${aiModel}&nologo=true&enhance=false`

  try {
    const response = await fetch(endpointUrl)
    if (!response.ok) {
      // Fallback to flux if custom model fails
      const fallbackUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&model=flux&nologo=true`
      const fallbackRes = await fetch(fallbackUrl)
      if (!fallbackRes.ok) {
        throw new Error(`Rendering failed with status ${response.status}`)
      }
      const buf = await fallbackRes.arrayBuffer()
      const b64 = Buffer.from(buf).toString('base64')
      const contentType = fallbackRes.headers.get('content-type') || 'image/jpeg'
      return {
        imageUrl: `data:${contentType};base64,${b64}`,
        model: `FLUX (${selectedModel})`,
        provider: 'FLUX Fast Engine'
      }
    }

    const buf = await response.arrayBuffer()
    const b64 = Buffer.from(buf).toString('base64')
    const contentType = response.headers.get('content-type') || 'image/jpeg'
    return {
      imageUrl: `data:${contentType};base64,${b64}`,
      model: `${aiModel.toUpperCase()} (${selectedModel})`,
      provider: 'High-Speed Neural Engine'
    }
  } catch (err) {
    throw new Error(`Image generation error: ${err.message}`)
  }
}

/**
 * Main Image Generation Entrypoint
 */
export async function generateImage({
  prompt,
  aspectRatio = '1:1',
  selectedModel = 'Basic',
  referenceImages = []
}) {
  const cleanPrompt = (prompt || '').trim()

  if (!cleanPrompt && (!Array.isArray(referenceImages) || referenceImages.length === 0)) {
    throw new Error('A prompt text or reference image is required for image generation.')
  }

  // Incorporate reference concept / style if attached
  let promptWithRefs = cleanPrompt
  if (Array.isArray(referenceImages) && referenceImages.length > 0) {
    const refStyles = referenceImages
      .map((r) => r.styleContext || r.name)
      .filter(Boolean)
      .join(', ')
    if (refStyles && !cleanPrompt.toLowerCase().includes(refStyles.toLowerCase())) {
      promptWithRefs = `${cleanPrompt ? cleanPrompt + ', ' : ''}in the artistic visual style of ${refStyles}`
    }
  }

  const validAspectRatio = SUPPORTED_ASPECT_RATIOS.includes(aspectRatio) ? aspectRatio : '1:1'
  const mapping = ASPECT_RATIO_DIMENSIONS[validAspectRatio] || { width: 1024, height: 1024, size: '1024x1024' }
  const enhancedPromptText = enhancePrompt(promptWithRefs, selectedModel)

  const result = await generateFastFlux({
    prompt: enhancedPromptText,
    width: mapping.width,
    height: mapping.height,
    selectedModel
  })

  return {
    id: `gen_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    imageUrl: result.imageUrl,
    prompt: cleanPrompt,
    enhancedPrompt: enhancedPromptText,
    aspectRatio: validAspectRatio,
    dimensions: `${mapping.width} x ${mapping.height}`,
    model: result.model || `FLUX (${selectedModel})`,
    provider: result.provider || 'High-Speed Neural Engine (No Watermark)',
    referenceCount: referenceImages.length,
    createdAt: new Date().toISOString()
  }
}
