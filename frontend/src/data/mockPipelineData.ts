// Big Data Processing & Machine Learning Pipeline Architecture for GiriRaksha
// Visual demonstration for academic project presentation

export interface PipelineStage {
  step: string;
  title: string;
  subtitle: string;
  technologies: string[];
  metrics: string;
  description: string;
  inputs: string[];
  outputs: string[];
  details: string[];
}

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    step: "01",
    title: "Multi-Source Data Ingestion",
    subtitle: "Heterogeneous Geospatial & Telemetry Streams",
    technologies: ["Apache Kafka", "Automated Crawlers", "IMD Gridded API", "USGS / ESA Hubs"],
    metrics: "7 Real-time Streams • 1.2 TB Ingestion/Monsoon",
    description:
      "Continuous ingestion of satellite imagery, digital elevation models, precipitation radars, and OpenStreetMap infrastructural vectors.",
    inputs: [
      "SRTM / Cartosat-1 DEM (30m & 10m rasters)",
      "IMD AWS / GPM IMERG 0.1° Gridded Precipitation",
      "Sentinel-2 L2A Multispectral (10m NDVI/NDWI)",
      "Geological Survey of India (GSI) Landslide Inventory",
      "OpenStreetMap Roads, Settlements & Buildings",
    ],
    outputs: ["Raw GeoTIFF, NetCDF, GeoJSON & CSV Streams"],
    details: [
      "Handles varied spatial resolutions and coordinate reference systems (WGS84 & EPSG:32643 UTM 43N).",
      "Asynchronous ingestion buffer with zero loss during peak cloudburst telemetry spikes.",
    ],
  },
  {
    step: "02",
    title: "Distributed Storage & Data Lake",
    subtitle: "Scalable Fault-Tolerant Big Data Infrastructure",
    technologies: ["Hadoop HDFS", "Apache HBase", "Apache Parquet", "GeoParquet"],
    metrics: "14 Districts Partitioned • Sub-second Spatial Indexing",
    description:
      "High-throughput columnar storage partitioned across Western Ghats river basins and administrative taluks with spatial index structures.",
    inputs: ["Raw Ingestion Streams"],
    outputs: ["Distributed Partitioned GeoParquet Tables", "HBase Real-time Telemetry Store"],
    details: [
      "HDFS stores bulk historical DEM grids, satellite time-series, and 1000s of historical landslide polygons.",
      "HBase provides low-latency key-value lookups for 1D, 3D, 7D, and 15D antecedent rainfall running accumulations.",
    ],
  },
  {
    step: "03",
    title: "Distributed Processing & Feature Engineering",
    subtitle: "Large-Scale Parallel Raster/Vector Computation",
    technologies: ["Apache Spark", "GeoSpark / Sedona", "RasterFrames", "GDAL / NumPy"],
    metrics: "32 Core Distributed Cluster • 10m Western Ghats Grid",
    description:
      "Parallel computation of topographic derivatives, hydrological convergence, soil indices, and proximity distance transforms.",
    inputs: ["HDFS Raw Grids & Vectors"],
    outputs: ["Unified 28-Feature Spatial Analytical Tensor"],
    details: [
      "Topographic Derivatives: Slope Angle, Aspect, Profile Curvature, Plan Curvature.",
      "Hydrological Derivatives: Topographic Wetness Index (TWI), Stream Power Index (SPI).",
      "Rainfall Windowing: 1-Day, 3-Day, 7-Day, and 15-Day cumulative antecedent matrices.",
      "Proximity Transforms: Distance to fault lines, distance to stream channels, distance to road cuts.",
    ],
  },
  {
    step: "04",
    title: "Machine Learning Susceptibility Modeling",
    subtitle: "Spatial-Stratified Ensemble Prediction",
    technologies: ["XGBoost", "LightGBM", "Random Forest", "Scikit-Learn"],
    metrics: "AUC-ROC 0.952 • 5-Fold Spatial Cross-Validation",
    description:
      "Trained on historical Western Ghats landslide inventories with balanced non-landslide pseudo-absence sampling and spatial blocking to prevent spatial autocorrelation leakage.",
    inputs: ["Feature Tensor"],
    outputs: ["Continuous Susceptibility Index (0.0 to 1.0)"],
    details: [
      "Spatial K-Fold cross validation ensures model generalises across disparate hill ranges from Wayanad to Idukki.",
      "Hyperparameter optimization using Bayesian optimization with cost-sensitive loss.",
    ],
  },
  {
    step: "05",
    title: "Exposure-Aware Risk Synthesis",
    subtitle: "Coupling Hazard Susceptibility with Human Vulnerability",
    technologies: ["Spatial Risk Matrix Engine", "OSM Exposure Weighting"],
    metrics: "Equation: Risk = Susceptibility × Exposure Factor",
    description:
      "A dangerous uninhabited cliff has high susceptibility but low human risk. GiriRaksha combines physical hazard with population, critical lifelines, and transport corridors.",
    inputs: ["Susceptibility Index", "Population Grids", "Road Infrastructure", "Settlement Polygons"],
    outputs: ["Categorized Risk: VERY LOW to VERY HIGH"],
    details: [
      "Evaluates population density, distance to road networks, and critical lifelines.",
      "Produces actionable 5-tier classification conforming to disaster management operational protocols.",
    ],
  },
  {
    step: "06",
    title: "Model Explainability (SHAP)",
    subtitle: "Transparent Local & Global Attribution",
    technologies: ["TreeSHAP", "Shapley Additive Explanations", "Feature Attribution API"],
    metrics: "Sub-50ms TreeSHAP Explanation Generation",
    description:
      "Translates opaque machine learning decisions into interpretable contributions for emergency responders and planning authorities.",
    inputs: ["Trained Ensemble Model", "Point Location Feature Vector"],
    outputs: ["Local SHAP Waterfall Values", "Global Feature Importance"],
    details: [
      "Answers the critical operational question: 'Why is this location flagged as High or Very High?'",
      "Disentangles whether risk is driven by recent rainfall shock or static steep slope morphology.",
    ],
  },
  {
    step: "07",
    title: "Interactive Risk Intelligence Delivery",
    subtitle: "Real-Time Geospatial Presentation & Alerting",
    technologies: ["Next.js", "Leaflet GIS", "Tailwind CSS", "GeoJSON API"],
    metrics: "Responsive Desktop & Mobile • Sub-second Map Interactivity",
    description:
      "Delivers high-fidelity interactive risk maps, location intelligence dossiers, and downloadable hazard advisories to decision-makers.",
    inputs: ["Risk GeoJSON Tiles", "SHAP Explanations", "Location Records"],
    outputs: ["GiriRaksha Production Prototype Web Platform"],
    details: [
      "Accessible to KSDMA disaster managers, Panchayat presidents, field responders, and residents.",
    ],
  },
];

