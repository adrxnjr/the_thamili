import { Router } from 'express'
import { sendHuggingFaceChat, expandPromptViaHuggingFace, DEFAULT_HF_CHAT_MODEL } from '../services/huggingfaceChatService.js'

const router = Router()

/**
 * POST /api/chat/completions or POST /api/chat
 * Proxies OpenAI-compatible chat completion requests to Hugging Face API
 */
async function handleChatCompletions(req, res) {
  try {
    const {
      messages,
      model = DEFAULT_HF_CHAT_MODEL,
      temperature = 0.7,
      max_tokens = 500,
      stream = false,
      prompt // If client sends single prompt string
    } = req.body

    let formattedMessages = messages

    if (!formattedMessages && prompt) {
      formattedMessages = [
        { role: 'system', content: 'You are Thamili AI, a helpful creative and cultural AI assistant.' },
        { role: 'user', content: prompt }
      ]
    }

    if (!Array.isArray(formattedMessages) || formattedMessages.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'messages array or prompt string is required.'
      })
    }

    const result = await sendHuggingFaceChat({
      messages: formattedMessages,
      model,
      temperature,
      max_tokens,
      stream
    })

    return res.status(200).json(result.data)
  } catch (error) {
    console.error('[API /api/chat Error]:', error.message)
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to process chat completion via Hugging Face API'
    })
  }
}

router.post('/chat/completions', handleChatCompletions)
router.post('/chat', handleChatCompletions)

/**
 * POST /api/chat/enrich-prompt
 * Use Hugging Face LLM to enrich a short idea into a rich artistic prompt
 */
router.post('/chat/enrich-prompt', async (req, res) => {
  try {
    const { prompt, model } = req.body
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ success: false, error: 'prompt string is required' })
    }

    const enriched = await expandPromptViaHuggingFace(prompt, model)
    return res.status(200).json({
      success: true,
      originalPrompt: prompt,
      enrichedPrompt: enriched
    })
  } catch (error) {
    console.error('[API /api/chat/enrich-prompt Error]:', error.message)
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to enrich prompt via Hugging Face'
    })
  }
})

export default router
