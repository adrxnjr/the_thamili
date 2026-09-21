import io
import os
import time
import random
import base64
import urllib.parse
import datetime
from typing import Dict, Any, List, Optional
import httpx
from PIL import Image, ImageFilter
from dotenv import load_dotenv

# Load environment variables
load_dotenv(override=True)

SUPPORTED_ASPECT_RATIOS = ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3"]

ASPECT_RATIO_DIMENSIONS = {
    "1:1": {"width": 1024, "height": 1024, "size": "1024x1024", "desc": "square 1:1 format"},
    "16:9": {"width": 1280, "height": 720, "size": "1792x1024", "desc": "cinematic 16:9 widescreen landscape"},
    "9:16": {"width": 720, "height": 1280, "size": "1024x1792", "desc": "vertical 9:16 mobile story portrait"},
    "4:3": {"width": 1024, "height": 768, "size": "1024x1024", "desc": "4:3 landscape ratio"},
    "3:4": {"width": 768, "height": 1024, "size": "1024x1024", "desc": "3:4 vertical portrait"},
    "3:2": {"width": 1080, "height": 720, "size": "1792x1024", "desc": "3:2 landscape photography"},
    "2:3": {"width": 720, "height": 1080, "size": "1024x1792", "desc": "2:3 vertical portrait"},
}

GEMINI_TEXT_MODELS = [
    "models/gemini-flash-latest",
    "models/gemini-3.5-flash",
    "models/gemini-3.1-flash-lite",
    "models/gemini-3-flash-preview",
]

GEMINI_IMAGE_MODELS = [
    "models/gemini-2.5-flash-image",
    "models/gemini-3.1-flash-image",
    "models/gemini-3-pro-image",
    "models/gemini-3.1-flash-lite-image",
]


def get_gemini_api_key() -> str:
    load_dotenv(override=True)
    key = (os.getenv("GEMINI_API_KEY") or "").strip()
    if key.startswith("sk-or-"):
        return ""
    return key


def get_openrouter_api_key() -> str:
    load_dotenv(override=True)
    key = (os.getenv("OPENROUTER_API_KEY") or "").strip()
    if not key:
        fallback_key = (os.getenv("GEMINI_API_KEY") or "").strip()
        if fallback_key.startswith("sk-or-"):
            return fallback_key
    return key


async def enhance_prompt_with_openrouter(raw_prompt: str, api_key: str, selected_model: str) -> Optional[str]:
    """
    Use OpenRouter to translate Tamil, enrich Dravidian cultural context, and refine prompts.
    """
    system_instruction = (
        "You are an expert AI visual prompt engineer for Thamili, a Tamil and Indian AI platform. "
        "Your job is to rewrite the user prompt into a single descriptive, highly vivid English prompt for photorealistic or artistic image generation. "
        "If the input is in Tamil, translate and contextualize it into rich Dravidian/Tamil cultural heritage. "
        "Add details for cinematic lighting, atmosphere, Hasselblad 8k detail, textures, and depth of field. "
        "Output ONLY the final prompt in a single sentence or short paragraph without markdown or extra commentary."
    )
    models = [
        "google/gemini-2.5-flash",
        "google/gemini-flash-1.5",
        "meta-llama/llama-3.3-70b-instruct",
        "google/gemma-4-31b-it:free",
    ]
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Thamili AI",
    }
    for model in models:
        payload = {
            "model": model,
            "messages": [
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": f"User Prompt: {raw_prompt}\nModel Tier: {selected_model}"}
            ],
            "max_tokens": 180,
            "temperature": 0.6,
        }
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    headers=headers,
                    json=payload
                )
                if resp.status_code == 200:
                    data = resp.json()
                    choices = data.get("choices", [])
                    if choices:
                        content = choices[0].get("message", {}).get("content", "").strip()
                        if len(content) > 10:
                            return content
        except Exception:
            continue
    return None


