import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import generateRouter from './routes/generate.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Request logger for API visibility
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    console.log(`[API ${req.method}] ${req.path} - ${new Date().toLocaleTimeString()}`)
  }
  next()
})

// Routes
app.use('/api', generateRouter)

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Thamili Image Generation Backend API',
    timestamp: new Date().toISOString()
  })
})

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Thamili Backend API Server running on http://localhost:${PORT}`)
    console.log(`📡 Endpoint ready: POST http://localhost:${PORT}/api/generate`)
  })
}

export default app
