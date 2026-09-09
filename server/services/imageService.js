import { GoogleGenAI } from '@google/genai'
import dotenv from 'dotenv'
import path from 'path'

// Load .env initially
dotenv.config()

// Supported Aspect Ratios for Gemini Image Generation
export const SUPPORTED_ASPECT_RATIOS = ['1:1', '16:9', '9:16', '4:3', '3:4', '3:2', '2:3']

/**
 * Parses image input (Data URLs or raw base64) into mimeType & base64 data
 * Supports:
 * - data:image/png;base64,...
 * - data:image/jpeg;base64,...
 * - data:image/webp;base64,...
 * - data:image/gif;base64,...
 * - raw base64 strings
 */
export function parseImageData(dataUrlOrBase64) {
  if (!dataUrlOrBase64 || typeof dataUrlOrBase64 !== 'string') return null

  // Check for standard Data URL format: data:<mimeType>;base64,<data>
  const dataUrlMatch = dataUrlOrBase64.match(/^data:(image\/[a-zA-Z0-9.+_-]+);base64,(.+)$/)
  if (dataUrlMatch) {
    return {
      mimeType: dataUrlMatch[1].toLowerCase(),
      data: dataUrlMatch[2].trim()
    }
  }

  // If raw base64 (or non-prefixed base64 string)
  if (/^[A-Za-z0-9+/=]+$/.test(dataUrlOrBase64.slice(0, 100))) {
    return {
      mimeType: 'image/png',
      data: dataUrlOrBase64.trim()
    }
  }

  return null
}

/**
 * Initialize Google GenAI client with API key from backend environment
 */
function getGenAIClient() {
  dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true })
  const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : ''

  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    throw new Error('GEMINI_API_KEY is not configured. Please add your Gemini API Key in the backend .env file.')
  }

  return new GoogleGenAI({ apiKey })
}

/**
 * Real Google Gemini Image Generation Function
 * 
 * Uses the official Google Gen AI SDK (@google/genai) and the `gemini-3.1-flash-image` model
 * to perform text-to-image and reference-image editing.
 *
 * @param {Object} params
 * @param {string} params.prompt - User's prompt text
 * @param {string} [params.aspectRatio='1:1'] - Aspect ratio ('1:1', '16:9', '9:16', '4:3', '3:4', etc.)
 * @param {string} [params.selectedModel='gemini-3.1-flash-image'] - Model identifier
 * @param {Array} [params.referenceImages=[]] - Reference images uploaded by user (data URLs)
 * @returns {Promise<Object>} Formatted image response
 */
export async function generateImage({
  prompt,
  aspectRatio = '1:1',
  selectedModel = 'gemini-3.1-flash-image',
  referenceImages = []
}) {
  const cleanPrompt = (prompt || '').trim()

  if (!cleanPrompt && (!Array.isArray(referenceImages) || referenceImages.length === 0)) {
    throw new Error('A prompt text or reference image is required for image generation.')
  }

  // Initialize SDK
  const ai = getGenAIClient()

  // Build multimodal contents parts
  const contentsParts = []

  // 1. Add Text Prompt
  if (cleanPrompt) {
    contentsParts.push({ text: cleanPrompt })
  } else {
    contentsParts.push({ text: 'Generate an artistic visual image based on the provided reference image.' })
  }

  // 2. Add Reference Images as inlineData if provided (Data URLs: PNG, JPEG, WEBP, etc.)
  if (Array.isArray(referenceImages) && referenceImages.length > 0) {
    for (const ref of referenceImages) {
      const rawData = typeof ref === 'string' ? ref : (ref?.data || ref?.preview || '')
      const parsed = parseImageData(rawData)
      if (parsed && parsed.data) {
        contentsParts.push({
          inlineData: {
            mimeType: parsed.mimeType,
            data: parsed.data
          }
        })
      }
    }
  }

  // Validate Aspect Ratio (Default to '1:1' if unsupported)
  const validAspectRatio = SUPPORTED_ASPECT_RATIOS.includes(aspectRatio) ? aspectRatio : '1:1'

  // Model selection: Use gemini-3.1-flash-image as the primary model
  const targetModel = 'gemini-3.1-flash-image'

  try {
    // Invoke Gemini generateContent with IMAGE modality
    const response = await ai.models.generateContent({
      model: targetModel,
      contents: contentsParts,
      config: {
        responseModalities: ['IMAGE'],
        imageConfig: {
          aspectRatio: validAspectRatio,
          imageSize: '1K'
        }
      }
    })

    // Extract generated image part
    const candidate = response.candidates?.[0]

    if (!candidate) {
      throw new Error('Gemini API returned an empty candidate list.')
    }

    if (candidate.finishReason === 'SAFETY') {
      throw new Error('Image generation was blocked by Gemini safety filters. Please refine your prompt.')
    }

    const parts = candidate.content?.parts || []
    let imageBase64 = null
    let imageMimeType = 'image/png'

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        imageBase64 = part.inlineData.data
        imageMimeType = part.inlineData.mimeType || 'image/png'
        break
      }
    }

    if (!imageBase64) {
      // Check if text was returned explaining why no image was produced
      const textPart = parts.find((p) => p.text)
      if (textPart && textPart.text) {
        throw new Error(`Gemini response: ${textPart.text}`)
      }
      throw new Error(`The Gemini model "${targetModel}" did not return image data for this prompt.`)
    }

    const imageUrl = `data:${imageMimeType};base64,${imageBase64}`

    return {
      id: `gen_${Date.now()}`,
      imageUrl,
      prompt: cleanPrompt,
      enhancedPrompt: cleanPrompt,
      aspectRatio: validAspectRatio,
      model: targetModel,
      referenceCount: referenceImages.length,
      createdAt: new Date().toISOString()
    }
  } catch (error) {
    // Format descriptive error message from Google GenAI SDK
    let message = error.message || 'Unknown error occurred during Gemini image generation.'

    if (message.includes('API_KEY_INVALID') || message.includes('API key not valid')) {
      message = 'Invalid Gemini API Key. Please verify your GEMINI_API_KEY in the backend .env file.'
    } else if (message.includes('RESOURCE_EXHAUSTED') || message.includes('Quota exceeded') || message.includes('429')) {
      message = 'Gemini Image Generation Quota: Google AI Studio requires pay-as-you-go billing enabled on your Google Cloud/AI Studio project for image generation (free tier requests limit is 0). Learn more at https://ai.google.dev/gemini-api/docs/rate-limits.'
    } else if (message.includes('NOT_FOUND') || message.includes('is not found') || message.includes('not supported for this model')) {
      message = `Gemini model "${targetModel}" is not available for your Gemini API key.`
    }

    throw new Error(message)
  }
}
