// Comprehensive Mock Geospatial and Landslide Risk Dataset for Kerala Western Ghats
// Note: Prototype Demonstration Data for academic evaluation.

import { RiskLevel } from "@/lib/utils";

export interface RainfallRecord {
  date: string;
  daily: number;
  cumulative7d: number;
  cumulative15d: number;
}

export interface TerrainMetrics {
  slope: number; // in degrees
  elevation: number; // in meters
  aspect: string; // e.g. 'SW (225°)'
  twi: number; // Topographic Wetness Index
  curvature: number; // Profile curvature
  ndvi: number; // Normalized Difference Vegetation Index 0-1
  soilType: string;
  geology: string;
  distToFaultKm: number;
  distToStreamsM: number;
  distToRoadsM: number;
}

export interface ExposureMetrics {
  population: number;
  settlements: number;
  roadNetworkKm: number;
  criticalInfrastructure: number;
  infrastructureList: string[];
  evacuationCentres: number;
  vulnerabilityGrade: "CRITICAL" | "HIGH" | "MODERATE" | "LOW";
}

export interface HistoricalEvent {
  id: string;
  year: number;
  dateStr: string;
  title: string;
  description: string;
  volumeEstimatedM3: string;
  triggerRainfallMm: number;
  severity: "EXTREME" | "HIGH" | "MODERATE";
}

export interface ShapFactor {
  feature: string;
  label: string;
  valueStr: string;
  shapValue: number; // Positive increases risk, negative decreases
  category: "Rainfall" | "Terrain" | "Environmental" | "Human Footprint";
}

export interface LocationData {
  id: string;
  name: string;
  panchayat: string;
  district: string;
  state: string;
  coordinates: [number, number]; // [lat, lng]
  riskScore: number;
  riskLevel: RiskLevel;
  susceptibilityScore: number;
  exposureScore: number;
  confidence: "VERY HIGH" | "HIGH" | "MODERATE";
  rainfallStatus: "CRITICAL" | "ABOVE NORMAL" | "MODERATE" | "NORMAL";
  primaryTrigger: string;
  summary: string;
  rainfall: {
    day1: number;
    day3: number;
    day7: number;
    day15: number;
    anomalyPercent: number;
    records: RainfallRecord[];
  };
  terrain: TerrainMetrics;
  exposure: ExposureMetrics;
  historicalEvents: HistoricalEvent[];
  shapFactors: ShapFactor[];
  imageKey: string;
}

