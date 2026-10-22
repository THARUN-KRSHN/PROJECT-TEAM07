# GiriRaksha backend (model + Streamlit + data contract)

Pipeline: ingest -> terrain + rainfall features -> presence-background labels -> Logistic Regression / Random Forest (/ XGBoost if installed) with spatial-block CV -> JSON exports in `static/api/`.
The frontend reads ONLY those JSON files. Without real data it runs in `demo_synthetic` mode, and every export says so. Nothing in demo mode is a real risk value.

## Run locally

Install the backend dependencies and generate the JSON exports:

```powershell
cd backend
pip install -r requirements.txt
python pipeline.py
```

Run the two backend services in separate terminals. Streamlit serves the
model console on port 8501, while FastAPI serves the API consumed by Next.js
on port 8000:

```powershell
# Terminal 1: REST API
cd backend
uvicorn api:app --host 0.0.0.0 --port 8000
```

```powershell
# Terminal 2: Streamlit model console
cd backend
streamlit run streamlit_app.py
```

Run the frontend in a third terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` for the frontend, `http://localhost:8501` for
Streamlit, and `http://localhost:8000/docs` for the FastAPI documentation.
The frontend defaults to `http://localhost:8000/api`. For a deployed API,
set `NEXT_PUBLIC_MODEL_URL` to its `/api` base URL before starting Next.js.

## Use real data (drop files in data/raw/)
| File | Source | Expected columns |
|---|---|---|
| coolr.csv | NASA COOLR | event_date, latitude, longitude, landslide_trigger |
| uglc_point.csv | UGLC point | WKT_GEOM, START DATE, PHYSICAL FACTORS |
| dem.tif | Copernicus GLO-30 tiles, mosaicked | needs `pip install rasterio` |
| imerg_daily.csv | IMERG, aggregated to DAILY mm | date, lat, lon, precip_mm |

Real mode switches on when dem.tif + imerg_daily.csv + at least one event file exist. Check the real schemas and edit the column aliases in `load_events()` if they differ. The real loaders have not been tested against actual downloads. KSDMA comparison, LSG polygon joins and Kodagu evaluation are not implemented yet (the exports mark them `not_loaded` / `not_run`).

## Deploy on Streamlit Community Cloud
1. Run `python pipeline.py` locally, then commit the whole `backend/` folder including `static/api/` and `.streamlit/config.toml` to GitHub. Static files must exist at app start.
2. share.streamlit.io -> New app -> pick the repo, set the main file to `backend/streamlit_app.py` -> Deploy.
3. Your data is now at `https://<your-app>.streamlit.app/app/static/api/locations.json`, and likewise for the other files.
4. To refresh: rebuild locally, commit and push `static/api/`. The in-app "Rebuild" button only updates the running container, and that is lost on restart.

## Backend API and frontend wiring

FastAPI exposes the generated backend data at:

| Endpoint | Contents |
|---|---|
| `/api/meta` | Model metadata and disclaimer |
| `/api/locations` | All mapped risk locations and coordinates |
| `/api/location/<slug>` | Detailed location data, including 1-, 3-, 7- and 15-day water inflow |
| `/api/risk_grid` | Risk grid points for mapping |
| `/api/research` | Model metrics, sampling counts and dataset health |
| `/api/insights` | Global feature importance |
| `/api/reports` | Risk class distribution and top locations |
| `/api/pipeline` | Pipeline stage status |

The frontend reads these endpoints through `frontend/src/lib/model.ts`:

```ts
const BASE = process.env.NEXT_PUBLIC_MODEL_URL || "http://localhost:8000/api";
export const getLocations = () => fetch(`${BASE}/locations`);
export const getLocation = (slug: string) => fetch(`${BASE}/location/${slug}`);
```

The map uses the detailed location endpoint when a marker is selected, so the
side panel displays the backend water-inflow windows and model analysis.
Location coordinates are `[latitude, longitude]` in WGS84 and are passed
directly to Leaflet/OpenStreetMap.

**CORS caveat:** I could not verify that Streamlit Cloud sends CORS headers for static files. If the browser blocks the fetch, either (a) fetch from a Next.js server component or route handler (no CORS applies), or (b) deploy `api.py` on Render/Railway: `uvicorn api:app --host 0.0.0.0 --port $PORT`, which serves the same JSON under `/api/...` with CORS enabled.

## Caveats to keep in your expo material
- Risk classes are relative percentile bands, not probabilities. Presence-background sampling does not give calibrated probabilities.
- It is a static susceptibility map, not a time-specific prediction.
- Metrics from demo mode mean nothing. Quote only metrics from real-data runs.
- UGLC is CC BY-NC 4.0. Do not count COOLR/UGLC overlaps as separate events (the loader de-duplicates by ~1 km + date).
- The Kerala mask in `_frame()` is a rough polygon. Replace it with LSG boundaries for real use.
