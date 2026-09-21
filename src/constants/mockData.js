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
    id: 'sample-flower-1',
    originalIdea: 'Vibrant pink blooming lotus in water pond',
    prompt: 'Close-up photograph of a vibrant pink blooming lotus flower in a serene water pond with crystal clear dew drops on petals, warm soft morning sunlight, 8k resolution',
    domain: 'Floral & Botanical Art',
    ratio: '4:3',
    url: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=1024&auto=format&fit=crop&q=85',
    saved: true,
    createdAt: 'Just now'
  },
  {
    id: 'sample-car-1',
    originalIdea: 'Futuristic blue cyber supercar in neon city street',
    prompt: 'Futuristic sleek modern blue and cyan supercar parked in an aesthetic neon-lit city street at dusk, gleaming reflections, ultra high detail, 8k render',
    domain: 'Automobiles & Supercars',
    ratio: '4:3',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1024&auto=format&fit=crop&q=85',
    saved: true,
    createdAt: 'Just now'
  },
  {
    id: 'sample-bike-1',
    originalIdea: 'Royal Enfield Bullet cruiser on scenic Ooty mountain road',
    prompt: 'Classic vintage Royal Enfield Bullet cruiser motorcycle parked on a picturesque green mountain road in Ooty, gleaming chrome tank, golden sunrise mist, 8k photography',
    domain: 'Motorcycles & Superbikes',
    ratio: '4:3',
    url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1024&auto=format&fit=crop&q=85',
    saved: false,
    createdAt: 'Just now'
  },
  {
    id: 'sample-nature-1',
    originalIdea: 'Scenic Courtallam cascading waterfall in rainforest',
    prompt: 'Breathtaking scenic cascading Courtallam waterfall surrounded by lush green tropical rainforest, misty water spray with gentle rainbow, 8k landscape photography',
    domain: 'Scenic Nature & Landscapes',
    ratio: '4:3',
    url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1024&auto=format&fit=crop&q=85',
    saved: true,
    createdAt: 'Just now'
  },
  {
    id: 'sample-1',
    originalIdea: 'Chettinad vintage house with teak pillars and Athangudi tiles',
    prompt: 'Authentic 19th-century Chettinad vintage ancestral mansion with massive carved Burma teak wood pillars, hand-crafted Athangudi geometric tiles, sunlit central courtyard thinnai, vintage brass urns, 8k Hasselblad photography',
    domain: 'Tamil Vintage Houses',
    ratio: '1:1',
    url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1024&auto=format&fit=crop&q=85',
    saved: true,
    createdAt: 'Aug 24'
  },
  {
    id: 'sample-2',
    originalIdea: 'Vintage Ambassador car on 1970s Madras street',
    prompt: 'Vintage 1970s Hindustan Ambassador car parked on an old Madras colonial street under rain trees, vintage typography shop boards, morning chai stall, nostalgic warm Kodachrome film color grading, 8k',
    domain: 'Tamil Vintage Cars & Streets',
    ratio: '1:1',
    url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1024&auto=format&fit=crop&q=85',
    saved: false,
    createdAt: 'Aug 24'
  },
  {
    id: 'sample-3',
    originalIdea: 'Traditional village Thai Pongal with overflowing clay pot',
    prompt: 'Traditional village Thai Pongal celebration in ancestral house open courtyard, decorated terracotta clay pot with boiling milk overflowing, open woodfire stove, tall fresh sugarcane, colorful rice flour Kolam, 8k National Geographic',
    domain: 'Tamil Pongal Festival',
    ratio: '16:9',
    url: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1024&auto=format&fit=crop&q=85',
    saved: true,
    createdAt: 'Aug 24'
  }
]

export const INITIAL_MARKETPLACE_ASSETS = [
  {
    id: 'mkt-tamil-wedding-1',
    title: 'Tamil Traditional Temple Wedding',
    description: 'Golden hour South Indian Hindu wedding ceremony inside ancient Dravidian stone temple mandapam with traditional Kanjivaram silk saree and floral jasmine garland.',
    category: 'Tamil Culture & Festivals',
    tags: ['tamil wedding', 'wedding', 'kanjivaram', 'temple', 'mandapam', 'traditional', 'jasmine', 'hindu'],
    priceCredits: 18,
    creatorName: 'Karthik Raja',
    creatorHandle: '@KarthikCinematics',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1024&auto=format&fit=crop&q=85',
    licensedCount: 42,
    createdAt: '2 days ago',
    isVerified: true,
    status: 'live',
    dimensions: '3840 x 2160',
    format: 'RAW Hi-Res'
  },
  {
    id: 'mkt-tamil-wedding-2',
    title: 'Bridal Muhurtham Saree Portrait',
    description: 'Fine art portrait of a Tamil bride in crimson bridal silk saree with traditional antique temple jewelry and fresh nadaswaram ambient aesthetic.',
    category: 'Culture & Arts',
    tags: ['bride', 'muhurtham', 'kanjivaram', 'portrait', 'jewelry', 'temple', 'wedding'],
    priceCredits: 22,
    creatorName: 'Sowmya Ramanathan',
    creatorHandle: '@SowmyaArtStudio',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1024&auto=format&fit=crop&q=85',
    licensedCount: 68,
    createdAt: '5 days ago',
    isVerified: true,
    status: 'live',
    dimensions: '4096 x 4096',
    format: 'Lossless PNG'
  },
  {
    id: 'mkt-cyberpunk-temple',
    title: 'Cyberpunk Tanjore Temple 2099',
    description: 'Futuristic sci-fi reimagination of Brihadisvara Temple with holographic neon mandalas, flying anti-gravity vimanas, and atmospheric purple rain.',
    category: 'Sci-Fi & Concept Art',
    tags: ['cyberpunk', 'tanjore', 'temple', 'futuristic', 'vimana', 'neon', 'sci-fi', 'concept art'],
    priceCredits: 25,
    creatorName: 'Dravid Neo Studios',
    creatorHandle: '@DravidCyberAI',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1024&auto=format&fit=crop&q=85',
    licensedCount: 89,
    createdAt: 'Yesterday',
    isVerified: true,
    status: 'live',
    dimensions: '3840 x 2160',
    format: '8K Master TIFF'
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
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=1024&auto=format&fit=crop&q=85',
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
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1024&auto=format&fit=crop&q=85',
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
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1024&auto=format&fit=crop&q=85',
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
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1024&auto=format&fit=crop&q=85',
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
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=1024&auto=format&fit=crop&q=85',
    licensedCount: 54,
    createdAt: '3 days ago',
    isVerified: true,
    status: 'live',
    dimensions: '3840 x 2160',
    format: 'Pro Studio 8K'
  }
]

export const INITIAL_CREATOR_TRANSACTIONS = [
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

export const MARKETPLACE_CATEGORIES = [
  'All',
  'Tamil Culture & Festivals',
  'Sci-Fi & Concept Art',
  'Architecture',
  'Nature & Landscapes',
  'Culture & Arts',
  'E-Commerce & Products'
]

export const GENERATION_STATUS_MESSAGES = [
  'Creating your image...',
  'Building the composition...',
  'Adding colors...',
  'Refining details...',
  'Almost there...'
]
