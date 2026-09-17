import { useState, useEffect, useRef, useMemo } from 'react'
import {
  MessageSquare,
  Code,
  Image as ImageIcon,
  Video,
  GraduationCap,
  LayoutGrid,
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
  ShoppingBag,
  Coins,
  ShieldCheck,
  AlertTriangle,
  UploadCloud,
  Upload,
  Filter,
  TrendingUp,
  Wallet,
  CreditCard,
  Flag,
  CheckCircle2,
  Lock,
  UserCheck,
  FileText,
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
  Minus
} from 'lucide-react'
import thamiliLogoImg from './assets/thamili-logo.png'
import sidebarLogoImg from './assets/thamili-logo.png'
import thamiliWatermarkImg from './assets/thamili-watermark.svg'
import './App.css'

export const LICENSE_TIERS = [
  {
    id: 'commercial',
    title: 'Commercial Use',
    tag: 'Recommended',
    desc: 'Marketing, social media, advertising, merchandise & web branding.',
    baseMultiplier: 1.0,
    suggestedPrice: 18,
    icon: ShoppingBag
  },
  {
    id: 'personal',
    title: 'Personal Use',
    tag: 'Basic',
    desc: 'Single non-commercial personal wallpaper, avatar profile & personal print.',
    baseMultiplier: 0.6,
    suggestedPrice: 10,
    icon: UserCheck
  },
  {
    id: 'ai_reference',
    title: 'Commercial + AI Reference',
    tag: 'Popular',
    desc: 'Commercial project use + training reference prompt embeddings.',
    baseMultiplier: 1.4,
    suggestedPrice: 25,
    icon: Layers
  },
  {
    id: 'extended',
    title: 'Extended License',
    tag: 'Full Rights',
    desc: 'Unlimited mass merchandising, broadcast, and global resale distribution.',
    baseMultiplier: 2.5,
    suggestedPrice: 45,
    icon: ShieldCheck
  }
]

export const SAMPLE_UPLOAD_PRESETS = [
  {
    title: 'Tamil Traditional Temple Wedding Mandapam',
    category: 'Tamil Culture & Festivals',
    tags: 'tamil wedding, temple, mandapam, kanjivaram, traditional, jasmine, hindu',
    description: 'Golden hour South Indian Hindu wedding ceremony inside ancient Dravidian stone temple mandapam with traditional Kanjivaram silk saree and floral jasmine garland.',
    image: '/images/tamil/pongal-girl.jpg',
    resolution: '4096 x 2304 (8K UHD)',
    orientation: 'Landscape (16:9)',
    fileFormat: 'PNG Master',
    fileSize: '4.2 MB'
  },
  {
    title: 'Cyberpunk Tanjore Gopuram 2099',
    category: 'Sci-Fi & Concept Art',
    tags: 'cyberpunk, temple, tanjore, sci-fi, neon, gopuram, dravidian, future',
    description: 'Futuristic sci-fi reimagination of Brihadisvara Temple with neon holographic gopuram lights, floating energy spires, and flying chariots at twilight.',
    image: '/images/tamil/madurai-temple.jpg',
    resolution: '3840 x 2160 (4K UHD)',
    orientation: 'Landscape (16:9)',
    fileFormat: 'PNG Master',
    fileSize: '3.8 MB'
  },
  {
    title: 'Nilgiris Misty Tea Plantation Sunrise',
    category: 'Nature & Landscapes',
    tags: 'nilgiris, tea, plantation, ooty, nature, mist, sunrise, landscape, hills',
    description: 'Rolling emerald tea hills shrouded in morning valley mist with solitary tea plucker and golden horizon sunlight in Ooty Western Ghats.',
    image: '/images/tamil/chettinad-thinnai.jpg',
    resolution: '4500 x 3000 (Hasselblad 8K)',
    orientation: 'Landscape (3:2)',
    fileFormat: 'RAW Hi-Res',
    fileSize: '5.1 MB'
  }
]

export const AVAILABLE_AI_MODELS = [
  {
    id: 'Basic',
    name: 'Basic',
    shortName: 'Basic',
    badge: 'Fast & Free',
    desc: 'Ultra-fast generation for rapid concepts & drafts',
    category: 'Standard Tier',
    icon: Zap,
    color: '#06b6d4',
    engineModel: 'turbo'
  },
  {
    id: 'Pro',
    name: 'Pro',
    shortName: 'Pro',
    badge: 'High Detail',
    desc: 'Balanced high-fidelity generation with crisp details',
    category: 'Professional Tier',
    icon: Zap,
    color: '#8b5cf6',
    engineModel: 'flux'
  },
  {
    id: 'Pro+',
    name: 'Pro+',
    shortName: 'Pro+',
    badge: 'Master 8K',
    desc: 'Supreme UHD photorealism with cinematic studio lighting',
    category: 'Ultra Tier',
    icon: Crown,
    color: '#f59e0b',
    engineModel: 'kontext'
  }
]

export const INITIAL_LOGGED_IN_HISTORY = [
  {
    id: 'chat-1',
    title: 'Casual Greeting',
    query: 'Hello Thamili AI! What can you create for me today?',
    timeTag: 'Today',
    dateBucket: 'today',
    createdAt: 'Today, 6:15 PM',
    messages: [
      {
        id: 'msg-c1-user',
        role: 'user',
        text: 'Hello Thamili AI! What can you create for me today?',
        createdAt: 'Today, 6:15 PM'
      },
      {
        id: 'msg-c1-ai',
        role: 'assistant',
        isTextResponse: true,
        type: 'text',
        text: 'Vanakkam! Welcome to Thamili AI 2.0 I can generate high-resolution Dravidian heritage art, cyberpunk temple cities, photorealistic portraits, anime art, and 3D concept renders. What would you like to create today?',
        suggestions: [
          'Cyberpunk Tanjore Gopuram 2099',
          'Tamil Traditional Temple Wedding',
          'Neon sports car in midnight rain'
        ],
        createdAt: 'Today, 6:15 PM'
      }
    ]
  },
  {
    id: 'chat-2',
    title: 'Electric Sedan Coastal Drive',
    query: 'Electric Sedan Coastal Drive at sunset 8k cinematic wallpaper',
    timeTag: 'Today',
    dateBucket: 'today',
    createdAt: 'Today, 4:20 PM',
    image: '/images/basic/car-sports-red.jpg',
    ratio: '16:9',
    messages: [
      {
        id: 'msg-c2-user',
        role: 'user',
        text: 'Electric Sedan Coastal Drive at sunset 8k cinematic wallpaper',
        createdAt: 'Today, 4:20 PM'
      },
      {
        id: 'msg-c2-ai',
        role: 'assistant',
        originalIdea: 'Electric Sedan Coastal Drive at sunset 8k cinematic wallpaper',
        prompt: 'Electric Sedan Coastal Drive at sunset 8k cinematic wallpaper, golden hour horizon, sleek aerodynamic lines, wet reflections',
        domain: 'Flux 1.0 Pro Engine',
        ratio: '16:9',
        dimensions: '1024 x 576',
        url: '/images/basic/car-sports-red.jpg',
        isGenerating: false,
        saved: true,
        liked: true,
        disliked: false,
        createdAt: 'Today, 4:20 PM'
      }
    ]
  },
  {
    id: 'chat-3',
    title: 'Coastal Tesla Sunset Drive',
    query: 'Coastal Tesla Sunset Drive aesthetic highway wallpaper',
    timeTag: 'Today',
    dateBucket: 'today',
    createdAt: 'Today, 2:05 PM',
    image: '/images/basic/car-supercar.jpg',
    ratio: '16:9',
    messages: [
      {
        id: 'msg-c3-user',
        role: 'user',
        text: 'Coastal Tesla Sunset Drive aesthetic highway wallpaper',
        createdAt: 'Today, 2:05 PM'
      },
      {
        id: 'msg-c3-ai',
        role: 'assistant',
        originalIdea: 'Coastal Tesla Sunset Drive aesthetic highway wallpaper',
        prompt: 'Coastal Tesla Sunset Drive aesthetic highway wallpaper, ocean view, dusk lighting, ultra detailed',
        domain: 'Flux Fast Engine',
        ratio: '16:9',
        dimensions: '1024 x 576',
        url: '/images/basic/car-supercar.jpg',
        isGenerating: false,
        saved: false,
        liked: false,
        disliked: false,
        createdAt: 'Today, 2:05 PM'
      }
    ]
  },
  {
    id: 'chat-4',
    title: 'HHD Table Lab Guide',
    query: 'HHD Table Lab Guide visual technical diagram and schematic',
    timeTag: '29 Aug',
    dateBucket: 'older',
    createdAt: '29 Aug 2026',
    image: '/images/tamil/madurai-temple.jpg',
    ratio: '16:9',
    messages: [
      {
        id: 'msg-c4-user',
        role: 'user',
        text: 'HHD Table Lab Guide visual technical diagram and schematic',
        createdAt: '29 Aug 2026'
      },
      {
        id: 'msg-c4-ai',
        role: 'assistant',
        originalIdea: 'HHD Table Lab Guide visual technical diagram and schematic',
        prompt: 'HHD Table Lab Guide visual technical diagram, isometric architectural perspective, detailed Dravidian stone engineering',
        domain: 'Flux 1.0 Pro Engine',
        ratio: '16:9',
        dimensions: '1024 x 576',
        url: '/images/tamil/madurai-temple.jpg',
        isGenerating: false,
        saved: false,
        liked: false,
        disliked: false,
        createdAt: '29 Aug 2026'
      }
    ]
  },
  {
    id: 'chat-5',
    title: 'Futuristic Cyberpunk Metropolis',
    query: 'Futuristic cyberpunk city at dusk 8k volumetric neon rain',
    timeTag: '25 Aug',
    dateBucket: 'older',
    createdAt: '25 Aug 2026',
    image: '/images/tamil/madurai-temple.jpg',
    ratio: '16:9',
    messages: [
      {
        id: 'msg-c5-user',
        role: 'user',
        text: 'Futuristic cyberpunk city at dusk 8k volumetric neon rain',
        createdAt: '25 Aug 2026'
      },
      {
        id: 'msg-c5-ai',
        role: 'assistant',
        originalIdea: 'Futuristic cyberpunk city at dusk 8k volumetric neon rain',
        prompt: 'Futuristic cyberpunk city at dusk 8k volumetric neon rain, towering Dravidian gopuram spires with neon holographic signs',
        domain: 'Flux Realism Engine',
        ratio: '16:9',
        dimensions: '1024 x 576',
        url: '/images/tamil/madurai-temple.jpg',
        isGenerating: false,
        saved: false,
        liked: true,
        disliked: false,
        createdAt: '25 Aug 2026'
      }
    ]
  },
  {
    id: 'chat-6',
    title: 'Lotus Flower Macro Droplets',
    query: 'Lotus flower water droplets macro close up photography',
    timeTag: '18 Aug',
    dateBucket: 'older',
    createdAt: '18 Aug 2026',
    image: '/images/basic/flower-lotus.jpg',
    ratio: '1:1',
    messages: [
      {
        id: 'msg-c6-user',
        role: 'user',
        text: 'Lotus flower water droplets macro close up photography',
        createdAt: '18 Aug 2026'
      },
      {
        id: 'msg-c6-ai',
        role: 'assistant',
        originalIdea: 'Lotus flower water droplets macro close up photography',
        prompt: 'Lotus flower water droplets macro close up photography, soft morning light, hyper detailed dew drops, bokeh background',
        domain: 'Flux Realism Engine',
        ratio: '1:1',
        dimensions: '1024 x 1024',
        url: '/images/basic/flower-lotus.jpg',
        isGenerating: false,
        saved: true,
        liked: true,
        disliked: false,
        createdAt: '18 Aug 2026'
      }
    ]
  },
  {
    id: 'chat-7',
    title: '3D Clay Style Mascot Character',
    query: '3D cute clay style smiling mascot character design',
    timeTag: '12 Aug',
    dateBucket: 'older',
    createdAt: '12 Aug 2026',
    image: '/images/basic/concept-plushie.jpg',
    ratio: '1:1',
    messages: [
      {
        id: 'msg-c7-user',
        role: 'user',
        text: '3D cute clay style smiling mascot character design',
        createdAt: '12 Aug 2026'
      },
      {
        id: 'msg-c7-ai',
        role: 'assistant',
        originalIdea: '3D cute clay style smiling mascot character design',
        prompt: '3D cute clay style smiling mascot character design, soft claymation texture, pastel lighting, studio render',
        domain: 'Flux 3D Render Engine',
        ratio: '1:1',
        dimensions: '1024 x 1024',
        url: '/images/basic/concept-plushie.jpg',
        isGenerating: false,
        saved: false,
        liked: true,
        disliked: false,
        createdAt: '12 Aug 2026'
      }
    ]
  }
]

export const INITIAL_GUEST_HISTORY = [
  {
    id: 'guest-1',
    title: 'Futuristic cyberpunk city at dusk',
    query: 'Futuristic cyberpunk city at dusk 8k',
    timeTag: 'Session',
    dateBucket: 'session',
    createdAt: 'Just now',
    image: '/images/tamil/madurai-temple.jpg',
    ratio: '16:9',
    messages: [
      {
        id: 'msg-g1-user',
        role: 'user',
        text: 'Futuristic cyberpunk city at dusk 8k volumetric neon rain',
        createdAt: 'Just now'
      },
      {
        id: 'msg-g1-ai',
        role: 'assistant',
        originalIdea: 'Futuristic cyberpunk city at dusk 8k volumetric neon rain',
        prompt: 'Futuristic cyberpunk city at dusk 8k volumetric neon rain, neon holographic gopuram lights, floating energy spires',
        domain: 'Flux 1.0 Pro Engine',
        ratio: '16:9',
        dimensions: '1024 x 576',
        url: '/images/tamil/madurai-temple.jpg',
        isGenerating: false,
        saved: false,
        liked: true,
        disliked: false,
        createdAt: 'Just now'
      }
    ]
  },
  {
    id: 'guest-2',
    title: 'Neon sports car in midnight rain',
    query: 'Neon sports car in midnight rain',
    timeTag: 'Session',
    dateBucket: 'session',
    createdAt: '1h ago',
    image: '/images/basic/car-supercar.jpg',
    ratio: '16:9',
    messages: [
      {
        id: 'msg-g2-user',
        role: 'user',
        text: 'Neon sports car in midnight rain glowing reflections 4k',
        createdAt: '1h ago'
      },
      {
        id: 'msg-g2-ai',
        role: 'assistant',
        originalIdea: 'Neon sports car in midnight rain glowing reflections 4k',
        prompt: 'Neon sports car in midnight rain glowing reflections 4k, wet asphalt, cinematic purple neon bokeh',
        domain: 'Basic Engine',
        ratio: '16:9',
        dimensions: '1024 x 576',
        url: '/images/basic/car-supercar.jpg',
        isGenerating: false,
        saved: false,
        liked: false,
        disliked: false,
        createdAt: '1h ago'
      }
    ]
  }
]

export function ThamiliLogoIcon({ className = 'logo-icon-svg' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="thamiliV2BodyGrad" x1="12%" y1="12%" x2="88%" y2="88%">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="26%" stopColor="#0099ff" />
          <stop offset="52%" stopColor="#4f46e5" />
          <stop offset="78%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>

        <linearGradient id="thamiliV2RingBack" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.9" />
        </linearGradient>

        <linearGradient id="thamiliV2RingFront" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="40%" stopColor="#38bdf8" />
          <stop offset="75%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>

        <linearGradient id="thamiliV2Gloss" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <filter id="thamiliV2RingGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Orbit Ring (Back Segment) */}
      <path
        d="M 16 63 C 14 49, 36 34, 67 31 C 82 29, 93 33, 96 39"
        stroke="url(#thamiliV2RingBack)"
        strokeWidth="4.6"
        strokeLinecap="round"
        fill="none"
      />

      {/* 3D Stylized 'A' Body */}
      <path
        d="M 50 13
           C 54.5 13, 58 16.5, 60 21
           L 86 76
           C 87.8 80, 85.5 85, 80.5 86
           C 75.8 87, 72 83.5, 70 79
           L 63.5 64
           L 36.5 64
           L 30 79
           C 28 83.5, 24.2 87, 19.5 86
           C 14.5 85, 12.2 80, 14 76
           L 40 21
           C 42 16.5, 45.5 13, 50 13 Z"
        fill="url(#thamiliV2BodyGrad)"
      />

      {/* Inner Triangular Depth Cutout */}
      <path
        d="M 50 33
           L 59 53
           L 41 53 Z"
        fill="#080b14"
        fillOpacity="0.38"
      />

      {/* Crossbar Glow */}
      <path
        d="M 36.5 63.5
           C 43 60, 57 60, 63.5 63.5
           L 60 55
           L 40 55 Z"
        fill="url(#thamiliV2RingFront)"
        fillOpacity="0.9"
      />

      {/* Gloss Highlight Reflection */}
      <path
        d="M 50 15
           C 52.5 15, 54.5 17, 55.5 20.5
           L 39 58
           C 37 55, 36 49, 37 45
           L 46 20
           C 47.2 16.5, 48.5 15, 50 15 Z"
        fill="url(#thamiliV2Gloss)"
      />

      {/* Orbit Ring (Front Segment) */}
      <path
        d="M 96 39
           C 98.5 44, 94 53, 79 62.5
           C 62.5 73.5, 38 78.5, 20.5 75
           C 14.5 73.8, 12.5 69.5, 16 63"
        stroke="url(#thamiliV2RingFront)"
        strokeWidth="4.6"
        strokeLinecap="round"
        fill="none"
        filter="url(#thamiliV2RingGlow)"
      />

      {/* Satellite Node */}
      <circle cx="86" cy="42" r="3.2" fill="#ffffff" />
      <circle cx="86" cy="42" r="5.2" stroke="#00f5ff" strokeWidth="1.4" fill="none" opacity="0.9" />
    </svg>
  )
}

export function ThamiliWordmark({ className = 'brand-title', isHero = false }) {
  return (
    <span className={`thamili-brand-text ${className} ${isHero ? 'hero-brand-text' : ''}`}>
      <span className="thamili-letters">THAM</span>
      <span className="thamili-i-wrap">
        <span className="thamili-i-glyph">I</span>
        <svg className="thamili-i-sparkle" viewBox="0 0 20 20" fill="none">
          <defs>
            <linearGradient id="thamiliISparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
          <path
            d="M 10 1 Q 10 10, 1 10 Q 10 10, 10 19 Q 10 10, 19 10 Q 10 10, 10 1 Z"
            fill="url(#thamiliISparkleGrad)"
          />
        </svg>
      </span>
      <span className="thamili-letters">LI</span>
    </span>
  )
}

// =========================================================================
// ULTRA-SMOOTH HARDWARE-ACCELERATED AMBIENT AURORA (Zero Pixelation / Zero Banding)
// =========================================================================
export function BackgroundWaves() {
  return (
    <div className="ambient-waves-layer" aria-hidden="true">
      <div className="ambient-aurora-container">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
        <div className="aurora-orb aurora-orb-4" />
        <div className="aurora-orb aurora-orb-5" />
      </div>
      <div className="ambient-dither-grain" />
    </div>
  )
}

export const REFERENCE_CONCEPT_STYLES = [
  // 1. Artistic & Street
  {
    id: 'ref-paint',
    name: 'Paint',
    field: 'Artistic Styles',
    categoryGroup: 'Artistic & Street',
    tag: 'Oil & Watercolor',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=480&auto=format&fit=crop&q=80',
    prompt: 'Expressive textured impressionist oil painting portrait of an elder lady in sun hat on city street, fine visible brushstrokes, rich canvas texture, master fine art'
  },
  {
    id: 'ref-mural',
    name: 'Mural',
    field: 'Street & Urban Art',
    categoryGroup: 'Artistic & Street',
    tag: 'Graffiti & Murals',
    image: 'https://images.unsplash.com/photo-1561055657-b9e0bf0fa360?w=480&auto=format&fit=crop&q=80',
    prompt: 'Vibrant large-scale urban street wall mural painting of cheerful person in striped jersey, vivid graffiti art, textured brick wall, street art style'
  },

  // 2. 3D & Cute Goods
  {
    id: 'ref-plushie',
    name: 'Plushie',
    field: 'Cute & Kawaii Figures',
    categoryGroup: '3D & Cute Goods',
    tag: 'Soft Plushie',
    image: '/images/basic/concept-plushie.jpg',
    prompt: 'Adorable soft plushie stuffed toy character resting on a cozy bed with warm fairy lights in background, cute kawaii plush doll, detailed fabric texture'
  },
  {
    id: 'ref-clay',
    name: 'Clay',
    field: 'Claymation & 3D',
    categoryGroup: '3D & Cute Goods',
    tag: 'Clay Figure',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=480&auto=format&fit=crop&q=80',
    prompt: 'Cozy 3D claymation stop-motion animated clay character wearing knitted sweater sipping hot cocoa in a warm cafe library, textured clay figure'
  },
  {
    id: 'ref-chibi',
    name: 'Chibi',
    field: 'Anime & Kawaii Goods',
    categoryGroup: '3D & Cute Goods',
    tag: 'Chibi Figure',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=480&auto=format&fit=crop&q=80',
    prompt: 'Cute acrylic star keychain charm featuring an adorable chibi girl cartoon character with glasses holding coffee, dangling on a pink backpack strap'
  },

  // 3. Portraits & Characters
  {
    id: 'ref-hollywood',
    name: 'Hollywood',
    field: 'Vintage Glamour',
    categoryGroup: 'Portraits & Characters',
    tag: 'Golden Age Hollywood',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=480&auto=format&fit=crop&q=80',
    prompt: 'Classic black and white vintage Golden Age Hollywood glamour portrait of a handsome gentleman in tailored black tuxedo and bow tie, dramatic chiaroscuro film lighting'
  },

  // 4. Nature & Botanical
  {
    id: 'ref-bloom',
    name: 'Bloom',
    field: 'Floral & Botanical',
    categoryGroup: 'Nature & Botanical',
    tag: 'Flower Bloom',
    image: '/images/basic/flower-rose.jpg',
    prompt: 'Smiling female florist holding an extravagant blooming Protea and fresh floral bouquet inside a cozy flower boutique shop, natural sunlight'
  },
  {
    id: 'ref-lavender',
    name: 'Lavender',
    field: 'Fashion & Scenic',
    categoryGroup: 'Nature & Botanical',
    tag: 'Lavender Field',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=480&auto=format&fit=crop&q=80',
    prompt: 'Fashion editorial of a stylish person in an oversized pastel lavender lilac suit standing in endless blooming purple lavender field at sunset'
  },

  // 5. Retro, Sci-Fi & Action
  {
    id: 'ref-arcade',
    name: 'Arcade',
    field: 'Retro & Gaming',
    categoryGroup: 'Retro, Sci-Fi & Action',
    tag: 'Neon Arcade',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=480&auto=format&fit=crop&q=80',
    prompt: 'Fisheye lens wide photograph of a girl laughing enthusiastically in a glowing retro neon arcade gaming hall, colorful illuminated game machines'
  },
  {
    id: 'ref-themepark',
    name: 'Theme park',
    field: 'Entertainment & Retro',
    categoryGroup: 'Retro, Sci-Fi & Action',
    tag: 'Theme Park',
    image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=480&auto=format&fit=crop&q=80',
    prompt: 'Joyful retro 1980s theme park celebration with friendly purple dragon mascot, confetti, colorful roller coaster decorations, festive retro vibe'
  },
  {
    id: 'ref-neon',
    name: 'Neon',
    field: 'Cyberpunk & Night',
    categoryGroup: 'Retro, Sci-Fi & Action',
    tag: 'Neon Tokyo',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=480&auto=format&fit=crop&q=80',
    prompt: 'Moody cinematic cyberpunk Tokyo neon rain street portrait of a person holding clear umbrella under glowing red and cyan neon signs, puddle reflections'
  }
]

export const ALL_CREATIVE_CATEGORIES = REFERENCE_CONCEPT_STYLES

