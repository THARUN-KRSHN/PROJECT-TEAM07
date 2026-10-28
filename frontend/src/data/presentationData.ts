// Comprehensive Script and Data Architecture for GiriRaksha Interactive Pitchdeck Demo Presentation

export interface TechnicalPillarDetails {
  category: "Big Data" | "Databases" | "Data Mining" | "Analytics & ML" | "Real-Time AI";
  title: string;
  badge: string;
  codeSnippet: string;
  metrics: { label: string; value: string }[];
  keyHighlights: string[];
}

export interface PresentationStep {
  id: number;
  slug: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  focusArea: string;
  durationSeconds: number;
  narration: {
    heading: string;
    script: string;
    speakerNote: string;
  };
  mockupDisplay: {
    type:
      | "topography_crisis"
      | "streaming_pipeline"
      | "database_architecture"
      | "data_mining_clustering"
      | "feature_tensor"
      | "ml_benchmark_shap"
      | "gemini_realtime_ai"
      | "gis_mission_control";
    badgeText: string;
    statusSummary: string;
  };
  technicalPillars: TechnicalPillarDetails[];
}

export const PRESENTATION_STEPS: PresentationStep[] = [
  {
    id: 1,
    slug: "context-mission",
    stepNumber: "01",
    title: "The Disaster Context & GiriRaksha Mission",
    subtitle: "Overcoming Coarse District Alerts with Micro-Catchment Spatial Intelligence",
    focusArea: "Problem Statement & Spatial Domain",
    durationSeconds: 10,
    narration: {
      heading: "Why Kerala Needs Micro-Catchment Landslide Intelligence",
      script:
        "Every monsoon, Kerala's Western Ghats terrain experiences catastrophic shallow debris flows driven by extreme cloudburst rainfall and antecedent soil saturation. Traditional warning systems broadcast coarse, district-wide alerts that fail to distinguish between steep 35-degree slopes and stable lowlands. GiriRaksha was engineered as an enterprise-grade AI, Big Data, and Geospatial Early Warning System to deliver actionable, micro-catchment terrain awareness down to local Panchayats.",
      speakerNote:
        "Emphasize the distinction between regional weather advisories and local physical slope instability.",
    },
    mockupDisplay: {
      type: "topography_crisis",
      badgeText: "High-Risk Corridor: Western Ghats Escarpment",
      statusSummary: "Critical antecedent soil moisture in Wayanad & Idukki highland belts.",
    },
    technicalPillars: [
      {
        category: "Analytics & ML",
        title: "Antecedent Moisture Saturation Index",
        badge: "Domain Hydrology",
        codeSnippet: `// Cumulative Inflow Saturation Model
def compute_soil_pore_saturation(rain_1d, rain_3d, rain_7d, rain_15d, slope_deg):
    # Antecedent Precipitation Index (API) with exponential decay decay_rate=0.85
    api_score = rain_1d * 1.0 + rain_3d * 0.72 + rain_7d * 0.45 + rain_15d * 0.20
    critical_threshold = 180.0 if slope_deg > 25.0 else 320.0
    return {"api_score": api_score, "is_critical": api_score >= critical_threshold}`,
        metrics: [
          { label: "High Risk Catchments", value: "300+ Cells" },
          { label: "Historical Fatalities Addressed", value: "Chooralmala & Meppadi" },
          { label: "Resolution Target", value: "Micro-Grid (10m - 30m)" },
        ],
        keyHighlights: [
          "Identifies shallow translational debris flow triggers before slope liquefaction.",
          "Combines static morphological shear strength with dynamic monsoon rainfall influx.",
          "Targeted at KSDMA, local Panchayats, field first responders, and residents.",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "big-data-ingestion",
    stepNumber: "02",
    title: "Big Data Ingestion: Heterogeneous Streaming Pipelines",
    subtitle: "Asynchronous High-Throughput Ingestion of Satellite Rasters & Telemetry",
    focusArea: "Big Data Architecture",
    durationSeconds: 10,
    narration: {
      heading: "Streaming 1.2 TB of Multi-Source Geospatial Telemetry",
      script:
        "GiriRaksha ingests heterogeneous Big Data streams across automated crawlers, satellite feeds, and telemetry APIs. Our pipeline harmonizes Copernicus GLO-30 30-meter elevation rasters, IMD gridded telemetry, NASA GPM IMERG satellite precipitation, and OpenStreetMap road and settlement vectors. Operating on an asynchronous buffer queue, our ingestion engine guarantees zero telemetry drop even during intense monsoon cloudburst spikes.",
      speakerNote:
        "Highlight the CRS harmonization between global WGS84 EPSG:4326 and UTM 43N projected coordinates.",
    },
    mockupDisplay: {
      type: "streaming_pipeline",
      badgeText: "Real-time Telemetry Ingestion: 7 Stream Sources",
      statusSummary: "Throughput: 1.2 TB / Monsoon • Reprojecting to EPSG:32643 UTM 43N.",
    },
    technicalPillars: [
      {
        category: "Big Data",
        title: "Kafka & Distributed Stream Orchestration",
        badge: "Streaming Architecture",
        codeSnippet: `// Asynchronous Ingestion & Reprojection Pipeline
from pyproj import Transformer
import rasterio

transformer = Transformer.from_crs("EPSG:4326", "EPSG:32643", always_xy=True)

def ingest_telemetry_stream(record_batch):
    for event in record_batch:
        utm_x, utm_y = transformer.transform(event['lon'], event['lat'])
        kafka_producer.send('kerala-spatial-telemetry', {
            'cell_id': event['cell_id'],
            'utm_coords': [utm_x, utm_y],
            'rainfall_mm': event['precip'],
            'timestamp': event['utc_time']
        })`,
        metrics: [
          { label: "Ingestion Volume", value: "1.2 TB / Season" },
          { label: "Pipeline Latency", value: "< 240 ms" },
          { label: "Active Stream Sources", value: "7 Heterogeneous APIs" },
        ],
        keyHighlights: [
          "Zero telemetry data loss buffer with backpressure management during cloudbursts.",
          "Automatic CRS coordinate transforms from global lat/lon to planar metric grids.",
          "Spatial grid partitioning across 14 Kerala revenue districts and Western Ghats basins.",
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "databases-storage",
    stepNumber: "03",
    title: "Distributed Data Lake & Spatial Databases",
    subtitle: "Columnar GeoParquet, PostGIS R-Tree Indexing & Low-Latency Caching",
    focusArea: "Databases & Storage",
    durationSeconds: 10,
    narration: {
      heading: "Sub-Second Spatial Lookups & High-Density Columnar Lake",
      script:
        "Handling massive spatial-temporal grids requires a hybrid storage paradigm. We persist heavy historical digital elevation rasters and satellite archives in columnar GeoParquet on our distributed data lake. For millisecond operational queries, PostgreSQL with PostGIS GiST spatial indexing powers lightning-fast topological joins. Furthermore, an in-memory key-value cache holds running 1-, 3-, 7-, and 15-day rainfall accumulations for immediate API response.",
      speakerNote:
        "Mention how PostGIS GiST bounding-box filters avoid costly brute-force point-in-polygon checks.",
    },
    mockupDisplay: {
      type: "database_architecture",
      badgeText: "Hybrid Storage: PostGIS + GeoParquet + In-Memory Cache",
      statusSummary: "Spatial Index Query: 4.2ms • Bounding Box Filter: Kerala Boundary.",
    },
    technicalPillars: [
      {
        category: "Databases",
        title: "PostGIS Spatial Indexing & Columnar GeoParquet",
        badge: "Spatial Database",
        codeSnippet: `-- PostGIS Spatial Query with R-Tree GiST Index
SELECT 
    grid.cell_id,
    grid.panchayat_name,
    grid.slope_degrees,
    ST_AsGeoJSON(grid.geom) AS geojson,
    cache.rain_3d_mm,
    cache.risk_score
FROM spatial_risk_grid AS grid
JOIN weather_cache AS cache ON grid.cell_id = cache.cell_id
WHERE ST_Intersects(
    grid.geom, 
    ST_MakeEnvelope(75.8, 11.2, 76.5, 11.8, 4326) -- Wayanad Focus
)
AND cache.risk_score >= 0.70;`,
        metrics: [
          { label: "Spatial Index Speedup", value: "48x vs Scan" },
          { label: "GeoParquet Compression", value: "73% Disk Saving" },
          { label: "Cache Hit Rate", value: "98.4% (TTL 600s)" },
        ],
        keyHighlights: [
          "PostGIS GiST indexing yields sub-10ms boundary filtering across Kerala grids.",
          "Columnar GeoParquet provides snappy analytical reads for multi-year raster series.",
          "FastAPI and Next.js frontend cache synchronizes with automated freshness verification.",
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "data-mining",
    stepNumber: "04",
    title: "Data Mining: Spatial Clustering & Association Rules",
    subtitle: "DBSCAN Hazard Corridor Detection, 1km De-Duplication & Pseudo-Absence",
    focusArea: "Data Mining Concepts",
    durationSeconds: 10,
    narration: {
      heading: "Uncovering Latent Spatial Patterns & Eliminating Data Bias",
      script:
        "To transform raw geospatial points into predictive features, GiriRaksha uses advanced spatial data mining. We apply a 1-kilometer spatial-temporal buffer to collapse duplicate event records between NASA COOLR and Geological Survey of India inventories. Density-Based Spatial Clustering (DBSCAN) discovers contiguous historical scar corridors. Furthermore, spatial association rule mining discovers non-linear rules correlating slope angles, road cuts, and saturation thresholds with slope failure.",
      speakerNote:
        "Explain that presence-only landslide inventories require stratified pseudo-absence generation to prevent model hallucination.",
    },
    mockupDisplay: {
      type: "data_mining_clustering",
      badgeText: "DBSCAN Spatial Hotspots & Association Rules",
      statusSummary: "48 Clusters Identified • 1km Buffer Collapsed 114 Overlaps.",
    },
    technicalPillars: [
      {
        category: "Data Mining",
        title: "DBSCAN Clustering & Pseudo-Absence Stratification",
        badge: "Pattern Discovery",
        codeSnippet: `// Spatial Clustering & Association Rule Mining
from sklearn.cluster import DBSCAN
import numpy as np

# DBSCAN with Haversine metric (eps=1.5km, min_samples=4)
kms_per_radian = 6371.0088
epsilon = 1.5 / kms_per_radian
coords_rad = np.radians(landslide_events[['latitude', 'longitude']].values)

db = DBSCAN(eps=epsilon, min_samples=4, metric='haversine')
cluster_labels = db.fit_predict(coords_rad)

# Association Rule: Slope > 28° AND Rain_3D > 200mm => Failure (Lift: 4.82)`,
        metrics: [
          { label: "Duplicate Collapsed", value: "114 Overlapping Events" },
          { label: "Spatial Clusters", value: "48 Critical Corridors" },
          { label: "Rule Lift Factor", value: "4.82x Above Chance" },
        ],
        keyHighlights: [
          "Eliminates duplicate scar counts between NASA COOLR and state inventories.",
          "Generates environmentally stratified pseudo-absence points to balance positive scans.",
          "Extracts actionable multi-factor association rules that inform warning thresholds.",
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "feature-engineering",
    stepNumber: "05",
    title: "Data Analytics & Feature Engineering Tensor",
    subtitle: "28-Dimensional Topographic, Hydrological & Multi-Window Rainfall Tensors",
    focusArea: "Data Analytics & Raster Calculus",
    durationSeconds: 10,
    narration: {
      heading: "From Raw DEM to a 28-Feature Predictive Matrix",
      script:
        "Raw elevation by itself does not predict landslides. Our analytical engine computes a 28-dimensional spatial analytical tensor. We extract primary topographic derivatives including slope gradient and aspect, plus hydrological indicators like the Topographic Wetness Index and Stream Power Index. Crucially, we synthesize multi-window antecedent precipitation: 1-day flash rain, 3-day shallow saturation, 7-day deep pore pressure, and 15-day water table replenishment.",
      speakerNote:
        "Point out that the 15-day window captures slow underground pore-water build-up that triggers failures days after rain stops.",
    },
    mockupDisplay: {
      type: "feature_tensor",
      badgeText: "28-Feature Analytical Matrix & Hydrological Indices",
      statusSummary: "TWI = ln(a / tan β) • Multi-Window Inflow: 1D, 3D, 7D, 15D.",
    },
    technicalPillars: [
      {
        category: "Analytics & ML",
        title: "Topographic Wetness & Antecedent Inflow Calculus",
        badge: "Raster Analytics",
        codeSnippet: `// Topographic Wetness Index (TWI) & Antecedent Windows
import numpy as np

def compute_hydrological_tensor(dem_array, flow_accumulation, precip_series):
    # Gradient in radians
    gy, gx = np.gradient(dem_array, 30.0) # 30m cell resolution
    slope_rad = np.arctan(np.sqrt(gx**2 + gy**2))
    slope_rad[slope_rad == 0] = 0.001
    
    # TWI = ln(Specific Catchment Area / tan(Slope))
    twi = np.log((flow_accumulation * 30.0 + 1.0) / np.tan(slope_rad))
    
    # Multi-window inflow
    rain_1d = precip_series[-1]
    rain_3d = np.sum(precip_series[-3:])
    rain_7d = np.sum(precip_series[-7:])
    rain_15d = np.sum(precip_series[-15:])
    return np.column_stack([slope_rad, twi, rain_1d, rain_3d, rain_7d, rain_15d])`,
        metrics: [
          { label: "Tensor Dimensions", value: "28 Engineered Features" },
          { label: "Spatial Cell Mesh", value: "30m Pixel Resolution" },
          { label: "Collinearity Guard", value: "VIF < 5.0 Pruned" },
        ],
        keyHighlights: [
          "Calculates physical shear stress and hydrological pooling through raster calculus.",
          "Multi-window rainfall allows distinguishing flash floods from slow structural saturation.",
          "Variance Inflation Factor (VIF) pruning guarantees zero collinearity distortions.",
        ],
      },
    ],
  },
  {
    id: 6,
    slug: "machine-learning-xai",
    stepNumber: "06",
    title: "Machine Learning Algorithms & Spatial-Block Validation",
    subtitle: "Random Forest & XGBoost Benchmarking, Zero-Leakage Spatial CV & TreeSHAP",
    focusArea: "Algorithms & Explainable AI",
    durationSeconds: 10,
    narration: {
      heading: "95.2% ROC-AUC with Spatial-Block Cross-Validation and TreeSHAP",
      script:
        "Rather than relying on uncalibrated heuristics, GiriRaksha deploys rigorous machine learning. We benchmark Logistic Regression against Random Forest and XGBoost ensembles. To strictly prevent spatial autocorrelation leakage, we enforce Spatial-Block Cross-Validation, ensuring models are tested on entirely unseen geographical valleys. With TreeSHAP, every risk score is accompanied by an instant waterfall explanation showing exactly what triggered the hazard rating.",
      speakerNote:
        "Emphasize that standard random K-Fold artificially inflates accuracy due to spatial proximity.",
    },
    mockupDisplay: {
      type: "ml_benchmark_shap",
      badgeText: "Model Benchmark: XGBoost 0.952 AUC • TreeSHAP Waterfall",
      statusSummary: "Spatial-Block 5-Fold CV • Base Value: 0.21 → Final Score: 0.94 High.",
    },
    technicalPillars: [
      {
        category: "Analytics & ML",
        title: "Spatial-Block K-Fold & TreeSHAP Explainability",
        badge: "Ensemble Algorithms",
        codeSnippet: `// Spatial-Block CV & TreeSHAP Explainer
from sklearn.model_selection import GroupKFold
from xgboost import XGBClassifier
import shap

# GroupKFold by spatial geographic watershed blocks (prevents spatial leakage)
gkf = GroupKFold(n_splits=5)
model = XGBClassifier(n_estimators=300, max_depth=6, learning_rate=0.05)

for train_idx, val_idx in gkf.split(X, y, groups=spatial_district_blocks):
    model.fit(X[train_idx], y[train_idx])

# Generate instantaneous TreeSHAP local attribution
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(target_cell_features)`,
        metrics: [
          { label: "XGBoost ROC-AUC", value: "0.952" },
          { label: "Random Forest AUC", value: "0.942" },
          { label: "Baseline Logistic Reg.", value: "0.781" },
        ],
        keyHighlights: [
          "Spatial-Block Cross-Validation prevents overfitting to nearby clustered training points.",
          "TreeSHAP generates sub-50ms local feature importance waterfall charts.",
          "Transparent explainability builds confidence with district disaster management collectors.",
        ],
      },
    ],
  },
  {
    id: 7,
    slug: "gemini-realtime-ai",
    stepNumber: "07",
    title: "Real-Time AI: Google Gemini 3.8 Flash Synthesis",
    subtitle: "Coupling Live Open-Meteo Telemetry with Multi-Modal LLM Situational Intelligence",
    focusArea: "Real-Time AI & LLM Reasoning",
    durationSeconds: 10,
    narration: {
      heading: "Contextual Disaster Intelligence Powered by Google Gemini",
      script:
        "When cloudbursts hit, numbers on a chart are not enough for emergency commanders. GiriRaksha pairs physical predictive models with server-side Google Gemini 3.8 Flash. Our backend securely injects live Open-Meteo weather forecasts, terrain features, and model scores into Gemini, instantly generating natural language situational summaries, priority evacuation advisories, and bilingual Malayalam guidance with automated safety guardrails.",
      speakerNote:
        "Point out that the Gemini key is strictly kept server-side in FastAPI with deterministic fallback.",
    },
    mockupDisplay: {
      type: "gemini_realtime_ai",
      badgeText: "Google Gemini 3.8 Flash • Live Open-Meteo Telemetry",
      statusSummary: "Live Inflow: 48.2mm/hr • Generated Evacuation Priority: Immediate.",
    },
    technicalPillars: [
      {
        category: "Real-Time AI",
        title: "Server-Side Gemini 3.8 Flash Multi-Modal Prompting",
        badge: "Generative AI",
        codeSnippet: `// Server-Side Gemini 3.8 Flash Situational Advisory Prompt
import google.generativeai as genai

model = genai.GenerativeModel('gemini-3.8-flash')
response = model.generate_content(
    f"""You are GiriRaksha's Senior Disaster Risk AI.
    Location: {location['name']}, {location['district']}
    Slope: {location['slope']}°, TWI: {location['twi']}
    Current 3D Rain: {weather['rain_3d']} mm, Forecast 24h: {weather['forecast_24h']} mm
    Model Susceptibility: {location['score']} ({location['risk_label']})
    
    Synthesize: 
    1. Operational Risk Assessment
    2. Evacuation Priority & Lifeline Vulnerability
    3. Emergency Helpline Routing (112, 1077, 1070)
    Return strict JSON formatted response."""
)`,
        metrics: [
          { label: "AI Response Time", value: "< 1.2s" },
          { label: "Multilingual Support", value: "English & Malayalam" },
          { label: "Deterministic Fallback", value: "100% Uptime Guarantee" },
        ],
        keyHighlights: [
          "Translates complex geotechnical indices into plain, life-saving community guidance.",
          "Secure server-side API integration prevents front-end API key exposure.",
          "Deterministic rule fallback ensures alerts generate even during network outages.",
        ],
      },
    ],
  },
  {
    id: 8,
    slug: "mission-control-platform",
    stepNumber: "08",
    title: "Mission Control: Interactive Geospatial Warning Platform",
    subtitle: "5-Tier Categorical Warning, Location Dossiers, PDF Reports & Multi-Agency Dispatch",
    focusArea: "Full-Stack Geospatial Delivery",
    durationSeconds: 10,
    narration: {
      heading: "From Satellite Rasters to Community Safety in Real Time",
      script:
        "The culmination is GiriRaksha: an enterprise-ready, accessible landslide risk intelligence platform. Citizens can inspect their Panchayat's risk status in seconds, while disaster managers access comprehensive geospatial heatmaps, downloadable PDF hazard reports, and real-time helpline routing. By uniting Big Data streaming, PostGIS databases, spatial data mining, machine learning ensembles, and Google Gemini AI, GiriRaksha makes Kerala's mountains safer.",
      speakerNote:
        "Conclude with the impact: scientific rigor made immediately accessible to vulnerable communities.",
    },
    mockupDisplay: {
      type: "gis_mission_control",
      badgeText: "Enterprise Mission Control: 5-Tier Early Warning",
      statusSummary: "Leaflet & Esri Geospatial Engine • Real-time Multi-Agency Dispatch.",
    },
    technicalPillars: [
      {
        category: "Analytics & ML",
        title: "Enterprise Web GIS & 5-Tier Operational Protocol",
        badge: "Production Platform",
        codeSnippet: `// 5-Tier Risk Classification & Dispatch Protocol
export const toRiskLevel = (score: number): RiskLevel => {
  if (score >= 0.80) return { label: "Very High", color: "#DC2626", action: "Immediate Evacuation" };
  if (score >= 0.60) return { label: "High", color: "#EA580C", action: "Prepare Relocation" };
  if (score >= 0.40) return { label: "Moderate", color: "#D97706", action: "Monitor Weather" };
  if (score >= 0.20) return { label: "Low", color: "#65A30D", action: "Routine Caution" };
  return { label: "Very Low", color: "#247343", action: "Stable Terrain" };
};`,
        metrics: [
          { label: "Monitored Locations", value: "300+ Active Cells" },
          { label: "Dispatch Response", value: "Sub-second GIS Render" },
          { label: "Platform Tech Stack", value: "Next.js 16 + FastAPI" },
        ],
        keyHighlights: [
          "Interactive Leaflet & Esri World Imagery tiles with sub-second marker rendering.",
          "Printable PDF & PNG downloadable risk dossiers for district emergency operations.",
          "Built-in emergency dispatch integration with National (112) & State (1077/1070) helplines.",
        ],
      },
    ],
  },
];
