import { Router } from 'express'
import { generateImage, SUPPORTED_ASPECT_RATIOS } from '../services/imageService.js'

const router = Router()
const FASTAPI_URL = process.env.FASTAPI_URL || 'http://127.0.0.1:8000'

/**
 * POST /api/generate
 * Routes to FastAPI Python AI engine with resilient Node.js fallback
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

    const validAspectRatio = SUPPORTED_ASPECT_RATIOS.includes(aspectRatio) ? aspectRatio : '1:1'
    const payload = {
      prompt: prompt ? prompt.trim() : '',
      aspectRatio: validAspectRatio,
      selectedModel: typeof selectedModel === 'string' ? selectedModel : 'Flash',
      referenceImages: Array.isArray(referenceImages) ? referenceImages : []
    }

    // 1. Attempt generation via high-performance FastAPI Python engine
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 65000)

      const pyResponse = await fetch(`${FASTAPI_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (pyResponse.ok) {
        const pyData = await pyResponse.json()
        if (pyData && pyData.success && pyData.data) {
          console.log('[Node Gateway] Generated successfully via FastAPI Python Engine!')
          return res.status(200).json(pyData)
        }
      }
      console.warn(`[Node Gateway] FastAPI returned status ${pyResponse.status}. Falling back to Node AI engine...`)
    } catch (fastApiErr) {
      console.warn(`[Node Gateway] FastAPI engine unreachable (${fastApiErr.message}). Cascading to Node.js AI Engine...`)
    }

    // 2. Fallback to Node.js asynchronous image service
    const result = await generateImage(payload)
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

/**
 * GET /api/status
 * Check status of both Node.js gateway and FastAPI microservice
 */
router.get('/status', async (req, res) => {
  let fastApiOnline = false
  let fastApiDetails = null

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 2000)
    const resp = await fetch(`${FASTAPI_URL}/api/health`, { signal: controller.signal })
    clearTimeout(timeoutId)
    if (resp.ok) {
      fastApiOnline = true
      fastApiDetails = await resp.json()
    }
  } catch {
    fastApiOnline = false
  }

  res.json({
    status: 'online',
    nodeGateway: {
      status: 'online',
      port: process.env.PORT || 3001,
      service: 'Node.js Express Gateway & History'
    },
    fastApiEngine: {
      status: fastApiOnline ? 'online' : 'offline',
      url: FASTAPI_URL,
      details: fastApiDetails
    }
  })
})

export default router

