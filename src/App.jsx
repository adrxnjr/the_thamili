import { useState, useEffect, useRef, useMemo } from 'react'
import {
  MessageSquare,
  Code,
  Image as ImageIcon,
  Video,
  GraduationCap,
  LayoutGrid,
  Sparkles,
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
  RefreshCw
} from 'lucide-react'
import thamiliLogoImg from './assets/thamili-logo.png'
import sidebarLogoImg from './assets/thamili-logo.png'
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
    icon: Sparkles
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
export const AurqoLogoIcon = ThamiliLogoIcon

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
export const AurqoWordmark = ThamiliWordmark

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

const REFERENCE_TEMPLATE_SLOTS = [
  // Slot 0: Tamil Vintage Houses (விண்டேஜ் இல்லங்கள்)
  [
    {
      id: 'chettinad-house',
      name: 'Chettinad Vintage Mansion',
      prompt: '19th-century Chettinad vintage heritage ancestral mansion with massive Burma teak carved pillars, handmade colorful Athangudi floor tiles, sunlit central courtyard thinnai, antique brass urns, 8k architectural photo',
      image: '/images/tamil/chettinad-mansion.jpg',
      domain: 'Tamil Vintage Houses'
    },
    {
      id: 'madras-agraharam',
      name: 'Madras Agraharam Tiled House',
      prompt: 'Traditional Tamil Madras Agraharam street house with sloping red terracotta tile roof, white lime-washed walls with red thiruman stripes, wooden veranda thinnai with morning Kolam, 8k nostalgic vintage photograph',
      image: '/images/tamil/agraharam-street.jpg',
      domain: 'Tamil Vintage Houses'
    },
    {
      id: 'antique-wooden-door',
      name: 'Antique Carved Teak Door',
      prompt: 'Authentic antique Tamil wooden doorway hand-carved from solid Burma teak with intricate floral Gajalakshmi carvings, ornate heavy brass padlock and studs, vintage patina, 8k macro architectural photo',
      image: '/images/tamil/chettinad-door.jpg',
      domain: 'Tamil Vintage Houses'
    },
    {
      id: 'ancestral-thinnai',
      name: 'Ancestral Courtyard Thinnai',
      prompt: 'Sun-drenched open-air courtyard (muttram) inside vintage Tamil heritage home with rain pillars, swinging teak wooden oonjal swing, polished red oxide floor, brass filter coffee davarah on corner stool, 8k',
      image: '/images/tamil/chettinad-thinnai.jpg',
      domain: 'Tamil Vintage Houses'
    }
  ],

  // Slot 1: Tamil Vintage Cars & Retro Streets (விண்டேஜ் கார்கள் & வீதிகள்)
  [
    {
      id: 'vintage-ambassador',
      name: '1970s Vintage Ambassador',
      prompt: 'Classic vintage 1970s cream-white Hindustan Ambassador car parked under banyan tree on nostalgic Madras heritage street, old Tamil typography road sign, soft morning golden sunlight, 35mm film grain',
      image: '/images/tamil/vintage-ambassador-1.jpg',
      domain: 'Tamil Vintage Cars & Streets'
    },
    {
      id: 'retro-padmini-madras',
      name: 'Retro Premier Padmini Taxi',
      prompt: 'Retro black and yellow vintage Premier Padmini taxi cruising past historic colonial building on Mount Road Chennai in 1980s, bustling street with vintage scooters and nostalgic atmosphere, 8k',
      image: '/images/tamil/vintage-ambassador-2.jpg',
      domain: 'Tamil Vintage Cars & Streets'
    },
    {
      id: 'village-bullock-cart',
      name: 'Village Bullock Cart Street',
      prompt: 'Traditional Tamil Nadu countryside village red dirt road with antique wooden bullock cart (Maattu Vandi), palmyra trees silhouetted against warm sunset, rustic vintage village lifestyle, 8k photography',
      image: '/images/tamil/bullock-cart-tamilnadu.jpg',
      domain: 'Tamil Vintage Cars & Streets'
    },
    {
      id: 'madurai-bazaar-street',
      name: 'Madurai Temple Street Bazaar',
      prompt: 'Lively vintage temple street bazaar outside Madurai Meenakshi Temple, flower vendors weaving fresh jasmine garlands, brass lamp shops, devotees in traditional silk veshti, nostalgic warm colors',
      image: '/images/tamil/madurai-temple.jpg',
      domain: 'Tamil Vintage Cars & Streets'
    }
  ],

  // Slot 2: Tamil Pongal Festival (பொங்கல் திருவிழா)
  [
    {
      id: 'thai-pongal-pot',
      name: 'Village Pongal Earthen Pot',
      prompt: 'Traditional rural Thai Pongal ritual with decorated earthenware clay pot bubbling over with sweet milk on open firewood stove, turmeric leaf tied around neck, tall fresh sugarcane stalks in village house courtyard, 8k',
      image: '/images/tamil/pongal-pot.jpg',
      domain: 'Tamil Pongal Festival'
    },
    {
      id: 'pongal-kolam-sugarcane',
      name: 'Sacred Kolam & Sugarcane',
      prompt: 'Intricate white rice flour Pongal Kolam mandala drawn on damp red earth in front of ancestral house doorstep, flanked by fresh green sugarcane stalks and colorful flower petals, morning dew, 8k macro',
      image: '/images/tamil/tamil-kolam.jpg',
      domain: 'Tamil Pongal Festival'
    },
    {
      id: 'mattu-pongal-bull',
      name: 'Mattu Pongal Bull Art',
      prompt: 'Majestic Tamil Kangayam bull celebrated during Mattu Pongal, horns painted with vibrant saffron and green bands, brass bell garland jingling around neck, floral marigold crown, village celebration',
      image: '/images/tamil/mattu-pongal-cow.jpg',
      domain: 'Tamil Pongal Festival'
    },
    {
      id: 'village-pongal-feast',
      name: 'Tamil Harvest Celebration',
      prompt: 'Tamil family dressed in traditional pattu pavada and silk veshti celebrating Thai Pongal festival together in ancestral village home courtyard, offering Sakkarai Pongal on fresh plantain leaf, 8k',
      image: '/images/tamil/pongal-cooking.jpg',
      domain: 'Tamil Pongal Festival'
    }
  ],

  // Slot 3: Tamil Diwali & Deepam (தீபாவளி & திருவிளக்கு)
  [
    {
      id: 'agal-vilakku-lamps',
      name: 'Terracotta Agal Vilakku Lamps',
      prompt: 'Rows of traditional terracotta clay agal vilakku oil lamps glowing with warm golden flame on wooden steps of vintage heritage house, Karthigai Deepam & Diwali festival night, beautiful bokeh, 8k',
      image: '/images/tamil/diwali-diya.jpg',
      domain: 'Tamil Diwali Celebrations'
    },
    {
      id: 'brass-kuthuvilakku',
      name: 'Ancestral Brass Kuthuvilakku',
      prompt: 'Grand traditional five-wick brass Kuthuvilakku standing tall in antique Tamil pooja room, illuminated by fragrant sesame oil flames, decorated with fresh Madurai jasmine garland and vermillion kumkum, 8k',
      image: '/images/tamil/kuthuvilakku-brass.jpg',
      domain: 'Tamil Diwali Celebrations'
    },
    {
      id: 'diwali-sparklers-night',
      name: 'Diwali Sparklers (Mathappu)',
      prompt: 'Joyful traditional Tamil Diwali celebration at dusk in village courtyard, children waving glowing golden sparklers (Kambi Mathappu) dressed in bright silk pavada, flower pots showering golden sparks, 8k',
      image: '/images/tamil/diwali-sparklers.jpg',
      domain: 'Tamil Diwali Celebrations'
    },
    {
      id: 'deepam-temple-steps',
      name: 'Karthigai Deepam Glow',
      prompt: 'Historic stone temple steps and ancestral thinnai completely illuminated with hundreds of glowing terracotta oil lamps during auspicious Karthigai Deepam festival night, sacred golden aura, 8k photo',
      image: '/images/tamil/diwali-diyas-night.jpg',
      domain: 'Tamil Diwali Celebrations'
    }
  ],

  // Slot 4: Tamil Jallikattu & Bull Heritage (ஜல்லிக்கட்டு & மாடு)
  [
    {
      id: 'alanganallur-jallikattu',
      name: 'Alanganallur Jallikattu Bull',
      prompt: 'High-speed action photograph of the iconic Alanganallur Jallikattu bull charging into the sandy arena, sharp painted horns, powerful muscular Kangayam breed, cheering crowd in golden afternoon sun, 8k',
      image: '/images/tamil/alanganallur-jallikattu.jpg',
      domain: 'Tamil Jallikattu Heritage'
    },
    {
      id: 'jallikattu-veera-tamer',
      name: 'Bull Hump Taming Action',
      prompt: 'Dynamic cultural photograph of brave Tamil youth embracing the muscular hump of the charging native bull at Palamedu Jallikattu arena, billowing golden sand dust, intense bravery, National Geographic',
      image: '/images/tamil/bull-taming-1.jpg',
      domain: 'Tamil Jallikattu Heritage'
    },
    {
      id: 'decorated-temple-bull',
      name: 'Festive Temple Kovil Kaalai',
      prompt: 'Magnificent Tamil native temple bull (Kovil Kaalai) adorned with silk shawl, golden horn caps, floral jasmine and marigold garlands, standing proudly in temple courtyard, authentic heritage',
      image: '/images/tamil/bull-taming-2.jpg',
      domain: 'Tamil Jallikattu Heritage'
    },
    {
      id: 'rekla-race-chariot',
      name: 'Rural Rekla Race Chariot',
      prompt: 'High-speed action shot of traditional Tamil Rekla race, wooden two-wheeled racing cart driven by skilled rider pulled by two sprint-trained Kangayam prize bulls, dirt flying, golden dust storm, 8k',
      image: '/images/tamil/jallikattu-action.jpg',
      domain: 'Tamil Jallikattu Heritage'
    }
  ]
]

