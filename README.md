# GiriRaksha

## AI-Powered Landslide Risk Intelligence Platform

**Understand Risk. Prepare Early. Protect Lives.**

Team 07 | Data Analytics and Big Data Processing | Christ College of Engineering

GiriRaksha is a responsive web prototype for communicating location-specific landslide risk in the Western Ghats of Kerala. It brings terrain, rainfall, historical landslide and settlement context into one public-facing experience, while keeping scientific analytics available for authorised users.

> **Important:** This repository is an academic prototype. Risk values, model metrics and datasets must be verified against actual ingestion and experiment outputs before being presented as operational warnings or validated predictions.

## Project Expo narrative

### The problem

Kerala's hilly districts experience landslide hazards during intense and sustained rainfall. Rainfall observations, terrain data and historical landslide inventories are often maintained separately, and complex scientific information is difficult for residents to interpret. GiriRaksha addresses this communication gap with an accessible, location-based risk experience.

### Proposed solution

- Interactive location search and risk map
- Five simple risk categories for public awareness
- Terrain, historical, rainfall and settlement layers
- Location dossiers with rainfall, terrain and exposure summaries
- Explainable analytics for authorised researchers
- Safety guidance and official helpline references

### Objectives

1. Integrate landslide-related datasets into a unified system.
2. Analyse terrain, rainfall and historical event patterns.
3. Develop and evaluate machine-learning models for risk assessment.
4. Visualise risk through an interactive, mobile-friendly platform.
5. Support public awareness and research with explainable insights.

## Current prototype experience

| Route | Experience |
| --- | --- |
| `/` | Responsive landing page, search, product story, workflow and stakeholder sections |
| `/map` | Leaflet map, layer controls, OSM search, base-map switcher and location dossier |
| `/location/meppadi` | Location analysis with rainfall, terrain, exposure and historical context |
| `/safety` | Public landslide preparedness and safety guidance |
| `/about` | Purpose, methodology, limitations and project context |
| `/insights` | SHAP-style feature attribution and explainable risk factors |
| `/reports` | Hazard bulletin and report presentation prototype |
| `/pipeline` | Data processing and big-data architecture narrative |
| `/research` | Dataset health and model evaluation demonstration |

## Screenshots and demonstration checklist

Capture the following views from the running application for the final expo deck:

1. **Home:** logo, hero search and “Know your area's landslide risk”.
2. **Map loading:** white loading state with the centred GiriRaksha logo.
3. **Map terrain:** search/filter controls visible above the map, with the location dossier beside it.
4. **Map OSM:** OpenStreetMap tiles, markers and zoom controls.
5. **Mobile map:** stacked map and dossier with touch-friendly controls.
6. **Location analysis:** rainfall and terrain cards for Meppadi.
7. **Research view:** analytics and model explanation screens.

The visual references supplied for the project show the map loading state, terrain map, OSM view and public homepage. The final presentation should use fresh screenshots from the current build after the loading screen and responsive layout changes have been verified.

## Data sources and target architecture

| Dataset or source | Intended purpose |
| --- | --- |
| NASA Global Landslide Catalog / COOLR | Historical landslide events |
| Unified Global Landslide Catalogue | Additional event inventory |
| NASA GPM IMERG | Rainfall observations |
| Copernicus DEM GLO-30 | Elevation and terrain features |
| Kerala GSI / KSDMA layers | Hazard reference and comparison |
| Kerala LSG boundaries | Administrative mapping |
| Kodagu 2018 inventory | Potential external evaluation |

Target flow:

```text
Rainfall · DEM · Landslide Inventories · Boundaries
                    ↓
Cleaning · Spatial Alignment · Feature Engineering
                    ↓
Training · Evaluation · Risk Classification · SHAP
                    ↓
PostGIS · FastAPI · Geospatial Results
                    ↓
Public Map · Research Dashboard · Reports
```

The proposed technology stack is Next.js, React, Tailwind CSS, Python/FastAPI, PostgreSQL/PostGIS, Pandas, GeoPandas, Rasterio, Apache Spark, Hadoop/Hive, scikit-learn, XGBoost, SHAP and Docker. Only components that are actually integrated and tested should be described as completed.

## Algorithms and analytics plan

- Feature engineering: elevation, slope, terrain morphology and rainfall accumulation.
- Baseline: Logistic Regression.
- Candidates: Random Forest and XGBoost.
- Evaluation: precision, recall, F1-score, ROC-AUC and spatially separated validation.
- Explainability: SHAP feature contributions.
- Research direction: test generalisation across Western Ghats regions and use the Kodagu inventory as external evaluation data.

Do not add a results table or claim validated model performance until experiments have been run on the declared datasets.

## Product and social impact

GiriRaksha is designed as a practical product rather than only an ML experiment:

- **Citizens:** understandable location risk, map context and safety guidance.
- **Researchers:** rainfall trends, terrain analytics, model explanations and reports.
- **Institutions:** a potential decision-support interface for planning and awareness.
- **Future regions:** modular data and map surfaces for other vulnerable hilly areas.

The project supports public risk literacy and reproducible environmental analysis. It is not an official warning system; residents must follow KSDMA, district administration and local emergency instructions.

## Team 07

| Member | Register number |
| --- | --- |
| Edwin Biju | CCE24CD028 |
| Richard Robinson | CCE24CD053 |
| Ruthurag Mohan | CCE24CD054 |
| Tharun Krishna C U | CCE24CD058 |
| Udhay Jose M | CCE24CD060 |

Document the actual responsibilities for dataset collection, geospatial preprocessing, ML development, backend/data engineering, frontend/UI, testing and presentation before final submission.

## Local development

Requirements: Node.js and npm.

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run lint
npm run build
```

The prototype uses curated local mock data and does not require a backend, database or API key. The map uses OpenTopoMap terrain tiles, Esri satellite imagery and OpenStreetMap tiles; location search uses the public Nominatim service and has a local fallback.

## Design system and accessibility

- Primary brand asset: `frontend/public/logo.png`
- Main display font: `Charles Wright Singapore Regular` when installed
- Supporting font: Poppins with system fallback
- Forest green: `#247343`
- Charcoal: `#202923`
- Soft grey: `#F3F5F3`
- Border grey: `#E1E6E1`
- Risk levels: Very Low, Low, Moderate, High and Very High

The interface uses rounded controls and cards, visible focus states, touch-sized mobile actions, stacked map/dossier layout on small screens, and a three-second white logo intro screen. Map overlays have their own stacking layer so search and filters remain usable above Leaflet tiles and controls.

## Evaluation coverage checklist

| Criterion | Covered by |
| --- | --- |
| Innovation | Proposed integrated risk map and explainability |
| Technical complexity | Dataset, architecture and analytics sections |
| Problem relevance | Kerala landslide context and safety guidance |
| Quality of implementation | Responsive product routes and live map demo |
| Product potential | Public and researcher experiences |
| Social / industrial impact | Public awareness and decision-support framing |
| Patent potential | Requires a separate novelty and patentability assessment |
| Research potential | Spatial validation and explainable modelling plan |
| Presentation quality | Expo narrative, screenshots and demonstration checklist |
| Demonstration quality | Search, map layers, location dossier and reports |
| Team contribution | Team table and responsibility record |
