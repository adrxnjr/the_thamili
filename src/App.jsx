import { useState, useEffect, useRef, useMemo } from 'react'
import {
  MessageSquare,
  Code,
  Image as ImageIcon,
  Video,
  GraduationCap,
  ChevronDown,
  ChevronRight,
  SunMedium,
  MoonStar,
  Paperclip,
  ArrowRight,
  ArrowLeft,
  FolderPlus,
  Folder,
  Trash2,
  Pencil,
  Save,
  X,
  Check,
  Layers,
  Copy,
  Download,
  Plus,
  Zap,
  Square,
  ImagePlus,
  Loader2,
  SlidersHorizontal,
  Palette,
  Search,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Clock,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Share2,
  MoreHorizontal,
  Bookmark,
  Crown,
  PenLine,
  MessageSquarePlus,
  Scissors,
  Eraser,
  Crop,
  Undo2,
  RotateCcw,
  Send,
  ZoomIn,
  ZoomOut,
  Minus,
  Dices,
  Wand2
} from 'lucide-react'
import thamiliLogoImg from './assets/thamili-logo.png'
import sidebarLogoImg from './assets/thamili-logo.png'
import thamiliWatermarkImg from './assets/thamili-watermark.png'
import './App.css'


// Modular Components, Constants & Services
import { ThamiliLogoIcon, ThamiliWordmark } from './components/ThamiliIcons.jsx'
import DotMatrixWaveCanvas from './components/DotMatrixWaveCanvas.jsx'
import BackgroundWaves from './components/BackgroundWaves.jsx'
import {
  AVAILABLE_AI_MODELS,
  INSPIRATIONAL_PROMPTS
} from './constants/models.js'
import {
  REFERENCE_CONCEPT_STYLES,
  ALL_CREATIVE_CATEGORIES,
  REFERENCE_TEMPLATE_SLOTS,
  IMAGE_TEMPLATES,
  getFolderTheme
} from './constants/styles.js'
import {
  INITIAL_LOGGED_IN_HISTORY,
  INITIAL_GUEST_HISTORY,
  INITIAL_IMAGES,
  GENERATION_STATUS_MESSAGES
} from './constants/mockData.js'
import { generateImageApi, fetchHistoryApi, saveHistoryApi } from './services/api.js'
import { createId, analyzeAndExpandIdea, detectConversationalIntent } from './services/promptEngine.js'
import ImageEditorModal from './components/ImageEditorModal.jsx'

const ChatGPTDotMatrixCanvas = DotMatrixWaveCanvas;