export const ALL_CREATIVE_CATEGORIES = [
  // 1. Tamil Vintage Houses & Architecture (விண்டேஜ் இல்லங்கள்)
  {
    id: 'cat-chettinad-house',
    name: 'Chettinad Athangudi Heritage Palace',
    field: 'Tamil Vintage Houses',
    tag: 'Chettinad Heritage',
    image: '/images/tamil/chettinad-mansion.jpg',
    prompt: 'Majestic 19th-century Chettinad vintage heritage ancestral mansion with massive Burma teak carved pillars, handmade colorful Athangudi floor tiles, sunlit central courtyard thinnai, 8k photo'
  },
  {
    id: 'cat-madras-agraharam-house',
    name: 'Madras Agraharam Tiled House',
    field: 'Tamil Vintage Houses',
    tag: 'Traditional Agraharam',
    image: '/images/tamil/agraharam-street.jpg',
    prompt: 'Traditional Tamil Madras Agraharam street house with sloping red terracotta tile roof, white lime-washed walls with red stripes, wooden veranda thinnai with morning Kolam, 8k vintage photograph'
  },
  {
    id: 'cat-antique-teak-door',
    name: 'Antique Carved Teak Wooden Door',
    field: 'Tamil Vintage Houses',
    tag: 'Carved Woodwork',
    image: '/images/tamil/chettinad-door.jpg',
    prompt: 'Authentic antique Tamil wooden doorway hand-carved from solid Burma teak with intricate floral Gajalakshmi carvings, ornate heavy brass padlock and studs, vintage patina, 8k macro'
  },
  {
    id: 'cat-ancestral-thinnai',
    name: 'Ancestral Courtyard Thinnai Veranda',
    field: 'Tamil Vintage Houses',
    tag: 'Open Muttram',
    image: '/images/tamil/chettinad-thinnai.jpg',
    prompt: 'Sun-drenched open-air courtyard (muttram) inside vintage Tamil heritage home with rain pillars, swinging teak wooden oonjal swing, polished red oxide floor, brass filter coffee davarah, 8k'
  },
  {
    id: 'cat-tanjore-palace-arch',
    name: 'Thanjavur Nayak Palace Hall',
    field: 'Tamil Vintage Houses',
    tag: 'Royal Architecture',
    image: '/images/tamil/chettinad-courtyard.jpg',
    prompt: 'Historic Thanjavur Maratha and Nayak palace interior with grand stucco arches, vintage fresco ceiling paintings, huge granite courtyards, warm afternoon light filtering through corridors'
  },
  {
    id: 'cat-vintage-kitchen-pots',
    name: 'Chettinad Brass & Clay Pot Kitchen',
    field: 'Tamil Vintage Houses',
    tag: 'Rustic Kitchen',
    image: '/images/tamil/chettinad-mansion.jpg',
    prompt: 'Traditional vintage Chettinad village kitchen with wood-fired clay stoves (Aduppu), gleaming large brass water vessels (Anda), Kalchatti soapstone pots, and hanging uri baskets, 8k'
  },

  // 2. Tamil Vintage Cars & Retro Streets (விண்டேஜ் கார்கள் & வீதிகள்)
  {
    id: 'cat-vintage-ambassador-car',
    name: '1970s Vintage Ambassador on Madras Road',
    field: 'Tamil Vintage Cars & Streets',
    tag: 'Iconic Vintage Car',
    image: '/images/tamil/vintage-ambassador-1.jpg',
    prompt: 'Classic vintage 1970s cream-white Hindustan Ambassador car parked under banyan tree on nostalgic Madras heritage street, old Tamil typography road sign, soft morning golden sunlight, 35mm film'
  },
  {
    id: 'cat-retro-premier-padmini',
    name: 'Retro Premier Padmini Black-Yellow Taxi',
    field: 'Tamil Vintage Cars & Streets',
    tag: 'Vintage Taxi',
    image: '/images/tamil/vintage-ambassador-2.jpg',
    prompt: 'Retro black and yellow vintage Premier Padmini taxi cruising past historic colonial building on Mount Road Chennai in 1980s, bustling street with vintage scooters and nostalgic atmosphere, 8k'
  },
  {
    id: 'cat-village-bullock-cart-street',
    name: 'Village Bullock Cart (Maattu Vandi)',
    field: 'Tamil Vintage Cars & Streets',
    tag: 'Rustic Heritage',
    image: '/images/tamil/bullock-cart-tamilnadu.jpg',
    prompt: 'Traditional Tamil Nadu countryside village red dirt road with antique wooden bullock cart (Maattu Vandi), palmyra trees silhouetted against warm sunset, rustic vintage village lifestyle, 8k'
  },
  {
    id: 'cat-madurai-bazaar-street-art',
    name: 'Old Madurai Temple Street Bazaar',
    field: 'Tamil Vintage Cars & Streets',
    tag: 'Bazaar Street',
    image: '/images/tamil/madurai-temple.jpg',
    prompt: 'Lively vintage temple street bazaar outside Madurai Meenakshi Temple, flower vendors weaving fresh jasmine garlands, brass lamp shops, devotees in traditional silk veshti, nostalgic warm colors'
  },
  {
    id: 'cat-vintage-chennai-central',
    name: 'Historic Madras Central Station',
    field: 'Tamil Vintage Cars & Streets',
    tag: 'Madras Heritage',
    image: '/images/tamil/vintage-ambassador-3.jpg',
    prompt: '1970s vintage nostalgic shot of Chennai Central Railway Station Victorian red-brick facade, vintage cars and steam locomotives, bustling commuters in traditional attire, warm film tone'
  },
  {
    id: 'cat-vintage-bicycle-street',
    name: 'Vintage Hercules Bicycle in Old Town',
    field: 'Tamil Vintage Cars & Streets',
    tag: 'Retro Daily Life',
    image: '/images/tamil/agraharam-street.jpg',
    prompt: 'Vintage black roadster bicycle resting against a colorful painted heritage veranda wall, brass milk cans hanging from handlebar, morning newspaper vendor, warm sunrise light, 8k'
  },

  // 3. Tamil Pongal Harvest Festival (பொங்கல் திருவிழா)
  {
    id: 'cat-thai-pongal-pot-art',
    name: 'Thai Pongal Earthen Pot on Fire',
    field: 'Tamil Pongal Festival',
    tag: 'Pongal Panai',
    image: '/images/tamil/pongal-pot.jpg',
    prompt: 'Traditional rural Thai Pongal ritual with decorated earthenware clay pot bubbling over with sweet milk on open firewood stove, turmeric leaf tied around neck, tall fresh sugarcane stalks in village house courtyard, 8k'
  },
  {
    id: 'cat-pongal-kolam-sugarcane-art',
    name: 'Sacred Rice Flour Kolam & Sugarcane',
    field: 'Tamil Pongal Festival',
    tag: 'Rangoli Kolam',
    image: '/images/tamil/tamil-kolam.jpg',
    prompt: 'Intricate white rice flour Pongal Kolam mandala drawn on damp red earth in front of ancestral house doorstep, flanked by fresh green sugarcane stalks and colorful flower petals, morning dew, 8k macro'
  },
  {
    id: 'cat-mattu-pongal-bull-art',
    name: 'Mattu Pongal Decorated Cattle',
    field: 'Tamil Pongal Festival',
    tag: 'Cattle Festival',
    image: '/images/tamil/mattu-pongal-cow.jpg',
    prompt: 'Majestic Tamil Kangayam bull celebrated during Mattu Pongal, horns painted with vibrant saffron and green bands, brass bell garland jingling around neck, floral marigold crown, village celebration'
  },
  {
    id: 'cat-village-pongal-family',
    name: 'Tamil Village Family Harvest Ritual',
    field: 'Tamil Pongal Festival',
    tag: 'Family Tradition',
    image: '/images/tamil/pongal-cooking.jpg',
    prompt: 'Tamil family dressed in traditional pattu pavada and silk veshti celebrating Thai Pongal festival together in ancestral village home courtyard, offering Sakkarai Pongal on fresh plantain leaf, 8k'
  },
  {
    id: 'cat-paddy-harvest-kaveri',
    name: 'Kaveri Delta Golden Paddy Harvest',
    field: 'Tamil Pongal Festival',
    tag: 'Golden Harvest',
    image: '/images/tamil/pongal-girl.jpg',
    prompt: 'Vast golden rice paddy fields ready for harvest in Kaveri delta Thanjavur, village farmers cutting golden sheaves in warm morning sunshine, stacks of hay, authentic rural Tamil Nadu, 8k'
  },

  // 4. Tamil Diwali & Deepam Celebrations (தீபாவளி & கார்த்திகை தீபம்)
  {
    id: 'cat-agal-vilakku-lamps-art',
    name: 'Terracotta Agal Vilakku Oil Lamps',
    field: 'Tamil Diwali Celebrations',
    tag: 'Agal Vilakku',
    image: '/images/tamil/diwali-diya.jpg',
    prompt: 'Rows of traditional terracotta clay agal vilakku oil lamps glowing with warm golden flame on wooden steps of vintage heritage house, Karthigai Deepam & Diwali festival night, beautiful bokeh, 8k'
  },
  {
    id: 'cat-brass-kuthuvilakku-art',
    name: 'Ancestral Brass Kuthuvilakku Pooja',
    field: 'Tamil Diwali Celebrations',
    tag: 'Pooja Vilakku',
    image: '/images/tamil/kuthuvilakku-brass.jpg',
    prompt: 'Grand traditional five-wick brass Kuthuvilakku standing tall in antique Tamil pooja room, illuminated by fragrant sesame oil flames, decorated with fresh Madurai jasmine garland and vermillion kumkum, 8k'
  },
  {
    id: 'cat-diwali-sparklers-night-art',
    name: 'Diwali Sparklers (Kambi Mathappu)',
    field: 'Tamil Diwali Celebrations',
    tag: 'Night Sparklers',
    image: '/images/tamil/diwali-sparklers.jpg',
    prompt: 'Joyful traditional Tamil Diwali celebration at dusk in village courtyard, children waving glowing golden sparklers (Kambi Mathappu) dressed in bright silk pavada, flower pots showering golden sparks, 8k'
  },
  {
    id: 'cat-karthigai-deepam-steps',
    name: 'Karthigai Deepam Temple Steps',
    field: 'Tamil Diwali Celebrations',
    tag: 'Sacred Deepam',
    image: '/images/tamil/diwali-diyas-night.jpg',
    prompt: 'Historic stone temple steps and ancestral thinnai completely illuminated with hundreds of glowing terracotta oil lamps during auspicious Karthigai Deepam festival night, sacred golden aura, 8k photo'
  },
  {
    id: 'cat-diwali-morning-silk',
    name: 'Diwali Morning Silk & Ganga Snanam',
    field: 'Tamil Diwali Celebrations',
    tag: 'Diwali Morning',
    image: '/images/tamil/nilavilakku-brass.jpg',
    prompt: 'Traditional early morning Diwali setup in heritage house: brand new Kanchipuram silk saree with turmeric mark, homemade Diwali legiyam sweet in silver bowl, brass oil lamp lit at dawn, 8k'
  },

  // 5. Tamil Jallikattu Heritage (ஜல்லிக்கட்டு & மாடு)
  {
    id: 'cat-alanganallur-jallikattu-art',
    name: 'Alanganallur Jallikattu Kangayam Bull',
    field: 'Tamil Jallikattu Heritage',
    tag: 'Heroic Jallikattu',
    image: '/images/tamil/alanganallur-jallikattu.jpg',
    prompt: 'High-speed action photograph of the iconic Alanganallur Jallikattu bull charging into the sandy arena, sharp painted horns, powerful muscular Kangayam breed, cheering crowd in golden afternoon sun, 8k'
  },
  {
    id: 'cat-jallikattu-veera-tamer-art',
    name: 'Palamedu Bull Taming Arena Action',
    field: 'Tamil Jallikattu Heritage',
    tag: 'Bravery Action',
    image: '/images/tamil/bull-taming-1.jpg',
    prompt: 'Dynamic cultural photograph of brave Tamil youth embracing the muscular hump of the charging native bull at Palamedu Jallikattu arena, billowing golden sand dust, intense bravery, National Geographic'
  },
  {
    id: 'cat-decorated-temple-bull-art',
    name: 'Festive Temple Kovil Kaalai',
    field: 'Tamil Jallikattu Heritage',
    tag: 'Sacred Bull',
    image: '/images/tamil/bull-taming-2.jpg',
    prompt: 'Magnificent Tamil native temple bull (Kovil Kaalai) adorned with silk shawl, golden horn caps, floral jasmine and marigold garlands, standing proudly in temple courtyard, authentic heritage'
  },
  {
    id: 'cat-rekla-race-chariot-art',
    name: 'Rural Rekla Race Chariot Sprint',
    field: 'Tamil Jallikattu Heritage',
    tag: 'Rekla Race',
    image: '/images/tamil/jallikattu-action.jpg',
    prompt: 'High-speed action shot of traditional Tamil Rekla race, wooden two-wheeled racing cart driven by skilled rider pulled by two sprint-trained Kangayam prize bulls, dirt flying, golden dust storm, 8k'
  },
  {
    id: 'cat-vadivasal-entry',
    name: 'Historic Vadivasal Gate Entry',
    field: 'Tamil Jallikattu Heritage',
    tag: 'Vadivasal Entry',
    image: '/images/tamil/alanganallur-jallikattu.jpg',
    prompt: 'Dramatic cinematic view of the ancient wooden Vadivasal gate opening as a majestic black Kangayam bull charges through with coconut fiber ropes flying, sun rays through arena dust, 8k'
  }
]