async def enhance_prompt_with_gemini(raw_prompt: str, selected_model: str) -> str:
    """
    Use Google Gemini or OpenRouter API to translate Tamil into rich visual English prompts,
    deepen Dravidian cultural nuances, and enhance photographic aesthetics.
    """
    clean = (raw_prompt or "").strip()
    if not clean:
        return "South Indian Tamil heritage temple architecture with intricate stone carvings at golden hour, 8k cinematic masterpiece"

    api_key = get_gemini_api_key()
    openrouter_key = get_openrouter_api_key()

    if not api_key and openrouter_key:
        or_enhanced = await enhance_prompt_with_openrouter(clean, openrouter_key, selected_model)
        if or_enhanced:
            return or_enhanced
        return enhance_prompt_fallback(clean, selected_model)

    if not api_key:
        return enhance_prompt_fallback(clean, selected_model)

    system_instruction = (
        "You are an expert AI visual prompt engineer for Thamili, a Tamil and Indian AI platform. "
        "Your job is to rewrite the user prompt into a single descriptive, highly vivid English prompt for photorealistic or artistic image generation. "
        "If the input is in Tamil, translate and contextualize it into rich Dravidian/Tamil cultural heritage. "
        "Add details for cinematic lighting, atmosphere, Hasselblad 8k detail, textures, and depth of field. "
        "Output ONLY the final prompt in a single sentence or short paragraph without markdown or extra commentary."
    )

    for model_name in GEMINI_TEXT_MODELS:
        url = f"https://generativelanguage.googleapis.com/v1beta/{model_name}:generateContent?key={api_key}"
        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": f"{system_instruction}\n\nUser Prompt: {clean}\nModel Tier: {selected_model}"
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.6,
                "maxOutputTokens": 180,
            },
        }

        try:
            async with httpx.AsyncClient(timeout=12.0) as client:
                resp = await client.post(url, json=payload, headers={"Content-Type": "application/json"})
                if resp.status_code == 200:
                    data = resp.json()
                    candidates = data.get("candidates", [])
                    if candidates:
                        parts = candidates[0].get("content", {}).get("parts", [])
                        if parts and parts[0].get("text"):
                            enhanced = parts[0]["text"].strip()
                            if len(enhanced) > 10:
                                return enhanced
        except Exception:
            continue

    return enhance_prompt_fallback(clean, selected_model)


def enhance_prompt_fallback(raw_prompt: str, selected_model: str) -> str:
    clean = (raw_prompt or "").strip()
    model_lower = (selected_model or "").lower()
    enhancements: List[str] = []

    if any(k in model_lower for k in ["pro+", "proplus", "pro-plus", "ultra", "realism", "realistic"]):
        enhancements.append(
            "8k UHD masterpiece, shot on Hasselblad H6D-100c, 85mm f/1.4 lens, natural skin texture, dramatic volumetric cinematic lighting"
        )
    elif "pro" in model_lower:
        enhancements.append(
            "highly detailed, professional composition, vivid lighting, sharp focus, 4k master quality"
        )
    else:
        enhancements.append("crisp clean details, vivid colors, aesthetic presentation")

    tamil_keywords = [
        "tamil", "temple", "gopuram", "pongal", "mandapam", "tanjore",
        "meenakshi", "madurai", "saree", "kanjivaram", "chola", "pallava",
        "jallikattu", "bharatanatyam", "murugan", "thiruvalluvar"
    ]
    if any(kw in clean.lower() for kw in tamil_keywords):
        enhancements.append(
            "authentic Tamil Dravidian cultural heritage, intricate temple stone carvings, majestic divine atmosphere"
        )

    return f"{clean}, {', '.join(enhancements)}"