export default function App() {
  const [theme, setTheme] = useState('light')
  const [activeTab, setActiveTab] = useState('AI Image')

  // User-created manual folders (independent from auto-domain folders)
  const [manualFolders, setManualFolders] = useState([])
  const [selectedFolderId, setSelectedFolderId] = useState(null)
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)

  // Image Studio States
  const [ideaText, setIdeaText] = useState('')
  const [aspectRatio, setAspectRatio] = useState('1:1')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)
  const [currentGeneration, setCurrentGeneration] = useState(null)
  const [galleryImages, setGalleryImages] = useState(INITIAL_IMAGES)
  const [templateCycleIndex, setTemplateCycleIndex] = useState(0)

  // Auto-switch reference template images every 7 seconds with smooth crossfade
  useEffect(() => {
    const timer = setInterval(() => {
      setTemplateCycleIndex((prev) => prev + 1)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  // Attached Reference Images List (ChatGPT-style image attachments)
  const [attachedReferences, setAttachedReferences] = useState([])
  const [flyingImage, setFlyingImage] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [activeChatId, setActiveChatId] = useState(null)
  const [fullscreenImageModal, setFullscreenImageModal] = useState(null)
  const chatScrollRef = useRef(null)
  const chatBottomRef = useRef(null)
  const pendingGenerationRef = useRef(null)

  // Center generating view when new generation/message starts and keep it firmly in position
  useEffect(() => {
    if (chatScrollRef.current) {
      const scrollEl = chatScrollRef.current
      const t = setTimeout(() => {
        const targetCard = scrollEl.querySelector('.chat-assistant-message-row:has(.is-generating), .chat-generating-view, .chat-assistant-message-row:last-child')
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 50)
      return () => clearTimeout(t)
    }
  }, [chatMessages.length, isGenerating])

  // ESC key listener to close fullscreen image modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setFullscreenImageModal(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Progressive Disclosure Plus Menu & Ratio Submenu
  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false)
  const [isRatioExpanded, setIsRatioExpanded] = useState(false)

  // Download & Actions state
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState('idle')

  // Folder Modal & Toast states
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [modalActiveTab, setModalActiveTab] = useState('folders') // 'folders' | 'gallery'
  const [editingFolderId, setEditingFolderId] = useState(null)
  const [editingFolderName, setEditingFolderName] = useState('')
  const [deletedDomainFolderIds, setDeletedDomainFolderIds] = useState([])
  const [renamedDomainFolders, setRenamedDomainFolders] = useState({})
  const [viewingFolder, setViewingFolder] = useState(null)
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false)
  const [selectedCategoryField, setSelectedCategoryField] = useState('All')
  const [categorySearchQuery, setCategorySearchQuery] = useState('')
  const [newFolderName, setNewFolderName] = useState('')
  const [folderSearchQuery, setFolderSearchQuery] = useState('')
  const [folderSortBy, setFolderSortBy] = useState('recent') // 'recent' | 'name' | 'count'
  const [targetAssignImageId, setTargetAssignImageId] = useState(null)
  const [isExistingFolderDropdownOpen, setIsExistingFolderDropdownOpen] = useState(false)
  const [isManageFoldersMode, setIsManageFoldersMode] = useState(false)
  const [toast, setToast] = useState(null)
  const [copiedPromptId, setCopiedPromptId] = useState(null)

  // Sub-Tabs inside Images workspace
  const [imagesSubTab, setImagesSubTab] = useState('studio') // 'studio' | 'marketplace' | 'library' | 'earnings'
  const [isImagesNavExpanded, setIsImagesNavExpanded] = useState(true)
  const [isImagesDropdownOpen, setIsImagesDropdownOpen] = useState(true)

  // Authentication & User Session State
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('signin') // 'signin' | 'signup'
  const [authFormData, setAuthFormData] = useState({ name: '', email: '', password: '' })

  const [userHistoryList, setUserHistoryList] = useState(() => {
    try {
      const saved = localStorage.getItem('thamili_user_history')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {
      // ignore
    }
    return INITIAL_LOGGED_IN_HISTORY
  })

  const [guestHistoryList, setGuestHistoryList] = useState(() => {
    try {
      const saved = localStorage.getItem('thamili_guest_history')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {
      // ignore
    }
    return INITIAL_GUEST_HISTORY
  })

  // Search Chats Modal & Filter state
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [searchChatsQuery, setSearchChatsQuery] = useState('')
  const [searchChatsFilter, setSearchChatsFilter] = useState('all')

  // Initial load from backend API if available
  useEffect(() => {
    const fetchHistoryFromBackend = async () => {
      try {
        const userId = isLoggedIn ? (currentUser?.id || 'user') : 'guest'
        const res = await fetch(`/api/history?userId=${userId}`)
        if (res.ok) {
          const data = await res.json()
          if (data.success && Array.isArray(data.history) && data.history.length > 0) {
            if (isLoggedIn) {
              setUserHistoryList(data.history)
            } else {
              setGuestHistoryList(data.history)
            }
          }
        }
      } catch (e) {
        // Fallback silently to localStorage
      }
    }
    fetchHistoryFromBackend()
  }, [isLoggedIn, currentUser])

  // Sync history to localStorage and backend API
  useEffect(() => {
    try {
      localStorage.setItem('thamili_guest_history', JSON.stringify(guestHistoryList))
    } catch (e) {
      // ignore
    }
    fetch('/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'guest', history: guestHistoryList })
    }).catch(() => {})
  }, [guestHistoryList])

  useEffect(() => {
    try {
      localStorage.setItem('thamili_user_history', JSON.stringify(userHistoryList))
    } catch (e) {
      // ignore
    }
    const uid = currentUser?.id || 'user'
    fetch('/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: uid, history: userHistoryList })
    }).catch(() => {})
  }, [userHistoryList, currentUser])

  // Active History computed based on Auth state & Search query / filter
  const activeHistory = useMemo(() => {
    const list = isLoggedIn ? userHistoryList : guestHistoryList
    return list.filter((item) => {
      const matchesFilter =
        searchChatsFilter === 'all' ||
        (searchChatsFilter === 'today' && item.dateBucket === 'today') ||
        (searchChatsFilter === 'older' && item.dateBucket === 'older')

      const q = searchChatsQuery.trim().toLowerCase()
      if (!q) return matchesFilter
      const title = (item.title || '').toLowerCase()
      const query = (item.query || '').toLowerCase()
      return matchesFilter && (title.includes(q) || query.includes(q))
    })
  }, [isLoggedIn, userHistoryList, guestHistoryList, searchChatsFilter, searchChatsQuery])

  // Backward compatibility searchHistory for sidebar dropdown
  const searchHistory = useMemo(() => {
    return (isLoggedIn ? userHistoryList : guestHistoryList).map((item) => ({
      id: item.id,
      query: item.query,
      title: item.title || item.query,
      time: item.timeTag || item.createdAt || 'Recent',
      image: item.image || item.url,
      messages: item.messages,
      generation: item.generation,
      createdAt: item.createdAt || 'Today'
    }))
  }, [isLoggedIn, userHistoryList, guestHistoryList])
  const [showUpgradeCard, setShowUpgradeCard] = useState(true)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  // Auto-vanish Upgrade to Pro card after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUpgradeCard(false)
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  // Filtered categories for Explorer Modal
  const filteredCategories = useMemo(() => {
    return ALL_CREATIVE_CATEGORIES.filter((cat) => {
      const matchesField =
        selectedCategoryField === 'All' ||
        cat.field === selectedCategoryField ||
        cat.categoryGroup === selectedCategoryField
      const matchesQuery =
        !categorySearchQuery.trim() ||
        cat.name.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
        cat.prompt.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
        cat.field.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
        cat.tag.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
        (cat.categoryGroup && cat.categoryGroup.toLowerCase().includes(categorySearchQuery.toLowerCase()))
      return matchesField && matchesQuery
    })
  }, [selectedCategoryField, categorySearchQuery])

// Intelligent AI Reference Prompt Synthesizer
function generateCreativeReferencePrompt(concept, fileName = '') {
  let cleanSubject = (fileName || '')
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_0-9]/g, ' ')
    .trim()

  if (!cleanSubject || cleanSubject.length < 2 || /^(image|photo|img|picture|upload|dsc|screenshot)/i.test(cleanSubject)) {
    cleanSubject = 'the subject in the uploaded reference photo'
  }

  const cName = (concept?.name || '').toLowerCase()

  if (cName.includes('hollywood')) {
    return `Classic black and white vintage Golden Age Hollywood glamour portrait of ${cleanSubject}, handsome tailored black tuxedo and bow tie, dramatic chiaroscuro film lighting, 8k cinematic masterpiece, fine film grain`
  }
  if (cName.includes('chibi')) {
    return `Cute 3D anime chibi kawaii keychain figure of ${cleanSubject}, big expressive sparkling eyes, soft pastel lighting, miniature acrylic charm on strap, 8k octane render`
  }
  if (cName.includes('bronze')) {
    return `Intricately embossed weathered antique bronze statue bust of ${cleanSubject}, commanding warrior presence, museum gallery spotlight, greenish patina details, 8k sculpture`
  }
  if (cName.includes('sitcom')) {
    return `Nostalgic 1990s retro TV sitcom intro scene of ${cleanSubject}, smiling in vibrant neon color-block jacket, checkerboard floor retro kitchen with GUEST STAR yellow text, 90s television aesthetic`
  }
  if (cName.includes('front row') || cName.includes('frontrow')) {
    return `Edgy avant-garde high fashion portrait of ${cleanSubject} sitting in the front row of Paris Fashion Week runway, flashing paparazzi strobe lights, blurred audience, haute couture editorial`
  }
  if (cName.includes('zen')) {
    return `Surreal dreamlike peaceful zero-gravity floating ${cleanSubject} in flowing white robes levitating above a serene Japanese rock zen garden and tranquil ocean at twilight, peaceful meditation`
  }
  if (cName.includes('paint')) {
    return `Expressive textured impressionist oil painting master portrait of ${cleanSubject}, visible palette knife brushstrokes, rich canvas texture, master fine art, warm museum lighting`
  }
  if (cName.includes('mural')) {
    return `Vibrant large-scale urban street wall mural painting of ${cleanSubject}, vivid graffiti art, textured brick wall, street art style, dynamic spray paint splatters`
  }
  if (cName.includes('mug')) {
    return `Cute custom cartoon illustration of ${cleanSubject} printed on a clean white ceramic coffee mug, warm wooden cafe table setting, morning coffee steam, merchandise mockup`
  }
  if (cName.includes('plushie')) {
    return `Adorable soft plushie stuffed toy character of ${cleanSubject} resting on a cozy bed with warm fairy lights in background, cute kawaii plush doll, detailed fabric texture`
  }
  if (cName.includes('arcade')) {
    return `Moody wide-angle photograph of ${cleanSubject} in a glowing retro neon arcade gaming hall, illuminated neon game machines, cyan and magenta reflections`
  }
  if (cName.includes('clay')) {
    return `Cozy 3D claymation stop-motion animated clay figure of ${cleanSubject} with hand-sculpted clay texture, soft studio pastel lighting, detailed claymation character`
  }
  if (cName.includes('pop up') || cName.includes('popup')) {
    return `Intricate papercraft 3D pop-up storybook illustration of ${cleanSubject} emerging from folded illustrated storybook pages, delicate layered papercraft art`
  }
  if (cName.includes('neon')) {
    return `Moody cinematic cyberpunk Tokyo neon rain street portrait of ${cleanSubject} holding umbrella under glowing red and cyan neon signs, wet asphalt puddle reflections`
  }
  if (cName.includes('origami')) {
    return `Modern geometric 3D papercraft origami sculpture of ${cleanSubject} with precise polygonal faceted planes in golden yellow and beige, clean low-poly art`
  }
  if (cName.includes('marble')) {
    return `Classical ancient Greek Roman carved white marble statue of ${cleanSubject} standing gracefully in a grand museum gallery with warm ambient gallery spotlights`
  }
  if (cName.includes('elven')) {
    return `Cinematic fantasy elven warrior portrait of ${cleanSubject} with braided hair and leather armor in a golden sunlit mystical ancient forest, epic fantasy masterpiece`
  }
  if (cName.includes('studio')) {
    return `Clean high-key professional studio sports portrait of ${cleanSubject} with dramatic rim lighting, sharp focus, 8k commercial photography`
  }
  if (cName.includes('bloom')) {
    return `Extravagant blooming Protea and fresh floral bouquet surrounding ${cleanSubject} inside a sunlit flower boutique shop, soft natural morning sunlight`
  }
  if (cName.includes('pastel')) {
    return `Heartwarming cozy anime illustration of ${cleanSubject} in a quaint pastel French bakery surrounded by artisan pastries, warm sunny aesthetic`
  }

  if (concept?.prompt) {
    return `${concept.prompt}, featuring ${cleanSubject}`
  }
  return `High quality ${concept?.name || 'artistic'} style render of ${cleanSubject}, 8k resolution, detailed lighting`
}

/**
 * Intelligent folder name suggestion engine based on user prompt, model, and concept styles
 */
function generateSuggestedFolderName(prompt = '', model = '', references = []) {
  const p = (prompt || '').trim().toLowerCase()
  const refName = (references[0]?.conceptName || references[0]?.name || references[0]?.style || '').toLowerCase()

  if (refName.includes('hollywood') || p.includes('hollywood') || p.includes('glamour') || p.includes('tuxedo')) {
    return 'Hollywood Glamour Portraits'
  }
  if (refName.includes('neon') || p.includes('cyberpunk') || p.includes('tokyo') || p.includes('neon') || p.includes('arcade')) {
    return 'Cyberpunk & Tokyo Neon'
  }
  if (refName.includes('paint') || p.includes('oil painting') || p.includes('canvas') || p.includes('impressionist') || p.includes('watercolor')) {
    return 'Oil & Fine Art Paintings'
  }
  if (refName.includes('anime') || refName.includes('chibi') || p.includes('anime') || p.includes('manga') || p.includes('kawaii')) {
    return 'Anime & Manga'
  }
  if (p.includes('car') || p.includes('supercar') || p.includes('automobile') || p.includes('ferrari') || p.includes('porsche')) {
    return 'Automobiles & Supercars'
  }
  if (p.includes('bike') || p.includes('motorcycle') || p.includes('bullet') || p.includes('superbike')) {
    return 'Motorcycles & Superbikes'
  }
  if (p.includes('flower') || p.includes('lotus') || p.includes('floral') || p.includes('bloom') || p.includes('rose') || p.includes('lavender')) {
    return 'Floral & Botanical Art'
  }
  if (p.includes('nature') || p.includes('mountain') || p.includes('waterfall') || p.includes('landscape') || p.includes('sunset') || p.includes('forest')) {
    return 'Scenic Nature & Landscapes'
  }
  if (p.includes('pongal') || p.includes('temple') || p.includes('tamil') || p.includes('chettinad') || p.includes('dravidian') || p.includes('gopuram') || p.includes('jallikattu')) {
    return 'Tamil Cultural Heritage'
  }
  if (p.includes('portrait') || p.includes('person') || p.includes('man') || p.includes('woman') || p.includes('girl') || p.includes('face') || p.includes('fashion')) {
    return 'Portrait Collection'
  }

  // Extract clean keywords from prompt
  const clean = prompt.replace(/[^\w\s]/g, '').trim()
  const words = clean.split(/\s+/).filter((w) => w.length > 2).slice(0, 3)
  if (words.length > 0) {
    return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
  }

  return `${model || 'Thamili'} Collection`
}

  // Handle applying reference concept directly into composer on main page
  const handleApplyCategoryPrompt = (cat) => {
    setActiveTab('AI Image')
    setImagesSubTab('studio')
    setIsCategoriesModalOpen(false)
    handleTemplateReferenceClick(cat)
  }

  // Handle attaching category image as reference
  const handleAttachCategoryReference = (cat) => {
    handleTemplateReferenceClick(cat)
  }

  // Model & Voice state
  const [selectedModel, setSelectedModel] = useState('Basic')
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)

  // Refs for DOM and Cancellation token
  const searchInputRef = useRef(null)
  const fileInputRef = useRef(null)
  const referenceCardFileInputRef = useRef(null)
  const pendingReferenceConceptRef = useRef(null)
  const [selectedReferenceConcept, setSelectedReferenceConcept] = useState(null)
  const [generatedPromptBanner, setGeneratedPromptBanner] = useState(null)
  const plusMenuRef = useRef(null)
  const downloadMenuRef = useRef(null)
  const activeGenerationIdRef = useRef(null)
  const generationTimersRef = useRef([])

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.model-dropdown-container')) {
        setIsModelDropdownOpen(false)
      }
      if (plusMenuRef.current && !plusMenuRef.current.contains(e.target) && !e.target.closest('.composer-plus-btn')) {
        setIsPlusMenuOpen(false)
        setIsRatioExpanded(false)
      }
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(e.target) && !e.target.closest('.btn-download-trigger')) {
        setIsDownloadMenuOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Sync theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  // Voice Prompt Recognition
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      showToast('Voice prompt simulated: "A futuristic sports car driving through Tokyo at night"')
      setIdeaText('A futuristic sports car driving through Tokyo at night')
      setTimeout(() => searchInputRef.current?.focus(), 50)
      return
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition
    try {
      const recognition = new SpeechRec()
      recognition.lang = 'en-US'
      recognition.interimResults = false
      recognition.maxAlternatives = 1

      setIsListening(true)
      showToast('🎙️ Listening... Speak your prompt idea')

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setIdeaText(transcript)
        setIsListening(false)
        showToast(`Heard: "${transcript}"`)
        setTimeout(() => searchInputRef.current?.focus(), 50)
      }

      recognition.onerror = () => {
        setIsListening(false)
        showToast('Voice input stopped')
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } catch {
      setIsListening(false)
      showToast('Voice prompt ready')
    }
  }
  const handleToggleVoicePrompt = handleVoiceInput


  // Reference Image Upload Handler (Max 3 files from system at a single time)
  const handleReferenceUpload = (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Clear file input value so re-selecting same file triggers onChange
    e.target.value = ''

    const MAX_UPLOAD_LIMIT = 3
    const currentCount = attachedReferences.length
    const availableSlots = MAX_UPLOAD_LIMIT - currentCount

    if (availableSlots <= 0) {
      showToast(`Maximum ${MAX_UPLOAD_LIMIT} reference images allowed. Please remove one first. ⚠️`)
      return
    }

    const filesToUpload = files.slice(0, availableSlots)
    if (files.length > availableSlots) {
      showToast(`Max ${MAX_UPLOAD_LIMIT} images allowed. Uploading first ${filesToUpload.length} image(s). ⚠️`)
    }

    const readPromises = filesToUpload.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          resolve({
            id: createId('ref-upload'),
            name: file.name,
            preview: event.target?.result,
            domain: 'Uploaded Image',
            isUploaded: true,
            isTemplate: false,
            isReferenceConcept: false,
            type: 'upload'
          })
        }
        reader.readAsDataURL(file)
      })
    })

    Promise.all(readPromises).then((newRefs) => {
      setAttachedReferences((prev) => {
        const combined = [...prev, ...newRefs]
        return combined.slice(0, MAX_UPLOAD_LIMIT)
      })
      showToast(
        newRefs.length === 1
          ? `Attached uploaded image "${newRefs[0].name}" 🖼️`
          : `Attached ${newRefs.length} uploaded images 🖼️`
      )
      setIsPlusMenuOpen(false)
      setTimeout(() => searchInputRef.current?.focus(), 50)
    })
  }

  // Template Reference Card Click -> 1. Trigger File Explorer, 2. Upload Image, 3. AI Generates Prompt, 4. Ready to Generate/Copy/Edit
  const handleTemplateReferenceClick = (tmpl, e) => {
    if (e) {
      e.preventDefault?.()
      e.stopPropagation?.()
    }
    pendingReferenceConceptRef.current = tmpl
    setSelectedReferenceConcept(tmpl)
    showToast(`Select an image to create in "${tmpl.name}" style 📂`)
    referenceCardFileInputRef.current?.click()
  }

  // Handle uploaded image for Reference Concept Style
  const handleReferenceCardFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''

    const concept = pendingReferenceConceptRef.current || REFERENCE_CONCEPT_STYLES[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const dataUrl = event.target?.result
      const newRef = {
        id: createId('ref-user-concept'),
        name: `${concept.name} Ref`,
        preview: dataUrl,
        domain: concept.field || `${concept.name} Style`,
        isUploaded: true,
        isTemplate: false,
        isReferenceConcept: true,
        type: 'reference',
        conceptName: concept.name,
        conceptPrompt: concept.prompt
      }

      // Generate AI prompt combining user uploaded image and chosen style
      const generatedPrompt = generateCreativeReferencePrompt(concept, file.name)

      // Attach reference and set generated prompt in composer
      setAttachedReferences([newRef])
      setIdeaText(generatedPrompt)
      setGeneratedPromptBanner({
        conceptName: concept.name,
        prompt: generatedPrompt,
        copied: false
      })

      showToast(`Generated AI prompt for "${concept.name}" style! You can copy, edit, or click Generate.`)
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }

    reader.readAsDataURL(file)
  }

  // Remove attached reference
  const handleRemoveReference = (refId) => {
    setAttachedReferences((prev) => prev.filter((r) => r.id !== refId))
    showToast('Reference image removed.')
  }

  // =========================================================================
  // 9 BASIC DEFAULT DOMAIN FOLDERS & USER-CREATED MANUAL FOLDERS
  // =========================================================================
  const COMMON_DOMAIN_FOLDERS = useMemo(() => [
    { id: 'domain-people', name: 'People', domain: 'People', isCommonDomain: true },
    { id: 'domain-nature', name: 'Nature', domain: 'Nature', isCommonDomain: true },
    { id: 'domain-animals', name: 'Animals', domain: 'Animals', isCommonDomain: true },
    { id: 'domain-places', name: 'Places', domain: 'Places', isCommonDomain: true },
    { id: 'domain-education', name: 'Education', domain: 'Education', isCommonDomain: true },
    { id: 'domain-art', name: 'Art', domain: 'Art', isCommonDomain: true },
    { id: 'domain-technology', name: 'Technology', domain: 'Technology', isCommonDomain: true },
    { id: 'domain-food', name: 'Food', domain: 'Food', isCommonDomain: true },
    { id: 'domain-products', name: 'Products', domain: 'Products', isCommonDomain: true }
  ], [])

  // 1. Exactly 9 basic default domain folders
  const commonDomainFolders = useMemo(() => {
    return COMMON_DOMAIN_FOLDERS
      .filter((f) => !deletedDomainFolderIds.includes(f.id))
      .map((f) => {
        const customName = renamedDomainFolders[f.id] || f.name
        return {
          ...f,
          name: customName,
          count: galleryImages.filter((img) => {
            const d = (img.domain || '').toLowerCase()
            const fn = (img.folderName || '').toLowerCase()
            const fid = (img.folderId || '').toLowerCase()
            const matchKey = f.name.toLowerCase()
            const customMatchKey = customName.toLowerCase()
            return (
              fid === f.id ||
              d === matchKey ||
              fn === matchKey ||
              d.includes(matchKey) ||
              fn.includes(matchKey) ||
              d.includes(customMatchKey) ||
              fn.includes(customMatchKey)
            )
          }).length
        }
      })
  }, [galleryImages, COMMON_DOMAIN_FOLDERS, deletedDomainFolderIds, renamedDomainFolders])

  // 2. User-created manual folders
  const userManualFolders = useMemo(() => {
    return manualFolders.map((f) => ({
      ...f,
      isManual: true,
      count: galleryImages.filter((img) => img.folderId === f.id).length
    }))
  }, [manualFolders, galleryImages])

  // 3. Combined folders list (User created folders + 5 common domain folders)
  const combinedFolders = useMemo(() => {
    return [...userManualFolders, ...commonDomainFolders]
  }, [userManualFolders, commonDomainFolders])

  // Active selected folder
  const activeFolder =
    combinedFolders.find((f) => f.id === selectedFolderId) || combinedFolders[0] || null

  // Filter and sort folders in folder manager
  const filteredFolders = useMemo(() => {
    let list = [...combinedFolders]
    if (folderSearchQuery.trim()) {
      const q = folderSearchQuery.toLowerCase()
      list = list.filter((f) => f.name.toLowerCase().includes(q))
    }
    if (folderSortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name))
    } else if (folderSortBy === 'count') {
      list.sort((a, b) => (b.count || 0) - (a.count || 0))
    }
    return list
  }, [combinedFolders, folderSearchQuery, folderSortBy])

  // Create Manual User Folder & assign pending image if applicable
  const handleCreateFolder = (e) => {
    if (e) e.preventDefault()
    if (!newFolderName.trim()) return

    const trimmedName = newFolderName.trim()
    let targetFolder = combinedFolders.find(
      (f) => f.name.toLowerCase() === trimmedName.toLowerCase()
    )

    if (!targetFolder) {
      targetFolder = {
        id: createId('f-user'),
        name: trimmedName,
        isManual: true,
        createdAt: 'Just now'
      }
      setManualFolders((prev) => [targetFolder, ...prev])
    }

    setSelectedFolderId(targetFolder.id)
    setIsFolderModalOpen(false)
    setIsExistingFolderDropdownOpen(false)
    setTargetAssignImageId(null)
    setIsCreatingFolder(false)

    // If there is a pending generation, start the image generation pipeline now!
    if (pendingGenerationRef.current) {
      const pendingParams = pendingGenerationRef.current
      pendingGenerationRef.current = null
      executeRealGenerationPipeline(pendingParams, targetFolder)
      setNewFolderName('')
      return
    }

    showToast(`Created folder "${targetFolder.name}" 📁`)
    setNewFolderName('')
  }

  // Select folder and navigate directly to chat stream with URL slug
  const handleSelectOrAssignFolder = (folder) => {
    setSelectedFolderId(folder.id)
    setIsFolderModalOpen(false)
    setIsGalleryOpen(false)
    setIsCreatingFolder(false)
    setViewingFolder(null)
    setTargetAssignImageId(null)
    setActiveTab('AI Image')
    setImagesSubTab('studio')

    // Update browser URL (e.g. /people, /nature, /technology)
    const slug = (folder.name || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
    if (slug) {
      window.history.pushState({ folderId: folder.id }, '', `/${slug}`)
    }

    // If there is a pending generation awaiting user folder selection, execute it directly now!
    if (pendingGenerationRef.current) {
      const pendingParams = pendingGenerationRef.current
      pendingGenerationRef.current = null
      executeRealGenerationPipeline(pendingParams, folder)
      setNewFolderName('')
      return
    }

    // Restore or open chat for this folder
    const matchingImg = galleryImages.find(
      (img) =>
        img.folderId === folder.id ||
        (img.domain || '').toLowerCase() === (folder.name || '').toLowerCase()
    )

    if (matchingImg) {
      const userMsg = {
        id: `msg-folder-${folder.id}-user`,
        role: 'user',
        text: matchingImg.originalIdea || matchingImg.prompt,
        createdAt: 'Just now'
      }
      const assistantMsg = {
        id: `gen-folder-${folder.id}`,
        role: 'assistant',
        originalIdea: matchingImg.originalIdea || matchingImg.prompt,
        prompt: matchingImg.prompt,
        domain: matchingImg.domain || folder.name,
        ratio: matchingImg.ratio || '1:1',
        url: matchingImg.url,
        isGenerating: false,
        saved: true,
        liked: false,
        disliked: false,
        folderId: folder.id,
        folderName: folder.name,
        createdAt: 'Just now'
      }
      setChatMessages([userMsg, assistantMsg])
      setCurrentGeneration(assistantMsg)
    }

    // If there is a pending generation, start the image generation pipeline now!
    if (pendingGenerationRef.current) {
      const pendingParams = pendingGenerationRef.current
      pendingGenerationRef.current = null
      executeRealGenerationPipeline(pendingParams, folder)
      setNewFolderName('')
      return
    }

    showToast(`Opened "${folder.name}" in chat 💬`)
    setTimeout(() => {
      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
      }
      searchInputRef.current?.focus()
    }, 80)
  }

  // URL slug routing listener for direct /people, /nature, /places navigation
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase()
      if (!path) return
      const matched = combinedFolders.find((f) => {
        const slug = (f.name || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
        return slug === path || (f.id || '').toLowerCase() === path
      })
      if (matched) {
        setSelectedFolderId(matched.id)
        setActiveTab('AI Image')
        setImagesSubTab('studio')
      }
    }

    handleUrlRoute()
    window.addEventListener('popstate', handleUrlRoute)
    return () => window.removeEventListener('popstate', handleUrlRoute)
  }, [combinedFolders])

  // Rename Folder handlers
  const handleStartRenameFolder = (folder, e) => {
    if (e) e.stopPropagation()
    setEditingFolderId(folder.id)
    setEditingFolderName(folder.name)
  }

  const handleSaveRenameFolder = (folderId, e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const trimmed = editingFolderName.trim()
    if (!trimmed) return

    setManualFolders((prev) =>
      prev.map((f) => (f.id === folderId ? { ...f, name: trimmed } : f))
    )
    setRenamedDomainFolders((prev) => ({ ...prev, [folderId]: trimmed }))
    setGalleryImages((prev) =>
      prev.map((img) => (img.folderId === folderId ? { ...img, folderName: trimmed } : img))
    )
    setChatMessages((prev) =>
      prev.map((msg) => (msg.folderId === folderId ? { ...msg, folderName: trimmed } : msg))
    )
    setEditingFolderId(null)
    setEditingFolderName('')
    showToast(`Renamed folder to "${trimmed}" 📁`)
  }

  const handleCancelRenameFolder = (e) => {
    if (e) e.stopPropagation()
    setEditingFolderId(null)
    setEditingFolderName('')
  }

  // Delete folder
  const handleDeleteFolder = (folderId, e) => {
    if (e) e.stopPropagation()
    setManualFolders((prev) => prev.filter((f) => f.id !== folderId))
    setDeletedDomainFolderIds((prev) => [...prev, folderId])
    if (selectedFolderId === folderId) {
      setSelectedFolderId(combinedFolders[0]?.id || null)
    }
    showToast('Folder deleted.')
  }

  // Select and open folder view in chat
  const handleSelectFolder = (folderId) => {
    setSelectedFolderId(folderId)
    const f = combinedFolders.find((item) => item.id === folderId)
    if (f) {
      handleSelectOrAssignFolder(f)
    }
  }

  // Clear pending timers helper
  const clearGenerationTimers = () => {
    generationTimersRef.current.forEach((id) => clearTimeout(id))
    generationTimersRef.current = []
  }

  // Stop / Cancel Generating
  const handleStopGenerating = () => {
    clearGenerationTimers()
    const cancelledId = activeGenerationIdRef.current
    activeGenerationIdRef.current = null
    setIsGenerating(false)
    setCurrentGeneration(null)
    if (cancelledId) {
      setChatMessages((prev) => prev.filter((msg) => msg.id !== cancelledId))
    }
    showToast('Generation safely stopped.')
    setTimeout(() => searchInputRef.current?.focus(), 50)
  }

  // Main AI Idea-to-Image Generation Trigger: Opens the folder popup first
  const handleGenerateFromIdea = async (customPromptText = null) => {
    if (isGenerating) return

    const effectiveText = typeof customPromptText === 'string' ? customPromptText : ideaText.trim()

    if (!effectiveText && attachedReferences.length === 0) {
      showToast('Please enter your prompt or attach a reference image.')
      searchInputRef.current?.focus()
      return
    }

    // Close open menus
    setIsPlusMenuOpen(false)
    setIsRatioExpanded(false)
    setIsModelDropdownOpen(false)
    setIsDownloadMenuOpen(false)

    const effectiveChatId = activeChatId || createId('chat')
    if (!activeChatId) {
      setActiveChatId(effectiveChatId)
    }

    // Check for conversational greetings & FAQs (respond politely without generating a random image)
    if (attachedReferences.length === 0 && effectiveText) {
      const conv = detectConversationalIntent(effectiveText)
      if (conv) {
        const userMsgId = createId('msg-user')
        const userMessage = {
          id: userMsgId,
          role: 'user',
          text: effectiveText,
          createdAt: 'Just now'
        }
        const assistantMessage = {
          id: createId('msg-ai-conv'),
          role: 'assistant',
          isTextResponse: true,
          type: 'text',
          text: conv.text,
          suggestions: conv.suggestions,
          createdAt: 'Just now'
        }
        const updatedMessages = [...chatMessages, userMessage, assistantMessage]
        setChatMessages(updatedMessages)
        upsertChatToHistory(effectiveChatId, effectiveText, effectiveText, updatedMessages, null)
        setIdeaText('')
        setTimeout(() => searchInputRef.current?.focus(), 50)
        return
      }
    }

    let rawPromptText = effectiveText
    if (!rawPromptText) {
      if (attachedReferences[0]?.conceptPrompt) {
        rawPromptText = attachedReferences[0].conceptPrompt
      } else if (attachedReferences[0]?.name) {
        rawPromptText = `Creative artwork inspired by ${attachedReferences[0].name}`
      } else {
        rawPromptText = 'Creative artwork'
      }
    } else if (attachedReferences[0]?.isReferenceConcept && attachedReferences[0]?.name) {
      rawPromptText = `${effectiveText}, in ${attachedReferences[0].name} style`
    }

    const currentAttachedRefs = [...attachedReferences]
    const backendReferences = currentAttachedRefs.map((r) => ({
      name: r.name,
      data: r.preview,
      type: r.type || 'reference',
      conceptName: r.conceptName || '',
      style: r.conceptName || r.domain || r.name || '',
      conceptPrompt: r.conceptPrompt || ''
    }))

    // If user already created or chose a folder, immediately start generating and store in that folder without popup
    const chosenFolder = selectedFolderId ? combinedFolders.find((f) => f.id === selectedFolderId) : null
    if (chosenFolder) {
      executeRealGenerationPipeline({
        rawPromptText,
        effectiveText,
        currentAttachedRefs,
        backendReferences,
        effectiveChatId,
        aspectRatio,
        selectedModel
      }, chosenFolder)
      return
    }

    // Save pending parameters until user clicks OK in folder popup
    pendingGenerationRef.current = {
      rawPromptText,
      effectiveText,
      currentAttachedRefs,
      backendReferences,
      effectiveChatId,
      aspectRatio,
      selectedModel
    }

    // Auto-suggest folder name and open folder popup so user can confirm/edit or pick existing folder
    const suggestedFolder = generateSuggestedFolderName(rawPromptText, selectedModel, currentAttachedRefs)
    setNewFolderName(suggestedFolder)
    setTargetAssignImageId('pending-gen')
    setIsCreatingFolder(true)
    setIsFolderModalOpen(true)
    setIsExistingFolderDropdownOpen(false)
  }

  // Real Asynchronous Generation Execution (triggered ONLY after user clicks OK or when folder is chosen)
  const executeRealGenerationPipeline = async (params, assignedFolder) => {
    const {
      rawPromptText,
      effectiveText,
      currentAttachedRefs,
      backendReferences,
      effectiveChatId,
      aspectRatio: genRatio,
      selectedModel: genModel
    } = params

    const generationId = createId('gen')
    activeGenerationIdRef.current = generationId
    clearGenerationTimers()

    const userMsgId = createId('msg-user')
    const userMessage = {
      id: userMsgId,
      role: 'user',
      text: effectiveText || (currentAttachedRefs[0] ? `Creative artwork inspired by ${currentAttachedRefs[0].name}` : 'Creative artwork'),
      references: currentAttachedRefs,
      createdAt: 'Just now'
    }

    const assistantMessage = {
      id: generationId,
      role: 'assistant',
      originalIdea: rawPromptText,
      prompt: rawPromptText,
      domain: assignedFolder?.name || `${genModel} Generation`,
      ratio: genRatio,
      url: '',
      isGenerating: true,
      generationStep: 0,
      saved: false,
      liked: false,
      disliked: false,
      folderId: assignedFolder ? assignedFolder.id : null,
      folderName: assignedFolder ? assignedFolder.name : '',
      createdAt: 'Just now'
    }

    // Append user query and assistant placeholder to chat stream
    const updatedMessages = [...chatMessages, userMessage, assistantMessage]
    setChatMessages(updatedMessages)
    upsertChatToHistory(effectiveChatId, rawPromptText, rawPromptText, updatedMessages, assistantMessage)
    setIdeaText('')
    setAttachedReferences([])

    setIsGenerating(true)
    setGenerationStep(0)
    setCurrentGeneration({
      id: generationId,
      originalIdea: rawPromptText,
      enhancedPrompt: rawPromptText,
      domain: assignedFolder?.name || `${genModel} Generation`,
      ratio: genRatio,
      url: '',
      isRendering: true,
      isRevealing: false,
      saved: false,
      folderId: assignedFolder ? assignedFolder.id : null,
      folderName: assignedFolder ? assignedFolder.name : ''
    })

    // Rotating Status Steps during generation
    const stepIntervals = [800, 1600, 2500, 3400]
    stepIntervals.forEach((delay, idx) => {
      const t = setTimeout(() => {
        if (activeGenerationIdRef.current === generationId) {
          setGenerationStep(idx + 1)
          setChatMessages((prev) =>
            prev.map((msg) =>
              msg.id === generationId ? { ...msg, generationStep: idx + 1 } : msg
            )
          )
        }
      }, delay)
      generationTimersRef.current.push(t)
    })

    // Asynchronous Real Backend API Call
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: rawPromptText,
          aspectRatio: genRatio,
          selectedModel: genModel,
          referenceImages: backendReferences
        })
      })

      let responsePayload = null
      try {
        const text = await response.text()
        responsePayload = text ? JSON.parse(text) : {}
      } catch {
        responsePayload = {}
      }

      if (!response.ok || !responsePayload.success) {
        throw new Error(responsePayload.error || `Generation failed with status ${response.status}`)
      }

      const generatedData = responsePayload.data

      // Check if user navigated away or cancelled
      if (activeGenerationIdRef.current !== generationId) return

      const newImg = {
        id: generationId,
        chatId: effectiveChatId,
        folderId: assignedFolder ? assignedFolder.id : null,
        folderName: assignedFolder ? assignedFolder.name : '',
        originalIdea: rawPromptText,
        prompt: generatedData.enhancedPrompt || rawPromptText,
        domain: assignedFolder?.name || `${genModel} Engine`,
        ratio: generatedData.aspectRatio || genRatio,
        dimensions: generatedData.dimensions,
        url: generatedData.imageUrl,
        saved: false,
        liked: false,
        disliked: false,
        createdAt: 'Just now',
        isNew: true,
        referencePreviews: currentAttachedRefs.map((r) => r.preview)
      }

      const completedAssistant = {
        ...assistantMessage,
        ...newImg,
        isGenerating: false
      }

      setCurrentGeneration({
        ...newImg,
        isRendering: false,
        isRevealing: true
      })

      setChatMessages((prev) => {
        const finalMsgs = prev.map((msg) =>
          msg.id === generationId ? completedAssistant : msg
        )
        upsertChatToHistory(effectiveChatId, rawPromptText, rawPromptText, finalMsgs, completedAssistant)
        return finalMsgs
      })

      setGalleryImages((prev) => [newImg, ...prev])
      setIsGenerating(false)
      showToast(`Generated & saved to "${assignedFolder?.name || 'Gallery'}"! 📁`)

      const revealTimer = setTimeout(() => {
        if (activeGenerationIdRef.current === generationId) {
          setCurrentGeneration((prev) => (prev ? { ...prev, isRevealing: false } : null))
        }
      }, 850)
      generationTimersRef.current.push(revealTimer)
    } catch (err) {
      if (activeGenerationIdRef.current !== generationId) return
      console.error('[Generate API Error]:', err)
      setIsGenerating(false)
      clearGenerationTimers()
      setCurrentGeneration(null)
      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.id === generationId
            ? {
                ...msg,
                isGenerating: false,
                error: true,
                errorMessage: err.message
              }
            : msg
        )
      )
      showToast(`Generation error: ${err.message} ⚠️`)
    }
  }

  // Toggle Save image
  const handleToggleSave = (imgId) => {
    setGalleryImages((prev) =>
      prev.map((img) => (img.id === imgId ? { ...img, saved: !img.saved } : img))
    )
    if (currentGeneration && currentGeneration.id === imgId) {
      setCurrentGeneration((prev) => ({ ...prev, saved: !prev.saved }))
    }
    setChatMessages((prev) =>
      prev.map((msg) => (msg.id === imgId ? { ...msg, saved: !msg.saved } : msg))
    )
    showToast('Saved state updated.')
  }

  // Reaction Handlers (Thumbs Up / Down)
  const handleToggleLike = (msgId) => {
    setChatMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId) {
          const nextLiked = !msg.liked
          if (nextLiked) showToast('Thanks for the feedback! 👍')
          return { ...msg, liked: nextLiked, disliked: false }
        }
        return msg
      })
    )
  }

  const handleToggleDislike = (msgId) => {
    setChatMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId) {
          const nextDisliked = !msg.disliked
          if (nextDisliked) showToast('Thanks for the feedback! We will improve. 👎')
          return { ...msg, disliked: nextDisliked, liked: false }
        }
        return msg
      })
    )
  }

  // Regenerate image
  const handleRegenerateMessage = (msg) => {
    handleGenerateFromIdea(msg.originalIdea || msg.prompt)
    showToast('Regenerating image... ')
  }

  // Direct High-Res Image Download
  const handleDirectDownload = async (imageUrl, title = 'thamili_image') => {
    try {
      showToast('Downloading image... 📥')
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = imageUrl
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth || 1024
      canvas.height = img.naturalHeight || 1024
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((blob) => {
        if (!blob) return
        const downloadUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        const cleanName = (title || 'thamili_image').slice(0, 24).replace(/[^a-zA-Z0-9]/g, '_')
        link.href = downloadUrl
        link.download = `thamili-${cleanName}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(downloadUrl)
        showToast('Image downloaded successfully! ✓')
      }, 'image/png')
    } catch {
      const link = document.createElement('a')
      link.href = imageUrl
      link.download = `thamili-image.png`
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      showToast('Image opened for download! 📥')
    }
  }

  // Copy Image / Prompt to Clipboard
  const handleCopyImageOrPrompt = async (imageUrl, promptText) => {
    try {
      if (imageUrl && imageUrl.startsWith('data:image')) {
        try {
          const res = await fetch(imageUrl)
          const blob = await res.blob()
          await navigator.clipboard.write([
            new ClipboardItem({ [blob.type || 'image/png']: blob })
          ])
          showToast('Image copied to clipboard! 📋')
          return
        } catch {
          // Fallback if browser security blocks binary image clipboard copy
        }
      }
      if (promptText) {
        await navigator.clipboard.writeText(promptText)
        showToast('Prompt copied to clipboard! 📋')
      } else if (imageUrl) {
        await navigator.clipboard.writeText(imageUrl)
        showToast('Image link copied! 📋')
      }
    } catch {
      showToast('Copied to clipboard! 📋')
    }
  }

  // Share Image
  const handleShareImage = async (imageUrl, title = 'Thamili AI Creation') => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Thamili AI Creation',
          text: title,
          url: imageUrl
        })
        showToast('Shared successfully! 🚀')
        return
      } catch (err) {
        // Ignored if user cancels share dialog
      }
    }
    try {
      await navigator.clipboard.writeText(imageUrl)
      showToast('Image link copied to clipboard! 🔗')
    } catch {
      showToast('Share link copied! 🔗')
    }
  }

  // Curated list of prompt inspirations for 1-click generation
  const INSPIRATIONAL_PROMPTS = [
    'A majestic Chola Dynasty royal temple towering in golden hour mist, Dravidian architecture, intricate stone carvings, 8k cinematic masterpiece',
    'Cyberpunk Chennai in 2088 with flying vehicles, glowing neon Tamil signage, holographic rain reflections, octane render',
    'An ethereal Bharatanatyam dancer surrounded by glowing celestial lotus petals, fluid silk saree motion, dramatic studio lighting',
    'A mystical white royal tiger resting in an ancient overgrown jungle temple in Tamil Nadu, sunbeams piercing through lush canopy, 8k',
    'Cute chibi anime character in traditional pastel pink and gold pavadai saree holding a glowing lotus lantern, Makoto Shinkai aesthetic',
    'Cinematic close-up portrait of a Tamil warrior king with ornate golden jewelry and battle armor, dramatic rim lighting, 85mm lens',
    'Futuristic electric supercar parked on Marina Beach Chennai at twilight, neon reflections on wet sand, photorealistic reflections',
    'Cozy traditional South Indian courtyard home during Pongal sunrise, colorful kolam art, clay pots, warm golden atmospheric lighting',
    'Mythological Garuda soaring above misty sacred mountains in the Western Ghats, volumetric god rays, epic fantasy art',
    'Steampunk robotic temple elephant adorned with glowing brass gears and glowing turquoise gems, intricate details, photorealistic'
  ]

  const handleRandomInspirePrompt = () => {
    const randomPrompt = INSPIRATIONAL_PROMPTS[Math.floor(Math.random() * INSPIRATIONAL_PROMPTS.length)]
    setIdeaText(randomPrompt)
    showToast('✨ Inspired prompt loaded! Press Generate 🚀')
    if (searchInputRef.current) {
      searchInputRef.current.focus()
      searchInputRef.current.select?.()
    }
  }

  const handleRemixImage = (msg) => {
    if (!msg) return
    const basePrompt = msg.originalIdea || msg.prompt || ''
    const variations = [
      'dramatic volumetric lighting and vibrant atmosphere',
      'golden hour cinematic lighting, ultra-detailed 8k masterpiece',
      'cyberpunk neon glowing accents with high dynamic range',
      'soft ethereal studio lighting, 85mm portrait depth of field'
    ]
    const chosenVar = variations[Math.floor(Math.random() * variations.length)]
    const newPrompt = basePrompt.includes(',') ? `${basePrompt}, ${chosenVar}` : `${basePrompt}, with ${chosenVar}`
    setIdeaText(newPrompt)
    if (msg.ratio) setAspectRatio(msg.ratio)
    showToast('🎨 Remix prompt loaded! Ready to generate variations ✨')
    if (fullscreenImageModal) setFullscreenImageModal(null)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
      searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // Save or update a chat session in persistent or session history with its full messages and image
  const upsertChatToHistory = (chatId, titleText, queryText, messagesList, genObj = null) => {
    const trimmed = (queryText || titleText || '').trim()
    if (!trimmed && (!messagesList || messagesList.length === 0)) return

    const now = new Date()
    const timeStr = 'Today, ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const title = titleText || (trimmed.length > 36 ? trimmed.slice(0, 36) + '...' : trimmed)
    const previewImg = genObj?.url || messagesList?.find((m) => m.url)?.url || null

    const chatItem = {
      id: chatId,
      title: title,
      query: trimmed,
      timeTag: 'Today',
      dateBucket: 'today',
      createdAt: timeStr,
      image: previewImg,
      ratio: genObj?.ratio || aspectRatio,
      messages: messagesList,
      generation: genObj
    }

    if (isLoggedIn) {
      setUserHistoryList((prev) => {
        const filtered = prev.filter((c) => c.id !== chatId)
        return [chatItem, ...filtered].slice(0, 50)
      })
    } else {
      setGuestHistoryList((prev) => {
        const filtered = prev.filter((c) => c.id !== chatId)
        return [chatItem, ...filtered].slice(0, 20)
      })
    }
  }

  // Record query to appropriate history tier (Legacy fallback wrapper)
  const savePromptToHistory = (text) => {
    upsertChatToHistory(activeChatId || createId('chat'), text, text, chatMessages, currentGeneration)
  }

  // Handle Login (Sample Demo / Google / Form)
  const handlePerformLogin = (customUser = null) => {
    const userToSet = customUser || {
      name: authFormData.name.trim() || 'Adrin',
      email: authFormData.email.trim() || 'adrin@thamili.ai',
      avatar: (authFormData.name.trim() || 'Adrin')[0].toUpperCase(),
      role: 'Pro Creator'
    }
    setCurrentUser(userToSet)
    setIsLoggedIn(true)
    setIsAuthModalOpen(false)
    setAuthFormData({ name: '', email: '', password: '' })
    showToast(`Welcome back, ${userToSet.name}! History synced by date ☁️`)
  }

  // Handle Logout
  const handleSignOut = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    showToast('Signed out. Switched to guest session mode.')
  }

  // Select and load chat session from history item (opens full interactive chat thread)
  const handleLoadChatFromHistory = (item) => {
    if (!item) return
    const queryText = (item.query || item.title || '').trim()

    const allHistory = isLoggedIn ? userHistoryList : guestHistoryList
    const existingChat = allHistory.find((c) => c.id === item.id) || item

    const chatIdToSet = existingChat.id || item.id || createId('chat')
    setActiveChatId(chatIdToSet)
    setActiveTab('AI Image')
    setImagesSubTab('studio')
    setIsImagesDropdownOpen(true)
    setIsSearchModalOpen(false)
    setIsGalleryOpen(false)
    setIsFolderModalOpen(false)
    setIsCategoriesModalOpen(false)
    setIsUserMenuOpen(false)
    setIsPlusMenuOpen(false)
    setIsRatioExpanded(false)

    clearGenerationTimers()
    setIsGenerating(false)
    setIdeaText('')
    setAttachedReferences([])

    // 1. If chat has pre-built message history, restore it completely
    if (existingChat.messages && Array.isArray(existingChat.messages) && existingChat.messages.length > 0) {
      setChatMessages(existingChat.messages)
      setCurrentGeneration(existingChat.generation || null)
      showToast(`Switched to: "${existingChat.title || queryText}" `)
    } else {
      // 2. Construct clean conversational message history from the saved chat metadata
      const promptText = existingChat.query || existingChat.title || 'Creative artwork'
      const userMessage = {
        id: `msg-${chatIdToSet}-user`,
        role: 'user',
        text: promptText,
        createdAt: existingChat.createdAt || 'Earlier'
      }
      const assistantMessage = {
        id: `gen-${chatIdToSet}`,
        role: 'assistant',
        originalIdea: promptText,
        prompt: promptText,
        domain: existingChat.domain || 'Flux 1.0 Pro Engine',
        ratio: existingChat.ratio || aspectRatio,
        dimensions: existingChat.dimensions || '1024 x 576',
        url: existingChat.image || existingChat.url || '',
        isGenerating: false,
        saved: false,
        liked: false,
        disliked: false,
        createdAt: existingChat.createdAt || 'Earlier'
      }
      const restoredMessages = [userMessage, assistantMessage]
      setChatMessages(restoredMessages)
      setCurrentGeneration(assistantMessage)
      showToast(`Switched to: "${existingChat.title || promptText}" `)
    }

    setTimeout(() => {
      searchInputRef.current?.focus()
      chatScrollRef.current?.scrollTo({ top: 99999, behavior: 'smooth' })
    }, 100)
  }

  // Alias for search modal and history dropdown
  const handleSelectHistoryChat = (item) => handleLoadChatFromHistory(item)
  const handleSelectSearchHistory = (histItem) => handleLoadChatFromHistory(histItem)

  // Start fresh new chat session
  const handleResetToNewChat = () => {
    setActiveChatId(null)
    setSelectedFolderId(null)
    setChatMessages([])
    setCurrentGeneration(null)
    setIdeaText('')
    setAttachedReferences([])
    window.history.pushState({}, '', '/')
    showToast('Started new image chat session ')
  }

  // Navigate to Home Page / Studio from any tab or view
  const handleNavigateHome = () => {
    setSelectedFolderId(null)
    setActiveTab('AI Image')
    setImagesSubTab('studio')
    setIsImagesDropdownOpen(true)
    setIsGalleryOpen(false)
    setIsFolderModalOpen(false)
    setIsCategoriesModalOpen(false)
    setIsSearchModalOpen(false)
    setIsUserMenuOpen(false)
    setIsPlusMenuOpen(false)
    setIsRatioExpanded(false)
  }

  // Delete item from history modal
  const handleDeleteHistoryChat = (e, id) => {
    e.stopPropagation()
    if (activeChatId === id) {
      handleResetToNewChat()
    }
    if (isLoggedIn) {
      setUserHistoryList((prev) => prev.filter((i) => i.id !== id))
    } else {
      setGuestHistoryList((prev) => prev.filter((i) => i.id !== id))
    }
    showToast('Removed from history')
  }

  // Clear all history in current view
  const handleClearHistoryList = (e) => {
    e.stopPropagation()
    setActiveChatId(null)
    setChatMessages([])
    setCurrentGeneration(null)
    if (isLoggedIn) {
      setUserHistoryList([])
    } else {
      setGuestHistoryList([])
    }
    showToast('History cleared')
  }

  // Remove single search item
  const handleDeleteHistoryItem = (e, id) => {
    e.stopPropagation()
    if (activeChatId === id) {
      handleResetToNewChat()
    }
    if (isLoggedIn) {
      setUserHistoryList((prev) => prev.filter((item) => item.id !== id))
    } else {
      setGuestHistoryList((prev) => prev.filter((item) => item.id !== id))
    }
    showToast('Search item removed')
  }

  // Clear all recent history
  const handleClearAllHistory = (e) => {
    e.stopPropagation()
    if (isLoggedIn) {
      setUserHistoryList([])
    } else {
      setGuestHistoryList([])
    }
    showToast('Search history cleared')
  }

  // Copy prompt helper
  const handleCopyPrompt = (text, id = null) => {
    navigator.clipboard.writeText(text)
    if (id) {
      setCopiedPromptId(id)
      setTimeout(() => setCopiedPromptId(null), 2000)
    }
    showToast('Prompt copied to clipboard! 📋')
  }

  // Multi-Format Download Engine (PNG, JPG, WEBP)
  const handleDownloadFormat = async (format) => {
    if (!currentGeneration?.url) return
    setDownloadStatus('processing')
    showToast(`Converting & downloading as .${format.toUpperCase()}...`)

    try {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = currentGeneration.url

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })

      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth || 1024
      canvas.height = img.naturalHeight || 1024
      const ctx = canvas.getContext('2d')

      if (format === 'jpg' || format === 'jpeg') {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      const mimeType =
        format === 'jpg' || format === 'jpeg'
          ? 'image/jpeg'
          : format === 'webp'
          ? 'image/webp'
          : 'image/png'

      const ext = format === 'jpg' || format === 'jpeg' ? 'jpg' : format === 'webp' ? 'webp' : 'png'

      canvas.toBlob(
        (blob) => {
          if (!blob) throw new Error('Format conversion failed')
          const downloadUrl = URL.createObjectURL(blob)
          const link = document.createElement('a')
          const cleanName =
            (currentGeneration.originalIdea || 'thamili_image')
              .slice(0, 24)
              .replace(/[^a-zA-Z0-9]/g, '_') || 'thamili_image'
          link.href = downloadUrl
          link.download = `thamili-${cleanName}.${ext}`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(downloadUrl)

          setDownloadStatus('downloaded')
          setIsDownloadMenuOpen(false)
          showToast(`Downloaded as .${ext.toUpperCase()} ✓`)
          setTimeout(() => setDownloadStatus('idle'), 2500)
        },
        mimeType,
        0.95
      )
    } catch (err) {
      console.warn('Canvas conversion fallback:', err)
      const link = document.createElement('a')
      link.href = currentGeneration.url
      link.download = `thamili-image.${format}`
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setDownloadStatus('downloaded')
      setIsDownloadMenuOpen(false)
      showToast(`Downloaded image ✓`)
      setTimeout(() => setDownloadStatus('idle'), 2500)
    }
  }

  return (
    <div className={`app-container ${isGenerating ? 'is-generating-active' : ''}`}>
      {/* Real smooth flowing ambient light waves */}
      <BackgroundWaves />

      {/* Floating Animated Clone for Reference Flight Animation */}
      {flyingImage && (
        <div
          className="flying-reference-clone"
          style={{
            '--start-top': `${flyingImage.startTop}px`,
            '--start-left': `${flyingImage.startLeft}px`,
            '--start-width': `${flyingImage.startWidth}px`,
            '--start-height': `${flyingImage.startHeight}px`,
            '--end-top': `${flyingImage.endTop}px`,
            '--end-left': `${flyingImage.endLeft}px`,
            '--end-width': `${flyingImage.endWidth}px`,
            '--end-height': `${flyingImage.endHeight}px`
          }}
        >
          <img src={flyingImage.src} alt="Flying Reference" className="flying-reference-img" />
        </div>
      )}

      {/* Hidden File Input for Reference Image Attachment */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={handleReferenceUpload}
      />
      {/* Hidden File Input for Reference Concept Style Image Upload */}
      <input
        type="file"
        ref={referenceCardFileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleReferenceCardFileUpload}
      />

      {/* ================= SIDEBAR (Stable Structural Anchor) ================= */}
      <aside className="sidebar">
        <div className="brand-logo" onClick={handleNavigateHome} title="THAMILI">
          <img
            src={sidebarLogoImg}
            alt="THAMILI"
            className="sidebar-logo-img"
          />
        </div>

        <nav className="nav-section">
          {/* Images Accordion / Dropdown */}
          <div className="nav-group-parent images-nav-group">
            {/* Images Main Nav Dropdown Trigger */}
            <button
              type="button"
              className={`nav-item nav-item-images-trigger ${
                activeTab === 'AI Image' && imagesSubTab === 'studio' ? 'active' : ''
              }`}
              onClick={handleNavigateHome}
              title="Images Home"
            >
              <div className="nav-item-left">
                <ImageIcon size={18} className="nav-icon" />
                <span>Images</span>
              </div>
              <ChevronDown
                size={14}
                className={`nav-expand-chevron ${isImagesDropdownOpen ? 'expanded' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsImagesDropdownOpen((prev) => !prev)
                }}
              />
            </button>

            {/* Images Dropdown Sub-Menu */}
            {isImagesDropdownOpen && (
              <div className="images-nav-dropdown">
                {/* 1. New Chat Sub-Button */}
                <button
                  type="button"
                  className="images-sub-btn btn-images-new-chat"
                  onClick={() => {
                    setActiveTab('AI Image')
                    setImagesSubTab('studio')
                    handleResetToNewChat()
                  }}
                  title="Start a fresh new image chat"
                >
                  <div className="sub-btn-left">
                    <Plus size={15} className="sub-btn-icon sub-icon-plus" />
                    <span>New Chat</span>
                  </div>
                </button>

                {/* 2. Gallery & Folders Sub-Button (Moved from hero search bar below to here) */}
                <button
                  type="button"
                  className="images-sub-btn btn-images-gallery"
                  onClick={() => {
                    setIsGalleryOpen(true)
                  }}
                  title="Open Saved Gallery & Folders"
                >
                  <div className="sub-btn-left">
                    <Layers size={14} className="sub-btn-icon sub-icon-layers" />
                    <span>Gallery & Folders</span>
                  </div>
                </button>

                {/* 3. Recent Searches & Chat History Section */}
                <div className="sidebar-history-section">
                  <div className="sidebar-history-header">
                    <div className="history-header-left">
                      <Clock size={12} className="history-header-icon" />
                      <span>{isLoggedIn ? 'Recent Chats' : 'Recent Searches'}</span>
                    </div>
                    <div className="history-header-actions">
                      <button
                        type="button"
                        className="btn-history-search-icon"
                        onClick={() => setIsSearchModalOpen(true)}
                        title="Search chats (Ctrl+K)"
                        aria-label="Search chats"
                      >
                        <Search size={13} className="btn-search-symbol" />
                      </button>
                    </div>
                  </div>

                  <div className="sidebar-history-list">
                    {searchHistory.length === 0 ? (
                      <div className="history-empty-state">No recent searches</div>
                    ) : (
                      searchHistory.map((item) => (
                        <div
                          key={item.id}
                          className={`sidebar-history-item ${activeChatId === item.id ? 'active-chat-item' : ''}`}
                          onClick={() => handleSelectSearchHistory(item)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              handleSelectSearchHistory(item)
                            }
                          }}
                          title={`Click to open chat: "${item.title || item.query}"`}
                          role="button"
                          tabIndex={0}
                        >
                          <Search size={12} className="history-item-search-icon" />
                          <span className="history-item-text">{item.title || item.query}</span>
                          <span className="history-item-time-pill">{item.time}</span>
                          <button
                            type="button"
                            className="btn-del-history-item"
                            onClick={(e) => handleDeleteHistoryItem(e, item.id)}
                            title="Remove chat"
                          >
                            <X size={11} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {showUpgradeCard && (
          <div className="pro-card pro-card-auto-fade">
            <div className="pro-card-title">
              <span>Upgrade to Pro</span>
              
            </div>
            <p className="pro-card-desc">
              Unlock more power, more models, and more possibilities.
            </p>
            <button
              className="pro-btn"
              onClick={() => setIsAuthModalOpen(true)}
            >
              Upgrade Now
            </button>
          </div>
        )}

        {/* USER PROFILE BUTTON */}
        <div className="user-profile-container">
          {/* User Profile Bar / Trigger */}
          <div
            className={`user-profile ${isUserMenuOpen ? 'menu-open' : ''} ${isLoggedIn ? 'is-logged-in' : ''}`}
            onClick={() => setIsUserMenuOpen(true)}
            title={isLoggedIn ? `Signed in as ${currentUser?.name}` : 'Click to open Creator Studio'}
          >
            <div className="user-info">
              <div className="avatar">{isLoggedIn ? (currentUser?.avatar || 'A') : 'U'}</div>
              <div className="user-details">
                <span className="user-name">{isLoggedIn ? (currentUser?.name || 'Adrin') : 'User'}</span>
                <span className="user-role-label">{isLoggedIn ? 'Pro Creator' : 'Guest Mode'}</span>
              </div>
            </div>
            <button
              type="button"
              className="user-profile-theme-toggle"
              onClick={(e) => {
                e.stopPropagation()
                toggleTheme()
              }}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? (
                <MoonStar size={16} className="user-theme-icon moon-icon" />
              ) : (
                <SunMedium size={16} className="user-theme-icon sun-icon" />
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN WRAPPER ================= */}
      <div className="main-wrapper">

        {/* ================= HOME VIEW ================= */}
        {activeTab === 'Home' && (
          <main className="home-container">
            <div className="hero-branding">
              <div className="big-logo-container">
                <img
                  src={thamiliLogoImg}
                  alt="THAMILI"
                  className="hero-brand-logo-img"
                />
              </div>

              <h2 className="hero-title">
                One AI. <span className="gradient-text">Infinite Possibilities.</span>
              </h2>
              <p className="hero-subtitle">
                All the AI models and tools you need, in one simple place.
              </p>
            </div>

            <div className="prompt-box-card">
              <textarea
                className="prompt-textarea"
                placeholder="How can I help you today?"
                rows={2}
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
              />
              <div className="prompt-actions">
                <button className="attach-btn" title="Attach file">
                  <Paperclip size={18} />
                </button>
                <button
                  className="send-btn"
                  title="Submit prompt"
                  onClick={() => {
                    setActiveTab('AI Image')
                    showToast('Welcome to AI Image Studio!')
                  }}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div className="tools-pills-row">
              <button className="tool-pill" onClick={() => setActiveTab('AI Chat')}>
                <MessageSquare size={16} color="#3b82f6" />
                <span>AI Chat</span>
              </button>
              <button className="tool-pill" onClick={() => setActiveTab('AI Code')}>
                <Code size={16} color="#8b5cf6" />
                <span>AI Code</span>
              </button>
              <button className="tool-pill" onClick={handleNavigateHome}>
                <ImageIcon size={16} color="#d946ef" />
                <span>AI Image</span>
              </button>
              <button className="tool-pill" onClick={() => setActiveTab('AI Video')}>
                <Video size={16} color="#06b6d4" />
                <span>AI Video</span>
              </button>
              <button className="tool-pill" onClick={() => setActiveTab('AI Learn')}>
                <GraduationCap size={16} color="#10b981" />
                <span>AI Learn</span>
              </button>
            </div>

            <div className="footer-powered">
              Powered by advanced AI technology 
            </div>
          </main>
        )}

        {/* ================= COMPLETE LIGHT iOS AI IMAGE WORKSPACE ================= */}
        {activeTab === 'AI Image' && (
          <main className={`image-studio-container ${chatMessages.length > 0 || isGenerating ? 'is-chat-mode' : ''}`}>
              <>
                {/* 2A. INITIAL WELCOME / HERO VIEW (Shown when no chat messages yet) */}
                {chatMessages.length === 0 && !isGenerating && (
                  <>
                    {/* 1. HEADER */}
                    <div className="create-images-header">
                      <img
                        src={thamiliLogoImg}
                        alt="THAMILI Logo"
                        className="create-images-standalone-logo"
                      />
                      <h1 className="create-images-title">
                        Create images with <span className="title-brand-accent">Thamili AI</span>
                      </h1>
                    </div>

                    <div className="workspace-stage-wrapper">
                      <div className="prompt-composer-glass-card is-ready-mode">
                        {/* Attached Reference & Uploaded Image Thumbnails */}
                        {attachedReferences.length > 0 && (
                          <div className="attached-references-dropzone">
                            {attachedReferences.map((ref) => {
                              const isRefConcept = ref.isTemplate || ref.isReferenceConcept || ref.type === 'reference'
                              return (
                                <div
                                  key={ref.id}
                                  className={`attached-ref-thumbnail-card ${
                                    isRefConcept ? 'is-concept-ref' : 'is-user-upload'
                                  }`}
                                  title={
                                    isRefConcept
                                      ? `Reference Concept: ${ref.name || 'Style'}`
                                      : `Uploaded Image: ${ref.name || 'Image'}`
                                  }
                                >
                                  <img
                                    src={ref.preview}
                                    alt={ref.name || 'Reference'}
                                    className="attached-ref-thumb-img"
                                  />
                                  <div className="attached-ref-overlay-gradient" />

                                  <div
                                    className={`attached-ref-tag-pill ${
                                      isRefConcept ? 'tag-concept' : 'tag-upload'
                                    }`}
                                  >
                                    {isRefConcept ? (
                                      <>
                                        
                                        <span>Ref Img</span>
                                      </>
                                    ) : (
                                      <>
                                        <Upload size={8} className="ref-tag-upload-icon" />
                                        <span>User Img</span>
                                      </>
                                    )}
                                  </div>

                                  <button
                                    type="button"
                                    className="attached-ref-remove-btn"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleRemoveReference(ref.id)
                                    }}
                                    title={isRefConcept ? 'Remove reference style' : 'Remove uploaded image'}
                                  >
                                    <X size={10} />
                                  </button>
                                </div>
                              )
                            })}
                          </div>
                        )}

                        {/* Generated AI Prompt Action Banner */}
                        {generatedPromptBanner && (
                          <div className="generated-prompt-action-strip">
                            <div className="prompt-strip-left">
                              
                              <span>AI Prompt for <strong>{generatedPromptBanner.conceptName}</strong></span>
                            </div>
                            <div className="prompt-strip-actions">
                              <button
                                type="button"
                                className="prompt-strip-copy-btn"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  navigator.clipboard.writeText(ideaText || generatedPromptBanner.prompt)
                                  setGeneratedPromptBanner((prev) => prev ? { ...prev, copied: true } : null)
                                  showToast('Prompt copied to clipboard! 📋')
                                  setTimeout(() => {
                                    setGeneratedPromptBanner((prev) => prev ? { ...prev, copied: false } : null)
                                  }, 2500)
                                }}
                                title="Copy prompt for future use"
                              >
                                {generatedPromptBanner.copied ? <Check size={12} /> : <Copy size={12} />}
                                <span>{generatedPromptBanner.copied ? 'Copied' : 'Copy Prompt'}</span>
                              </button>
                              <button
                                type="button"
                                className="prompt-strip-dismiss-btn"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setGeneratedPromptBanner(null)
                                }}
                                title="Dismiss banner"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          </div>
                        )}

                        <textarea
                          ref={searchInputRef}
                          className="prompt-composer-textarea"
                          placeholder="Describe your image"
                          rows={2}
                          value={ideaText}
                          disabled={isGenerating}
                          onChange={(e) => setIdeaText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey && !isGenerating) {
                              e.preventDefault()
                              handleGenerateFromIdea()
                            }
                          }}
                        />

                        {/* PROMPT BAR CONTROLS */}
                        <div className="composer-action-bar">
                          {/* LEFT CONTROLS: [ + ] [ Inspire 🎲 ] */}
                          <div className="composer-left-actions">
                            <div className="plus-menu-anchor-wrap" ref={plusMenuRef}>
                              <button
                                type="button"
                                className={`composer-plus-btn ${isPlusMenuOpen ? 'menu-active' : ''}`}
                                title="Add options & ratio"
                                onClick={() => {
                                  setIsPlusMenuOpen((prev) => !prev)
                                  if (isPlusMenuOpen) {
                                    setIsRatioExpanded(false)
                                  }
                                }}
                              >
                                <span className="btn-plus-sheen" />
                                <Plus size={17} className="plus-icon-animated" />
                              </button>

                              {/* PROGRESSIVE DISCLOSURE PLUS GLASS MENU */}
                              {isPlusMenuOpen && (
                                <div className="plus-expandable-glass-menu">
                                  {/* 1. Progressive Ratio Option */}
                                  <div className="plus-menu-section">
                                    <div
                                      className={`plus-menu-row-item ${
                                        isRatioExpanded ? 'expanded-active' : ''
                                      }`}
                                      onClick={() => setIsRatioExpanded((prev) => !prev)}
                                    >
                                      <div className="menu-row-left">
                                        <SlidersHorizontal size={15} className="menu-item-icon" />
                                        <span>Ratio</span>
                                      </div>
                                      <div className="menu-row-right">
                                        <span className="current-ratio-tag">{aspectRatio}</span>
                                        <ChevronRight
                                          size={14}
                                          className={`ratio-expand-chevron ${
                                            isRatioExpanded ? 'rotated' : ''
                                          }`}
                                        />
                                      </div>
                                    </div>

                                    {/* RATIO SUB-BAR */}
                                    {isRatioExpanded && (
                                      <div className="ratio-horizontal-subbar">
                                        {['1:1', '16:9', '9:16', '4:3', '3:4', '3:2', '2:3'].map((r, idx) => (
                                          <button
                                            key={r}
                                            type="button"
                                            style={{ animationDelay: `${idx * 35}ms` }}
                                            className={`ratio-sub-btn ${
                                              aspectRatio === r ? 'active' : ''
                                            }`}
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              setAspectRatio(r)
                                              showToast(`Aspect ratio set to ${r}`)
                                              setTimeout(() => {
                                                setIsRatioExpanded(false)
                                              }, 220)
                                            }}
                                          >
                                            {r}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                  </div>

                                  {/* 2. Upload Your Image Option */}
                                  <div
                                    className="plus-menu-row-item"
                                    onClick={() => {
                                      fileInputRef.current?.click()
                                      setIsPlusMenuOpen(false)
                                    }}
                                  >
                                    <div className="menu-row-left">
                                      <ImagePlus size={15} className="menu-item-icon" />
                                      <span>Upload your image</span>
                                    </div>
                                    <span className="menu-action-hint">Upload</span>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* INSPIRE / SURPRISE ME DICE BUTTON */}
                            <button
                              type="button"
                              className="composer-inspire-btn"
                              onClick={handleRandomInspirePrompt}
                              title="Surprise me — Inspire with an epic prompt (🎲)"
                            >
                              <span className="inspire-sheen" />
                              <Dices size={15} className="inspire-dice-icon" />
                              <span className="inspire-label">Inspire</span>
                            </button>
                          </div>

                          {/* RIGHT CONTROLS: [ Flash ▼ ] [ Generate ] */}
                          <div className="composer-right-actions">
                            {/* Model Selector Dropdown */}
                            <div className="model-dropdown-container">
                              <button
                                type="button"
                                className="composer-model-pill"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setIsModelDropdownOpen((prev) => !prev)
                                }}
                                title="Switch AI Model Engine"
                              >
                                <span className="btn-flash-sheen" />
                                {(() => {
                                  const currentModelObj = AVAILABLE_AI_MODELS.find((m) => m.id === selectedModel || m.name === selectedModel || m.shortName === selectedModel)
                                  const CurrentIcon = currentModelObj?.icon || Zap
                                  return <CurrentIcon size={13} className="model-zap-icon zap-electric-animated" style={{ color: currentModelObj?.color }} />
                                })()}
                                <span className="model-name">
                                  {AVAILABLE_AI_MODELS.find((m) => m.id === selectedModel || m.name === selectedModel || m.shortName === selectedModel)?.shortName || selectedModel}
                                </span>
                                <ChevronDown
                                  size={13}
                                  className={`model-chevron ${isModelDropdownOpen ? 'open' : ''}`}
                                />
                              </button>

                              {isModelDropdownOpen && (
                                <div className="model-dropdown-menu">
                                  <div className="model-dropdown-header">
                                    
                                    <span>Select AI Model Engine</span>
                                  </div>
                                  <div className="model-dropdown-list">
                                    {AVAILABLE_AI_MODELS.map((model) => {
                                      const isCurrent = selectedModel === model.id || selectedModel === model.name || selectedModel === model.shortName
                                      const IconComp = model.icon || Zap
                                      return (
                                        <button
                                          key={model.id}
                                          type="button"
                                          className={`model-dropdown-card-item ${isCurrent ? 'active' : ''}`}
                                          onClick={() => {
                                            setSelectedModel(model.name)
                                            setIsModelDropdownOpen(false)
                                            showToast(`Switched to ${model.name} (${model.badge}) `)
                                          }}
                                        >
                                          <div className="model-item-left">
                                            <div className="model-item-icon-box" style={{ background: `${model.color}15`, color: model.color }}>
                                              <IconComp size={14} />
                                            </div>
                                            <div className="model-item-texts">
                                              <div className="model-item-title-row">
                                                <span className="model-item-title">{model.name}</span>
                                                <span className="model-item-badge" style={{ color: model.color, borderColor: `${model.color}35`, background: `${model.color}10` }}>
                                                  {model.badge}
                                                </span>
                                              </div>
                                              <span className="model-item-desc">{model.desc}</span>
                                            </div>
                                          </div>
                                          {isCurrent && <Check size={14} className="model-check-icon" />}
                                        </button>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* PRIMARY GENERATE / STOP BUTTON */}
                            <button
                              type="button"
                              className={`composer-generate-btn ${isGenerating ? 'btn-generating is-stop-btn' : ''}`}
                              onClick={isGenerating ? handleStopGenerating : () => handleGenerateFromIdea()}
                              title={isGenerating ? "Stop generating" : "Generate image"}
                              aria-label={isGenerating ? "Stop generating" : "Generate image"}
                            >
                              {isGenerating ? (
                                <span className="composer-stop-icon-wrapper">
                                  <Square size={13} fill="currentColor" strokeWidth={0} className="composer-stop-icon" />
                                </span>
                              ) : (
                                <>
                                  <span className="btn-generate-sheen" />
                                  <span className="generate-btn-text">Generate</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3. INSPIRATION / REFERENCE TEMPLATE CARDS */}
                    <div className="template-cards-section">
                      <div className="template-cards-row">
                        {REFERENCE_TEMPLATE_SLOTS.map((slotItems, slotIndex) => {
                          const activeTmpl = slotItems[templateCycleIndex % slotItems.length]
                          return (
                            <div
                              key={`slot-${slotIndex}`}
                              className={`template-card template-card-motion-${slotIndex}`}
                              onClick={(e) => handleTemplateReferenceClick(activeTmpl, e)}
                              title={`Click to attach ${activeTmpl.name} image as reference`}
                              role="button"
                              tabIndex={0}
                            >
                              <div className="template-card-img-wrap">
                                {slotItems.map((item, imgIdx) => {
                                  const isCurrent = imgIdx === (templateCycleIndex % slotItems.length)
                                  return (
                                    <img
                                      key={item.id}
                                      src={item.image}
                                      alt={item.name}
                                      className={`template-card-img template-img-motion-${slotIndex} ${
                                        isCurrent ? 'template-img-active' : 'template-img-inactive'
                                      }`}
                                      loading="eager"
                                    />
                                  )
                                })}
                              </div>
                              <div className="template-card-gradient" />
                              <div className="template-card-sheen" />
                              <div className="template-card-label-wrap">
                                <span key={activeTmpl.id} className="template-card-label animated-title-fade">
                                  {activeTmpl.name}
                                </span>
                              </div>
                            </div>
                          )
                        })}

                        {/* DEDICATED MORE / EXPLORE 11 REFERENCE CONCEPTS CARD */}
                        <div
                          className="template-card template-card-see-all"
                          onClick={() => setIsCategoriesModalOpen(true)}
                          title="Explore all 11 reference image concept styles"
                          role="button"
                          tabIndex={0}
                        >
                          <div className="see-all-mosaic-wrap">
                            <img
                              src={REFERENCE_CONCEPT_STYLES[0].image}
                              alt="Paint Reference"
                              className="see-all-mosaic-img"
                              loading="eager"
                            />
                            <img
                              src={REFERENCE_CONCEPT_STYLES[6].image}
                              alt="Bloom Reference"
                              className="see-all-mosaic-img"
                              loading="eager"
                            />
                            <img
                              src={REFERENCE_CONCEPT_STYLES[2].image}
                              alt="Plushie Reference"
                              className="see-all-mosaic-img"
                              loading="eager"
                            />
                            <img
                              src={REFERENCE_CONCEPT_STYLES[3].image}
                              alt="Clay Reference"
                              className="see-all-mosaic-img"
                              loading="eager"
                            />
                          </div>
                          <div className="see-all-dark-overlay" />
                          <div className="template-card-sheen" />
                          <div className="see-all-content-overlay">
                            <div className="see-all-bottom-bar">
                              <div className="see-all-pill-btn">
                                <span>More</span>
                              </div>
                              <span className="see-all-sub-caption">11 Styles ➔</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* 2B. GEMINI-STYLE CHAT CONVERSATION STREAM VIEW */}
                {(chatMessages.length > 0 || isGenerating) && (
                  <div className="chat-conversation-wrapper">
                    {/* Scrollable Conversation Stream */}
                    <div className="chat-thread-container" ref={chatScrollRef}>
                      {/* Top Centered Time Header */}
                      <div className="chat-thread-header-bar">
                        <div className="chat-thread-time-header">
                          {(() => {
                            const firstUserMsg = chatMessages.find((m) => m.role === 'user' && m.createdAt)
                            if (firstUserMsg && firstUserMsg.createdAt) {
                              return firstUserMsg.createdAt.includes('Today') ? firstUserMsg.createdAt.replace('Today, ', 'Today ') : `Today ${firstUserMsg.createdAt}`
                            }
                            const now = new Date()
                            return `Today ${now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
                          })()}
                        </div>
                      </div>

                      {chatMessages.map((msg) => {
                        if (msg.role === 'user') {
                          return (
                            <div key={msg.id} className="chat-user-message-row">
                              <div className="chat-user-bubble">
                                {msg.references && msg.references.length > 0 && (
                                  <div className="chat-user-attached-refs">
                                    {msg.references.map((r) => (
                                      <div key={r.id} className="chat-user-ref-pill">
                                        <img src={r.preview} alt={r.name} className="chat-user-ref-thumb" />
                                        <span className="chat-user-ref-name">{r.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <div className="chat-user-text">{msg.text}</div>
                              </div>
                            </div>
                          )
                        }

                        // Assistant Conversational Text Response (Greetings, FAQs, Help)
                        if (msg.isTextResponse || msg.type === 'text') {
                          return (
                            <div key={msg.id} className="chat-assistant-message-row text-response-row">
                              <div className="assistant-text-bubble">
                                <div className="assistant-bubble-header">
                                  
                                  <span className="assistant-brand-name">Thamili AI</span>
                                </div>
                                <div className="assistant-bubble-body">
                                  <p>{msg.text}</p>
                                  {msg.suggestions && msg.suggestions.length > 0 && (
                                    <div className="assistant-suggestions-chips">
                                      {msg.suggestions.map((sug, sIdx) => (
                                        <button
                                          key={sIdx}
                                          type="button"
                                          className="suggestion-chip-btn"
                                          onClick={() => {
                                            setIdeaText(sug)
                                            handleGenerateFromIdea(sug)
                                          }}
                                        >
                                          
                                          <span>{sug}</span>
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        }

                        // Assistant AI Image Card
                        const hasError = msg.error || (!msg.isGenerating && !msg.url)
                        const hasImage = !msg.isGenerating && !msg.error && !!msg.url

                        return (
                          <div key={msg.id} className="chat-assistant-message-row">
                            <div className="chat-image-card-wrapper">
                              <div className={`chat-image-card ${msg.isGenerating ? 'is-generating' : ''}`} data-ratio={msg.ratio || aspectRatio}>
                                {msg.isGenerating ? (
                                  <div className="composer-generating-view chat-generating-view">
                                    {msg.url && (
                                      <div
                                        className={`developing-image-preview blur-stage-${Math.min(
                                          msg.generationStep !== undefined ? msg.generationStep : generationStep,
                                          4
                                        )}`}
                                        style={{ backgroundImage: `url(${msg.url})` }}
                                      />
                                    )}
                                    <ChatGPTDotMatrixCanvas step={msg.generationStep !== undefined ? msg.generationStep : generationStep} />
                                  </div>
                                ) : hasError ? (
                                  <div className="chat-error-card-content">
                                    <div className="chat-error-icon-wrapper">
                                      <AlertTriangle size={26} className="chat-error-warning-icon" />
                                    </div>
                                    <h3 className="chat-error-title">Image Generation Notice</h3>
                                    <p className="chat-error-detail">
                                      {msg.errorMessage || 'Unable to render image. Please try again.'}
                                    </p>
                                    <div className="chat-error-actions-row">
                                      <button
                                        type="button"
                                        className="chat-error-retry-btn"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          const retryPrompt = msg.originalIdea || msg.prompt
                                          if (retryPrompt) handleGenerateFromIdea(retryPrompt)
                                        }}
                                      >
                                        <RefreshCw size={14} />
                                        <span>Retry Generation</span>
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <img
                                    src={msg.url}
                                    alt={msg.originalIdea || msg.prompt}
                                    className="chat-result-img"
                                    loading="eager"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none'
                                    }}
                                    onClick={() => !msg.isGenerating && setFullscreenImageModal(msg)}
                                    title="Click to view full screen"
                                  />
                                )}

                                {/* 3 Floating Action Buttons on Hover in Top-Right Corner */}
                                {hasImage && (
                                  <div className="chat-img-hover-actions">
                                    <button
                                      type="button"
                                      className="chat-img-pill-action"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleShareImage(msg.url, msg.originalIdea || msg.prompt)
                                      }}
                                      title="Share image"
                                    >
                                      <Share2 size={16} />
                                    </button>
                                    <button
                                      type="button"
                                      className="chat-img-pill-action"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleCopyImageOrPrompt(msg.url, msg.originalIdea || msg.prompt)
                                      }}
                                      title="Copy prompt"
                                    >
                                      <Copy size={16} />
                                    </button>
                                    <button
                                      type="button"
                                      className="chat-img-pill-action"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleDirectDownload(msg.url, msg.originalIdea || msg.prompt)
                                      }}
                                      title="Download image"
                                    >
                                      <Download size={16} />
                                    </button>
                                  </div>
                                )}

                                {/* In-Card Bottom Overlay: Edit & Remix Pills (Bottom-Left) */}
                                {hasImage && (
                                  <div className="chat-img-in-card-bottom-overlay">
                                    <button
                                      type="button"
                                      className="chat-img-edit-pill-btn"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        const promptToEdit = msg.originalIdea || msg.prompt || ''
                                        setIdeaText(promptToEdit)
                                        if (searchInputRef.current) {
                                          searchInputRef.current.focus()
                                          searchInputRef.current.select?.()
                                        }
                                      }}
                                      title="Edit prompt"
                                    >
                                      <span>Edit</span>
                                    </button>
                                  </div>
                                )}

                                {/* Official Thamili Watermark Logo (Bottom-Right Corner) */}
                                {hasImage && (
                                  <div className="chat-img-watermark-logo" title="Created with Thamili AI">
                                    <img
                                      src={thamiliWatermarkImg}
                                      alt="Thamili AI"
                                      className="chat-img-watermark-icon"
                                    />
                                  </div>
                                )}
                              </div>

                              {/* Bottom Reactions & Options Row matching reference */}
                              {hasImage && (
                                <div className="chat-img-bottom-reactions">
                                  <button
                                    type="button"
                                    className="chat-reaction-btn"
                                    onClick={() => handleCopyImageOrPrompt(msg.url, msg.originalIdea || msg.prompt)}
                                    title="Copy prompt"
                                  >
                                    <Copy size={16} />
                                  </button>
                                  <button
                                    type="button"
                                    className={`chat-reaction-btn ${msg.liked ? 'active-like' : ''}`}
                                    onClick={() => handleToggleLike(msg.id)}
                                    title="Good response"
                                  >
                                    <ThumbsUp size={16} />
                                  </button>
                                  <button
                                    type="button"
                                    className={`chat-reaction-btn ${msg.disliked ? 'active-dislike' : ''}`}
                                    onClick={() => handleToggleDislike(msg.id)}
                                    title="Bad response"
                                  >
                                    <ThumbsDown size={16} />
                                  </button>
                                  <button
                                    type="button"
                                    className="chat-reaction-btn"
                                    onClick={() => handleShareImage(msg.url, msg.originalIdea || msg.prompt)}
                                    title="Share"
                                  >
                                    <Share2 size={16} />
                                  </button>
                                  <button
                                    type="button"
                                    className="chat-reaction-btn"
                                    onClick={() => handleToggleSave(msg.id)}
                                    title="More options"
                                  >
                                    <MoreHorizontal size={16} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                      {/* Anchor element to automatically scroll all the way to bottom */}
                      <div ref={chatBottomRef} className="chat-thread-bottom-anchor" style={{ height: '1px', width: '100%', flexShrink: 0, pointerEvents: 'none' }} />
                    </div>

                    {/* Sticky Bottom Prompt Composer */}
                    <div className="chat-bottom-composer-wrapper">
                      <div className="prompt-composer-glass-card is-ready-mode composer-bottom-pill">
                        {/* Attached Reference & Uploaded Image Thumbnails */}
                        {attachedReferences.length > 0 && (
                          <div className="attached-references-dropzone">
                            {attachedReferences.map((ref) => {
                              const isRefConcept = ref.isTemplate || ref.isReferenceConcept || ref.type === 'reference'
                              return (
                                <div
                                  key={ref.id}
                                  className={`attached-ref-thumbnail-card ${
                                    isRefConcept ? 'is-concept-ref' : 'is-user-upload'
                                  }`}
                                  title={
                                    isRefConcept
                                      ? `Reference Concept: ${ref.name || 'Style'}`
                                      : `Uploaded Image: ${ref.name || 'Image'}`
                                  }
                                >
                                  <img
                                    src={ref.preview}
                                    alt={ref.name || 'Reference'}
                                    className="attached-ref-thumb-img"
                                  />
                                  <div className="attached-ref-overlay-gradient" />

                                  <div
                                    className={`attached-ref-tag-pill ${
                                      isRefConcept ? 'tag-concept' : 'tag-upload'
                                    }`}
                                  >
                                    {isRefConcept ? (
                                      <>
                                        
                                        <span>Ref Img</span>
                                      </>
                                    ) : (
                                      <>
                                        <Upload size={8} className="ref-tag-upload-icon" />
                                        <span>User Img</span>
                                      </>
                                    )}
                                  </div>

                                  <button
                                    type="button"
                                    className="attached-ref-remove-btn"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleRemoveReference(ref.id)
                                    }}
                                    title={isRefConcept ? 'Remove reference style' : 'Remove uploaded image'}
                                  >
                                    <X size={10} />
                                  </button>
                                </div>
                              )
                            })}
                          </div>
                        )}

                        {/* Generated AI Prompt Action Banner */}
                        {generatedPromptBanner && (
                          <div className="generated-prompt-action-strip">
                            <div className="prompt-strip-left">
                              
                              <span>AI Prompt for <strong>{generatedPromptBanner.conceptName}</strong></span>
                            </div>
                            <div className="prompt-strip-actions">
                              <button
                                type="button"
                                className="prompt-strip-copy-btn"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  navigator.clipboard.writeText(ideaText || generatedPromptBanner.prompt)
                                  setGeneratedPromptBanner((prev) => prev ? { ...prev, copied: true } : null)
                                  showToast('Prompt copied to clipboard! 📋')
                                  setTimeout(() => {
                                    setGeneratedPromptBanner((prev) => prev ? { ...prev, copied: false } : null)
                                  }, 2500)
                                }}
                                title="Copy prompt for future use"
                              >
                                {generatedPromptBanner.copied ? <Check size={12} /> : <Copy size={12} />}
                                <span>{generatedPromptBanner.copied ? 'Copied' : 'Copy Prompt'}</span>
                              </button>
                              <button
                                type="button"
                                className="prompt-strip-dismiss-btn"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setGeneratedPromptBanner(null)
                                }}
                                title="Dismiss banner"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          </div>
                        )}

                        <textarea
                          ref={searchInputRef}
                          className="prompt-composer-textarea"
                          placeholder="Describe your image"
                          rows={1}
                          value={ideaText}
                          disabled={isGenerating}
                          onChange={(e) => setIdeaText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey && !isGenerating) {
                              e.preventDefault()
                              handleGenerateFromIdea()
                            }
                          }}
                        />

                        {/* PROMPT BAR CONTROLS */}
                        <div className="composer-action-bar">
                          {/* LEFT CONTROLS: [ + ] [ Images ] */}
                          <div className="composer-left-actions">
                            <div className="plus-menu-anchor-wrap" ref={plusMenuRef}>
                              <button
                                type="button"
                                className={`composer-plus-btn ${isPlusMenuOpen ? 'menu-active' : ''}`}
                                title="Add options & ratio"
                                onClick={() => {
                                  setIsPlusMenuOpen((prev) => !prev)
                                  if (isPlusMenuOpen) {
                                    setIsRatioExpanded(false)
                                  }
                                }}
                              >
                                <span className="btn-plus-sheen" />
                                <Plus size={17} className="plus-icon-animated" />
                              </button>

                              {/* PROGRESSIVE DISCLOSURE PLUS GLASS MENU */}
                              {isPlusMenuOpen && (
                                <div className="plus-expandable-glass-menu">
                                  {/* 1. Progressive Ratio Option */}
                                  <div className="plus-menu-section">
                                    <div
                                      className={`plus-menu-row-item ${
                                        isRatioExpanded ? 'expanded-active' : ''
                                      }`}
                                      onClick={() => setIsRatioExpanded((prev) => !prev)}
                                    >
                                      <div className="menu-row-left">
                                        <SlidersHorizontal size={15} className="menu-item-icon" />
                                        <span>Ratio</span>
                                      </div>
                                      <div className="menu-row-right">
                                        <span className="current-ratio-tag">{aspectRatio}</span>
                                        <ChevronRight
                                          size={14}
                                          className={`ratio-expand-chevron ${
                                            isRatioExpanded ? 'rotated' : ''
                                          }`}
                                        />
                                      </div>
                                    </div>

                                    {/* RATIO SUB-BAR */}
                                    {isRatioExpanded && (
                                      <div className="ratio-horizontal-subbar">
                                        {['1:1', '16:9', '9:16', '4:3', '3:4', '3:2', '2:3'].map((r, idx) => (
                                          <button
                                            key={r}
                                            type="button"
                                            style={{ animationDelay: `${idx * 35}ms` }}
                                            className={`ratio-sub-btn ${
                                              aspectRatio === r ? 'active' : ''
                                            }`}
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              setAspectRatio(r)
                                              showToast(`Aspect ratio set to ${r}`)
                                              setTimeout(() => {
                                                setIsRatioExpanded(false)
                                              }, 220)
                                            }}
                                          >
                                            {r}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                  </div>

                                  {/* 2. Upload Your Image Option */}
                                  <div
                                    className="plus-menu-row-item"
                                    onClick={() => {
                                      fileInputRef.current?.click()
                                      setIsPlusMenuOpen(false)
                                    }}
                                  >
                                    <div className="menu-row-left">
                                      <ImagePlus size={15} className="menu-item-icon" />
                                      <span>Upload your image</span>
                                    </div>
                                    <span className="menu-action-hint">Upload</span>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* INSPIRE / SURPRISE ME DICE BUTTON */}
                            <button
                              type="button"
                              className="composer-inspire-btn"
                              onClick={handleRandomInspirePrompt}
                              title="Surprise me — Inspire with an epic prompt (🎲)"
                            >
                              <span className="inspire-sheen" />
                              <Dices size={15} className="inspire-dice-icon" />
                              <span className="inspire-label">Inspire</span>
                            </button>
                          </div>

                          {/* RIGHT CONTROLS: [ Flash ▼ ] [ Generate ] */}
                          <div className="composer-right-actions">
                            {/* Model Selector Dropdown */}
                            <div className="model-dropdown-container">
                              <button
                                type="button"
                                className="composer-model-pill"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setIsModelDropdownOpen((prev) => !prev)
                                }}
                                title="Switch AI Model Engine"
                              >
                                <span className="btn-flash-sheen" />
                                {(() => {
                                  const currentModelObj = AVAILABLE_AI_MODELS.find((m) => m.id === selectedModel || m.name === selectedModel || m.shortName === selectedModel)
                                  const CurrentIcon = currentModelObj?.icon || Zap
                                  return <CurrentIcon size={13} className="model-zap-icon zap-electric-animated" style={{ color: currentModelObj?.color }} />
                                })()}
                                <span className="model-name">
                                  {AVAILABLE_AI_MODELS.find((m) => m.id === selectedModel || m.name === selectedModel || m.shortName === selectedModel)?.shortName || selectedModel}
                                </span>
                                <ChevronDown
                                  size={13}
                                  className={`model-chevron ${isModelDropdownOpen ? 'open' : ''}`}
                                />
                              </button>

                              {isModelDropdownOpen && (
                                <div className="model-dropdown-menu">
                                  <div className="model-dropdown-header">
                                    
                                    <span>Select AI Model Engine</span>
                                  </div>
                                  <div className="model-dropdown-list">
                                    {AVAILABLE_AI_MODELS.map((model) => {
                                      const isCurrent = selectedModel === model.id || selectedModel === model.name || selectedModel === model.shortName
                                      const IconComp = model.icon || Zap
                                      return (
                                        <button
                                          key={model.id}
                                          type="button"
                                          className={`model-dropdown-card-item ${isCurrent ? 'active' : ''}`}
                                          onClick={() => {
                                            setSelectedModel(model.name)
                                            setIsModelDropdownOpen(false)
                                            showToast(`Switched to ${model.name} (${model.badge}) `)
                                          }}
                                        >
                                          <div className="model-item-left">
                                            <div className="model-item-icon-box" style={{ background: `${model.color}15`, color: model.color }}>
                                              <IconComp size={14} />
                                            </div>
                                            <div className="model-item-texts">
                                              <div className="model-item-title-row">
                                                <span className="model-item-title">{model.name}</span>
                                                <span className="model-item-badge" style={{ color: model.color, borderColor: `${model.color}35`, background: `${model.color}10` }}>
                                                  {model.badge}
                                                </span>
                                              </div>
                                              <span className="model-item-desc">{model.desc}</span>
                                            </div>
                                          </div>
                                          {isCurrent && <Check size={14} className="model-check-icon" />}
                                        </button>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* PRIMARY GENERATE / STOP BUTTON */}
                            <button
                              type="button"
                              className={`composer-generate-btn ${isGenerating ? 'btn-generating is-stop-btn' : ''}`}
                              onClick={isGenerating ? handleStopGenerating : () => handleGenerateFromIdea()}
                              title={isGenerating ? "Stop generating" : "Generate image"}
                              aria-label={isGenerating ? "Stop generating" : "Generate image"}
                            >
                              {isGenerating ? (
                                <span className="composer-stop-icon-wrapper">
                                  <Square size={13} fill="currentColor" strokeWidth={0} className="composer-stop-icon" />
                                </span>
                              ) : (
                                <>
                                  <span className="btn-generate-sheen" />
                                  <span className="generate-btn-text">Generate</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Disclaimer text below bottom composer */}
                      <div className="chat-disclaimer-text">
                        Thamili is AI and can make mistakes.
                      </div>
                    </div>
                  </div>
                )}
              </>
          </main>
        )}

        {/* Other sidebar pages */}
        {activeTab !== 'Home' && activeTab !== 'AI Image' && (
          <main className="workspace-page">
            <div className="workspace-inner-card">
              <div className="workspace-badge">Active Module</div>
              <h2 className="page-header-title">{activeTab} Workspace</h2>
              <p className="page-header-subtitle">
                This module is connected to THAMILI high-speed neural models.
              </p>
              <div style={{ marginTop: '24px' }}>
                <button
                  className="btn-getstarted"
                  onClick={handleNavigateHome}
                >
                  Go to AI Image Studio
                </button>
              </div>
            </div>
          </main>
        )}
      </div>

      {/* ================= COMPACT SQUARE POPUP WHILE SAVING IMAGE ================= */}
      {targetAssignImageId && isFolderModalOpen && (
        <div
          className="modal-overlay compact-save-backdrop"
          onClick={() => {
            setIsFolderModalOpen(false)
            setTargetAssignImageId(null)
            setIsCreatingFolder(false)
            setNewFolderName('')
            setIsExistingFolderDropdownOpen(false)
          }}
        >
          <div
            className="compact-square-save-card"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleCreateFolder} className="compact-square-save-form">
              <div className="compact-square-header">
                <div className="compact-square-title">
                  <span>Save to Folder</span>
                </div>
                <button
                  type="button"
                  className="compact-square-close"
                  onClick={() => {
                    setIsFolderModalOpen(false)
                    setTargetAssignImageId(null)
                    setIsCreatingFolder(false)
                    setNewFolderName('')
                    setIsExistingFolderDropdownOpen(false)
                  }}
                  title="Close"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Input row with Folder Symbol Button right next to it */}
              <div className="compact-input-group">
                <div className="compact-input-box">
                  <input
                    className="compact-square-input"
                    placeholder="Enter folder name..."
                    value={newFolderName}
                    autoFocus
                    onChange={(e) => setNewFolderName(e.target.value)}
                  />
                  <button
                    type="button"
                    className={`btn-folder-symbol-trigger ${isExistingFolderDropdownOpen ? 'active' : ''}`}
                    onClick={() => setIsExistingFolderDropdownOpen((prev) => !prev)}
                    title="Choose from existing folders"
                  >
                    <Folder size={16} />
                  </button>
                </div>

                {/* Dropdown list of existing folders when folder button is clicked */}
                {isExistingFolderDropdownOpen && (
                  <div className="compact-existing-folders-menu custom-scroll">
                    <div className="compact-menu-header">Select an existing folder:</div>
                    {combinedFolders.length === 0 ? (
                      <div className="compact-menu-empty">No existing folders yet</div>
                    ) : (
                      combinedFolders.map((folder) => {
                        const isSelected =
                          newFolderName.trim().toLowerCase() === folder.name.toLowerCase()
                        return (
                          <div
                            key={folder.id}
                            className={`compact-folder-option ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                              setNewFolderName(folder.name)
                              setIsExistingFolderDropdownOpen(false)
                            }}
                          >
                            <Folder size={14} className="folder-option-icon" />
                            <span className="folder-option-name">{folder.name}</span>
                            <span className="folder-option-count">
                              {folder.count || 0}
                            </span>
                          </div>
                        )
                      })
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="compact-square-actions">
                <button
                  type="button"
                  className="btn-cancel-glass compact-square-btn"
                  onClick={() => {
                    setIsFolderModalOpen(false)
                    setTargetAssignImageId(null)
                    setIsCreatingFolder(false)
                    setNewFolderName('')
                    setIsExistingFolderDropdownOpen(false)
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-add-folder compact-square-btn"
                  disabled={!newFolderName.trim()}
                >
                  <span>OK</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= FOLDER MANAGEMENT & GALLERY MODAL ================= */}
      {!targetAssignImageId && (isFolderModalOpen || isGalleryOpen) && (
        <div
          className="modal-overlay folder-modal-glass-backdrop"
          onClick={() => {
            setIsFolderModalOpen(false)
            setIsGalleryOpen(false)
            setIsCreatingFolder(false)
            setViewingFolder(null)
            setEditingFolderId(null)
          }}
        >
          <div
            className="modal-content folder-popup-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title-group">
                <div>
                  <h3 className="modal-title">Saved Folders and Gallery</h3>
                </div>
              </div>
              <div className="modal-header-actions">
                {modalActiveTab === 'folders' && (
                  <button
                    type="button"
                    className="btn-create-folder-pill"
                    onClick={() => {
                      setIsCreatingFolder((prev) => !prev)
                      if (!isCreatingFolder && !newFolderName) {
                        setNewFolderName('My New Collection')
                      }
                    }}
                    title="Create New Folder"
                    aria-label="Create New Folder"
                  >
                    <Plus size={16} />
                  </button>
                )}
                <button
                  className="modal-close-btn"
                  onClick={() => {
                    setIsFolderModalOpen(false)
                    setIsGalleryOpen(false)
                    setIsCreatingFolder(false)
                    setViewingFolder(null)
                    setTargetAssignImageId(null)
                    setEditingFolderId(null)
                  }}
                  title="Close"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* TOP TABS: 📁 FOLDERS | 🖼️ GALLERY */}
            <div className="modal-top-tabs">
              <button
                type="button"
                className={`modal-tab-btn ${modalActiveTab === 'folders' ? 'active' : ''}`}
                onClick={() => {
                  setModalActiveTab('folders')
                  setViewingFolder(null)
                }}
              >
                <Folder size={15} />
                <span>Folders</span>
              </button>
              <button
                type="button"
                className={`modal-tab-btn ${modalActiveTab === 'gallery' ? 'active' : ''}`}
                onClick={() => {
                  setModalActiveTab('gallery')
                  setViewingFolder(null)
                }}
              >
                <ImageIcon size={15} />
                <span>Gallery</span>
              </button>
            </div>

            {/* TAB 1: FOLDERS VIEW */}
            {modalActiveTab === 'folders' && (
              <>
                {/* Inline Folder Creator */}
                {isCreatingFolder && (
                  <form onSubmit={handleCreateFolder} className="folder-create-glass-card">
                    <div className="folder-create-header">
                      <span>Create New Folder</span>
                    </div>
                    <div className="folder-create-input-row">
                      <input
                        className="input-field folder-name-input"
                        placeholder="Enter folder name..."
                        value={newFolderName}
                        autoFocus
                        onChange={(e) => setNewFolderName(e.target.value)}
                      />
                      <div className="folder-create-actions">
                        <button
                          type="button"
                          className="btn-cancel-glass"
                          onClick={() => {
                            setIsCreatingFolder(false)
                            if (!targetAssignImageId) setNewFolderName('')
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn-add-folder"
                          disabled={!newFolderName.trim()}
                        >
                          <Check size={14} />
                          <span>Create Folder</span>
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Search & Sort Controls Bar */}
                <div className="folder-search-sort-bar">
                  <div className="folder-search-box">
                    <Search size={15} className="folder-search-icon" />
                    <input
                      type="text"
                      className="folder-search-input"
                      placeholder="Search folders..."
                      value={folderSearchQuery}
                      onChange={(e) => setFolderSearchQuery(e.target.value)}
                    />
                    {folderSearchQuery && (
                      <button
                        type="button"
                        className="folder-search-clear"
                        onClick={() => setFolderSearchQuery('')}
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>

                  <div className="folder-sort-box">
                    <SlidersHorizontal size={13} className="folder-sort-icon" />
                    <select
                      className="folder-sort-select"
                      value={folderSortBy}
                      onChange={(e) => setFolderSortBy(e.target.value)}
                    >
                      <option value="recent">Sort by: Recently updated</option>
                      <option value="name">Sort by: Name (A-Z)</option>
                      <option value="count">Sort by: Photo count</option>
                    </select>
                  </div>
                </div>

                {/* Folders List Header */}
                <div className="modal-divider-text">
                  <span>FOLDERS</span>
                  {targetAssignImageId && (
                    <span className="folder-target-hint">Click a folder to assign creation</span>
                  )}
                </div>

                <div className="existing-folders-list custom-scroll">
                  {filteredFolders.length === 0 ? (
                    <div className="empty-folders-note">
                      <Folder size={26} className="empty-folder-icon" />
                      <p>No matching folders found. Create one above!</p>
                    </div>
                  ) : (
                    filteredFolders.map((folder) => {
                      const theme = getFolderTheme(folder.name)
                      const isEditingThis = editingFolderId === folder.id

                      return (
                        <div
                          key={folder.id}
                          className={`folder-list-item ${selectedFolderId === folder.id ? 'is-selected' : ''}`}
                          style={{
                            '--folder-color': theme.iconColor,
                            '--folder-border': theme.border,
                            '--folder-hover-border': theme.hoverBorder,
                            '--folder-bg': theme.bg,
                            '--folder-hover-bg': theme.hoverBg,
                            '--folder-glow': theme.glow,
                            '--folder-badge-bg': theme.badgeBg,
                            '--folder-badge-text': theme.badgeText
                          }}
                          onClick={() => {
                            if (!isEditingThis) {
                              handleSelectOrAssignFolder(folder)
                            }
                          }}
                        >
                          <div className="folder-item-left">
                            <div
                              className="folder-item-icon-box"
                              style={{
                                background: theme.badgeBg,
                                color: theme.iconColor,
                                border: `1px solid ${theme.border}`
                              }}
                            >
                              <Folder size={18} />
                            </div>

                            {isEditingThis ? (
                              <form
                                className="folder-rename-form"
                                onSubmit={(e) => handleSaveRenameFolder(folder.id, e)}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <input
                                  className="folder-rename-input"
                                  value={editingFolderName}
                                  autoFocus
                                  onChange={(e) => setEditingFolderName(e.target.value)}
                                  placeholder="Folder name..."
                                />
                                <div className="folder-rename-actions">
                                  <button type="submit" className="btn-save-rename" title="Save">
                                    <Check size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-cancel-rename"
                                    onClick={(e) => handleCancelRenameFolder(e)}
                                    title="Cancel"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              </form>
                            ) : (
                              <div className="folder-item-info">
                                <div className="folder-item-title-row">
                                  <span className="folder-item-name">{folder.name}</span>
                                  <span
                                    className="folder-badge-pill"
                                    style={{
                                      background: theme.badgeBg,
                                      color: theme.badgeText
                                    }}
                                  >
                                    {folder.isCommonDomain ? 'DOMAIN' : 'CUSTOM'}
                                  </span>
                                </div>
                                <div className="folder-item-meta">
                                  <span>{folder.count || 0} {folder.count === 1 ? 'photo' : 'photos'}</span>
                                  <span>•</span>
                                  <span>Updated recently</span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="folder-item-right" onClick={(e) => e.stopPropagation()}>
                            {isManageFoldersMode && (
                              <div className="folder-manage-actions-group">
                                <button
                                  type="button"
                                  className="btn-rename-folder-icon"
                                  title="Rename folder"
                                  onClick={(e) => handleStartRenameFolder(folder, e)}
                                >
                                  <Pencil size={15} style={{ color: '#000000' }} />
                                </button>
                                <button
                                  type="button"
                                  className="btn-delete-folder-icon"
                                  title="Delete folder"
                                  onClick={(e) => handleDeleteFolder(folder.id, e)}
                                >
                                  <Trash2 size={15} style={{ color: '#ef4444' }} />
                                </button>
                              </div>
                            )}
                            <div
                              className="folder-enter-chevron"
                              style={{ color: theme.iconColor }}
                              title="Open folder in chat"
                              onClick={() => handleSelectOrAssignFolder(folder)}
                            >
                              <ChevronRight size={17} />
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className={`btn-secondary btn-close-pill btn-manage-folders-toggle ${isManageFoldersMode ? 'active' : ''}`}
                    onClick={() => {
                      setIsManageFoldersMode((prev) => !prev)
                      setEditingFolderId(null)
                    }}
                  >
                    <span>{isManageFoldersMode ? 'Done customizing' : 'Customize folders'}</span>
                  </button>

                  <button
                    type="button"
                    className="btn-secondary btn-close-pill"
                    onClick={() => {
                      setIsFolderModalOpen(false)
                      setIsGalleryOpen(false)
                      setIsCreatingFolder(false)
                      setViewingFolder(null)
                      setTargetAssignImageId(null)
                      setEditingFolderId(null)
                    }}
                  >
                    Close
                  </button>
                </div>
              </>
            )}

            {/* TAB 2: GALLERY VIEW (All images ever created) */}
            {modalActiveTab === 'gallery' && (
              <>
                <div className="modal-gallery-container custom-scroll">
                  <div className="modal-divider-text">
                    <span>ALL CREATIONS</span>
                  </div>

                  {galleryImages.length === 0 ? (
                    <div className="empty-folders-note">
                      <ImageIcon size={32} className="empty-folder-icon" />
                      <p>No creations yet. Start creating in chat!</p>
                    </div>
                  ) : (
                    <div className="modal-gallery-grid">
                      {galleryImages.map((img) => (
                        <div
                          key={img.id}
                          className="modal-gallery-item"
                          onClick={() => {
                            handleLoadChatFromHistory({
                              id: img.chatId || `chat-${img.id}`,
                              query: img.originalIdea || img.prompt,
                              title: img.originalIdea || img.prompt,
                              image: img.url,
                              url: img.url,
                              domain: img.domain,
                              ratio: img.ratio,
                              createdAt: img.createdAt || 'Earlier'
                            })
                          }}
                        >
                          <img
                            src={img.url}
                            alt=""
                            className="modal-gallery-img"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1024&auto=format&fit=crop&q=85'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-secondary btn-close-pill"
                    onClick={() => {
                      setIsFolderModalOpen(false)
                      setIsGalleryOpen(false)
                      setIsCreatingFolder(false)
                      setViewingFolder(null)
                      setTargetAssignImageId(null)
                      setEditingFolderId(null)
                    }}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================= ALL 30+ CATEGORIES & FIELDS EXPLORER MODAL ================= */}
      {isCategoriesModalOpen && (
        <div
          className="modal-overlay categories-modal-overlay"
          onClick={() => setIsCategoriesModalOpen(false)}
        >
          <div
            className="modal-content categories-hub-modal reference-concepts-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Clean, Balanced Header */}
            <div className="ref-modal-header">
              <div className="ref-modal-header-left">
                <div className="ref-modal-title-row">
                  <h2 className="ref-modal-title">Reference images</h2>
                  <span className="ref-modal-count-pill">{filteredCategories.length} styles</span>
                </div>
              </div>

              <div className="ref-modal-header-right">
                <div className="ref-search-box">
                  <Search size={16} className="ref-search-icon" />
                  <input
                    type="text"
                    className="ref-search-input"
                    placeholder="Search styles (Paint, Clay, Neon, Chibi...)"
                    value={categorySearchQuery}
                    onChange={(e) => setCategorySearchQuery(e.target.value)}
                    autoFocus
                  />
                  {categorySearchQuery && (
                    <button
                      type="button"
                      className="ref-search-clear"
                      onClick={() => setCategorySearchQuery('')}
                      title="Clear search"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  className="ref-modal-close-btn"
                  onClick={() => setIsCategoriesModalOpen(false)}
                  title="Close (Esc)"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Filter Category Chips Bar */}
            <div className="ref-category-chips-bar">
              {[
                { id: 'All', label: 'All Styles' },
                { id: 'Artistic & Street', label: '🎨 Artistic & Street' },
                { id: '3D & Cute Goods', label: '🧸 3D & Cute Goods' },
                { id: 'Portraits & Characters', label: '👤 Portraits & People' },
                { id: 'Nature & Botanical', label: '🌿 Nature & Botanical' },
                { id: 'Retro, Sci-Fi & Action', label: '⚡ Retro, Sci-Fi & Action' }
              ].map((filterTab) => (
                <button
                  key={filterTab.id}
                  type="button"
                  className={`ref-chip-btn ${selectedCategoryField === filterTab.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategoryField(filterTab.id)}
                >
                  {filterTab.label}
                </button>
              ))}
            </div>

            {/* Reference Concepts Grid with Clean Spacing & Proper Aspect Ratio */}
            <div className="ref-concepts-grid-container">
              {filteredCategories.length === 0 ? (
                <div className="empty-categories-state">
                  <Compass size={36} className="empty-compass-icon" />
                  <p className="empty-title">No matching reference styles found</p>
                  <p className="empty-sub">
                    Try searching for "Paint", "Mural", "Clay", "Bloom", "Neon", or "Chibi"
                  </p>
                  <button
                    type="button"
                    className="ref-reset-search-btn"
                    onClick={() => {
                      setCategorySearchQuery('')
                      setSelectedCategoryField('All')
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="reference-concepts-grid">
                  {filteredCategories.map((concept) => (
                    <div
                      key={concept.id}
                      className="concept-pill-card"
                      onClick={() => handleApplyCategoryPrompt(concept)}
                      title={`Click to use "${concept.name}" (${concept.tag}) reference style`}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="concept-card-img-wrap">
                        <img
                          src={concept.image}
                          alt={concept.name}
                          className="concept-pill-img"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=480&auto=format&fit=crop&q=80'
                          }}
                        />
                        <div className="concept-pill-gradient" />
                        <div className="concept-card-hover-overlay">
                          <span className="concept-hover-apply-btn">
                            <Plus size={14} /> Apply
                          </span>
                        </div>
                      </div>

                      <div className="concept-pill-info">
                        <span className="concept-pill-label">{concept.name}</span>
                        <span className="concept-pill-tag">{concept.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Clean Footer */}
            <div className="ref-modal-footer">
              <span className="ref-footer-hint">
                Click any visual style to apply it to your AI Prompt Composer
              </span>
              <button
                type="button"
                className="ref-footer-close-btn"
                onClick={() => setIsCategoriesModalOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CENTERED USER CREATOR STUDIO MODAL ================= */}
      {isUserMenuOpen && (
        <div
          className="modal-overlay user-center-modal-overlay"
          onClick={() => setIsUserMenuOpen(false)}
        >
          <div
            className="modal-content user-center-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Right Close Button */}
            <button
              type="button"
              className="modal-close-btn user-center-close-top-right"
              onClick={() => setIsUserMenuOpen(false)}
              title="Close"
            >
              <X size={18} />
            </button>

            {/* User Info */}
            <div className="user-center-body">
              <div className="avatar user-center-avatar">{isLoggedIn ? (currentUser?.avatar || 'A') : 'U'}</div>
              <div className="user-center-header-text">
                <div className="user-center-name-row">
                  <span className="user-center-name">{isLoggedIn ? (currentUser?.name || 'Adrin') : 'User'}</span>
                  <span className={`user-center-badge ${isLoggedIn ? 'badge-pro' : 'badge-guest'}`}>
                    {isLoggedIn ? 'Pro Creator' : 'Guest Mode'}
                  </span>
                </div>
                <span className="user-center-email">{isLoggedIn ? (currentUser?.email || 'creator@thamili.ai') : 'Guest Session • Local History'}</span>
              </div>
            </div>

            {/* Single Action Button Below */}
            <div className="user-center-action-bottom">
              {isLoggedIn ? (
                <button
                  type="button"
                  className="btn-user-center-logout btn-user-center-bottom-btn"
                  onClick={() => {
                    handleSignOut()
                    setIsUserMenuOpen(false)
                  }}
                >
                  Sign Out
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-user-center-signin btn-user-center-bottom-btn"
                  onClick={() => {
                    setIsAuthModalOpen(true)
                    setIsUserMenuOpen(false)
                  }}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}



      {/* ================= FULLSCREEN EXPANDED IMAGE LIGHTBOX / STUDIO EDITOR ================= */}
      {fullscreenImageModal && (
        <ImageEditorModal
          image={fullscreenImageModal}
          currentUser={currentUser}
          showToast={showToast}
          onClose={() => setFullscreenImageModal(null)}
          onSave={(updatedImage) => {
            setGalleryImages((prev) =>
              prev.map((item) => (item.id === updatedImage.id ? { ...item, ...updatedImage } : item))
            )
            if (currentGeneration && currentGeneration.id === updatedImage.id) {
              setCurrentGeneration((prev) => ({ ...prev, ...updatedImage }))
            }
            setFullscreenImageModal(null)
          }}
        />
      )}

      {/* ================= GOOGLE GEMINI-STYLE SEARCH CHATS & HISTORY MODAL ================= */}
      {isSearchModalOpen && (
        <div
          className="modal-overlay search-modal-overlay"
          onClick={() => setIsSearchModalOpen(false)}
        >
          <div
            className="search-chats-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Search Input Box (Gemini Large Pill Search Bar) */}
            <div className="search-chats-input-wrapper">
              <Search size={19} className="search-chats-icon" />
              <input
                type="text"
                className="search-chats-input"
                placeholder="Search chats"
                value={searchChatsQuery}
                onChange={(e) => setSearchChatsQuery(e.target.value)}
                autoFocus
              />
              {searchChatsQuery && (
                <button
                  type="button"
                  className="btn-clear-search-input"
                  onClick={() => setSearchChatsQuery('')}
                  title="Clear input"
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="button"
                className="btn-close-search-modal"
                onClick={() => setIsSearchModalOpen(false)}
                title="Close search (Esc)"
              >
                <X size={18} />
              </button>
            </div>

            {/* Time Filter Tabs (All / Today / Past Dates) */}
            <div className="search-time-filters-row">
              <div className="filters-left-group">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'today', label: 'Today' },
                  { id: 'older', label: 'Past Dates' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`search-filter-pill ${searchChatsFilter === tab.id ? 'active' : ''}`}
                    onClick={() => setSearchChatsFilter(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="filters-right-group">
                {isLoggedIn ? (
                  <span className="search-auth-status-tag logged-in">
                    <CheckCircle2 size={12} /> Saved by Time & Date
                  </span>
                ) : (
                  <button
                    type="button"
                    className="search-auth-status-tag guest-login-btn"
                    onClick={() => {
                      setIsSearchModalOpen(false)
                      setAuthMode('signin')
                      setIsAuthModalOpen(true)
                    }}
                    title="Sign in to save history across dates"
                  >
                    <Lock size={12} /> Sign In to Save History
                  </button>
                )}
              </div>
            </div>

            {/* Guest Banner if not logged in */}
            {!isLoggedIn && (
              <div className="guest-history-banner">
                <div className="guest-banner-left">
                  <Clock size={15} className="guest-banner-icon" />
                  <div className="guest-banner-text">
                    <strong>Guest Session Mode</strong>
                    <span>Searches are temporary. Sign in to save full history organized by date.</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-guest-banner-signin"
                  onClick={() => {
                    setIsSearchModalOpen(false)
                    setAuthMode('signin')
                    setIsAuthModalOpen(true)
                  }}
                >
                  Sign In
                </button>
              </div>
            )}

            {/* Recent Section Header */}
            <div className="search-results-section-header">
              <span className="results-header-title">
                {searchChatsQuery
                  ? `Search Results (${activeHistory.length})`
                  : isLoggedIn
                  ? 'Recent'
                  : 'Recent (Current Session)'}
              </span>
              {activeHistory.length > 0 && (
                <button
                  type="button"
                  className="btn-clear-modal-history"
                  onClick={handleClearHistoryList}
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Gemini-Style History Rows List */}
            <div className="search-chats-results-list">
              {activeHistory.length === 0 ? (
                <div className="search-empty-state">
                  <Search size={28} className="empty-search-icon" />
                  <p>
                    {searchChatsQuery
                      ? `No chats found matching "${searchChatsQuery}"`
                      : 'No recent searches or chats yet.'}
                  </p>
                  <span>Start a new chat to see history appear here.</span>
                </div>
              ) : (
                activeHistory.map((item) => (
                  <div
                    key={item.id}
                    className="gemini-chat-history-row"
                    onClick={() => handleSelectHistoryChat(item)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="chat-row-left">
                      <MessageSquare size={16} className="chat-row-icon" />
                      <span className="chat-row-title" title={item.query}>
                        {item.title || item.query}
                      </span>
                    </div>

                    <div className="chat-row-right">
                      <span className="chat-row-timetag">{item.timeTag || 'Today'}</span>
                      <button
                        type="button"
                        className="btn-row-delete"
                        onClick={(e) => handleDeleteHistoryChat(e, item.id)}
                        title="Delete chat"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= SAMPLE USER LOGIN & SIGN UP AUTH MODAL ================= */}
      {isAuthModalOpen && (
        <div
          className="modal-overlay auth-modal-overlay"
          onClick={() => setIsAuthModalOpen(false)}
        >
          <div
            className="modal-content auth-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Thamili Logo */}
            <div className="auth-modal-header">
              <img src={thamiliLogoImg} alt="Thamili AI" className="auth-modal-logo" />
              <h3 className="auth-modal-title">
                {authMode === 'signin' ? 'Welcome Back to Thamili AI' : 'Create Your Thamili Account'}
              </h3>
              <p className="auth-modal-subtitle">
                {authMode === 'signin'
                  ? 'Sign in to access persistent history saved by date & Pro features.'
                  : 'Start creating with instant cloud history sync & creative studio features.'}
              </p>
              <button
                type="button"
                className="modal-close-btn auth-close-btn"
                onClick={() => setIsAuthModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            {/* 1-Click Instant Demo Login Option */}
            <div className="auth-instant-demo-box">
              <button
                type="button"
                className="btn-demo-quick-login"
                onClick={() =>
                  handlePerformLogin({
                    name: 'Adrin',
                    email: 'adrin@thamili.ai',
                    avatar: 'A',
                    role: 'Pro Creator'
                  })
                }
              >
                
                <span>1-Click Instant Demo Login (as Adrin)</span>
                <span className="demo-tag">Instant</span>
              </button>
            </div>

            <div className="auth-divider">
              <span>or continue with email</span>
            </div>

            {/* Email / Password Form */}
            <form
              className="auth-form-body"
              onSubmit={(e) => {
                e.preventDefault()
                handlePerformLogin()
              }}
            >
              {authMode === 'signup' && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Adrin"
                    value={authFormData.name}
                    onChange={(e) => setAuthFormData({ ...authFormData, name: e.target.value })}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="adrin@thamili.ai"
                  value={authFormData.email}
                  onChange={(e) => setAuthFormData({ ...authFormData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                  value={authFormData.password}
                  onChange={(e) => setAuthFormData({ ...authFormData, password: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn-primary-gradient btn-auth-submit">
                <Check size={16} />
                <span>{authMode === 'signin' ? 'Sign In to Account' : 'Create Account'}</span>
              </button>
            </form>

            <div className="auth-toggle-footer">
              {authMode === 'signin' ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="auth-switch-link"
                    onClick={() => setAuthMode('signup')}
                  >
                    Sign Up Free
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="auth-switch-link"
                    onClick={() => setAuthMode('signin')}
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div className="toast-notification">
          
          <span>{toast}</span>
        </div>
      )}
    </div>
  )
}
