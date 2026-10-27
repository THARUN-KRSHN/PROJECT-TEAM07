# GiriRaksha Frontend

The frontend is a Next.js 16 and React 19 application using TypeScript,
Tailwind CSS, Leaflet and Recharts.

## Responsibilities

- `src/app`: route-level pages for the public home, map, location dossiers,
  safety guidance, reports, research and authenticated views.
- `src/components/landing`: homepage product and educational sections.
- `src/components/map`: Leaflet map, controls, fallback and location panel.
- `src/components/navigation`: shared banner, navbar and footer.
- `src/components/risk`: rainfall and risk visualization components.
- `src/components/explainability`: feature-importance and SHAP-style charts.
- `src/lib/model.ts`: typed FastAPI client, weather and AI insight contracts.
- `src/lib/authContext.tsx`: current prototype authentication context.
- `src/data`: frontend-only fixtures used when a page needs presentation data.

## Data flow

```text
FastAPI /api
   -> src/lib/model.ts
   -> route page state
   -> shared components
   -> map, cards, charts and reports
```

The Gemini key never enters this application. Gemini requests are made only by
the backend. The frontend receives validated insight text, source metadata,
limitations and generation status.

## UI and analytics concepts

- **Data analytics:** location drill-downs, rainfall summaries, risk-category
  displays, report views and model explanation charts.
- **Visual analytics:** maps, layer toggles, marker states and readable
  evidence cards for public users.
- **Explainability:** SHAP-style factor attribution is separated from public
  risk summaries and protected research views.
- **Reliability UX:** loading, unavailable, fallback and error states preserve
  access to the existing map when an external provider fails.

## Local development

```powershell
cd frontend
npm install
npm run dev
npm run lint
npm run build
```

Set `frontend/.env.local` for a local backend:

```env
NEXT_PUBLIC_MODEL_URL=http://localhost:8000/api
```

Do not put `GEMINI_API_KEY` or other server credentials in this file.

## Ownership

Primary role: Edwin Biju — Frontend Development & UI/UX.
Backend API contract support: Tharun Krishna C U.
Weather and AI card support: Ruthurag Mohan.
