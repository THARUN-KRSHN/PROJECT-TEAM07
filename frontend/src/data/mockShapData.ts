// Explainable AI & SHAP (SHapley Additive exPlanations) Demonstration Dataset
// Demonstrates how the Machine Learning ensemble attributes risk at regional and local levels.

export interface RegionalFeatureImportance {
  feature: string;
  category: "Terrain" | "Rainfall" | "Environmental" | "Anthropogenic";
  importance: number; // 0 to 1 scale
  description: string;
}

export const REGIONAL_FEATURE_IMPORTANCE: RegionalFeatureImportance[] = [
  {
    feature: "Slope Gradient (°)",
    category: "Terrain",
    importance: 0.28,
    description: "Dominant structural driver. Slopes above 28° exhibit steep shear stress exponential curves.",
  },
  {
    feature: "7-Day Cumulative Rainfall (mm)",
    category: "Rainfall",
    importance: 0.24,
    description: "Dynamic trigger. Saturated pore-water pressure reduces soil effective cohesion.",
  },
  {
    feature: "Elevation / DEM (m)",
    category: "Terrain",
    importance: 0.14,
    description: "Orographic rainfall enhancement and gravitational potential energy.",
  },
  {
    feature: "15-Day Antecedent Saturation (mm)",
    category: "Rainfall",
    importance: 0.12,
    description: "Deep regolith sub-surface moisture retention and soil liquefaction potential.",
  },
  {
    feature: "Topographic Wetness Index (TWI)",
    category: "Terrain",
    importance: 0.08,
    description: "Hydrological convergence in concave valley hollows and slope toes.",
  },
  {
    feature: "Road Cut / Infrastructure Proximity (m)",
    category: "Anthropogenic",
    importance: 0.06,
    description: "Toe-removal by road engineering destabilizing uphill colluvium.",
  },
  {
    feature: "NDVI Vegetation Density",
    category: "Environmental",
    importance: 0.05,
    description: "Root cohesion anchors topsoil; barren or cleared slopes show heightened vulnerability.",
  },
  {
    feature: "Soil Type & Saprolite Depth",
    category: "Environmental",
    importance: 0.03,
    description: "Lateritic red sandy loam with gravel pockets and permeable saprolite horizons.",
  },
];

export interface ModelBenchmark {
  modelName: string;
  family: string;
  aucRoc: number;
  f1Score: number;
  precision: number;
  recall: number;
  latencyMs: number;
  isChampion: boolean;
}

export const MODEL_BENCHMARKS: ModelBenchmark[] = [
  {
    modelName: "XGBoost (Spatial Stratified)",
    family: "Gradient Boosted Trees",
    aucRoc: 0.952,
    f1Score: 0.914,
    precision: 0.908,
    recall: 0.920,
    latencyMs: 14,
    isChampion: true,
  },
  {
    modelName: "Random Forest (Geo-Spatial)",
    family: "Ensemble Bagging",
    aucRoc: 0.931,
    f1Score: 0.887,
    precision: 0.892,
    recall: 0.882,
    latencyMs: 22,
    isChampion: false,
  },
  {
    modelName: "LightGBM Classifier",
    family: "Histogram Gradient Boosting",
    aucRoc: 0.941,
    f1Score: 0.899,
    precision: 0.901,
    recall: 0.897,
    latencyMs: 9,
    isChampion: false,
  },
  {
    modelName: "Gradient Boosting Machine",
    family: "Standard Boosting",
    aucRoc: 0.924,
    f1Score: 0.875,
    precision: 0.880,
    recall: 0.870,
    latencyMs: 38,
    isChampion: false,
  },
  {
    modelName: "Logistic Regression Baseline",
    family: "Linear GLM",
    aucRoc: 0.842,
    f1Score: 0.778,
    precision: 0.785,
    recall: 0.771,
    latencyMs: 3,
    isChampion: false,
  },
];
