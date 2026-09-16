import { Router } from 'express'
import fs from 'fs'
import path from 'path'

const router = Router()
const dataDir = path.resolve(process.cwd(), 'server', 'data')
const historyFilePath = path.join(dataDir, 'history.json')

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read history from disk
function readHistoryData() {
  ensureDataDir()
  if (!fs.existsSync(historyFilePath)) {
    return { guestHistory: [], userHistory: {} }
  }
  try {
    const raw = fs.readFileSync(historyFilePath, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    console.error('[History API] Failed to parse history file:', err.message)
    return { guestHistory: [], userHistory: {} }
  }
}

// Write history to disk
function writeHistoryData(data) {
  ensureDataDir()
  try {
    fs.writeFileSync(historyFilePath, JSON.stringify(data, null, 2), 'utf-8')
  } catch (err) {
    console.error('[History API] Failed to write history file:', err.message)
  }
}

/**
 * GET /api/history
 * Fetch conversation history
 */
router.get('/history', (req, res) => {
  try {
    const { userId } = req.query
    const store = readHistoryData()
    if (userId && userId !== 'guest') {
      const userList = store.userHistory[userId] || []
      return res.json({ success: true, history: userList })
    }
    return res.json({ success: true, history: store.guestHistory || [] })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
})

/**
 * POST /api/history
 * Save or sync conversation history array
 */
router.post('/history', (req, res) => {
  try {
    const { userId, history } = req.body
    if (!Array.isArray(history)) {
      return res.status(400).json({ success: false, error: 'History must be an array' })
    }
    const store = readHistoryData()
    if (userId && userId !== 'guest') {
      store.userHistory[userId] = history
    } else {
      store.guestHistory = history
    }
    writeHistoryData(store)
    return res.json({ success: true, count: history.length })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
})

/**
 * DELETE /api/history
 * Clear history
 */
router.delete('/history', (req, res) => {
  try {
    const { userId } = req.query
    const store = readHistoryData()
    if (userId && userId !== 'guest') {
      store.userHistory[userId] = []
    } else {
      store.guestHistory = []
    }
    writeHistoryData(store)
    return res.json({ success: true, message: 'History cleared' })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
})

export default router