export interface DataSourceCard {
  name: string;
  source: string;
  resolution: string;
  updateFrequency: string;
  role: string;
  tag: string;
}

export const DATA_SOURCES: DataSourceCard[] = [
  {
    name: "Digital Elevation Model (DEM)",
    source: "Cartosat-1 / ALOS PALSAR",
    resolution: "12.5m - 30m Grid",
    updateFrequency: "Static Base",
    role: "Derives slope, aspect, curvature, and topographic wetness index (TWI)",
    tag: "Terrain",
  },
  {
    name: "Gridded Precipitation Telemetry",
    source: "IMD AWS & GPM IMERG Satellite",
    resolution: "0.1° / Station Grids",
    updateFrequency: "Hourly / Daily Ingestion",
    role: "Calculates 1-day, 3-day, 7-day, and 15-day cumulative antecedent rainfall saturation",
    tag: "Rainfall",
  },
  {
    name: "Historical Landslide Inventory",
    source: "Geological Survey of India (GSI) & KSDMA",
    resolution: "Point & Polygon Scars",
    updateFrequency: "Event-based Archive",
    role: "Ground-truth positive targets for ML training and historical pattern analysis",
    tag: "Ground Truth",
  },
  {
    name: "Multispectral Vegetation (NDVI)",
    source: "Copernicus Sentinel-2 L2A",
    resolution: "10m Optical Bands",
    updateFrequency: "5-day Revisit",
    role: "Calculates canopy density, root-binding soil protection, and cleared slope scars",
    tag: "Vegetation",
  },
  {
    name: "Geology & Soil Characteristics",
    source: "National Bureau of Soil Survey (NBSS&LUP)",
    resolution: "1:50,000 Spatial Scale",
    updateFrequency: "Curated Base",
    role: "Soil depth, saprolite permeability, lithology, and structural shear plane lines",
    tag: "Geology",
  },
  {
    name: "Infrastructure & Human Exposure",
    source: "OpenStreetMap & Census Geocodes",
    resolution: "Vector Line & Polygons",
    updateFrequency: "Continuous Sync",
    role: "Road cuts, settlements, population density, bridges, and emergency shelters",
    tag: "Exposure",
  },
];
