/**
 * THAMILI AI 2.0 - Studio Mock Datasets & Default States
 * Cloud-hosted CDN visual assets (Zero local image file dependencies).
 */

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
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1024&auto=format&fit=crop&q=85',
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
        url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1024&auto=format&fit=crop&q=85',
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
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1024&auto=format&fit=crop&q=85',
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
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1024&auto=format&fit=crop&q=85',
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
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1024&auto=format&fit=crop&q=85',
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
        url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1024&auto=format&fit=crop&q=85',
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
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1024&auto=format&fit=crop&q=85',
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
        url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1024&auto=format&fit=crop&q=85',
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
    image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=1024&auto=format&fit=crop&q=85',
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
        url: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=1024&auto=format&fit=crop&q=85',
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
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1024&auto=format&fit=crop&q=85',
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
        url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1024&auto=format&fit=crop&q=85',
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
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1024&auto=format&fit=crop&q=85',
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
        url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1024&auto=format&fit=crop&q=85',
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
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1024&auto=format&fit=crop&q=85',
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
        url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1024&auto=format&fit=crop&q=85',
        isGenerating: false,
        saved: false,
        liked: false,
        disliked: false,
        createdAt: '1h ago'
      }
    ]
  }
]

export const INITIAL_IMAGES = [
  {
    id: 'tamil-people-1',
    folderId: 'domain-people',
    folderName: 'People',
    originalIdea: 'Traditional Bharatanatyam classical dancer in golden temple mandapam',
    prompt: 'Graceful Tamil classical Bharatanatyam dancer in traditional maroon and gold silk costume, ornate temple jewelry, expressive mudra pose in an ancient stone temple mandapam, dramatic chiaroscuro lighting, 8k cinematic photography',
    domain: 'People',
    ratio: '1:1',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1024&auto=format&fit=crop&q=85',
    saved: true,
    createdAt: 'Just now'
  },
  {
    id: 'tamil-nature-1',
    folderId: 'domain-nature',
    folderName: 'Nature',
    originalIdea: 'Scenic Nilgiris tea plantations in misty mountain sunrise',
    prompt: 'Breathtaking rolling emerald green tea estates in Nilgiris Ooty mountains, soft morning sun rays piercing through floating white mist, serene valley vista, 8k National Geographic landscape',
    domain: 'Nature',
    ratio: '16:9',
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1024&auto=format&fit=crop&q=85',
    saved: true,
    createdAt: 'Just now'
  },
  {
    id: 'tamil-animals-1',
    folderId: 'domain-animals',
    folderName: 'Animals',
    originalIdea: 'Royal Tamil temple elephant adorned in golden nettipattam',
    prompt: 'Magnificent Tamil heritage temple elephant adorned in traditional gold nettipattam head ornament and colorful ceremonial silks, walking majestically through temple corridor, warm divine glow, 8k photography',
    domain: 'Animals',
    ratio: '1:1',
    url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=1024&auto=format&fit=crop&q=85',
    saved: true,
    createdAt: 'Just now'
  },
  {
    id: 'tamil-places-1',
    folderId: 'domain-places',
    folderName: 'Places',
    originalIdea: 'Thanjavur Brihadeeswarar Big Temple monumental stone gopuram',
    prompt: 'Monumental 1000-year-old Thanjavur Brihadeeswarar Big Temple towering granite Vimana gopuram at golden sunset, intricate Chola architectural stone carvings, reflective temple pond, 8k architectural masterpiece',
    domain: 'Places',
    ratio: '16:9',
    url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1024&auto=format&fit=crop&q=85',
    saved: true,
    createdAt: 'Just now'
  },
  {
    id: 'tamil-education-1',
    folderId: 'domain-education',
    folderName: 'Education',
    originalIdea: 'Ancient Tamil palm-leaf manuscripts and classical literature',
    prompt: 'Ancient Tamil palm-leaf Olai Chuvadi manuscripts inscribed with classic Sangam poetry and Thirukkural verses, bronze stylus, oil lamp illumination, wooden scholar desk, 8k macro photography',
    domain: 'Education',
    ratio: '1:1',
    url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1024&auto=format&fit=crop&q=85',
    saved: true,
    createdAt: 'Just now'
  },
  {
    id: 'tamil-art-1',
    folderId: 'domain-art',
    folderName: 'Art',
    originalIdea: 'Traditional Tanjore gold foil painting with rich gemstone inlays',
    prompt: 'Masterpiece classical Thanjavur Tanjore painting with 22-carat gold foil relief work, semi-precious gem inlays, vivid mineral pigments, ornate teak wood frame, heritage Indian fine art, 8k',
    domain: 'Art',
    ratio: '1:1',
    url: 'https://images.unsplash.com/photo-1578925518470-4def7a0f08bb?w=1024&auto=format&fit=crop&q=85',
    saved: true,
    createdAt: 'Just now'
  },
  {
    id: 'tamil-tech-1',
    folderId: 'domain-technology',
    folderName: 'Technology',
    originalIdea: 'Cyberpunk Tamil futuristic neon temple city in 2099',
    prompt: 'Futuristic Cyberpunk Chennai 2099 smart city skyline, towering holographic Dravidian temple gopurams glowing with neon Tamil typography, flying autonomous vehicles, wet reflective glass streets, 8k Unreal Engine 5 render',
    domain: 'Technology',
    ratio: '16:9',
    url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1024&auto=format&fit=crop&q=85',
    saved: true,
    createdAt: 'Just now'
  },
  {
    id: 'tamil-food-1',
    folderId: 'domain-food',
    folderName: 'Food',
    originalIdea: 'Traditional Tamil banana leaf feast with crispy dosa and filter coffee',
    prompt: 'Lavish traditional South Indian Tamil festive meal served on a fresh green banana leaf with golden crispy ghee roast dosa, piping hot sambar, coconut chutneys, medu vada, and frothy brass filter coffee, 8k culinary photography',
    domain: 'Food',
    ratio: '1:1',
    url: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=1024&auto=format&fit=crop&q=85',
    saved: true,
    createdAt: 'Just now'
  },
  {
    id: 'tamil-products-1',
    folderId: 'domain-products',
    folderName: 'Products',
    originalIdea: 'Handcrafted pure Kanchipuram silk saree with rich gold zari',
    prompt: 'Luxurious authentic handwoven Kanchipuram pure silk saree with intricate pure gold zari temple border and peacock motifs, accompanied by traditional brass Kuthu Vilakku lamp, rich fabric texture, 8k studio product photography',
    domain: 'Products',
    ratio: '1:1',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1024&auto=format&fit=crop&q=85',
    saved: true,
    createdAt: 'Just now'
  }
]

export const GENERATION_STATUS_MESSAGES = [
  'Creating your image...',
  'Building the composition...',
  'Adding colors...',
  'Refining details...',
  'Almost there...'
]

