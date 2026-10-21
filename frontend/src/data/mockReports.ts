// Mock Risk Reports Data for GiriRaksha
// Ready for preview, printing and simulated PDF export

import { RiskLevel } from "@/lib/utils";

export interface ReportItem {
  id: string;
  reportNumber: string;
  title: string;
  locationId: string;
  locationName: string;
  district: string;
  riskScore: number;
  riskLevel: RiskLevel;
  generatedDate: string;
  validUntil: string;
  author: string;
  evacuationStatus: "IMMEDIATE EVACUATION ADVISED" | "HIGH ALERT / STANDBY" | "MONITOR CONDITIONS" | "NORMAL";
  keyFindings: string[];
  recommendedActions: string[];
  rainfallStatus: string;
  fileSizeBytes: string;
}

export const MOCK_REPORTS: ReportItem[] = [
  {
    id: "rep-mep-01",
    reportNumber: "GR-WYD-2026-0891",
    title: "Meppadi Critical Slope & Antecedent Rainfall Hazard Advisory",
    locationId: "meppadi",
    locationName: "Meppadi",
    district: "Wayanad",
    riskScore: 0.87,
    riskLevel: "VERY HIGH",
    generatedDate: "October 07, 2026 • 06:00 IST",
    validUntil: "October 08, 2026 • 06:00 IST",
    author: "GiriRaksha Automated Geospatial Ensemble (District Emergency Operations)",
    evacuationStatus: "IMMEDIATE EVACUATION ADVISED",
    rainfallStatus: "387 mm (7-day Cumulative) • Red Threshold Exceeded",
    fileSizeBytes: "2.4 MB PDF",
    keyFindings: [
      "Vellarmala-Chooralmala scarp zone reached critical pore-water overpressure.",
      "7-day antecedent precipitation exceeded 99th percentile historical baseline.",
      "Direct exposure across SH-54 corridor and 12 plantation settlements (4,280 residents).",
      "SHAP attribution confirms rainfall (+0.24) and slope (+0.21) as overwhelming drivers.",
    ],
    recommendedActions: [
      "Evacuate vulnerable settlements along primary debris funnel paths to designated camps.",
      "Halt heavy vehicular traffic along SH-54 Meppadi hill highway sector.",
      "Deploy NDRF / Kerala Fire & Rescue strike units at Vythiri staging base.",
      "Activate community sirens and Grama Panchayat emergency WhatsApp alert tree.",
    ],
  },
  {
    id: "rep-puth-02",
    reportNumber: "GR-WYD-2026-0892",
    title: "Puthumala Ridge Colluvial Saturation & Scarp Rupture Bulletin",
    locationId: "puthumala",
    locationName: "Puthumala",
    district: "Wayanad",
    riskScore: 0.91,
    riskLevel: "VERY HIGH",
    generatedDate: "October 07, 2026 • 05:30 IST",
    validUntil: "October 07, 2026 • 23:59 IST",
    author: "GiriRaksha Automated Geospatial Ensemble",
    evacuationStatus: "IMMEDIATE EVACUATION ADVISED",
    rainfallStatus: "412 mm (7-day Cumulative) • Critical Liquefaction Stage",
    fileSizeBytes: "1.9 MB PDF",
    keyFindings: [
      "Steep 36.8° slope sector exhibiting extensive topsoil tension cracks.",
      "15-day cumulative rainfall reached 560 mm, matching 2019 trigger profile.",
      "Hydrological convergence (TWI 8.7) concentrating torrential runoff into tea line valleys.",
    ],
    recommendedActions: [
      "Execute precautionary relocation of 2,850 hillside residents.",
      "Cordone off lower valley drainage weirs and bridge crossings.",
      "Maintain active telemetry link with automatic weather station sensors.",
    ],
  },
  {
    id: "rep-kav-03",
    reportNumber: "GR-MLP-2026-0742",
    title: "Kavalappara Muthappankunnu Subsurface Piping Hazard Assessment",
    locationId: "kavalappara",
    locationName: "Kavalappara",
    district: "Malappuram",
    riskScore: 0.84,
    riskLevel: "VERY HIGH",
    generatedDate: "October 06, 2026 • 18:00 IST",
    validUntil: "October 07, 2026 • 18:00 IST",
    author: "KSDMA Geospatial Analytical Cell & GiriRaksha Engine",
    evacuationStatus: "HIGH ALERT / STANDBY",
    rainfallStatus: "340 mm (7-day Cumulative) • Severe Saturation",
    fileSizeBytes: "2.1 MB PDF",
    keyFindings: [
      "Historic slide scar shows reactivation signs under sustained 110 mm daily rainfall.",
      "Subsurface piping conduits discharging turbid discharge along Muthappan toe.",
      "9 settlements and 3,600 population within debris hazard buffer zone.",
    ],
    recommendedActions: [
      "Place Pothukal relief centres on standby with non-perishable rations.",
      "Restricted night travel along foot-trails and low-lying culverts.",
    ],
  },
  {
    id: "rep-idk-04",
    reportNumber: "GR-IDK-2026-0518",
    title: "Idukki Arch Area Precipitous Highway Cutoff & Rock Wedge Advisory",
    locationId: "idukki-gap",
    locationName: "Idukki Arch Area",
    district: "Idukki",
    riskScore: 0.73,
    riskLevel: "HIGH",
    generatedDate: "October 06, 2026 • 12:00 IST",
    validUntil: "October 07, 2026 • 12:00 IST",
    author: "District Disaster Management Authority (DDMA) Idukki",
    evacuationStatus: "MONITOR CONDITIONS",
    rainfallStatus: "245 mm (7-day Cumulative) • Above Normal",
    fileSizeBytes: "1.8 MB PDF",
    keyFindings: [
      "High precipitous rocky slope (38.5°) subject to differential joint weathering.",
      "Heavy runoff over road cuts on NH extension corridor posing rockfall threat.",
    ],
    recommendedActions: [
      "Deploy highway patrols for clearing minor boulder debris.",
      "Caution signages activated at steep cuttings.",
    ],
  },
  {
    id: "rep-dev-05",
    reportNumber: "GR-IDK-2026-0520",
    title: "Devikulam & Gap Road High-Altitude Slope Stability Brief",
    locationId: "devikulam",
    locationName: "Devikulam",
    district: "Idukki",
    riskScore: 0.78,
    riskLevel: "HIGH",
    generatedDate: "October 05, 2026 • 20:00 IST",
    validUntil: "October 07, 2026 • 20:00 IST",
    author: "GiriRaksha Automated Geospatial Ensemble",
    evacuationStatus: "HIGH ALERT / STANDBY",
    rainfallStatus: "285 mm (7-day Cumulative) • Heavy Inflow",
    fileSizeBytes: "2.2 MB PDF",
    keyFindings: [
      "Steep 35.6° slopes in high altitude tea gardens near Gap Road corridor.",
      "Terraced slope modifications increasing surface runoff shear stress.",
    ],
    recommendedActions: [
      "Strict monitoring of road cut revetment walls.",
      "Prevent night parking beneath high overhang sections.",
    ],
  },
];
