# GIRIRAKSHA (ഗിരിരക്ഷ)
### Landslide Risk Intelligence for the Western Ghats of Kerala

> **Academic Project Presentation Prototype — Team 07**  
> *Data Analytics & Big Data Processing*

---

## 🌿 Overview

**GiriRaksha** is a rainfall-aware, explainable landslide risk intelligence platform conceptualized for the ecologically sensitive Western Ghats of Kerala. Rather than offering opaque binary hazard predictions, GiriRaksha couples high-resolution terrain morphology, multi-window antecedent precipitation telemetry, historical ground-truth mass-wasting catalogs, and community exposure layers to deliver transparent, location-level risk assessments.

### Core Philosophy:
> **"Hazard is physical. Risk is human."**  
> A dangerous 45° cliff in an uninhabited forest poses zero human casualties. A steep slope matters most when settlements, transportation lifelines, and communities are exposed.
> 
> $$\text{RISK} = \text{SUSCEPTIBILITY} \times \text{EXPOSURE}$$

---

## 🚀 Quickstart

The prototype is completely self-contained and requires **no external backend, databases, or API keys**. All data is powered by curated mock datasets.

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies (already executed)
npm install

# Start the Next.js local development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🗺️ Product Routes & Features

| Route | Feature Description | Key Capabilities |
| :--- | :--- | :--- |
| **`/`** | **Cinematic Landing & Product Overview** | Landscape hero, live telemetry strip, browser dashboard preview, 4-stage workflow, exposure split section, SHAP preview, and stakeholder cards. |
| **`/map`** | **Interactive Risk Map (Main Demo Page)** | 75% GIS map + 25% Location Dossier panel. Search bar with autocomplete, multi-layer toggles (Risk, Landslides, Rainfall, Settlements), Satellite/Terrain base switcher, and offline Vector SVG fallback mode. |
| **`/location/[id]`** | **Deep Location Analysis (`/location/meppadi`)** | Full photographic header, 3-card risk synthesis, Recharts composed rainfall accumulation chart (1D/3D/7D/15D), terrain/DEM metrics, exposed elements, historical slide timeline, and SHAP factor bars. |
| **`/insights`** | **Explainable AI (SHAP Waterfall)** | Interactive location switcher, local TreeSHAP factor contribution waterfalls (+0.24 rainfall, +0.21 slope), and global regional model feature importance weights. |
| **`/reports`** | **Hazard Bulletins & Advisories** | KSDMA-formatted hazard briefs with evacuation directives, interactive dossier modals, printable view, and simulated PDF export. |
| **`/pipeline`** | **Behind the Risk (Big Data Architecture)** | 7-stage distributed computing blueprint: Multi-source Ingestion $\to$ HDFS/HBase Data Lake $\to$ Apache Spark Feature Engineering $\to$ ML Modeling $\to$ Risk Matrix $\to$ TreeSHAP $\to$ GIS Delivery. |
| **`/research`** | **Researcher & Admin Console** | Dataset ingestion health audit and spatial cross-validation benchmarks (XGBoost AUC 0.952, Random Forest AUC 0.931). Clearly labeled as prototype demonstration data. |

---

## 🌍 OpenStreetMap (OSM) Live Integration

GiriRaksha natively integrates with **OpenStreetMap APIs**:
1. **Live OSM Tile Service**: Standard OpenStreetMap live tile layer (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`) available in the top-right base layer selector alongside Terrain and Satellite.
2. **OSM Nominatim Geocoding API**: Search any village, hill station, or road in Kerala (e.g. *Kalpetta, Sulthan Bathery, Thamarassery, Kattappana*); it fetches real-time coordinates, OSM node IDs, and bounding boxes directly from OpenStreetMap.
3. **OSM Node Deep Links**: Location panels include direct deep links to open the respective coordinate node on [OpenStreetMap](https://www.openstreetmap.org).
4. **Resilient Local Fallback**: If network or rate limits apply, the system seamlessly falls back to the curated Western Ghats spatial index without disruption.

---

## 🎨 Design System & Palette

- **Deep Forest**: `#12372A`
- **Forest Green**: `#1F5C45`
- **Moss**: `#52796F`
- **Earth**: `#7A5C43`
- **Mist / Off-white**: `#EAF1ED` / `#F7F8F5`
- **Charcoal**: `#17201C`
- **Semantic Risk Levels**:
  - `0.00 – 0.19` : **VERY LOW** (`#65A30D`)
  - `0.20 – 0.39` : **LOW** (`#84CC16`)
  - `0.40 – 0.59` : **MODERATE** (`#F59E0B`)
  - `0.60 – 0.79` : **HIGH** (`#F97316`)
  - `0.80 – 1.00` : **VERY HIGH** (`#DC2626`)

*Images feature Western Ghats ridges, Wayanad tea slopes, monsoon clouds, and hill roads with zero-failure CSS gradient fallbacks.*

---

## 💻 Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & Vanilla CSS Glassmorphism
- **Map Presentation**: Leaflet (SSR-safe dynamic client import) + Vector SVG Fallback
- **Charts & Telemetry**: Recharts Composed Charts
- **Micro-Animations**: Framer Motion
- **Icons**: Lucide React

---

## 👥 Presentation Narrative Guide (Evaluator Walkthrough)

1. **Start at `/`**: Highlight the Western Ghats landscape identity, the 4-stage processing flow, and the conceptual formula $\text{RISK} = \text{SUSCEPTIBILITY} \times \text{EXPOSURE}$.
2. **Click `[Explore Risk Map]` (`/map`)**:
   - Type `"Meppadi"` or `"Idukki"` into the search bar.
   - Observe the map pan and zoom with pulsing risk halos.
   - Toggle layers (Historical Landslides, Rainfall, Settlements).
   - Switch between **Terrain** and **Satellite** base layers.
3. **Click `[Full location analysis]` (`/location/meppadi`)**:
   - Show the 15-day rainfall accumulation chart matching the 2024 Wayanad trigger.
   - Point out terrain derivatives (Slope 34.2°, Elevation 842 m, TWI 8.2).
   - Review what is in harm's way (4,280 population, 12 settlements, 18.4 km road corridor).
4. **Click `[Why this score?]` (`/insights`)**:
   - Showcase the TreeSHAP waterfall chart demonstrating that 7-day rainfall (+0.24) and slope (+0.21) account for the surge over baseline.
5. **Navigate to `/reports`**:
   - Click **[View Dossier]** and **[Download PDF]** on the Meppadi advisory.
6. **Navigate to `/pipeline` & `/research`**:
   - Demonstrate the academic alignment with Big Data systems (Hadoop HDFS, HBase, Apache Spark, and XGBoost AUC 0.952).
