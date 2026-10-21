"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DemoBanner } from "@/components/navigation/DemoBanner";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { ShapBarChart } from "@/components/explainability/ShapBarChart";
import { FeatureImportanceChart } from "@/components/explainability/FeatureImportanceChart";
import { AuthGate } from "@/components/auth/AuthGate";
import { LocationData } from "@/data/mockLocations";
import { getModelLocations, toLocationData } from "@/lib/model";
import {
  Sparkles,
  ArrowRight,
  Cpu,
} from "lucide-react";

function InsightsContent() {
  const searchParams = useSearchParams();
  const initialLocId = searchParams.get("location") || "meppadi";
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    getModelLocations().then((response) => {
      const loaded = response.locations.map(toLocationData);
      setLocations(loaded);
      setSelectedLocation(loaded.find((location) => location.id === initialLocId) || loaded[0] || null);
    });
  }, [initialLocId]);

  if (!selectedLocation) {
    return <div className="p-8 text-[#526056]">Loading backend model data...</div>;
  }

  return (
    <AuthGate
      featureTitle="SHAP Factor Attribution & Decision Explanations"
      featureDescription="Decouples ensemble predictions into game-theoretic SHAP factor weights. This module is restricted to authorised disaster responders and geotechnical researchers."
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F5F3] border border-[#E1E6E1] text-[#247343] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interpretable Machine Learning</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#202923] tracking-tight">
            Why is this location high risk?
          </h1>
          <p className="text-sm text-[#526056] leading-relaxed">
            GiriRaksha decouples black-box ensemble predictions into game-theoretic SHAP
            (SHapley Additive exPlanations) factor weights, granting decision-makers full transparency.
          </p>
        </div>

        {/* Location Selector Bar */}
        <div className="bg-[#F3F5F3] rounded-xl p-4 border border-[#E1E6E1]">
          <div className="text-xs font-bold uppercase tracking-wider text-[#526056] mb-3 flex items-center justify-between">
            <span>Select Location to Inspect Factor Contributions:</span>
            <span className="text-[11px] text-[#247343] font-semibold">8 Monitored High-Range Sectors</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {locations.map((loc) => {
              const isSelected = loc.id === selectedLocation.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                    isSelected
                      ? "bg-[#247343] text-white"
                      : "bg-white hover:bg-[#E1E6E1] text-[#202923] border border-[#E1E6E1]"
                  }`}
                >
                  <span>{loc.name}</span>
                  <span className={`ml-2 text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    isSelected ? "bg-white/20 text-white" : "bg-[#F3F5F3] text-[#247343]"
                  }`}>
                    {loc.riskLevel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 1: Local SHAP Contribution Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <ShapBarChart
              factors={selectedLocation.shapFactors}
              locationName={`${selectedLocation.name}, ${selectedLocation.district}`}
              riskScore={selectedLocation.riskScore}
              showExploreLink={false}
            />
          </div>

          {/* Right: Analytical Narrative Box */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-xl p-5 border border-[#E1E6E1]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#247343]">
                Decision Summary
              </span>
              <h3 className="text-base font-bold text-[#202923] mt-1">
                Dominant Contributors
              </h3>
              <p className="text-xs text-[#526056] leading-relaxed mt-2">
                Antecedent rainfall (7-day and 15-day) combined with steep terrain morphology
                are the dominant contributors to the predicted risk at this location.
              </p>

              <div className="mt-4 pt-3 border-t border-[#E1E6E1] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#526056]">Panchayat:</span>
                  <span className="font-semibold text-[#202923]">{selectedLocation.panchayat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#526056]">Slope:</span>
                  <span className="font-semibold text-[#202923]">{selectedLocation.terrain.slope}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#526056]">7-Day Rainfall:</span>
                  <span className="font-semibold text-[#D97706]">
                    {selectedLocation.rainfall.day7} mm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#526056]">15-Day Rainfall:</span>
                  <span className="font-semibold text-[#DC2626]">
                    {selectedLocation.rainfall.day15} mm
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E1E6E1]">
                <Link
                  href={`/location/${selectedLocation.id}`}
                  className="w-full py-2 px-3 rounded-md text-xs font-semibold bg-[#247343] hover:bg-[#1E5E37] text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Inspect Location Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* TreeSHAP Explanation Box */}
            <div className="bg-[#F3F5F3] rounded-xl p-4 border border-[#E1E6E1] text-xs text-[#526056] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#202923] font-semibold">
                <Cpu className="w-4 h-4 text-[#247343]" />
                <span>TreeSHAP Algorithm</span>
              </div>
              <p className="leading-relaxed">
                Calculates marginal Shapley contributions across all feature permutations, satisfying efficiency, symmetry, and additivity axioms from cooperative game theory.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Global Model Feature Importance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-6 border-t border-[#E1E6E1]">
          <div className="lg:col-span-5 space-y-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#247343]">
                Global Model Architecture
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#202923] tracking-tight mt-1">
                How the model sees the Western Ghats landscape
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#526056] leading-relaxed">
              While local SHAP charts explain individual slopes, the global feature
              importance chart demonstrates which environmental factors govern susceptibility across
              all Kerala hill districts.
            </p>
          </div>

          <div className="lg:col-span-7">
            <FeatureImportanceChart />
          </div>
        </div>
      </div>
    </AuthGate>
  );
}

export default function InsightsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#202923]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-12">
        <Suspense
          fallback={
            <div className="py-20 text-center text-[#247343] text-sm">
              Loading explainability metrics...
            </div>
          }
        >
          <InsightsContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
