/**
 * Thamili AI - Client API Gateway
 * Clean abstraction for image generation, history persistence, and server health checks
 */

/**
 * Generate an AI image from a prompt & reference attachments
 */
export async function generateImageApi({
  prompt,
  aspectRatio = '1:1',
  selectedModel = 'Basic',
  referenceImages = []
}) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: (prompt || '').trim(),
      aspectRatio,
      selectedModel,
      referenceImages
    })
  })

  let payload = {}
  try {
    const text = await response.text()
    payload = text ? JSON.parse(text) : {}
  } catch {
    payload = {}
  }

  if (!response.ok || !payload.success) {
    throw new Error(payload.error || `Image generation failed with HTTP status ${response.status}`)
  }

  return payload.data
}

/**
 * Fetch user or guest conversation history
 */
export async function fetchHistoryApi(userId = 'guest') {
  try {
    const res = await fetch(`/api/history?userId=${encodeURIComponent(userId)}`)
    if (res.ok) {
      const data = await res.json()
      if (data.success && Array.isArray(data.history)) {
        return data.history
      }
    }
  } catch (err) {
    console.warn('[API Client] fetchHistory warning:', err.message)
  }
  return null
}

/**
 * Save history to backend server
 */
export async function saveHistoryApi(userId = 'guest', history = []) {
  try {
    const res = await fetch('/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, history })
    })
    return res.ok
  } catch (err) {
    console.warn('[API Client] saveHistory warning:', err.message)
    return false
  }
}

/**
 * Send Chat Completion via Hugging Face API (/api/chat)
 * Supports OpenAI-compatible messages format: [{ role: 'user', content: '...' }]
 */
export async function sendChatCompletionApi({
  messages,
  model = 'meta-llama/Llama-2-7b-chat-hf',
  prompt
}) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, model, prompt })
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || `Chat completion failed with HTTP ${response.status}`)
  }
  return data
}

/**
 * Enrich prompt using Hugging Face LLM
 */
export async function enrichPromptApi(prompt, model = 'meta-llama/Llama-2-7b-chat-hf') {
  const response = await fetch('/api/chat/enrich-prompt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, model })
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || 'Failed to enrich prompt')
  }
  return data.enrichedPrompt || prompt
}

/**
 * Check backend service health status
 */
export async function checkHealthApi() {
  try {
    const res = await fetch('/api/health')
    return res.ok
  } catch {
    return false
  }
}
