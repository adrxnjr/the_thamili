import 'dotenv/config'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { generateImage, SUPPORTED_ASPECT_RATIOS } from './server/services/imageService.js'

/**
 * Vite Dev Server API Plugin
 * Allows `/api/generate` to function directly inside the Vite dev server
 * while also supporting standalone Express server execution.
 */
function apiDevPlugin() {
  return {
    name: 'api-dev-plugin',
    configureServer(server) {
      // POST /api/generate
      server.middlewares.use('/api/generate', async (req, res, next) => {
        if (req.method === 'POST') {
          let rawBody = ''
          req.on('data', (chunk) => {
            rawBody += chunk
          })
          req.on('end', async () => {
            try {
              const body = rawBody ? JSON.parse(rawBody) : {}
              const {
                prompt,
                aspectRatio = '1:1',
                selectedModel = 'Flash',
                referenceImages = []
              } = body

              if ((!prompt || typeof prompt !== 'string' || !prompt.trim()) && (!Array.isArray(referenceImages) || referenceImages.length === 0)) {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 400
                res.end(JSON.stringify({
                  success: false,
                  error: 'A text prompt or at least one reference image is required.'
                }))
                return
              }

              const validRatio = SUPPORTED_ASPECT_RATIOS.includes(aspectRatio) ? aspectRatio : '1:1'
              const result = await generateImage({
                prompt: prompt ? prompt.trim() : '',
                aspectRatio: validRatio,
                selectedModel: typeof selectedModel === 'string' ? selectedModel : 'Flash',
                referenceImages: Array.isArray(referenceImages) ? referenceImages : []
              })

              res.setHeader('Content-Type', 'application/json')
              res.statusCode = 200
              res.end(JSON.stringify({ success: true, data: result }))
            } catch (err) {
              res.setHeader('Content-Type', 'application/json')
              res.statusCode = 500
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
        } else {
          next()
        }
      })

      // GET /api/health
      server.middlewares.use('/api/health', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 200
        res.end(JSON.stringify({
          status: 'online',
          service: 'Thamili Image Generation Backend API',
          timestamp: new Date().toISOString()
        }))
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiDevPlugin()],
  server: {
    port: 5173
  }
})
