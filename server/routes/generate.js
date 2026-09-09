import { Router } from 'express'
import { generateImage, SUPPORTED_ASPECT_RATIOS } from '../services/imageService.js'

const router = Router()

/**
 * POST /api/generate
 * 
 * Request Body:
 * {
 *   prompt: string (required),
 *   aspectRatio: string ('1:1', '16:9', '9:16', '4:3', '3:4', '3:2', '2:3'),
 *   selectedModel: string ('Flash', 'Pro', 'Ultra'),
 *   referenceImages: Array<{ name?: string, data: string, type?: string }>
 * }
 */
router.post('/generate', async (req, res) => {
  try {
    const {
      prompt,
      aspectRatio = '1:1',
      selectedModel = 'Flash',
      referenceImages = []
    } = req.body

    // Validation: prompt or reference images must be provided
    if ((!prompt || typeof prompt !== 'string' || !prompt.trim()) && (!Array.isArray(referenceImages) || referenceImages.length === 0)) {
      return res.status(400).json({
        success: false,
        error: 'A text prompt or at least one reference image is required.'
      })
    }

    // Validate aspect ratio format
    const validAspectRatio = SUPPORTED_ASPECT_RATIOS.includes(aspectRatio) ? aspectRatio : '1:1'

    // Call asynchronous image generation service
    const result = await generateImage({
      prompt: prompt ? prompt.trim() : '',
      aspectRatio: validAspectRatio,
      selectedModel: typeof selectedModel === 'string' ? selectedModel : 'Flash',
      referenceImages: Array.isArray(referenceImages) ? referenceImages : []
    })

    return res.status(200).json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('[API /api/generate Error]:', error)
    return res.status(500).json({
      success: false,
      error: error.message || 'An error occurred during image generation.'
    })
  }
})

export default router
