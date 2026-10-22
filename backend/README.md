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

Current deployed services:

- Frontend: [https://giri-rakshaa.vercel.app/](https://giri-rakshaa.vercel.app/)
- FastAPI: [https://project-team07.onrender.com](https://project-team07.onrender.com)
- API base URL: `https://project-team07.onrender.com/api`

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
const BASE = process.env.NEXT_PUBLIC_MODEL_URL || "https://project-team07.onrender.com/api";
export const getLocations = () => fetch(`${BASE}/locations`);
export const getLocation = (slug: string) => fetch(`${BASE}/location/${slug}`);
```

The map uses the detailed location endpoint when a marker is selected, so the
side panel displays the backend water-inflow windows and model analysis.
Location coordinates are `[latitude, longitude]` in WGS84 and are passed
directly to Leaflet/OpenStreetMap.

## Customized reports and analytics screenshots

After signing in to the frontend, open **Analytics Suite → Downloadable Risk
Reports**. Select **Customize Report** on any report to:

- set the receiving office or audience;
- include or exclude executive findings and recommended actions;
- use **Print / Save PDF** to create a PDF through the browser print dialog;
- use **Download Analytics PNG** to save a screenshot of the report analytics
  summary.

The PDF is generated in the browser and can be saved with the print dialog's
**Save as PDF** option. The PNG export is generated from the visible analytics
summary and does not require a server-side report service.

## Production deployment

The recommended production layout uses two services:

1. **FastAPI** hosts the model API.
2. **Next.js** hosts the public frontend.

Streamlit is optional in production and can be deployed separately as a model
console. Do not use the Streamlit port as the frontend API URL; the frontend
expects the FastAPI routes under `/api`.

### Deploy FastAPI on Render or Railway

Before deploying, make sure the generated files in `backend/static/api/` are
committed. The API reads these files at runtime.

Use the following service settings:

| Setting | Value |
|---|---|
| Root directory | `backend` |
| Build command | `pip install -r requirements.txt` |
| Start command | `uvicorn api:app --host 0.0.0.0 --port $PORT` |
| Runtime | Python 3.11 |

After deployment, verify:

```text
https://<api-host>/docs
https://<api-host>/api/meta
https://<api-host>/api/locations
```

The API enables CORS for the frontend. For a restricted production
deployment, change `allow_origins=["*"]` in `backend/api.py` to the exact
frontend origin before deploying.

### Deploy Next.js on Vercel

Create a Vercel project from the same repository and set:

| Setting | Value |
|---|---|
| Root directory | `frontend` |
| Framework preset | Next.js |
| Build command | `npm run build` |
| Install command | `npm install` |
| Output directory | Default |

Add this environment variable in Vercel:

```text
NEXT_PUBLIC_MODEL_URL=https://<api-host>/api
```

For the current deployment, use:

```text
NEXT_PUBLIC_MODEL_URL=https://project-team07.onrender.com/api
```

Redeploy after saving the environment variable. The deployed frontend should
then request data from:

```text
https://<api-host>/api/locations
https://<api-host>/api/location/<slug>
```

### Deploy Streamlit Community Cloud

Streamlit is an optional monitoring/model-console deployment:

1. Open Streamlit Community Cloud and create a new app.
2. Select this GitHub repository and the `main` branch.
3. Set the main file to `backend/streamlit_app.py`.
4. Confirm `backend/static/api/` is committed.
5. Deploy the app.

The Streamlit app is available at:

```text
https://<streamlit-host>.streamlit.app
```

Its static JSON files are available under:

```text
https://<streamlit-host>.streamlit.app/app/static/api/locations.json
```

For the browser frontend, prefer the FastAPI deployment above because it
provides stable API routes and CORS support.

### Updating a deployed model

After changing input data or pipeline code:

```powershell
cd backend
python pipeline.py
python -m py_compile api.py streamlit_app.py pipeline.py
```

Review the generated JSON files, commit the updated exports, and push:

```powershell
git add backend/static/api backend
git commit -m "Refresh model exports"
git push origin main
```

The hosting provider will redeploy from the new commit. A rebuild triggered
inside a temporary Streamlit container does not persist across restarts.

### Deployment troubleshooting

| Symptom | Check |
|---|---|
| Frontend shows `ERR_CONNECTION_REFUSED:8000` | Start/deploy FastAPI and set `NEXT_PUBLIC_MODEL_URL` to its `/api` URL |
| API returns 404 | Confirm the request uses `/api/locations`, not `/locations` |
| API cannot import `api` | Set the service root directory to `backend`, or use `uvicorn --app-dir backend api:app` from the repository root |
| Map has no locations | Confirm `backend/static/api/locations.json` exists and contains generated locations |
| Water inflow values are zero | Check `/api/location/<slug>`; detailed rainfall values come from this endpoint |
| Browser reports a CORS error | Add the deployed frontend origin to FastAPI CORS configuration |
| Streamlit opens but frontend fails | Streamlit runs on port 8501; frontend data comes from FastAPI on port 8000 |

### Deployment health checklist

- [ ] `backend/static/api/locations.json` is present.
- [ ] FastAPI `/docs` loads successfully.
- [ ] FastAPI `/api/meta` returns model metadata.
- [ ] FastAPI `/api/locations` returns location coordinates.
- [ ] FastAPI `/api/location/<slug>` returns rainfall/water-inflow windows.
- [ ] `NEXT_PUBLIC_MODEL_URL` ends with `/api`.
- [ ] The frontend production build completes with `npm run build`.
- [ ] CORS allows the deployed frontend origin.

## Caveats to keep in your expo material
- Risk classes are relative percentile bands, not probabilities. Presence-background sampling does not give calibrated probabilities.
- It is a static susceptibility map, not a time-specific prediction.
- Metrics from demo mode mean nothing. Quote only metrics from real-data runs.
- UGLC is CC BY-NC 4.0. Do not count COOLR/UGLC overlaps as separate events (the loader de-duplicates by ~1 km + date).
- The Kerala mask in `_frame()` is a rough polygon. Replace it with LSG boundaries for real use.