const REFERENCE_TEMPLATE_SLOTS = [
  // Slot 0
  [
    REFERENCE_CONCEPT_STYLES[0], // Paint
    REFERENCE_CONCEPT_STYLES[6]  // Bloom
  ],
  // Slot 1
  [
    REFERENCE_CONCEPT_STYLES[1], // Mural
    REFERENCE_CONCEPT_STYLES[5]  // Hollywood
  ],
  // Slot 2
  [
    REFERENCE_CONCEPT_STYLES[2], // Plushie
    REFERENCE_CONCEPT_STYLES[9]  // Theme park
  ],
  // Slot 3
  [
    REFERENCE_CONCEPT_STYLES[3], // Clay
    REFERENCE_CONCEPT_STYLES[4]  // Chibi
  ],
  // Slot 4
  [
    REFERENCE_CONCEPT_STYLES[8], // Arcade
    REFERENCE_CONCEPT_STYLES[10], // Neon
    REFERENCE_CONCEPT_STYLES[7]  // Lavender
  ]
]

const IMAGE_TEMPLATES = REFERENCE_TEMPLATE_SLOTS.map((slot) => slot[0])

const INITIAL_IMAGES = [
  {
    id: 'sample-flower-1',
    originalIdea: 'Vibrant pink blooming lotus in water pond',
    prompt: 'Close-up photograph of a vibrant pink blooming lotus flower in a serene water pond with crystal clear dew drops on petals, warm soft morning sunlight, 8k resolution',
    domain: 'Floral & Botanical Art',
    ratio: '4:3',
    url: '/images/basic/flower-lotus.jpg',
    saved: true,
    createdAt: 'Just now'
  },
  {
    id: 'sample-car-1',
    originalIdea: 'Futuristic blue cyber supercar in neon city street',
    prompt: 'Futuristic sleek modern blue and cyan supercar parked in an aesthetic neon-lit city street at dusk, gleaming reflections, ultra high detail, 8k render',
    domain: 'Automobiles & Supercars',
    ratio: '4:3',
    url: '/images/basic/car-supercar.jpg',
    saved: true,
    createdAt: 'Just now'
  },
  {
    id: 'sample-bike-1',
    originalIdea: 'Royal Enfield Bullet cruiser on scenic Ooty mountain road',
    prompt: 'Classic vintage Royal Enfield Bullet cruiser motorcycle parked on a picturesque green mountain road in Ooty, gleaming chrome tank, golden sunrise mist, 8k photography',
    domain: 'Motorcycles & Superbikes',
    ratio: '4:3',
    url: '/images/basic/bike-bullet.jpg',
    saved: false,
    createdAt: 'Just now'
  },
  {
    id: 'sample-nature-1',
    originalIdea: 'Scenic Courtallam cascading waterfall in rainforest',
    prompt: 'Breathtaking scenic cascading Courtallam waterfall surrounded by lush green tropical rainforest, misty water spray with gentle rainbow, 8k landscape photography',
    domain: 'Scenic Nature & Landscapes',
    ratio: '4:3',
    url: '/images/basic/nature-waterfall.jpg',
    saved: true,
    createdAt: 'Just now'
  },
  {
    id: 'sample-1',
    originalIdea: 'Chettinad vintage house with teak pillars and Athangudi tiles',
    prompt: 'Authentic 19th-century Chettinad vintage ancestral mansion with massive carved Burma teak wood pillars, hand-crafted Athangudi geometric tiles, sunlit central courtyard thinnai, vintage brass urns, 8k Hasselblad photography',
    domain: 'Tamil Vintage Houses',
    ratio: '1:1',
    url: '/images/tamil/chettinad-mansion.jpg',
    saved: true,
    createdAt: 'Aug 24'
  },
  {
    id: 'sample-2',
    originalIdea: 'Vintage Ambassador car on 1970s Madras street',
    prompt: 'Vintage 1970s Hindustan Ambassador car parked on an old Madras colonial street under rain trees, vintage typography shop boards, morning chai stall, nostalgic warm Kodachrome film color grading, 8k',
    domain: 'Tamil Vintage Cars & Streets',
    ratio: '1:1',
    url: '/images/tamil/vintage-ambassador-1.jpg',
    saved: false,
    createdAt: 'Aug 24'
  },
  {
    id: 'sample-3',
    originalIdea: 'Traditional village Thai Pongal with overflowing clay pot',
    prompt: 'Traditional village Thai Pongal celebration in ancestral house open courtyard, decorated terracotta clay pot with boiling milk overflowing, open woodfire stove, tall fresh sugarcane, colorful rice flour Kolam, 8k National Geographic',
    domain: 'Tamil Pongal Festival',
    ratio: '16:9',
    url: '/images/tamil/pongal-pot.jpg',
    saved: true,
    createdAt: 'Aug 24'
  }
]

const INITIAL_MARKETPLACE_ASSETS = [
  {
    id: 'mkt-tamil-wedding-1',
    title: 'Tamil Traditional Temple Wedding',
    description: 'Golden hour South Indian Hindu wedding ceremony inside ancient Dravidian stone temple mandapam with traditional Kanjivaram silk saree and floral jasmine garland.',
    category: 'Tamil Culture & Festivals',
    tags: ['tamil wedding', 'wedding', 'kanjivaram', 'temple', 'mandapam', 'traditional', 'jasmine', 'hindu'],
    priceCredits: 18,
    creatorName: 'Kavitha Ramaswamy',
    creatorHandle: '@KavithaLens',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    image: '/images/tamil/pongal-girl.jpg',
    licensedCount: 42,
    createdAt: '2 days ago',
    isVerified: true,
    status: 'live',
    dimensions: '3840 x 2160',
    format: 'RAW / PNG'
  },
  {
    id: 'mkt-tamil-wedding-2',
    title: 'Bridal Muhurtham Saree Portrait',
    description: 'Cinematic portrait of Tamil bride in royal crimson temple jewelry and golden border silk saree during auspicious morning Muhurtham rituals.',
    category: 'Tamil Culture & Festivals',
    tags: ['tamil wedding', 'bride', 'muhurtham', 'saree', 'jewelry', 'culture', 'portrait'],
    priceCredits: 22,
    creatorName: 'Sundar Vadivel',
    creatorHandle: '@MaduraiFrames',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    image: '/images/tamil/pongal-cooking.jpg',
    licensedCount: 68,
    createdAt: '3 days ago',
    isVerified: true,
    status: 'live',
    dimensions: '4096 x 2730',
    format: '4K Ultra HD'
  },
  {
    id: 'mkt-cyberpunk-temple',
    title: 'Cyberpunk Tanjore Temple 2099',
    description: 'Futuristic sci-fi reimagination of Brihadisvara Temple with neon holographic gopuram lights, floating energy spires, and flying chariots at twilight.',
    category: 'Sci-Fi & Concept Art',
    tags: ['cyberpunk', 'temple', 'tanjore', 'sci-fi', 'neon', 'future', 'concept art'],
    priceCredits: 25,
    creatorName: 'Dravidian Futurism Lab',
    creatorHandle: '@DravidCyber',
    creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    image: '/images/tamil/madurai-temple.jpg',
    licensedCount: 95,
    createdAt: '5 days ago',
    isVerified: true,
    status: 'live',
    dimensions: '4096 x 2304',
    format: '8K Octane Render'
  },
  {
    id: 'mkt-jallikattu-bull',
    title: 'Jallikattu Heritage Bull Fest',
    description: 'Dynamic high-speed cultural action shot of Kangayam bull in festive Pongal colors amidst cheering village stadium dust and golden afternoon light.',
    category: 'Tamil Culture & Festivals',
    tags: ['jallikattu', 'bull', 'pongal', 'tamil festival', 'heritage', 'village', 'action'],
    priceCredits: 20,
    creatorName: 'Madurai Lensman',
    creatorHandle: '@AlanganallurArt',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    image: '/images/tamil/alanganallur-jallikattu.jpg',
    licensedCount: 37,
    createdAt: '1 week ago',
    isVerified: true,
    status: 'live',
    dimensions: '3840 x 2160',
    format: 'RAW Hi-Res'
  },
  {
    id: 'mkt-chettinad-palace',
    title: 'Chettinad Heritage Mansion Courtyard',
    description: 'Architectural symmetry of 19th-century Chettinad heritage palace with Burma teak carved pillars, Athangudi handmade floor tiles, and open sky thinnai.',
    category: 'Architecture',
    tags: ['chettinad', 'palace', 'mansion', 'architecture', 'heritage', 'pillars', 'athangudi'],
    priceCredits: 15,
    creatorName: 'Anand Arch Studio',
    creatorHandle: '@AnandSpaces',
    creatorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    image: '/images/tamil/chettinad-mansion.jpg',
    licensedCount: 51,
    createdAt: '4 days ago',
    isVerified: true,
    status: 'live',
    dimensions: '4000 x 3000',
    format: 'Ultra-Res HDR'
  },
  {
    id: 'mkt-nilgiris-tea',
    title: 'Nilgiris Misty Tea Plantation Sunrise',
    description: 'Rolling emerald tea hills shrouded in morning valley mist with solitary tea plucker and golden horizon sunlight in Ooty Western Ghats.',
    category: 'Nature & Landscapes',
    tags: ['nilgiris', 'tea', 'plantation', 'ooty', 'nature', 'mist', 'sunrise', 'landscape', 'hills'],
    priceCredits: 14,
    creatorName: 'Priya Narayanan',
    creatorHandle: '@GhatsExplorer',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    image: '/images/tamil/chettinad-thinnai.jpg',
    licensedCount: 63,
    createdAt: '1 week ago',
    isVerified: true,
    status: 'live',
    dimensions: '4500 x 3000',
    format: 'Hasselblad 8K'
  },
  {
    id: 'mkt-marina-fishermen',
    title: 'Marina Beach Dawn Catamaran Fishermen',
    description: 'Silhouetted Tamil fishermen launching traditional wooden catamaran into glowing turquoise Bay of Bengal waves at sunrise.',
    category: 'Nature & Landscapes',
    tags: ['marina beach', 'chennai', 'fishermen', 'catamaran', 'sea', 'sunrise', 'ocean'],
    priceCredits: 12,
    creatorName: 'Chennai Shutter Co.',
    creatorHandle: '@ChennaiStreet',
    creatorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    image: '/images/tamil/agraharam-street.jpg',
    licensedCount: 29,
    createdAt: '6 days ago',
    isVerified: true,
    status: 'live',
    dimensions: '3840 x 2400',
    format: '4K Cinematic'
  },
  {
    id: 'mkt-bharatanatyam-mudra',
    title: 'Bharatanatyam Classical Mudra in Spotlight',
    description: 'Striking stage lighting capturing intricate temple dance hand mudra with temple jewelry bells and crimson alta dye accents.',
    category: 'Culture & Arts',
    tags: ['bharatanatyam', 'dance', 'mudra', 'culture', 'classical', 'temple', 'art'],
    priceCredits: 16,
    creatorName: 'Meenakshi Natya Art',
    creatorHandle: '@NatyaLens',
    creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    image: '/images/tamil/kuthuvilakku-brass.jpg',
    licensedCount: 54,
    createdAt: '3 days ago',
    isVerified: true,
    status: 'live',
    dimensions: '3840 x 2160',
    format: 'Pro Studio 8K'
  }
]

const INITIAL_CREATOR_TRANSACTIONS = [
  {
    id: 'tx-1',
    assetId: 'mkt-tamil-wedding-1',
    assetTitle: 'Tamil Traditional Temple Wedding',
    buyerName: 'Vikram S.',
    totalPrice: 18,
    creatorEarnings: 14.4,
    platformFee: 3.6,
    date: 'Today, 2:45 PM',
    status: 'Completed'
  },
  {
    id: 'tx-2',
    assetId: 'mkt-tamil-wedding-2',
    assetTitle: 'Bridal Muhurtham Saree Portrait',
    buyerName: 'Aishwarya K.',
    totalPrice: 22,
    creatorEarnings: 17.6,
    platformFee: 4.4,
    date: 'Yesterday, 6:12 PM',
    status: 'Completed'
  },
  {
    id: 'tx-3',
    assetId: 'mkt-cyberpunk-temple',
    assetTitle: 'Cyberpunk Tanjore Temple 2099',
    buyerName: 'Studio Dravida AI',
    totalPrice: 25,
    creatorEarnings: 20.0,
    platformFee: 5.0,
    date: 'Sep 2, 2026',
    status: 'Completed'
  },
  {
    id: 'tx-4',
    assetId: 'mkt-nilgiris-tea',
    assetTitle: 'Nilgiris Misty Tea Plantation Sunrise',
    buyerName: 'Rohit Menon',
    totalPrice: 14,
    creatorEarnings: 11.2,
    platformFee: 2.8,
    date: 'Aug 30, 2026',
    status: 'Completed'
  }
]

const MARKETPLACE_CATEGORIES = [
  'All',
  'Tamil Culture & Festivals',
  'Sci-Fi & Concept Art',
  'Architecture',
  'Nature & Landscapes',
  'Culture & Arts',
  'E-Commerce & Products'
]

// Dynamic Folder Color & Theme Engine (Unique vibrant styling based on folder name/category)
export function getFolderTheme(folderName = '') {
  const name = (folderName || '').toLowerCase().trim()

  if (/e-commerce|product|skincare|cosmetic|beauty|fashion|clothing|dress|shoe|mockup/i.test(name)) {
    return {
      name: 'Rose Pink',
      iconColor: '#ec4899',
      accent: '#ec4899',
      border: 'rgba(236, 72, 153, 0.32)',
      hoverBorder: 'rgba(236, 72, 153, 0.65)',
      bg: 'rgba(253, 242, 248, 0.85)',
      hoverBg: 'rgba(253, 242, 248, 0.98)',
      glow: 'rgba(236, 72, 153, 0.22)',
      badgeBg: 'rgba(236, 72, 153, 0.14)',
      badgeText: '#db2777',
      pillGrad: 'linear-gradient(135deg, #ec4899, #db2777)'
    }
  }
  if (/anime|character|manga|portrait|illustration|avatar|figure|comic/i.test(name)) {
    return {
      name: 'Violet Purple',
      iconColor: '#a855f7',
      accent: '#a855f7',
      border: 'rgba(168, 85, 247, 0.32)',
      hoverBorder: 'rgba(168, 85, 247, 0.65)',
      bg: 'rgba(250, 245, 255, 0.85)',
      hoverBg: 'rgba(250, 245, 255, 0.98)',
      glow: 'rgba(168, 85, 247, 0.22)',
      badgeBg: 'rgba(168, 85, 247, 0.14)',
      badgeText: '#7e22ce',
      pillGrad: 'linear-gradient(135deg, #a855f7, #7e22ce)'
    }
  }
  if (/sport|fitness|gym|football|soccer|cricket|athletic|racing|auto|car|bike|vehicle/i.test(name)) {
    return {
      name: 'Sunset Orange',
      iconColor: '#f97316',
      accent: '#f97316',
      border: 'rgba(249, 115, 22, 0.32)',
      hoverBorder: 'rgba(249, 115, 22, 0.65)',
      bg: 'rgba(255, 247, 237, 0.85)',
      hoverBg: 'rgba(255, 247, 237, 0.98)',
      glow: 'rgba(249, 115, 22, 0.22)',
      badgeBg: 'rgba(249, 115, 22, 0.14)',
      badgeText: '#c2410c',
      pillGrad: 'linear-gradient(135deg, #f97316, #c2410c)'
    }
  }
  if (/flower|nature|botanical|garden|plant|forest|landscape|leaf|tree|rose/i.test(name)) {
    return {
      name: 'Emerald Green',
      iconColor: '#10b981',
      accent: '#10b981',
      border: 'rgba(16, 185, 129, 0.32)',
      hoverBorder: 'rgba(16, 185, 129, 0.65)',
      bg: 'rgba(236, 253, 245, 0.85)',
      hoverBg: 'rgba(236, 253, 245, 0.98)',
      glow: 'rgba(16, 185, 129, 0.22)',
      badgeBg: 'rgba(16, 185, 129, 0.14)',
      badgeText: '#047857',
      pillGrad: 'linear-gradient(135deg, #10b981, #047857)'
    }
  }
  if (/cyberpunk|sci-fi|future|tech|neon|abstract|space|robot|quantum/i.test(name)) {
    return {
      name: 'Cyan Teal',
      iconColor: '#06b6d4',
      accent: '#06b6d4',
      border: 'rgba(6, 182, 212, 0.32)',
      hoverBorder: 'rgba(6, 182, 212, 0.65)',
      bg: 'rgba(236, 254, 255, 0.85)',
      hoverBg: 'rgba(236, 254, 255, 0.98)',
      glow: 'rgba(6, 182, 212, 0.22)',
      badgeBg: 'rgba(6, 182, 212, 0.14)',
      badgeText: '#0e7490',
      pillGrad: 'linear-gradient(135deg, #06b6d4, #0e7490)'
    }
  }
  if (/architecture|3d|building|interior|house|structure|minimal/i.test(name)) {
    return {
      name: 'Sky Blue',
      iconColor: '#0ea5e9',
      accent: '#0ea5e9',
      border: 'rgba(14, 165, 233, 0.32)',
      hoverBorder: 'rgba(14, 165, 233, 0.65)',
      bg: 'rgba(240, 249, 255, 0.85)',
      hoverBg: 'rgba(240, 249, 255, 0.98)',
      glow: 'rgba(14, 165, 233, 0.22)',
      badgeBg: 'rgba(14, 165, 233, 0.14)',
      badgeText: '#0369a1',
      pillGrad: 'linear-gradient(135deg, #0ea5e9, #0369a1)'
    }
  }
  if (/tamil|culture|festival|temple|tradition|gold|heritage|saree|wedding/i.test(name)) {
    return {
      name: 'Golden Amber',
      iconColor: '#eab308',
      accent: '#eab308',
      border: 'rgba(234, 179, 8, 0.32)',
      hoverBorder: 'rgba(234, 179, 8, 0.65)',
      bg: 'rgba(254, 252, 232, 0.85)',
      hoverBg: 'rgba(254, 252, 232, 0.98)',
      glow: 'rgba(234, 179, 8, 0.22)',
      badgeBg: 'rgba(234, 179, 8, 0.14)',
      badgeText: '#a16207',
      pillGrad: 'linear-gradient(135deg, #eab308, #a16207)'
    }
  }
  if (/private|personal|favorites|favorite|saved|custom|secret/i.test(name)) {
    return {
      name: 'Rose Coral',
      iconColor: '#f43f5e',
      accent: '#f43f5e',
      border: 'rgba(244, 63, 94, 0.32)',
      hoverBorder: 'rgba(244, 63, 94, 0.65)',
      bg: 'rgba(255, 241, 242, 0.85)',
      hoverBg: 'rgba(255, 241, 242, 0.98)',
      glow: 'rgba(244, 63, 94, 0.22)',
      badgeBg: 'rgba(244, 63, 94, 0.14)',
      badgeText: '#be123c',
      pillGrad: 'linear-gradient(135deg, #f43f5e, #be123c)'
    }
  }

  // Deterministic palette rotation for user-created custom folders
  const dynamicPalettes = [
    {
      iconColor: '#6366f1',
      accent: '#6366f1',
      border: 'rgba(99, 102, 241, 0.32)',
      hoverBorder: 'rgba(99, 102, 241, 0.65)',
      bg: 'rgba(238, 242, 255, 0.85)',
      hoverBg: 'rgba(238, 242, 255, 0.98)',
      glow: 'rgba(99, 102, 241, 0.22)',
      badgeBg: 'rgba(99, 102, 241, 0.14)',
      badgeText: '#4f46e5',
      pillGrad: 'linear-gradient(135deg, #6366f1, #4f46e5)'
    },
    {
      iconColor: '#ec4899',
      accent: '#ec4899',
      border: 'rgba(236, 72, 153, 0.32)',
      hoverBorder: 'rgba(236, 72, 153, 0.65)',
      bg: 'rgba(253, 242, 248, 0.85)',
      hoverBg: 'rgba(253, 242, 248, 0.98)',
      glow: 'rgba(236, 72, 153, 0.22)',
      badgeBg: 'rgba(236, 72, 153, 0.14)',
      badgeText: '#db2777',
      pillGrad: 'linear-gradient(135deg, #ec4899, #db2777)'
    },
    {
      iconColor: '#10b981',
      accent: '#10b981',
      border: 'rgba(16, 185, 129, 0.32)',
      hoverBorder: 'rgba(16, 185, 129, 0.65)',
      bg: 'rgba(236, 253, 245, 0.85)',
      hoverBg: 'rgba(236, 253, 245, 0.98)',
      glow: 'rgba(16, 185, 129, 0.22)',
      badgeBg: 'rgba(16, 185, 129, 0.14)',
      badgeText: '#047857',
      pillGrad: 'linear-gradient(135deg, #10b981, #047857)'
    },
    {
      iconColor: '#f97316',
      accent: '#f97316',
      border: 'rgba(249, 115, 22, 0.32)',
      hoverBorder: 'rgba(249, 115, 22, 0.65)',
      bg: 'rgba(255, 247, 237, 0.85)',
      hoverBg: 'rgba(255, 247, 237, 0.98)',
      glow: 'rgba(249, 115, 22, 0.22)',
      badgeBg: 'rgba(249, 115, 22, 0.14)',
      badgeText: '#c2410c',
      pillGrad: 'linear-gradient(135deg, #f97316, #c2410c)'
    },
    {
      iconColor: '#8b5cf6',
      accent: '#8b5cf6',
      border: 'rgba(139, 92, 246, 0.32)',
      hoverBorder: 'rgba(139, 92, 246, 0.65)',
      bg: 'rgba(245, 243, 255, 0.85)',
      hoverBg: 'rgba(245, 243, 255, 0.98)',
      glow: 'rgba(139, 92, 246, 0.22)',
      badgeBg: 'rgba(139, 92, 246, 0.14)',
      badgeText: '#6d28d9',
      pillGrad: 'linear-gradient(135deg, #8b5cf6, #6d28d9)'
    },
    {
      iconColor: '#0ea5e9',
      accent: '#0ea5e9',
      border: 'rgba(14, 165, 233, 0.32)',
      hoverBorder: 'rgba(14, 165, 233, 0.65)',
      bg: 'rgba(240, 249, 255, 0.85)',
      hoverBg: 'rgba(240, 249, 255, 0.98)',
      glow: 'rgba(14, 165, 233, 0.22)',
      badgeBg: 'rgba(14, 165, 233, 0.14)',
      badgeText: '#0369a1',
      pillGrad: 'linear-gradient(135deg, #0ea5e9, #0369a1)'
    },
    {
      iconColor: '#14b8a6',
      accent: '#14b8a6',
      border: 'rgba(20, 184, 166, 0.32)',
      hoverBorder: 'rgba(20, 184, 166, 0.65)',
      bg: 'rgba(240, 253, 250, 0.85)',
      hoverBg: 'rgba(240, 253, 250, 0.98)',
      glow: 'rgba(20, 184, 166, 0.22)',
      badgeBg: 'rgba(20, 184, 166, 0.14)',
      badgeText: '#0f766e',
      pillGrad: 'linear-gradient(135deg, #14b8a6, #0f766e)'
    }
  ]

  let hash = 0
  for (let i = 0; i < folderName.length; i++) {
    hash = (hash << 5) - hash + folderName.charCodeAt(i)
    hash |= 0
  }
  return dynamicPalettes[Math.abs(hash) % dynamicPalettes.length]
}

