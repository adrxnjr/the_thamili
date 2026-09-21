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
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=480&auto=format&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=480&auto=format&fit=crop&q=80',
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

export const REFERENCE_TEMPLATE_SLOTS = [
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

export const IMAGE_TEMPLATES = REFERENCE_TEMPLATE_SLOTS.map((slot) => slot[0])

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
    }
  ]

  let hash = 0
  for (let i = 0; i < folderName.length; i++) {
    hash = (hash << 5) - hash + folderName.charCodeAt(i)
    hash |= 0
  }
  return dynamicPalettes[Math.abs(hash) % dynamicPalettes.length]
}
