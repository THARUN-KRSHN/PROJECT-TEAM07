"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { LocationData } from "@/data/mockLocations";
import { getModelLocation, getModelLocations, toLocationData } from "@/lib/model";
import { DemoBanner } from "@/components/navigation/DemoBanner";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { RainfallChart } from "@/components/risk/RainfallChart";
import { ShapBarChart } from "@/components/explainability/ShapBarChart";
import { getRiskColor } from "@/lib/utils";
import { useAuth } from "@/lib/authContext";
import {
  CloudRain,
  Mountain,
  Users,
  AlertTriangle,
  History,
  MapPin,
  ChevronRight,
  Shield,
  Lock,
  ArrowRight,
  LogIn,
  CheckCircle,
} from "lucide-react";

interface LocationPageProps {
  params: Promise<{ id: string }>;
}

export default function LocationPage({ params }: LocationPageProps) {
  const resolvedParams = use(params);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    getModelLocation(resolvedParams.id)
      .then((modelLocation) => setLocation(toLocationData(modelLocation)))
      .catch((error: Error) => setLoadError(error.message));
    getModelLocations()
      .then((response) => setLocations(response.locations.map(toLocationData)))
      .catch(() => setLocations([]));
  }, [resolvedParams.id]);

  if (loadError) {
    return <div className="p-8 text-red-700">Unable to load backend location data: {loadError}</div>;
  }
  if (!location) {
    return <div className="p-8 text-[#526056]">Loading backend location data...</div>;
  }
  const riskColor = getRiskColor(location.riskLevel);

  const latestRecord =
    location.rainfall.records && location.rainfall.records.length > 0
      ? location.rainfall.records[location.rainfall.records.length - 1]
      : null;

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#202923]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#526056]">
            <Link href="/" className="hover:text-[#247343] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/map" className="hover:text-[#247343] transition-colors">
              Risk Map
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-[#202923]">{location.name}</span>
          </nav>

          {/* Header Card: Location Name & Risk Category */}
          <section className="bg-[#F3F5F3] p-6 sm:p-8 rounded-xl border border-[#E1E6E1]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#247343] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>
                    {location.panchayat} • {location.district}, Kerala
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#202923] tracking-tight mt-1">
                  {location.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#526056] mt-2 max-w-2xl leading-relaxed">
                  {location.summary}
                </p>
              </div>

              {/* Risk Category Pill */}
              <div
                className="p-5 rounded-xl border flex flex-col items-center justify-center min-w-44 text-center shrink-0"
                style={{
                  backgroundColor: riskColor.bg,
                  borderColor: riskColor.border,
                }}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#526056]">
                  Assessed Risk Category
                </div>
                <div
                  className="text-2xl font-black mt-1 uppercase tracking-tight"
                  style={{ color: riskColor.hex }}
                >
                  {location.riskLevel}
                </div>
                <div className="text-[11px] text-[#526056] mt-0.5">
                  Terrain Baseline
                </div>
              </div>
            </div>
          </section>

          {/* Public Plain-Language Explanation */}
          <section className="p-5 rounded-lg border border-[#E1E6E1] bg-white flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#247343] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <span className="font-bold text-[#202923]">Plain-Language Hazard Summary:</span>
              <p className="text-[#526056] leading-relaxed">
                This category represents {location.name}&apos;s assessed landslide susceptibility or risk based on topography and available rainfall history. It does not replace official daily weather alerts issued by the Kerala State Disaster Management Authority (KSDMA).
              </p>
            </div>
          </section>

          {/* Public Overview 2-Column Grid: Rainfall & Historical Landslides */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rainfall Summary Card */}
            <div className="bg-[#F3F5F3] p-6 rounded-xl border border-[#E1E6E1] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E1E6E1] pb-3">
                <h2 className="text-base font-bold text-[#202923] flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-[#247343]" />
                  <span>Recent Rainfall Observation</span>
                </h2>
                <span className="text-xs text-[#526056]">
                  {latestRecord ? latestRecord.date : "Observation"}
                </span>
              </div>

              {latestRecord ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-[#E1E6E1]">
                    <div className="text-[10px] font-semibold uppercase text-[#526056]">
                      Daily Inflow
                    </div>
                    <div className="text-xl font-bold text-[#202923] mt-0.5">
                      {latestRecord.daily} <span className="text-xs font-normal text-[#526056]">mm</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-[#E1E6E1]">
                    <div className="text-[10px] font-semibold uppercase text-[#526056]">
                      7-Day Cumulative
                    </div>
                    <div className="text-xl font-bold text-[#202923] mt-0.5">
                      {latestRecord.cumulative7d} <span className="text-xs font-normal text-[#526056]">mm</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-white rounded-lg border border-[#E1E6E1] text-xs text-[#526056] text-center">
                  Rainfall observation: <strong>Unavailable</strong>
                </div>
              )}

              <p className="text-xs text-[#526056]">
                Precipitation status: <strong className="text-[#202923]">{location.rainfallStatus}</strong>
              </p>
            </div>

            {/* Historical Landslides Card */}
            <div className="bg-[#F3F5F3] p-6 rounded-xl border border-[#E1E6E1] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E1E6E1] pb-3">
                <h2 className="text-base font-bold text-[#202923] flex items-center gap-2">
                  <History className="w-4 h-4 text-[#247343]" />
                  <span>Historical Landslides</span>
                </h2>
                <span className="text-xs text-[#526056]">
                  {location.historicalEvents.length} recorded events
                </span>
              </div>

              {location.historicalEvents.length > 0 ? (
                <div className="space-y-2.5">
                  {location.historicalEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="bg-white p-3 rounded-lg border border-[#E1E6E1] text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#202923]">{ev.title}</span>
                        <span className="font-bold text-[#247343]">{ev.year}</span>
                      </div>
                      <p className="text-[#526056] leading-relaxed">{ev.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-white rounded-lg border border-[#E1E6E1] text-xs text-[#526056] text-center">
                  No historical landslides recorded within this grid parcel.
                </div>
              )}
            </div>
          </section>

          {/* Safety Reminder Banner */}
          <section className="p-4 rounded-lg bg-white border border-[#E1E6E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5 text-[#526056]">
              <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <p>
                <strong className="text-[#202923]">Safety Reminder:</strong> A low category does not guarantee safety. Follow official alerts and local emergency instructions.
              </p>
            </div>
            <Link
              href="/safety"
              className="text-[#247343] font-semibold hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <span>View Safety Guidelines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>

          {/* Authorised Scientific Analytics Section (Behind Authentication Gate) */}
          <section className="border-t border-[#E1E6E1] pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#202923] flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-[#247343]" />
                  <span>Detailed Terrain &amp; SHAP Analytics</span>
                </h2>
                <p className="text-xs text-[#526056] mt-0.5">
                  DEM derivatives, multi-day precipitation curves, and machine learning feature importance.
                </p>
              </div>

              {isAuthenticated && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F3F8F5] text-[#247343] text-xs font-semibold border border-[#A7D7B9]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Authorised Access ({user?.roleLabel})</span>
                </span>
              )}
            </div>

            {isAuthenticated ? (
              /* Authenticated View: Full Scientific Metrics */
              <div className="space-y-8">
                {/* 1. Terrain Metrics Grid */}
                <div className="bg-[#F3F5F3] p-6 rounded-xl border border-[#E1E6E1]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#526056] mb-4">
                    Digital Elevation Model (DEM) Attributes
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                    <div className="bg-white p-3 rounded border border-[#E1E6E1]">
                      <div className="text-[10px] text-[#526056] uppercase">Slope Gradient</div>
                      <div className="text-lg font-bold text-[#202923] mt-1">
                        {location.terrain.slope}°
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-[#E1E6E1]">
                      <div className="text-[10px] text-[#526056] uppercase">Elevation</div>
                      <div className="text-lg font-bold text-[#202923] mt-1">
                        {location.terrain.elevation} m
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-[#E1E6E1]">
                      <div className="text-[10px] text-[#526056] uppercase">Wetness TWI</div>
                      <div className="text-lg font-bold text-[#202923] mt-1">
                        {location.terrain.twi}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-[#E1E6E1]">
                      <div className="text-[10px] text-[#526056] uppercase">Curvature</div>
                      <div className="text-lg font-bold text-[#202923] mt-1">
                        {location.terrain.curvature}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-[#E1E6E1]">
                      <div className="text-[10px] text-[#526056] uppercase">NDVI Canopy</div>
                      <div className="text-lg font-bold text-[#202923] mt-1">
                        {location.terrain.ndvi}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-[#E1E6E1]">
                      <div className="text-[10px] text-[#526056] uppercase">Aspect</div>
                      <div className="text-xs font-bold text-[#202923] mt-2">
                        {location.terrain.aspect}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Rainfall Saturation Curves Chart */}
                <div className="bg-[#F3F5F3] p-6 rounded-xl border border-[#E1E6E1]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#526056] mb-4">
                    Cumulative Antecedent Precipitation Windows
                  </h3>
                  <div className="bg-white p-4 rounded-lg border border-[#E1E6E1]">
                    <RainfallChart records={location.rainfall.records} />
                  </div>
                </div>

                {/* 3. SHAP Explainability Chart */}
                <div className="bg-[#F3F5F3] p-6 rounded-xl border border-[#E1E6E1]">
                  <ShapBarChart
                    factors={location.shapFactors}
                    locationName={location.name}
                    riskScore={location.riskScore}
                    showExploreLink={false}
                  />
                </div>
              </div>
            ) : (
              /* Unauthenticated View: Clean Sign In Gate */
              <div className="p-8 rounded-xl bg-[#F3F5F3] border border-[#E1E6E1] text-center max-w-2xl mx-auto space-y-4">
                <div className="w-12 h-12 rounded-full bg-white border border-[#E1E6E1] text-[#247343] flex items-center justify-center mx-auto shadow-sm">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#202923]">
                  Authorised Analytics Gate
                </h3>
                <p className="text-xs sm:text-sm text-[#526056] leading-relaxed max-w-lg mx-auto">
                  Detailed slope morphology, regolith depth models, multi-window antecedent precipitation curves, and SHAP game-theoretic explainability are accessible to authorised disaster responders and academic researchers.
                </p>
                <div className="pt-2">
                  <Link
                    href="/signin"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md font-semibold text-sm bg-[#247343] hover:bg-[#1E5E37] text-white transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In for Detailed Analysis</span>
                  </Link>
                </div>
              </div>
            )}
          </section>

          {/* Quick Navigator to Other Monitored Locations */}
          <section className="border-t border-[#E1E6E1] pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#526056] mb-3">
              Other Monitored Western Ghats Locations
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {locations.map((loc) => {
                const isCurrent = loc.id === location.id;
                return (
                  <Link
                    key={loc.id}
                    href={`/location/${loc.id}`}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      isCurrent
                        ? "bg-[#F3F8F5] border-[#247343]"
                        : "bg-white hover:bg-[#F3F5F3] border-[#E1E6E1]"
                    }`}
                  >
                    <div className="text-xs font-bold text-[#202923] truncate">{loc.name}</div>
                    <div className="text-[10px] text-[#526056]">{loc.district}</div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#247343]">
                        {loc.riskLevel}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
