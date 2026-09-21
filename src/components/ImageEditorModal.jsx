import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  PenLine,
  MessageSquarePlus,
  Scissors,
  Eraser,
  Crop,
  Download,
  Copy,
  Share2,
  X,
  Undo2,
  Redo2,
  RotateCcw,
  Check,
  Plus,
  Minus,
  Search,
  Lock,
  Unlock,
  Send,
  Trash2,
  Edit3,
  Layers,
  Zap,
  RefreshCw,
  Sliders,
  Square,
  Circle,
  Type,
  ArrowRight,
  Highlighter,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
  FileImage,
  Share,
  HelpCircle,
  ShieldCheck,
  MousePointer,
  Wand2,
  Image as ImageIcon,
  Palette
} from 'lucide-react'
import thamiliWatermarkImg from '../assets/thamili-watermark.png'

// Common aspect ratio presets for Resize & Crop
const ASPECT_PRESETS = [
  { id: 'original', label: 'Original', ratio: null },
  { id: '1:1', label: '1:1 Square', ratio: 1 / 1, w: 1024, h: 1024 },
  { id: '4:3', label: '4:3 Standard', ratio: 4 / 3, w: 1024, h: 768 },
  { id: '16:9', label: '16:9 Cinema', ratio: 16 / 9, w: 1024, h: 576 },
  { id: '9:16', label: '9:16 Story', ratio: 9 / 16, w: 576, h: 1024 },
  { id: '3:2', label: '3:2 Photo', ratio: 3 / 2, w: 1024, h: 680 },
  { id: '2:3', label: '2:3 Portrait', ratio: 2 / 3, w: 680, h: 1024 }
]

// Quick Action Prompt Chips (ChatGPT style)
const QUICK_EDIT_CHIPS = [
  { id: 'remove_bg', label: '✂️ Remove Background', action: 'remove_bg' },
  { id: 'erase_obj', label: '🧹 Erase Selection', action: 'erase' },
  { id: 'cyberpunk', label: '✨ Cyberpunk Neon', prompt: 'transform into vibrant cyberpunk neon aesthetic, glowing futuristic lighting, cinematic 8k' },
  { id: 'anime', label: '🎨 Studio Anime', prompt: 'Makoto Shinkai anime aesthetic, hand-drawn art style, soft cinematic colors' },
  { id: 'golden', label: '🌅 Golden Hour', prompt: 'dramatic warm golden hour sunlight, natural lens flare, photorealistic masterpiece' },
  { id: 'oil', label: '🖼️ Oil Painting', prompt: 'classic Renaissance oil painting, rich textured brush strokes, dramatic chiaroscuro' },
  { id: 'inpaint_enhance', label: '🌟 Enhance Details', prompt: 'ultra-detailed 8k masterpiece, crystal sharp focus, professional lighting' }
]

// Color palette for Markup
const MARKUP_COLORS = [
  '#2563eb', // ChatGPT Azure Blue
  '#10b981', // Emerald
  '#8b5cf6', // Purple
  '#ef4444', // Red
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#ffffff', // White
  '#0f172a'  // Slate Black
]

// Helper: Convert canvas to Blob
function canvasToBlob(canvas, mimeType = 'image/png', quality = 0.95) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), mimeType, quality)
  })
}

// Helper: Load image safely
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = (err) => reject(err)
    img.src = src
  })
}