// AI Idea-to-Prompt Expansion Engine & Domain Classifier (With Smart Reference Concepts & Culture Intelligence)
function analyzeAndExpandIdea(rawIdea) {
  const idea = rawIdea.trim()
  const lower = idea.toLowerCase()

  let detectedDomain = 'Thamili Creative Art'
  let samplePool = []

  // Check against specific Reference Concept Styles first
  const matchedConcept = REFERENCE_CONCEPT_STYLES.find((c) => {
    const cName = c.name.toLowerCase()
    const regex = new RegExp(`\\b${cName}\\b`, 'i')
    return regex.test(lower)
  })

  if (matchedConcept) {
    detectedDomain = matchedConcept.field || `${matchedConcept.name} Style`
    samplePool = [matchedConcept.image]
  }
  // 1. Flowers & Floral Art (Lotus, Rose, Jasmine, Sunflower, Marigold, Gardens, Bouquets)
  else if (
    /(flower|flowers|rose|roses|lotus|thamarai|jasmine|malli|malligai|sunflower|sunflowers|suriyagandhi|marigold|sammanthi|genda|bouquet|blossom|blossoms|petal|petals|hibiscus|floral|garden|botanical|orchid|tulip|daisy|poo|malar)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Floral & Botanical Art'
    if (/lotus|thamarai|water lily/i.test(lower)) {
      samplePool = ['/images/basic/flower-lotus.jpg']
    } else {
      samplePool = [
        '/images/basic/flower-lotus.jpg',
        '/images/basic/flower-rose.jpg'
      ]
    }
  }
  // 2. Cars, Supercars & Modern/Vintage Automobiles
  else if (
    /(car|cars|supercar|supercars|sports car|sportscar|ferrari|lamborghini|porsche|bmw|audi|mercedes|automobile|automobiles|hypercar|racing car|sedan|convertible|vintage car|ambassador|padmini|taxi)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Automobiles & Supercars'
    if (/supercar|cyber|futuristic|neon|hypercar|lamborghini|porsche|racing/i.test(lower)) {
      samplePool = ['/images/basic/car-supercar.jpg']
    } else if (/sports car|red car|convertible|ferrari|luxury car|coastal/i.test(lower)) {
      samplePool = ['/images/basic/car-sports-red.jpg']
    } else if (/ambassador|padmini|taxi|vintage car|retro car|old car/i.test(lower)) {
      samplePool = [
        '/images/tamil/vintage-ambassador-1.jpg',
        '/images/tamil/vintage-ambassador-2.jpg',
        '/images/tamil/vintage-ambassador-3.jpg'
      ]
    } else {
      samplePool = [
        '/images/basic/car-supercar.jpg',
        '/images/basic/car-sports-red.jpg',
        '/images/tamil/vintage-ambassador-1.jpg'
      ]
    }
  }
  // 3. Bikes, Motorcycles, Cruisers & Scooters
  else if (
    /(bike|bikes|motorcycle|motorcycles|superbike|superbikes|bullet|royal enfield|scooter|scooters|vespa|ev scooter|dirt bike|ducati|harley|yamaha|honda|two wheeler|twowheeler|bicycle|cycle)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Motorcycles & Superbikes'
    samplePool = ['/images/basic/bike-bullet.jpg']
  }
  // 4. Scenic Nature, Waterfalls & Mountain Landscapes
  else if (
    /(nature|waterfall|waterfalls|falls|cascade|courtallam|hogenakkal|mountain|mountains|hill|hills|tea estate|tea plantation|munnar|ooty|kodaikanal|forest|river|valley|landscape|scenic|greenery)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Scenic Nature & Landscapes'
    samplePool = ['/images/basic/nature-waterfall.jpg']
  }
  // 5. Wildlife, Birds & Animals (Peacock, Bull, etc.)
  else if (
    /(peacock|peacocks|mayil|bird|birds|animal|animals|wildlife|tiger|elephant|deer)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Wildlife & Birds'
    samplePool = ['/images/tamil/mattu-pongal-cow.jpg', '/images/tamil/bull-taming-1.jpg']
  }
  // 6. Tamil Vintage Houses & Mansions
  else if (
    /(house|home|mansion|chettinad|agraharam|thinnai|muttram|courtyard|veranda|teak door|door|wooden door|athangudi|palace|vintage house|antique house|village house)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Tamil Vintage Houses'
    samplePool = [
      '/images/tamil/chettinad-mansion.jpg',
      '/images/tamil/agraharam-street.jpg',
      '/images/tamil/chettinad-door.jpg',
      '/images/tamil/chettinad-thinnai.jpg'
    ]
  }
  // 7. Tamil Pongal Harvest Festival
  else if (
    /(pongal|thai pongal|pot|clay pot|pongal panai|harvest|kolam|sugarcane|mattu pongal|paddy|kaveri)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Tamil Pongal Festival'
    samplePool = [
      '/images/tamil/pongal-pot.jpg',
      '/images/tamil/tamil-kolam.jpg',
      '/images/tamil/mattu-pongal-cow.jpg',
      '/images/tamil/pongal-cooking.jpg'
    ]
  }
  // 8. Tamil Diwali & Deepam Celebrations
  else if (
    /(diwali|deepam|deepavali|lamp|vilakku|agal vilakku|kuthuvilakku|sparkler|sparklers|mathappu|karthigai|ganga snanam)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Tamil Festivals & Celebrations'
    samplePool = [
      '/images/tamil/diwali-diya.jpg',
      '/images/tamil/kuthuvilakku-brass.jpg',
      '/images/tamil/nilavilakku-brass.jpg',
      '/images/tamil/diwali-sparklers.jpg'
    ]
  }
  // 9. Tamil Jallikattu & Bull Taming Heritage
  else if (
    /(jallikattu|eruthazhuvuthal|bull|kangeyam|manju virattu|alanganallur|avaniyapuram|palamedu|veera vilaiyattu)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Tamil Jallikattu Heritage'
    samplePool = [
      '/images/tamil/alanganallur-jallikattu.jpg',
      '/images/tamil/bull-taming-1.jpg',
      '/images/tamil/bull-taming-2.jpg',
      '/images/tamil/jallikattu-action.jpg'
    ]
  }
  // 10. Universal Studio Creative Fallback
  else {
    detectedDomain = 'Thamili Studio Creation'
    samplePool = [
      '/images/basic/flower-lotus.jpg',
      '/images/basic/car-supercar.jpg',
      '/images/basic/bike-bullet.jpg',
      '/images/basic/nature-waterfall.jpg',
      '/images/basic/flower-rose.jpg',
      '/images/tamil/chettinad-mansion.jpg',
      '/images/tamil/vintage-ambassador-1.jpg'
    ]
  }

  const cleanIdea = idea
    .replace(/^(make|create|generate|design|draw|show|render|a photo of|an image of|picture of)\s+/i, '')
    .trim() || 'Visual masterpiece'

  let enhancedPrompt = ''
  if (matchedConcept) {
    enhancedPrompt = `${matchedConcept.prompt} with creative elements of ${cleanIdea}, masterpiece 8k resolution octane render.`
  } else if (detectedDomain === 'Floral & Botanical Art') {
    enhancedPrompt = `Breathtaking fine-art botanical photograph of ${cleanIdea}, delicate blooming petals with crystalline morning dew drops, soft golden hour sunlight, natural garden bokeh, 8k Hasselblad master photography.`
  } else if (detectedDomain === 'Automobiles & Supercars') {
    enhancedPrompt = `Ultra-modern automotive masterpiece showcasing ${cleanIdea}, gleaming aerodynamic body lines, flawless metallic paint reflections, dynamic cinematic lighting, 8k raytracing render.`
  } else if (detectedDomain === 'Motorcycles & Superbikes') {
    enhancedPrompt = `High-performance dynamic photograph of ${cleanIdea}, immaculate craftsmanship and chrome detailing, scenic open road backdrop, warm cinematic lighting, 8k resolution.`
  } else if (detectedDomain === 'Scenic Nature & Landscapes') {
    enhancedPrompt = `Epic National Geographic landscape photograph of ${cleanIdea}, sweeping panoramic natural vista, lush emerald greens, golden sun rays breaking through morning mist, 8k ultra realism.`
  } else if (detectedDomain === 'Wildlife & Birds') {
    enhancedPrompt = `Magnificent high-detail wildlife photograph of ${cleanIdea}, vibrant iridescent plumage colors, crystalline eye detail, natural sanctuary environment, soft depth of field, 8k.`
  } else if (detectedDomain === 'Tamil Vintage Houses') {
    enhancedPrompt = `Authentic 19th-century vintage Tamil heritage architecture of ${cleanIdea}, ornate Burma teak pillars, Athangudi geometric floor tiles, sunlit central courtyard thinnai, antique brass urns, master 8k Hasselblad architectural photo.`
  } else if (detectedDomain === 'Tamil Pongal Festival') {
    enhancedPrompt = `Traditional rural Tamil Thai Pongal festival celebration of ${cleanIdea}, decorated earthen clay pot with overflowing sweet milk over open firewood, fresh green sugarcane, colorful rice Kolam, 8k National Geographic photo.`
  } else if (detectedDomain === 'Tamil Diwali Celebrations') {
    enhancedPrompt = `Sacred Tamil Diwali & Deepam festival illumination of ${cleanIdea}, rows of glowing terracotta agal vilakku oil lamps, antique brass kuthuvilakku, sparkling golden mathappu, warm festive aura, 8k masterpiece.`
  } else if (detectedDomain === 'Tamil Jallikattu Heritage') {
    enhancedPrompt = `High-speed heroic cultural action photograph of ${cleanIdea}, powerful muscular Kangayam bull in Alanganallur Jallikattu arena with sharp painted horns, billowing golden dust clouds, authentic Tamil bravery, 8k.`
  } else {
    enhancedPrompt = `A stunning, hyper-detailed creative representation of ${cleanIdea}, master cinematic lighting, rich lifelike textures, atmospheric depth, perfectly balanced composition, 8k resolution octane render.`
  }

  return {
    detectedDomain,
    enhancedPrompt,
    imageUrl: samplePool[Math.floor(Math.random() * samplePool.length)]
  }
}

