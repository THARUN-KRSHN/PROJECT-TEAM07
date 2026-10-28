"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { SafeImage } from "@/components/ui/SafeImage";
import { IMAGES } from "@/data/images";
import {
  Search,
  MapPin,
  CloudRain,
  ShieldAlert,
  ArrowRight,
  Play,
  Compass,
  Maximize2,
  Sparkles,
  ShieldCheck,
  Layers,
  BarChart2,
  FileText,
  Activity,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { LocationData } from "@/data/mockLocations";
import { getModelLocations, toLocationData } from "@/lib/model";

const RISK_LEVEL_EXPLANATIONS = [
  {
    level: "Very Low",
    color: "#247343",
    bg: "#F2F7F3",
    border: "#C8E3CF",
    meaning: "Stable terrain with standard drainage capacity. Baseline monsoon precautions apply.",
  },
  {
    level: "Low",
    color: "#4B7C59",
    bg: "#F5F9F6",
    border: "#D3E5D8",
    meaning: "Gentle slopes with adequate soil retention. Monitor regional rain advisories.",
  },
  {
    level: "Moderate",
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FCD34D",
    meaning: "Steeper gradient experiencing progressive saturation. Stay alert to localized runoff.",
  },
  {
    level: "High",
    color: "#EA580C",
    bg: "#FFF7ED",
    border: "#FDBA74",
    meaning: "Critical shear stress on vulnerable regolith. Prepare evacuation supplies if advised.",
  },
  {
    level: "Very High",
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FCA5A5",
    meaning: "Imminent pore-water overpressure and slope rupture risk. Immediate relocation recommended.",
  },
];

const POPULAR_HOTSPOTS = [
  { name: "Chooralmala, Wayanad", slug: "syn-cell-0001", risk: "HIGH" },
  { name: "Mankulam, Idukki", slug: "syn-cell-0041", risk: "VERY HIGH" },
  { name: "Vazhikkadavu, Malappuram", slug: "syn-cell-0048", risk: "HIGH" },
  { name: "Seetharkundu, Palakkad", slug: "syn-cell-0073", risk: "VERY HIGH" },
  { name: "Vilangad, Kozhikode", slug: "syn-cell-0057", risk: "LOW" },
  { name: "Gavi, Pathanamthitta", slug: "syn-cell-0097", risk: "LOW" },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getModelLocations()
      .then((response) => setLocations(response.locations.map(toLocationData)))
      .catch(() => setLocations([]));
  }, []);

  const filteredLocations = searchQuery.trim()
    ? locations.filter(
        (loc) =>
          loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loc.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loc.panchayat.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectLocation = (locId: string) => {
    router.push(`/map?location=${locId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredLocations.length > 0) {
      handleSelectLocation(filteredLocations[0].id);
    } else {
      router.push(`/map?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const focusSearch = () => {
    searchInputRef.current?.focus();
    searchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8F5] text-[#202923] p-2 sm:p-4 lg:p-6 selection:bg-[#247343] selection:text-white">
      {/* Top Floating Island Navigation Bar */}
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto mt-3 sm:mt-5 space-y-8 sm:space-y-12">
        {/* ========================================================= */}
        {/* HERO SECTION: Exactly matching reference design           */}
        {/* ========================================================= */}
        <section
          aria-label="Hero Showcase"
          className="rounded-[2rem] sm:rounded-[2.5rem] bg-white border border-[#E1E8E2] shadow-sm overflow-hidden p-6 sm:p-10 lg:p-14 pb-6 sm:pb-8 flex flex-col items-center justify-between text-center relative"
        >
          {/* Subtle Ambient Background Wash */}
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#F2F7F3] to-transparent pointer-events-none" />

          {/* Top Pill Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F6F3] border border-[#E1E8E2] text-[#1B432E] text-xs font-semibold shadow-xs mb-6 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-[#247343] animate-pulse" />
            <span>New Advance AI Support</span>
          </div>

          {/* Editorial Headline with Italicized Emphasis */}
          <h1 className="relative z-10 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#1B3624] font-medium leading-[1.04] max-w-4xl mx-auto">
            Protecting Kerala&apos;s<br />
            Slopes, <span className="italic font-normal text-[#247343]">One Ridge</span><br />
            at a Time!
          </h1>

          {/* Center Dark Green Pill CTA Buttons */}
          <div className="relative z-10 pt-6 sm:pt-8 pb-8 sm:pb-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/map"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1B432E] hover:bg-[#143423] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#1B432E]/20 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>Explore Live Risk Map</span>
            </Link>

            <Link
              href="/demo-presentation"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#F4F6F4] text-[#1B3624] border border-[#D5E0D7] text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-[#247343]" />
              <span>Pitchdeck Walkthrough</span>
            </Link>
          </div>

          {/* Panoramic Landscape Viewport (Reference Lower Hero Image) */}
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden relative h-[340px] sm:h-[440px] lg:h-[500px] shadow-sm border border-[#DCE5DE] group">
            {/* Background Western Ghats Landscape Photo */}
            <SafeImage
              src={IMAGES.heroLandscape.url}
              alt={IMAGES.heroLandscape.alt}
              fallbackGradient={IMAGES.heroLandscape.fallbackGradient}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />

            {/* Delicate cinematic atmospheric gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

            {/* Floating Glassmorphic Action Widgets on the Right */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex flex-col gap-2.5 pointer-events-auto">
              <Link
                href="/map"
                title="Open Interactive GIS Map"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all shadow-md transform hover:scale-105 active:scale-95"
              >
                <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </Link>
              <button
                onClick={focusSearch}
                title="Search monitored locations"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all shadow-md transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>

            {/* Bottom Content within the Landscape */}
            <div className="absolute bottom-4 sm:bottom-7 inset-x-4 sm:inset-x-8 z-20 flex flex-col items-center justify-end text-center space-y-3 sm:space-y-4">
              <p className="text-white/95 text-xs sm:text-sm font-medium max-w-xl leading-relaxed drop-shadow-sm">
                Reconnect with nature and community resilience across Kerala&apos;s Western Ghats.
              </p>

              {/* Minimalist White Authority / Partner Logo Row */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-1 text-white/85 text-[10px] sm:text-xs font-semibold tracking-wider uppercase border-t border-white/20 w-full max-w-3xl">
                <div className="flex items-center gap-1.5 opacity-85 hover:opacity-100 transition-opacity">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>KSDMA Authority</span>
                </div>
                <div className="flex items-center gap-1.5 opacity-85 hover:opacity-100 transition-opacity">
                  <Layers className="w-3.5 h-3.5 text-emerald-300" />
                  <span>GSI Geoinformatics</span>
                </div>
                <div className="flex items-center gap-1.5 opacity-85 hover:opacity-100 transition-opacity">
                  <CloudRain className="w-3.5 h-3.5 text-emerald-300" />
                  <span>IMD Doppler Radar</span>
                </div>
                <div className="flex items-center gap-1.5 opacity-85 hover:opacity-100 transition-opacity">
                  <Compass className="w-3.5 h-3.5 text-emerald-300" />
                  <span>ISRO Bhuvan GIS</span>
                </div>
                <div className="flex items-center gap-1.5 opacity-85 hover:opacity-100 transition-opacity hidden md:flex">
                  <Activity className="w-3.5 h-3.5 text-emerald-300" />
                  <span>CUSAT AI Lab</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* INTERACTIVE LOCATION SEARCH & HOTSPOTS                   */}
        {/* ========================================================= */}
        <section
          aria-label="Location Search and Hotspots"
          className="rounded-3xl bg-white border border-[#E1E8E2] p-6 sm:p-8 shadow-sm space-y-5"
        >
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#247343] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full border border-[#CDE5D4]">
              Instant GIS Verification
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#1B3624]">
              Search Any Panchayat, Sector or Ridge
            </h2>
            <p className="text-xs sm:text-sm text-[#526056]">
              Access slope angle, antecedent rainfall accumulations, and official safety advisories.
            </p>
          </div>

          {/* Search Pill Input */}
          <div className="max-w-2xl mx-auto relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center bg-[#FAFBF9] border border-[#CBD5CD] rounded-full shadow-xs overflow-hidden focus-within:ring-2 focus-within:ring-[#247343]/30 focus-within:border-[#247343] transition-all p-1.5">
                <div className="pl-3.5 text-[#526056]">
                  <Search className="w-4 h-4 text-[#247343]" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearching(true)}
                  placeholder="Search Kerala location (e.g. Meppadi, Chooralmala, Munnar, Nilambur)..."
                  className="w-full px-3 py-2 text-xs sm:text-sm text-[#202923] placeholder-[#718075] focus:outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1B432E] hover:bg-[#143423] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer shrink-0 shadow-xs"
                >
                  Locate Sector
                </button>
              </div>

              {/* Autocomplete Dropdown */}
              {isSearching && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E1E8E2] rounded-2xl shadow-xl z-30 text-left max-h-64 overflow-y-auto p-2">
                  {filteredLocations.length > 0 ? (
                    <div>
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#526056] border-b border-[#EDF2ED]">
                        Monitored Western Ghats Sectors ({filteredLocations.length})
                      </div>
                      {filteredLocations.map((loc) => (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => handleSelectLocation(loc.id)}
                          className="w-full px-3 py-2 text-left hover:bg-[#F3F6F4] rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                        >
                          <div>
                            <div className="text-xs sm:text-sm font-semibold text-[#202923]">{loc.name}</div>
                            <div className="text-[11px] text-[#526056]">
                              {loc.panchayat}, {loc.district}
                            </div>
                          </div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              loc.riskLevel === "VERY HIGH" || loc.riskLevel === "HIGH"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : loc.riskLevel === "MODERATE"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-emerald-50 text-emerald-700 border-emerald-200"
                            }`}
                          >
                            {loc.riskLevel}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-xs text-[#526056] text-center">
                      No matching sector found. Press Enter to search on OpenStreetMap.
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Quick Hotspot Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-[#526056] text-[11px] font-medium mr-1">High-Risk Sectors:</span>
            {POPULAR_HOTSPOTS.map((spot) => (
              <button
                key={spot.slug}
                onClick={() => handleSelectLocation(spot.slug)}
                className="px-3 py-1 rounded-full bg-[#F2F5F2] hover:bg-[#EAF5EE] border border-[#E1E8E2] text-[#202923] hover:text-[#247343] transition-all text-xs font-medium cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    spot.risk === "VERY HIGH" || spot.risk === "HIGH" ? "bg-red-500" : "bg-emerald-500"
                  }`}
                />
                <span>{spot.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* BENTO FEATURE GRID: Clean, Nature-Inspired Aesthetics    */}
        {/* ========================================================= */}
        <section aria-label="Core Capabilities" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#247343] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full border border-[#CDE5D4]">
              Data Mining &amp; Spatial Intelligence
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#1B3624]">
              Precision Intelligence, <span className="italic font-normal text-[#247343]">Grounded</span> in Science
            </h2>
            <p className="text-xs sm:text-sm text-[#526056]">
              Overcoming coarse district alerts with 30-meter physics-informed slope intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="rounded-3xl bg-white border border-[#E1E8E2] p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EAF5EE] text-[#247343] flex items-center justify-center group-hover:bg-[#1B432E] group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#1B3624]">
                  30m Slope Morphology
                </h3>
                <p className="text-xs text-[#526056] leading-relaxed">
                  High-resolution DEM elevation and slope shear calculations evaluated across steep Western Ghats escarpments.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#EDF2ED] flex items-center justify-between text-xs font-semibold text-[#247343]">
                <span>GIS Terrain Index</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-3xl bg-white border border-[#E1E8E2] p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EAF5EE] text-[#247343] flex items-center justify-center group-hover:bg-[#1B432E] group-hover:text-white transition-colors">
                  <CloudRain className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#1B3624]">
                  Antecedent Saturation
                </h3>
                <p className="text-xs text-[#526056] leading-relaxed">
                  Real-time multi-day rolling rainfall curves (1d, 3d, 7d, 15d) forecasting critical soil pore-water overpressure.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#EDF2ED] flex items-center justify-between text-xs font-semibold text-[#247343]">
                <span>Hydrology Engine</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-3xl bg-white border border-[#E1E8E2] p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EAF5EE] text-[#247343] flex items-center justify-center group-hover:bg-[#1B432E] group-hover:text-white transition-colors">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#1B3624]">
                  Explainable SHAP AI
                </h3>
                <p className="text-xs text-[#526056] leading-relaxed">
                  Transparent machine learning attribution showing exactly why a hillside is flagged—slope angle vs. rainfall surge.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#EDF2ED] flex items-center justify-between text-xs font-semibold text-[#247343]">
                <span>Attribution Model</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4 */}
            <div className="rounded-3xl bg-white border border-[#E1E8E2] p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EAF5EE] text-[#247343] flex items-center justify-center group-hover:bg-[#1B432E] group-hover:text-white transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#1B3624]">
                  KSDMA Safety Protocols
                </h3>
                <p className="text-xs text-[#526056] leading-relaxed">
                  Direct alignment with official disaster guidelines, emergency helplines, and actionable community evacuation plans.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#EDF2ED] flex items-center justify-between text-xs font-semibold text-[#247343]">
                <span>Safety Guidelines</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CALIBRATED RISK SPECTRUM GUIDE                           */}
        {/* ========================================================= */}
        <section
          aria-label="Risk Levels"
          className="rounded-3xl bg-white border border-[#E1E8E2] p-6 sm:p-8 shadow-sm space-y-5"
        >
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#247343]">
              Standardized Danger Index
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#1B3624]">
              Five Calibrated Hazard Levels
            </h2>
            <p className="text-xs text-[#526056]">
              Clear, transparent hazard categories to empower timely decision-making.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {RISK_LEVEL_EXPLANATIONS.map((cat) => (
              <div
                key={cat.level}
                className="p-4 rounded-2xl border flex flex-col justify-between space-y-2 shadow-2xs"
                style={{ backgroundColor: cat.bg, borderColor: cat.border }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-display text-[#1B3624]">{cat.level}</span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>
                <p className="text-[11px] text-[#526056] leading-relaxed">
                  {cat.meaning}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* EMERGENCY HELPLINE CALLOUT STRIP                         */}
        {/* ========================================================= */}
        <section
          aria-label="Emergency Helplines"
          className="rounded-3xl bg-[#1B432E] text-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold">
              <Phone className="w-3 h-3" />
              <span>Official Emergency Coordination</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-medium text-white">
              Emergency Disaster Helplines
            </h3>
            <p className="text-xs text-emerald-100/80 max-w-lg">
              In case of severe ground cracks, sudden muddy spring emergence, or torrential rainfall warnings, contact authorities immediately.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-2.5 text-center">
              <span className="text-[10px] text-emerald-200 font-mono uppercase block">National Emergency</span>
              <strong className="text-base font-bold text-white font-mono">112</strong>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-2.5 text-center">
              <span className="text-[10px] text-emerald-200 font-mono uppercase block">Disaster Control</span>
              <strong className="text-base font-bold text-white font-mono">1077</strong>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-2.5 text-center">
              <span className="text-[10px] text-emerald-200 font-mono uppercase block">State Control Room</span>
              <strong className="text-base font-bold text-white font-mono">1070</strong>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Clean Footer matching the design language */}
      <Footer />
    </div>
  );
}
