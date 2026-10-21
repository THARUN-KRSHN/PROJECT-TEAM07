"""Optional REST wrapper (FastAPI) over the exported JSON. Run: uvicorn api:app --host 0.0.0.0 --port 8000
Use this if the browser blocks cross-origin reads from Streamlit static serving."""
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import config as C, pipeline

app = FastAPI(title="GiriRaksha model API")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["GET"], allow_headers=["*"])  # restrict to your frontend origin in production

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
    if slug not in C.SEED_LOCATIONS:
        raise HTTPException(404, "unknown location")
    return _read(f"location/{slug}.json")