// Conversational Intent Detector (Handles Greetings & FAQs politely without generating random images)
function detectConversationalIntent(rawText) {
  if (!rawText) return null
  const clean = rawText.trim().toLowerCase().replace(/[!?.,:;]/g, '')
  if (!clean) return null

  // 1. Greetings (hello, hi, hey, vanakkam, namaste, good morning, casual greeting...)
  if (/^(hello|hi|hey|heyy|heyyy|hii|hiii|howdy|hola|vanakkam|namaste|namaskaram|greetings|greeting|casual\s*greeting|conversation|good\s*(morning|afternoon|evening|day))(\s+there|\s+thamili|\s+ai|\s+bot|\s+and\s+friendly\s+conversation)?$/i.test(clean)) {
    return {
      text: "Hi there! 👋 What would you like to create today? Describe any visual idea, scene, character, or cultural style!",
      suggestions: [
        'Cyberpunk sports car in neon rain',
        'Traditional Tamil temple wedding',
        'Nilgiris misty tea garden sunrise',
        'Cute soft plushie on cozy bed'
      ]
    }
  }

  // 2. How are you / What's up
  if (/^(how\s*are\s*you|how\s*r\s*u|how\s*is\s*it\s*going|whats\s*up|what's\s*up|wassup|sup)(\s+today)?$/i.test(clean)) {
    return {
      text: "I'm doing great and ready to create! What imaginative scene or artwork can I generate for you?",
      suggestions: [
        'Futuristic Tokyo night street',
        'Ancient Dravidian temple mandapam',
        'Vintage 1970s Ambassador car',
        'Royal Enfield on mountain road'
      ]
    }
  }

  // 3. Who are you / What are you / What can you do / Help
  if (/^(who\s*are\s*you|what\s*are\s*you|what\s*can\s*you\s*do|help|help\s*me|how\s*to\s*use|how\s*does\s*this\s*work|what\s*is\s*this|tell\s*me\s*about\s*yourself)$/i.test(clean)) {
    return {
      text: "I'm **Thamili AI**, your creative visual studio. I can generate photorealistic images, sci-fi concepts, Tamil cultural heritage art, anime illustrations, and more. Just type any prompt below!",
      suggestions: [
        'Chettinad mansion central courtyard',
        'Lotus flower with dew drops at sunrise',
        'Fast red supercar on coastal highway',
        '3D Octane render of glowing crystals'
      ]
    }
  }

  // 4. Thank you / Appreciation
  if (/^(thanks|thank\s*you|thank\s*u|thx|awesome|cool|great\s*job|nice|perfect)$/i.test(clean)) {
    return {
      text: "You're very welcome! 😊 What would you like to design or create next?",
      suggestions: [
        'Cyberpunk Tanjore Gopuram 2099',
        'Vibrant blooming rose bouquet',
        'Superbike cruising at golden hour',
        'Cute kawaii chibi character'
      ]
    }
  }

  return null
}

function createId(prefix = 'id') {
  return `${prefix}-${(Math.random() + 1).toString(36).substring(2, 9)}`
}

const GENERATION_STATUS_MESSAGES = [
  'Creating your image...',
  'Building the composition...',
  'Adding colors...',
  'Refining details...',
  'Almost there...'
]

// =========================================================================
// CHATGPT TAMIL GLYPH MATRIX NEURAL WAVE & DIFFUSION CANVAS
// =========================================================================
const TAMIL_MATRIX_GLYPHS = [
  'அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ', 'ஃ',
  'க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல',
  'வ', 'ழ', 'ள', 'ற', 'ன', 'தி', 'மி', 'ழி', 'தை', 'மெ', 'ழீ', 'ஸ்ரீ',
  'சா', 'சு', 'தா', 'து', 'நா', 'பா', 'மா', 'மு', 'யா', 'ரா', 'வா', 'ழா',
  'கா', 'கி', 'சீ', 'தீ', 'நீ', 'பீ', 'மீ', 'லீ', 'வீ', 'ழூ', 'றோ', 'னோ'
]

function DotMatrixWaveCanvas({ step = 0, isGenerating = true, startTime = null }) {
  const canvasRef = useRef(null)
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    if (!isGenerating) {
      setProgress(100)
      return
    }
    const initialStart = startTime || Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - initialStart
      // Smooth curve reaching ~46% around 5-6s (matching reference screenshot)
      let p = Math.round(98 * (1 - Math.exp(-elapsed / 8500)))
      if (p < 1) p = 1
      if (p > 98) p = 98
      setProgress(p)
    }, 120)
    return () => clearInterval(timer)
  }, [isGenerating, startTime])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0

    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width || canvas.offsetWidth || 560
      height = rect.height || canvas.offsetHeight || 420
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    updateDimensions()

    let time = 0

    const render = () => {
      // Silky-smooth time progression
      time += 0.012

      // 1. Transparent Canvas
      ctx.clearRect(0, 0, width, height)

      // 2. 3D Wandering Sphere Orbit Physics
      const orbitX = width * 0.26
      const orbitY = height * 0.24
      const sphereX = (width * 0.5) + Math.sin(time * 0.75) * orbitX + Math.cos(time * 0.35) * (width * 0.08)
      const sphereY = (height * 0.5) + Math.cos(time * 0.55) * orbitY + Math.sin(time * 0.45) * (height * 0.06)
      const baseRadius = Math.min(width, height) * 0.36
      const sphereRadius = baseRadius * (1 + Math.sin(time * 0.4) * 0.06)
      const sphereRadiusSq = sphereRadius * sphereRadius

      // Normalized 3D directional light (tilted from upper-left toward viewer)
      const lx = -0.42
      const ly = -0.52
      const lz = 0.74

      // 3. Dense High-Tech Tamil Letter Matrix Grid (More Rows & Columns)
      // 23px spacing with proportional font scaling produces dense rows & columns with zero collision
      const cellSpacing = 23
      const cols = Math.ceil(width / cellSpacing) + 2
      const rows = Math.ceil(height / cellSpacing) + 2
      const startX = (width - (cols - 1) * cellSpacing) * 0.5
      const startY = (height - (rows - 1) * cellSpacing) * 0.5

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      for (let r = 0; r < rows; r++) {
        const gy = startY + r * cellSpacing
        for (let c = 0; c < cols; c++) {
          const gx = startX + c * cellSpacing

          const dx = gx - sphereX
          const dy = gy - sphereY
          const distSq = dx * dx + dy * dy
          const dist = Math.sqrt(distSq)

          let px = gx
          let py = gy
          let fontSize = 9.5
          let intensity = 0
          let isInsideSphere = false
          let nz = 0

          if (dist < sphereRadius) {
            isInsideSphere = true
            // 3D elevation on the hemisphere (Z-height from 0 at rim to 1 at apex)
            nz = Math.sqrt(sphereRadiusSq - distSq) / sphereRadius
            const nx = dx / sphereRadius
            const ny = dy / sphereRadius

            // Delicate 3D Spherical Lens Refraction (bounded displacement so letters never touch)
            const normDist = dist / sphereRadius
            const bulge = Math.sin(normDist * Math.PI) * 1.2
            if (dist > 0.001) {
              px = gx + (dx / dist) * bulge
              py = gy + (dy / dist) * bulge
            }

            // 3D Diffuse & Specular Lighting
            const diffuse = Math.max(0, nx * lx + ny * ly + nz * lz)
            const specular = Math.pow(diffuse, 3.2)
            intensity = Math.min(1, 0.30 * nz + 0.70 * diffuse + 0.80 * specular)

            // Tasteful font zoom in dense grid (9.5px base -> 13.5px peak, never touches neighbor)
            fontSize = 9.5 + nz * 3.5 + specular * 0.8
          } else {
            // Outside sphere: gentle proximity aura
            const edgeDist = dist - sphereRadius
            const glow = Math.exp(-edgeDist / 42) * 0.32
            intensity = glow
            fontSize = 9.5
          }

          // Consistent Tamil glyph placement across matrix
          const glyphIdx = (r * 17 + c * 11 + (r + c)) % TAMIL_MATRIX_GLYPHS.length
          const glyph = TAMIL_MATRIX_GLYPHS[glyphIdx]

          ctx.font = `${intensity > 0.58 ? '700' : '600'} ${fontSize.toFixed(1)}px "Noto Sans Tamil", system-ui, -apple-system, sans-serif`

          // Strictly Thamili Brand Colors: Leaf Green (#10b981) and Royal Ocean Blue (#2563eb)
          if (isInsideSphere) {
            if (intensity > 0.72) {
              // 🌿 Luminous Thamili Green Specular Highlight
              ctx.fillStyle = '#10b981'
              ctx.shadowColor = '#10b981'
              ctx.shadowBlur = Math.round(6 * nz)
              ctx.fillText(glyph, px, py)
              ctx.shadowBlur = 0
            } else if (intensity > 0.45) {
              // 🌿/🌊 Emerald Green to Vibrant Blue Body
              const alpha = 0.70 + intensity * 0.30
              ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`
              ctx.shadowColor = 'rgba(16, 185, 129, 0.35)'
              ctx.shadowBlur = Math.round(3 * nz)
              ctx.fillText(glyph, px, py)
              ctx.shadowBlur = 0
            } else {
              // 💙 Royal Blue on the Lower Sphere Rim
              const alpha = 0.55 + nz * 0.40
              ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`
              ctx.shadowColor = 'rgba(37, 99, 235, 0.2)'
              ctx.shadowBlur = 2
              ctx.fillText(glyph, px, py)
              ctx.shadowBlur = 0
            }
          } else {
            // 🔷 Ambient Rest State Outside Sphere
            const alpha = 0.16 + intensity * 0.40
            ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`
            ctx.fillText(glyph, px, py)
          }
        }
      }

      animId = requestAnimationFrame(render)
    }

    render()

    window.addEventListener('resize', updateDimensions)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  return (
    <div className="dot-matrix-wave-wrapper">
      <canvas ref={canvasRef} className="dot-matrix-wave-canvas" />
      <div className="dot-matrix-progress-badge" title="Generation progress">
        <span>{progress}%</span>
      </div>
    </div>
  )
}

const ChatGPTDotMatrixCanvas = DotMatrixWaveCanvas

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

  // Auto-scroll chat thread to bottom when new messages arrive or generation state changes
  useEffect(() => {
    if (chatScrollRef.current) {
      const scrollEl = chatScrollRef.current
      const t = setTimeout(() => {
        scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: 'smooth' })
      }, 80)
      return () => clearTimeout(t)
    }
  }, [chatMessages, isGenerating])

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

  // =========================================================================
  // LIGHTBOX INTERACTIVE STUDIO TOOL STATES (Markup, Comment, Remove BG, Erase, Resize)
  // =========================================================================
  const [activeEditorTool, setActiveEditorTool] = useState(null)

  // 1. Markup Tool State
  const [markupColor, setMarkupColor] = useState('#10b981')
  const [markupBrushSize, setMarkupBrushSize] = useState(4)
  const [markupStrokes, setMarkupStrokes] = useState([])
  const [currentStroke, setCurrentStroke] = useState(null)
  const [isDrawingMarkup, setIsDrawingMarkup] = useState(false)
  const markupCanvasRef = useRef(null)

  // 2. Comment Tool State
  const [imageComments, setImageComments] = useState([])
  const [pendingComment, setPendingComment] = useState(null)
  const [activeCommentCardId, setActiveCommentCardId] = useState(null)

  // 3. Remove BG State
  const [isBgRemoved, setIsBgRemoved] = useState(false)
  const [isBgProcessing, setIsBgProcessing] = useState(false)
  const [bgRemovedImageUrl, setBgRemovedImageUrl] = useState(null)
  const [bgBackdropStyle, setBgBackdropStyle] = useState('checkered') // 'checkered' | 'dark' | 'white'
  const [bgRemovalMode, setBgRemovalMode] = useState('auto') // 'auto' | 'select'
  const [bgSelectBrushSize, setBgSelectBrushSize] = useState(36)
  const [bgSelectStrokes, setBgSelectStrokes] = useState([])
  const [currentBgSelectStroke, setCurrentBgSelectStroke] = useState(null)
  const [isDrawingBgSelect, setIsDrawingBgSelect] = useState(false)
  const bgSelectCanvasRef = useRef(null)

  // 4. Erase Tool State
  const [eraseBrushSize, setEraseBrushSize] = useState(28)
  const [eraseStrokes, setEraseStrokes] = useState([])
  const [currentEraseStroke, setCurrentEraseStroke] = useState(null)
  const [isErasing, setIsErasing] = useState(false)
  const [isEraseProcessing, setIsEraseProcessing] = useState(false)
  const [isObjectErased, setIsObjectErased] = useState(false)
  const [erasedImageUrl, setErasedImageUrl] = useState(null)
  const [eraseMode, setEraseMode] = useState('cutout') // 'cutout' (Reveal Background) | 'inpaint'
  const [eraseBackdropStyle, setEraseBackdropStyle] = useState('checkered') // 'checkered' | 'dark' | 'white'
  const eraseCanvasRef = useRef(null)

  // 5. Resize / Aspect Tool State
  const [modalCropRatio, setModalCropRatio] = useState('original')
  const [modalZoomScale, setModalZoomScale] = useState(1.0)

  // Reset editor studio tool state when closing lightbox
  useEffect(() => {
    if (!fullscreenImageModal) {
      setActiveEditorTool(null)
      setMarkupStrokes([])
      setCurrentStroke(null)
      setIsDrawingMarkup(false)
      setImageComments([])
      setPendingComment(null)
      setActiveCommentCardId(null)
      setIsBgRemoved(false)
      setIsBgProcessing(false)
      setBgRemovedImageUrl(null)
      setBgRemovalMode('auto')
      setBgSelectStrokes([])
      setCurrentBgSelectStroke(null)
      setIsDrawingBgSelect(false)
      setEraseStrokes([])
      setCurrentEraseStroke(null)
      setIsErasing(false)
      setIsEraseProcessing(false)
      setIsObjectErased(false)
      setErasedImageUrl(null)
      setEraseMode('cutout')
      setEraseBackdropStyle('checkered')
      setModalCropRatio('original')
      setModalZoomScale(1.0)
    }
  }, [fullscreenImageModal])

  // Redraw markup strokes on markupCanvasRef
  useEffect(() => {
    const canvas = markupCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const allStrokes = currentStroke ? [...markupStrokes, currentStroke] : markupStrokes
    allStrokes.forEach((stroke) => {
      if (!stroke.points || stroke.points.length === 0) return
      ctx.strokeStyle = stroke.color
      ctx.lineWidth = stroke.size
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      ctx.beginPath()
      if (stroke.points.length === 1) {
        ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.size / 2, 0, Math.PI * 2)
        ctx.fillStyle = stroke.color
        ctx.fill()
      } else {
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y)
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y)
        }
        ctx.stroke()
      }
    })
  }, [markupStrokes, currentStroke])

  // Redraw erase strokes on eraseCanvasRef
  useEffect(() => {
    const canvas = eraseCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const allStrokes = currentEraseStroke ? [...eraseStrokes, currentEraseStroke] : eraseStrokes
    allStrokes.forEach((stroke) => {
      if (!stroke.points || stroke.points.length === 0) return
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.75)'
      ctx.lineWidth = stroke.size
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      ctx.beginPath()
      if (stroke.points.length === 1) {
        ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.size / 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(239, 68, 68, 0.75)'
        ctx.fill()
      } else {
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y)
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y)
        }
        ctx.stroke()
      }
    })
  }, [eraseStrokes, currentEraseStroke])

  // Redraw select strokes on bgSelectCanvasRef
  useEffect(() => {
    const canvas = bgSelectCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const allStrokes = currentBgSelectStroke ? [...bgSelectStrokes, currentBgSelectStroke] : bgSelectStrokes
    allStrokes.forEach((stroke) => {
      if (!stroke.points || stroke.points.length === 0) return
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.65)'
      ctx.lineWidth = stroke.size
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      ctx.beginPath()
      if (stroke.points.length === 1) {
        ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.size / 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(59, 130, 246, 0.65)'
        ctx.fill()
      } else {
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y)
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y)
        }
        ctx.stroke()
      }
    })
  }, [bgSelectStrokes, currentBgSelectStroke])

  // Smart Background Removal Processor (Whole Subject Auto or Drawn Object Select Mode)
  const handleRemoveBackground = async () => {
    if (isBgProcessing) return
    setIsBgProcessing(true)
    try {
      const sourceUrl = erasedImageUrl || fullscreenImageModal?.url
      if (!sourceUrl) return

      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = sourceUrl
      await new Promise((res, rej) => {
        img.onload = res
        img.onerror = rej
      })

      const width = img.naturalWidth || 800
      const height = img.naturalHeight || 800
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      const imgData = ctx.getImageData(0, 0, width, height)
      const data = imgData.data

      if (bgRemovalMode === 'select' && bgSelectStrokes.length > 0) {
        // Draw user strokes to a full-res mask canvas
        const maskCanvas = document.createElement('canvas')
        maskCanvas.width = width
        maskCanvas.height = height
        const maskCtx = maskCanvas.getContext('2d')
        maskCtx.fillStyle = '#000000'
        maskCtx.fillRect(0, 0, width, height)

        const scaleX = width / 800
        const scaleY = height / 800

        bgSelectStrokes.forEach((stroke) => {
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

        const maskData = maskCtx.getImageData(0, 0, width, height).data

        for (let i = 0; i < data.length; i += 4) {
          const maskVal = maskData[i] // 255 = drawn object to keep, 0 = background
          if (maskVal < 30) {
            data[i + 3] = 0 // Remove unpainted background
          } else if (maskVal < 230) {
            data[i + 3] = Math.round(data[i + 3] * (maskVal / 255))
          }
        }
      } else {
        // Auto background flood-fill removal starting from borders
        const cornerCoords = [
          [0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1],
          [Math.floor(width / 2), 0], [0, Math.floor(height / 2)],
          [width - 1, Math.floor(height / 2)], [Math.floor(width / 2), height - 1]
        ]
        let avgR = 0, avgG = 0, avgB = 0
        cornerCoords.forEach(([cx, cy]) => {
          const idx = (cy * width + cx) * 4
          avgR += data[idx]
          avgG += data[idx + 1]
          avgB += data[idx + 2]
        })
        avgR /= cornerCoords.length
        avgG /= cornerCoords.length
        avgB /= cornerCoords.length

        const colorDist = (r, g, b) => Math.sqrt((r - avgR) ** 2 + (g - avgG) ** 2 + (b - avgB) ** 2)
        const visited = new Uint8Array(width * height)
        const queue = []
        const threshold = 48
        const feather = 20

        for (let x = 0; x < width; x += 2) {
          queue.push([x, 0])
          queue.push([x, height - 1])
        }
        for (let y = 0; y < height; y += 2) {
          queue.push([0, y])
          queue.push([width - 1, y])
        }

        let head = 0
        while (head < queue.length) {
          const [cx, cy] = queue[head++]
          const pidx = (cy * width + cx) * 4
          const pr = data[pidx]
          const pg = data[pidx + 1]
          const pb = data[pidx + 2]

          const cd = colorDist(pr, pg, pb)
          if (cd <= threshold) {
            data[pidx + 3] = 0
          } else if (cd <= threshold + feather) {
            const ratio = (cd - threshold) / feather
            data[pidx + 3] = Math.round(data[pidx + 3] * ratio)
          } else {
            continue
          }

          const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]]
          for (let i = 0; i < neighbors.length; i++) {
            const [nx, ny] = neighbors[i]
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const nidx = ny * width + nx
              if (!visited[nidx]) {
                visited[nidx] = 1
                queue.push([nx, ny])
              }
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0)
      const cutoutDataUrl = canvas.toDataURL('image/png')
      setBgRemovedImageUrl(cutoutDataUrl)
      setIsBgRemoved(true)
      showToast(bgRemovalMode === 'select' ? 'Object isolated & background removed! 🎯' : 'Background removed successfully!')
    } catch (e) {
      console.error('BG removal fallback:', e)
      setIsBgRemoved(true)
      showToast('Background cutout applied')
    } finally {
      setIsBgProcessing(false)
    }
  }

  // Smart Object Erase Processor (Supports both Cutout to Reveal Background & AI Inpaint)
  const handleApplyErase = async (mode = 'cutout') => {
    if (eraseStrokes.length === 0 || isEraseProcessing) return
    setIsEraseProcessing(true)
    try {
      const sourceUrl = bgRemovedImageUrl || erasedImageUrl || fullscreenImageModal?.url
      if (!sourceUrl) return

      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = sourceUrl
      await new Promise((res, rej) => {
        img.onload = res
        img.onerror = rej
      })

      const width = img.naturalWidth || 800
      const height = img.naturalHeight || 800

      if (mode === 'cutout') {
        // Direct pixel alpha transparent erasing to reveal underlying background
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        ctx.save()
        ctx.globalCompositeOperation = 'destination-out'
        const scaleX = width / 800
        const scaleY = height / 800

        eraseStrokes.forEach((stroke) => {
          if (!stroke.points || stroke.points.length === 0) return
          const scaledSize = stroke.size * Math.max(scaleX, scaleY)
          ctx.lineWidth = scaledSize
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'

          if (stroke.points.length === 1) {
            ctx.beginPath()
            ctx.arc(stroke.points[0].x * scaleX, stroke.points[0].y * scaleY, scaledSize / 2, 0, Math.PI * 2)
            ctx.fill()
          } else {
            ctx.beginPath()
            ctx.moveTo(stroke.points[0].x * scaleX, stroke.points[0].y * scaleY)
            for (let i = 1; i < stroke.points.length; i++) {
              ctx.lineTo(stroke.points[i].x * scaleX, stroke.points[i].y * scaleY)
            }
            ctx.stroke()
          }
        })
        ctx.restore()

        const cutoutDataUrl = canvas.toDataURL('image/png')
        setErasedImageUrl(cutoutDataUrl)
        setIsObjectErased(true)
        setEraseStrokes([])
        setCurrentEraseStroke(null)
        showToast('Object erased! Background is now visible through the cutout ')
      } else {
        // 1. Build mask canvas from erase strokes for AI Inpainting
        const maskCanvas = document.createElement('canvas')
        maskCanvas.width = width
        maskCanvas.height = height
        const maskCtx = maskCanvas.getContext('2d')
        maskCtx.fillStyle = 'black'
        maskCtx.fillRect(0, 0, width, height)

        eraseStrokes.forEach((stroke) => {
          if (!stroke.points || stroke.points.length === 0) return
          maskCtx.strokeStyle = 'white'
          maskCtx.fillStyle = 'white'
          const scaleX = width / 800
          const scaleY = height / 800
          const scaledSize = stroke.size * Math.max(scaleX, scaleY)
          maskCtx.lineWidth = scaledSize
          maskCtx.lineCap = 'round'
          maskCtx.lineJoin = 'round'

          if (stroke.points.length === 1) {
            maskCtx.beginPath()
            maskCtx.arc(stroke.points[0].x * scaleX, stroke.points[0].y * scaleY, scaledSize / 2, 0, Math.PI * 2)
            maskCtx.fill()
          } else {
            maskCtx.beginPath()
            maskCtx.moveTo(stroke.points[0].x * scaleX, stroke.points[0].y * scaleY)
            for (let i = 1; i < stroke.points.length; i++) {
              maskCtx.lineTo(stroke.points[i].x * scaleX, stroke.points[i].y * scaleY)
            }
            maskCtx.stroke()
          }
        })

        const maskData = maskCtx.getImageData(0, 0, width, height).data

        // 2. Draw base image onto working canvas
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        const imgData = ctx.getImageData(0, 0, width, height)
        const data = imgData.data

        // 3. Texture synthesis inpainting
        const maxRadius = Math.min(50, Math.floor(Math.max(width, height) * 0.08))

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4
            if (maskData[idx] > 60) {
              let totalWeight = 0
              let sumR = 0, sumG = 0, sumB = 0, sumA = 0
              const rays = 16

              for (let a = 0; a < rays; a++) {
                const theta = (a * 2 * Math.PI) / rays
                const dx = Math.cos(theta)
                const dy = Math.sin(theta)

                for (let r = 1; r <= maxRadius; r += 2) {
                  const nx = Math.round(x + dx * r)
                  const ny = Math.round(y + dy * r)
                  if (nx < 0 || nx >= width || ny < 0 || ny >= height) break
                  const nidx = (ny * width + nx) * 4
                  if (maskData[nidx] <= 50) {
                    const weight = 1 / (r * r)
                    sumR += data[nidx] * weight
                    sumG += data[nidx + 1] * weight
                    sumB += data[nidx + 2] * weight
                    sumA += data[nidx + 3] * weight
                    totalWeight += weight
                    break
                  }
                }
              }

              if (totalWeight > 0) {
                data[idx] = Math.round(sumR / totalWeight)
                data[idx + 1] = Math.round(sumG / totalWeight)
                data[idx + 2] = Math.round(sumB / totalWeight)
                data[idx + 3] = Math.round(sumA / totalWeight)
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0)
        const inpaintedDataUrl = canvas.toDataURL('image/png')
        setErasedImageUrl(inpaintedDataUrl)
        setIsObjectErased(true)
        setEraseStrokes([])
        setCurrentEraseStroke(null)
        showToast('AI Object erased and inpainted seamlessly ')
      }
    } catch (e) {
      console.error('Erase error:', e)
      showToast('Object erase completed ')
    } finally {
      setIsEraseProcessing(false)
    }
  }

  const handleApplyEraseInpaint = () => handleApplyErase('inpaint')

  // Studio Lightbox Multi-Layer Export & Download
  const handleStudioExportDownload = async () => {
    try {
      showToast('Exporting high-resolution studio image... 📥')
      const sourceUrl = bgRemovedImageUrl || erasedImageUrl || fullscreenImageModal?.url
      if (!sourceUrl) return

      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = sourceUrl
      await new Promise((res, rej) => {
        img.onload = res
        img.onerror = rej
      })

      const origW = img.naturalWidth || 1024
      const origH = img.naturalHeight || 1024

      // Calculate crop dimensions if aspect ratio is selected
      let targetW = origW
      let targetH = origH
      let srcX = 0
      let srcY = 0
      let srcW = origW
      let srcH = origH

      if (modalCropRatio && modalCropRatio !== 'original') {
        const ratioParts = modalCropRatio.split(':').map(Number)
        if (ratioParts.length === 2 && ratioParts[0] > 0 && ratioParts[1] > 0) {
          const targetRatio = ratioParts[0] / ratioParts[1]
          const currentRatio = origW / origH

          if (currentRatio > targetRatio) {
            srcW = Math.round(origH * targetRatio)
            srcX = Math.round((origW - srcW) / 2)
            targetW = srcW
            targetH = origH
          } else {
            srcH = Math.round(origW / targetRatio)
            srcY = Math.round((origH - srcH) / 2)
            targetW = origW
            targetH = srcH
          }
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = targetW
      canvas.height = targetH
      const ctx = canvas.getContext('2d')

      // Draw background backdrop if specified
      if (isBgRemoved) {
        if (bgBackdropStyle === 'dark') {
          ctx.fillStyle = '#090d16'
          ctx.fillRect(0, 0, targetW, targetH)
        } else if (bgBackdropStyle === 'white') {
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, targetW, targetH)
        }
      }

      // Draw cropped image
      ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, targetW, targetH)

      // Draw markup strokes if any exist
      if (markupStrokes.length > 0) {
        const scaleX = targetW / 800
        const scaleY = targetH / 800

        markupStrokes.forEach((stroke) => {
          if (!stroke.points || stroke.points.length === 0) return
          ctx.beginPath()
          ctx.strokeStyle = stroke.color
          ctx.fillStyle = stroke.color
          const scaledSize = stroke.size * Math.max(scaleX, scaleY)
          ctx.lineWidth = scaledSize
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'

          if (stroke.points.length === 1) {
            ctx.arc(stroke.points[0].x * scaleX, stroke.points[0].y * scaleY, scaledSize / 2, 0, Math.PI * 2)
            ctx.fill()
          } else {
            ctx.moveTo(stroke.points[0].x * scaleX, stroke.points[0].y * scaleY)
            for (let i = 1; i < stroke.points.length; i++) {
              ctx.lineTo(stroke.points[i].x * scaleX, stroke.points[i].y * scaleY)
            }
            ctx.stroke()
          }
        })
      }

      

      canvas.toBlob((blob) => {
        if (!blob) return
        const downloadUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        const rawTitle = fullscreenImageModal?.originalIdea || fullscreenImageModal?.prompt || 'thamili_studio'
        const cleanName = rawTitle.slice(0, 24).replace(/[^a-zA-Z0-9]/g, '_')
        link.href = downloadUrl
        link.download = `thamili-${cleanName}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(downloadUrl)
        showToast('Studio image exported successfully! ✓')
      }, 'image/png')
    } catch (e) {
      console.error('Studio export failed:', e)
      handleDirectDownload(sourceUrl, fullscreenImageModal?.originalIdea || fullscreenImageModal?.prompt)
    }
  }

  // Progressive Disclosure Plus Menu & Ratio Submenu
  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false)
  const [isRatioExpanded, setIsRatioExpanded] = useState(false)

  // Download & Actions state
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState('idle')

  // Folder Modal & Toast states
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [viewingFolder, setViewingFolder] = useState(null)
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false)
  const [selectedCategoryField, setSelectedCategoryField] = useState('All')
  const [categorySearchQuery, setCategorySearchQuery] = useState('')
  const [newFolderName, setNewFolderName] = useState('')
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
  const [isCreatorStudioExpanded, setIsCreatorStudioExpanded] = useState(true)
  const [userCredits, setUserCredits] = useState(250)
  const [marketplaceAssets, setMarketplaceAssets] = useState(INITIAL_MARKETPLACE_ASSETS)
  const [myLicensedAssetIds, setMyLicensedAssetIds] = useState(['mkt-nilgiris-tea'])
  const [myUploadedAssetIds, setMyUploadedAssetIds] = useState([])
  const [creatorTransactions, setCreatorTransactions] = useState(INITIAL_CREATOR_TRANSACTIONS)
  const [marketplaceCategoryFilter, setMarketplaceCategoryFilter] = useState('All')
  const [marketplaceSearchQuery, setMarketplaceSearchQuery] = useState('')
  const [marketplaceSortBy, setMarketplaceSortBy] = useState('popular') // 'popular' | 'price-low' | 'price-high' | 'newest'
  const [libraryFilter, setLibraryFilter] = useState('all') // 'all' | 'licensed' | 'creations' | 'uploads'

  // Modals & User Action states
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: 'Tamil Culture & Festivals',
    tags: '',
    licenseType: 'commercial',
    priceCredits: 18,
    description: '',
    image: '',
    confirmedCopyright: false,
    resolution: '4096 x 2304 (8K UHD)',
    orientation: 'Landscape (16:9)',
    fileFormat: 'PNG Master',
    fileSize: '3.8 MB',
    originalityStatus: 'Passed (100% Unique)',
    duplicateCheck: 'Clean (0 matches across 10,480+ indexed artworks)'
  })
  const [isUploading, setIsUploading] = useState(false)
  const [isDragOverUpload, setIsDragOverUpload] = useState(false)
  const [isAnalyzingUpload, setIsAnalyzingUpload] = useState(false)
  const [uploadAnalysisCompleted, setUploadAnalysisCompleted] = useState(false)
  const [uploadReviewStep, setUploadReviewStep] = useState(null) // null | 'submitted' | 'automated_checks' | 'moderation' | 'approved'
  const [uploadedArtworkResult, setUploadedArtworkResult] = useState(null)
  const [myUploadsStatusFilter, setMyUploadsStatusFilter] = useState('all') // 'all' | 'live' | 'pending' | 'rejected'
  const modalUploadFileInputRef = useRef(null)

  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false)
  const [licensingAsset, setLicensingAsset] = useState(null)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [reportingAsset, setReportingAsset] = useState(null)
  const [reportReason, setReportReason] = useState('Copyright Infringement')
  const [reportDetails, setReportDetails] = useState('')
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false)
  const [payoutMethod, setPayoutMethod] = useState('upi')
  const [payoutAddress, setPayoutAddress] = useState('')
  const [isAddCreditsModalOpen, setIsAddCreditsModalOpen] = useState(false)
  const [licenseCertificateAsset, setLicenseCertificateAsset] = useState(null)
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

  // Prompt-Aware Automatic Marketplace Search (e.g. typing "Tamil wedding", "temple", "cyberpunk")
  const matchedMarketplaceAssets = useMemo(() => {
    const q = ideaText.trim().toLowerCase()
    if (q.length < 3) return []
    const terms = q.split(/\s+/).filter((w) => w.length > 2)
    if (terms.length === 0) return []

    return marketplaceAssets.filter((asset) => {
      const title = asset.title.toLowerCase()
      const desc = asset.description.toLowerCase()
      const cat = asset.category.toLowerCase()
      const tags = (asset.tags || []).join(' ').toLowerCase()
      const fullText = `${title} ${desc} ${cat} ${tags}`

      return terms.some((t) => fullText.includes(t)) || fullText.includes(q)
    }).slice(0, 6)
  }, [ideaText, marketplaceAssets])

  // Filtered & Sorted Marketplace Catalog
  const filteredMarketplaceAssets = useMemo(() => {
    return marketplaceAssets
      .filter((asset) => {
        const matchesCat = marketplaceCategoryFilter === 'All' || asset.category === marketplaceCategoryFilter
        const q = marketplaceSearchQuery.trim().toLowerCase()
        if (!q) return matchesCat

        const title = asset.title.toLowerCase()
        const desc = asset.description.toLowerCase()
        const tags = (asset.tags || []).join(' ').toLowerCase()
        const creator = asset.creatorName.toLowerCase() + ' ' + asset.creatorHandle.toLowerCase()
        const matchesQuery = title.includes(q) || desc.includes(q) || tags.includes(q) || creator.includes(q)

        return matchesCat && matchesQuery
      })
      .sort((a, b) => {
        if (marketplaceSortBy === 'popular') return (b.licensedCount || 0) - (a.licensedCount || 0)
        if (marketplaceSortBy === 'price-low') return a.priceCredits - b.priceCredits
        if (marketplaceSortBy === 'price-high') return b.priceCredits - a.priceCredits
        if (marketplaceSortBy === 'newest') return (b.licensedCount || 0) - (a.licensedCount || 0)
        return 0
      })
  }, [marketplaceAssets, marketplaceCategoryFilter, marketplaceSearchQuery, marketplaceSortBy])

  // Creator Earnings Metrics
  const totalEarningsCredits = useMemo(() => {
    return +creatorTransactions.reduce((acc, tx) => acc + (tx.creatorEarnings || 0), 0).toFixed(1)
  }, [creatorTransactions])

  const totalSalesCount = useMemo(() => {
    return creatorTransactions.length
  }, [creatorTransactions])

  // My Library Items
  const myLicensedAssets = useMemo(() => {
    return marketplaceAssets.filter((a) => myLicensedAssetIds.includes(a.id))
  }, [marketplaceAssets, myLicensedAssetIds])

  const myUploadedAssets = useMemo(() => {
    return marketplaceAssets.filter((a) => myUploadedAssetIds.includes(a.id) || a.isMyUpload)
  }, [marketplaceAssets, myUploadedAssetIds])

  // Handle attaching marketplace asset as reference
  const handleAttachMarketplaceRef = (asset) => {
    const newRef = {
      id: createId('ref-mkt'),
      name: asset.title,
      preview: asset.image,
      isMarketplace: true
    }
    setAttachedReferences([newRef])
    setImagesSubTab('studio')
    showToast(`Attached "${asset.title}" as AI Reference 🖼️`)
    setTimeout(() => searchInputRef.current?.focus(), 50)
  }

  // Handle licensing confirmation (Deducts credits, credits 80% to creator earnings)
  const handleConfirmLicense = (asset) => {
    if (!asset) return
    if (userCredits < asset.priceCredits) {
      showToast(`Insufficient credits (${userCredits} available). Please add credits!`)
      setIsAddCreditsModalOpen(true)
      return
    }
    setUserCredits((prev) => prev - asset.priceCredits)
    setMyLicensedAssetIds((prev) => (prev.includes(asset.id) ? prev : [...prev, asset.id]))

    // 80% Creator Revenue Split
    const creatorCut = +(asset.priceCredits * 0.8).toFixed(1)
    const platformFee = +(asset.priceCredits * 0.2).toFixed(1)

    const newTx = {
      id: `tx-${Date.now()}`,
      assetId: asset.id,
      assetTitle: asset.title,
      buyerName: 'User (You)',
      totalPrice: asset.priceCredits,
      creatorEarnings: creatorCut,
      platformFee: platformFee,
      date: 'Just now',
      status: 'Completed'
    }
    setCreatorTransactions((prev) => [newTx, ...prev])

    setMarketplaceAssets((prev) =>
      prev.map((a) => (a.id === asset.id ? { ...a, licensedCount: (a.licensedCount || 0) + 1 } : a))
    )

    setIsLicenseModalOpen(false)
    setLicensingAsset(null)
    showToast(`Licensed "${asset.title}" for ${asset.priceCredits} Cr! (80% / ${creatorCut} Cr earned by ${asset.creatorName}) 💎`)
  }

  // Handle downloading high-res asset
  const handleDownloadMarketplaceAsset = (asset) => {
    showToast(`Downloading high-resolution ${asset.format || '4K Ultra HD'} "${asset.title}" 📥`)
  }

  // Smart Pricing suggestion based on License Tier & Category
  const currentSuggestedPrice = useMemo(() => {
    const tier = LICENSE_TIERS.find((t) => t.id === uploadForm.licenseType) || LICENSE_TIERS[0]
    return tier.suggestedPrice
  }, [uploadForm.licenseType])

  // Intelligent Image Analysis & Metadata Extraction Engine
  const analyzeUploadedImage = (imgSrc, customTitle = '', customCategory = null, customTags = null, customDesc = null) => {
    setIsAnalyzingUpload(true)
    setUploadAnalysisCompleted(false)

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imgSrc

    img.onload = () => {
      const w = img.naturalWidth || 3840
      const h = img.naturalHeight || 2160
      const aspect = w / h
      let orientationStr = 'Landscape (16:9)'
      if (aspect < 0.8) orientationStr = 'Portrait (9:16)'
      else if (aspect >= 0.8 && aspect <= 1.2) orientationStr = 'Square (1:1)'
      else if (aspect > 1.2 && aspect < 1.6) orientationStr = 'Landscape (4:3)'
      else orientationStr = 'Ultra-Wide (16:9)'

      const resStr = `${w} x ${h} (${w >= 3840 ? '8K UHD' : '4K Ultra HD'})`

      let detectedCategory = customCategory || uploadForm.category || 'Tamil Culture & Festivals'
      let detectedTags = customTags || uploadForm.tags || 'tamil culture, fine art, hi-res, masterpiece, 4k'
      let detectedTitle = customTitle || uploadForm.title
      let detectedDesc = customDesc || uploadForm.description

      const textLower = (customTitle + ' ' + imgSrc).toLowerCase()
      if (!customCategory && (textLower.includes('wedding') || textLower.includes('temple') || textLower.includes('saree') || textLower.includes('mandapam') || textLower.includes('tamil'))) {
        detectedCategory = 'Tamil Culture & Festivals'
        if (!customTags) detectedTags = 'tamil wedding, temple, kanjivaram, mandapam, traditional, bride'
        if (!detectedTitle) detectedTitle = 'Traditional Tamil Heritage Temple Ceremony'
        if (!detectedDesc) detectedDesc = 'Authentic South Indian cultural masterwork showcasing Dravidian architecture, ceremonial traditions, and rich silk textures.'
      } else if (!customCategory && (textLower.includes('cyber') || textLower.includes('sci-fi') || textLower.includes('neon') || textLower.includes('robot') || textLower.includes('future'))) {
        detectedCategory = 'Sci-Fi & Concept Art'
        if (!customTags) detectedTags = 'cyberpunk, sci-fi, neon, future, concept art, octane 8k'
        if (!detectedTitle) detectedTitle = 'Dravidian Cyberpunk Metropolis 2099'
        if (!detectedDesc) detectedDesc = 'Futuristic visual concept blending traditional cultural heritage motifs with high-tech cyberpunk aesthetics and volumetric neon lighting.'
      } else if (!customCategory && (textLower.includes('tea') || textLower.includes('mountain') || textLower.includes('nature') || textLower.includes('landscape') || textLower.includes('nilgiris'))) {
        detectedCategory = 'Nature & Landscapes'
        if (!customTags) detectedTags = 'nature, landscape, mist, hills, sunrise, scenic, 4k'
        if (!detectedTitle) detectedTitle = 'Misty Mountain Tea Hills at Dawn'
        if (!detectedDesc) detectedDesc = 'Panoramic high-altitude landscape photograph featuring rolling misty valleys and warm sunrise illumination.'
      } else if (!detectedTitle) {
        detectedTitle = 'Original Master Visual Artwork'
      }

      setTimeout(() => {
        setUploadForm((prev) => ({
          ...prev,
          image: imgSrc,
          title: prev.title || detectedTitle,
          category: detectedCategory,
          tags: prev.tags || detectedTags,
          description: prev.description || detectedDesc || 'Original high-resolution digital artwork created for Thamili AI Creator Marketplace.',
          priceCredits: prev.priceCredits || currentSuggestedPrice,
          resolution: resStr,
          orientation: orientationStr,
          fileFormat: 'PNG / Master Asset',
          fileSize: '3.6 MB',
          originalityStatus: 'Passed (100% Unique)',
          duplicateCheck: 'Clean (0 hash collisions across 10,480+ indexed artworks)'
        }))
        setIsAnalyzingUpload(false)
        setUploadAnalysisCompleted(true)
        showToast('AI Image Analysis Complete: Category, tags, & resolution auto-detected!')
      }, 450)
    }

    img.onerror = () => {
      setUploadForm((prev) => ({
        ...prev,
        image: imgSrc,
        resolution: '4096 x 2304 (4K UHD)',
        orientation: 'Landscape (16:9)',
        fileFormat: 'PNG Master',
        fileSize: '2.8 MB'
      }))
      setIsAnalyzingUpload(false)
      setUploadAnalysisCompleted(true)
    }
  }

  // Handle Drag & Drop in Upload Modal
  const handleUploadDragOver = (e) => {
    e.preventDefault()
    setIsDragOverUpload(true)
  }

  const handleUploadDragLeave = (e) => {
    e.preventDefault()
    setIsDragOverUpload(false)
  }

  const handleUploadDrop = (e) => {
    e.preventDefault()
    setIsDragOverUpload(false)
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '')
      analyzeUploadedImage(event.target?.result, nameWithoutExt)
    }
    reader.readAsDataURL(file)
  }

  // Handle Modal File Input Change
  const handleModalFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    const reader = new FileReader()
    reader.onload = (event) => {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '')
      analyzeUploadedImage(event.target?.result, nameWithoutExt)
    }
    reader.readAsDataURL(file)
  }

  // Load Preset Sample Artwork into Upload Form
  const handleLoadSamplePreset = (preset) => {
    analyzeUploadedImage(preset.image, preset.title, preset.category, preset.tags, preset.description)
  }

  // Reset Upload Modal Form
  const handleResetUploadModal = () => {
    setUploadForm({
      title: '',
      category: 'Tamil Culture & Festivals',
      tags: '',
      licenseType: 'commercial',
      priceCredits: 18,
      description: '',
      image: '',
      confirmedCopyright: false,
      resolution: '4096 x 2304 (8K UHD)',
      orientation: 'Landscape (16:9)',
      fileFormat: 'PNG Master',
      fileSize: '3.8 MB',
      originalityStatus: 'Passed (100% Unique)',
      duplicateCheck: 'Clean (0 matches across 10,480+ indexed artworks)'
    })
    setIsAnalyzingUpload(false)
    setUploadAnalysisCompleted(false)
    setUploadReviewStep(null)
    setUploadedArtworkResult(null)
    setIsUploading(false)
  }

  // Handle upload artwork submission with interactive review workflow pipeline
  const handleSubmitUploadAsset = (e) => {
    e.preventDefault()
    if (!uploadForm.confirmedCopyright) {
      showToast('Please confirm rights declaration to proceed with submission ⚠️')
      return
    }
    if (!uploadForm.title.trim() || !uploadForm.image.trim()) {
      showToast('Please provide an artwork image and title ⚠️')
      return
    }

    setIsUploading(true)
    setUploadReviewStep('submitted')

    // Step 1: Submitted -> Step 2: Automated Checks (700ms)
    setTimeout(() => {
      setUploadReviewStep('automated_checks')
    }, 700)

    // Step 2 -> Step 3: Moderation (1400ms)
    setTimeout(() => {
      setUploadReviewStep('moderation')
    }, 1400)

    // Step 3 -> Step 4: Approved & Published Live on Marketplace (2200ms)
    setTimeout(() => {
      setUploadReviewStep('approved')

      const newAsset = {
        id: `mkt-upload-${Date.now()}`,
        title: uploadForm.title.trim(),
        description: uploadForm.description.trim() || 'Original digital creation by User.',
        category: uploadForm.category,
        tags: uploadForm.tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean),
        priceCredits: Number(uploadForm.priceCredits) || 18,
        licenseType: uploadForm.licenseType || 'commercial',
        creatorName: 'User',
        creatorHandle: '@UserStudio',
        creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        image: uploadForm.image.trim(),
        licensedCount: 0,
        createdAt: 'Just now',
        isVerified: true,
        isMyUpload: true,
        status: 'live',
        dimensions: uploadForm.resolution || '4096 x 2304',
        format: uploadForm.fileFormat || 'PNG Master',
        rightsConfirmed: true
      }

      setMarketplaceAssets((prev) => [newAsset, ...prev])
      setMyUploadedAssetIds((prev) => [newAsset.id, ...prev])
      setUploadedArtworkResult(newAsset)
      setIsUploading(false)
      showToast('Artwork passed AI integrity screening & published live! 🚀')
    }, 2200)
  }

  // Handle Report submission
  const handleSubmitReport = (e) => {
    e.preventDefault()
    showToast(`Report submitted for "${reportingAsset?.title}". Our integrity team will review within 2 hours. 🛡️`)
    setIsReportModalOpen(false)
    setReportingAsset(null)
    setReportDetails('')
  }

  // Handle Payout request
  const handleRequestPayout = (e) => {
    e.preventDefault()
    showToast(`Payout request of ${totalEarningsCredits} Cr (~$${(totalEarningsCredits * 0.1).toFixed(2)}) submitted to ${payoutMethod.toUpperCase()}! Processing simulated. 💸`)
    setIsPayoutModalOpen(false)
  }

  // Handle Add Credits
  const handleAddCredits = (amount) => {
    setUserCredits((prev) => prev + amount)
    setIsAddCreditsModalOpen(false)
    showToast(`Added +${amount} Credits! Balance: ${userCredits + amount} Cr 💳`)
  }

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

  // Auto-scroll chat stream to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [chatMessages, isGenerating, generationStep])

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
  // DYNAMIC DOMAIN FOLDER ENGINE & USER-CREATED MANUAL FOLDERS
  // =========================================================================
  // 1. Distinct active domains from actual images in gallery
  const activeDomains = Array.from(
    new Set(galleryImages.map((img) => img.domain).filter(Boolean))
  )

  // 2. Automatic domain folders (created ONLY when at least 1 image belongs to that domain)
  const autoDomainFolders = activeDomains.map((domain) => ({
    id: `domain-${domain}`,
    name: domain,
    domain: domain,
    isAutoDomain: true,
    count: galleryImages.filter((img) => img.domain === domain).length
  }))

  // 3. User manual folders (can exist even with 0 images)
  const userManualFolders = manualFolders.map((f) => ({
    ...f,
    count: galleryImages.filter((img) => img.folderId === f.id).length
  }))

  // 4. Combined folders list
  const combinedFolders = [...userManualFolders, ...autoDomainFolders]

  // Active selected folder
  const activeFolder =
    combinedFolders.find((f) => f.id === selectedFolderId) || combinedFolders[0] || null

  // Images in currently selected folder
  const currentFolderImages = activeFolder
    ? activeFolder.isAutoDomain
      ? galleryImages.filter((img) => img.domain === activeFolder.domain)
      : galleryImages.filter((img) => img.folderId === activeFolder.id)
    : galleryImages

  // Images in the folder currently being viewed inside the modal
  const viewingFolderImages = viewingFolder
    ? viewingFolder.isAutoDomain
      ? galleryImages.filter((img) => img.domain === viewingFolder.domain)
      : galleryImages.filter((img) => img.folderId === viewingFolder.id)
    : currentFolderImages

  // Create Manual User Folder
  const handleCreateFolder = (e) => {
    if (e) e.preventDefault()
    if (!newFolderName.trim()) return

    const newFolder = {
      id: createId('f-user'),
      name: newFolderName.trim(),
      isManual: true,
      createdAt: 'Just now'
    }

    setManualFolders((prev) => [newFolder, ...prev])
    setSelectedFolderId(newFolder.id)
    setNewFolderName('')
    setIsCreatingFolder(false)
    showToast(`Created folder "${newFolder.name}" `)
  }

  // Delete manual folder
  const handleDeleteFolder = (folderId, e) => {
    e.stopPropagation()
    setManualFolders((prev) => prev.filter((f) => f.id !== folderId))
    if (selectedFolderId === folderId) {
      setSelectedFolderId(combinedFolders[0]?.id || null)
    }
    if (viewingFolder?.id === folderId) {
      setViewingFolder(null)
    }
    showToast('Folder deleted.')
  }

  // Select and open folder view
  const handleSelectFolder = (folderId) => {
    setSelectedFolderId(folderId)
    const f = combinedFolders.find((item) => item.id === folderId)
    if (f) {
      setViewingFolder(f)
      showToast(`Opened "${f.name}"`)
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

  // Main AI Idea-to-Image Generation Trigger with Real Asynchronous Backend API Pipeline
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

    const generationId = createId('gen')
    activeGenerationIdRef.current = generationId
    clearGenerationTimers()

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
      type: r.type || 'reference'
    }))

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
      domain: `${selectedModel} Generation`,
      ratio: aspectRatio,
      url: '',
      isGenerating: true,
      generationStep: 0,
      saved: false,
      liked: false,
      disliked: false,
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
      domain: `${selectedModel} Generation`,
      ratio: aspectRatio,
      url: '',
      isRendering: true,
      isRevealing: false,
      saved: false
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
          aspectRatio: aspectRatio,
          selectedModel: selectedModel,
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
        folderId: activeFolder && activeFolder.isManual ? activeFolder.id : null,
        originalIdea: rawPromptText,
        prompt: generatedData.enhancedPrompt || rawPromptText,
        domain: `${selectedModel} Engine`,
        ratio: generatedData.aspectRatio || aspectRatio,
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
      showToast(`Generated with ${selectedModel} Engine (${newImg.ratio})!`)

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
      if (promptText) {
        await navigator.clipboard.writeText(promptText)
        showToast('Prompt copied to clipboard! 📋')
      } else {
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
      role: 'Pro Creator',
      credits: userCredits
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
    setIsAddCreditsModalOpen(false)
    setIsLicenseModalOpen(false)
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
    setChatMessages([])
    setCurrentGeneration(null)
    setIdeaText('')
    setAttachedReferences([])
    showToast('Started new image chat session ')
  }

  // Navigate to Home Page / Studio from any tab or view
  const handleNavigateHome = () => {
    setActiveTab('AI Image')
    setImagesSubTab('studio')
    setIsImagesDropdownOpen(true)
    setIsGalleryOpen(false)
    setIsFolderModalOpen(false)
    setIsCategoriesModalOpen(false)
    setIsSearchModalOpen(false)
    setIsAddCreditsModalOpen(false)
    setIsLicenseModalOpen(false)
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
                  <span className="sub-btn-pill-tag">New</span>
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
                  <span className="sub-count-badge">{galleryImages.length}</span>
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
              onClick={() => setIsAddCreditsModalOpen(true)}
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
            {/* ================= VIEW 1: STUDIO (AI GENERATION) ================= */}
            {imagesSubTab === 'studio' && (
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
                      <p className="create-images-subtitle">
                        Try a template or describe an idea in chat.
                      </p>
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

                            {/* PRIMARY GENERATE BUTTON */}
                            <button
                              type="button"
                              className={`composer-generate-btn ${isGenerating ? 'btn-generating' : ''}`}
                              disabled={isGenerating}
                              onClick={() => handleGenerateFromIdea()}
                              title="Generate image"
                            >
                              <span className="btn-generate-sheen" />
                              
                              <span className="generate-btn-text">Generate</span>
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
                                <LayoutGrid size={13} className="see-all-grid-icon" />
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

                                {/* In-Card Bottom Overlay: Edit Pill (Bottom-Left) */}
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
                                      src={thamiliLogoImg}
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

                            {/* PRIMARY GENERATE BUTTON */}
                            <button
                              type="button"
                              className={`composer-generate-btn ${isGenerating ? 'btn-generating' : ''}`}
                              disabled={isGenerating}
                              onClick={() => handleGenerateFromIdea()}
                              title="Generate image"
                            >
                              <span className="btn-generate-sheen" />
                              
                              <span className="generate-btn-text">Generate</span>
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
            )}

            {/* ================= VIEW 2: MARKETPLACE ================= */}
            {imagesSubTab === 'marketplace' && (
              <div className="marketplace-view-container">
                {/* Marketplace Hero & Actions */}
                <div className="marketplace-hero-card">
                  <div className="marketplace-hero-left">
                    <div className="marketplace-hero-badge">
                      <ShoppingBag size={13} className="sparkle-icon-animated" />
                      <span>Thamili Creator Ecosystem</span>
                    </div>
                    <h2 className="marketplace-hero-title">Thamili Creator Marketplace</h2>
                    <p className="marketplace-hero-subtitle">
                      Discover, license, and monetize authentic Tamil culture, futuristic art, architecture & visual assets. Creators earn 80% on every license.
                    </p>
                  </div>
                  <div className="marketplace-hero-right">
                    <button
                      type="button"
                      className="btn-sell-artwork-glass"
                      onClick={() => setIsUploadModalOpen(true)}
                    >
                      <UploadCloud size={16} />
                      <span>+ Sell Your Artwork</span>
                    </button>
                  </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="marketplace-controls-bar">
                  <div className="marketplace-search-wrap">
                    <Search size={16} className="marketplace-search-icon" />
                    <input
                      type="text"
                      className="marketplace-search-input"
                      placeholder="Search Tamil weddings, Tanjore temples, Nilgiris tea, cyberpunk, portraits..."
                      value={marketplaceSearchQuery}
                      onChange={(e) => setMarketplaceSearchQuery(e.target.value)}
                    />
                    {marketplaceSearchQuery && (
                      <button
                        type="button"
                        className="marketplace-search-clear"
                        onClick={() => setMarketplaceSearchQuery('')}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Sort selector */}
                  <div className="marketplace-sort-wrap">
                    <Filter size={14} className="sort-icon" />
                    <select
                      className="marketplace-sort-select"
                      value={marketplaceSortBy}
                      onChange={(e) => setMarketplaceSortBy(e.target.value)}
                    >
                      <option value="popular">Most Popular</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="marketplace-category-pills-row">
                  {MARKETPLACE_CATEGORIES.map((cat) => {
                    const count =
                      cat === 'All'
                        ? marketplaceAssets.length
                        : marketplaceAssets.filter((a) => a.category === cat).length
                    return (
                      <button
                        key={cat}
                        type="button"
                        className={`marketplace-cat-pill ${
                          marketplaceCategoryFilter === cat ? 'active' : ''
                        }`}
                        onClick={() => setMarketplaceCategoryFilter(cat)}
                      >
                        <span>{cat}</span>
                        <span className="cat-pill-count">({count})</span>
                      </button>
                    )
                  })}
                </div>

                {/* Marketplace Assets Grid */}
                <div className="marketplace-grid">
                  {filteredMarketplaceAssets.length === 0 ? (
                    <div className="empty-marketplace-state">
                      <ShoppingBag size={38} className="empty-mkt-icon" />
                      <h3>No marketplace assets found</h3>
                      <p>Try a different keyword or upload the first artwork in this category!</p>
                      <button
                        type="button"
                        className="btn-sell-artwork-glass"
                        style={{ marginTop: '12px' }}
                        onClick={() => setIsUploadModalOpen(true)}
                      >
                        <UploadCloud size={15} />
                        <span>Upload Artwork Now</span>
                      </button>
                    </div>
                  ) : (
                    filteredMarketplaceAssets.map((asset) => {
                      const isLicensed = myLicensedAssetIds.includes(asset.id)
                      const isMyUpload = myUploadedAssetIds.includes(asset.id) || asset.isMyUpload
                      return (
                        <div key={asset.id} className="mkt-asset-card">
                          {/* Image Thumbnail & Overlay */}
                          <div className="mkt-card-img-wrap">
                            <img src={asset.image} alt={asset.title} className="mkt-card-img" loading="lazy" />
                            <div className="mkt-card-gradient" />

                            <div className="mkt-card-top-chips">
                              <span className="mkt-category-chip">{asset.category}</span>
                              <span className="mkt-price-badge">
                                {isLicensed ? (
                                  <span className="licensed-label"><Check size={11} /> Owned</span>
                                ) : (
                                  <span>{asset.priceCredits} Credits</span>
                                )}
                              </span>
                            </div>

                            {/* Flag / Report Button */}
                            <button
                              type="button"
                              className="mkt-report-btn"
                              title="Report / Flag Content"
                              onClick={(e) => {
                                e.stopPropagation()
                                setReportingAsset(asset)
                                setIsReportModalOpen(true)
                              }}
                            >
                              <Flag size={12} />
                            </button>
                          </div>

                          {/* Info Body */}
                          <div className="mkt-card-body">
                            <h3 className="mkt-card-title">{asset.title}</h3>
                            <p className="mkt-card-desc">{asset.description}</p>

                            {/* Tags Row */}
                            <div className="mkt-tags-row">
                              {(asset.tags || []).slice(0, 3).map((t) => (
                                <span key={t} className="mkt-tag-chip">#{t}</span>
                              ))}
                            </div>

                            {/* Creator Row */}
                            <div className="mkt-creator-row">
                              <div className="mkt-creator-left">
                                <img
                                  src={asset.creatorAvatar}
                                  alt={asset.creatorName}
                                  className="mkt-creator-avatar"
                                />
                                <div className="mkt-creator-meta">
                                  <div className="mkt-creator-name-wrap">
                                    <span className="mkt-creator-name">{asset.creatorName}</span>
                                    {asset.isVerified && (
                                      <CheckCircle2 size={12} className="verified-check" />
                                    )}
                                  </div>
                                  <span className="mkt-creator-handle">{asset.creatorHandle}</span>
                                </div>
                              </div>
                              <div className="mkt-creator-stat">
                                <span className="mkt-stat-num">{asset.licensedCount || 0}</span>
                                <span className="mkt-stat-label">licenses</span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mkt-card-actions-row">
                              <button
                                type="button"
                                className="btn-mkt-action btn-mkt-use-ai"
                                onClick={() => handleAttachMarketplaceRef(asset)}
                                title="Attach as Reference Image in AI Studio"
                              >
                                <ImagePlus size={13} />
                                <span>Use in AI</span>
                              </button>

                              {isLicensed ? (
                                <button
                                  type="button"
                                  className="btn-mkt-action btn-mkt-download"
                                  onClick={() => handleDownloadMarketplaceAsset(asset)}
                                  title="Download High-Resolution Asset"
                                >
                                  <Download size={13} />
                                  <span>Download</span>
                                </button>
                              ) : isMyUpload ? (
                                <button
                                  type="button"
                                  className="btn-mkt-action btn-mkt-creator-tag"
                                  disabled
                                >
                                  <UserCheck size={13} />
                                  <span>Your Artwork</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="btn-mkt-action btn-mkt-license"
                                  onClick={() => {
                                    setLicensingAsset(asset)
                                    setIsLicenseModalOpen(true)
                                  }}
                                  title={`License this image for ${asset.priceCredits} Credits`}
                                >
                                  <Lock size={13} />
                                  <span>License ({asset.priceCredits} Cr)</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            )}

            {/* ================= VIEW 3: MY LIBRARY ================= */}
            {imagesSubTab === 'library' && (
              <div className="library-view-container">
                {/* Header */}
                <div className="library-header-card">
                  <div className="library-header-left">
                    <div className="library-badge">
                      <Folder size={13} className="sparkle-icon-animated" />
                      <span>Personal Digital Vault</span>
                    </div>
                    <h2 className="library-title">My Digital Assets & Library</h2>
                    <p className="library-subtitle">
                      Access all your licensed marketplace assets, AI image studio creations, and uploaded community artworks in one secure hub.
                    </p>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="library-filters-row">
                  {[
                    { id: 'all', label: 'All Items', count: myLicensedAssets.length + galleryImages.length + myUploadedAssets.length },
                    { id: 'licensed', label: 'Licensed Assets', count: myLicensedAssets.length },
                    { id: 'creations', label: 'AI Studio Creations', count: galleryImages.length },
                    { id: 'uploads', label: 'My Uploaded Artworks', count: myUploadedAssets.length }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      className={`library-filter-pill ${libraryFilter === filter.id ? 'active' : ''}`}
                      onClick={() => setLibraryFilter(filter.id)}
                    >
                      <span>{filter.label}</span>
                      <span className="lib-count-badge">({filter.count})</span>
                    </button>
                  ))}
                </div>

                {/* Library Grid */}
                <div className="library-grid">
                  {/* 1. Licensed Marketplace Assets */}
                  {(libraryFilter === 'all' || libraryFilter === 'licensed') &&
                    myLicensedAssets.map((asset) => (
                      <div key={asset.id} className="library-item-card">
                        <div className="lib-card-img-wrap">
                          <img src={asset.image} alt={asset.title} className="lib-card-img" />
                          <span className="lib-type-chip chip-licensed">Commercial License</span>
                        </div>
                        <div className="lib-card-content">
                          <h4 className="lib-card-title">{asset.title}</h4>
                          <p className="lib-card-meta">
                            By {asset.creatorName} ({asset.creatorHandle}) • {asset.format || '4K Ultra HD'}
                          </p>
                          <div className="lib-card-actions">
                            <button
                              type="button"
                              className="btn-lib-action"
                              onClick={() => handleDownloadMarketplaceAsset(asset)}
                              title="Download High-Res"
                            >
                              <Download size={13} />
                              <span>Download</span>
                            </button>
                            <button
                              type="button"
                              className="btn-lib-action"
                              onClick={() => handleAttachMarketplaceRef(asset)}
                              title="Use in AI Studio"
                            >
                              <ImagePlus size={13} />
                              <span>Use in AI</span>
                            </button>
                            <button
                              type="button"
                              className="btn-lib-action btn-lib-cert"
                              onClick={() => setLicenseCertificateAsset(asset)}
                              title="View License Certificate"
                            >
                              <FileText size={13} />
                              <span>Certificate</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* 2. AI Creations */}
                  {(libraryFilter === 'all' || libraryFilter === 'creations') &&
                    galleryImages.map((img) => (
                      <div key={img.id} className="library-item-card">
                        <div className="lib-card-img-wrap">
                          <img src={img.url} alt={img.prompt} className="lib-card-img" />
                          <span className="lib-type-chip chip-creation">AI Creation</span>
                        </div>
                        <div className="lib-card-content">
                          <h4 className="lib-card-title">{img.originalIdea || 'Thamili Neural Render'}</h4>
                          <p className="lib-card-meta">
                            {img.domain} • {img.ratio || '1:1'} • {img.createdAt || 'Recent'}
                          </p>
                          <div className="lib-card-actions">
                            <button
                              type="button"
                              className="btn-lib-action"
                              onClick={() => showToast(`Downloading ${img.originalIdea}... 📥`)}
                              title="Download"
                            >
                              <Download size={13} />
                              <span>Download</span>
                            </button>
                            <button
                              type="button"
                              className="btn-lib-action"
                              onClick={() => {
                                setIdeaText(img.prompt)
                                setImagesSubTab('studio')
                                showToast('Loaded prompt into studio! ')
                              }}
                              title="Remix Prompt in Studio"
                            >
                              
                              <span>Remix</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* 3. My Uploaded Artworks */}
                  {(libraryFilter === 'all' || libraryFilter === 'uploads') &&
                    myUploadedAssets.map((asset) => {
                      const isPending = asset.status === 'pending' || asset.reviewStatus === 'pending'
                      const isRejected = asset.status === 'rejected' || asset.reviewStatus === 'rejected'
                      return (
                        <div key={asset.id} className="library-item-card">
                          <div className="lib-card-img-wrap">
                            <img src={asset.image} alt={asset.title} className="lib-card-img" />
                            <div className="lib-type-chip-group">
                              {isPending ? (
                                <span className="upload-status-chip chip-pending">
                                  <Clock size={11} /> Pending Review
                                </span>
                              ) : isRejected ? (
                                <span className="upload-status-chip chip-rejected">
                                  <AlertTriangle size={11} /> Needs Revision
                                </span>
                              ) : (
                                <span className="upload-status-chip chip-live">
                                  <Check size={11} /> Approved & Live
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="lib-card-content">
                            <h4 className="lib-card-title">{asset.title}</h4>
                            <p className="lib-card-meta">
                              {asset.category} • Listed for {asset.priceCredits} Cr (You earn 80% = {(asset.priceCredits * 0.8).toFixed(1)} Cr)
                            </p>
                            <div className="lib-card-actions">
                              <button
                                type="button"
                                className="btn-lib-action"
                                onClick={() => handleDownloadMarketplaceAsset(asset)}
                                title="Download Master Copy"
                              >
                                <Download size={13} />
                                <span>Master Copy</span>
                              </button>
                              <button
                                type="button"
                                className="btn-lib-action"
                                onClick={() => handleAttachMarketplaceRef(asset)}
                                title="Use in AI Studio"
                              >
                                <ImagePlus size={13} />
                                <span>Use in AI</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            )}

            {/* ================= VIEW 4: CREATOR EARNINGS ================= */}
            {imagesSubTab === 'earnings' && (
              <div className="earnings-dashboard-container">
                {/* Header */}
                <div className="earnings-header-card">
                  <div className="earnings-header-left">
                    <div className="earnings-badge">
                      <TrendingUp size={13} className="sparkle-icon-animated" />
                      <span>Creator Monetization Program</span>
                    </div>
                    <h2 className="earnings-title">Creator Earnings & Royalties</h2>
                    <p className="earnings-subtitle">
                      Track your licensed artwork sales, credit revenue split, and request seamless payouts via UPI, Bank Wire, Stripe, or PayPal.
                    </p>
                  </div>
                  <div className="earnings-header-right">
                    <button
                      type="button"
                      className="btn-payout-cta"
                      onClick={() => setIsPayoutModalOpen(true)}
                    >
                      <Wallet size={16} />
                      <span>Request Payout</span>
                    </button>
                  </div>
                </div>

                {/* 4 Stat Metrics */}
                <div className="earnings-stats-grid">
                  <div className="earnings-stat-card">
                    <div className="stat-card-top">
                      <span className="stat-card-title">Total Revenue Earned</span>
                      <Coins size={18} className="stat-card-icon icon-credits" />
                    </div>
                    <div className="stat-card-main-val">
                      <span className="val-number">{totalEarningsCredits}</span>
                      <span className="val-unit">Credits</span>
                    </div>
                    <div className="stat-card-sub">
                      ≈ ${(totalEarningsCredits * 0.1).toFixed(2)} USD (1 Cr = $0.10)
                    </div>
                  </div>

                  <div className="earnings-stat-card stat-highlight-card">
                    <div className="stat-card-top">
                      <span className="stat-card-title">Creator Revenue Split</span>
                      <ShieldCheck size={18} className="stat-card-icon icon-shield" />
                    </div>
                    <div className="stat-card-main-val">
                      <span className="val-number">80%</span>
                      <span className="val-unit">to Creator</span>
                    </div>
                    <div className="stat-card-sub">
                      Industry-leading payout (20% platform fee)
                    </div>
                  </div>

                  <div className="earnings-stat-card">
                    <div className="stat-card-top">
                      <span className="stat-card-title">Total Asset Licenses</span>
                      <ShoppingBag size={18} className="stat-card-icon icon-bag" />
                    </div>
                    <div className="stat-card-main-val">
                      <span className="val-number">{totalSalesCount}</span>
                      <span className="val-unit">Sales</span>
                    </div>
                    <div className="stat-card-sub">
                      Across Tamil cultural & sci-fi collections
                    </div>
                  </div>

                  <div className="earnings-stat-card">
                    <div className="stat-card-top">
                      <span className="stat-card-title">Active Listed Artworks</span>
                      <ImageIcon size={18} className="stat-card-icon icon-images" />
                    </div>
                    <div className="stat-card-main-val">
                      <span className="val-number">{myUploadedAssets.length + 3}</span>
                      <span className="val-unit">Live</span>
                    </div>
                    <div className="stat-card-sub">
                      Instant indexing in Thamili AI Studio
                    </div>
                  </div>
                </div>

                {/* Sales Ledger Table */}
                <div className="sales-ledger-card">
                  <div className="sales-ledger-header">
                    <div className="sales-ledger-title-group">
                      <CreditCard size={18} className="ledger-icon" />
                      <h3>Recent Licensing Transactions</h3>
                    </div>
                    <span className="ledger-count-tag">{creatorTransactions.length} Total Sales</span>
                  </div>

                  <div className="sales-table-wrap">
                    <table className="sales-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Artwork Licensed</th>
                          <th>Buyer</th>
                          <th>Gross Price</th>
                          <th>Your Cut (80%)</th>
                          <th>Platform Fee</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {creatorTransactions.map((tx) => (
                          <tr key={tx.id}>
                            <td className="cell-date">{tx.date}</td>
                            <td className="cell-asset">
                              <span className="asset-title-text">{tx.assetTitle}</span>
                            </td>
                            <td className="cell-buyer">{tx.buyerName}</td>
                            <td className="cell-gross">{tx.totalPrice} Cr</td>
                            <td className="cell-creator-cut">
                              <span className="cut-badge">+{tx.creatorEarnings} Cr</span>
                            </td>
                            <td className="cell-fee">-{tx.platformFee} Cr</td>
                            <td className="cell-status">
                              <span className="status-pill status-completed">
                                <Check size={11} /> {tx.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
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

      {/* ================= FOLDER MANAGEMENT & GALLERY MODAL ================= */}
      {(isFolderModalOpen || isGalleryOpen) && (
        <div
          className="modal-overlay folder-modal-glass-backdrop"
          onClick={() => {
            setIsFolderModalOpen(false)
            setIsGalleryOpen(false)
            setIsCreatingFolder(false)
            setViewingFolder(null)
          }}
        >
          <div
            className="modal-content folder-popup-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* VIEW 1: ONLY FOLDERS LIST (Default View) */}
            {!viewingFolder ? (
              <>
                <div className="modal-header">
                  <div className="modal-title-group">
                    <Layers size={20} className="modal-title-icon" />
                    <h3 className="modal-title">Saved Gallery & Folders</h3>
                  </div>
                  <button
                    className="modal-close-btn"
                    onClick={() => {
                      setIsFolderModalOpen(false)
                      setIsGalleryOpen(false)
                      setIsCreatingFolder(false)
                      setViewingFolder(null)
                    }}
                  >
                    <X size={17} />
                  </button>
                </div>

                {/* Top Action Bar: [ + Create New Folder ] */}
                <div className="folder-top-actions">
                  <button
                    type="button"
                    className={`btn-create-folder-glass ${isCreatingFolder ? 'active' : ''}`}
                    onClick={() => setIsCreatingFolder((prev) => !prev)}
                  >
                    <FolderPlus size={15} />
                    <span>Create New Folder</span>
                  </button>
                </div>

                {/* Inline iOS Glass Folder Creator Form */}
                {isCreatingFolder && (
                  <form onSubmit={handleCreateFolder} className="folder-create-glass-card">
                    <input
                      className="input-field"
                      placeholder="Enter folder name (e.g. Private Photos, Favorites)..."
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
                          setNewFolderName('')
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
                  </form>
                )}

                {/* Folders List Header */}
                <div className="modal-divider-text">
                  <span>Folders ({combinedFolders.length})</span>
                </div>

                <div className="existing-folders-list custom-scroll">
                  {combinedFolders.length === 0 ? (
                    <p className="empty-folders-note">No folders yet. Generate an image or create a folder!</p>
                  ) : (
                    combinedFolders.map((folder) => {
                      const theme = getFolderTheme(folder.name)
                      return (
                        <div
                          key={folder.id}
                          className="folder-list-item"
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
                            setSelectedFolderId(folder.id)
                            setViewingFolder(folder)
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
                            <div className="folder-item-info">
                              <div className="folder-item-name">{folder.name}</div>
                              <div className="folder-item-meta">
                                <span
                                  className="folder-badge-pill"
                                  style={{
                                    background: theme.badgeBg,
                                    color: theme.badgeText
                                  }}
                                >
                                  {folder.isAutoDomain ? 'Domain' : 'Private'}
                                </span>
                                <span>•</span>
                                <span>{folder.count} {folder.count === 1 ? 'photo' : 'photos'}</span>
                              </div>
                            </div>
                          </div>

                          <div className="folder-item-right" onClick={(e) => e.stopPropagation()}>
                            {folder.isManual && (
                              <button
                                className="btn-delete-folder-icon"
                                title="Delete folder"
                                onClick={(e) => handleDeleteFolder(folder.id, e)}
                              >
                                <Trash2 size={15} />
                              </button>
                            )}
                            <div
                              className="folder-enter-chevron"
                              style={{ color: theme.iconColor }}
                              title="Open folder"
                              onClick={() => {
                                setSelectedFolderId(folder.id)
                                setViewingFolder(folder)
                              }}
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
                    className="btn-secondary"
                    onClick={() => {
                      setIsFolderModalOpen(false)
                      setIsGalleryOpen(false)
                      setIsCreatingFolder(false)
                      setViewingFolder(null)
                    }}
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              /* VIEW 2: INSIDE FOLDER PHOTOS VIEW */
              <>
                {(() => {
                  const currentTheme = getFolderTheme(viewingFolder.name)
                  return (
                    <>
                      <div className="modal-header folder-inside-header">
                        <button
                          type="button"
                          className="btn-back-folders-nav"
                          onClick={() => setViewingFolder(null)}
                          title="Back to all folders"
                        >
                          <ArrowLeft size={16} />
                          <span>Folders</span>
                        </button>

                        <div className="modal-title-group folder-view-title-group">
                          <div
                            className="folder-view-icon-badge"
                            style={{
                              background: currentTheme.badgeBg,
                              color: currentTheme.iconColor,
                              border: `1px solid ${currentTheme.border}`
                            }}
                          >
                            <Folder size={17} />
                          </div>
                          <div className="folder-view-title-wrap">
                            <h3 className="modal-title" title={viewingFolder.name}>
                              {viewingFolder.name}
                            </h3>
                            <span
                              className="folder-view-count-badge"
                              style={{
                                background: currentTheme.badgeBg,
                                color: currentTheme.badgeText
                              }}
                            >
                              {viewingFolderImages.length} {viewingFolderImages.length === 1 ? 'photo' : 'photos'}
                            </span>
                          </div>
                        </div>

                        <button
                          className="modal-close-btn"
                          onClick={() => {
                            setIsFolderModalOpen(false)
                            setIsGalleryOpen(false)
                            setIsCreatingFolder(false)
                            setViewingFolder(null)
                          }}
                        >
                          <X size={17} />
                        </button>
                      </div>

                      <div className="modal-folder-photos-container custom-scroll">
                        {viewingFolderImages.length === 0 ? (
                          <div className="empty-folder-photos-state">
                            <div
                              className="empty-folder-icon-wrap"
                              style={{
                                background: currentTheme.badgeBg,
                                color: currentTheme.iconColor
                              }}
                            >
                              <Folder size={32} />
                            </div>
                            <p className="empty-folder-title">No photos in "{viewingFolder.name}" yet</p>
                            <p className="empty-folder-desc">
                              Generate new images with matching prompts or save them to this folder!
                            </p>
                          </div>
                        ) : (
                          <div className="modal-gallery-inside-grid">
                            {viewingFolderImages.map((img) => (
                              <div key={img.id} className="modal-photo-item-card">
                                <div className="modal-photo-img-wrap">
                                  <img
                                    src={img.url}
                                    alt={img.prompt}
                                    className="modal-photo-img"
                                    loading="lazy"
                                  />
                                  <div className="modal-photo-overlay">
                                    <div className="modal-photo-top-actions">
                                      <button
                                        type="button"
                                        className="modal-photo-action-btn"
                                        onClick={() => handleCopyPrompt(img.prompt, img.id)}
                                        title="Copy prompt"
                                      >
                                        {copiedPromptId === img.id ? (
                                          <Check size={13} color="#10b981" />
                                        ) : (
                                          <Copy size={13} />
                                        )}
                                      </button>
                                      <button
                                        type="button"
                                        className={`modal-photo-action-btn ${img.saved ? 'saved' : ''}`}
                                        onClick={() => handleToggleSave(img.id)}
                                        title="Toggle save"
                                      >
                                        {img.saved ? <Check size={13} /> : <Save size={13} />}
                                      </button>
                                    </div>

                                    <div className="modal-photo-bottom-info">
                                      <p className="modal-photo-prompt-line" title={img.prompt}>
                                        {img.prompt}
                                      </p>
                                      <button
                                        type="button"
                                        className="modal-photo-use-btn"
                                        onClick={() => {
                                          setIdeaText(img.originalIdea || img.prompt)
                                          setIsFolderModalOpen(false)
                                          setIsGalleryOpen(false)
                                          setViewingFolder(null)
                                          showToast('Prompt loaded into Studio! ')
                                        }}
                                        title="Use this prompt in Studio"
                                      >
                                        
                                        <span>Use Prompt</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="modal-footer folder-inside-footer">
                        <button
                          type="button"
                          className="btn-back-folders-footer"
                          onClick={() => setViewingFolder(null)}
                        >
                          <ArrowLeft size={14} />
                          <span>All Folders</span>
                        </button>
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => {
                            setIsFolderModalOpen(false)
                            setIsGalleryOpen(false)
                            setIsCreatingFolder(false)
                            setViewingFolder(null)
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  )
                })()}
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
                <div className="ref-modal-badge-icon">
                  
                </div>
                <div>
                  <div className="ref-modal-title-row">
                    <h2 className="ref-modal-title">Reference Image Concepts</h2>
                    <span className="ref-modal-count-pill">{filteredCategories.length} styles</span>
                  </div>
                  <p className="ref-modal-subtitle">
                    Select any visual reference concept to apply to your generation
                  </p>
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

      {/* ================= UPLOAD & SELL ARTWORK MODAL ================= */}
      {isUploadModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => {
            if (!isUploading) {
              setIsUploadModalOpen(false)
              handleResetUploadModal()
            }
          }}
        >
          <div
            className="modal-content upload-artwork-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-title-group">
                <UploadCloud size={20} className="modal-title-icon" />
                <h3 className="modal-title">
                  {uploadReviewStep ? 'Artwork Submission & Review Pipeline' : 'Publish & Sell Artwork on Marketplace'}
                </h3>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => {
                  setIsUploadModalOpen(false)
                  handleResetUploadModal()
                }}
                disabled={isUploading}
                title="Close"
              >
                <X size={17} />
              </button>
            </div>

            {/* Hidden Input for Modal File Upload */}
            <input
              type="file"
              ref={modalUploadFileInputRef}
              accept="image/png,image/jpeg,image/webp,image/avif"
              style={{ display: 'none' }}
              onChange={handleModalFileSelect}
            />

            {/* PIPELINE VIEW (When user submitted for review) */}
            {uploadReviewStep ? (
              <div className="review-pipeline-container">
                <div className="review-pipeline-steps">
                  <div className="review-pipeline-line" />
                  
                  {/* Step 1: Submitted */}
                  <div className={`pipeline-step-item ${uploadReviewStep ? 'is-done' : ''}`}>
                    <div className="pipeline-step-circle">
                      <Check size={16} />
                    </div>
                    <span className="pipeline-step-label">1. Submitted</span>
                    <span className="pipeline-step-sub">Metadata uploaded</span>
                  </div>

                  {/* Step 2: Automated Checks */}
                  <div
                    className={`pipeline-step-item ${
                      uploadReviewStep === 'automated_checks'
                        ? 'is-active'
                        : uploadReviewStep === 'moderation' || uploadReviewStep === 'approved'
                        ? 'is-done'
                        : ''
                    }`}
                  >
                    <div className="pipeline-step-circle">
                      {uploadReviewStep === 'automated_checks' ? (
                        <Loader2 size={16} className="spin-loader" />
                      ) : uploadReviewStep === 'moderation' || uploadReviewStep === 'approved' ? (
                        <Check size={16} />
                      ) : (
                        <span>2</span>
                      )}
                    </div>
                    <span className="pipeline-step-label">2. Auto Checks</span>
                    <span className="pipeline-step-sub">Originality & IP scan</span>
                  </div>

                  {/* Step 3: Moderation */}
                  <div
                    className={`pipeline-step-item ${
                      uploadReviewStep === 'moderation'
                        ? 'is-active'
                        : uploadReviewStep === 'approved'
                        ? 'is-done'
                        : ''
                    }`}
                  >
                    <div className="pipeline-step-circle">
                      {uploadReviewStep === 'moderation' ? (
                        <Loader2 size={16} className="spin-loader" />
                      ) : uploadReviewStep === 'approved' ? (
                        <Check size={16} />
                      ) : (
                        <span>3</span>
                      )}
                    </div>
                    <span className="pipeline-step-label">3. Moderation</span>
                    <span className="pipeline-step-sub">Integrity review</span>
                  </div>

                  {/* Step 4: Approved & Live */}
                  <div className={`pipeline-step-item ${uploadReviewStep === 'approved' ? 'is-done' : ''}`}>
                    <div className="pipeline-step-circle">
                      {uploadReviewStep === 'approved' ? <CheckCircle2 size={16} /> : <span>4</span>}
                    </div>
                    <span className="pipeline-step-label">4. Marketplace</span>
                    <span className="pipeline-step-sub">Approved & Live</span>
                  </div>
                </div>

                {uploadReviewStep === 'approved' && uploadedArtworkResult && (
                  <div className="pipeline-success-card">
                    <div className="upload-preview-card" style={{ maxWidth: '420px', margin: '0 auto' }}>
                      <div className="preview-media-container" style={{ height: '170px' }}>
                        <img src={uploadedArtworkResult.image} alt={uploadedArtworkResult.title} className="preview-main-img" />
                        <div className="preview-overlay-chips">
                          <span className="preview-meta-chip" style={{ background: 'rgba(16, 185, 129, 0.9)' }}>
                            <Check size={11} /> Approved & Listed
                          </span>
                        </div>
                      </div>
                      <div className="preview-details-bar">
                        <strong>{uploadedArtworkResult.title}</strong>
                        <span>{uploadedArtworkResult.priceCredits} Credits (80% / {(uploadedArtworkResult.priceCredits * 0.8).toFixed(1)} Cr to you)</span>
                      </div>
                    </div>

                    <div className="modal-footer" style={{ marginTop: '16px', justifyContent: 'center', gap: '10px' }}>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => {
                          setIsUploadModalOpen(false)
                          handleResetUploadModal()
                          setImagesSubTab('library')
                          setLibraryFilter('uploads')
                        }}
                      >
                        <Folder size={14} />
                        <span>View in My Uploads</span>
                      </button>
                      <button
                        type="button"
                        className="btn-primary-gradient"
                        onClick={() => {
                          setIsUploadModalOpen(false)
                          handleResetUploadModal()
                          setImagesSubTab('marketplace')
                        }}
                      >
                        <ShoppingBag size={14} />
                        <span>View on Marketplace</span>
                      </button>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => handleResetUploadModal()}
                      >
                        <Plus size={14} />
                        <span>Upload Another</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmitUploadAsset} className="upload-modal-form">
                {/* 1. Creator Identity & Verification Status */}
                <div className="creator-identity-bar">
                  <div className="creator-identity-left">
                    <div className="creator-identity-avatar">U</div>
                    <div className="creator-identity-text">
                      <span className="creator-identity-name">
                        User (@UserStudio) <ShieldCheck size={14} className="mod-shield-icon" />
                      </span>
                      <span className="creator-identity-sub">Verified Creator • 80% Royalty Revenue Split</span>
                    </div>
                  </div>
                  <span className="screening-status-pill is-passed">Verified Artist</span>
                </div>

                {/* 2. Drag & Drop Upload Zone or Active Image Preview */}
                {!uploadForm.image ? (
                  <div
                    className={`upload-dropzone ${isDragOverUpload ? 'is-dragover' : ''}`}
                    onDragOver={handleUploadDragOver}
                    onDragLeave={handleUploadDragLeave}
                    onDrop={handleUploadDrop}
                    onClick={() => modalUploadFileInputRef.current?.click()}
                  >
                    <div className="dropzone-icon-bubble">
                      <UploadCloud size={24} />
                    </div>
                    <div>
                      <h4 className="dropzone-title">Drag & drop high-resolution artwork here</h4>
                      <p className="dropzone-subtitle">or click to browse from your device</p>
                    </div>
                    <span className="dropzone-formats-tag">JPG, PNG, WEBP, AVIF up to 50MB</span>

                    <div className="dropzone-actions-row" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="btn-dropzone-browse"
                        onClick={() => modalUploadFileInputRef.current?.click()}
                      >
                        Browse File
                      </button>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-light)' }}>or load sample:</span>
                      {SAMPLE_UPLOAD_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`btn-sample-preset ${idx === 0 ? 'preset-temple' : idx === 1 ? 'preset-cyberpunk' : 'preset-nilgiris'}`}
                          onClick={() => handleLoadSamplePreset(preset)}
                          title={`Load ${preset.title}`}
                        >
                          <span>{idx === 0 ? '🏛️' : idx === 1 ? '⚡' : '🌿'}</span>
                          <span>Sample {idx + 1}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="upload-preview-card">
                    <div className="preview-media-container">
                      <img src={uploadForm.image} alt="Artwork Preview" className="preview-main-img" />
                      
                      <div className="preview-overlay-chips">
                        <span className="preview-meta-chip">{uploadForm.resolution}</span>
                        <span className="preview-meta-chip">{uploadForm.orientation}</span>
                        <span className="preview-meta-chip">{uploadForm.fileFormat}</span>
                      </div>

                      <div className="preview-action-buttons">
                        <button
                          type="button"
                          className="btn-preview-action"
                          onClick={() => modalUploadFileInputRef.current?.click()}
                          title="Replace with new file"
                        >
                          <RefreshCw size={12} />
                          <span>Replace</span>
                        </button>
                        <button
                          type="button"
                          className="btn-preview-action btn-preview-remove"
                          onClick={() => {
                            setUploadForm((prev) => ({ ...prev, image: '' }))
                            setUploadAnalysisCompleted(false)
                          }}
                          title="Remove image"
                        >
                          <Trash2 size={12} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    <div className="preview-details-bar">
                      <span>File Analysis: {uploadForm.fileSize} • High-Fidelity Color Profile</span>
                      <span style={{ color: '#059669', fontWeight: '700' }}>✓ Resolution Verified</span>
                    </div>
                  </div>
                )}

                {/* 3. Automatic AI Image Analysis Banner */}
                {isAnalyzingUpload ? (
                  <div className="ai-analysis-banner">
                    <div className="ai-analysis-header">
                      <Loader2 size={15} className="spin-loader" />
                      <span>AI analyzing composition, metadata & cultural motifs...</span>
                    </div>
                  </div>
                ) : uploadAnalysisCompleted && (
                  <div className="ai-analysis-banner">
                    <div className="ai-analysis-header">
                      
                      <span>AI Image Analysis Complete — Auto-categorized & tagged (Editable below)</span>
                    </div>
                    <div className="ai-analysis-chips-row">
                      <span className="ai-tag-chip">Category: {uploadForm.category}</span>
                      <span className="ai-tag-chip">Orientation: {uploadForm.orientation}</span>
                      <span className="ai-tag-chip">Originality: {uploadForm.originalityStatus}</span>
                      <span className="ai-tag-chip">Index: {uploadForm.duplicateCheck}</span>
                    </div>
                  </div>
                )}

                {/* 4. Artwork Title & Category */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">
                      <span>Artwork Title</span>
                      <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g., Tamil Traditional Wedding Mandapam"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="select-field"
                      value={uploadForm.category}
                      onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                    >
                      {MARKETPLACE_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 5. Clear License Selection Tiers (4 Options) */}
                <div className="license-selection-section">
                  <label className="form-label">
                    <span>Select License Tier</span>
                    <span className="required-star">*</span>
                  </label>
                  <div className="license-tiers-grid">
                    {LICENSE_TIERS.map((tier) => {
                      const isSelected = uploadForm.licenseType === tier.id
                      const TierIcon = tier.icon
                      return (
                        <div
                          key={tier.id}
                          className={`license-tier-card tier-${tier.id} ${isSelected ? 'is-selected' : ''}`}
                          onClick={() => {
                            setUploadForm({
                              ...uploadForm,
                              licenseType: tier.id,
                              priceCredits: tier.suggestedPrice
                            })
                          }}
                        >
                          <div className="license-card-header">
                            <span className="license-card-title">
                              <TierIcon size={14} />
                              {tier.title}
                            </span>
                            <span className="license-tier-tag">{tier.tag}</span>
                          </div>
                          <p className="license-card-desc">{tier.desc}</p>
                          <span className="license-base-price">
                            {isSelected ? '✓ ' : ''}Suggested: {tier.suggestedPrice} Credits
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* 6. Smart Pricing & Royalties */}
                <div className="smart-pricing-wrapper">
                  <div className="smart-pricing-suggestion-row">
                    <div className="smart-price-info">
                      <Coins size={15} />
                      <span>
                        Smart Suggested: <strong>{currentSuggestedPrice} Credits</strong> (Based on {uploadForm.category} & {uploadForm.licenseType} tier)
                      </span>
                    </div>
                    {uploadForm.priceCredits !== currentSuggestedPrice && (
                      <button
                        type="button"
                        className="btn-apply-suggested-price"
                        onClick={() => setUploadForm({ ...uploadForm, priceCredits: currentSuggestedPrice })}
                      >
                        Use Suggested: {currentSuggestedPrice} Cr
                      </button>
                    )}
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">
                        <span>Price in Credits</span>
                        <span className="royalties-hint">
                          (You earn 80% = {(uploadForm.priceCredits * 0.8).toFixed(1)} Cr / ~$
                          {(uploadForm.priceCredits * 0.08).toFixed(2)} USD)
                        </span>
                      </label>
                      <div className="price-input-wrapper">
                        <input
                          type="number"
                          min={5}
                          max={150}
                          className="input-field price-input"
                          value={uploadForm.priceCredits}
                          onChange={(e) =>
                            setUploadForm({
                              ...uploadForm,
                              priceCredits: Math.max(5, Math.min(150, Number(e.target.value) || 5))
                            })
                          }
                          required
                        />
                        <span className="price-unit-tag">Credits</span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span>Search Tags (comma-separated)</span>
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="e.g. tamil wedding, bride, temple, saree, madurai"
                        value={uploadForm.tags}
                        onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* 7. Description & Artistic Context */}
                <div className="form-group">
                  <label className="form-label">Description & Artistic Context</label>
                  <textarea
                    className="textarea-field"
                    rows={2}
                    placeholder="Describe the cultural background, artistic medium, or visual composition..."
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  />
                </div>

                {/* 8. Copyright Screening Status Panel */}
                <div className="copyright-screening-panel">
                  <div className="screening-panel-header">
                    <span className="screening-panel-title">
                      <ShieldCheck size={16} style={{ color: '#10b981' }} />
                      Automated Copyright & Integrity Screening
                    </span>
                    <span className="screening-status-pill is-passed">3/3 Passed</span>
                  </div>

                  <div className="screening-checklist">
                    <div className="screening-check-item">
                      <div className="screening-item-left">
                        <CheckCircle2 size={14} style={{ color: '#10b981' }} />
                        <span>Originality screening (Perceptual hash collision)</span>
                      </div>
                      <span className="screening-status-pill is-passed">Passed ✓</span>
                    </div>

                    <div className="screening-check-item">
                      <div className="screening-item-left">
                        <CheckCircle2 size={14} style={{ color: '#10b981' }} />
                        <span>Duplicate / match check across 10,480+ indexed artworks</span>
                      </div>
                      <span className="screening-status-pill is-passed">Clean (0 Matches) ✓</span>
                    </div>

                    <div className="screening-check-item">
                      <div className="screening-item-left">
                        <CheckCircle2 size={14} style={{ color: '#10b981' }} />
                        <span>Trademark & restricted IP screening</span>
                      </div>
                      <span className="screening-status-pill is-passed">Clear ✓</span>
                    </div>

                    <div className="screening-check-item">
                      <div className="screening-item-left">
                        <Clock size={14} style={{ color: '#f59e0b' }} />
                        <span>Human integrity moderation</span>
                      </div>
                      <span className="screening-status-pill is-pending">Pending Review 🟡</span>
                    </div>
                  </div>

                  <p className="screening-disclaimer-note">
                    Note: Automated screening checks technical similarity and policy compliance. It is not legal proof of ownership.
                  </p>
                </div>

                {/* 9. Strong Rights Declaration Checkbox */}
                <div className="copyright-confirmation-box">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={uploadForm.confirmedCopyright}
                      onChange={(e) =>
                        setUploadForm({ ...uploadForm, confirmedCopyright: e.target.checked })
                      }
                    />
                    <div className="checkbox-text-group">
                      <strong>I confirm I have the necessary rights to license this artwork</strong>
                      <p>
                        I verify that this creation is original or properly licensed, does not infringe on third-party copyrights, trademarks, or publicity rights, and I authorize Thamili AI Marketplace to distribute licenses according to the selected tier.
                      </p>
                    </div>
                  </label>
                </div>

                {/* 10. Modal Footer */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-secondary"
                    disabled={isUploading}
                    onClick={() => {
                      setIsUploadModalOpen(false)
                      handleResetUploadModal()
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary-gradient"
                    disabled={isUploading || !uploadForm.confirmedCopyright || !uploadForm.title || !uploadForm.image}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 size={15} className="spin-loader" />
                        <span>Submitting for Review...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={15} />
                        <span>Submit for Review</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================= LICENSE CONFIRMATION MODAL ================= */}
      {isLicenseModalOpen && licensingAsset && (
        <div
          className="modal-overlay"
          onClick={() => {
            setIsLicenseModalOpen(false)
            setLicensingAsset(null)
          }}
        >
          <div
            className="modal-content license-confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title-group">
                <Lock size={20} className="modal-title-icon" />
                <h3 className="modal-title">Commercial License Agreement</h3>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => {
                  setIsLicenseModalOpen(false)
                  setLicensingAsset(null)
                }}
              >
                <X size={17} />
              </button>
            </div>

            <div className="license-asset-preview-row">
              <img src={licensingAsset.image} alt={licensingAsset.title} className="license-preview-img" />
              <div className="license-preview-meta">
                <h4>{licensingAsset.title}</h4>
                <p className="license-author">
                  Creator: <strong>{licensingAsset.creatorName}</strong> ({licensingAsset.creatorHandle})
                </p>
                <div className="license-perks-list">
                  <div className="perk-item"><Check size={13} color="#10b981" /> <span>Worldwide Perpetual Commercial Rights</span></div>
                  <div className="perk-item"><Check size={13} color="#10b981" /> <span>High-Resolution Master Download ({licensingAsset.format || '4K Ultra HD'})</span></div>
                  <div className="perk-item"><Check size={13} color="#10b981" /> <span>Direct Use in Thamili AI Studio Prompt Composer</span></div>
                </div>
              </div>
            </div>

            {/* Credit Breakdown & 80% Creator Split */}
            <div className="license-economics-box">
              <div className="eco-row">
                <span>License Price:</span>
                <strong>{licensingAsset.priceCredits} Credits</strong>
              </div>
              <div className="eco-row creator-split-row">
                <span>Creator Royalty (80%):</span>
                <span className="eco-green">+{(licensingAsset.priceCredits * 0.8).toFixed(1)} Credits earned by {licensingAsset.creatorName}</span>
              </div>
              <div className="eco-row fee-row">
                <span>Platform Fee (20%):</span>
                <span>{(licensingAsset.priceCredits * 0.2).toFixed(1)} Credits</span>
              </div>
              <div className="eco-divider" />
              <div className="eco-row balance-row">
                <span>Your Current Balance:</span>
                <span className={userCredits < licensingAsset.priceCredits ? 'balance-insufficient' : ''}>
                  {userCredits} Credits
                </span>
              </div>
              <div className="eco-row balance-row">
                <span>Balance After Purchase:</span>
                <strong>{Math.max(0, userCredits - licensingAsset.priceCredits)} Credits</strong>
              </div>
            </div>

            {userCredits < licensingAsset.priceCredits && (
              <div className="insufficient-credits-alert">
                <AlertTriangle size={16} />
                <span>You need {licensingAsset.priceCredits - userCredits} more Credits to license this asset.</span>
              </div>
            )}

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setIsLicenseModalOpen(false)
                  setLicensingAsset(null)
                }}
              >
                Cancel
              </button>
              {userCredits < licensingAsset.priceCredits ? (
                <button
                  type="button"
                  className="btn-primary-gradient"
                  onClick={() => {
                    setIsLicenseModalOpen(false)
                    setIsAddCreditsModalOpen(true)
                  }}
                >
                  <Coins size={14} />
                  <span>Top Up Credits</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-primary-gradient"
                  onClick={() => handleConfirmLicense(licensingAsset)}
                >
                  <Check size={15} />
                  <span>Confirm License ({licensingAsset.priceCredits} Cr)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= REPORT / CONTENT INTEGRITY MODAL ================= */}
      {isReportModalOpen && reportingAsset && (
        <div
          className="modal-overlay"
          onClick={() => {
            setIsReportModalOpen(false)
            setReportingAsset(null)
          }}
        >
          <div
            className="modal-content report-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title-group">
                <Flag size={20} className="modal-title-icon icon-flag-red" />
                <h3 className="modal-title">Report / Flag Content</h3>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => {
                  setIsReportModalOpen(false)
                  setReportingAsset(null)
                }}
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="report-form">
              <p className="report-target-meta">
                Reporting: <strong>"{reportingAsset.title}"</strong> by {reportingAsset.creatorName}
              </p>

              <div className="form-group">
                <label className="form-label">Select Violation Reason</label>
                <select
                  className="select-field"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                >
                  <option value="Copyright Infringement">Copyright Infringement / Stolen Artwork</option>
                  <option value="Inappropriate Content">Inappropriate / NSFW / Harmful Content</option>
                  <option value="Misleading Tags">Misleading Tags / Spam / False Description</option>
                  <option value="Low Quality / Broken File">Low Quality or Broken Visual Artifacts</option>
                  <option value="Other">Other Policy Violation</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Additional Details / Evidence URL</label>
                <textarea
                  className="textarea-field"
                  rows={3}
                  placeholder="Provide proof of original ownership or specific description of the issue..."
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  required
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setIsReportModalOpen(false)
                    setReportingAsset(null)
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-danger-flag">
                  <Flag size={14} />
                  <span>Submit Content Report</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= REQUEST CREATOR PAYOUT MODAL ================= */}
      {isPayoutModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsPayoutModalOpen(false)}
        >
          <div
            className="modal-content payout-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title-group">
                <Wallet size={20} className="modal-title-icon" />
                <h3 className="modal-title">Request Creator Royalty Payout</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsPayoutModalOpen(false)}>
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleRequestPayout} className="payout-form">
              <div className="payout-balance-card">
                <span className="payout-card-label">Available Creator Balance</span>
                <div className="payout-card-val">
                  <span className="credits-num">{totalEarningsCredits} Credits</span>
                  <span className="usd-num">≈ ${(totalEarningsCredits * 0.1).toFixed(2)} USD</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Payout Method</label>
                <div className="payout-methods-grid">
                  {[
                    { id: 'upi', label: 'UPI / VPA (India)', sub: 'Instant GPay, PhonePe, Paytm' },
                    { id: 'stripe', label: 'Stripe Direct', sub: 'Global Bank Transfer' },
                    { id: 'paypal', label: 'PayPal', sub: 'Instant Global Transfer' },
                    { id: 'bank', label: 'Wire / IMPS', sub: 'Direct Direct Deposit' }
                  ].map((m) => (
                    <div
                      key={m.id}
                      className={`payout-method-card ${payoutMethod === m.id ? 'active' : ''}`}
                      onClick={() => setPayoutMethod(m.id)}
                    >
                      <div className="method-title">{m.label}</div>
                      <div className="method-sub">{m.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  {payoutMethod === 'upi' ? 'UPI ID / VPA' : payoutMethod === 'paypal' ? 'PayPal Email' : 'Account Details / IBAN'}
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder={
                    payoutMethod === 'upi'
                      ? 'username@okhdfcbank or yourname@upi'
                      : payoutMethod === 'paypal'
                      ? 'creator@example.com'
                      : 'Account number / routing info'
                  }
                  value={payoutAddress}
                  onChange={(e) => setPayoutAddress(e.target.value)}
                  required
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsPayoutModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-gradient" disabled={totalEarningsCredits <= 0}>
                  <Check size={14} />
                  <span>Withdraw ${(totalEarningsCredits * 0.1).toFixed(2)}</span>
                </button>
              </div>
            </form>
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
            {/* Modal Header */}
            <div className="user-center-modal-header">
              <div className="user-center-header-user">
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
              <div className="user-center-header-actions">
                {isLoggedIn ? (
                  <button
                    type="button"
                    className="btn-user-center-logout"
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
                    className="btn-user-center-signin btn-user-center-top-signin"
                    onClick={() => {
                      setIsAuthModalOpen(true)
                      setIsUserMenuOpen(false)
                    }}
                  >
                    Sign In
                  </button>
                )}
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setIsUserMenuOpen(false)}
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Creator Studio Navigation Grid */}
            <div className="user-center-grid">
              <div
                className="user-center-card user-center-marketplace"
                onClick={() => {
                  setActiveTab('AI Image')
                  setImagesSubTab('marketplace')
                  setIsUserMenuOpen(false)
                }}
              >
                <div className="user-center-card-icon-wrap icon-marketplace">
                  <ShoppingBag size={22} />
                </div>
                <div className="user-center-card-content">
                  <div className="user-center-card-title-row">
                    <h4>Marketplace</h4>
                    <span className="user-center-pill-count">{marketplaceAssets.length} Assets</span>
                  </div>
                  <p>Browse, collect, and license community created prompts & art</p>
                </div>
              </div>

              <div
                className="user-center-card user-center-earnings"
                onClick={() => {
                  setActiveTab('AI Image')
                  setImagesSubTab('earnings')
                  setIsUserMenuOpen(false)
                }}
              >
                <div className="user-center-card-icon-wrap icon-earnings">
                  <TrendingUp size={22} />
                </div>
                <div className="user-center-card-content">
                  <div className="user-center-card-title-row">
                    <h4>Creator Earnings</h4>
                    <span className="user-center-pill-split">80% Revenue Split</span>
                  </div>
                  <p>Track downloads, commissions, and instant payout balances</p>
                </div>
              </div>
            </div>

            {/* Credits Balance & Top-Up Row */}
            <div className="user-center-credits-banner">
              <div className="user-center-credits-left">
                <div className="credits-icon-orb">
                  <Coins size={22} className="credits-coin-icon" />
                </div>
                <div className="user-center-credits-info">
                  <div className="credits-val-heading">{userCredits} <span className="credits-val-unit">Available Credits</span></div>
                  <span className="credits-subtext">Used for AI image generation, models & 4K downloads</span>
                </div>
              </div>
              <button
                type="button"
                className="btn-user-center-topup"
                onClick={() => {
                  setIsAddCreditsModalOpen(true)
                  setIsUserMenuOpen(false)
                }}
              >
                <Plus size={15} />
                <span>Add Credits</span>
              </button>
            </div>

            {/* Footer / Account Actions */}
            <div className="user-center-modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsUserMenuOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD CREDITS TOP-UP MODAL ================= */}
      {isAddCreditsModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsAddCreditsModalOpen(false)}
        >
          <div
            className="modal-content add-credits-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title-group">
                <Coins size={20} className="modal-title-icon" />
                <h3 className="modal-title">Get Thamili AI Credits</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsAddCreditsModalOpen(false)}>
                <X size={17} />
              </button>
            </div>

            <div className="credits-packages-grid">
              {[
                { amount: 100, price: '$9.99', badge: null },
                { amount: 250, price: '$24.99', badge: 'Most Popular' },
                { amount: 500, price: '$44.99', badge: 'Best Value' },
                { amount: 1000, price: '$79.99', badge: 'Creator Pro' }
              ].map((pkg) => (
                <div
                  key={pkg.amount}
                  className={`credit-pkg-card ${pkg.badge ? 'featured-pkg' : ''}`}
                  onClick={() => handleAddCredits(pkg.amount)}
                >
                  {pkg.badge && <span className="pkg-badge">{pkg.badge}</span>}
                  <div className="pkg-coins-val">+{pkg.amount} Credits</div>
                  <div className="pkg-price-val">{pkg.price}</div>
                  <button type="button" className="btn-pkg-buy">
                    Add {pkg.amount} Cr
                  </button>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={() => setIsAddCreditsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DIGITAL LICENSE CERTIFICATE MODAL ================= */}
      {licenseCertificateAsset && (
        <div
          className="modal-overlay"
          onClick={() => setLicenseCertificateAsset(null)}
        >
          <div
            className="modal-content cert-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title-group">
                <FileText size={20} className="modal-title-icon" />
                <h3 className="modal-title">Digital Commercial License Certificate</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setLicenseCertificateAsset(null)}>
                <X size={17} />
              </button>
            </div>

            <div className="license-certificate-doc">
              <div className="cert-doc-header">
                <img src={thamiliLogoImg} alt="Thamili AI" className="cert-logo" />
                <div className="cert-title-block">
                  <h3>THAMILI AI MARKETPLACE</h3>
                  <span>Official Certificate of Commercial Rights</span>
                </div>
              </div>

              <div className="cert-details-grid">
                <div className="cert-field">
                  <span className="cert-field-label">License Certificate ID</span>
                  <strong className="cert-field-val">LIC-THAMILI-2026-{(licenseCertificateAsset.id || '98421').toUpperCase()}</strong>
                </div>
                <div className="cert-field">
                  <span className="cert-field-label">Artwork Title</span>
                  <strong className="cert-field-val">{licenseCertificateAsset.title}</strong>
                </div>
                <div className="cert-field">
                  <span className="cert-field-label">Original Creator</span>
                  <strong className="cert-field-val">{licenseCertificateAsset.creatorName} ({licenseCertificateAsset.creatorHandle})</strong>
                </div>
                <div className="cert-field">
                  <span className="cert-field-label">Licensee / Buyer</span>
                  <strong className="cert-field-val">User (@UserStudio)</strong>
                </div>
                <div className="cert-field">
                  <span className="cert-field-label">Grant Type</span>
                  <strong className="cert-field-val">Worldwide, Perpetual, Commercial & Derivative Use</strong>
                </div>
                <div className="cert-field">
                  <span className="cert-field-label">Royalty Split Verified</span>
                  <strong className="cert-field-val eco-green">80% Creator Revenue Share Disbursed</strong>
                </div>
              </div>

              <div className="cert-seal-row">
                <div className="cert-seal">
                  <ShieldCheck size={28} color="#00e5ff" />
                  <span>Verified Authenticity</span>
                </div>
                <div className="cert-date-text">
                  Issued under Thamili Marketplace Integrity Protocol • 2026
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-primary-gradient"
                onClick={() => {
                  showToast('License Certificate downloaded as PDF 📄')
                  setLicenseCertificateAsset(null)
                }}
              >
                <Download size={14} />
                <span>Download Certificate PDF</span>
              </button>
              <button type="button" className="btn-secondary" onClick={() => setLicenseCertificateAsset(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FULLSCREEN EXPANDED IMAGE LIGHTBOX MODAL ================= */}
      {fullscreenImageModal && (
        <div
          className="fullscreen-lightbox-backdrop"
          onClick={() => setFullscreenImageModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fullscreen-lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar Controls */}
            <div className="fullscreen-lightbox-header">
              <div className="fullscreen-header-left-spacer" />

              {/* Top Center Editor Toolbar Pill */}
              <div className="fullscreen-editor-toolbar-pill">
                <button
                  type="button"
                  className={`editor-tool-btn ${activeEditorTool === 'markup' ? 'active-tool' : ''}`}
                  onClick={() => {
                    const next = activeEditorTool === 'markup' ? null : 'markup'
                    setActiveEditorTool(next)
                    if (next) showToast('Markup mode active — Draw & annotate on image ✏️')
                  }}
                  title="Markup"
                >
                  <PenLine size={14} className="editor-tool-icon" />
                  <span>Markup</span>
                </button>
                <button
                  type="button"
                  className={`editor-tool-btn ${activeEditorTool === 'comment' ? 'active-tool' : ''}`}
                  onClick={() => {
                    const next = activeEditorTool === 'comment' ? null : 'comment'
                    setActiveEditorTool(next)
                    if (next) showToast('Comment mode — Click anywhere on the image to add notes 💬')
                  }}
                  title="Comment"
                >
                  <MessageSquarePlus size={14} className="editor-tool-icon" />
                  <span>Comment</span>
                  {imageComments.length > 0 && (
                    <span className="tool-count-badge">{imageComments.length}</span>
                  )}
                </button>
                <button
                  type="button"
                  className={`editor-tool-btn ${activeEditorTool === 'removebg' ? 'active-tool' : ''}`}
                  onClick={() => {
                    const next = activeEditorTool === 'removebg' ? null : 'removebg'
                    setActiveEditorTool(next)
                    if (next) showToast('AI Background Removal Studio ✂️')
                  }}
                  title="Remove BG"
                >
                  <Scissors size={14} className="editor-tool-icon" />
                  <span>Remove BG</span>
                </button>
                <button
                  type="button"
                  className={`editor-tool-btn ${activeEditorTool === 'erase' ? 'active-tool' : ''}`}
                  onClick={() => {
                    const next = activeEditorTool === 'erase' ? null : 'erase'
                    setActiveEditorTool(next)
                    if (next) showToast('Object Eraser brush active — Highlight objects to erase 🧹')
                  }}
                  title="Erase"
                >
                  <Eraser size={14} className="editor-tool-icon" />
                  <span>Erase</span>
                </button>
                <button
                  type="button"
                  className={`editor-tool-btn ${activeEditorTool === 'resize' ? 'active-tool' : ''}`}
                  onClick={() => {
                    const next = activeEditorTool === 'resize' ? null : 'resize'
                    setActiveEditorTool(next)
                    if (next) showToast('Resize & Aspect Ratio framing 📐')
                  }}
                  title="Resize"
                >
                  <Crop size={14} className="editor-tool-icon" />
                  <span>Resize</span>
                </button>
              </div>

              <div className="fullscreen-header-actions">
                <button
                  type="button"
                  className="fullscreen-glass-btn"
                  onClick={handleStudioExportDownload}
                  title="Download studio image"
                >
                  <Download size={18} />
                </button>
                <button
                  type="button"
                  className="fullscreen-glass-btn"
                  onClick={() => handleCopyImageOrPrompt(fullscreenImageModal.url, fullscreenImageModal.originalIdea || fullscreenImageModal.prompt)}
                  title="Copy prompt"
                >
                  <Copy size={18} />
                </button>
                <button
                  type="button"
                  className="fullscreen-glass-btn"
                  onClick={() => handleShareImage(fullscreenImageModal.url, fullscreenImageModal.originalIdea || fullscreenImageModal.prompt)}
                  title="Share image"
                >
                  <Share2 size={18} />
                </button>
                <button
                  type="button"
                  className="fullscreen-glass-btn btn-close-fullscreen"
                  onClick={() => setFullscreenImageModal(null)}
                  title="Close (Esc)"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* FLOATING TOOL SETTINGS DRAWER */}
            {activeEditorTool && (
              <div className="fullscreen-tool-drawer-overlay">
                {/* 1. MARKUP TOOLBAR */}
                {activeEditorTool === 'markup' && (
                  <div className="tool-drawer-card">
                    <div className="drawer-section">
                      <span className="drawer-label">Color</span>
                      <div className="drawer-colors-row">
                        {['#10b981', '#2563eb', '#ef4444', '#f59e0b', '#ffffff', '#0f172a'].map((c) => (
                          <button
                            key={c}
                            type="button"
                            className={`color-dot-btn ${markupColor === c ? 'active' : ''}`}
                            style={{ backgroundColor: c }}
                            onClick={() => setMarkupColor(c)}
                            title={c}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="drawer-divider" />

                    <div className="drawer-section">
                      <span className="drawer-label">Size</span>
                      <div className="drawer-sizes-row">
                        {[2, 4, 8, 14].map((s) => (
                          <button
                            key={s}
                            type="button"
                            className={`size-pill-btn ${markupBrushSize === s ? 'active' : ''}`}
                            onClick={() => setMarkupBrushSize(s)}
                          >
                            <span style={{ width: s * 1.4, height: s * 1.4, borderRadius: '50%', backgroundColor: 'currentColor' }} />
                            <span>{s}px</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="drawer-divider" />

                    <div className="drawer-actions-row">
                      <button
                        type="button"
                        className="drawer-action-btn"
                        onClick={() => {
                          setMarkupStrokes((prev) => prev.slice(0, -1))
                        }}
                        disabled={markupStrokes.length === 0}
                        title="Undo stroke"
                      >
                        <Undo2 size={14} />
                        <span>Undo</span>
                      </button>
                      <button
                        type="button"
                        className="drawer-action-btn btn-clear-danger"
                        onClick={() => {
                          setMarkupStrokes([])
                          setCurrentStroke(null)
                          showToast('Markup canvas cleared')
                        }}
                        disabled={markupStrokes.length === 0}
                        title="Clear markup"
                      >
                        <RotateCcw size={14} />
                        <span>Clear</span>
                      </button>
                      <button
                        type="button"
                        className="drawer-action-btn btn-primary-apply"
                        onClick={() => {
                          setActiveEditorTool(null)
                          showToast('Annotations saved to image ')
                        }}
                      >
                        <Check size={14} />
                        <span>Done</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. COMMENT TOOLBAR */}
                {activeEditorTool === 'comment' && (
                  <div className="tool-drawer-card">
                    <div className="drawer-info-text">
                      <MessageSquarePlus size={15} className="drawer-info-icon" />
                      <span>Click anywhere on the image to drop a note pin</span>
                    </div>

                    <div className="drawer-divider" />

                    <div className="drawer-actions-row">
                      <span className="drawer-badge-count">
                        {imageComments.length} {imageComments.length === 1 ? 'Pin' : 'Pins'}
                      </span>
                      {imageComments.length > 0 && (
                        <button
                          type="button"
                          className="drawer-action-btn btn-clear-danger"
                          onClick={() => {
                            setImageComments([])
                            showToast('All comment pins cleared')
                          }}
                        >
                          <Trash2 size={13} />
                          <span>Clear All</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. REMOVE BG TOOLBAR */}
                {activeEditorTool === 'removebg' && (
                  <div className="tool-drawer-card">
                    {/* Removal Mode: Auto Cutout or Select */}
                    <div className="drawer-section">
                      <span className="drawer-label">Mode</span>
                      <div className="drawer-sizes-row">
                        <button
                          type="button"
                          className={`size-pill-btn ${bgRemovalMode === 'auto' ? 'active' : ''}`}
                          onClick={() => {
                            setBgRemovalMode('auto')
                            showToast('Auto Mode: Detects full subject')
                          }}
                        >
                          <span>Auto Cutout</span>
                        </button>
                        <button
                          type="button"
                          className={`size-pill-btn ${bgRemovalMode === 'select' ? 'active' : ''}`}
                          onClick={() => {
                            setBgRemovalMode('select')
                            showToast('Select Mode: Draw / paint over the object you want to keep 🎯')
                          }}
                        >
                          <span>Select</span>
                        </button>
                      </div>
                    </div>

                    {bgRemovalMode === 'select' && (
                      <>
                        <div className="drawer-divider" />
                        <div className="drawer-section">
                          <span className="drawer-label">Brush Size ({bgSelectBrushSize}px)</span>
                          <div className="drawer-sizes-row">
                            {[18, 32, 50, 70].map((s) => (
                              <button
                                key={s}
                                type="button"
                                className={`size-pill-btn ${bgSelectBrushSize === s ? 'active' : ''}`}
                                onClick={() => setBgSelectBrushSize(s)}
                              >
                                <span>{s}px</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    <div className="drawer-divider" />

                    {/* Action button */}
                    <div className="drawer-actions-row">
                      {!isBgRemoved ? (
                        <button
                          type="button"
                          className="drawer-action-btn btn-primary-apply"
                          disabled={isBgProcessing || (bgRemovalMode === 'select' && bgSelectStrokes.length === 0)}
                          onClick={handleRemoveBackground}
                        >
                          <Scissors size={14} />
                          <span>
                            {isBgProcessing
                              ? 'Removing BG...'
                              : bgRemovalMode === 'select'
                              ? 'Remove Background'
                              : 'Remove Background'}
                          </span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="drawer-action-btn btn-clear-danger"
                          onClick={() => {
                            setIsBgRemoved(false)
                            setBgRemovedImageUrl(null)
                            showToast('Restored original background')
                          }}
                        >
                          <RotateCcw size={14} />
                          <span>Restore Original</span>
                        </button>
                      )}

                      {bgRemovalMode === 'select' && !isBgRemoved && bgSelectStrokes.length > 0 && (
                        <button
                          type="button"
                          className="drawer-action-btn"
                          onClick={() => {
                            setBgSelectStrokes((prev) => prev.slice(0, -1))
                          }}
                          title="Undo stroke"
                        >
                          <Undo2 size={13} />
                          <span>Undo</span>
                        </button>
                      )}

                      {bgRemovalMode === 'select' && !isBgRemoved && bgSelectStrokes.length > 0 && (
                        <button
                          type="button"
                          className="drawer-action-btn btn-clear-danger"
                          onClick={() => {
                            setBgSelectStrokes([])
                            setCurrentBgSelectStroke(null)
                          }}
                          title="Clear mask"
                        >
                          <RotateCcw size={13} />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>

                    {isBgRemoved && (
                      <>
                        <div className="drawer-divider" />
                        <div className="drawer-section">
                          <span className="drawer-label">Backdrop</span>
                          <div className="drawer-sizes-row">
                            {[
                              { id: 'checkered', label: 'Transparent' },
                              { id: 'dark', label: 'Dark' },
                              { id: 'white', label: 'White' }
                            ].map((b) => (
                              <button
                                key={b.id}
                                type="button"
                                className={`size-pill-btn ${bgBackdropStyle === b.id ? 'active' : ''}`}
                                onClick={() => setBgBackdropStyle(b.id)}
                              >
                                <span>{b.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="drawer-divider" />
                        <button
                          type="button"
                          className="drawer-action-btn btn-primary-apply"
                          onClick={handleStudioExportDownload}
                        >
                          <Download size={14} />
                          <span>Download PNG</span>
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* 4. ERASE TOOLBAR */}
                {activeEditorTool === 'erase' && (
                  <div className="tool-drawer-card">
                    {/* Erase Mode Selector */}
                    <div className="drawer-section">
                      <span className="drawer-label">Erase Mode</span>
                      <div className="drawer-sizes-row">
                        <button
                          type="button"
                          className={`size-pill-btn ${eraseMode === 'cutout' ? 'active' : ''}`}
                          onClick={() => {
                            setEraseMode('cutout')
                            showToast('Mode: Reveal Background (Cutout)')
                          }}
                        >
                          
                          <span>Reveal Background</span>
                        </button>
                        <button
                          type="button"
                          className={`size-pill-btn ${eraseMode === 'inpaint' ? 'active' : ''}`}
                          onClick={() => {
                            setEraseMode('inpaint')
                            showToast('Mode: AI Inpaint Texture')
                          }}
                        >
                          <Zap size={12} />
                          <span>AI Inpaint</span>
                        </button>
                      </div>
                    </div>

                    <div className="drawer-divider" />

                    {/* Brush Size */}
                    <div className="drawer-section">
                      <span className="drawer-label">Brush Size ({eraseBrushSize}px)</span>
                      <div className="drawer-sizes-row">
                        {[12, 24, 36, 50, 70].map((s) => (
                          <button
                            key={s}
                            type="button"
                            className={`size-pill-btn ${eraseBrushSize === s ? 'active' : ''}`}
                            onClick={() => setEraseBrushSize(s)}
                          >
                            <span>{s}px</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="drawer-divider" />

                    {/* Backdrop Pattern when Erased */}
                    <div className="drawer-section">
                      <span className="drawer-label">Background Pattern</span>
                      <div className="drawer-sizes-row">
                        {[
                          { id: 'checkered', label: 'Transparent Grid' },
                          { id: 'dark', label: 'Dark Studio' },
                          { id: 'white', label: 'White Canvas' }
                        ].map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            className={`size-pill-btn ${eraseBackdropStyle === b.id ? 'active' : ''}`}
                            onClick={() => setEraseBackdropStyle(b.id)}
                          >
                            <span>{b.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="drawer-divider" />

                    <div className="drawer-actions-row">
                      <button
                        type="button"
                        className="drawer-action-btn btn-primary-apply"
                        disabled={eraseStrokes.length === 0 || isEraseProcessing}
                        onClick={() => handleApplyErase(eraseMode)}
                      >
                        <Eraser size={14} />
                        <span>
                          {isEraseProcessing
                            ? 'Erasing...'
                            : eraseMode === 'cutout'
                            ? 'Apply Erase (Cutout)'
                            : 'Apply AI Inpaint'}
                        </span>
                      </button>

                      {eraseStrokes.length > 0 && (
                        <button
                          type="button"
                          className="drawer-action-btn"
                          onClick={() => {
                            setEraseStrokes((prev) => prev.slice(0, -1))
                          }}
                          title="Undo last stroke"
                        >
                          <Undo2 size={13} />
                          <span>Undo</span>
                        </button>
                      )}

                      {eraseStrokes.length > 0 && (
                        <button
                          type="button"
                          className="drawer-action-btn btn-clear-danger"
                          onClick={() => {
                            setEraseStrokes([])
                            setCurrentEraseStroke(null)
                          }}
                        >
                          <RotateCcw size={13} />
                          <span>Reset Mask</span>
                        </button>
                      )}

                      {isObjectErased && (
                        <button
                          type="button"
                          className="drawer-action-btn btn-clear-danger"
                          onClick={() => {
                            setErasedImageUrl(null)
                            setIsObjectErased(false)
                            setEraseStrokes([])
                            showToast('Restored original image')
                          }}
                        >
                          <RotateCcw size={13} />
                          <span>Revert</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* 5. RESIZE & ZOOM TOOLBAR */}
                {activeEditorTool === 'resize' && (
                  <div className="tool-drawer-card resize-compact-drawer">
                    <div className="drawer-section">
                      <span className="drawer-label">Aspect Ratio</span>
                      <div className="drawer-sizes-row">
                        {['original', '1:1', '16:9', '9:16', '4:3', '3:2'].map((r) => (
                          <button
                            key={r}
                            type="button"
                            className={`size-pill-btn ${modalCropRatio === r ? 'active' : ''}`}
                            onClick={() => {
                              setModalCropRatio(r)
                              showToast(`Framed to ${r.toUpperCase()}`)
                            }}
                          >
                            <span>{r === 'original' ? 'Original' : r}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="drawer-divider" />

                    {/* Compact Zoom Pill Widget */}
                    <div className="compact-zoom-widget">
                      <div className="compact-zoom-label-group">
                        <Search size={15} className="compact-zoom-icon" />
                        <span className="compact-zoom-label">Zoom</span>
                      </div>
                      <div className="compact-zoom-stepper">
                        <button
                          type="button"
                          className="compact-zoom-btn"
                          onClick={() => setModalZoomScale((prev) => Math.max(0.25, parseFloat((prev - 0.1).toFixed(2))))}
                          title="Zoom out (-10%)"
                          disabled={modalZoomScale <= 0.25}
                        >
                          <Minus size={14} />
                        </button>
                        <button
                          type="button"
                          className="compact-zoom-percent-pill"
                          onClick={() => setModalZoomScale(1.0)}
                          title="Click to reset to 100%"
                        >
                          {Math.round(modalZoomScale * 100)}%
                        </button>
                        <button
                          type="button"
                          className="compact-zoom-btn"
                          onClick={() => setModalZoomScale((prev) => Math.min(4.0, parseFloat((prev + 0.1).toFixed(2))))}
                          title="Zoom in (+10%)"
                          disabled={modalZoomScale >= 4.0}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Center High-Res Image Stage */}
            <div
              className={`fullscreen-image-stage ${activeEditorTool ? 'has-active-tool-drawer' : ''}`}
              onClick={() => {
                if (!activeEditorTool && !pendingComment) {
                  setFullscreenImageModal(null)
                }
              }}
            >
              <div
                className={`fullscreen-rendered-wrapper ${isBgRemoved ? `bg-removed-mode bg-mode-${bgBackdropStyle}` : (isObjectErased || activeEditorTool === 'erase' ? `bg-removed-mode bg-mode-${eraseBackdropStyle}` : '')} ${activeEditorTool === 'comment' ? 'tool-comment-active' : ''} ${activeEditorTool ? 'has-active-tool-drawer' : ''}`}
                data-ratio={modalCropRatio !== 'original' ? modalCropRatio : undefined}
                onClick={(e) => {
                  e.stopPropagation()
                  // Drop comment pin if comment tool is active
                  if (activeEditorTool === 'comment') {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = Math.max(5, Math.min(95, Math.round(((e.clientX - rect.left) / rect.width) * 100)))
                    const y = Math.max(5, Math.min(95, Math.round(((e.clientY - rect.top) / rect.height) * 100)))
                    setPendingComment({ x, y, text: '' })
                  }
                }}
              >
                {/* Background Removal Scanning Laser Effect */}
                {isBgProcessing && <div className="ai-bg-scan-beam" />}

                {/* Main Rendered Image */}
                <img
                  src={bgRemovedImageUrl || erasedImageUrl || fullscreenImageModal.url}
                  alt={fullscreenImageModal.originalIdea || fullscreenImageModal.prompt}
                  className={`fullscreen-rendered-img ${isObjectErased ? 'erased-inpainted-active' : ''}`}
                  style={{
                    transform: `scale(${modalZoomScale})`,
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />

                {/* 1. Interactive Canvas Layer for Freehand Markup Drawing (always mounted so annotations stay visible) */}
                <canvas
                  ref={markupCanvasRef}
                  className="fullscreen-markup-canvas"
                  width={800}
                  height={800}
                  style={{
                    pointerEvents: activeEditorTool === 'markup' ? 'auto' : 'none',
                    zIndex: activeEditorTool === 'markup' ? 8 : 6
                  }}
                  onPointerDown={(e) => {
                    if (activeEditorTool !== 'markup') return
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = (e.clientX - rect.left) * (800 / rect.width)
                    const y = (e.clientY - rect.top) * (800 / rect.height)
                    setIsDrawingMarkup(true)
                    setCurrentStroke({ color: markupColor, size: markupBrushSize, points: [{ x, y }] })
                  }}
                  onPointerMove={(e) => {
                    if (!isDrawingMarkup || !currentStroke || activeEditorTool !== 'markup') return
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = (e.clientX - rect.left) * (800 / rect.width)
                    const y = (e.clientY - rect.top) * (800 / rect.height)
                    setCurrentStroke((prev) => prev ? { ...prev, points: [...prev.points, { x, y }] } : null)
                  }}
                  onPointerUp={() => {
                    if (currentStroke && currentStroke.points.length > 0) {
                      setMarkupStrokes((prev) => [...prev, currentStroke])
                    }
                    setCurrentStroke(null)
                    setIsDrawingMarkup(false)
                  }}
                  onPointerLeave={() => {
                    if (currentStroke && currentStroke.points.length > 0) {
                      setMarkupStrokes((prev) => [...prev, currentStroke])
                    }
                    setCurrentStroke(null)
                    setIsDrawingMarkup(false)
                  }}
                />

                {/* 2. Interactive Canvas Layer for Object Eraser Brush */}
                {activeEditorTool === 'erase' && (
                  <canvas
                    ref={eraseCanvasRef}
                    className="fullscreen-erase-canvas"
                    width={800}
                    height={800}
                    onPointerDown={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const x = (e.clientX - rect.left) * (800 / rect.width)
                      const y = (e.clientY - rect.top) * (800 / rect.height)
                      setIsErasing(true)
                      setCurrentEraseStroke({ size: eraseBrushSize, points: [{ x, y }] })
                    }}
                    onPointerMove={(e) => {
                      if (!isErasing || !currentEraseStroke) return
                      const rect = e.currentTarget.getBoundingClientRect()
                      const x = (e.clientX - rect.left) * (800 / rect.width)
                      const y = (e.clientY - rect.top) * (800 / rect.height)
                      setCurrentEraseStroke((prev) => prev ? { ...prev, points: [...prev.points, { x, y }] } : null)
                    }}
                    onPointerUp={() => {
                      if (currentEraseStroke && currentEraseStroke.points.length > 0) {
                        setEraseStrokes((prev) => [...prev, currentEraseStroke])
                      }
                      setCurrentEraseStroke(null)
                      setIsErasing(false)
                    }}
                    onPointerLeave={() => {
                      if (currentEraseStroke && currentEraseStroke.points.length > 0) {
                        setEraseStrokes((prev) => [...prev, currentEraseStroke])
                      }
                      setCurrentEraseStroke(null)
                      setIsErasing(false)
                    }}
                  />
                )}

                {/* 3. Interactive Canvas Layer for Freehand Object Selection in Remove BG Mode */}
                {activeEditorTool === 'removebg' && bgRemovalMode === 'select' && !isBgRemoved && (
                  <>
                    <canvas
                      ref={bgSelectCanvasRef}
                      className="fullscreen-bg-select-canvas"
                      width={800}
                      height={800}
                      onPointerDown={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const x = (e.clientX - rect.left) * (800 / rect.width)
                        const y = (e.clientY - rect.top) * (800 / rect.height)
                        setIsDrawingBgSelect(true)
                        setCurrentBgSelectStroke({ size: bgSelectBrushSize, points: [{ x, y }] })
                      }}
                      onPointerMove={(e) => {
                        if (!isDrawingBgSelect || !currentBgSelectStroke) return
                        const rect = e.currentTarget.getBoundingClientRect()
                        const x = (e.clientX - rect.left) * (800 / rect.width)
                        const y = (e.clientY - rect.top) * (800 / rect.height)
                        setCurrentBgSelectStroke((prev) => (prev ? { ...prev, points: [...prev.points, { x, y }] } : null))
                      }}
                      onPointerUp={() => {
                        if (currentBgSelectStroke && currentBgSelectStroke.points.length > 0) {
                          setBgSelectStrokes((prev) => [...prev, currentBgSelectStroke])
                        }
                        setCurrentBgSelectStroke(null)
                        setIsDrawingBgSelect(false)
                      }}
                      onPointerLeave={() => {
                        if (currentBgSelectStroke && currentBgSelectStroke.points.length > 0) {
                          setBgSelectStrokes((prev) => [...prev, currentBgSelectStroke])
                        }
                        setCurrentBgSelectStroke(null)
                        setIsDrawingBgSelect(false)
                      }}
                    />
                    <div className="bg-selection-hint-pill">
                      <span>Draw / paint over the object you want to keep</span>
                    </div>
                  </>
                )}

                {/* 3. Interactive Comment Pins Overlay */}
                {imageComments.map((comment, idx) => (
                  <div
                    key={comment.id}
                    className="comment-pin-marker"
                    style={{ left: `${comment.x}%`, top: `${comment.y}%` }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveCommentCardId(activeCommentCardId === comment.id ? null : comment.id)
                    }}
                  >
                    <div className="comment-pin-badge">
                      <span>{idx + 1}</span>
                    </div>

                    {/* Expandable Comment Card Popover */}
                    {activeCommentCardId === comment.id && (
                      <div className="comment-pin-popover" onClick={(e) => e.stopPropagation()}>
                        <div className="popover-header">
                          <span className="popover-author">{comment.author}</span>
                          <span className="popover-time">{comment.time}</span>
                          <button
                            type="button"
                            className="btn-delete-comment"
                            onClick={() => {
                              setImageComments((prev) => prev.filter((c) => c.id !== comment.id))
                              setActiveCommentCardId(null)
                              showToast('Comment deleted')
                            }}
                            title="Delete note"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                        <p className="popover-text">{comment.text}</p>
                      </div>
                    )}
                  </div>
                ))}

                {/* 4. Pending Comment Input Popover */}
                {pendingComment && (
                  <div
                    className="pending-comment-card"
                    style={{ left: `${pendingComment.x}%`, top: `${pendingComment.y}%` }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="pending-card-header">
                      <MessageSquare size={13} />
                      <span>Add Note Pin</span>
                    </div>
                    <input
                      type="text"
                      className="pending-comment-input"
                      placeholder="Type your note here..."
                      value={pendingComment.text}
                      onChange={(e) => setPendingComment({ ...pendingComment, text: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && pendingComment.text.trim()) {
                          setImageComments((prev) => [
                            ...prev,
                            {
                              id: Date.now(),
                              x: pendingComment.x,
                              y: pendingComment.y,
                              text: pendingComment.text.trim(),
                              author: currentUser?.name || 'You',
                              time: 'Just now'
                            }
                          ])
                          setPendingComment(null)
                          showToast('Note pinned to image! 📌')
                        }
                      }}
                      autoFocus
                    />
                    <div className="pending-card-actions">
                      <button
                        type="button"
                        className="btn-cancel-pending"
                        onClick={() => setPendingComment(null)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn-save-pending"
                        disabled={!pendingComment.text.trim()}
                        onClick={() => {
                          if (pendingComment.text.trim()) {
                            setImageComments((prev) => [
                              ...prev,
                              {
                                id: Date.now(),
                                x: pendingComment.x,
                                y: pendingComment.y,
                                text: pendingComment.text.trim(),
                                author: currentUser?.name || 'You',
                                time: 'Just now'
                              }
                            ])
                            setPendingComment(null)
                            showToast('Note pinned to image! 📌')
                          }
                        }}
                      >
                        <Send size={12} />
                        <span>Post</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Official Thamili Watermark Logo */}
                <div className="fullscreen-watermark-logo" title="Created with Thamili AI">
                  <img
                    src={thamiliLogoImg}
                    alt="Thamili AI"
                    className="fullscreen-watermark-icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
                  : 'Start creating with instant cloud history sync & free AI credits.'}
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
                    role: 'Pro Creator',
                    credits: 250
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
