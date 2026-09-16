import datetime
from fastapi import APIRouter, HTTPException, status
from server_py.models import (
    GenerateRequest,
    GenerateResponse,
    GenerateResultData,
    HealthResponse,
)
from server_py.services.image_service import (
    generate_image,
    SUPPORTED_ASPECT_RATIOS,
    ASPECT_RATIO_DIMENSIONS,
)

router = APIRouter(prefix="/api", tags=["Generation & AI"])


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """FastAPI AI Engine Health Check"""
    return HealthResponse(
        status="online",
        service="Thamili FastAPI Python AI Engine",
        timestamp=datetime.datetime.now(datetime.timezone.utc).isoformat(),
        version="2.0.0",
    )


@router.get("/models")
async def get_models():
    """Return available model configurations and aspect ratios"""
    return {
        "success": True,
        "models": [
            {"id": "Flash", "name": "Thamili Flash", "desc": "Ultra-fast generation with sharp details"},
            {"id": "Pro", "name": "Thamili Pro", "desc": "Enhanced lighting and Tamil cultural aesthetics"},
            {"id": "Ultra", "name": "Thamili Ultra", "desc": "Cinematic 8K masterpiece quality"},
        ],
        "aspectRatios": SUPPORTED_ASPECT_RATIOS,
        "dimensions": ASPECT_RATIO_DIMENSIONS,
    }


@router.post("/generate", response_model=GenerateResponse)
async def generate(req: GenerateRequest):
    """
    Generate an AI image with model selection and aspect ratio support.
    Accepts text prompts and optional reference images.
    """
    try:
        clean_prompt = (req.prompt or "").strip()
        refs = req.referenceImages or []

        if not clean_prompt and len(refs) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A text prompt or at least one reference image is required.",
            )

        result_dict = await generate_image(
            prompt=clean_prompt,
            aspect_ratio=req.aspectRatio or "1:1",
            selected_model=req.selectedModel or "Flash",
            reference_images=refs,
        )

        return GenerateResponse(
            success=True,
            data=GenerateResultData(**result_dict),
            error=None,
        )

    except HTTPException:
        raise
    except Exception as e:
        return GenerateResponse(
            success=False,
            data=None,
            error=str(e) or "An error occurred during image generation.",
        )
