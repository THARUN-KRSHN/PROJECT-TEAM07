"use client";

import React, { useState } from "react";
import {
  CloudRain,
  Database,
  Layers,
  MapPin,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  Activity,
  Server,
  Radio,
} from "lucide-react";
import { PresentationStep } from "@/data/presentationData";

interface StepVisualMockupProps {
  step: PresentationStep;
  onJumpToStep?: (stepIndex: number) => void;
}

export const StepVisualMockup: React.FC<StepVisualMockupProps> = ({ step }) => {
  // Local state for step-specific interactivity
  const [selectedHotspot, setSelectedHotspot] = useState<"wayanad" | "idukki" | "nilambur">("wayanad");
  const [simulatedRainfall, setSimulatedRainfall] = useState<number>(245);
  const [activeDbTab, setActiveDbTab] = useState<"postgis" | "geoparquet" | "cache">("postgis");
  const clusterEpsilon = 1.5;

  return (
    <div className="w-full h-full p-4 sm:p-7 flex flex-col justify-between text-[#202923] bg-[#FAFCFA]">
      {/* Top Context Indicator */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#E1E6E1] text-xs">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#EBF5EE] text-[#247343] font-bold border border-[#A7D7B9] uppercase tracking-wider text-[10px]">
            {step.focusArea}
          </span>
          <span className="text-[#526056] font-mono text-[11px] hidden sm:inline">
            Module: {step.slug.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#247343] font-mono text-[11px] font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-[#247343] animate-ping" />
          <span>{step.mockupDisplay.badgeText}</span>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="flex-1 py-5 flex flex-col justify-center">
        {/* STEP 1: Topography Crisis */}
        {step.mockupDisplay.type === "topography_crisis" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* 3D-styled Elevation Card */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-[#E1E6E1] shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-bold text-[#247343] uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#247343]" /> Western Ghats Topographic Escarpment
                </span>
                <span className="text-[11px] font-mono font-semibold text-[#D97706] bg-[#FFFBEB] px-2.5 py-1 rounded-full border border-[#FCD34D]">
                  Monsoon Cloudburst Anomaly
                </span>
              </div>

              {/* Graphic terrain relief mockup */}
              <div className="h-44 sm:h-52 rounded-xl bg-gradient-to-b from-[#F3F8F5] to-[#E9F3EC] border border-[#C5DEC8] p-4 relative flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#247343_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Hotspot Pulse Pins */}
                <div className="relative z-10 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedHotspot("wayanad")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
                      selectedHotspot === "wayanad"
                        ? "bg-[#DC2626] text-white shadow-md shadow-red-500/20"
                        : "bg-white text-[#202923] border border-[#CBD5E1] hover:bg-[#F1F5F9]"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>Wayanad (Meppadi / Chooralmala)</span>
                  </button>
                  <button
                    onClick={() => setSelectedHotspot("idukki")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
                      selectedHotspot === "idukki"
                        ? "bg-[#DC2626] text-white shadow-md shadow-red-500/20"
                        : "bg-white text-[#202923] border border-[#CBD5E1] hover:bg-[#F1F5F9]"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Idukki Highland Gap</span>
                  </button>
                  <button
                    onClick={() => setSelectedHotspot("nilambur")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
                      selectedHotspot === "nilambur"
                        ? "bg-[#DC2626] text-white shadow-md shadow-red-500/20"
                        : "bg-white text-[#202923] border border-[#CBD5E1] hover:bg-[#F1F5F9]"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span>Nilambur Valley</span>
                  </button>
                </div>

                {/* Terrain Cross Section Representation */}
                <div className="relative z-10 bg-white/95 backdrop-blur rounded-xl p-3.5 border border-[#CBD5E1] shadow-xs">
                  <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                    <span className="text-[#202923]">Slope Angle: 36.4° (Critical Shear Angle)</span>
                    <span className="text-[#DC2626]">Failure Probability: 89%</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 transition-all duration-500 rounded-full"
                      style={{ width: `${Math.min(100, simulatedRainfall / 3)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-semibold text-[#526056] mt-1.5">
                    <span>Stable (0-15°)</span>
                    <span>Moderate (15-25°)</span>
                    <span className="text-[#DC2626] font-bold">Critical (&gt;28°)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Rainfall & Saturation Meter */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-[#E1E6E1] shadow-sm">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-[#202923] flex items-center gap-2">
                    <CloudRain className="w-4 h-4 text-cyan-600" /> Antecedent Rain Saturation
                  </span>
                  <span className="text-cyan-700 font-mono text-xs font-extrabold bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
                    {simulatedRainfall} mm / 72h
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="350"
                  value={simulatedRainfall}
                  onChange={(e) => setSimulatedRainfall(Number(e.target.value))}
                  className="w-full accent-[#247343] h-2 bg-[#E2E8F0] rounded-lg cursor-pointer"
                />
                <div className="mt-3 text-xs">
                  {simulatedRainfall > 220 ? (
                    <span className="text-[#DC2626] font-bold flex items-center gap-1.5 bg-red-50 p-2 rounded-lg border border-red-200">
                      <AlertTriangle className="w-4 h-4 shrink-0" /> Critical soil pore liquefaction threshold breached!
                    </span>
                  ) : (
                    <span className="text-[#247343] font-bold flex items-center gap-1.5 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 shrink-0" /> Safe sub-critical moisture infiltration.
                    </span>
                  )}
                </div>
              </div>

              {/* The Core Need Box */}
              <div className="p-4 rounded-2xl bg-[#EBF5EE] border border-[#A7D7B9] text-xs space-y-1.5 shadow-xs">
                <div className="font-extrabold text-[#247343]">The Core Innovation:</div>
                <p className="text-[#36493D] text-xs leading-relaxed">
                  IMD alerts broadcast a single color for an entire 2,131 km² district. GiriRaksha evaluates exact slope morphology and micro-catchment water saturation at 30-meter resolution.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Big Data Ingestion */}
        {step.mockupDisplay.type === "streaming_pipeline" && (
          <div className="space-y-4">
            {/* Pipeline Stream Visualizer */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
              {[
                { name: "Copernicus GLO-30 DEM", format: "GeoTIFF (30m)", rate: "240 MB/s", icon: Layers, color: "text-[#247343]", bg: "bg-emerald-50" },
                { name: "IMD Gridded Telemetry", format: "NetCDF / JSON", rate: "12 msg/s", icon: Radio, color: "text-blue-600", bg: "bg-blue-50" },
                { name: "NASA IMERG Precipitation", format: "HDF5 Grids", rate: "48 MB/s", icon: CloudRain, color: "text-cyan-600", bg: "bg-cyan-50" },
                { name: "OpenStreetMap Infrastructure", format: "Vector GeoJSON", rate: "85 k/s", icon: MapPin, color: "text-amber-600", bg: "bg-amber-50" },
              ].map((src, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-[#E1E6E1] shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className={`p-2 rounded-xl ${src.bg}`}>
                      <src.icon className={`w-4 h-4 ${src.color}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-[#F1F5F9] text-[#526056] px-2 py-0.5 rounded-full border border-[#CBD5E1]">
                      {src.format}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#202923]">{src.name}</div>
                  <div className="mt-3 pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] font-mono text-[#247343] font-bold">
                    <span>Flow Rate</span>
                    <span>{src.rate}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Central Stream Hub: Apache Kafka */}
            <div className="p-5 rounded-2xl bg-white border border-[#247343]/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#EBF5EE] border border-[#247343] flex items-center justify-center text-[#247343] font-black text-lg shadow-xs">
                  K
                </div>
                <div>
                  <div className="text-sm font-bold text-[#202923] flex items-center gap-2">
                    <span>Apache Kafka Streaming Partition Bus</span>
                    <span className="text-[10px] bg-emerald-100 text-[#247343] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      District Partitioning
                    </span>
                  </div>
                  <div className="text-xs text-[#526056] mt-0.5">
                    Standardizes EPSG:4326 lat/long into planar UTM Zone 43N (EPSG:32643) with zero telemetry loss.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="text-right">
                  <div className="text-[#526056] text-[10px] font-semibold">Total Ingested</div>
                  <div className="text-[#247343] font-black text-sm">1.2 TB / Monsoon</div>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#247343] animate-ping" />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Databases & Storage Layer */}
        {step.mockupDisplay.type === "database_architecture" && (
          <div className="space-y-4">
            {/* Interactive Database Tabs */}
            <div className="flex items-center gap-2 border-b border-[#E1E6E1] pb-2.5">
              <button
                onClick={() => setActiveDbTab("postgis")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                  activeDbTab === "postgis"
                    ? "bg-[#247343] text-white shadow-sm"
                    : "bg-white text-[#526056] border border-[#CBD5E1] hover:bg-[#F1F5F9]"
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>PostGIS Spatial Database</span>
              </button>
              <button
                onClick={() => setActiveDbTab("geoparquet")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                  activeDbTab === "geoparquet"
                    ? "bg-[#247343] text-white shadow-sm"
                    : "bg-white text-[#526056] border border-[#CBD5E1] hover:bg-[#F1F5F9]"
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span>GeoParquet Data Lake</span>
              </button>
              <button
                onClick={() => setActiveDbTab("cache")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                  activeDbTab === "cache"
                    ? "bg-[#247343] text-white shadow-sm"
                    : "bg-white text-[#526056] border border-[#CBD5E1] hover:bg-[#F1F5F9]"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Fast In-Memory Cache (TTL 600s)</span>
              </button>
            </div>

            {/* Simulated Live Query Runner */}
            <div className="bg-[#1E293B] text-slate-100 rounded-2xl p-5 border border-slate-700 font-mono text-xs shadow-md">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-700 text-xs">
                <span className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Terminal className="w-4 h-4" /> Live Spatial SQL Execution (PostGIS GiST Index)
                </span>
                <span className="text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800 text-[10px] font-bold">
                  Latency: 4.2 ms
                </span>
              </div>

              <pre className="text-emerald-300 py-3 text-xs overflow-x-auto leading-relaxed">
{`SELECT cell_id, name, slope_deg, ST_AsGeoJSON(geom)
FROM spatial_risk_grid
WHERE ST_Intersects(geom, ST_MakeEnvelope(75.8, 11.2, 76.5, 11.8, 4326))
  AND soil_saturation >= 0.75
ORDER BY risk_score DESC
LIMIT 5;`}
              </pre>

              <div className="pt-2.5 border-t border-slate-700 flex items-center justify-between text-xs text-slate-300">
                <span>R-Tree Spatial Index Speedup: <strong>48x faster</strong> than scan</span>
                <span className="text-emerald-400 font-bold">5 Rows Returned in 4.2ms</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Data Mining: Clustering & Association Rules */}
        {step.mockupDisplay.type === "data_mining_clustering" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* DBSCAN Visualizer */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-[#E1E6E1] shadow-sm space-y-3.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#247343]">DBSCAN Spatial Cluster Identification</span>
                <span className="font-mono text-[#526056] text-[11px] bg-[#F1F5F9] px-2.5 py-1 rounded-full">
                  ε = {clusterEpsilon} km
                </span>
              </div>

              {/* Cluster Map Representation */}
              <div className="h-44 bg-[#F8FAFC] rounded-xl border border-[#CBD5E1] p-4 relative flex items-center justify-around overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#247343_1px,transparent_1px)] [background-size:12px_12px]" />

                <div className="relative z-10 p-3 rounded-2xl bg-red-50 border-2 border-red-500 text-center shadow-xs">
                  <span className="text-xs font-extrabold text-red-700 block">Cluster #01</span>
                  <span className="text-[11px] font-semibold text-red-900">Meppadi Corridor</span>
                </div>
                <div className="relative z-10 p-3 rounded-2xl bg-amber-50 border-2 border-amber-500 text-center shadow-xs">
                  <span className="text-xs font-extrabold text-amber-700 block">Cluster #02</span>
                  <span className="text-[11px] font-semibold text-amber-900">Vellarimala Scarp</span>
                </div>
                <div className="relative z-10 p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-center shadow-xs">
                  <span className="text-xs font-extrabold text-emerald-700 block">Cluster #03</span>
                  <span className="text-[11px] font-semibold text-emerald-900">Vythiri Foothills</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#526056]">
                <span className="font-semibold">1km Spatial Buffer De-Duplication:</span>
                <span className="text-[#247343] font-bold">114 Duplicate Overlaps Collapsed</span>
              </div>
            </div>

            {/* Spatial Association Rules Table */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#E1E6E1] shadow-sm space-y-3">
              <span className="text-xs font-bold text-[#202923] block">Discovered Association Rules</span>
              <div className="space-y-2.5 text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FCD34D]">
                  <div className="text-amber-900 font-bold">IF (Slope &gt; 28°) ∧ (3D Rain &gt; 200mm)</div>
                  <div className="text-[#526056] flex justify-between mt-1 text-[11px]">
                    <span>Confidence: 92.4%</span>
                    <span className="text-[#247343] font-bold">Lift: 4.82x</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]">
                  <div className="text-blue-900 font-bold">IF (Road Cut &lt; 50m) ∧ (TWI &gt; 8.5)</div>
                  <div className="text-[#526056] flex justify-between mt-1 text-[11px]">
                    <span>Confidence: 87.1%</span>
                    <span className="text-[#247343] font-bold">Lift: 3.65x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Feature Engineering Tensor */}
        {step.mockupDisplay.type === "feature_tensor" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-2xl bg-white border border-[#E1E6E1] shadow-sm">
                <div className="text-xs font-bold text-[#247343] mb-1.5 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#247343]" />
                  <span>Topographic Derivatives</span>
                </div>
                <ul className="text-xs text-[#526056] space-y-1">
                  <li>• Slope Angle (degrees)</li>
                  <li>• Aspect (cardinal azimuth)</li>
                  <li>• Profile & Plan Curvature</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-cyan-200 shadow-sm">
                <div className="text-xs font-bold text-cyan-800 mb-1.5 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-600" />
                  <span>Hydrological Indices</span>
                </div>
                <ul className="text-xs text-[#526056] space-y-1">
                  <li>• Topographic Wetness: ln(a / tan β)</li>
                  <li>• Stream Power Index (SPI)</li>
                  <li>• Catchment Flow Accumulation</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-sm">
                <div className="text-xs font-bold text-blue-800 mb-1.5 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Antecedent Inflow Tensors</span>
                </div>
                <ul className="text-xs text-[#526056] space-y-1">
                  <li>• 1-Day Flash Shock (mm)</li>
                  <li>• 3-Day Shallow Saturation (mm)</li>
                  <li>• 7-Day & 15-Day Deep Pore Saturation</li>
                </ul>
              </div>
            </div>

            {/* Multi-Window Rainfall Bar Graph Mockup */}
            <div className="bg-white rounded-2xl p-5 border border-[#E1E6E1] shadow-sm">
              <div className="flex items-center justify-between text-xs mb-3 font-bold">
                <span className="text-[#202923]">Antecedent Precipitation Water Inflow Windows</span>
                <span className="text-[11px] font-mono text-[#247343] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Station: Meppadi (Wayanad)
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3.5 text-center">
                {[
                  { window: "1-Day Inflow", val: "84 mm", status: "Moderate Trigger", color: "bg-cyan-500", h: "45%" },
                  { window: "3-Day Inflow", val: "245 mm", status: "Severe Saturation", color: "bg-amber-500", h: "75%" },
                  { window: "7-Day Inflow", val: "412 mm", status: "Critical Pore Pressure", color: "bg-red-500", h: "90%" },
                  { window: "15-Day Inflow", val: "730 mm", status: "Aquifer Saturated", color: "bg-purple-600", h: "100%" },
                ].map((w, idx) => (
                  <div key={idx} className="bg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0] flex flex-col justify-between h-30 shadow-xs">
                    <span className="text-xs text-[#202923] font-bold">{w.window}</span>
                    <div className="w-full bg-[#E2E8F0] rounded-full h-2.5 my-1.5 overflow-hidden">
                      <div className={`h-full ${w.color} rounded-full`} style={{ width: w.h }} />
                    </div>
                    <span className="text-xs font-mono font-black text-[#202923]">{w.val}</span>
                    <span className="text-[10px] text-[#526056] font-medium truncate">{w.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Machine Learning Benchmark & TreeSHAP */}
        {step.mockupDisplay.type === "ml_benchmark_shap" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Algorithm Benchmark Comparison */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-[#E1E6E1] shadow-sm space-y-3">
              <div className="text-xs font-bold text-[#247343]">Ensemble Algorithm Evaluation (Spatial-Block CV)</div>
              <div className="space-y-2.5">
                {[
                  { name: "Gradient Boosting (XGBoost)", auc: "0.997", f1: "0.991", best: true },
                  { name: "Random Forest Classifier", auc: "0.996", f1: "0.965", best: false },
                  { name: "Logistic Regression Baseline", auc: "1.000", f1: "1.000", best: false },
                ].map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                      m.best
                        ? "bg-[#EBF5EE] border-[#247343] text-[#202923] font-bold"
                        : "bg-[#F8FAFC] border-[#E2E8F0] text-[#526056]"
                    }`}
                  >
                    <div>
                      <div className="font-bold flex items-center gap-2">
                        <span>{m.name}</span>
                        {m.best && (
                          <span className="text-[9px] bg-[#247343] text-white px-2 py-0.5 rounded-full font-bold uppercase">
                            Champion
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#526056] font-normal">Spatial-Block 5-Fold Evaluation</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-[#247343] font-black text-sm">AUC: {m.auc}</div>
                      <div className="text-[11px] text-[#526056]">F1: {m.f1}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TreeSHAP Waterfall Explanation */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-[#E1E6E1] shadow-sm space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#202923]">TreeSHAP Explainability Waterfall</span>
                <span className="text-[11px] font-mono text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  Chooralmala, Wayanad
                </span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center p-2 rounded-lg bg-[#F8FAFC]">
                  <span className="text-[#526056]">Baseline Regional Hazard:</span>
                  <span className="text-[#202923] font-bold">0.21</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-red-50 text-red-700">
                  <span>+ Slope Angle (34.5°):</span>
                  <span className="font-bold">+0.34</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-red-50 text-red-700">
                  <span>+ 3-Day Inflow (245mm):</span>
                  <span className="font-bold">+0.28</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-red-50 text-red-700">
                  <span>+ Road Cut Proximity (&lt;40m):</span>
                  <span className="font-bold">+0.11</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-red-600 text-white font-bold shadow-xs">
                  <span>Final Predicted Susceptibility:</span>
                  <span className="text-sm">0.94 (VERY HIGH)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Google Gemini Real-Time AI */}
        {step.mockupDisplay.type === "gemini_realtime_ai" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Live Weather Feed */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#E1E6E1] shadow-sm space-y-3.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-cyan-800 flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-cyan-600" /> Open-Meteo Live API Telemetry
                </span>
                <span className="text-[10px] font-mono bg-cyan-50 text-cyan-700 px-2.5 py-0.5 rounded-full border border-cyan-200">
                  Synced: Real-Time
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex justify-between">
                  <span className="text-[#526056]">Current Rainfall Intensity:</span>
                  <span className="text-cyan-700 font-extrabold font-mono">48.2 mm/hr (Cloudburst)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex justify-between">
                  <span className="text-[#526056]">24-Hour Forecast Inflow:</span>
                  <span className="text-amber-700 font-extrabold font-mono">180 mm Expected</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex justify-between">
                  <span className="text-[#526056]">Atmospheric Pressure:</span>
                  <span className="text-[#202923] font-bold font-mono">998 hPa (Low Depression)</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#EBF5EE] border border-[#A7D7B9] text-xs text-[#247343] font-medium flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>API key strictly preserved server-side in FastAPI.</span>
              </div>
            </div>

            {/* Gemini Live Advisory Console */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-[#247343] shadow-md space-y-3">
              <div className="flex items-center justify-between text-xs pb-2.5 border-b border-[#E1E6E1]">
                <div className="flex items-center gap-2 text-[#247343] font-bold">
                  <Sparkles className="w-4 h-4 text-[#247343] animate-spin" />
                  <span>Google Gemini 3.8 Flash Situational Advisory</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#247343] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Inference: 1.1s
                </span>
              </div>

              {/* Streaming Output Box */}
              <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#CBD5E1] text-xs space-y-2.5 text-[#202923]">
                <div className="font-extrabold text-[#DC2626] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> CRITICAL EVACUATION ADVISORY (Chooralmala Catchment)
                </div>
                <p className="text-xs text-[#526056] leading-relaxed">
                  Antecedent soil saturation has reached 94% with 48.2 mm/hr sustained intensity. High probability of translational debris slide along lower stream gullies within 6 hours.
                </p>
                <div className="p-3 rounded-xl bg-[#EBF5EE] text-xs text-[#247343] border border-[#A7D7B9] font-medium">
                  <strong>Recommended Dispatch:</strong> Immediate evacuation of 42 households along Chooralmala tea estate slope. Open emergency shelter at St. Joseph Higher Secondary School.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: GIS Mission Control */}
        {step.mockupDisplay.type === "gis_mission_control" && (
          <div className="space-y-4">
            {/* 5-Tier Operational Legend Tickers */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[
                { level: "VERY LOW", color: "bg-[#247343]", border: "border-[#A7D7B9]", bg: "bg-[#F3F8F5]", cells: "54 Sectors", action: "Routine Monitor" },
                { level: "LOW", color: "bg-[#65A30D]", border: "border-[#BEF264]", bg: "bg-[#F7FEE7]", cells: "36 Sectors", action: "Weather Watch" },
                { level: "MODERATE", color: "bg-[#D97706]", border: "border-[#FCD34D]", bg: "bg-[#FFFBEB]", cells: "22 Sectors", action: "Prepare Kits" },
                { level: "HIGH", color: "bg-[#EA580C]", border: "border-[#FDBA74]", bg: "bg-[#FFF7ED]", cells: "12 Sectors", action: "Relocation Alert" },
                { level: "VERY HIGH", color: "bg-[#DC2626]", border: "border-[#FCA5A5]", bg: "bg-[#FDF2F2]", cells: "7 Sectors", action: "Immediate Evacuation" },
              ].map((lvl, i) => (
                <div key={i} className={`p-3 rounded-2xl ${lvl.bg} border ${lvl.border} text-left shadow-xs`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-3 h-3 rounded-full ${lvl.color}`} />
                    <span className="text-xs font-bold text-[#202923]">{lvl.level}</span>
                  </div>
                  <div className="text-[11px] text-[#526056] font-medium">{lvl.cells}</div>
                  <div className="text-[10px] text-[#247343] font-bold truncate mt-0.5">{lvl.action}</div>
                </div>
              ))}
            </div>

            {/* GIS Platform Features Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 bg-white rounded-2xl border border-[#E1E6E1] shadow-sm">
                <div className="text-xs font-bold text-[#247343] mb-1">Interactive Map &amp; Dossiers</div>
                <p className="text-xs text-[#526056]">
                  Leaflet &amp; OpenStreetMap tile layer with pan/zoom, coordinate geocoding, and water-inflow graphs.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#E1E6E1] shadow-sm">
                <div className="text-xs font-bold text-cyan-700 mb-1">Downloadable PDF Reports</div>
                <p className="text-xs text-[#526056]">
                  Generates customized printable risk dossiers &amp; PNG summaries directly inside browser for collectors.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#E1E6E1] shadow-sm">
                <div className="text-xs font-bold text-amber-700 mb-1">Emergency Dispatch Router</div>
                <p className="text-xs text-[#526056]">
                  Integrated with National Emergency (112), District (1077), and State Control Room (1070).
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status & Key Insight Footer */}
      <div className="pt-3.5 border-t border-[#E1E6E1] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-[#526056]">
          <Activity className="w-4 h-4 text-[#247343]" />
          <span className="font-bold text-[#202923]">Operational Takeaway:</span>
          <span className="text-[#526056] truncate max-w-sm sm:max-w-xl">
            {step.mockupDisplay.statusSummary}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#247343] font-bold">
          <span>GiriRaksha v3.2 Enterprise</span>
        </div>
      </div>
    </div>
  );
};
