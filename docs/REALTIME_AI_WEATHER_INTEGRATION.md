# Real-time weather and AI integration audit

## Repository state

- **Frontend:** Next.js 16 / React 19 with Leaflet and a light forest-green design system.
- **Backend:** FastAPI (`backend/api.py`) over generated JSON exports, plus an optional Streamlit model console.
- **Current data contract:** `backend/static/api/` contains location, model, research, and pipeline JSON.
- **Risk data status:** `integrated_model_features.csv` and generated location exports are explicitly
  `demo_synthetic`; labels are not observed outcomes and are not suitable for operational alerts.
- **Authentication:** frontend sign-in context exists, but the backend API currently has no server-side
  authentication or notification persistence.
- **Jobs/database:** no job queue, database, cache service, or notification delivery service exists.
- **Official advisories:** no verified machine-readable IMD/KSDMA feed is configured.
- **Gemini:** no server-side Gemini SDK or credential configuration exists.

## Implemented foundation

`backend/weather.py` provides a `WeatherService`-compatible Open-Meteo integration:

- validates coordinates;
- requests current conditions, hourly precipitation/probability, and seven-day daily totals;
- preserves provider, retrieval, timezone, and forecast timestamps;
- labels provider forecast values separately from observations;
- uses a ten-minute in-memory cache and bounded request timeouts;
- returns explicit provider errors through HTTP 503.

`backend/services.py` provides location context assembly, a disabled deterministic rule-engine
boundary, and a safe non-AI fallback insight schema. The rule engine intentionally returns
`not_evaluated`: no threshold has been regionally validated or approved for operational use.

## API contracts

Existing static endpoints remain unchanged. Added endpoints are:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/location/{slug}/weather` | Live Open-Meteo current and forecast data |
| GET | `/api/location/{slug}/context` | Weather plus exported terrain/rainfall/model status |
| GET | `/api/location/{slug}/insights` | Safe backend-generated fallback insight |
| POST | `/api/location/{slug}/insights/generate` | Same fallback contract until Gemini is configured |

Weather data is provider forecast data, not a local rain-gauge observation. Historical rainfall
features and forecast precipitation are deliberately kept in separate fields.

## Planned phases and gaps

1. Add a server-side `google-genai` service with `GEMINI_API_KEY` and `GEMINI_MODEL`, strict
   structured-output validation, redaction, rate limiting, and context-only prompting.
2. Add a permitted official advisory adapter after its source and terms are verified.
3. Replace static exports with a database/spatial query layer where operational freshness is required.
4. Add authenticated subscriptions, notification preferences, deduplication, expiry, and a supported
   delivery provider.
5. Add a scheduler/job runner for weather/advisory refresh and rule reevaluation.
6. Add mocked tests for provider failures, stale/missing data, rule boundaries, AI fallback, and access control.

Operational notifications must remain disabled until a rule set has a documented scientific basis,
regional validation, expert review, and false-positive/false-negative evaluation.

## Required configuration when integrations are enabled

| Variable | Required for | Status |
|---|---|---|
| `GEMINI_API_KEY` | Gemini server calls | Not configured |
| `GEMINI_MODEL` | Gemini model selection | Not configured |
| `WEATHER_CACHE_TTL_SECONDS` | Shared production cache | Not configured; local default is 600 seconds |
| `ALLOWED_ORIGINS` | Restricted CORS | Not configured; current prototype allows all origins |

No secrets are returned by the API or exposed in the frontend.
