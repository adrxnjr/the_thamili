from typing import List, Optional
from pydantic import BaseModel, Field


class ReferenceImage(BaseModel):
    name: Optional[str] = None
    data: str  # Base64 data URL or URL
    type: Optional[str] = None


class GenerateRequest(BaseModel):
    prompt: Optional[str] = Field(default="", description="Text prompt describing the desired image")
    aspectRatio: Optional[str] = Field(default="1:1", description="Supported aspect ratio (1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3)")
    selectedModel: Optional[str] = Field(default="Flash", description="Model selection: Flash, Pro, Ultra, Realistic")
    referenceImages: Optional[List[ReferenceImage]] = Field(default_factory=list, description="Optional reference images")


class GenerateResultData(BaseModel):
    id: str
    imageUrl: str
    prompt: str
    enhancedPrompt: Optional[str] = None
    aspectRatio: str
    dimensions: str
    model: str
    provider: str
    referenceCount: int = 0
    createdAt: str


class GenerateResponse(BaseModel):
    success: bool
    data: Optional[GenerateResultData] = None
    error: Optional[str] = None


class HealthResponse(BaseModel):
    status: str
    service: str
    timestamp: str
    version: str = "2.0.0"
