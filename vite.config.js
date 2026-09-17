import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { generateImage, SUPPORTED_ASPECT_RATIOS } from './server/services/imageService.js'

const dataDir = path.resolve(process.cwd(), 'server', 'data')
const historyFilePath = path.join(dataDir, 'history.json')

function readHistoryData() {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    if (!fs.existsSync(historyFilePath)) {
      return { guestHistory: [], userHistory: {} }
    }
    const raw = fs.readFileSync(historyFilePath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return { guestHistory: [], userHistory: {} }
  }
}

function writeHistoryData(data) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    fs.writeFileSync(historyFilePath, JSON.stringify(data, null, 2), 'utf-8')
  } catch (err) {
    console.error('[History Plugin] Save failed:', err.message)
  }
}

/**
 * Vite Dev Server API Plugin
 * Allows `/api/generate`, `/api/history`, `/api/health` to function directly inside the Vite dev server
 */
function apiDevPlugin() {
  return {
    name: 'api-dev-plugin',
    configureServer(server) {
      // Middleware for /api routes
      server.middlewares.use(async (req, res, next) => {
        const urlObj = new URL(req.url, 'http://localhost')
        const pathname = urlObj.pathname

        if (!pathname.startsWith('/api')) {
          return next()
        }

        // Helper to read JSON request body
        const readBody = () => new Promise((resolve) => {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              resolve(body ? JSON.parse(body) : {})
            } catch {
              resolve({})
            }
          })
        })


        // POST /api/generate
        if (pathname === '/api/generate' && req.method === 'POST') {
          try {
            const body = await readBody()
            const {
              prompt,
              aspectRatio = '1:1',
              selectedModel = 'Basic',
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
              selectedModel: typeof selectedModel === 'string' ? selectedModel : 'Basic',
              referenceImages: Array.isArray(referenceImages) ? referenceImages : []
            })

            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify({ success: true, data: result }))
          } catch (err) {
            console.error('[API Dev Plugin] Generation error:', err.message)
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 500
            res.end(JSON.stringify({ success: false, error: err.message }))
          }
          return
        }

        // /api/history (GET, POST, DELETE)
        if (pathname === '/api/history') {
          const userId = urlObj.searchParams.get('userId')
          if (req.method === 'GET') {
            const store = readHistoryData()
            const history = (userId && userId !== 'guest') ? (store.userHistory[userId] || []) : (store.guestHistory || [])
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify({ success: true, history }))
            return
          }
          if (req.method === 'POST') {
            const body = await readBody()
            const { userId: postUserId, history } = body
            if (!Array.isArray(history)) {
              res.setHeader('Content-Type', 'application/json')
              res.statusCode = 400
              res.end(JSON.stringify({ success: false, error: 'History must be an array' }))
              return
            }
            const store = readHistoryData()
            if (postUserId && postUserId !== 'guest') {
              store.userHistory[postUserId] = history
            } else {
              store.guestHistory = history
            }
            writeHistoryData(store)
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify({ success: true, count: history.length }))
            return
          }
          if (req.method === 'DELETE') {
            const store = readHistoryData()
            if (userId && userId !== 'guest') {
              store.userHistory[userId] = []
            } else {
              store.guestHistory = []
            }
            writeHistoryData(store)
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify({ success: true, message: 'History cleared' }))
            return
          }
        }

        // GET /api/health or /api/status
        if (pathname === '/api/health' || pathname === '/api/status') {
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200
          res.end(JSON.stringify({
            status: 'online',
            service: 'Thamili Image Generation Dev API',
            timestamp: new Date().toISOString()
          }))
          return
        }

        next()
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
