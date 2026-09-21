import dotenv from 'dotenv'

dotenv.config()

/**
 * Hugging Face Chat Completions API Service
 * Endpoint: https://api.huggingface-apis.com/v1/chat/completions
 * Supports: meta-llama/Llama-2-7b-chat-hf, meta-llama/Meta-Llama-3-8B-Instruct,
 *           mistralai/Mistral-7B-Instruct-v0.3, Qwen/Qwen2.5-72B-Instruct, etc.
 */

const HF_CHAT_ENDPOINTS = [
  'https://api.huggingface-apis.com/v1/chat/completions',
  'https://router.huggingface.co/hf-inference/v1/chat/completions',
  'https://api-inference.huggingface.co/v1/chat/completions'
]

export const DEFAULT_HF_CHAT_MODEL = 'meta-llama/Llama-2-7b-chat-hf'

/**
 * Send chat completion request to Hugging Face API
 * @param {Array<{role: string, content: string}>} messages
 * @param {string} model
 * @param {object} options
 */
export async function sendHuggingFaceChat({
  messages = [],
  model = DEFAULT_HF_CHAT_MODEL,
  temperature = 0.7,
  max_tokens = 500,
  stream = false
}) {
  const apiKey = (
    process.env.HF_TOKEN ||
    process.env.HUGGINGFACE_API_KEY ||
    process.env.HF_API_KEY ||
    ''
  ).trim()

  if (!apiKey) {
    throw new Error('HF_TOKEN or HUGGINGFACE_API_KEY is not configured in .env')
  }

  const payload = {
    model: model || DEFAULT_HF_CHAT_MODEL,
    messages: Array.isArray(messages) && messages.length > 0 ? messages : [
      { role: 'system', content: 'You are Thamili AI, an expert cultural and visual assistant.' },
      { role: 'user', content: 'Hello!' }
    ],
    temperature,
    max_tokens,
    stream
  }

  let lastError = null

  for (const endpoint of HF_CHAT_ENDPOINTS) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 35000)

      console.log(`[HuggingFace Chat] Requesting ${endpoint} with model: ${payload.model}...`)

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        console.log(`[HuggingFace Chat] Success from ${endpoint}!`)
        return {
          success: true,
          endpoint,
          model: payload.model,
          data
        }
      }

      const errText = await response.text().catch(() => '')
      lastError = new Error(`Hugging Face API returned HTTP ${response.status}: ${errText}`)
      console.warn(`[HuggingFace Chat] Endpoint ${endpoint} failed (${response.status}):`, errText)
    } catch (err) {
      lastError = err
      console.warn(`[HuggingFace Chat] Request error on ${endpoint}:`, err.message)
    }
  }

  throw lastError || new Error('All Hugging Face endpoints failed.')
}

/**
 * Convenience helper to expand/enrich an image prompt using Hugging Face LLM
 */
export async function expandPromptViaHuggingFace(userPrompt, model = DEFAULT_HF_CHAT_MODEL) {
  const messages = [
    {
      role: 'system',
      content: 'You are an expert AI prompt engineer for image generation. Expand the user\'s prompt into a vivid, detailed, artistic prompt with lighting, camera lens, resolution, and cultural styling. Output ONLY the expanded prompt text, without conversational intro or markdown.'
    },
    {
      role: 'user',
      content: userPrompt
    }
  ]

  const result = await sendHuggingFaceChat({ messages, model, max_tokens: 150 })
  const content = result?.data?.choices?.[0]?.message?.content
  return content ? content.trim() : userPrompt
}
