import { Zap, Gem, Crown } from 'lucide-react'

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
