import dotenv from 'dotenv'
import path from 'path'

// Load .env initially
dotenv.config()

// Supported Aspect Ratios for Image Generation
export const SUPPORTED_ASPECT_RATIOS = ['1:1', '16:9', '9:16', '4:3', '3:4', '3:2', '2:3']

// Aspect Ratio to Pixel Dimensions Mapping (optimized for diffusion models within safe free boundaries)
export const ASPECT_RATIO_DIMENSIONS = {
  '1:1': { width: 512, height: 512, size: '512x512' },
  '16:9': { width: 512, height: 320, size: '512x320' },
  '9:16': { width: 320, height: 512, size: '320x512' },
  '4:3': { width: 512, height: 384, size: '512x384' },
  '3:4': { width: 384, height: 512, size: '384x512' },
  '3:2': { width: 512, height: 320, size: '512x320' },
  '2:3': { width: 320, height: 512, size: '320x512' }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Enhance user prompt with model-tailored aesthetic attributes
 */
function enhancePrompt(rawPrompt, selectedModel) {
  const clean = (rawPrompt || '').trim()
  if (!clean) return 'South Indian Tamil heritage temple architecture, golden hour cinematic'

  const modelLower = (selectedModel || '').toLowerCase()
  let enhancements = []

  if (modelLower.includes('pro+') || modelLower.includes('proplus') || modelLower.includes('pro-plus') || modelLower.includes('ultra') || modelLower.includes('realism')) {
    enhancements.push('8k UHD masterpiece, shot on Hasselblad H6D-100c, 85mm f/1.4 lens, natural lighting, ultra high detail')
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
 * Free Watermark-Free AI Image Provider using Decentralized Neural Diffusion Cluster
 * Produces clean, watermark-free images without requiring user API keys.
 */
async function generateWithFreeNeuralCore({ prompt, width = 512, height = 512, selectedModel = 'Basic' }) {
  const isPro = (selectedModel || '').toLowerCase().includes('pro')
  const models = isPro
    ? ['ICBINP - I Can\'t Believe It\'s Not Photography', 'Realistic Vision', 'Dreamshaper', 'stable_diffusion']
    : ['stable_diffusion', 'Deliberate', 'Dreamshaper', 'Altdiffusion']

  // Clamp within free anonymous limits (max 512x512, min 320x320, 64-multiples)
  const safeW = Math.max(320, Math.min(512, Math.floor(width / 64) * 64))
  const safeH = Math.max(320, Math.min(512, Math.floor(height / 64) * 64))
  const apiKey = (process.env.AI_HORDE_API_KEY || '0000000000').trim()

  console.log(`[ImageService] Generating with Free Neural Engine (${safeW}x${safeH}, model: ${selectedModel})...`)

  const postRes = await fetch('https://aihorde.net/api/v2/generate/async', {
    method: 'POST',
    headers: {
      'apikey': apiKey,
      'Content-Type': 'application/json',
      'Client-Agent': 'thamili:2.0:adrxnjr'
    },
    body: JSON.stringify({
      prompt,
      params: {
        sampler_name: 'k_euler',
        cfg_scale: 7.0,
        steps: 18,
        width: safeW,
        height: safeH
      },
      models,
      r2: true,
      nsfw: false,
      censor_nsfw: true
    })
  })

  const postData = await postRes.json()
  if (!postData.id) {
    throw new Error(`Neural cluster job creation failed: ${postData.message || JSON.stringify(postData)}`)
  }

  const jobId = postData.id
  const startTime = Date.now()

  while (Date.now() - startTime < 65000) {
    await sleep(3500)
    try {
      const checkRes = await fetch(`https://aihorde.net/api/v2/generate/check/${jobId}`, {
        headers: { 'Client-Agent': 'thamili:2.0:adrxnjr' }
      })
      const checkData = await checkRes.json()

      if (checkData.done || (checkData.finished && checkData.finished > 0)) {
        const statusRes = await fetch(`https://aihorde.net/api/v2/generate/status/${jobId}`, {
          headers: { 'Client-Agent': 'thamili:2.0:adrxnjr' }
        })
        const statusData = await statusRes.json()
        if (statusData.generations && statusData.generations.length > 0) {
          const imgUrl = statusData.generations[0].img
          const imgFetch = await fetch(imgUrl)
          const buf = await imgFetch.arrayBuffer()
          const b64 = Buffer.from(buf).toString('base64')
          const contentType = imgFetch.headers.get('content-type') || 'image/webp'
          const dataUrl = `data:${contentType};base64,${b64}`

          return {
            imageUrl: dataUrl,
            rawUrl: dataUrl,
            model: `Thamili ${selectedModel || 'Basic'} AI (${statusData.generations[0].model || 'Neural Diffusion'})`,
            provider: 'Thamili Free Neural Core (No Watermark)'
          }
        }
      }
    } catch {
      // Continue loop on transient network hiccup
    }
  }
  throw new Error('Image generation timed out. Please retry.')
}

/**
 * Main Image Generation Entrypoint
 * Dedicated solely to the 100% free, clean, watermark-free neural engine
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

  const validAspectRatio = SUPPORTED_ASPECT_RATIOS.includes(aspectRatio) ? aspectRatio : '1:1'
  const mapping = ASPECT_RATIO_DIMENSIONS[validAspectRatio] || { width: 512, height: 512, size: '512x512' }
  const enhancedPromptText = enhancePrompt(cleanPrompt, selectedModel)

  let result = null
  let lastError = null

  try {
    result = await generateWithFreeNeuralCore({
      prompt: enhancedPromptText,
      width: mapping.width,
      height: mapping.height,
      selectedModel
    })
  } catch (err) {
    console.warn(`[ImageService] Primary attempt failed (${err.message}). Retrying with simplified prompt...`)
    lastError = err

    try {
      result = await generateWithFreeNeuralCore({
        prompt: cleanPrompt,
        width: mapping.width,
        height: mapping.height,
        selectedModel: 'Basic'
      })
    } catch (retryErr) {
      lastError = retryErr
    }
  }

  if (!result) {
    throw new Error(`Image generation failed: ${lastError?.message || 'Neural engine unavailable'}`)
  }

  return {
    id: `gen_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    imageUrl: result.imageUrl,
    prompt: cleanPrompt,
    enhancedPrompt: result.enhancedPrompt || enhancedPromptText,
    aspectRatio: validAspectRatio,
    dimensions: `${mapping.width} x ${mapping.height}`,
    model: result.model || `Thamili ${selectedModel} AI`,
    provider: result.provider || 'Thamili Neural Engine',
    referenceCount: referenceImages.length,
    createdAt: new Date().toISOString()
  }
}
