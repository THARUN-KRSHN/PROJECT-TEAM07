# Project Structure and Team Ownership

GiriRaksha combines geospatial preprocessing, environmental data analysis,
machine learning, a FastAPI service, and a Next.js public interface.

## Flow of the project

```text
backend/data/raw
        |
        v
backend/data/preprocessed
  schema + CRS + quality checks
        |
        v
backend/pipeline.py
  feature engineering + labels + spatial validation
        |
        +--> backend/data/analysis
        |      metrics + explainability + experiment outputs
        |
        +--> backend/static/api
               JSON API export contract
                       |
                       v
              backend/api.py (FastAPI)
                       |
                       v
              frontend/src/lib/model.ts
                       |
                       v
              Next.js pages and components
```

## Folder guide

| Folder | Purpose |
| --- | --- |
| `backend/data/raw` | Source and legacy raw-data contract |
| `backend/data/preprocessed` | Reserved for normalized, validated intermediate data |
| `backend/data/analysis` | Reserved for reproducible analysis and experiment outputs |
| `backend/static/api` | Generated JSON consumed by the frontend |
| `backend/pipeline.py` | Ingest, feature engineering, training, validation and export |
| `backend/api.py` | FastAPI routes and CORS boundary |
| `backend/weather.py` | Open-Meteo retrieval, normalization and caching |
| `backend/gemini.py` | Server-only Gemini insight generation and validation |
| `backend/services.py` | Context assembly, fallback summaries and disabled alert boundary |
| `backend/tests` | Backend automated tests |
| `frontend/src/app` | Route-level pages |
| `frontend/src/components` | Reusable UI, map, navigation and analytics components |
| `frontend/src/lib` | Frontend API and authentication helpers |
| `docs` | Architecture, integration and contribution documentation |

## Team ownership

| Branch | Contributor | Scope |
| --- | --- | --- |
| `role/edwin-frontend-ui` | Edwin Biju | Next.js pages, components, responsive UI and UX |
| `role/richard-gis-quality` | Richard Robinson | Source data, CRS/spatial processing, data quality and pipeline QA |
| `role/ruthurag-weather-ai` | Ruthurag Mohan | Weather provider, Gemini integration, advisories and alert safety |
| `role/tharun-backend-database` | Tharun Krishna C U | FastAPI, service contracts, backend configuration and database design |
| `role/udhay-data-science` | Udhay Jose M | Feature engineering, model training, validation and explainability |

The complete application remains on `main`. Role branches are contribution
views and should be merged back through pull requests; they are not intended
to remove the other roles' runtime dependencies.

## Concepts used

### Big data processing

- multi-source ingestion and schema normalization;
- spatial grids and geospatial joins;
- temporal rainfall windows;
- pipeline stages and generated data contracts;
- cache-aware API retrieval;
- spatial-block validation to reduce leakage.

### Data mining

- classification with Logistic Regression and Random Forest;
- presence/background label construction;
- duplicate event collapsing across inventories;
- feature selection and model comparison;
- permutation importance and SHAP-style attribution;
- external-region evaluation planning.

### Data analytics

- descriptive rainfall and terrain summaries;
- risk-category distribution reporting;
- location-level drill-down analysis;
- forecast versus historical data comparison;
- source provenance, freshness and data-quality status;
- public dashboards and research dashboards.

## Running the project

See the root [README.md](../README.md) for the complete setup. Backend-specific
commands are in [backend/README.md](../backend/README.md).