export const MOCK_LOCATIONS: LocationData[] = [
  {
    id: "meppadi",
    name: "Meppadi",
    panchayat: "Meppadi Grama Panchayat",
    district: "Wayanad",
    state: "Kerala",
    coordinates: [11.5543, 76.1262],
    riskScore: 0.87,
    riskLevel: "VERY HIGH",
    susceptibilityScore: 0.81,
    exposureScore: 0.76,
    confidence: "HIGH",
    rainfallStatus: "CRITICAL",
    primaryTrigger: "Extreme 7-day Antecedent Rainfall + Steep Slope Shear Failure",
    summary:
      "Vellarmala / Chooralmala ridge sector experiencing severe soil pore-pressure saturation after 387 mm 7-day rainfall over steep gneissic slopes.",
    rainfall: {
      day1: 126,
      day3: 241,
      day7: 387,
      day15: 521,
      anomalyPercent: 184,
      records: [
        { date: "Day -14", daily: 14, cumulative7d: 14, cumulative15d: 14 },
        { date: "Day -12", daily: 22, cumulative7d: 36, cumulative15d: 36 },
        { date: "Day -10", daily: 38, cumulative7d: 74, cumulative15d: 74 },
        { date: "Day -8", daily: 60, cumulative7d: 134, cumulative15d: 134 },
        { date: "Day -6", daily: 45, cumulative7d: 143, cumulative15d: 179 },
        { date: "Day -4", daily: 71, cumulative7d: 214, cumulative15d: 250 },
        { date: "Day -3", daily: 85, cumulative7d: 299, cumulative15d: 335 },
        { date: "Day -2", daily: 115, cumulative7d: 365, cumulative15d: 410 },
        { date: "Yesterday", daily: 126, cumulative7d: 387, cumulative15d: 521 },
      ],
    },
    terrain: {
      slope: 34.2,
      elevation: 842,
      aspect: "South-West (225°)",
      twi: 8.2,
      curvature: 0.17,
      ndvi: 0.61,
      soilType: "Lateritic Red Sandy Loam (Vulnerable Colluvium)",
      geology: "Hornblende-Biotite Gneiss with deep weathered regolith",
      distToFaultKm: 1.2,
      distToStreamsM: 85,
      distToRoadsM: 120,
    },
    exposure: {
      population: 4280,
      settlements: 12,
      roadNetworkKm: 18.4,
      criticalInfrastructure: 4,
      infrastructureList: [
        "Meppadi-Chooralmala Hill Highway (SH-54)",
        "Primary Health Centre & Sub-centre",
        "Local Sub-station & High-tension line",
        "Panchayat Community Hall & Water Scheme",
      ],
      evacuationCentres: 3,
      vulnerabilityGrade: "CRITICAL",
    },
    historicalEvents: [
      {
        id: "mep-2024",
        year: 2024,
        dateStr: "July 2024",
        title: "Vellarmala-Chooralmala Debris Avalanche",
        description:
          "Catastrophic debris flow triggered by torrential 48h cloudburst surge down the Iruvanjippuzha catchment.",
        volumeEstimatedM3: "3,200,000 m³",
        triggerRainfallMm: 372,
        severity: "EXTREME",
      },
      {
        id: "mep-2020",
        year: 2020,
        dateStr: "August 2020",
        title: "Meppadi Hill Slope Toe Shear Failure",
        description: "Localized slope slumping damaging plantation worker quarters and connecting estate road.",
        volumeEstimatedM3: "45,000 m³",
        triggerRainfallMm: 210,
        severity: "HIGH",
      },
      {
        id: "mep-2019",
        year: 2019,
        dateStr: "August 2019",
        title: "Puthumala Megaslip & Mudflow",
        description: "Massive debris slide on the adjacent ridge wiping out estate village and temple area.",
        volumeEstimatedM3: "1,800,000 m³",
        triggerRainfallMm: 310,
        severity: "EXTREME",
      },
    ],
    shapFactors: [
      {
        feature: "rain_7d",
        label: "7-day Cumulative Rainfall (387 mm)",
        valueStr: "387 mm",
        shapValue: 0.24,
        category: "Rainfall",
      },
      {
        feature: "slope_deg",
        label: "Slope Angle (34.2°)",
        valueStr: "34.2°",
        shapValue: 0.21,
        category: "Terrain",
      },
      {
        feature: "rain_15d",
        label: "15-day Antecedent Saturation (521 mm)",
        valueStr: "521 mm",
        shapValue: 0.17,
        category: "Rainfall",
      },
      {
        feature: "elevation_dem",
        label: "Elevation (842 m)",
        valueStr: "842 m",
        shapValue: 0.11,
        category: "Terrain",
      },
      {
        feature: "road_proximity",
        label: "Hill Road Cut Proximity (< 120m)",
        valueStr: "120 m",
        shapValue: 0.08,
        category: "Human Footprint",
      },
      {
        feature: "twi_wetness",
        label: "Topographic Wetness Index (8.2)",
        valueStr: "8.2",
        shapValue: 0.06,
        category: "Terrain",
      },
      {
        feature: "ndvi_cover",
        label: "Vegetation Buffer (NDVI 0.61)",
        valueStr: "0.61",
        shapValue: -0.04,
        category: "Environmental",
      },
    ],
    imageKey: "meppadiHero",
  },
  {
    id: "puthumala",
    name: "Puthumala",
    panchayat: "Meppadi Grama Panchayat",
    district: "Wayanad",
    state: "Kerala",
    coordinates: [11.5398, 76.155],
    riskScore: 0.91,
    riskLevel: "VERY HIGH",
    susceptibilityScore: 0.88,
    exposureScore: 0.74,
    confidence: "VERY HIGH",
    rainfallStatus: "CRITICAL",
    primaryTrigger: "Hydrological Pore Overpressure in Upper Ridge Colluvium",
    summary:
      "Steep upper scarp with deep residual saprolite layer. Extreme saturation vulnerability with historical rupture plane.",
    rainfall: {
      day1: 142,
      day3: 265,
      day7: 412,
      day15: 560,
      anomalyPercent: 210,
      records: [
        { date: "Day -14", daily: 20, cumulative7d: 20, cumulative15d: 20 },
        { date: "Day -12", daily: 30, cumulative7d: 50, cumulative15d: 50 },
        { date: "Day -10", daily: 48, cumulative7d: 98, cumulative15d: 98 },
        { date: "Day -8", daily: 70, cumulative7d: 168, cumulative15d: 168 },
        { date: "Day -6", daily: 58, cumulative7d: 176, cumulative15d: 226 },
        { date: "Day -4", daily: 84, cumulative7d: 260, cumulative15d: 310 },
        { date: "Day -3", daily: 96, cumulative7d: 356, cumulative15d: 406 },
        { date: "Day -2", daily: 130, cumulative7d: 400, cumulative15d: 480 },
        { date: "Yesterday", daily: 142, cumulative7d: 412, cumulative15d: 560 },
      ],
    },
    terrain: {
      slope: 36.8,
      elevation: 915,
      aspect: "West (270°)",
      twi: 8.7,
      curvature: 0.22,
      ndvi: 0.54,
      soilType: "Coarse Saprolitic Colluvial Deposits",
      geology: "Granulite and Charnockite Facies",
      distToFaultKm: 0.8,
      distToStreamsM: 40,
      distToRoadsM: 90,
    },
    exposure: {
      population: 2850,
      settlements: 8,
      roadNetworkKm: 12.1,
      criticalInfrastructure: 2,
      infrastructureList: [
        "Puthumala Valley Access Link Road",
        "Rural Water Intake Weir",
      ],
      evacuationCentres: 2,
      vulnerabilityGrade: "CRITICAL",
    },
    historicalEvents: [
      {
        id: "puth-2019",
        year: 2019,
        dateStr: "8 August 2019",
        title: "Puthumala Major Landslide Tragedy",
        description:
          "Huge chunk of tea plantation hill collapsed after 3 days of torrential 300+ mm rain, inundating valley settlements.",
        volumeEstimatedM3: "1,900,000 m³",
        triggerRainfallMm: 395,
        severity: "EXTREME",
      },
    ],
    shapFactors: [
      {
        feature: "slope_deg",
        label: "Extreme Slope (36.8°)",
        valueStr: "36.8°",
        shapValue: 0.26,
        category: "Terrain",
      },
      {
        feature: "rain_7d",
        label: "7-day Rainfall (412 mm)",
        valueStr: "412 mm",
        shapValue: 0.25,
        category: "Rainfall",
      },
      {
        feature: "rain_15d",
        label: "15-day Antecedent Load (560 mm)",
        valueStr: "560 mm",
        shapValue: 0.19,
        category: "Rainfall",
      },
      {
        feature: "twi_wetness",
        label: "High Water Convergence (TWI 8.7)",
        valueStr: "8.7",
        shapValue: 0.12,
        category: "Terrain",
      },
    ],
    imageKey: "mistyHills",
  },
  {
    id: "kavalappara",
    name: "Kavalappara",
    panchayat: "Pothukal Panchayat",
    district: "Malappuram",
    state: "Kerala",
    coordinates: [11.3916, 76.2422],
    riskScore: 0.84,
    riskLevel: "VERY HIGH",
    susceptibilityScore: 0.82,
    exposureScore: 0.71,
    confidence: "HIGH",
    rainfallStatus: "CRITICAL",
    primaryTrigger: "Pore-water pressure buildup behind sub-surface soil piping conduits",
    summary:
      "Muthappan Hill spur with chronic history of subsurface piping and heavy lateral colluvial slides.",
    rainfall: {
      day1: 110,
      day3: 215,
      day7: 340,
      day15: 480,
      anomalyPercent: 165,
      records: [
        { date: "Day -14", daily: 12, cumulative7d: 12, cumulative15d: 12 },
        { date: "Day -12", daily: 25, cumulative7d: 37, cumulative15d: 37 },
        { date: "Day -10", daily: 35, cumulative7d: 72, cumulative15d: 72 },
        { date: "Day -8", daily: 55, cumulative7d: 127, cumulative15d: 127 },
        { date: "Day -6", daily: 40, cumulative7d: 135, cumulative15d: 167 },
        { date: "Day -4", daily: 65, cumulative7d: 200, cumulative15d: 232 },
        { date: "Day -3", daily: 75, cumulative7d: 275, cumulative15d: 307 },
        { date: "Day -2", daily: 95, cumulative7d: 320, cumulative15d: 402 },
        { date: "Yesterday", daily: 110, cumulative7d: 340, cumulative15d: 480 },
      ],
    },
    terrain: {
      slope: 32.5,
      elevation: 620,
      aspect: "North-West (315°)",
      twi: 7.9,
      curvature: 0.19,
      ndvi: 0.58,
      soilType: "Sandy Clay Loam with Gravel Pockets",
      geology: "Charnockite and Biotite-Hornblende",
      distToFaultKm: 2.1,
      distToStreamsM: 65,
      distToRoadsM: 140,
    },
    exposure: {
      population: 3600,
      settlements: 9,
      roadNetworkKm: 14.2,
      criticalInfrastructure: 3,
      infrastructureList: [
        "Nilambur-Pothukal Road Access Corridor",
        "Pothukal High School Relief Base",
      ],
      evacuationCentres: 3,
      vulnerabilityGrade: "HIGH",
    },
    historicalEvents: [
      {
        id: "kav-2019",
        year: 2019,
        dateStr: "8 August 2019",
        title: "Kavalappara Muthappankunnu Collapse",
        description:
          "Severe mass movement burying 50+ houses following extreme continuous monsoon precipitation.",
        volumeEstimatedM3: "1,500,000 m³",
        triggerRainfallMm: 360,
        severity: "EXTREME",
      },
    ],
    shapFactors: [
      {
        feature: "rain_7d",
        label: "7-day Rainfall (340 mm)",
        valueStr: "340 mm",
        shapValue: 0.23,
        category: "Rainfall",
      },
      {
        feature: "slope_deg",
        label: "Steep Slope Angle (32.5°)",
        valueStr: "32.5°",
        shapValue: 0.19,
        category: "Terrain",
      },
      {
        feature: "soil_piping",
        label: "Soil Piping & Porosity Risk",
        valueStr: "Subsurface Conduit",
        shapValue: 0.16,
        category: "Terrain",
      },
      {
        feature: "rain_15d",
        label: "15-day Antecedent Inflow (480 mm)",
        valueStr: "480 mm",
        shapValue: 0.15,
        category: "Rainfall",
      },
    ],
    imageKey: "denseForest",
  },
  {
    id: "idukki-gap",
    name: "Idukki Arch Area",
    panchayat: "Vazhathope Panchayat",
    district: "Idukki",
    state: "Kerala",
    coordinates: [9.8456, 76.9742],
    riskScore: 0.73,
    riskLevel: "HIGH",
    susceptibilityScore: 0.74,
    exposureScore: 0.68,
    confidence: "HIGH",
    rainfallStatus: "ABOVE NORMAL",
    primaryTrigger: "Rockfall, wedge failure, road cutting erosion along ghat highway",
    summary:
      "Steep precipitous rocky slopes with thin regolith prone to rock wedges, debris slides, and drainage overflows.",
    rainfall: {
      day1: 78,
      day3: 154,
      day7: 245,
      day15: 380,
      anomalyPercent: 88,
      records: [
        { date: "Day -14", daily: 10, cumulative7d: 10, cumulative15d: 10 },
        { date: "Day -12", daily: 18, cumulative7d: 28, cumulative15d: 28 },
        { date: "Day -10", daily: 24, cumulative7d: 52, cumulative15d: 52 },
        { date: "Day -8", daily: 42, cumulative7d: 94, cumulative15d: 94 },
        { date: "Day -6", daily: 32, cumulative7d: 106, cumulative15d: 126 },
        { date: "Day -4", daily: 51, cumulative7d: 157, cumulative15d: 177 },
        { date: "Day -3", daily: 59, cumulative7d: 216, cumulative15d: 236 },
        { date: "Day -2", daily: 68, cumulative7d: 228, cumulative15d: 304 },
        { date: "Yesterday", daily: 78, cumulative7d: 245, cumulative15d: 380 },
      ],
    },
    terrain: {
      slope: 38.5,
      elevation: 1120,
      aspect: "South-East (135°)",
      twi: 6.8,
      curvature: 0.28,
      ndvi: 0.49,
      soilType: "Rocky Lithic Skeletal Soil with Thin Colluvium",
      geology: "Massive Charnockite and Jointed Granulite",
      distToFaultKm: 3.4,
      distToStreamsM: 110,
      distToRoadsM: 45,
    },
    exposure: {
      population: 5800,
      settlements: 15,
      roadNetworkKm: 26.8,
      criticalInfrastructure: 6,
      infrastructureList: [
        "Kochi-Madurai NH-85 Extension Corridor",
        "Periyar Catchment Transmission Grid Line",
        "District Collectorate Arterial Road",
      ],
      evacuationCentres: 4,
      vulnerabilityGrade: "HIGH",
    },
    historicalEvents: [
      {
        id: "idk-2018",
        year: 2018,
        dateStr: "August 2018",
        title: "Widespread Idukki Hillslides & Highway Cutoffs",
        description:
          "Over 200 slope failures triggered across district during historic reservoir spillway openings.",
        volumeEstimatedM3: "800,000 m³",
        triggerRainfallMm: 280,
        severity: "EXTREME",
      },
    ],
    shapFactors: [
      {
        feature: "slope_deg",
        label: "Extreme Precipitous Slope (38.5°)",
        valueStr: "38.5°",
        shapValue: 0.24,
        category: "Terrain",
      },
      {
        feature: "rain_7d",
        label: "7-day Rainfall (245 mm)",
        valueStr: "245 mm",
        shapValue: 0.16,
        category: "Rainfall",
      },
      {
        feature: "road_proximity",
        label: "Road Cut Edge Proximity (45 m)",
        valueStr: "45 m",
        shapValue: 0.14,
        category: "Human Footprint",
      },
    ],
    imageKey: "aerialTerrain",
  },
  {
    id: "vythiri",
    name: "Vythiri",
    panchayat: "Vythiri Grama Panchayat",
    district: "Wayanad",
    state: "Kerala",
    coordinates: [11.5516, 76.0425],
    riskScore: 0.68,
    riskLevel: "HIGH",
    susceptibilityScore: 0.70,
    exposureScore: 0.64,
    confidence: "HIGH",
    rainfallStatus: "ABOVE NORMAL",
    primaryTrigger: "Ghat pass road toe cutting and sustained orographic monsoon rain",
    summary:
      "Thamarassery Churam corridor gateway. High rainfall zone with recurring highway cut road slips.",
    rainfall: {
      day1: 72,
      day3: 145,
      day7: 230,
      day15: 350,
      anomalyPercent: 74,
      records: [
        { date: "Day -14", daily: 8, cumulative7d: 8, cumulative15d: 8 },
        { date: "Day -12", daily: 16, cumulative7d: 24, cumulative15d: 24 },
        { date: "Day -10", daily: 22, cumulative7d: 46, cumulative15d: 46 },
        { date: "Day -8", daily: 38, cumulative7d: 84, cumulative15d: 84 },
        { date: "Day -6", daily: 30, cumulative7d: 94, cumulative15d: 114 },
        { date: "Day -4", daily: 48, cumulative7d: 142, cumulative15d: 162 },
        { date: "Day -3", daily: 55, cumulative7d: 197, cumulative15d: 217 },
        { date: "Day -2", daily: 64, cumulative7d: 215, cumulative15d: 281 },
        { date: "Yesterday", daily: 72, cumulative7d: 230, cumulative15d: 350 },
      ],
    },
    terrain: {
      slope: 29.4,
      elevation: 700,
      aspect: "South-West (220°)",
      twi: 7.4,
      curvature: 0.14,
      ndvi: 0.64,
      soilType: "Humic Clayey Loam",
      geology: "Biotite Gneiss with deep Laterite cap",
      distToFaultKm: 4.0,
      distToStreamsM: 120,
      distToRoadsM: 60,
    },
    exposure: {
      population: 4100,
      settlements: 11,
      roadNetworkKm: 21.0,
      criticalInfrastructure: 5,
      infrastructureList: [
        "Calicut-Wayanad Ghat Road (NH-766)",
        "Vythiri Police Station & Rescue Base",
      ],
      evacuationCentres: 3,
      vulnerabilityGrade: "HIGH",
    },
    historicalEvents: [
      {
        id: "vyt-2018",
        year: 2018,
        dateStr: "August 2018",
        title: "Vythiri Ghat Road Cut Slips",
        description: "Multiple debris slides cutting off NH-766 highway connection to Kozhikode.",
        volumeEstimatedM3: "120,000 m³",
        triggerRainfallMm: 240,
        severity: "HIGH",
      },
    ],
    shapFactors: [
      {
        feature: "rain_7d",
        label: "7-day Rainfall (230 mm)",
        valueStr: "230 mm",
        shapValue: 0.18,
        category: "Rainfall",
      },
      {
        feature: "slope_deg",
        label: "Slope Angle (29.4°)",
        valueStr: "29.4°",
        shapValue: 0.15,
        category: "Terrain",
      },
      {
        feature: "road_proximity",
        label: "Highway Proximity (60 m)",
        valueStr: "60 m",
        shapValue: 0.12,
        category: "Human Footprint",
      },
    ],
    imageKey: "mountainRoad",
  },
  {
    id: "munnar",
    name: "Munnar",
    panchayat: "Munnar Grama Panchayat",
    district: "Idukki",
    state: "Kerala",
    coordinates: [10.0889, 77.0595],
    riskScore: 0.75,
    riskLevel: "HIGH",
    susceptibilityScore: 0.77,
    exposureScore: 0.71,
    confidence: "HIGH",
    rainfallStatus: "ABOVE NORMAL",
    primaryTrigger: "Tea plantation slope terracing alteration and intense rainfall events",
    summary:
      "High altitude plateau with steep tea-cultivated amphitheatre valleys vulnerable to translational mudslides.",
    rainfall: {
      day1: 88,
      day3: 168,
      day7: 260,
      day15: 410,
      anomalyPercent: 95,
      records: [
        { date: "Day -14", daily: 12, cumulative7d: 12, cumulative15d: 12 },
        { date: "Day -12", daily: 20, cumulative7d: 32, cumulative15d: 32 },
        { date: "Day -10", daily: 28, cumulative7d: 60, cumulative15d: 60 },
        { date: "Day -8", daily: 46, cumulative7d: 106, cumulative15d: 106 },
        { date: "Day -6", daily: 38, cumulative7d: 114, cumulative15d: 144 },
        { date: "Day -4", daily: 58, cumulative7d: 172, cumulative15d: 202 },
        { date: "Day -3", daily: 68, cumulative7d: 240, cumulative15d: 270 },
        { date: "Day -2", daily: 76, cumulative7d: 248, cumulative15d: 324 },
        { date: "Yesterday", daily: 88, cumulative7d: 260, cumulative15d: 410 },
      ],
    },
    terrain: {
      slope: 33.1,
      elevation: 1532,
      aspect: "North-East (45°)",
      twi: 7.2,
      curvature: 0.21,
      ndvi: 0.52,
      soilType: "Gravelly Sandy Loam",
      geology: "Archaean Gneisses and Granites",
      distToFaultKm: 2.7,
      distToStreamsM: 95,
      distToRoadsM: 80,
    },
    exposure: {
      population: 7800,
      settlements: 22,
      roadNetworkKm: 34.5,
      criticalInfrastructure: 7,
      infrastructureList: [
        "Munnar Town Commercial Centre",
        "Kannan Devan Tea Line Settlements",
        "Munnar-Mattupetty Road Link",
      ],
      evacuationCentres: 5,
      vulnerabilityGrade: "HIGH",
    },
    historicalEvents: [
      {
        id: "mun-2020",
        year: 2020,
        dateStr: "August 2020",
        title: "Pettimudi / Rajamala Tea Estate Tragedy",
        description: "Catastrophic debris flow obliterating estate worker layams following 4 days torrential downpour.",
        volumeEstimatedM3: "1,100,000 m³",
        triggerRainfallMm: 310,
        severity: "EXTREME",
      },
    ],
    shapFactors: [
      {
        feature: "slope_deg",
        label: "Steep Valley Slope (33.1°)",
        valueStr: "33.1°",
        shapValue: 0.21,
        category: "Terrain",
      },
      {
        feature: "rain_7d",
        label: "7-day Rainfall (260 mm)",
        valueStr: "260 mm",
        shapValue: 0.19,
        category: "Rainfall",
      },
      {
        feature: "elevation_dem",
        label: "High Elevation (1,532 m)",
        valueStr: "1,532 m",
        shapValue: 0.12,
        category: "Terrain",
      },
    ],
    imageKey: "mistyHills",
  },
  {
    id: "devikulam",
    name: "Devikulam",
    panchayat: "Devikulam Grama Panchayat",
    district: "Idukki",
    state: "Kerala",
    coordinates: [10.0633, 77.1025],
    riskScore: 0.78,
    riskLevel: "HIGH",
    susceptibilityScore: 0.79,
    exposureScore: 0.75,
    confidence: "HIGH",
    rainfallStatus: "ABOVE NORMAL",
    primaryTrigger: "Unstable tea terracing, steep jointed bedrock and road slope destabilization",
    summary:
      "Vulnerable hill station ridge with narrow valley drainage channels and high seasonal rainfall.",
    rainfall: {
      day1: 92,
      day3: 178,
      day7: 285,
      day15: 435,
      anomalyPercent: 110,
      records: [
        { date: "Day -14", daily: 14, cumulative7d: 14, cumulative15d: 14 },
        { date: "Day -12", daily: 22, cumulative7d: 36, cumulative15d: 36 },
        { date: "Day -10", daily: 32, cumulative7d: 68, cumulative15d: 68 },
        { date: "Day -8", daily: 52, cumulative7d: 120, cumulative15d: 120 },
        { date: "Day -6", daily: 44, cumulative7d: 128, cumulative15d: 164 },
        { date: "Day -4", daily: 64, cumulative7d: 192, cumulative15d: 228 },
        { date: "Day -3", daily: 74, cumulative7d: 266, cumulative15d: 302 },
        { date: "Day -2", daily: 82, cumulative7d: 271, cumulative15d: 356 },
        { date: "Yesterday", daily: 92, cumulative7d: 285, cumulative15d: 435 },
      ],
    },
    terrain: {
      slope: 35.6,
      elevation: 1680,
      aspect: "South (180°)",
      twi: 7.5,
      curvature: 0.24,
      ndvi: 0.51,
      soilType: "Lateritic Brown Forest Soil",
      geology: "Charnockitic Gneiss",
      distToFaultKm: 1.9,
      distToStreamsM: 70,
      distToRoadsM: 50,
    },
    exposure: {
      population: 4600,
      settlements: 14,
      roadNetworkKm: 22.8,
      criticalInfrastructure: 4,
      infrastructureList: [
        "Gap Road National Highway Stretch",
        "Sub-taluk Administrative Quarters",
      ],
      evacuationCentres: 3,
      vulnerabilityGrade: "HIGH",
    },
    historicalEvents: [
      {
        id: "dev-2019",
        year: 2019,
        dateStr: "July 2019",
        title: "Gap Road Massive Rockslide",
        description: "Massive rockfall and earth slip completely closing the Gap Road highway for weeks.",
        volumeEstimatedM3: "350,000 m³",
        triggerRainfallMm: 270,
        severity: "HIGH",
      },
    ],
    shapFactors: [
      {
        feature: "slope_deg",
        label: "Steep Gradient (35.6°)",
        valueStr: "35.6°",
        shapValue: 0.23,
        category: "Terrain",
      },
      {
        feature: "rain_7d",
        label: "7-day Rainfall (285 mm)",
        valueStr: "285 mm",
        shapValue: 0.20,
        category: "Rainfall",
      },
    ],
    imageKey: "heroLandscape",
  },
  {
    id: "peerumade",
    name: "Peerumade",
    panchayat: "Peerumade Grama Panchayat",
    district: "Idukki",
    state: "Kerala",
    coordinates: [9.5772, 76.9934],
    riskScore: 0.62,
    riskLevel: "HIGH",
    susceptibilityScore: 0.64,
    exposureScore: 0.58,
    confidence: "HIGH",
    rainfallStatus: "MODERATE",
    primaryTrigger: "Cardamom hills slope saturated regolith and plantation cutting",
    summary:
      "Periyar basin high range with thick forest humus layer and frequent seasonal mudslides.",
    rainfall: {
      day1: 65,
      day3: 130,
      day7: 198,
      day15: 310,
      anomalyPercent: 52,
      records: [
        { date: "Day -14", daily: 8, cumulative7d: 8, cumulative15d: 8 },
        { date: "Day -12", daily: 14, cumulative7d: 22, cumulative15d: 22 },
        { date: "Day -10", daily: 20, cumulative7d: 42, cumulative15d: 42 },
        { date: "Day -8", daily: 32, cumulative7d: 74, cumulative15d: 74 },
        { date: "Day -6", daily: 28, cumulative7d: 82, cumulative15d: 102 },
        { date: "Day -4", daily: 44, cumulative7d: 126, cumulative15d: 146 },
        { date: "Day -3", daily: 49, cumulative7d: 175, cumulative15d: 195 },
        { date: "Day -2", daily: 56, cumulative7d: 185, cumulative15d: 245 },
        { date: "Yesterday", daily: 65, cumulative7d: 198, cumulative15d: 310 },
      ],
    },
    terrain: {
      slope: 26.8,
      elevation: 915,
      aspect: "South-East (140°)",
      twi: 7.1,
      curvature: 0.12,
      ndvi: 0.67,
      soilType: "Deep Forest Humus over Red Loam",
      geology: "Granulite and Gneissic Matrix",
      distToFaultKm: 5.2,
      distToStreamsM: 140,
      distToRoadsM: 110,
    },
    exposure: {
      population: 3900,
      settlements: 10,
      roadNetworkKm: 18.2,
      criticalInfrastructure: 3,
      infrastructureList: [
        "Kottayam-Kumily Road (KK Road / NH-183)",
        "Local Tea Factory Processing Units",
      ],
      evacuationCentres: 3,
      vulnerabilityGrade: "MODERATE",
    },
    historicalEvents: [
      {
        id: "pee-2018",
        year: 2018,
        dateStr: "August 2018",
        title: "Kuttikkanam-Peerumade Road Slips",
        description: "Multiple mudflows blocking the arterial KK road connection.",
        volumeEstimatedM3: "60,000 m³",
        triggerRainfallMm: 210,
        severity: "MODERATE",
      },
    ],
    shapFactors: [
      {
        feature: "rain_7d",
        label: "7-day Rainfall (198 mm)",
        valueStr: "198 mm",
        shapValue: 0.15,
        category: "Rainfall",
      },
      {
        feature: "slope_deg",
        label: "Slope Angle (26.8°)",
        valueStr: "26.8°",
        shapValue: 0.13,
        category: "Terrain",
      },
    ],
    imageKey: "villageSettlement",
  },
  {
    id: "nilambur",
    name: "Nilambur",
    panchayat: "Nilambur Municipality",
    district: "Malappuram",
    state: "Kerala",
    coordinates: [11.2778, 76.2289],
    riskScore: 0.54,
    riskLevel: "MODERATE",
    susceptibilityScore: 0.52,
    exposureScore: 0.58,
    confidence: "HIGH",
    rainfallStatus: "MODERATE",
    primaryTrigger: "Chaliyar river bank erosion and adjoining low-hill slope slumps",
    summary:
      "Foothill transition zone where upper hill debris funnels into inhabited valley floodplains.",
    rainfall: {
      day1: 52,
      day3: 98,
      day7: 154,
      day15: 240,
      anomalyPercent: 35,
      records: [
        { date: "Day -14", daily: 6, cumulative7d: 6, cumulative15d: 6 },
        { date: "Day -12", daily: 12, cumulative7d: 18, cumulative15d: 18 },
        { date: "Day -10", daily: 16, cumulative7d: 34, cumulative15d: 34 },
        { date: "Day -8", daily: 24, cumulative7d: 58, cumulative15d: 58 },
        { date: "Day -6", daily: 22, cumulative7d: 64, cumulative15d: 80 },
        { date: "Day -4", daily: 32, cumulative7d: 96, cumulative15d: 112 },
        { date: "Day -3", daily: 38, cumulative7d: 134, cumulative15d: 150 },
        { date: "Day -2", daily: 44, cumulative7d: 142, cumulative15d: 188 },
        { date: "Yesterday", daily: 52, cumulative7d: 154, cumulative15d: 240 },
      ],
    },
    terrain: {
      slope: 18.2,
      elevation: 65,
      aspect: "West (260°)",
      twi: 9.1,
      curvature: 0.08,
      ndvi: 0.72,
      soilType: "Alluvial Clay Loam & Lateritic Gravel",
      geology: "Quaternary Alluvium and Biotite Gneiss",
      distToFaultKm: 6.8,
      distToStreamsM: 35,
      distToRoadsM: 40,
    },
    exposure: {
      population: 9400,
      settlements: 28,
      roadNetworkKm: 42.0,
      criticalInfrastructure: 8,
      infrastructureList: [
        "Nilambur Railway Terminus & Bridge",
        "Chaliyar River Flood Protection Bund",
        "Town Central Market & Hospital",
      ],
      evacuationCentres: 6,
      vulnerabilityGrade: "MODERATE",
    },
    historicalEvents: [
      {
        id: "nil-2019",
        year: 2019,
        dateStr: "August 2019",
        title: "Nilambur Floodplain Inundation & Debris Wash",
        description: "Downstream deposition of Kavalappara debris wash along Chaliyar river tributaries.",
        volumeEstimatedM3: "400,000 m³",
        triggerRainfallMm: 290,
        severity: "HIGH",
      },
    ],
    shapFactors: [
      {
        feature: "twi_wetness",
        label: "Very High Wetness / Inundation Index (9.1)",
        valueStr: "9.1",
        shapValue: 0.16,
        category: "Terrain",
      },
      {
        feature: "slope_deg",
        label: "Low Moderate Slope (18.2°)",
        valueStr: "18.2°",
        shapValue: -0.11,
        category: "Terrain",
      },
    ],
    imageKey: "villageSettlement",
  },
  {
    id: "konni",
    name: "Konni",
    panchayat: "Konni Grama Panchayat",
    district: "Pathanamthitta",
    state: "Kerala",
    coordinates: [9.2435, 76.8488],
    riskScore: 0.35,
    riskLevel: "LOW",
    susceptibilityScore: 0.33,
    exposureScore: 0.38,
    confidence: "HIGH",
    rainfallStatus: "NORMAL",
    primaryTrigger: "Stable forested slopes with moderate seasonal drainage",
    summary:
      "Forested reserve sector with moderate slope angles and deep vegetation canopy preventing rapid shear failure.",
    rainfall: {
      day1: 28,
      day3: 56,
      day7: 92,
      day15: 145,
      anomalyPercent: -12,
      records: [
        { date: "Day -14", daily: 4, cumulative7d: 4, cumulative15d: 4 },
        { date: "Day -12", daily: 8, cumulative7d: 12, cumulative15d: 12 },
        { date: "Day -10", daily: 10, cumulative7d: 22, cumulative15d: 22 },
        { date: "Day -8", daily: 14, cumulative7d: 36, cumulative15d: 36 },
        { date: "Day -6", daily: 12, cumulative7d: 38, cumulative15d: 48 },
        { date: "Day -4", daily: 18, cumulative7d: 56, cumulative15d: 66 },
        { date: "Day -3", daily: 22, cumulative7d: 78, cumulative15d: 88 },
        { date: "Day -2", daily: 24, cumulative7d: 84, cumulative15d: 117 },
        { date: "Yesterday", daily: 28, cumulative7d: 92, cumulative15d: 145 },
      ],
    },
    terrain: {
      slope: 15.4,
      elevation: 120,
      aspect: "South-West (230°)",
      twi: 6.2,
      curvature: 0.05,
      ndvi: 0.78,
      soilType: "Deep Forest Loam with High Organic Content",
      geology: "Charnockite Massif",
      distToFaultKm: 8.5,
      distToStreamsM: 220,
      distToRoadsM: 180,
    },
    exposure: {
      population: 2600,
      settlements: 6,
      roadNetworkKm: 12.0,
      criticalInfrastructure: 2,
      infrastructureList: ["Konni-Achankovil Forest Road"],
      evacuationCentres: 2,
      vulnerabilityGrade: "LOW",
    },
    historicalEvents: [],
    shapFactors: [
      {
        feature: "ndvi_cover",
        label: "Dense Forest Canopy Buffer (NDVI 0.78)",
        valueStr: "0.78",
        shapValue: -0.19,
        category: "Environmental",
      },
      {
        feature: "slope_deg",
        label: "Gentle Slope (15.4°)",
        valueStr: "15.4°",
        shapValue: -0.14,
        category: "Terrain",
      },
    ],
    imageKey: "denseForest",
  },
  {
    id: "vithura",
    name: "Vithura / Ponmudi Foothills",
    panchayat: "Vithura Grama Panchayat",
    district: "Thiruvananthapuram",
    state: "Kerala",
    coordinates: [8.6723, 77.0694],
    riskScore: 0.18,
    riskLevel: "VERY LOW",
    susceptibilityScore: 0.16,
    exposureScore: 0.22,
    confidence: "HIGH",
    rainfallStatus: "NORMAL",
    primaryTrigger: "Stable low-gradient terrain under normal rainfall",
    summary:
      "Foothill plateau with stable bedrock geology, intact rubber and forest canopy, and low antecedent rain.",
    rainfall: {
      day1: 15,
      day3: 32,
      day7: 58,
      day15: 85,
      anomalyPercent: -28,
      records: [
        { date: "Day -14", daily: 2, cumulative7d: 2, cumulative15d: 2 },
        { date: "Day -12", daily: 4, cumulative7d: 6, cumulative15d: 6 },
        { date: "Day -10", daily: 6, cumulative7d: 12, cumulative15d: 12 },
        { date: "Day -8", daily: 8, cumulative7d: 20, cumulative15d: 20 },
        { date: "Day -6", daily: 7, cumulative7d: 21, cumulative15d: 27 },
        { date: "Day -4", daily: 10, cumulative7d: 31, cumulative15d: 37 },
        { date: "Day -3", daily: 12, cumulative7d: 43, cumulative15d: 49 },
        { date: "Day -2", daily: 14, cumulative7d: 49, cumulative15d: 70 },
        { date: "Yesterday", daily: 15, cumulative7d: 58, cumulative15d: 85 },
      ],
    },
    terrain: {
      slope: 9.8,
      elevation: 180,
      aspect: "South (180°)",
      twi: 5.8,
      curvature: 0.02,
      ndvi: 0.81,
      soilType: "Deep Red Sandy Clay",
      geology: "Garnet-Biotite Gneiss",
      distToFaultKm: 12.0,
      distToStreamsM: 320,
      distToRoadsM: 150,
    },
    exposure: {
      population: 3100,
      settlements: 7,
      roadNetworkKm: 14.5,
      criticalInfrastructure: 2,
      infrastructureList: ["Vithura-Ponmudi Access Road"],
      evacuationCentres: 3,
      vulnerabilityGrade: "LOW",
    },
    historicalEvents: [],
    shapFactors: [
      {
        feature: "ndvi_cover",
        label: "Intact Canopy Coverage (NDVI 0.81)",
        valueStr: "0.81",
        shapValue: -0.22,
        category: "Environmental",
      },
      {
        feature: "slope_deg",
        label: "Low Slope Gradient (9.8°)",
        valueStr: "9.8°",
        shapValue: -0.20,
        category: "Terrain",
      },
    ],
    imageKey: "heroLandscape",
  },
];

export function getLocationById(id: string): LocationData | undefined {
  return MOCK_LOCATIONS.find((loc) => loc.id.toLowerCase() === id.toLowerCase());
}
