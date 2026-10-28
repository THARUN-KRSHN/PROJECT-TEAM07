import { LocationData, HistoricalEvent } from "@/data/mockLocations";
import { getRiskLevel } from "@/lib/utils";

const MODEL_API_BASE =
  process.env.NEXT_PUBLIC_MODEL_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://project-team07.onrender.com/api"
    : "http://localhost:8000/api");

interface ModelLocation {
  slug: string;
  name: string;
  district: string;
  lat: number;
  lon: number;
  cell_id: string;
  risk_class: number;
  risk_label: string;
  score: number;
  terrain?: Record<string, number>;
  rainfall?: Record<string, number>;
  history?: {
    count: number;
    recent: Array<Record<string, string | number>>;
  };
  exposure?: {
    population?: number;
    road_distance_m?: number;
  } | null;
  source_status?: string;
}

interface LocationsResponse {
  locations: ModelLocation[];
}

export interface ModelAnalysis {
  meta?: {
    data_mode?: string;
    generated_at?: string;
    model?: string;
    disclaimer?: string;
  };
  selected_model?: string;
  n_events?: number;
  sampling?: {
    n_positive?: number;
    n_background?: number;
  };
  model_metrics?: Record<string, {
    roc_auc?: number;
    pr_auc?: number;
    precision?: number;
    recall?: number;
    f1?: number;
    validation?: string;
  }>;
  importance?: Array<{
    feature: string;
    importance: number;
  }>;
}

const getJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${MODEL_API_BASE}/${path}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Model API request failed (${response.status}): ${path}`);
  }
  return response.json() as Promise<T>;
};

export const getModelLocations = () => getJson<LocationsResponse>("locations");

export const getModelLocation = (slug: string) => getJson<ModelLocation>(`location/${slug}`);

export interface WeatherData {
  source: { name: string; url: string };
  retrieved_at: string;
  forecast_issued_at?: string;
  current: {
    time?: string;
    temperature_2m_c?: number;
    relative_humidity_percent?: number;
    precipitation_mm?: number;
    weather_code?: number;
    label: string;
  };
  data_quality: {
    current_available: boolean;
    forecast_available: boolean;
    observations_available: boolean;
    note: string;
  };
}

export const getModelWeather = (slug: string) =>
  getJson<WeatherData>(`location/${slug}/weather`);

export interface InsightData {
  location_name: string;
  generated_at: string;
  headline: string;
  weather_summary: string;
  risk_context_summary: string;
  preparedness_suggestions: Array<{
    title: string;
    description: string;
    reason: string;
  }>;
  data_status: {
    weather_available: boolean;
    rainfall_history_available: boolean;
    terrain_available: boolean;
    risk_model_available: boolean;
    official_advisory_available: boolean;
  };
  limitations: string[];
  sources: Array<{ name: string; url: string; retrieved_at?: string }>;
  disclaimer: string;
  generation_status?: string;
}

export const getModelInsights = (slug: string) =>
  getJson<InsightData>(`location/${slug}/insights`);

export const getModelAnalysis = async (): Promise<ModelAnalysis> => {
  const [research, insights] = await Promise.all([
    getJson<ModelAnalysis>("research"),
    getJson<ModelAnalysis>("insights"),
  ]);

  return {
    ...research,
    importance: insights.importance || [],
  };
};

const toRiskLevel = (value: string, score: number) =>
  value
    ? value.toUpperCase().replace(" ", " ") as LocationData["riskLevel"]
    : getRiskLevel(score);

const toHistoricalEvents = (location: ModelLocation): HistoricalEvent[] =>
  (location.history?.recent || []).map((event, index) => ({
    id: `${location.slug}-event-${index}`,
    year: Number(String(event.date || "").slice(0, 4)) || 0,
    dateStr: String(event.date || "Unknown date"),
    title: `${location.name} recorded event`,
    description: `Event recorded by ${String(event.source || "the backend event inventory")}.`,
    volumeEstimatedM3: "Not available",
    triggerRainfallMm: 0,
    severity: "MODERATE",
  }));

const KERALA_BOUNDS = {
  minLat: 8.2,
  maxLat: 12.8,
  minLon: 74.8,
  maxLon: 77.8,
};

const DISTRICT_FALLBACK_COORDINATES: Record<string, [number, number]> = {
  wayanad: [11.605, 76.083],
  malappuram: [11.05, 76.07],
  kozhikode: [11.258, 75.78],
  kannur: [11.874, 75.355],
  kasaragod: [12.5, 75.0],
  idukki: [9.85, 76.97],
  pathanamthitta: [9.26, 76.78],
  alappuzha: [9.49, 76.33],
  thrissur: [10.53, 76.21],
  ernakulam: [10.15, 76.47],
  kollam: [8.89, 76.6],
  thiruvananthapuram: [8.52, 76.94],
  palakkad: [10.77, 76.65],
  kottayam: [9.59, 76.52],
  vadakara: [11.6, 75.58],
};

export const normalizeLocationCoordinates = (
  nameOrLocation: { name?: string; district?: string; lat?: number; lon?: number },
  fallback: [number, number] = [10.85, 76.24]
): [number, number] => {
  const rawLat = Number(nameOrLocation?.lat ?? fallback[0]);
  const rawLon = Number(nameOrLocation?.lon ?? fallback[1]);

  if (!Number.isFinite(rawLat) || !Number.isFinite(rawLon)) {
    return fallback;
  }

  // Accept any coordinate that falls inside the Kerala bounding box
  const insideKerala =
    rawLat >= KERALA_BOUNDS.minLat &&
    rawLat <= KERALA_BOUNDS.maxLat &&
    rawLon >= KERALA_BOUNDS.minLon &&
    rawLon <= KERALA_BOUNDS.maxLon;

  if (insideKerala) {
    return [rawLat, rawLon];
  }

  // Point is outside Kerala — try district fallback
  const districtKey = (nameOrLocation?.district || nameOrLocation?.name || "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");

  return (
    DISTRICT_FALLBACK_COORDINATES[districtKey] ||
    DISTRICT_FALLBACK_COORDINATES[
      (nameOrLocation?.name || "").toLowerCase().replace(/[^a-z]/g, "")
    ] ||
    fallback
  );
};

export const toLocationData = (location: ModelLocation): LocationData => {
  const riskLevel = toRiskLevel(location.risk_label, location.score);
  const rainfall = location.rainfall || {};
  const terrain = location.terrain || {};
  const exposure = location.exposure || {};
  const score = Number(location.score || 0);
  const coordinates = normalizeLocationCoordinates(
    { name: location.name, district: location.district, lat: location.lat, lon: location.lon },
    [10.85, 76.24]
  );

  // Generate a human-readable name from district + cell index
  const cellNum = (location.cell_id || location.slug || "").replace(/\D/g, "");
  const displayName = location.name || `${location.district} Zone ${cellNum}`;

  return {
    id: location.slug,
    name: displayName,
    panchayat: `${location.district} Grid Sector`,
    district: location.district,
    state: "Kerala",
    coordinates,
    riskScore: score,
    riskLevel,
    susceptibilityScore: score,
    exposureScore: Math.min(1, Number(exposure.population || 0) / 10000),
    confidence: "MODERATE",
    rainfallStatus: score >= 0.8 ? "CRITICAL" : score >= 0.6 ? "ABOVE NORMAL" : "MODERATE",
    primaryTrigger: "Model score from backend raw feature data",
    summary: `Backend model point ${location.cell_id} in ${location.district}.`,
    rainfall: {
      day1: Number(rainfall.rainfall_1d_mm || 0),
      day3: Number(rainfall.rainfall_3d_mm || 0),
      day7: Number(rainfall.rainfall_7d_mm || 0),
      day15: Number(rainfall.rainfall_15d_mm || 0),
      anomalyPercent: 0,
      records: [
        { date: "Backend 1-day window", daily: Number(rainfall.rainfall_1d_mm || 0), cumulative7d: Number(rainfall.rainfall_7d_mm || 0), cumulative15d: Number(rainfall.rainfall_15d_mm || 0) },
      ],
    },
    terrain: {
      slope: Number(terrain.slope_deg || 0),
      elevation: Number(terrain.elevation_m || 0),
      aspect: `${Number(terrain.aspect_deg || 0)}°`,
      twi: 0,
      curvature: Number(terrain.curvature || 0),
      ndvi: 0,
      soilType: "Not available in backend export",
      geology: "Not available in backend export",
      distToFaultKm: 0,
      distToStreamsM: 0,
      distToRoadsM: Number(exposure.road_distance_m || 0),
    },
    exposure: {
      population: Number(exposure.population || 0),
      settlements: 0,
      roadNetworkKm: 0,
      criticalInfrastructure: 0,
      infrastructureList: [],
      evacuationCentres: 0,
      vulnerabilityGrade: score >= 0.8 ? "CRITICAL" : score >= 0.6 ? "HIGH" : "MODERATE",
    },
    historicalEvents: toHistoricalEvents(location),
    shapFactors: [
      { feature: "model_score", label: "Backend model score", valueStr: score.toFixed(3), shapValue: score, category: "Terrain" },
    ],
    imageKey: "mistyHills",
  };
};

export type { ModelLocation };