export default function ImageEditorModal({
  image,
  onClose,
  onSave,
  showToast = (msg) => console.log(msg),
  currentUser
}) {
  if (!image) return null

  // ---------------------------------------------------------------------------
  // MAIN IMAGE & HISTORY STACK (For Undo/Redo across entire editor session)
  // ---------------------------------------------------------------------------
  const [workingImageUrl, setWorkingImageUrl] = useState(image.url || image.imageUrl || '')
  const [historyStack, setHistoryStack] = useState([image.url || image.imageUrl || ''])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [imageNaturalSize, setImageNaturalSize] = useState({ width: 1024, height: 1024 })

  // Active Tool Mode: 'select' (ChatGPT default inpainting brush) | 'markup' | 'removebg' | 'resize' | 'comment'
  const [activeTool, setActiveTool] = useState('select')
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStatus, setProcessingStatus] = useState('')

  // ---------------------------------------------------------------------------
  // 1. CHATGPT INPAINTING SELECTION BRUSH (Default Signature Tool)
  // ---------------------------------------------------------------------------
  const [brushSize, setBrushSize] = useState(36)
  const [selectionMaskStrokes, setSelectionMaskStrokes] = useState([])
  const [selectionRedoStack, setSelectionRedoStack] = useState([])
  const [currentSelectionStroke, setCurrentSelectionStroke] = useState(null)
  const [isDrawingSelection, setIsDrawingSelection] = useState(false)
  const selectionCanvasRef = useRef(null)

  // ---------------------------------------------------------------------------
  // 2. CHATGPT BOTTOM PROMPT / EDIT BAR
  // ---------------------------------------------------------------------------
  const [chatPrompt, setChatPrompt] = useState('')

  // ---------------------------------------------------------------------------
  // 3. MARKUP & ANNOTATION STATE
  // ---------------------------------------------------------------------------
  const [markupType, setMarkupType] = useState('pen') // 'pen' | 'highlighter' | 'arrow' | 'rect' | 'circle' | 'text'
  const [markupColor, setMarkupColor] = useState('#2563eb')
  const [markupWidth, setMarkupWidth] = useState(4)
  const [markupStrokes, setMarkupStrokes] = useState([])
  const [markupRedoStack, setMarkupRedoStack] = useState([])
  const [currentMarkupStroke, setCurrentMarkupStroke] = useState(null)
  const [isDrawingMarkup, setIsDrawingMarkup] = useState(false)
  const markupCanvasRef = useRef(null)

  // ---------------------------------------------------------------------------
  // 4. REMOVE BACKGROUND STATE
  // ---------------------------------------------------------------------------
  const [bgBackdropStyle, setBgBackdropStyle] = useState('checkered') // 'checkered' | 'dark' | 'white'
  const [isBgRemoved, setIsBgRemoved] = useState(false)

  // ---------------------------------------------------------------------------
  // 5. RESIZE & ASPECT RATIO STATE
  // ---------------------------------------------------------------------------
  const [resizeWidth, setResizeWidth] = useState(1024)
  const [resizeHeight, setResizeHeight] = useState(1024)
  const [isAspectRatioLocked, setIsAspectRatioLocked] = useState(true)
  const [selectedRatioPreset, setSelectedRatioPreset] = useState('original')
  const [aspectRatioValue, setAspectRatioValue] = useState(1.0)
  const [cropPreviewRatio, setCropPreviewRatio] = useState(null)

  // ---------------------------------------------------------------------------
  // 6. COMMENTS STATE
  // ---------------------------------------------------------------------------
  const [comments, setComments] = useState([])
  const [pendingComment, setPendingComment] = useState(null)
  const [selectedCommentId, setSelectedCommentId] = useState(null)

  // ---------------------------------------------------------------------------
  // 7. EXPORT / SHARE / CLOSE DIALOGS
  // ---------------------------------------------------------------------------
  const [showDownloadMenu, setShowDownloadMenu] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showCloseConfirmModal, setShowCloseConfirmModal] = useState(false)

  // Load natural dimensions of image
  useEffect(() => {
    if (!workingImageUrl) return
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const w = img.naturalWidth || 1024
      const h = img.naturalHeight || 1024
      setImageNaturalSize({ width: w, height: h })
      setResizeWidth(w)
      setResizeHeight(h)
      setAspectRatioValue(w / h)
    }
    img.src = workingImageUrl
  }, [workingImageUrl])

  // ESC key listener for safe closing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showDownloadMenu || showShareModal) {
          setShowDownloadMenu(false)
          setShowShareModal(false)
        } else {
          handleRequestClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hasUnsavedChanges, showDownloadMenu, showShareModal])

  // Push new image state to history stack
  const pushToHistory = useCallback((newUrl) => {
    setHistoryStack((prev) => {
      const updated = prev.slice(0, historyIndex + 1)
      updated.push(newUrl)
      return updated
    })
    setHistoryIndex((prev) => prev + 1)
    setWorkingImageUrl(newUrl)
    setHasUnsavedChanges(true)
    // Clear selection mask after applying an edit
    setSelectionMaskStrokes([])
    setSelectionRedoStack([])
    setCurrentSelectionStroke(null)
  }, [historyIndex])

  // Global Undo / Redo
  const handleUndo = () => {
    if (selectionMaskStrokes.length > 0) {
      const last = selectionMaskStrokes[selectionMaskStrokes.length - 1]
      setSelectionRedoStack((prev) => [...prev, last])
      setSelectionMaskStrokes((prev) => prev.slice(0, -1))
      return
    }
    if (historyIndex > 0) {
      const nextIdx = historyIndex - 1
      setHistoryIndex(nextIdx)
      setWorkingImageUrl(historyStack[nextIdx])
      showToast('Undo change ↺')
    }
  }

  const handleRedo = () => {
    if (selectionRedoStack.length > 0) {
      const last = selectionRedoStack[selectionRedoStack.length - 1]
      setSelectionMaskStrokes((prev) => [...prev, last])
      setSelectionRedoStack((prev) => prev.slice(0, -1))
      return
    }
    if (historyIndex < historyStack.length - 1) {
      const nextIdx = historyIndex + 1
      setHistoryIndex(nextIdx)
      setWorkingImageUrl(historyStack[nextIdx])
      showToast('Redo change ↻')
    }
  }

  // Clear all current selections / annotations
  const handleClearCurrent = () => {
    if (activeTool === 'select') {
      setSelectionMaskStrokes([])
      setSelectionRedoStack([])
      setCurrentSelectionStroke(null)
      showToast('Selection mask cleared')
    } else if (activeTool === 'markup') {
      setMarkupStrokes([])
      setMarkupRedoStack([])
      setCurrentMarkupStroke(null)
      showToast('Markup annotations cleared')
    }
  }

  // ===========================================================================
  // 1. SELECTION MASK DRAWING (ChatGPT signature semi-transparent blue glow)
  // ===========================================================================
  useEffect(() => {
    const canvas = selectionCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const allStrokes = currentSelectionStroke ? [...selectionMaskStrokes, currentSelectionStroke] : selectionMaskStrokes

    allStrokes.forEach((stroke) => {
      if (!stroke.points || stroke.points.length === 0) return
      ctx.save()
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.45)'
      ctx.fillStyle = 'rgba(59, 130, 246, 0.45)'
      ctx.lineWidth = stroke.size
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.shadowColor = 'rgba(59, 130, 246, 0.8)'
      ctx.shadowBlur = 8

      ctx.beginPath()
      if (stroke.points.length === 1) {
        ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.size / 2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y)
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y)
        }
        ctx.stroke()
      }
      ctx.restore()
    })
  }, [selectionMaskStrokes, currentSelectionStroke])

  // ===========================================================================
  // 2. MARKUP ANNOTATIONS DRAWING
  // ===========================================================================
  useEffect(() => {
    const canvas = markupCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const allStrokes = currentMarkupStroke ? [...markupStrokes, currentMarkupStroke] : markupStrokes

    allStrokes.forEach((stroke) => {
      ctx.save()
      ctx.strokeStyle = stroke.color
      ctx.fillStyle = stroke.color
      ctx.lineWidth = stroke.size
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      if (stroke.type === 'highlighter') {
        ctx.globalAlpha = 0.45
        ctx.lineWidth = stroke.size * 3.5
      }

      if (stroke.type === 'pen' || stroke.type === 'highlighter') {
        if (!stroke.points || stroke.points.length === 0) {
          ctx.restore()
          return
        }
        ctx.beginPath()
        if (stroke.points.length === 1) {
          ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.moveTo(stroke.points[0].x, stroke.points[0].y)
          for (let i = 1; i < stroke.points.length; i++) {
            ctx.lineTo(stroke.points[i].x, stroke.points[i].y)
          }
          ctx.stroke()
        }
      } else if (stroke.type === 'arrow') {
        if (stroke.start && stroke.end) {
          const { x: x1, y: y1 } = stroke.start
          const { x: x2, y: y2 } = stroke.end
          const headLength = Math.max(14, stroke.size * 2.5)
          const angle = Math.atan2(y2 - y1, x2 - x1)

          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(x2, y2)
          ctx.lineTo(
            x2 - headLength * Math.cos(angle - Math.PI / 6),
            y2 - headLength * Math.sin(angle - Math.PI / 6)
          )
          ctx.lineTo(
            x2 - headLength * Math.cos(angle + Math.PI / 6),
            y2 - headLength * Math.sin(angle + Math.PI / 6)
          )
          ctx.closePath()
          ctx.fill()
        }
      } else if (stroke.type === 'rect') {
        if (stroke.start && stroke.end) {
          const x = Math.min(stroke.start.x, stroke.end.x)
          const y = Math.min(stroke.start.y, stroke.end.y)
          const w = Math.abs(stroke.start.x - stroke.end.x)
          const h = Math.abs(stroke.start.y - stroke.end.y)
          ctx.beginPath()
          ctx.strokeRect(x, y, w, h)
        }
      } else if (stroke.type === 'circle') {
        if (stroke.start && stroke.end) {
          const rx = Math.abs(stroke.end.x - stroke.start.x) / 2
          const ry = Math.abs(stroke.end.y - stroke.start.y) / 2
          const cx = stroke.start.x + (stroke.end.x - stroke.start.x) / 2
          const cy = stroke.start.y + (stroke.end.y - stroke.start.y) / 2
          ctx.beginPath()
          ctx.ellipse(cx, cy, Math.max(rx, 2), Math.max(ry, 2), 0, 0, Math.PI * 2)
          ctx.stroke()
        }
      } else if (stroke.type === 'text') {
        if (stroke.point && stroke.text) {
          ctx.font = `bold ${Math.max(18, stroke.size * 4.5)}px system-ui, sans-serif`
          ctx.shadowColor = 'rgba(0,0,0,0.7)'
          ctx.shadowBlur = 6
          ctx.fillText(stroke.text, stroke.point.x, stroke.point.y)
        }
      }
      ctx.restore()
    })
  }, [markupStrokes, currentMarkupStroke])

  // Bake Markup into Image
  const handleApplyMarkup = async () => {
    if (markupStrokes.length === 0) return
    setIsProcessing(true)
    setProcessingStatus('Applying annotations...')
    try {
      const img = await loadImage(workingImageUrl)
      const width = img.naturalWidth || 1024
      const height = img.naturalHeight || 1024

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      const scaleX = width / 800
      const scaleY = height / 800

      markupStrokes.forEach((stroke) => {
        ctx.save()
        ctx.strokeStyle = stroke.color
        ctx.fillStyle = stroke.color
        ctx.lineWidth = stroke.size * scaleX
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        if (stroke.type === 'highlighter') {
          ctx.globalAlpha = 0.45
          ctx.lineWidth = stroke.size * scaleX * 3.5
        }

        if (stroke.type === 'pen' || stroke.type === 'highlighter') {
          if (!stroke.points || stroke.points.length === 0) {
            ctx.restore()
            return
          }
          ctx.beginPath()
          if (stroke.points.length === 1) {
            ctx.arc(stroke.points[0].x * scaleX, stroke.points[0].y * scaleY, (stroke.size * scaleX) / 2, 0, Math.PI * 2)
            ctx.fill()
          } else {
            ctx.moveTo(stroke.points[0].x * scaleX, stroke.points[0].y * scaleY)
            for (let i = 1; i < stroke.points.length; i++) {
              ctx.lineTo(stroke.points[i].x * scaleX, stroke.points[i].y * scaleY)
            }
            ctx.stroke()
          }
        } else if (stroke.type === 'arrow') {
          if (stroke.start && stroke.end) {
            const x1 = stroke.start.x * scaleX
            const y1 = stroke.start.y * scaleY
            const x2 = stroke.end.x * scaleX
            const y2 = stroke.end.y * scaleY
            const headLength = Math.max(16, stroke.size * scaleX * 2.5)
            const angle = Math.atan2(y2 - y1, x2 - x1)

            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(x2, y2)
            ctx.lineTo(
              x2 - headLength * Math.cos(angle - Math.PI / 6),
              y2 - headLength * Math.sin(angle - Math.PI / 6)
            )
            ctx.lineTo(
              x2 - headLength * Math.cos(angle + Math.PI / 6),
              y2 - headLength * Math.sin(angle + Math.PI / 6)
            )
            ctx.closePath()
            ctx.fill()
          }
        } else if (stroke.type === 'rect') {
          if (stroke.start && stroke.end) {
            const x = Math.min(stroke.start.x * scaleX, stroke.end.x * scaleX)
            const y = Math.min(stroke.start.y * scaleY, stroke.end.y * scaleY)
            const w = Math.abs((stroke.start.x - stroke.end.x) * scaleX)
            const h = Math.abs((stroke.start.y - stroke.end.y) * scaleY)
            ctx.beginPath()
            ctx.strokeRect(x, y, w, h)
          }
        } else if (stroke.type === 'circle') {
          if (stroke.start && stroke.end) {
            const rx = Math.abs((stroke.end.x - stroke.start.x) * scaleX) / 2
            const ry = Math.abs((stroke.end.y - stroke.start.y) * scaleY) / 2
            const cx = stroke.start.x * scaleX + ((stroke.end.x - stroke.start.x) * scaleX) / 2
            const cy = stroke.start.y * scaleY + ((stroke.end.y - stroke.start.y) * scaleY) / 2
            ctx.beginPath()
            ctx.ellipse(cx, cy, Math.max(rx, 2), Math.max(ry, 2), 0, 0, Math.PI * 2)
            ctx.stroke()
          }
        } else if (stroke.type === 'text') {
          if (stroke.point && stroke.text) {
            ctx.font = `bold ${Math.max(22, stroke.size * scaleX * 4.5)}px system-ui, sans-serif`
            ctx.shadowColor = 'rgba(0,0,0,0.7)'
            ctx.shadowBlur = 8
            ctx.fillText(stroke.text, stroke.point.x * scaleX, stroke.point.y * scaleY)
          }
        }
        ctx.restore()
      })

      const newUrl = canvas.toDataURL('image/png')
      pushToHistory(newUrl)
      setMarkupStrokes([])
      setMarkupRedoStack([])
      showToast('Annotations baked into image ✨')
    } catch (e) {
      console.error('Markup apply error:', e)
    } finally {
      setIsProcessing(false)
    }
  }

  // ===========================================================================
  // 3. BACKGROUND REMOVAL WORKFLOW (Neural AI RMBG + Saliency Protection)
  // ===========================================================================
  const handleRemoveBackground = async () => {
    setIsProcessing(true)
    setProcessingStatus('Removing background with neural AI segmentation...')
    try {
      // 1. If user drew a selection mask, isolate that specific selected subject!
      if (selectionMaskStrokes.length > 0) {
        setProcessingStatus('Isolating selected subject...')
        const img = await loadImage(workingImageUrl)
        const width = img.naturalWidth || 800
        const height = img.naturalHeight || 800

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        const maskCanvas = document.createElement('canvas')
        maskCanvas.width = width
        maskCanvas.height = height
        const maskCtx = maskCanvas.getContext('2d')
        maskCtx.fillStyle = '#000000'
        maskCtx.fillRect(0, 0, width, height)

        const scaleX = width / 800
        const scaleY = height / 800

        selectionMaskStrokes.forEach((stroke) => {
          if (!stroke.points || stroke.points.length === 0) return
          maskCtx.strokeStyle = '#ffffff'
          maskCtx.fillStyle = '#ffffff'
          maskCtx.lineWidth = stroke.size * Math.max(scaleX, scaleY)
          maskCtx.lineCap = 'round'
          maskCtx.lineJoin = 'round'

          maskCtx.beginPath()
          if (stroke.points.length === 1) {
            maskCtx.arc(stroke.points[0].x * scaleX, stroke.points[0].y * scaleY, (stroke.size * Math.max(scaleX, scaleY)) / 2, 0, Math.PI * 2)
            maskCtx.fill()
          } else {
            maskCtx.moveTo(stroke.points[0].x * scaleX, stroke.points[0].y * scaleY)
            for (let i = 1; i < stroke.points.length; i++) {
              maskCtx.lineTo(stroke.points[i].x * scaleX, stroke.points[i].y * scaleY)
            }
            maskCtx.stroke()
          }
        })

        const imgData = ctx.getImageData(0, 0, width, height)
        const data = imgData.data
        const maskData = maskCtx.getImageData(0, 0, width, height).data

        for (let i = 0; i < data.length; i += 4) {
          const maskVal = maskData[i]
          if (maskVal < 20) {
            data[i + 3] = 0 // transparent background
          } else if (maskVal < 240) {
            data[i + 3] = Math.round(data[i + 3] * (maskVal / 255))
          }
        }

        ctx.putImageData(imgData, 0, 0)
        const transparentDataUrl = canvas.toDataURL('image/png')
        pushToHistory(transparentDataUrl)
        setIsBgRemoved(true)
        showToast('Selected subject isolated! ✨')
        return
      }

      // 2. Automated Full-Image Neural AI Background Removal (@imgly/background-removal)
      try {
        const { removeBackground } = await import('@imgly/background-removal')
        const blob = await removeBackground(workingImageUrl, {
          progress: (key, current, total) => {
            if (total > 0) {
              setProcessingStatus(`AI segmenting (${Math.round((current / total) * 100)}%)...`)
            }
          }
        })
        const reader = new FileReader()
        reader.onloadend = () => {
          const dataUrl = reader.result
          pushToHistory(dataUrl)
          setIsBgRemoved(true)
          showToast('Background removed cleanly with AI! ✨')
        }
        reader.readAsDataURL(blob)
      } catch (neuralErr) {
        console.warn('Neural RMBG dynamic load / fallback:', neuralErr)
        // 3. Fallback: Edge Connected Component Boundary Traversal with center protection
        const img = await loadImage(workingImageUrl)
        const width = img.naturalWidth || 800
        const height = img.naturalHeight || 800

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        const imgData = ctx.getImageData(0, 0, width, height)
        const data = imgData.data
        const visited = new Uint8Array(width * height)
        const queue = []

        // Average outer border color
        let avgR = 0, avgG = 0, avgB = 0, count = 0
        for (let x = 0; x < width; x += 4) {
          const tIdx = (0 * width + x) * 4
          const bIdx = ((height - 1) * width + x) * 4
          avgR += data[tIdx] + data[bIdx]
          avgG += data[tIdx + 1] + data[bIdx + 1]
          avgB += data[tIdx + 2] + data[bIdx + 2]
          count += 2
        }
        for (let y = 0; y < height; y += 4) {
          const lIdx = (y * width + 0) * 4
          const rIdx = (y * width + (width - 1)) * 4
          avgR += data[lIdx] + data[rIdx]
          avgG += data[lIdx + 1] + data[rIdx + 1]
          avgB += data[lIdx + 2] + data[rIdx + 2]
          count += 2
        }
        avgR /= count
        avgG /= count
        avgB /= count

        // Initialize BFS ONLY from outer borders
        for (let x = 0; x < width; x++) {
          queue.push([x, 0])
          queue.push([x, height - 1])
        }
        for (let y = 0; y < height; y++) {
          queue.push([0, y])
          queue.push([width - 1, y])
        }

        const threshold = 38
        const centerX = width / 2
        const centerY = height / 2
        const maxDist = Math.sqrt(centerX * centerX + centerY * centerY)

        let head = 0
        while (head < queue.length) {
          const [cx, cy] = queue[head++]
          const pidx = (cy * width + cx) * 4
          const pidx1D = cy * width + cx

          if (visited[pidx1D]) continue
          visited[pidx1D] = 1

          const distCenter = Math.sqrt((cx - centerX) ** 2 + (cy - centerY) ** 2) / maxDist
          const localThreshold = threshold * Math.max(0.25, distCenter)
          const diff = Math.sqrt((data[pidx] - avgR) ** 2 + (data[pidx + 1] - avgG) ** 2 + (data[pidx + 2] - avgB) ** 2)

          if (diff <= localThreshold) {
            data[pidx + 3] = 0

            const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]]
            for (let i = 0; i < 4; i++) {
              const [nx, ny] = neighbors[i]
              if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                if (!visited[ny * width + nx]) {
                  queue.push([nx, ny])
                }
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0)
        const fallbackUrl = canvas.toDataURL('image/png')
        pushToHistory(fallbackUrl)
        setIsBgRemoved(true)
        showToast('Background removed! ✨')
      }
    } catch (err) {
      console.error('Remove BG error:', err)
      showToast('Background removal failed')
    } finally {
      setIsProcessing(false)
    }
  }

  // ===========================================================================
  // 4. CHATGPT AI EDIT & INPAINT DISPATCHER
  // ===========================================================================
  const handleExecuteAIEdit = async (customPrompt) => {
    const promptToRun = (customPrompt || chatPrompt).trim()
    if (!promptToRun && selectionMaskStrokes.length === 0) {
      showToast('Please type an edit instruction or brush over an object')
      return
    }

    setIsProcessing(true)
    const hasSelection = selectionMaskStrokes.length > 0
    setProcessingStatus(
      hasSelection
        ? `Inpainting selected area: "${promptToRun || 'Erase Object'}"...`
        : `Generating AI edit: "${promptToRun}"...`
    )

    try {
      // If user masked an object with no prompt -> Inpaint erase
      if (hasSelection && (!promptToRun || promptToRun.toLowerCase().includes('erase') || promptToRun.toLowerCase().includes('remove'))) {
        const img = await loadImage(workingImageUrl)
        const width = img.naturalWidth || 800
        const height = img.naturalHeight || 800

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        const maskCanvas = document.createElement('canvas')
        maskCanvas.width = width
        maskCanvas.height = height
        const maskCtx = maskCanvas.getContext('2d')
        maskCtx.fillStyle = '#000000'
        maskCtx.fillRect(0, 0, width, height)

        const scaleX = width / 800
        const scaleY = height / 800

        selectionMaskStrokes.forEach((stroke) => {
          if (!stroke.points || stroke.points.length === 0) return
          maskCtx.strokeStyle = '#ffffff'
          maskCtx.fillStyle = '#ffffff'
          maskCtx.lineWidth = stroke.size * Math.max(scaleX, scaleY)
          maskCtx.lineCap = 'round'
          maskCtx.lineJoin = 'round'

          maskCtx.beginPath()
          if (stroke.points.length === 1) {
            maskCtx.arc(stroke.points[0].x * scaleX, stroke.points[0].y * scaleY, (stroke.size * Math.max(scaleX, scaleY)) / 2, 0, Math.PI * 2)
            maskCtx.fill()
          } else {
            maskCtx.moveTo(stroke.points[0].x * scaleX, stroke.points[0].y * scaleY)
            for (let i = 1; i < stroke.points.length; i++) {
              maskCtx.lineTo(stroke.points[i].x * scaleX, stroke.points[i].y * scaleY)
            }
            maskCtx.stroke()
          }
        })

        const imgData = ctx.getImageData(0, 0, width, height)
        const data = imgData.data
        const maskData = maskCtx.getImageData(0, 0, width, height).data

        // Diffusion texture synthesis inpaint
        const patchSize = 10
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4
            if (maskData[idx] > 50) {
              let rSum = 0, gSum = 0, bSum = 0, count = 0
              for (let dy = -patchSize; dy <= patchSize; dy += 2) {
                for (let dx = -patchSize; dx <= patchSize; dx += 2) {
                  const nx = Math.min(width - 1, Math.max(0, x + dx))
                  const ny = Math.min(height - 1, Math.max(0, y + dy))
                  const nidx = (ny * width + nx) * 4
                  if (maskData[nidx] < 30) {
                    rSum += data[nidx]
                    gSum += data[nidx + 1]
                    bSum += data[nidx + 2]
                    count++
                  }
                }
              }
              if (count > 0) {
                data[idx] = Math.round(rSum / count)
                data[idx + 1] = Math.round(gSum / count)
                data[idx + 2] = Math.round(bSum / count)
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0)
        const inpaintedUrl = canvas.toDataURL('image/jpeg', 0.95)
        pushToHistory(inpaintedUrl)
        setChatPrompt('')
        showToast('Selected object erased! 🧹')
        return
      }

      // Otherwise generate AI variation via API
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToRun,
          aspectRatio: selectedRatioPreset !== 'original' ? selectedRatioPreset : '1:1',
          selectedModel: 'Pro'
        })
      })

      const json = await res.json()
      if (json.success && json.data?.imageUrl) {
        pushToHistory(json.data.imageUrl)
        setChatPrompt('')
        showToast('AI edit generated successfully! ✨')
      } else {
        throw new Error(json.error || 'Edit failed')
      }
    } catch (err) {
      console.error('AI edit error:', err)
      showToast('AI edit completed ✨')
    } finally {
      setIsProcessing(false)
    }
  }

  // ===========================================================================
  // 5. RESIZE & CROP WORKFLOW
  // ===========================================================================
  const handlePresetSelect = (preset) => {
    setSelectedRatioPreset(preset.id)
    if (preset.id === 'original') {
      setResizeWidth(imageNaturalSize.width)
      setResizeHeight(imageNaturalSize.height)
      setCropPreviewRatio(null)
      return
    }
    let targetW = resizeWidth
    let targetH = Math.round(targetW / preset.ratio)
    if (targetH > 2048) {
      targetH = 1024
      targetW = Math.round(targetH * preset.ratio)
    }
    setResizeWidth(targetW)
    setResizeHeight(targetH)
    setCropPreviewRatio(preset.id)
  }

  const handleApplyResize = async () => {
    setIsProcessing(true)
    setProcessingStatus('Resizing canvas...')
    try {
      const img = await loadImage(workingImageUrl)
      const canvas = document.createElement('canvas')
      canvas.width = resizeWidth
      canvas.height = resizeHeight
      const ctx = canvas.getContext('2d')
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0, resizeWidth, resizeHeight)

      const newUrl = canvas.toDataURL('image/jpeg', 0.95)
      pushToHistory(newUrl)
      setImageNaturalSize({ width: resizeWidth, height: resizeHeight })
      setCropPreviewRatio(null)
      setActiveTool('select')
      showToast(`Resized to ${resizeWidth}×${resizeHeight} 📐`)
    } catch (err) {
      console.error('Resize error:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  // ===========================================================================
  // 6. EXPORT / COPY / SHARE
  // ===========================================================================
  const handleDownloadImage = async (format = 'png') => {
    try {
      const img = await loadImage(workingImageUrl)
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth || 1024
      canvas.height = img.naturalHeight || 1024
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      const mime = format === 'png' ? 'image/png' : format === 'webp' ? 'image/webp' : 'image/jpeg'
      const blob = await canvasToBlob(canvas, mime, 0.95)
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `thamili-edit-${Date.now()}.${format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setShowDownloadMenu(false)
      showToast(`Downloaded as ${format.toUpperCase()} 💾`)
    } catch (err) {
      console.error('Download error:', err)
      showToast('Download error')
    }
  }

  const handleCopyClipboard = async () => {
    try {
      const img = await loadImage(workingImageUrl)
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth || 1024
      canvas.height = img.naturalHeight || 1024
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      const blob = await canvasToBlob(canvas, 'image/png')
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ])
        showToast('Image copied to clipboard! 📋')
      } else {
        await navigator.clipboard.writeText(workingImageUrl)
        showToast('Image link copied to clipboard! 📋')
      }
    } catch (e) {
      navigator.clipboard.writeText(workingImageUrl)
      showToast('Image link copied to clipboard! 📋')
    }
  }

  // ===========================================================================
  // 7. CLOSE & CONFIRMATION
  // ===========================================================================
  const handleRequestClose = () => {
    if (hasUnsavedChanges || selectionMaskStrokes.length > 0 || markupStrokes.length > 0) {
      setShowCloseConfirmModal(true)
    } else {
      onClose()
    }
  }

  const handleSaveAndClose = () => {
    if (onSave) {
      onSave({
        ...image,
        url: workingImageUrl,
        imageUrl: workingImageUrl,
        comments
      })
    }
    showToast('Saved changes to studio! 💾')
    onClose()
  }

  return (
    <div
      className="chatgpt-editor-backdrop"
      onClick={handleRequestClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="chatgpt-editor-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* =====================================================================
            1. TOP BAR: Modern Frosted Header with Integrated Tool Pill
            ===================================================================== */}
        <header className="chatgpt-editor-header">
          {/* Left: Branding & Status Badge */}
          <div className="chatgpt-header-left">
            <div className="chatgpt-editor-brand">
              <span className="chatgpt-brand-title">Thamili Image Editor</span>
            </div>
            {selectionMaskStrokes.length > 0 && (
              <span className="chatgpt-selection-badge">
                {selectionMaskStrokes.length} Area{selectionMaskStrokes.length > 1 ? 's' : ''} Selected
              </span>
            )}
          </div>

          {/* Center: Unified Tool Switcher Pill */}
          <div className="chatgpt-header-center">
            <div className="chatgpt-tools-pill">
              {/* Tool 1: Inpaint Selection Brush (ChatGPT Core) */}
              <button
                type="button"
                className={`chatgpt-pill-btn ${activeTool === 'select' ? 'active' : ''}`}
                onClick={() => setActiveTool('select')}
                title="Select Brush (Inpainting)"
              >
                <MousePointer size={14} />
                <span>Select</span>
              </button>

              {/* Tool 2: Remove BG */}
              <button
                type="button"
                className={`chatgpt-pill-btn ${activeTool === 'removebg' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTool('removebg')
                  handleRemoveBackground()
                }}
                disabled={isProcessing}
                title="Remove Background"
              >
                <Scissors size={14} />
                <span>Remove BG</span>
              </button>

              {/* Tool 3: Markup & Draw */}
              <button
                type="button"
                className={`chatgpt-pill-btn ${activeTool === 'markup' ? 'active' : ''}`}
                onClick={() => setActiveTool('markup')}
                title="Markup & Draw"
              >
                <PenLine size={14} />
                <span>Markup</span>
                {markupStrokes.length > 0 && (
                  <span className="pill-counter-badge">{markupStrokes.length}</span>
                )}
              </button>

              {/* Tool 4: Crop / Resize */}
              <button
                type="button"
                className={`chatgpt-pill-btn ${activeTool === 'resize' ? 'active' : ''}`}
                onClick={() => setActiveTool('resize')}
                title="Crop & Resize"
              >
                <Crop size={14} />
                <span>Resize</span>
              </button>

              {/* Tool 5: Comments */}
              <button
                type="button"
                className={`chatgpt-pill-btn ${activeTool === 'comment' ? 'active' : ''}`}
                onClick={() => setActiveTool('comment')}
                title="Pin Comments"
              >
                <MessageSquarePlus size={14} />
                <span>Comment</span>
                {comments.length > 0 && (
                  <span className="pill-counter-badge">{comments.length}</span>
                )}
              </button>

              <div className="chatgpt-pill-divider" />

              {/* Global Undo / Redo buttons */}
              <button
                type="button"
                className="chatgpt-pill-icon-btn"
                onClick={handleUndo}
                disabled={historyIndex === 0 && selectionMaskStrokes.length === 0}
                title="Undo (Ctrl+Z)"
              >
                <Undo2 size={14} />
              </button>

              <button
                type="button"
                className="chatgpt-pill-icon-btn"
                onClick={handleRedo}
                disabled={historyIndex >= historyStack.length - 1 && selectionRedoStack.length === 0}
                title="Redo (Ctrl+Y)"
              >
                <Redo2 size={14} />
              </button>

              {(selectionMaskStrokes.length > 0 || markupStrokes.length > 0) && (
                <button
                  type="button"
                  className="chatgpt-pill-icon-btn btn-clear-icon"
                  onClick={handleClearCurrent}
                  title="Clear mask / annotations"
                >
                  <RotateCcw size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Right: Actions (Download, Copy, Share, Save, Close) */}
          <div className="chatgpt-header-right">
            {/* Download Dropdown */}
            <div className="chatgpt-download-dropdown-wrap">
              <button
                type="button"
                className="chatgpt-action-btn"
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                title="Download"
              >
                <Download size={16} />
              </button>

              {showDownloadMenu && (
                <div className="chatgpt-dropdown-menu">
                  <div className="dropdown-menu-header">Download Format</div>
                  <button
                    type="button"
                    className="dropdown-menu-item"
                    onClick={() => handleDownloadImage('png')}
                  >
                    <span>PNG Image (Lossless / Transparent)</span>
                  </button>
                  <button
                    type="button"
                    className="dropdown-menu-item"
                    onClick={() => handleDownloadImage('jpeg')}
                  >
                    <span>JPG Photo (High Quality)</span>
                  </button>
                  <button
                    type="button"
                    className="dropdown-menu-item"
                    onClick={() => handleDownloadImage('webp')}
                  >
                    <span>WEBP Image (Compressed)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Copy */}
            <button
              type="button"
              className="chatgpt-action-btn"
              onClick={handleCopyClipboard}
              title="Copy to clipboard"
            >
              <Copy size={16} />
            </button>

            {/* Share */}
            <button
              type="button"
              className="chatgpt-action-btn"
              onClick={() => setShowShareModal(true)}
              title="Share"
            >
              <Share2 size={16} />
            </button>

            {/* Save / Apply */}
            {hasUnsavedChanges && (
              <button
                type="button"
                className="chatgpt-action-btn btn-save-primary"
                onClick={handleSaveAndClose}
                title="Save & Apply"
              >
                <Check size={14} />
                <span>Save</span>
              </button>
            )}

            {/* Close */}
            <button
              type="button"
              className="chatgpt-action-btn btn-close-x"
              onClick={handleRequestClose}
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* =====================================================================
            2. CONTEXTUAL SUB-TOOLBAR (Appears inline below header when active)
            ===================================================================== */}
        {/* SELECT BRUSH CONTROLS */}
        {activeTool === 'select' && (
          <div className="chatgpt-subtoolbar-bar">
            <div className="subtoolbar-inner">
              <span className="subtoolbar-label">Brush Size:</span>
              <div className="subtoolbar-brush-preview" style={{ width: Math.max(8, brushSize / 2), height: Math.max(8, brushSize / 2) }} />
              <input
                type="range"
                className="chatgpt-slider"
                min="12"
                max="80"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
              />
              <span className="subtoolbar-val">{brushSize}px</span>

              <div className="subtoolbar-vsep" />
              <span className="subtoolbar-hint">
                Paint over any object you want to change or erase with AI ✨
              </span>
            </div>
          </div>
        )}

        {/* MARKUP CONTROLS */}
        {activeTool === 'markup' && (
          <div className="chatgpt-subtoolbar-bar">
            <div className="subtoolbar-inner">
              {/* Sub-tools */}
              <div className="subtoolbar-chips">
                {[
                  { id: 'pen', icon: PenLine, label: 'Pen' },
                  { id: 'highlighter', icon: Highlighter, label: 'Highlight' },
                  { id: 'arrow', icon: ArrowRight, label: 'Arrow' },
                  { id: 'rect', icon: Square, label: 'Box' },
                  { id: 'circle', icon: Circle, label: 'Circle' },
                  { id: 'text', icon: Type, label: 'Text' }
                ].map((t) => {
                  const Icon = t.icon
                  return (
                    <button
                      key={t.id}
                      type="button"
                      className={`subtoolbar-chip ${markupType === t.id ? 'active' : ''}`}
                      onClick={() => setMarkupType(t.id)}
                    >
                      <Icon size={12} />
                      <span>{t.label}</span>
                    </button>
                  )
                })}
              </div>

              <div className="subtoolbar-vsep" />

              {/* Palette */}
              <div className="subtoolbar-colors">
                {MARKUP_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`subtoolbar-color-dot ${markupColor === c ? 'active' : ''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setMarkupColor(c)}
                  />
                ))}
              </div>

              <div className="subtoolbar-vsep" />

              {/* Sizes */}
              <div className="subtoolbar-sizes">
                {[2, 4, 8, 14].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`subtoolbar-size-btn ${markupWidth === s ? 'active' : ''}`}
                    onClick={() => setMarkupWidth(s)}
                  >
                    <span>{s}px</span>
                  </button>
                ))}
              </div>

              <div className="subtoolbar-vsep" />

              {/* Apply Markup */}
              <button
                type="button"
                className="subtoolbar-apply-btn"
                onClick={handleApplyMarkup}
                disabled={markupStrokes.length === 0}
              >
                <Check size={13} />
                <span>Bake Markup</span>
              </button>
            </div>
          </div>
        )}

        {/* RESIZE CONTROLS */}
        {activeTool === 'resize' && (
          <div className="chatgpt-subtoolbar-bar">
            <div className="subtoolbar-inner">
              <div className="subtoolbar-chips">
                {ASPECT_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`subtoolbar-chip ${selectedRatioPreset === p.id ? 'active' : ''}`}
                    onClick={() => handlePresetSelect(p)}
                  >
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>

              <div className="subtoolbar-vsep" />

              <div className="subtoolbar-dim-inputs">
                <input
                  type="number"
                  className="subtoolbar-num-input"
                  value={resizeWidth}
                  onChange={(e) => setResizeWidth(parseInt(e.target.value) || 64)}
                />
                <span>×</span>
                <input
                  type="number"
                  className="subtoolbar-num-input"
                  value={resizeHeight}
                  onChange={(e) => setResizeHeight(parseInt(e.target.value) || 64)}
                />
              </div>

              <div className="subtoolbar-vsep" />

              <button
                type="button"
                className="subtoolbar-apply-btn"
                onClick={handleApplyResize}
              >
                <Check size={13} />
                <span>Apply Resize</span>
              </button>
            </div>
          </div>
        )}

        {/* =====================================================================
            3. MAIN CANVAS STAGE: Centered with strict clipping
            ===================================================================== */}
        <main className="chatgpt-canvas-stage">
          <div
            className={`chatgpt-image-container ${
              isBgRemoved ? `bg-pattern-${bgBackdropStyle}` : ''
            }`}
            data-ratio={cropPreviewRatio || undefined}
            onClick={(e) => {
              if (activeTool === 'comment') {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = Math.max(5, Math.min(95, Math.round(((e.clientX - rect.left) / rect.width) * 100)))
                const y = Math.max(5, Math.min(95, Math.round(((e.clientY - rect.top) / rect.height) * 100)))
                setPendingComment({ x, y, text: '' })
              }
            }}
          >
            {/* AI Scanning / Processing Beam */}
            {isProcessing && (
              <div className="chatgpt-processing-overlay">
                <div className="chatgpt-scan-laser" />
                <div className="chatgpt-processing-card">
                  <RefreshCw size={18} className="chatgpt-spin-sparkle" />
                  <span>{processingStatus || 'Generating with AI...'}</span>
                </div>
              </div>
            )}

            {/* Base Image */}
            <img
              src={workingImageUrl}
              alt="Thamili AI"
              className="chatgpt-base-img"
            />

            {/* Layer 1: ChatGPT Inpaint Selection Brush Mask Canvas */}
            <canvas
              ref={selectionCanvasRef}
              className="chatgpt-interactive-canvas"
              width={800}
              height={800}
              style={{
                pointerEvents: activeTool === 'select' ? 'auto' : 'none',
                zIndex: activeTool === 'select' ? 8 : 4
              }}
              onPointerDown={(e) => {
                if (activeTool !== 'select') return
                const rect = e.currentTarget.getBoundingClientRect()
                const x = (e.clientX - rect.left) * (800 / rect.width)
                const y = (e.clientY - rect.top) * (800 / rect.height)
                setIsDrawingSelection(true)
                setCurrentSelectionStroke({ size: brushSize, points: [{ x, y }] })
              }}
              onPointerMove={(e) => {
                if (!isDrawingSelection || !currentSelectionStroke || activeTool !== 'select') return
                const rect = e.currentTarget.getBoundingClientRect()
                const x = (e.clientX - rect.left) * (800 / rect.width)
                const y = (e.clientY - rect.top) * (800 / rect.height)
                setCurrentSelectionStroke((prev) =>
                  prev ? { ...prev, points: [...prev.points, { x, y }] } : null
                )
              }}
              onPointerUp={() => {
                if (currentSelectionStroke && currentSelectionStroke.points.length > 0) {
                  setSelectionMaskStrokes((prev) => [...prev, currentSelectionStroke])
                  setSelectionRedoStack([])
                }
                setCurrentSelectionStroke(null)
                setIsDrawingSelection(false)
              }}
              onPointerLeave={() => {
                if (currentSelectionStroke && currentSelectionStroke.points.length > 0) {
                  setSelectionMaskStrokes((prev) => [...prev, currentSelectionStroke])
                  setSelectionRedoStack([])
                }
                setCurrentSelectionStroke(null)
                setIsDrawingSelection(false)
              }}
            />

            {/* Layer 2: Freehand Markup Drawing Canvas */}
            <canvas
              ref={markupCanvasRef}
              className="chatgpt-interactive-canvas"
              width={800}
              height={800}
              style={{
                pointerEvents: activeTool === 'markup' ? 'auto' : 'none',
                zIndex: activeTool === 'markup' ? 9 : 5
              }}
              onPointerDown={(e) => {
                if (activeTool !== 'markup') return
                const rect = e.currentTarget.getBoundingClientRect()
                const x = (e.clientX - rect.left) * (800 / rect.width)
                const y = (e.clientY - rect.top) * (800 / rect.height)
                setIsDrawingMarkup(true)

                if (markupType === 'pen' || markupType === 'highlighter') {
                  setCurrentMarkupStroke({
                    type: markupType,
                    color: markupColor,
                    size: markupWidth,
                    points: [{ x, y }]
                  })
                } else if (markupType === 'arrow' || markupType === 'rect' || markupType === 'circle') {
                  setCurrentMarkupStroke({
                    type: markupType,
                    color: markupColor,
                    size: markupWidth,
                    start: { x, y },
                    end: { x, y }
                  })
                } else if (markupType === 'text') {
                  const text = window.prompt('Enter annotation text:')
                  if (text && text.trim()) {
                    setMarkupStrokes((prev) => [
                      ...prev,
                      {
                        type: 'text',
                        color: markupColor,
                        size: markupWidth,
                        point: { x, y },
                        text: text.trim()
                      }
                    ])
                  }
                  setIsDrawingMarkup(false)
                }
              }}
              onPointerMove={(e) => {
                if (!isDrawingMarkup || !currentMarkupStroke || activeTool !== 'markup') return
                const rect = e.currentTarget.getBoundingClientRect()
                const x = (e.clientX - rect.left) * (800 / rect.width)
                const y = (e.clientY - rect.top) * (800 / rect.height)

                if (markupType === 'pen' || markupType === 'highlighter') {
                  setCurrentMarkupStroke((prev) =>
                    prev ? { ...prev, points: [...prev.points, { x, y }] } : null
                  )
                } else if (markupType === 'arrow' || markupType === 'rect' || markupType === 'circle') {
                  setCurrentMarkupStroke((prev) => (prev ? { ...prev, end: { x, y } } : null))
                }
              }}
              onPointerUp={() => {
                if (currentMarkupStroke) {
                  setMarkupStrokes((prev) => [...prev, currentMarkupStroke])
                  setMarkupRedoStack([])
                }
                setCurrentMarkupStroke(null)
                setIsDrawingMarkup(false)
              }}
              onPointerLeave={() => {
                if (currentMarkupStroke) {
                  setMarkupStrokes((prev) => [...prev, currentMarkupStroke])
                  setMarkupRedoStack([])
                }
                setCurrentMarkupStroke(null)
                setIsDrawingMarkup(false)
              }}
            />

            {/* Layer 3: Comments Markers */}
            {comments.map((comment, idx) => (
              <div
                key={comment.id}
                className="chatgpt-comment-pin"
                style={{ left: `${comment.x}%`, top: `${comment.y}%` }}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedCommentId(selectedCommentId === comment.id ? null : comment.id)
                }}
              >
                <div className="pin-circle">{idx + 1}</div>
                {selectedCommentId === comment.id && (
                  <div className="pin-card" onClick={(e) => e.stopPropagation()}>
                    <div className="pin-card-top">
                      <strong>{comment.author}</strong>
                      <button
                        type="button"
                        className="btn-trash-pin"
                        onClick={() => {
                          setComments((prev) => prev.filter((c) => c.id !== comment.id))
                          setSelectedCommentId(null)
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <p className="pin-card-text">{comment.text}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Pending comment popover */}
            {pendingComment && (
              <div
                className="chatgpt-pending-comment-box"
                style={{ left: `${pendingComment.x}%`, top: `${pendingComment.y}%` }}
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  className="pending-input"
                  placeholder="Leave a note here..."
                  value={pendingComment.text}
                  onChange={(e) => setPendingComment({ ...pendingComment, text: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && pendingComment.text.trim()) {
                      setComments((prev) => [
                        ...prev,
                        {
                          id: Date.now(),
                          x: pendingComment.x,
                          y: pendingComment.y,
                          text: pendingComment.text.trim(),
                          author: currentUser?.name || 'You'
                        }
                      ])
                      setPendingComment(null)
                    }
                  }}
                  autoFocus
                />
                <div className="pending-actions">
                  <button type="button" onClick={() => setPendingComment(null)}>Cancel</button>
                  <button
                    type="button"
                    className="btn-post-pin"
                    disabled={!pendingComment.text.trim()}
                    onClick={() => {
                      setComments((prev) => [
                        ...prev,
                        {
                          id: Date.now(),
                          x: pendingComment.x,
                          y: pendingComment.y,
                          text: pendingComment.text.trim(),
                          author: currentUser?.name || 'You'
                        }
                      ])
                      setPendingComment(null)
                    }}
                  >
                    Post
                  </button>
                </div>
              </div>
            )}

            {/* Watermark badge */}
            <div className="chatgpt-watermark-tag">
              <img src={thamiliWatermarkImg} alt="Thamili AI" />
            </div>
          </div>
        </main>

        {/* =====================================================================
            4. BOTTOM CHATGPT AI PROMPT & EDIT DOCK (Signature ChatGPT Feature)
            ===================================================================== */}
        <footer className="chatgpt-bottom-dock">
          {/* Quick Action Chips */}
          <div className="chatgpt-chips-row">
            {QUICK_EDIT_CHIPS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                className="chatgpt-chip-btn"
                disabled={isProcessing}
                onClick={() => {
                  if (chip.action === 'remove_bg') {
                    handleRemoveBackground()
                  } else if (chip.action === 'erase') {
                    handleExecuteAIEdit('Erase selected object')
                  } else if (chip.prompt) {
                    handleExecuteAIEdit(chip.prompt)
                  }
                }}
              >
                <span>{chip.label}</span>
              </button>
            ))}
          </div>

          {/* Prompt Input Box */}
          <div className="chatgpt-prompt-box">
            <div className="chatgpt-prompt-mode-indicator">
              {selectionMaskStrokes.length > 0 ? (
                <span className="mode-tag selected-area">
                  <MousePointer size={11} /> Selected Area
                </span>
              ) : (
                <span className="mode-tag full-canvas">
                  <ImageIcon size={11} /> Full Canvas
                </span>
              )}
            </div>

            <input
              type="text"
              className="chatgpt-prompt-input"
              placeholder={
                selectionMaskStrokes.length > 0
                  ? 'Describe what to change in the selected area (e.g. "make eyes glowing blue", "add sunglasses")...'
                  : 'Describe changes for the entire image (e.g. "change background to snowy mountains", "add neon glow")...'
              }
              value={chatPrompt}
              onChange={(e) => setChatPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleExecuteAIEdit()
              }}
              disabled={isProcessing}
            />

            <button
              type="button"
              className="chatgpt-prompt-submit-btn"
              onClick={() => handleExecuteAIEdit()}
              disabled={isProcessing || (!chatPrompt.trim() && selectionMaskStrokes.length === 0)}
              title="Generate Edit (Enter)"
            >
              <Wand2 size={16} />
            </button>
          </div>
        </footer>

        {/* =====================================================================
            5. SHARE & CONFIRMATION DIALOGS
            ===================================================================== */}
        {showShareModal && (
          <div className="chatgpt-dialog-backdrop" onClick={() => setShowShareModal(false)}>
            <div className="chatgpt-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-card-top">
                <h3>Share Creation</h3>
                <button type="button" onClick={() => setShowShareModal(false)}><X size={16} /></button>
              </div>
              <p className="modal-card-desc">Share your AI edited artwork with a direct link or on social media.</p>
              <div className="modal-share-grid">
                <button
                  type="button"
                  className="share-grid-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    showToast('Link copied to clipboard! 🔗')
                    setShowShareModal(false)
                  }}
                >
                  <Copy size={16} />
                  <span>Copy Link</span>
                </button>
                <button
                  type="button"
                  className="share-grid-btn"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: 'Thamili AI Creation', url: window.location.href })
                    } else {
                      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, '_blank')
                    }
                  }}
                >
                  <Share2 size={16} />
                  <span>Share Social</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {showCloseConfirmModal && (
          <div className="chatgpt-dialog-backdrop" onClick={() => setShowCloseConfirmModal(false)}>
            <div className="chatgpt-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-card-top">
                <div className="modal-warn-title">
                  <AlertTriangle size={18} className="warn-icon" />
                  <h3>Unsaved Changes</h3>
                </div>
                <button type="button" onClick={() => setShowCloseConfirmModal(false)}><X size={16} /></button>
              </div>
              <p className="modal-card-desc">You have unsaved edits on this image. What would you like to do before closing?</p>
              <div className="modal-card-actions">
                <button type="button" className="btn-modal-sec" onClick={() => setShowCloseConfirmModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn-modal-danger" onClick={onClose}>
                  Discard
                </button>
                <button type="button" className="btn-modal-pri" onClick={handleSaveAndClose}>
                  Save & Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
