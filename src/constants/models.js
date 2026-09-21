import { Zap, Gem, Crown, ShoppingBag, UserCheck, Layers, ShieldCheck } from 'lucide-react'

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
    icon: Gem,
    color: '#8b5cf6',
    engineModel: 'flux'
  },
  {
    id: 'Master',
    name: 'Master',
    shortName: 'Master',
    badge: 'Master 8K',
    desc: 'Supreme UHD photorealism with cinematic studio lighting',
    category: 'Ultra Tier',
    icon: Crown,
    color: '#f59e0b',
    engineModel: 'kontext'
  }
]

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
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1024&auto=format&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1024&auto=format&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1024&auto=format&fit=crop&q=80',
    resolution: '4500 x 3000 (Hasselblad 8K)',
    orientation: 'Landscape (3:2)',
    fileFormat: 'RAW Hi-Res',
    fileSize: '5.1 MB'
  }
]

export const INSPIRATIONAL_PROMPTS = [
  'Futuristic neon sports car cruising along Chennai ECR highway under midnight rain',
  'Ancient Thanjavur Brihadisvara Temple illuminated with floating golden celestial lamps',
  'Cyberpunk Tamil warrior in glowing bio-luminescent armor with energized plasma sword',
  'Traditional South Indian Kanjivaram silk weaver in sunlight with intricate golden zari',
  'Ethereal misty Nilgiris tea hills at dawn with golden sun rays filtering through clouds',
  'Majestic Chola naval fleet sailing through golden sunset ocean waters in 8k detail',
  'Hyperrealistic portrait of Bharatanatyam dancer with intricate temple jewelry and expressive mudra',
  'Cozy futuristic Dravidian living room overlooking floating sky-temple gardens at twilight',
  'Divine Lord Murugan in cosmic temple mandala surrounded by glowing peacocks and sacred light',
  'High-speed hypercar concept with sleek aerodynamic lines in futuristic Singapore skyline'
]