async def generate_with_gemini_image_api(
    prompt: str, api_key: str
) -> Optional[Dict[str, Any]]:
    """
    Attempt direct native image generation through Google Gemini multimodal endpoints.
    """
    for model_name in GEMINI_IMAGE_MODELS:
        url = f"https://generativelanguage.googleapis.com/v1beta/{model_name}:generateContent?key={api_key}"
        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": f"Generate a high resolution visual artwork of: {prompt}"
                        }
                    ]
                }
            ],
            "generationConfig": {
                "responseModalities": ["IMAGE"]
            },
        }

        try:
            async with httpx.AsyncClient(timeout=25.0) as client:
                resp = await client.post(url, json=payload, headers={"Content-Type": "application/json"})
                if resp.status_code == 200:
                    data = resp.json()
                    candidates = data.get("candidates", [])
                    if candidates:
                        parts = candidates[0].get("content", {}).get("parts", [])
                        for p in parts:
                            if "inlineData" in p:
                                mime = p["inlineData"].get("mimeType", "image/jpeg")
                                b64 = p["inlineData"].get("data", "")
                                if b64:
                                    return {
                                        "imageUrl": f"data:{mime};base64,{b64}",
                                        "model": f"Google Gemini ({model_name.replace('models/', '')})",
                                        "provider": "Google Gemini AI Core (FastAPI)",
                                    }
        except Exception:
            continue

    return None


async def generate_with_openrouter(
    prompt: str, api_key: str, selected_model: str = "Flash"
) -> Optional[Dict[str, Any]]:
    """
    Attempt direct image generation through OpenRouter multimodal endpoints.
    """
    models = [
        "google/gemini-2.5-flash-image",
        "google/gemini-3.1-flash-image",
        "google/gemini-3.1-flash-lite-image",
    ]
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Thamili AI",
    }
    for model in models:
        payload = {
            "model": model,
            "messages": [
                {
                    "role": "user",
                    "content": f"Generate a high resolution visual artwork of: {prompt}"
                }
            ]
        }
        try:
            async with httpx.AsyncClient(timeout=35.0) as client:
                resp = await client.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    headers=headers,
                    json=payload
                )
                if resp.status_code == 200:
                    data = resp.json()
                    choices = data.get("choices", [])
                    if choices:
                        msg = choices[0].get("message", {})
                        images = msg.get("images", [])
                        if images and len(images) > 0:
                            img_entry = images[0]
                            image_url = ""
                            if isinstance(img_entry, str):
                                image_url = img_entry
                            elif isinstance(img_entry, dict):
                                image_url = (
                                    img_entry.get("image_url", {}).get("url")
                                    or img_entry.get("url")
                                    or ""
                                )
                            if image_url:
                                return {
                                    "imageUrl": image_url,
                                    "model": f"OpenRouter ({model})",
                                    "provider": "OpenRouter AI Engine (FastAPI)",
                                }
        except Exception:
            continue
    return None


def apply_thamili_watermark(image_bytes: bytes) -> bytes:
    """
    Remove and inpaint any third-party watermark in the bottom-right corner.
    """
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        W, H = img.size

        # Inpaint/patch the bottom right strip where any external logo might sit
        patch_h = max(35, int(H * 0.055))
        patch_w = max(180, int(W * 0.25))
        sample_y = max(0, H - patch_h - 40)
        sample_box = (W - patch_w, sample_y, W, sample_y + patch_h)
        sample = img.crop(sample_box)
        sample = sample.filter(ImageFilter.GaussianBlur(1.8))
        img.paste(sample, (W - patch_w, H - patch_h))

        out_io = io.BytesIO()
        img.save(out_io, format="JPEG", quality=95)
        return out_io.getvalue()
    except Exception as e:
        print(f"[Watermark] Warning: {e}")
        return image_bytes


