import { REFERENCE_CONCEPT_STYLES } from '../constants/styles.js'

/**
 * Unique ID generator with prefix
 */
export function createId(prefix = 'id') {
  return `${prefix}-${(Math.random() + 1).toString(36).substring(2, 9)}`
}

/**
 * AI Idea-to-Prompt Expansion Engine & Domain Classifier
 * Enriches short queries with cinematic studio camera, lighting, and cultural details.
 */
export function analyzeAndExpandIdea(rawIdea) {
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
  // 1. Flowers & Floral Art
  else if (
    /(flower|flowers|rose|roses|lotus|thamarai|jasmine|malli|malligai|sunflower|sunflowers|suriyagandhi|marigold|sammanthi|genda|bouquet|blossom|blossoms|petal|petals|hibiscus|floral|garden|botanical|orchid|tulip|daisy|poo|malar)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Floral & Botanical Art'
    if (/lotus|thamarai|water lily/i.test(lower)) {
      samplePool = ['https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=1024&auto=format&fit=crop&q=85']
    } else {
      samplePool = [
        'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=1024&auto=format&fit=crop&q=85',
        'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1024&auto=format&fit=crop&q=85'
      ]
    }
  }
  // 2. Cars & Supercars
  else if (
    /(car|cars|supercar|supercars|sports car|sportscar|sedan|hypercar|lamborghini|ferrari|porsche|audi|bmw|mercedes|race car|racing car|automobile|electric car|tesla|bugatti|mclaren|motor car|drift|drifting|van)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Automobiles & Supercars'
    samplePool = [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1024&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1024&auto=format&fit=crop&q=85'
    ]
  }
  // 3. Motorcycles & Superbikes
  else if (
    /(bike|bikes|superbike|superbikes|motorcycle|motorcycles|bullet|royal enfield|scooter|yamaha|ducati|harley|kawasaki|ninja|ktm|sports bike|cruiser bike|two wheeler|vandi)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Motorcycles & Superbikes'
    samplePool = ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1024&auto=format&fit=crop&q=85']
  }
  // 4. Nature, Waterfalls & Scenic Landscapes
  else if (
    /(nature|landscape|waterfall|waterfalls|courtallam|kutralam|hogenakkal|falls|rainforest|mountains|mountain|valley|sunrise|sunset|clouds|river|sea|ocean|beach|hills|western ghats|ooty|kodaikanal|forest|jungle|scenery|scenic)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Scenic Nature & Landscapes'
    samplePool = [
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1024&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1024&auto=format&fit=crop&q=85'
    ]
  }
  // 5. 3D Renders, Clay, Toys & Miniature Concepts
  else if (
    /(3d|clay|claymation|plushie|toy|mascot|isometric|render|octane|blender|diorama|chibi|cute figurine|character design|doll)/i.test(
      lower
    )
  ) {
    detectedDomain = '3D Renders & Concepts'
    samplePool = ['https://images.unsplash.com/photo-1563089145-599997674d42?w=1024&auto=format&fit=crop&q=85']
  }
  // 6. Food, Cuisine & Traditional Dining
  else if (
    /(food|dish|biryani|briyani|dosa|idli|vada|pongal dish|curry|sambar|thali|banana leaf|filter coffee|kaapi|parotta|chai|tea|snack|dessert|sweets|fruit|mango|spices|culinary|chef|cooking)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Food & Culinary Arts'
    samplePool = [
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1024&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1024&auto=format&fit=crop&q=85'
    ]
  }
  // 7. Tamil Vintage Houses & Courtyards
  else if (
    /(chettinad|house|mansion|palace|thinnai|courtyard|pillars|athangudi|heritage house|ancestral home|vintage architecture|veedu|manai)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Tamil Vintage Houses'
    samplePool = [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1024&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1024&auto=format&fit=crop&q=85'
    ]
  }
  // 8. Tamil Vintage Cars & Street Life
  else if (
    /(ambassador|vintage car|old car|madras street|colonial street|chennai street|rickshaw|classic street|nostalgic street|old street)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Tamil Vintage Cars & Streets'
    samplePool = [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1024&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1024&auto=format&fit=crop&q=85'
    ]
  }
  // 9. Tamil Traditional Festivals
  else if (
    /(thai pongal|pongal|sugarcane|clay pot|pongal pot|festive celebration|jallikattu|bull|pongal harvest|village festival)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Tamil Pongal Festival'
    if (/jallikattu|bull|kangayam/i.test(lower)) {
      samplePool = ['https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=1024&auto=format&fit=crop&q=85']
    } else {
      samplePool = ['https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1024&auto=format&fit=crop&q=85']
    }
  }
  // 10. Tamil Traditional Arts & Dance
  else if (
    /(bharatanatyam|dance|dancer|mudra|natya|tanjore painting|temple dancer|alta|classical dance|salangai)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Tamil Classical Arts'
    samplePool = [
      'https://images.unsplash.com/photo-1547153760-18fc86324498?w=1024&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1024&auto=format&fit=crop&q=85'
    ]
  }
  // 11. Tamil Temples & Sacred Architecture
  else if (
    /(temple|gopuram|brihadisvara|tanjore temple|madurai temple|meenakshi|mandapam|vimana|sculpture|sanctum|kovil|ancient stone)/i.test(
      lower
    )
  ) {
    detectedDomain = 'Tamil Temples & Architecture'
    samplePool = ['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1024&auto=format&fit=crop&q=85']
  }
  // Default General Fallback
  else {
    detectedDomain = 'Thamili Studio Creation'
    samplePool = [
      'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=1024&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1024&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1024&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1024&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1024&auto=format&fit=crop&q=85'
    ]
  }

  // Enhanced prompt synthesis
  const cleanIdea = idea.replace(/\.$/, '')
  let enhancedPrompt = ''

  if (detectedDomain === 'Floral & Botanical Art') {
    enhancedPrompt = `A breathtaking close-up macro fine art photograph of ${cleanIdea}, delicate crystalline dew drops catching natural sunlight on silky petals, soft ethereal morning bokeh background, studio master lighting, 8k resolution, Hasselblad lens.`
  } else if (detectedDomain === 'Automobiles & Supercars') {
    enhancedPrompt = `A stunning cinematic studio photograph of ${cleanIdea}, parked on wet reflective asphalt under futuristic neon reflections, aerodynamic curves, gloss paint finish, high dynamic range, 8k octane render, dramatic automotive lighting.`
  } else if (detectedDomain === 'Motorcycles & Superbikes') {
    enhancedPrompt = `A picturesque cinematic road photography shot of ${cleanIdea}, parked on a winding misty mountain road in the Western Ghats, gleaming chrome exhaust, golden hour sunlight flare, 8k professional magazine cover shot.`
  } else if (detectedDomain === 'Scenic Nature & Landscapes') {
    enhancedPrompt = `An expansive National Geographic wide-angle landscape photograph of ${cleanIdea}, dramatic volumetric sun rays piercing misty clouds, crystal-clear flowing waters, lush emerald greenery, ultra-crisp HDR, 8k resolution.`
  } else if (detectedDomain === '3D Renders & Concepts') {
    enhancedPrompt = `A delightful 3D claymation and concept art render of ${cleanIdea}, smooth clay texture, charming miniature scale, soft pastel studio lighting, isometric viewpoint, Octane 8k render, hyper-detailed.`
  } else if (detectedDomain === 'Food & Culinary Arts') {
    enhancedPrompt = `A mouth-watering gourmet food photography shot of ${cleanIdea}, served fresh on a pristine green banana leaf with steam rising gently, vibrant rich colors, macro culinary depth of field, 8k Hasselblad shot.`
  } else if (detectedDomain === 'Tamil Vintage Houses') {
    enhancedPrompt = `Authentic 19th-century vintage Tamil heritage architecture of ${cleanIdea}, ornate Burma teak pillars, Athangudi geometric floor tiles, sunlit central courtyard thinnai, antique brass urns, master 8k Hasselblad architectural photo.`
  } else if (detectedDomain === 'Tamil Pongal Festival') {
    enhancedPrompt = `Traditional rural Tamil Thai Pongal festival celebration of ${cleanIdea}, decorated earthen clay pot with overflowing sweet milk over open firewood, fresh green sugarcane, colorful rice Kolam, 8k National Geographic photo.`
  } else if (detectedDomain === 'Tamil Temples & Architecture') {
    enhancedPrompt = `Majestic Dravidian stone architecture of ${cleanIdea}, intricate granite gopuram carvings in warm twilight glow, oil lamps illuminating ancient corridors, sacred atmosphere, 8k ultra-high resolution.`
  } else {
    enhancedPrompt = `A stunning, hyper-detailed creative representation of ${cleanIdea}, master cinematic lighting, rich lifelike textures, atmospheric depth, perfectly balanced composition, 8k resolution octane render.`
  }

  return {
    detectedDomain,
    enhancedPrompt,
    imageUrl: samplePool[Math.floor(Math.random() * samplePool.length)]
  }
}

/**
 * Conversational Intent Detector (Handles Greetings & FAQs politely without generating random images)
 */
export function detectConversationalIntent(rawText) {
  if (!rawText) return null
  const clean = rawText.trim().toLowerCase().replace(/[!?.,:;]/g, '')
  if (!clean) return null

  // 1. Greetings
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

  // 3. Who are you / What can you do
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
