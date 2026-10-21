import { LocationData, HistoricalEvent } from "@/data/mockLocations";
import { getRiskLevel } from "@/lib/utils";

const MODEL_API_BASE = process.env.NEXT_PUBLIC_MODEL_URL || "http://localhost:8000/api";

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

const getJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${MODEL_API_BASE}/${path}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Model API request failed (${response.status}): ${path}`);
  }
  return response.json() as Promise<T>;
};

export const getModelLocations = () => getJson<LocationsResponse>("locations");

export const getModelLocation = (slug: string) => getJson<ModelLocation>(`location/${slug}`);

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

export const toLocationData = (location: ModelLocation): LocationData => {
  const riskLevel = toRiskLevel(location.risk_label, location.score);
  const rainfall = location.rainfall || {};
  const terrain = location.terrain || {};
  const exposure = location.exposure || {};
  const score = Number(location.score || 0);

  return {
    id: location.slug,
    name: location.name,
    panchayat: location.cell_id,
    district: location.district,
    state: "Kerala",
    coordinates: [location.lat, location.lon],
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