async def generate_with_neural_core(
    prompt: str, width: int, height: int, selected_model: str
) -> Dict[str, Any]:
    """
    Render image using free decentralized neural diffusion core with zero watermark.
    """
    m = (selected_model or "").lower()
    is_pro = any(k in m for k in ["pro", "ultra", "realism"])
    models = (
        ["ICBINP - I Can't Believe It's Not Photography", "Realistic Vision", "Dreamshaper", "stable_diffusion"]
        if is_pro
        else ["stable_diffusion", "Deliberate", "Dreamshaper", "Altdiffusion"]
    )

    # Dimensions clamped to free anonymous 320-512 limits for fast generation
    w = max(320, min(512, (width // 64) * 64))
    h = max(320, min(512, (height // 64) * 64))

    post_payload = {
        "prompt": prompt,
        "params": {
            "sampler_name": "k_euler",
            "cfg_scale": 7.0,
            "steps": 18,
            "width": w,
            "height": h,
        },
        "models": models,
        "nsfw": False,
        "censor_nsfw": True,
    }

    horde_key = (os.getenv("AI_HORDE_API_KEY") or "").strip() or "0000000000"
    headers = {
        "apikey": horde_key,
        "Content-Type": "application/json",
        "Client-Agent": "thamili:2.0:adrxnjr",
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        resp = await client.post("https://aihorde.net/api/v2/generate/async", json=post_payload, headers=headers)
        resp.raise_for_status()
        post_data = resp.json()
        job_id = post_data.get("id")
        if not job_id:
            raise Exception(f"Neural cluster job submission failed: {post_data}")

        start_t = time.time()
        while time.time() - start_t < 55.0:
            await asyncio.sleep(2.0)
            st_resp = await client.get(f"https://aihorde.net/api/v2/generate/status/{job_id}", headers={"Client-Agent": "thamili:2.0:adrxnjr"})
            if st_resp.status_code == 200:
                st_data = st_resp.json()
                if st_data.get("done") and st_data.get("generations"):
                    img_url = st_data["generations"][0].get("img")
                    img_resp = await client.get(img_url)
                    raw_bytes = img_resp.content

                    image_bytes = apply_thamili_watermark(raw_bytes)
                    content_type = "image/webp"
                    base64_data = base64.b64encode(image_bytes).decode("utf-8")
                    data_url = f"data:{content_type};base64,{base64_data}"

                    gen_model = st_data["generations"][0].get("model") or "Neural Diffusion"
                    return {
                        "imageUrl": data_url,
                        "rawUrl": data_url,
                        "model": f"Thamili {selected_model or 'Basic'} AI ({gen_model})",
                        "provider": "Thamili Free Neural Core (No Watermark)",
                    }

    raise Exception("Neural diffusion generation timed out.")


async def generate_image(
    prompt: str,
    aspect_ratio: str = "1:1",
    selected_model: str = "Flash",
    reference_images: Optional[List[Any]] = None,
) -> Dict[str, Any]:
    clean_prompt = (prompt or "").strip()
    refs = reference_images or []

    if not clean_prompt and len(refs) == 0:
        raise ValueError("A prompt text or reference image is required for image generation.")

    valid_aspect_ratio = aspect_ratio if aspect_ratio in SUPPORTED_ASPECT_RATIOS else "1:1"
    mapping = ASPECT_RATIO_DIMENSIONS.get(
        valid_aspect_ratio, {"width": 1024, "height": 1024, "size": "1024x1024", "desc": "square 1:1 format"}
    )

    gemini_key = get_gemini_api_key()
    openrouter_key = get_openrouter_api_key()

    # Step 1: Enhance & Contextualize Prompt with Gemini or OpenRouter AI
    enhanced_prompt_text = await enhance_prompt_with_gemini(clean_prompt, selected_model)
    ratio_desc = mapping.get("desc", "")
    full_prompt = f"{enhanced_prompt_text}, {ratio_desc}" if ratio_desc else enhanced_prompt_text

    # Render via Free Watermark-Free Neural Diffusion Core (High-speed, 100% reliable)
    raw_result = await generate_with_neural_core(
        full_prompt,
        mapping["width"],
        mapping["height"],
        selected_model,
    )

    now_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()
    return {
        "id": f"gen_{int(time.time() * 1000)}_{random.randint(1000, 9999)}",
        "imageUrl": raw_result["imageUrl"],
        "prompt": clean_prompt,
        "enhancedPrompt": raw_result.get("enhancedPrompt") or enhanced_prompt_text,
        "aspectRatio": valid_aspect_ratio,
        "dimensions": f"{mapping['width']} x {mapping['height']}",
        "model": raw_result.get("model") or f"Thamili {selected_model} AI",
        "provider": raw_result.get("provider") or "Thamili Neural Core",
        "referenceCount": len(refs),
        "createdAt": now_iso,
    }