const IMAGE_TEMPLATES = REFERENCE_TEMPLATE_SLOTS.map((slot) => slot[0])

const INITIAL_IMAGES = [
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

// AI Idea-to-Prompt Expansion Engine & Domain Classifier (With Native Tamil Culture Intelligence)
function analyzeAndExpandIdea(rawIdea) {
  const idea = rawIdea.trim()
  const lower = idea.toLowerCase()

  let detectedDomain = 'Tamil Vintage Culture'
  let samplePool = []

  if (
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
  } else if (
    /(car|vintage car|ambassador|padmini|taxi|street|streets|road|madras street|chennai street|bullock cart|maattu vandi|bicycle|bazaar|market)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Tamil Vintage Cars & Streets'
    samplePool = [
      '/images/tamil/vintage-ambassador-1.jpg',
      '/images/tamil/vintage-ambassador-2.jpg',
      '/images/tamil/bullock-cart-tamilnadu.jpg',
      '/images/tamil/madurai-temple.jpg'
    ]
  } else if (
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
  } else if (
    /(diwali|deepam|deepavali|lamp|vilakku|agal vilakku|kuthuvilakku|sparkler|sparklers|mathappu|karthigai|ganga snanam)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Tamil Diwali Celebrations'
    samplePool = [
      '/images/tamil/diwali-diya.jpg',
      '/images/tamil/kuthuvilakku-brass.jpg',
      '/images/tamil/diwali-sparklers.jpg',
      '/images/tamil/diwali-diyas-night.jpg'
    ]
  } else if (
    /(jallikattu|bull|bulls|kangayam|alanganallur|palamedu|rekla|vadivasal|kovil kaalai|manju virattu)/i.test(
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
  } else {
    samplePool = [
      '/images/tamil/chettinad-mansion.jpg',
      '/images/tamil/vintage-ambassador-1.jpg',
      '/images/tamil/pongal-pot.jpg',
      '/images/tamil/alanganallur-jallikattu.jpg'
    ]
  }

  const cleanIdea = idea
    .replace(/^(make|create|generate|design|draw|show|render|a photo of|an image of|picture of)\s+/i, '')
    .trim()

  let enhancedPrompt = ''
  if (detectedDomain === 'Tamil Vintage Houses') {
    enhancedPrompt = `Authentic 19th-century vintage Tamil heritage architecture of ${cleanIdea}, ornate Burma teak pillars, Athangudi geometric floor tiles, sunlit central courtyard thinnai, antique brass urns, master 8k Hasselblad architectural photo.`
  } else if (detectedDomain === 'Tamil Vintage Cars & Streets') {
    enhancedPrompt = `Nostalgic 1970s vintage Tamil streetscape featuring ${cleanIdea}, old Madras road, retro typography Tamil signboards, warm morning Kodachrome film tone, authentic atmosphere, 8k resolution.`
  } else if (detectedDomain === 'Tamil Pongal Festival') {
    enhancedPrompt = `Traditional rural Tamil Thai Pongal festival celebration of ${cleanIdea}, decorated earthen clay pot with overflowing sweet milk over open firewood, fresh green sugarcane, colorful rice Kolam, 8k National Geographic photo.`
  } else if (detectedDomain === 'Tamil Diwali Celebrations') {
    enhancedPrompt = `Sacred Tamil Diwali & Deepam festival illumination of ${cleanIdea}, rows of glowing terracotta agal vilakku oil lamps, antique brass kuthuvilakku, sparkling golden mathappu, warm festive aura, 8k masterpiece.`
  } else if (detectedDomain === 'Tamil Jallikattu Heritage') {
    enhancedPrompt = `High-speed heroic cultural action photograph of ${cleanIdea}, powerful muscular Kangayam bull in Alanganallur Jallikattu arena with sharp painted horns, billowing golden dust clouds, authentic Tamil bravery, 8k.`
  } else {
    enhancedPrompt = `A stunning, hyper-detailed authentic Tamil vintage cultural representation of ${cleanIdea}, master cinematic lighting, rich lifelike textures, atmospheric depth, perfectly balanced composition, 8k resolution octane render.`
  }

  return {
    detectedDomain,
    enhancedPrompt,
    imageUrl: samplePool[Math.floor(Math.random() * samplePool.length)]
  }
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
// LIQUID GLASS NEURAL CAUSTIC & PARTICLES CANVAS (Minimal Blur, Pure Smoothness)
// =========================================================================
function LiquidGlassNeuralCanvas({ step = 0 }) {
  const canvasRef = useRef(null)
  const stepRef = useRef(step)

  useEffect(() => {
    stepRef.current = step
  }, [step])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let width = (canvas.width = canvas.offsetWidth || 560)
    let height = (canvas.height = canvas.offsetHeight || 420)

    // Subtle diamond sparkle particles
    const particleCount = 28
    const particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1)
      })
    }

    let scanY = 0
    let scanSpeed = 1.6
    let sweepPhase = 0

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Sleek subtle diagonal glass sheen reflection
      sweepPhase += 0.018
      const sweepPos = ((Math.sin(sweepPhase) + 1) / 2) * (width + height) - height * 0.5

      const glassGrad = ctx.createLinearGradient(
        sweepPos - 80,
        0,
        sweepPos + 80,
        height
      )
      glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0)')
      glassGrad.addColorStop(0.35, 'rgba(56, 189, 248, 0.12)')
      glassGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.28)')
      glassGrad.addColorStop(0.65, 'rgba(192, 132, 252, 0.14)')
      glassGrad.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.fillStyle = glassGrad
      ctx.fillRect(0, 0, width, height)

      // 2. Fine precision laser scanline that sweeps down
      scanY += scanSpeed
      if (scanY > height + 20) scanY = -20

      const laserGrad = ctx.createLinearGradient(0, scanY - 12, 0, scanY + 12)
      laserGrad.addColorStop(0, 'rgba(99, 102, 241, 0)')
      laserGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.45)')
      laserGrad.addColorStop(1, 'rgba(192, 132, 252, 0)')

      ctx.fillStyle = laserGrad
      ctx.fillRect(0, scanY - 8, width, 16)

      // 3. Starlight Sparkle Diamond Particles
      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        p.alpha += p.twinkleSpeed

        if (p.alpha > 0.85 || p.alpha < 0.15) {
          p.twinkleSpeed = -p.twinkleSpeed
        }

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Diamond 4-point sparkle cross on brighter particles
        if (p.alpha > 0.5) {
          ctx.strokeStyle = `rgba(186, 230, 253, ${p.alpha * 0.7})`
          ctx.lineWidth = 0.75
          ctx.beginPath()
          ctx.moveTo(p.x - p.size * 2.5, p.y)
          ctx.lineTo(p.x + p.size * 2.5, p.y)
          ctx.moveTo(p.x, p.y - p.size * 2.5)
          ctx.lineTo(p.x, p.y + p.size * 2.5)
          ctx.stroke()
        }
      })

      animId = requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth || 560
      height = canvas.height = canvas.offsetHeight || 420
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="liquid-glass-neural-canvas" />
}

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
        showToast('✨ AI Image Analysis Complete: Category, tags, & resolution auto-detected!')
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
      const matchesField = selectedCategoryField === 'All' || cat.field === selectedCategoryField
      const matchesQuery = !categorySearchQuery.trim() ||
        cat.name.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
        cat.prompt.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
        cat.field.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
        cat.tag.toLowerCase().includes(categorySearchQuery.toLowerCase())
      return matchesField && matchesQuery
    })
  }, [selectedCategoryField, categorySearchQuery])

  // Handle applying category prompt directly into composer on main page
  const handleApplyCategoryPrompt = (cat) => {
    setActiveTab('AI Image')
    setImagesSubTab('studio')
    setIdeaText(cat.prompt)
    setAttachedReferences([
      {
        id: createId('ref-cat'),
        name: cat.name,
        preview: cat.image,
        isTemplate: true
      }
    ])
    setIsCategoriesModalOpen(false)
    showToast(`Added "${cat.name}" style to search bar ✨`)
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 80)
  }

  // Handle attaching category image as reference
  const handleAttachCategoryReference = (cat) => {
    const newRef = {
      id: createId('ref-cat'),
      name: cat.name,
      preview: cat.image,
      isTemplate: true
    }
    setAttachedReferences([newRef])
    showToast(`Added "${cat.name}" as Reference 🖼️`)
  }

  // Model & Voice state
  const [selectedModel, setSelectedModel] = useState('Flash')
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)

  // Refs for DOM and Cancellation token
  const searchInputRef = useRef(null)
  const fileInputRef = useRef(null)
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
  const handleToggleVoicePrompt = () => {
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
            domain: 'Uploaded Reference'
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
          ? `Attached reference "${newRefs[0].name}" ✨`
          : `Attached ${newRefs.length} reference images ✨`
      )
      setIsPlusMenuOpen(false)
      setTimeout(() => searchInputRef.current?.focus(), 50)
    })
  }

  // Template Reference Card Click -> FLIP Shared-Element Animation to Prompt Composer (Single active reference image)
  const handleTemplateReferenceClick = (tmpl, e) => {
    const cardEl = e.currentTarget
    const imgEl =
      cardEl.querySelector('.template-card-img.template-img-active') ||
      cardEl.querySelector('.template-card-img') ||
      cardEl
    const rect = imgEl.getBoundingClientRect()

    // Find destination exact dropzone position in composer
    const composerCard = document.querySelector('.prompt-composer-glass-card')
    let endTop = rect.top - 140
    let endLeft = rect.left

    if (composerCard) {
      const compRect = composerCard.getBoundingClientRect()
      // Position to the single reference attachment slot
      endTop = compRect.top + 15
      endLeft = compRect.left + 18
    }

    const flyId = createId('fly')
    setFlyingImage({
      id: flyId,
      src: tmpl.image,
      startTop: rect.top,
      startLeft: rect.left,
      startWidth: rect.width,
      startHeight: rect.height,
      endTop: endTop,
      endLeft: endLeft,
      endWidth: 52,
      endHeight: 52
    })

    const newRef = {
      id: createId('ref-tmpl'),
      name: tmpl.name,
      preview: tmpl.image,
      domain: tmpl.domain,
      isTemplate: true
    }

    // Settle into composer as single reference image
    setTimeout(() => {
      setAttachedReferences([newRef])
      setFlyingImage(null)
      showToast(`Set "${tmpl.name}" as reference image ✨`)
      setTimeout(() => searchInputRef.current?.focus(), 50)
    }, 450)
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
    showToast(`Created folder "${newFolder.name}" ✨`)
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
    activeGenerationIdRef.current = null
    setIsGenerating(false)
    setCurrentGeneration(null)
    showToast('Generation safely stopped.')
    setTimeout(() => searchInputRef.current?.focus(), 50)
  }

  // Main AI Idea-to-Image Generation Trigger
  const handleGenerateFromIdea = () => {
    if (isGenerating) return

    if (!ideaText.trim() && attachedReferences.length === 0) {
      showToast('Please enter your prompt or attach a reference image.')
      searchInputRef.current?.focus()
      return
    }

    // Close open menus
    setIsPlusMenuOpen(false)
    setIsRatioExpanded(false)
    setIsModelDropdownOpen(false)
    setIsDownloadMenuOpen(false)

    const generationId = createId('gen')
    activeGenerationIdRef.current = generationId
    clearGenerationTimers()

    const rawPromptText = ideaText.trim() || (attachedReferences[0] ? `Creative artwork inspired by ${attachedReferences[0].name}` : 'Creative artwork')
    const { detectedDomain, enhancedPrompt, imageUrl } = analyzeAndExpandIdea(rawPromptText)

    setIsGenerating(true)
    setGenerationStep(0)
    setCurrentGeneration({
      id: generationId,
      originalIdea: rawPromptText,
      enhancedPrompt,
      domain: detectedDomain,
      ratio: aspectRatio,
      url: imageUrl,
      isRendering: true,
      isRevealing: false,
      saved: false
    })

    // Rotating Status Steps (5.3s progression)
    const stepIntervals = [1050, 2150, 3250, 4350]
    stepIntervals.forEach((delay, idx) => {
      const t = setTimeout(() => {
        if (activeGenerationIdRef.current === generationId) {
          setGenerationStep(idx + 1)
        }
      }, delay)
      generationTimersRef.current.push(t)
    })

    // Final Completion & Smooth Reveal
    const completionTimer = setTimeout(() => {
      if (activeGenerationIdRef.current !== generationId) return

      const newImg = {
        id: generationId,
        folderId: activeFolder && activeFolder.isManual ? activeFolder.id : null,
        originalIdea: rawPromptText,
        prompt: enhancedPrompt,
        domain: detectedDomain, // Automatically mapped to domain folder (e.g. Automobiles, Flowers, etc.)
        ratio: aspectRatio,
        url: imageUrl,
        saved: false,
        createdAt: 'Just now',
        isNew: true,
        referencePreviews: attachedReferences.map((r) => r.preview)
      }

      setCurrentGeneration({
        ...newImg,
        isRendering: false,
        isRevealing: true
      })
      setGalleryImages((prev) => [newImg, ...prev])
      setIsGenerating(false)
      showToast(`✨ Image generated in [${detectedDomain}]!`)

      const revealTimer = setTimeout(() => {
        if (activeGenerationIdRef.current === generationId) {
          setCurrentGeneration((prev) => (prev ? { ...prev, isRevealing: false } : null))
        }
      }, 950)
      generationTimersRef.current.push(revealTimer)
    }, 5350)

    generationTimersRef.current.push(completionTimer)
  }

  // Toggle Save image
  const handleToggleSave = (imgId) => {
    setGalleryImages((prev) =>
      prev.map((img) => (img.id === imgId ? { ...img, saved: !img.saved } : img))
    )
    if (currentGeneration && currentGeneration.id === imgId) {
      setCurrentGeneration((prev) => ({ ...prev, saved: !prev.saved }))
    }
    showToast('Saved state updated.')
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

      {/* ================= SIDEBAR (Stable Structural Anchor) ================= */}
      <aside className="sidebar">
        <div className="brand-logo" onClick={() => setActiveTab('AI Image')} title="THAMILI">
          <img
            src={sidebarLogoImg}
            alt="THAMILI"
            className="sidebar-logo-img"
          />
        </div>

        <nav className="nav-section">
          {/* Collapsible Images Group with Small Arrow */}
          <div className="nav-group-parent">
            <button
              className={`nav-item ${
                activeTab === 'AI Image' && imagesSubTab === 'studio' ? 'active' : ''
              }`}
              onClick={() => {
                setActiveTab('AI Image')
                setImagesSubTab('studio')
              }}
            >
              <div className="nav-item-left">
                <ImageIcon size={18} className="nav-icon" />
                <span>Images</span>
              </div>
              <ChevronDown
                size={14}
                className={`nav-expand-chevron ${isImagesNavExpanded ? 'expanded' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsImagesNavExpanded((prev) => !prev)
                }}
              />
            </button>

            {/* Level 2: Creator Studio inside Images */}
            {isImagesNavExpanded && (
              <div className="nav-sub-items-container">
                <button
                  type="button"
                  className={`nav-sub-item sub-btn-creator-studio ${
                    activeTab === 'AI Image' &&
                    (imagesSubTab === 'marketplace' || imagesSubTab === 'earnings')
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => {
                    setIsCreatorStudioExpanded((prev) => !prev)
                  }}
                >
                  <div className="nav-sub-item-left">
                    <Sparkles size={15} className="sub-item-icon" />
                    <span className="sub-item-title">Creator Studio</span>
                  </div>
                  <ChevronDown
                    size={13}
                    className={`creator-expand-chevron ${
                      isCreatorStudioExpanded ? 'expanded' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsCreatorStudioExpanded((prev) => !prev)
                    }}
                  />
                </button>

                {/* Level 3: Marketplace, Creator Earnings & Credits inside Creator Studio */}
                {isCreatorStudioExpanded && (
                  <div className="nav-nested-items-container">
                    <button
                      type="button"
                      className={`nav-sub-item sub-btn-marketplace ${
                        activeTab === 'AI Image' && imagesSubTab === 'marketplace' ? 'active' : ''
                      }`}
                      onClick={() => {
                        setActiveTab('AI Image')
                        setImagesSubTab('marketplace')
                      }}
                    >
                      <div className="nav-sub-item-left">
                        <ShoppingBag size={15} className="sub-item-icon" />
                        <span className="sub-item-title">Marketplace</span>
                      </div>
                      <span className="sub-nav-count">{marketplaceAssets.length}</span>
                    </button>

                    <button
                      type="button"
                      className={`nav-sub-item sub-btn-earnings ${
                        activeTab === 'AI Image' && imagesSubTab === 'earnings' ? 'active' : ''
                      }`}
                      onClick={() => {
                        setActiveTab('AI Image')
                        setImagesSubTab('earnings')
                      }}
                    >
                      <div className="nav-sub-item-left">
                        <TrendingUp size={15} className="sub-item-icon" />
                        <span className="sub-item-title">Creator Earnings</span>
                      </div>
                      <span className="sub-nav-earning-pill">80%</span>
                    </button>

                    {/* Sidebar Credits Box inside Creator Studio */}
                    <div
                      className="sidebar-credits-box"
                      onClick={() => setIsAddCreditsModalOpen(true)}
                      title="Click to add credits"
                    >
                      <div className="sidebar-credits-left">
                        <Coins size={15} className="credits-coin-icon" />
                        <div className="sidebar-credits-details">
                          <span className="sidebar-credits-val">{userCredits}</span>
                          <span className="sidebar-credits-sub">Credits</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-sidebar-add-credit"
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsAddCreditsModalOpen(true)
                        }}
                        title="Top Up Credits"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        <div className="pro-card">
          <div className="pro-card-title">
            <span>Upgrade to Pro</span>
            <Sparkles size={14} className="sparkle-accent" />
          </div>
          <p className="pro-card-desc">
            Unlock more power, more models, and more possibilities.
          </p>
          <button className="pro-btn">Upgrade Now</button>
        </div>

        <div className="user-profile">
          <div className="user-info">
            <div className="avatar">U</div>
            <div className="user-details">
              <span className="user-name">User</span>
            </div>
          </div>
          <ChevronDown size={15} className="user-chevron" />
        </div>
      </aside>

      {/* ================= MAIN WRAPPER ================= */}
      <div className="main-wrapper">
        {/* BAR-LESS INDEPENDENT FLOATING TOP CONTROLS */}
        <div className="floating-top-controls">
          <button
            className="floating-glass-btn theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <MoonStar size={16} className="theme-toggle-icon" />
            ) : (
              <SunMedium size={16} className="theme-toggle-icon" />
            )}
          </button>
          <button className="floating-glass-btn btn-signin">Sign In</button>
          <button className="floating-glass-btn btn-getstarted">Get Started</button>
        </div>

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
              <button className="tool-pill" onClick={() => setActiveTab('AI Image')}>
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
              Powered by advanced AI technology <Sparkles size={14} color="#8b5cf6" />
            </div>
          </main>
        )}

        {/* ================= COMPLETE LIGHT iOS AI IMAGE WORKSPACE ================= */}
        {activeTab === 'AI Image' && (
          <main className="image-studio-container">
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

            {/* ================= VIEW 1: STUDIO (AI GENERATION) ================= */}
            {imagesSubTab === 'studio' && (
              <>
                {/* 2. TRANSFORMING SEARCH BOX GENERATION WORKSPACE */}
                <div className="workspace-stage-wrapper">
                  <div
                    className={`prompt-composer-glass-card ${
                      isGenerating ? 'is-generating-mode' : currentGeneration ? 'is-completed-mode' : 'is-ready-mode'
                    }`}
                    data-ratio={currentGeneration?.ratio || aspectRatio}
                  >
                    {/* 2A. READY STATE: PROMPT COMPOSER INSIDE SEARCH BOX */}
                    {!isGenerating && !currentGeneration && (
                      <div className="composer-ready-view">
                        {/* ChatGPT-Style Attached Reference Image Thumbnails */}
                        <div className="attached-references-dropzone">
                          {attachedReferences.map((ref) => (
                            <div key={ref.id} className="attached-ref-thumbnail-card">
                              <img
                                src={ref.preview}
                                alt={ref.name || 'Reference'}
                                className="attached-ref-thumb-img"
                              />
                              <button
                                type="button"
                                className="attached-ref-remove-btn"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleRemoveReference(ref.id)
                                }}
                                title="Remove reference"
                              >
                                <X size={11} />
                              </button>
                            </div>
                          ))}
                        </div>

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

                                    {/* RATIO SUB-BAR: Expands smoothly from Left -> Right */}
                                    {isRatioExpanded && (
                                      <div className="ratio-horizontal-subbar">
                                        {['1:1', '16:9', '9:16', '4:3'].map((r, idx) => (
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

                                  {/* 2. Reference Image Option */}
                                  <div
                                    className="plus-menu-row-item"
                                    onClick={() => {
                                      fileInputRef.current?.click()
                                    }}
                                  >
                                    <div className="menu-row-left">
                                      <ImagePlus size={15} className="menu-item-icon" />
                                      <span>Reference image</span>
                                    </div>
                                    <span className="menu-action-hint">Upload</span>
                                  </div>

                                  {/* 3. Preset Style Enhancer */}
                                  <div className="plus-styles-subgroup">
                                    <div className="styles-subgroup-label">
                                      <Palette size={12} />
                                      <span>Add Style Preset</span>
                                    </div>
                                    <div className="styles-pills-row">
                                      {[
                                        'Photorealistic',
                                        'Anime',
                                        '3D Octane',
                                        'Cyberpunk',
                                        'Minimalist'
                                      ].map((style) => (
                                        <button
                                          key={style}
                                          type="button"
                                          className="style-chip-btn"
                                          onClick={() => {
                                            const suffix = `, ${style.toLowerCase()} style, 8k resolution`
                                            setIdeaText((prev) => (prev ? `${prev.trim()}${suffix}` : style))
                                            showToast(`Added ${style} style ✨`)
                                            setIsPlusMenuOpen(false)
                                            setIsRatioExpanded(false)
                                            setTimeout(() => searchInputRef.current?.focus(), 50)
                                          }}
                                        >
                                          {style}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* RIGHT CONTROLS: [ Flash ▼ ] [ 🎙️ ] [ Generate ] */}
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
                                title="Select AI Model"
                              >
                                <span className="btn-flash-sheen" />
                                <Zap size={13} className="model-zap-icon zap-electric-animated" />
                                <span className="model-name">{selectedModel}</span>
                                <ChevronDown
                                  size={13}
                                  className={`model-chevron ${isModelDropdownOpen ? 'open' : ''}`}
                                />
                              </button>

                              {isModelDropdownOpen && (
                                <div className="model-dropdown-menu">
                                  {['Flash', 'Pro', 'Ultra'].map((model) => (
                                    <button
                                      key={model}
                                      type="button"
                                      className={`model-dropdown-item ${
                                        selectedModel === model ? 'active' : ''
                                      }`}
                                      onClick={() => {
                                        setSelectedModel(model)
                                        setIsModelDropdownOpen(false)
                                        showToast(`Model set to ${model}`)
                                      }}
                                    >
                                      <span>{model}</span>
                                      {selectedModel === model && <Check size={14} color="#6366f1" />}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* PRIMARY GENERATE BUTTON */}
                            <button
                              type="button"
                              className={`composer-generate-btn ${isGenerating ? 'btn-generating' : ''}`}
                              disabled={isGenerating}
                              onClick={handleGenerateFromIdea}
                              title="Generate image"
                            >
                              <span className="btn-generate-sheen" />
                              <Sparkles size={15} className={`btn-sparkle-icon ${isGenerating ? 'sparkle-spin-fast' : 'sparkle-twinkle'}`} />
                              <span className="generate-btn-text">Generate</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 2B. GENERATING STATE: LIQUID GLASS THEME NEURAL REVEAL */}
                    {isGenerating && (
                      <div className="composer-generating-view">
                        <div
                          className={`developing-image-preview blur-stage-${Math.min(generationStep, 4)}`}
                          style={{ backgroundImage: `url(${currentGeneration?.url})` }}
                        />
                        <LiquidGlassNeuralCanvas step={generationStep} />
                        <div className="glass-ambient-prism-sweep" />
                        <div className="glass-scanline-laser" />

                        <div className="generating-overlay-info">
                          <div className="generating-status-pill">
                            <span className="live-pulse-dot" />
                            <span className="generating-status-text">
                              {GENERATION_STATUS_MESSAGES[generationStep] || 'Creating your image...'}
                            </span>
                          </div>

                          <div className="generating-model-badge">
                            <Zap size={13} className="badge-zap-icon" />
                            <span>{selectedModel} Engine • {aspectRatio}</span>
                          </div>

                          {/* GLASS STOP GENERATING BUTTON */}
                          <button
                            type="button"
                            className="btn-stop-generating"
                            onClick={handleStopGenerating}
                            title="Stop generating"
                          >
                            <Square size={12} className="stop-square-icon" />
                            <span>Stop generating</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 2C. COMPLETED STATE: SETTLED IMAGE & ACTIONS INSIDE BOX */}
                    {!isGenerating && currentGeneration && (
                      <div className="composer-completed-view">
                        <img
                          src={currentGeneration.url}
                          alt={currentGeneration.prompt}
                          className={`completed-result-img ${
                            currentGeneration.isRevealing ? 'image-reveal-active' : 'image-revealed'
                          }`}
                        />

                        {/* Floating Result Light Glass Action Bar */}
                        <div className="result-glass-action-bar">
                          <div className="result-left-meta">
                            {/* [ ← Back ] Button */}
                            <button
                              type="button"
                              className="result-action-btn btn-back-action"
                              title="Back to prompt composer"
                              onClick={() => {
                                setCurrentGeneration(null)
                                setTimeout(() => searchInputRef.current?.focus(), 50)
                              }}
                            >
                              <ArrowLeft size={14} />
                              <span>Back</span>
                            </button>
                            <span className="result-ratio-chip">{currentGeneration.ratio || '1:1'}</span>
                            <span className="result-domain-chip">{currentGeneration.domain || 'Creative'}</span>
                          </div>

                          <div className="result-right-actions">
                            {/* Save Toggle Button */}
                            <button
                              type="button"
                              className={`result-action-btn ${
                                currentGeneration.saved ? 'saved-active' : ''
                              }`}
                              title={currentGeneration.saved ? 'Saved' : 'Save to gallery'}
                              onClick={() => handleToggleSave(currentGeneration.id)}
                            >
                              {currentGeneration.saved ? (
                                <>
                                  <Check size={14} />
                                  <span>Saved</span>
                                </>
                              ) : (
                                <>
                                  <Save size={14} />
                                  <span>Save</span>
                                </>
                              )}
                            </button>

                            {/* Download Inline Light Glass Dropdown */}
                            <div className="download-dropdown-wrap" ref={downloadMenuRef}>
                              <button
                                type="button"
                                className="result-action-btn btn-download-trigger"
                                onClick={() => setIsDownloadMenuOpen((prev) => !prev)}
                                title="Download image"
                              >
                                {downloadStatus === 'processing' ? (
                                  <Loader2 size={14} className="spin-loader" />
                                ) : downloadStatus === 'downloaded' ? (
                                  <Check size={14} color="#10b981" />
                                ) : (
                                  <Download size={14} />
                                )}
                                <span>Download</span>
                                <ChevronDown
                                  size={13}
                                  className={`download-chevron ${
                                    isDownloadMenuOpen ? 'open' : ''
                                  }`}
                                />
                              </button>

                              {isDownloadMenuOpen && (
                                <div className="download-glass-menu">
                                  <div className="download-menu-label">Download as</div>
                                  <button
                                    type="button"
                                    className="download-menu-item"
                                    onClick={() => handleDownloadFormat('png')}
                                  >
                                    <span>PNG</span>
                                    <span className="format-badge">Lossless</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="download-menu-item"
                                    onClick={() => handleDownloadFormat('jpg')}
                                  >
                                    <span>JPG</span>
                                    <span className="format-badge">Standard</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="download-menu-item"
                                    onClick={() => handleDownloadFormat('webp')}
                                  >
                                    <span>WEBP</span>
                                    <span className="format-badge">Modern</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2D. PROMPT-AWARE AUTOMATIC MARKETPLACE SEARCH DRAWER */}
                {matchedMarketplaceAssets.length > 0 && ideaText.trim().length >= 3 && !isGenerating && !currentGeneration && (
                  <div className="prompt-marketplace-discovery-drawer">
                    <div className="prompt-match-header">
                      <div className="prompt-match-header-left">
                        <div className="sparkle-pulse-badge">
                          <Sparkles size={12} className="sparkle-icon-animated" />
                          <span>Thamili Marketplace Match</span>
                        </div>
                        <span className="prompt-match-query-hint">
                          Found <strong>{matchedMarketplaceAssets.length}</strong> community assets matching "<em>{ideaText.slice(0, 32)}</em>"
                        </span>
                      </div>
                      <button
                        type="button"
                        className="btn-view-all-marketplace"
                        onClick={() => {
                          setMarketplaceSearchQuery(ideaText)
                          setImagesSubTab('marketplace')
                        }}
                      >
                        <span>Browse in Marketplace</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>

                    <div className="prompt-match-cards-scroll">
                      {matchedMarketplaceAssets.map((asset) => {
                        const isLicensed = myLicensedAssetIds.includes(asset.id)
                        return (
                          <div key={asset.id} className="prompt-match-card">
                            <div className="match-card-thumb-wrap">
                              <img src={asset.image} alt={asset.title} className="match-card-thumb-img" />
                              <span className="match-card-price-chip">
                                {isLicensed ? (
                                  <span className="licensed-chip-text"><Check size={10} /> Licensed</span>
                                ) : (
                                  <span>{asset.priceCredits} Cr</span>
                                )}
                              </span>
                            </div>

                            <div className="match-card-info">
                              <h4 className="match-card-title" title={asset.title}>{asset.title}</h4>
                              <div className="match-card-creator">
                                <img src={asset.creatorAvatar} alt={asset.creatorName} className="match-creator-mini-avatar" />
                                <span>{asset.creatorHandle}</span>
                              </div>
                              <div className="match-card-actions">
                                <button
                                  type="button"
                                  className="btn-match-action btn-match-use-ai"
                                  onClick={() => handleAttachMarketplaceRef(asset)}
                                  title="Attach as Reference Image into AI Composer"
                                >
                                  <ImagePlus size={12} />
                                  <span>Use in AI</span>
                                </button>
                                {isLicensed ? (
                                  <button
                                    type="button"
                                    className="btn-match-action btn-match-download"
                                    onClick={() => handleDownloadMarketplaceAsset(asset)}
                                    title="Download High-Resolution Asset"
                                  >
                                    <Download size={12} />
                                    <span>Download</span>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn-match-action btn-match-license"
                                    onClick={() => {
                                      setLicensingAsset(asset)
                                      setIsLicenseModalOpen(true)
                                    }}
                                    title={`License for ${asset.priceCredits} Credits`}
                                  >
                                    <Lock size={12} />
                                    <span>License ({asset.priceCredits} Cr)</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

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
                          <div className="template-card-badge">
                            <Sparkles size={10} className="template-badge-sparkle" />
                            <span>Ref</span>
                          </div>
                          <div className="template-card-label-wrap">
                            <span key={activeTmpl.id} className="template-card-label animated-title-fade">
                              {activeTmpl.name}
                            </span>
                          </div>
                        </div>
                      )
                    })}

                    {/* DEDICATED SEE ALL / EXPLORE 30+ CATEGORIES CARD */}
                    <div
                      className="template-card template-card-see-all"
                      onClick={() => setIsCategoriesModalOpen(true)}
                      title="Explore all 30+ creative categories & styles"
                      role="button"
                      tabIndex={0}
                    >
                      <div className="see-all-mosaic-wrap">
                        <img
                          src="/images/tamil/chettinad-mansion.jpg"
                          alt="Chettinad Vintage House"
                          className="see-all-mosaic-img"
                          loading="eager"
                        />
                        <img
                          src="/images/tamil/vintage-ambassador-1.jpg"
                          alt="Vintage Ambassador Car"
                          className="see-all-mosaic-img"
                          loading="eager"
                        />
                        <img
                          src="/images/tamil/pongal-pot.jpg"
                          alt="Village Pongal Pot"
                          className="see-all-mosaic-img"
                          loading="eager"
                        />
                        <img
                          src="/images/tamil/alanganallur-jallikattu.jpg"
                          alt="Alanganallur Jallikattu Bull"
                          className="see-all-mosaic-img"
                          loading="eager"
                        />
                      </div>
                      <div className="see-all-dark-overlay" />
                      <div className="template-card-sheen" />
                      <div className="see-all-content-overlay">
                        <div className="template-card-badge see-all-top-badge">
                          <Sparkles size={10} className="see-all-badge-sparkle" />
                          <span>30+ Styles</span>
                        </div>
                        <div className="see-all-bottom-bar">
                          <div className="see-all-pill-btn">
                            <LayoutGrid size={13} className="see-all-grid-icon" />
                            <span>See All</span>
                          </div>
                          <span className="see-all-sub-caption">30+ Categories ➔</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. CLEAN WORKSPACE FOOTER & GALLERY ACCESS */}
                <div className="workspace-clean-footer">
                  <button
                    type="button"
                    className="btn-open-gallery"
                    onClick={() => setIsGalleryOpen(true)}
                    title="Open Saved Gallery & Folders"
                  >
                    <span className="btn-gallery-sheen" />
                    <Layers size={14} className="gallery-icon-animated" />
                    <span className="gallery-btn-text">Gallery & Folders</span>
                    <span className="gallery-count-badge">{galleryImages.length}</span>
                  </button>
                </div>
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
                                showToast('Loaded prompt into studio! ✨')
                              }}
                              title="Remix Prompt in Studio"
                            >
                              <Sparkles size={13} />
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
                  onClick={() => setActiveTab('AI Image')}
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
                                          showToast('Prompt loaded into Studio! ✨')
                                        }}
                                        title="Use this prompt in Studio"
                                      >
                                        <Sparkles size={11} />
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
            className="modal-content categories-hub-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Clean Header: Search Logo Button + Input followed by Headings */}
            <div className="categories-header-clean">
              <div className="categories-search-box-clean">
                <button type="button" className="categories-search-logo-btn" title="Search styles">
                  <Search size={18} />
                </button>
                <input
                  type="text"
                  className="categories-search-input-clean"
                  placeholder="Search Tamil vintage houses, vintage cars, streets, Pongal, Diwali, Jallikattu..."
                  value={categorySearchQuery}
                  onChange={(e) => setCategorySearchQuery(e.target.value)}
                  autoFocus
                />
                {categorySearchQuery && (
                  <button
                    type="button"
                    className="categories-search-clear"
                    onClick={() => setCategorySearchQuery('')}
                    title="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="categories-header-title-block">
                <h2 className="categories-hub-title-clean">Explore Tamil Vintage & Cultural Heritage Styles</h2>
                <p className="categories-hub-sub-clean">
                  Click any image to add it directly to your search bar
                </p>
              </div>

              <button
                className="modal-close-btn categories-clean-close"
                onClick={() => setIsCategoriesModalOpen(false)}
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Visual Image Grid - Wall to wall Images with No Borders */}
            <div className="categories-hub-grid">
              {filteredCategories.length === 0 ? (
                <div className="empty-categories-state">
                  <Compass size={36} className="empty-compass-icon" />
                  <p className="empty-title">No matching Tamil vintage styles found</p>
                  <p className="empty-sub">
                    Try searching for keywords like "vintage house", "ambassador", "street", "pongal", "diwali", or "jallikattu"
                  </p>
                </div>
              ) : (
                filteredCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className="ref-gallery-card"
                    onClick={() => handleApplyCategoryPrompt(cat)}
                    title={`Click to add "${cat.name}" to search bar`}
                  >
                    {/* Full-bleed Reference Image */}
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="ref-gallery-img"
                      loading="eager"
                    />

                    {/* Gradient Overlays & Sheen */}
                    <div className="ref-card-gradient-top" />
                    <div className="ref-card-gradient-bottom" />
                    <div className="ref-card-sheen" />

                    {/* Top Field Badge */}
                    <div className="ref-card-top-bar">
                      <span className="ref-field-badge">{cat.field}</span>
                    </div>

                    {/* Bottom Info Title */}
                    <div className="ref-card-bottom-panel">
                      <h4 className="ref-card-title">{cat.name}</h4>
                    </div>
                  </div>
                ))
              )}
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
                      <Sparkles size={15} />
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

      {/* Toast notification */}
      {toast && (
        <div className="toast-notification">
          <Sparkles size={15} className="toast-sparkle" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  )
}
