"use client";

import React from "react";
import { DemoBanner } from "@/components/navigation/DemoBanner";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { AuthGate } from "@/components/auth/AuthGate";
import { MODEL_BENCHMARKS } from "@/data/mockShapData";
import {
  Microscope,
  AlertCircle,
} from "lucide-react";

export default function ResearchPage() {
  const datasets = [
    {
      name: "Landslide Inventory (GSI / KSDMA)",
      records: "3,842 Polygon Scars",
      format: "GeoPackage / WGS84",
      status: "✓ Loaded & Filtered",
      health: "100%",
    },
    {
      name: "Digital Elevation Model (DEM)",
      records: "12.5m PALSAR / Cartosat-1",
      format: "Cloud-Optimized GeoTIFF",
      status: "✓ Processed (Slope, TWI, Curvature)",
      health: "100%",
    },
    {
      name: "Precipitation Telemetry (IMD AWS & GPM)",
      records: "0.1° Gridded Daily / Hourly",
      format: "NetCDF-4 / GeoParquet",
      status: "✓ Processed (1D, 3D, 7D, 15D Saturation)",
      health: "98.4%",
    },
    {
      name: "Satellite Multispectral (Sentinel-2 L2A)",
      records: "10m NDVI / Vegetation Index",
      format: "COG Arrays (Bands 4 & 8)",
      status: "✓ Processed & Cloud Masked",
      health: "99.1%",
    },
    {
      name: "Soil Classification & Lithology",
      records: "1:50,000 Scale NBSS",
      format: "Vector Shapefiles",
      status: "✓ Loaded & Encoded",
      health: "100%",
    },
    {
      name: "OpenStreetMap Infrastructure Lines",
      records: "24,800 km Highways & Foot-trails",
      format: "OSM Vector PBF",
      status: "✓ Distance Transform Computed",
      health: "100%",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#202923]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-12">
        <AuthGate
          featureTitle="Model Telemetry, AUC Benchmarks & Dataset Management"
          featureDescription="Spatial cross-validation scores, algorithm ROC/AUC curves, and ingestion health telemetry. Accessible to authorised research specialists and system administrators."
          requiredRole="researcher"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
            {/* Disclaimer Notice */}
            <div className="bg-[#FFFBEB] border border-[#FCD34D] rounded-xl p-4 sm:p-5 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-[#202923] leading-relaxed">
                <strong className="font-bold text-[#B45309] block mb-0.5">
                  PROTOTYPE / DEMONSTRATION NOTICE
                </strong>
                The dataset ingestion statuses and machine learning evaluation metrics below are
                synthetic demonstration values intended for academic evaluation and architectural
                proof-of-concept presentation. They do not constitute certified operational benchmarks.
              </div>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E1E6E1]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F5F3] border border-[#E1E6E1] text-[#247343] text-xs font-bold uppercase tracking-wider mb-2">
                  <Microscope className="w-3.5 h-3.5" />
                  <span>Geospatial Research Console</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#202923] tracking-tight">
                  Model Telemetry &amp; Ingestion Audit
                </h1>
                <p className="text-sm text-[#526056] mt-1 max-w-2xl leading-relaxed">
                  Diagnostic monitoring of feature pipelines, spatial cross-validation scores,
                  and machine learning ensemble performance metrics across Western Ghats grid blocks.
                </p>
              </div>
            </div>

            {/* Section 1: Model Benchmarks (AUC Scores) */}
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#247343]">
                  Spatial Cross-Validation
                </span>
                <h2 className="text-2xl font-bold text-[#202923] tracking-tight mt-0.5">
                  Model Evaluation &amp; AUC Benchmarks
                </h2>
                <p className="text-xs text-[#526056] mt-1">
                  Evaluated using 5-fold spatial block cross-validation to prevent geographic spatial-autocorrelation leakage.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MODEL_BENCHMARKS.map((mod) => (
                  <div
                    key={mod.modelName}
                    className={`rounded-xl p-6 border transition-colors bg-white ${
                      mod.isChampion
                        ? "border-[#247343] shadow-md bg-[#F3F8F5]"
                        : "border-[#E1E6E1]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#526056]">
                        {mod.family}
                      </span>
                      {mod.isChampion && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#247343] text-white">
                          Champion Model
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-[#202923] mb-4">
                      {mod.modelName}
                    </h3>

                    {/* AUC-ROC Metric Highlight */}
                    <div className="bg-[#F3F5F3] rounded-lg p-4 border border-[#E1E6E1] mb-4 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase text-[#526056] font-semibold">
                          AUC-ROC Score
                        </div>
                        <div className="text-3xl font-black text-[#247343]">
                          {mod.aucRoc.toFixed(3)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase text-[#526056] font-semibold">
                          F1-Score
                        </div>
                        <div className="text-xl font-bold text-[#202923]">
                          {mod.f1Score.toFixed(3)}
                        </div>
                      </div>
                    </div>

                    {/* Secondary Metrics */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs text-[#526056] pt-2 border-t border-[#E1E6E1]">
                      <div>
                        <span className="block text-[10px] uppercase text-[#526056]">Precision</span>
                        <strong className="text-[#202923]">{mod.precision.toFixed(2)}</strong>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase text-[#526056]">Recall</span>
                        <strong className="text-[#202923]">{mod.recall.toFixed(2)}</strong>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase text-[#526056]">Inference</span>
                        <strong className="text-[#202923]">{mod.latencyMs} ms</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Dataset Ingestion Status */}
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#247343]">
                  Distributed Storage Feeds
                </span>
                <h2 className="text-2xl font-bold text-[#202923] tracking-tight mt-0.5">
                  Dataset Processing Status
                </h2>
                <p className="text-xs text-[#526056] mt-1">
                  Multi-spectral rasters, precipitation streams, and vector topologies.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[#E1E6E1] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F3F5F3] border-b border-[#E1E6E1] text-[#526056] uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4 font-bold">Dataset Stream</th>
                        <th className="py-3 px-4 font-bold">Partition / Volume</th>
                        <th className="py-3 px-4 font-bold">Storage Format</th>
                        <th className="py-3 px-4 font-bold">Ingestion Status</th>
                        <th className="py-3 px-4 font-bold text-right">Integrity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E1E6E1] text-[#202923]">
                      {datasets.map((ds) => (
                        <tr key={ds.name} className="hover:bg-[#F3F5F3] transition-colors">
                          <td className="py-3 px-4 font-semibold text-[#202923]">
                            {ds.name}
                          </td>
                          <td className="py-3 px-4 font-mono text-[#526056]">
                            {ds.records}
                          </td>
                          <td className="py-3 px-4 text-[#526056]">
                            {ds.format}
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 text-[#247343] font-semibold">
                              {ds.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-[#247343] font-bold">
                            {ds.health}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </AuthGate>
      </main>

      <Footer />
    </div>
  );
}
