import sys
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server_py.routes.generate import router as generate_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("[FastAPI] Thamili Python AI Engine starting on http://127.0.0.1:8000")
    print("[FastAPI] Interactive Swagger API Docs: http://127.0.0.1:8000/docs")
    print("[FastAPI] Endpoint ready: POST http://127.0.0.1:8000/api/generate")
    yield
    print("[FastAPI] Thamili Python AI Engine shutting down...")


app = FastAPI(
    title="Thamili AI Backend (FastAPI)",
    description="High-performance async Python backend powering Thamili AI image generation and cultural prompt intelligence.",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# Enable CORS for Vite frontend and Node.js gateway
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(generate_router)


@app.get("/")
def root():
    return {
        "service": "Thamili FastAPI Python AI Engine",
        "status": "online",
        "docs": "/docs",
        "version": "2.0.0",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server_py.main:app", host="127.0.0.1", port=8000, reload=True)
