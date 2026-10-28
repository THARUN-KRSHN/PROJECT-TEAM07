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

  // Render individual step visualization
  return (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col justify-between text-slate-200">
      {/* Top Context Indicator */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1E2E23] text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-emerald-950/70 text-emerald-400 font-semibold border border-emerald-800/60 uppercase tracking-wider text-[10px]">
            {step.focusArea}
          </span>
          <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
            Module: {step.slug.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{step.mockupDisplay.badgeText}</span>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="flex-1 py-4 flex flex-col justify-center">
        {/* STEP 1: Topography Crisis */}
        {step.mockupDisplay.type === "topography_crisis" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* 3D-styled Elevation Card */}
            <div className="lg:col-span-7 bg-[#0c1610] rounded-xl p-5 border border-[#213527] relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Western Ghats Topographic Escarpment
                </span>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/40">
                  Monsoon Cloudburst Anomaly
                </span>
              </div>

              {/* Graphic terrain relief mockup */}
              <div className="h-44 sm:h-52 rounded-lg bg-gradient-to-b from-[#132219] to-[#0A120D] border border-[#24392B] p-4 relative flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Hotspot Pulse Pins */}
                <div className="relative z-10 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedHotspot("wayanad")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      selectedHotspot === "wayanad"
                        ? "bg-red-600 text-white shadow-lg shadow-red-900/50 border border-red-400"
                        : "bg-[#182B1F] text-slate-300 hover:bg-[#1E3627]"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-red-300 animate-ping" />
                    <span>Wayanad (Meppadi / Chooralmala)</span>
                  </button>
                  <button
                    onClick={() => setSelectedHotspot("idukki")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      selectedHotspot === "idukki"
                        ? "bg-red-600 text-white shadow-lg shadow-red-900/50 border border-red-400"
                        : "bg-[#182B1F] text-slate-300 hover:bg-[#1E3627]"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Idukki Highland Gap</span>
                  </button>
                  <button
                    onClick={() => setSelectedHotspot("nilambur")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      selectedHotspot === "nilambur"
                        ? "bg-red-600 text-white shadow-lg shadow-red-900/50 border border-red-400"
                        : "bg-[#182B1F] text-slate-300 hover:bg-[#1E3627]"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-orange-400" />
                    <span>Nilambur Valley</span>
                  </button>
                </div>

                {/* Terrain Cross Section Representation */}
                <div className="relative z-10 bg-[#0E1912]/90 backdrop-blur rounded p-3 border border-[#253A2C]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Slope Angle: 36.4° (High Shear)</span>
                    <span className="text-red-400 font-bold">Failure Risk: 89%</span>
                  </div>
                  <div className="w-full bg-[#1A2C21] rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 transition-all duration-500"
                      style={{ width: `${Math.min(100, simulatedRainfall / 3)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Stable (0-15°)</span>
                    <span>Moderate (15-25°)</span>
                    <span className="text-red-400 font-semibold">Critical (&gt;28°)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Rainfall & Saturation Meter */}
            <div className="lg:col-span-5 space-y-3">
              <div className="bg-[#0C1610] rounded-xl p-4 border border-[#213527]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <CloudRain className="w-4 h-4 text-cyan-400" /> Antecedent Rain Saturation
                  </span>
                  <span className="text-cyan-400 font-mono text-xs font-bold">
                    {simulatedRainfall} mm / 72h
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="350"
                  value={simulatedRainfall}
                  onChange={(e) => setSimulatedRainfall(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-[#1B2F22] rounded-lg cursor-pointer"
                />
                <div className="mt-2 text-[11px] text-slate-400">
                  {simulatedRainfall > 220 ? (
                    <span className="text-red-400 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Soil liquefaction threshold breached!
                    </span>
                  ) : (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Sub-critical antecedent infiltration.
                    </span>
                  )}
                </div>
              </div>

              {/* The Core Need Box */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-800/40 text-xs space-y-1.5">
                <div className="font-bold text-emerald-300">The Problem Solved:</div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  IMD district alerts broadcast a single color for an entire 2,131 km² district. GiriRaksha evaluates exact slope morphology and micro-catchment saturation at 30-meter resolution.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Big Data Ingestion */}
        {step.mockupDisplay.type === "streaming_pipeline" && (
          <div className="space-y-4">
            {/* Pipeline Stream Visualizer */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                { name: "Copernicus GLO-30 DEM", format: "GeoTIFF (30m)", rate: "240 MB/s", icon: Layers, color: "text-emerald-400" },
                { name: "IMD Gridded Telemetry", format: "NetCDF / JSON", rate: "12 msg/s", icon: Radio, color: "text-cyan-400" },
                { name: "NASA IMERG Precipitation", format: "HDF5 Grids", rate: "48 MB/s", icon: CloudRain, color: "text-blue-400" },
                { name: "OpenStreetMap Infrastructure", format: "Vector GeoJSON", rate: "85 k/s", icon: MapPin, color: "text-amber-400" },
              ].map((src, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#0c1610] border border-[#213527] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <src.icon className={`w-4 h-4 ${src.color}`} />
                    <span className="text-[10px] font-mono bg-[#16271D] text-slate-300 px-1.5 py-0.5 rounded">
                      {src.format}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-100">{src.name}</div>
                  <div className="mt-2 pt-2 border-t border-[#1C2C20] flex items-center justify-between text-[10px] font-mono text-emerald-400">
                    <span>Flow Rate</span>
                    <span>{src.rate}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Central Stream Hub: Apache Kafka */}
            <div className="p-4 rounded-xl bg-[#09120D] border border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-300 font-bold text-sm">
                  K
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                    <span>Apache Kafka Streaming Partition Bus</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.2 rounded-full font-mono">
                      Partitioned by District
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Standardizes EPSG:4326 lat/long into planar UTM Zone 43N (EPSG:32643) with zero telemetry loss.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="text-right">
                  <div className="text-slate-400 text-[10px]">Total Ingested</div>
                  <div className="text-emerald-400 font-bold">1.2 TB / Monsoon</div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Databases & Storage Layer */}
        {step.mockupDisplay.type === "database_architecture" && (
          <div className="space-y-4">
            {/* Interactive Database Tabs */}
            <div className="flex items-center gap-2 border-b border-[#213527] pb-2">
              <button
                onClick={() => setActiveDbTab("postgis")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                  activeDbTab === "postgis"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/30"
                    : "bg-[#132219] text-slate-300 hover:bg-[#1A2E22]"
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>PostGIS Spatial Database</span>
              </button>
              <button
                onClick={() => setActiveDbTab("geoparquet")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                  activeDbTab === "geoparquet"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/30"
                    : "bg-[#132219] text-slate-300 hover:bg-[#1A2E22]"
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span>GeoParquet Data Lake</span>
              </button>
              <button
                onClick={() => setActiveDbTab("cache")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                  activeDbTab === "cache"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/30"
                    : "bg-[#132219] text-slate-300 hover:bg-[#1A2E22]"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Fast In-Memory Cache (TTL 600s)</span>
              </button>
            </div>

            {/* Simulated Live Query Runner */}
            <div className="bg-[#080F0B] rounded-xl p-4 border border-[#213527] font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#1A2E22] text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Terminal className="w-3.5 h-3.5" /> Live Spatial SQL Execution (PostGIS GiST Index)
                </span>
                <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  Query Latency: 4.2 ms
                </span>
              </div>

              <pre className="text-emerald-300 py-3 text-[11px] overflow-x-auto leading-relaxed">
{`SELECT cell_id, panchayat_name, slope_deg, ST_AsGeoJSON(geom)
FROM spatial_risk_grid
WHERE ST_Intersects(geom, ST_MakeEnvelope(75.8, 11.2, 76.5, 11.8, 4326))
  AND soil_saturation >= 0.75
ORDER BY risk_score DESC
LIMIT 5;`}
              </pre>

              <div className="pt-2 border-t border-[#1A2E22] flex items-center justify-between text-[11px] text-slate-400">
                <span>R-Tree Spatial Index Speedup: <strong>48x faster</strong> than sequential scan</span>
                <span className="text-emerald-400 font-bold">5 Rows Returned in 4.2ms</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Data Mining: Clustering & Association Rules */}
        {step.mockupDisplay.type === "data_mining_clustering" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* DBSCAN Visualizer */}
            <div className="lg:col-span-7 bg-[#0C1610] rounded-xl p-4 border border-[#213527] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-400">DBSCAN Spatial Cluster Identification</span>
                <span className="font-mono text-slate-300 text-[11px]">ε = {clusterEpsilon} km</span>
              </div>

              {/* Cluster Map Representation */}
              <div className="h-44 bg-[#08100C] rounded-lg border border-[#1E3324] p-3 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px]" />

                {/* Hotspot Circles */}
                <div className="relative z-10 w-full flex items-center justify-around">
                  <div className="p-3 rounded-full bg-red-950/80 border-2 border-red-500 text-center animate-pulse">
                    <span className="text-xs font-bold text-red-300 block">Cluster #01</span>
                    <span className="text-[10px] text-slate-300">Meppadi Corridor</span>
                  </div>
                  <div className="p-2.5 rounded-full bg-amber-950/80 border-2 border-amber-500 text-center">
                    <span className="text-xs font-bold text-amber-300 block">Cluster #02</span>
                    <span className="text-[10px] text-slate-300">Vellarimala Scarp</span>
                  </div>
                  <div className="p-2.5 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-center">
                    <span className="text-xs font-bold text-emerald-300 block">Cluster #03</span>
                    <span className="text-[10px] text-slate-300">Vythiri Foot</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>1km Spatial Buffer De-Duplication:</span>
                <span className="text-emerald-400 font-bold">114 Duplicate Inventory Overlaps Collapsed</span>
              </div>
            </div>

            {/* Spatial Association Rules Table */}
            <div className="lg:col-span-5 bg-[#0C1610] rounded-xl p-4 border border-[#213527] space-y-2.5">
              <span className="text-xs font-semibold text-slate-200 block">Discovered Association Rules</span>
              <div className="space-y-2 text-[11px] font-mono">
                <div className="p-2 rounded bg-[#132219] border border-[#213527]">
                  <div className="text-amber-300 font-semibold">IF (Slope &gt; 28°) ∧ (3D Rain &gt; 200mm)</div>
                  <div className="text-slate-400 flex justify-between mt-1">
                    <span>Confidence: 92.4%</span>
                    <span className="text-emerald-400 font-bold">Lift: 4.82x</span>
                  </div>
                </div>
                <div className="p-2 rounded bg-[#132219] border border-[#213527]">
                  <div className="text-cyan-300 font-semibold">IF (Road Cut Proximity &lt; 50m) ∧ (TWI &gt; 8.5)</div>
                  <div className="text-slate-400 flex justify-between mt-1">
                    <span>Confidence: 87.1%</span>
                    <span className="text-emerald-400 font-bold">Lift: 3.65x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Feature Engineering Tensor */}
        {step.mockupDisplay.type === "feature_tensor" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#0c1610] border border-[#213527]">
                <div className="text-xs font-bold text-emerald-400 mb-1">Topographic Derivatives</div>
                <ul className="text-[11px] text-slate-300 space-y-1">
                  <li>• Slope Angle (degrees)</li>
                  <li>• Aspect (cardinal azimuth)</li>
                  <li>• Profile & Plan Curvature</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0c1610] border border-cyan-800/40">
                <div className="text-xs font-bold text-cyan-400 mb-1">Hydrological Indices</div>
                <ul className="text-[11px] text-slate-300 space-y-1">
                  <li>• Topographic Wetness: ln(a / tan β)</li>
                  <li>• Stream Power Index (SPI)</li>
                  <li>• Flow Accumulation Vector</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0c1610] border border-blue-800/40">
                <div className="text-xs font-bold text-blue-400 mb-1">Antecedent Precipitation Tensors</div>
                <ul className="text-[11px] text-slate-300 space-y-1">
                  <li>• 1-Day Flash Shock (mm)</li>
                  <li>• 3-Day Shallow Saturation (mm)</li>
                  <li>• 7-Day & 15-Day Deep Pore Saturation</li>
                </ul>
              </div>
            </div>

            {/* Multi-Window Rainfall Bar Graph Mockup */}
            <div className="bg-[#09120D] rounded-xl p-4 border border-[#213527]">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-semibold text-slate-200">Antecedent Precipitation Water Inflow Windows</span>
                <span className="text-[10px] font-mono text-cyan-400">Monitoring Station: Meppadi (Wayanad)</span>
              </div>
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { window: "1-Day Inflow", val: "84 mm", status: "Moderate Trigger", color: "bg-cyan-500", h: "45%" },
                  { window: "3-Day Inflow", val: "245 mm", status: "Severe Saturation", color: "bg-amber-500", h: "75%" },
                  { window: "7-Day Inflow", val: "412 mm", status: "Critical Pore Pressure", color: "bg-red-500", h: "90%" },
                  { window: "15-Day Inflow", val: "730 mm", status: "Regional Aquifer Full", color: "bg-purple-500", h: "100%" },
                ].map((w, idx) => (
                  <div key={idx} className="bg-[#101F16] rounded-lg p-2.5 border border-[#1F3324] flex flex-col justify-between h-28">
                    <span className="text-[11px] text-slate-300 font-semibold">{w.window}</span>
                    <div className="w-full bg-[#182C20] rounded-full h-2 my-1 overflow-hidden">
                      <div className={`h-full ${w.color}`} style={{ width: w.h }} />
                    </div>
                    <span className="text-xs font-mono font-bold text-white">{w.val}</span>
                    <span className="text-[9px] text-slate-400 truncate">{w.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Machine Learning Benchmark & TreeSHAP */}
        {step.mockupDisplay.type === "ml_benchmark_shap" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Algorithm Benchmark Comparison */}
            <div className="lg:col-span-6 bg-[#0C1610] rounded-xl p-4 border border-[#213527] space-y-3">
              <div className="text-xs font-bold text-emerald-400">Ensemble Algorithm Evaluation (Spatial-Block CV)</div>
              <div className="space-y-2">
                {[
                  { name: "Gradient Boosting (XGBoost)", auc: "0.952", f1: "0.91", best: true },
                  { name: "Random Forest Classifier", auc: "0.942", f1: "0.89", best: false },
                  { name: "Logistic Regression Baseline", auc: "0.781", f1: "0.71", best: false },
                ].map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border flex items-center justify-between text-xs ${
                      m.best
                        ? "bg-emerald-950/50 border-emerald-500/60 text-white"
                        : "bg-[#101E15] border-[#1D3223] text-slate-300"
                    }`}
                  >
                    <div>
                      <div className="font-semibold flex items-center gap-1.5">
                        <span>{m.name}</span>
                        {m.best && (
                          <span className="text-[9px] bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded font-bold uppercase">
                            Champion
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">Spatial-Block 5-Fold Evaluation</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-emerald-400 font-bold">AUC: {m.auc}</div>
                      <div className="text-[10px] text-slate-400">F1: {m.f1}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TreeSHAP Waterfall Explanation */}
            <div className="lg:col-span-6 bg-[#0C1610] rounded-xl p-4 border border-[#213527] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">TreeSHAP Explainability Waterfall</span>
                <span className="text-[10px] font-mono text-red-400">Cell: SYN-0142 Wayanad</span>
              </div>
              <div className="space-y-1.5 text-[11px] font-mono">
                <div className="flex justify-between items-center p-1.5 rounded bg-[#122218]">
                  <span className="text-slate-400">Baseline Regional Hazard:</span>
                  <span className="text-slate-200 font-bold">0.21</span>
                </div>
                <div className="flex justify-between items-center p-1.5 rounded bg-[#1A1A14] text-red-300">
                  <span>+ Slope Angle (34.2°):</span>
                  <span className="font-bold">+0.34</span>
                </div>
                <div className="flex justify-between items-center p-1.5 rounded bg-[#1A1A14] text-red-300">
                  <span>+ 3-Day Inflow (245mm):</span>
                  <span className="font-bold">+0.28</span>
                </div>
                <div className="flex justify-between items-center p-1.5 rounded bg-[#1A1A14] text-red-300">
                  <span>+ Road Cut Proximity (&lt;30m):</span>
                  <span className="font-bold">+0.11</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-red-950/70 border border-red-500/50 text-white font-bold">
                  <span>Final Predicted Susceptibility:</span>
                  <span className="text-red-400 text-sm">0.94 (VERY HIGH)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Google Gemini Real-Time AI */}
        {step.mockupDisplay.type === "gemini_realtime_ai" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Live Weather Feed */}
            <div className="lg:col-span-5 bg-[#0C1610] rounded-xl p-4 border border-[#213527] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <CloudRain className="w-4 h-4" /> Open-Meteo Live API Telemetry
                </span>
                <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/40">
                  Synced: Just Now
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded bg-[#122218] flex justify-between">
                  <span className="text-slate-400">Current Rainfall Intensity:</span>
                  <span className="text-cyan-400 font-bold font-mono">48.2 mm/hr (Cloudburst)</span>
                </div>
                <div className="p-2 rounded bg-[#122218] flex justify-between">
                  <span className="text-slate-400">24-Hour Forecast Inflow:</span>
                  <span className="text-amber-400 font-bold font-mono">180 mm Expected</span>
                </div>
                <div className="p-2 rounded bg-[#122218] flex justify-between">
                  <span className="text-slate-400">Atmospheric Pressure:</span>
                  <span className="text-slate-200 font-bold font-mono">998 hPa (Low Depression)</span>
                </div>
              </div>
              <div className="p-2 rounded bg-emerald-950/40 border border-emerald-700/30 text-[11px] text-emerald-300 flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>API key strictly preserved server-side in FastAPI.</span>
              </div>
            </div>

            {/* Gemini Live Advisory Console */}
            <div className="lg:col-span-7 bg-[#070E0A] rounded-xl p-4 border border-emerald-500/50 space-y-2.5">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1A2E22]">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                  <span>Google Gemini 3.8 Flash Situational Advisory</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                  Inference: 1.1s
                </span>
              </div>

              {/* Streaming Output Box */}
              <div className="p-3 bg-[#0D1812] rounded-lg border border-[#213527] text-xs space-y-2 text-slate-200">
                <div className="font-bold text-red-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> CRITICAL EVACUATION ADVISORY (Mappadi Catchment)
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Antecedent soil saturation has reached 94% with 48.2 mm/hr sustained intensity. High probability of translational debris slide along lower stream gullies within 6 hours.
                </p>
                <div className="p-2 rounded bg-[#14231A] text-[11px] text-emerald-300 border border-emerald-800/40">
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
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { level: "VERY LOW", color: "bg-[#247343]", border: "border-[#A7D7B9]", cells: "112 Cells", action: "Routine Monitor" },
                { level: "LOW", color: "bg-[#65A30D]", border: "border-[#BEF264]", cells: "84 Cells", action: "Weather Watch" },
                { level: "MODERATE", color: "bg-[#D97706]", border: "border-[#FCD34D]", cells: "56 Cells", action: "Prepare Kits" },
                { level: "HIGH", color: "bg-[#EA580C]", border: "border-[#FDBA74]", cells: "32 Cells", action: "Relocation Alert" },
                { level: "VERY HIGH", color: "bg-[#DC2626]", border: "border-[#FCA5A5]", cells: "16 Cells", action: "Immediate Evacuation" },
              ].map((lvl, i) => (
                <div key={i} className={`p-2 rounded-lg bg-[#0E1912] border ${lvl.border} text-left`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-2.5 h-2.5 rounded-full ${lvl.color}`} />
                    <span className="text-[10px] font-bold text-white">{lvl.level}</span>
                  </div>
                  <div className="text-[10px] text-slate-400">{lvl.cells}</div>
                  <div className="text-[9px] text-emerald-400 font-medium truncate">{lvl.action}</div>
                </div>
              ))}
            </div>

            {/* GIS Platform Features Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#0C1610] rounded-xl border border-[#213527]">
                <div className="text-xs font-bold text-emerald-400 mb-1">Interactive Map & Dossiers</div>
                <p className="text-[11px] text-slate-400">
                  Full Leaflet & Google Maps tile layer with pan/zoom, coordinate geocoding, and water-inflow graphs.
                </p>
              </div>

              <div className="p-3 bg-[#0C1610] rounded-xl border border-[#213527]">
                <div className="text-xs font-bold text-cyan-400 mb-1">Downloadable PDF Reports</div>
                <p className="text-[11px] text-slate-400">
                  Generates customized printable risk dossiers & PNG summaries directly inside browser for collectors.
                </p>
              </div>

              <div className="p-3 bg-[#0C1610] rounded-xl border border-[#213527]">
                <div className="text-xs font-bold text-amber-400 mb-1">Emergency Dispatch Router</div>
                <p className="text-[11px] text-slate-400">
                  Integrated with National Emergency (112), District (1077), and State Control Room (1070).
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status & Key Insight Footer */}
      <div className="pt-3 border-t border-[#1E2E23] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-slate-300">Operational Takeaway:</span>
          <span className="text-slate-300 truncate max-w-sm sm:max-w-xl">
            {step.mockupDisplay.statusSummary}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
          <span>GiriRaksha v3.2 Enterprise</span>
        </div>
      </div>
    </div>
  );
};
