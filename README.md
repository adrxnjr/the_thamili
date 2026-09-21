# 🌸 THAMILI AI 2.0 (தமிழி) — Creative Multimodal AI Studio

> **One AI. Infinite Possibilities.**  
> A Next-Generation Tamil & Indian Cultural Heritage Multimodal AI Studio featuring high-fidelity text-to-image generation, ChatGPT-style 3D particle physics, smart folders, reference concept matching, and responsive aspect ratio layout.

---

## 🚀 Key Features

- **🎨 Multi-Provider Neural Diffusion Pipeline**:
  - Seamless generation across **Hugging Face (FLUX.1-schnell & SDXL)**, **Together AI**, **OpenRouter AI**, **OpenAI (DALL-E 3)**, **Stability AI**, **DeepInfra**, **AI Horde**, and native **Thamili HD Cloud Diffusion**.
  - **Zero Watermark Guarantee**: Automated high-precision edge clean up and seamless alpha-feathered blending.
  - **100% Free & Active Out-of-the-Box**: Works instantly without mandatory API keys, with full optional API key customization in `.env`.

- **⚛️ 3D Tamil Glyph Neural Sphere Canvas (Fibonacci Particle Engine)**:
  - 340 Fibonacci-distributed Tamil glyph nodes in continuous 3D rotation (`Yaw`, `Pitch`, `Roll`).
  - **Interactive Physics**:
    - **🧲 Hover Inward Collapse**: Gravitational contraction when entering the generation area.
    - **💥 Kinetic Cursor Splash**: Moving the cursor fast flings letters outwards in the direction of velocity with neon pink (`#ff2a85`) & electric blue (`#3b82f6`) bloom.
    - **📦 Box Boundary Containment**: Letters bounce elastically off the canvas box borders (`vx *= -0.7`, `vy *= -0.7`).
    - **🔄 Damped Harmonic Spring Recovery**: Smoothly reorganizes letters back into the rotating 3D sphere.
    - **⚡ Supernova Click Impulse**: Clicking the canvas scatters letters in 360° radial shockwaves.

- **📐 Screen-Harmonized Aspect Ratios**:
  - Balanced vertical height (~`305px`) across all aspect ratios (**1:1**, **16:9**, **9:16**, **4:3**, **3:4**, **3:2**, **2:3**) to ensure perfect viewport fit above the floating prompt composer.

- **📁 Smart Gallery & Categorized Folders**:
  - Dynamic folder color theme engine (Rose Pink, Violet Purple, Sunset Orange, Emerald Green, Cyan Teal, Golden Amber).
  - Search, lightbox preview, resolution upscaling, one-click prompts remixing, and multi-format downloads (PNG, JPG, WEBP).

- **🛡️ Enterprise Reliability**:
  - Built-in React Error Boundary protecting against white-screen state crashes.
  - Fast Vite Dev Server with integrated API middleware.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 8, Lucide Icons, Canvas 2D Physics Engine, Modern Vanilla CSS with Apple & Glassmorphism Design Systems.
- **Backend**: Node.js 24 (Express Gateway, Sharp image rasterization), Optional FastAPI Python Engine.
- **Image Processing**: `sharp` (High-speed multi-threaded image resizing, watermarking, and Gaussian inpainting).

---

## 🔑 Environment Configuration (`.env`)

Configure your Hugging Face API Key in [`.env`](file:///c:/antigravity/thamili/.env):

```env
PORT=3001

# 1. Hugging Face API (Chat Completions & Image Generation)
# Get your free token from https://huggingface.co/settings/tokens
HF_TOKEN=your_hugging_face_token_here
HUGGINGFACE_API_KEY=your_hugging_face_token_here
HF_CHAT_MODEL=meta-llama/Llama-2-7b-chat-hf
```

### 📡 Hugging Face Chat Completions Endpoint
```bash
curl -X POST https://api.huggingface-apis.com/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/Llama-2-7b-chat-hf",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Hello!"
      }
    ]
  }'
```

# 4. OpenAI (DALL-E 3 / DALL-E 2)
OPENAI_API_KEY=

# 5. Stability AI (Stable Diffusion XL / Ultra)
STABILITY_API_KEY=

# 6. DeepInfra (FLUX.1-schnell & SDXL)
DEEPINFRA_API_KEY=

# 7. AI Horde (Decentralized GPU Grid)
AI_HORDE_API_KEY=

# 8. Custom Web Link / API Endpoint
IMAGE_API_URL=
```

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` (or `http://localhost:5174`) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 🏛️ Project Structure

```
thamili/
├── public/                 # Static public assets
├── server/
│   ├── data/               # Persistent JSON chat & image history
│   ├── routes/             # Express API route endpoints (/api/generate, /api/history)
│   ├── services/
│   │   └── imageService.js # Multi-provider AI image generation & diffusion dispatcher
│   └── index.js            # Node Express backend gateway
├── server_py/              # Optional FastAPI microservice
├── src/
│   ├── assets/             # Logos, watermarks, SVG graphics
│   ├── components/         # Modular React components
│   │   ├── DotMatrixWaveCanvas.jsx  # 3D Tamil Particle Sphere physics engine
│   │   ├── BackgroundWaves.jsx     # Ambient hardware-accelerated aurora background
│   │   ├── ErrorBoundary.jsx       # Global application crash recovery
│   │   └── ThamiliIcons.jsx        # Vector brand logos & wordmarks
│   ├── constants/          # Application constants & theme engines
│   │   ├── mockData.js     # Default chat histories, gallery images & marketplace assets
│   │   ├── models.js       # AI model tiers, licenses & prompt presets
│   │   └── styles.js       # Reference styles, slots & dynamic folder themes
│   ├── services/
│   │   ├── api.js          # Clean frontend API client
│   │   └── promptEngine.js # AI prompt expansion & conversational intent detector
│   ├── App.css             # Design system, glassmorphism tokens & animations
│   ├── App.jsx             # Main Studio workspace
│   ├── index.css           # Global typography & root variables
│   └── main.jsx            # React root mounting
├── .env                    # Active environment variables
├── .env.example            # Environment template
├── package.json
└── vite.config.js          # Vite config & integrated dev API middleware
```

---

## 📜 License

Created with ❤️ for Tamil & World Creators. All rights reserved.
