"""Optional REST wrapper (FastAPI) over the exported JSON. Run: uvicorn api:app --host 0.0.0.0 --port 8000
Use this if the browser blocks cross-origin reads from Streamlit static serving."""
import json
import os
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import config as C, pipeline
from services import build_context, fallback_insight
from gemini import generate_insight
from weather import WeatherError, get_weather

app = FastAPI(title="GiriRaksha model API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in os.getenv("ALLOWED_ORIGINS", "*").split(",") if origin.strip()],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)  # restrict to your frontend origin in production

def _read(name):
    p = C.API_DIR / name
    if not p.exists():
        pipeline.run()
    return json.loads(p.read_text())

@app.get("/api/{name}")
def get_doc(name: str):
    if name not in {"meta", "locations", "risk_grid", "insights", "research", "reports", "pipeline"}:
        raise HTTPException(404)
    return _read(f"{name}.json")

@app.get("/api/location/{slug}")
def get_location(slug: str):
    if not slug.replace("-", "").isalnum():
        raise HTTPException(404, "unknown location")
    return _read(f"location/{slug}.json")


def _location_or_404(slug: str) -> dict:
    if not slug.replace("-", "").isalnum():
        raise HTTPException(404, "unknown location")
    return _read(f"location/{slug}.json")


@app.get("/api/location/{slug}/weather")
def get_location_weather(
    slug: str,
    timeout: float = Query(default=8.0, gt=0.5, le=15.0),
):
    location = _location_or_404(slug)
    try:
        return get_weather(location["lat"], location["lon"], timeout=timeout)
    except WeatherError as exc:
        raise HTTPException(503, "weather data is temporarily unavailable") from exc


@app.get("/api/location/{slug}/context")
def get_location_context(slug: str):
    location = _location_or_404(slug)
    location["meta"] = _read("meta.json")
    weather = None
    try:
        weather = get_weather(location["lat"], location["lon"])
    except WeatherError:
        pass
    return build_context(location, weather)


@app.get("/api/location/{slug}/insights")
def get_location_insights(slug: str):
    return fallback_insight(get_location_context(slug))


@app.post("/api/location/{slug}/insights/generate")
def generate_location_insights(slug: str):
    return generate_insight(get_location_context(slug))
