"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DemoBanner } from "@/components/navigation/DemoBanner";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { SafeImage } from "@/components/ui/SafeImage";
import { IMAGES } from "@/data/images";
import {
  Search,
  MapPin,
  CloudRain,
  ShieldAlert,
  Info,
  ArrowRight,
  AlertTriangle,
  Phone,
} from "lucide-react";
import { LocationData } from "@/data/mockLocations";
import { getModelLocations, toLocationData } from "@/lib/model";

const RISK_LEVEL_EXPLANATIONS = [
  {
    level: "Very Low",
    color: "#247343",
    bg: "#F3F8F5",
    border: "#A7D7B9",
    meaning: "Minimal slope and historically stable ground. Routine precautions apply during monsoons.",
  },
  {
    level: "Low",
    color: "#65A30D",
    bg: "#F7FEE7",
    border: "#BEF264",
    meaning: "Gentle slopes with adequate drainage. Monitor local weather during heavy rain events.",
  },
  {
    level: "Moderate",
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FCD34D",
    meaning: "Elevated terrain with potential soil movement when sustained rainfall saturates the soil.",
  },
  {
    level: "High",
    color: "#EA580C",
    bg: "#FFF7ED",
    border: "#FDBA74",
    meaning: "Steep slopes with significant antecedent moisture. Be prepared to relocate if advised.",
  },
  {
    level: "Very High",
    color: "#DC2626",
    bg: "#FDF2F2",
    border: "#FCA5A5",
    meaning: "Severe terrain shear forces and heavy soil saturation. Immediate caution required.",
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const router = useRouter();

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

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#202923]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative isolate overflow-hidden border-b border-[#E1E6E1] py-16 sm:py-24 bg-[#fffdf5]">
          <div className="absolute inset-0 -z-10">
            <SafeImage
              src={IMAGES.heroLandscape.url}
              alt={IMAGES.heroLandscape.alt}
              fallbackGradient={IMAGES.heroLandscape.fallbackGradient}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#fffdf5]/95" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff8df] border border-[#f2c94c]/50 text-[#247343] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#247343]" />
              <span>Landslide Risk Awareness for Kerala</span>
            </div>

            <h1 className="max-w-3xl text-4xl sm:text-6xl font-bold tracking-tight text-[#202923] leading-[1.05]">
              Understand the land around you.
            </h1>

            <p className="text-base sm:text-lg text-[#526056] max-w-xl leading-relaxed">
              Simple, local landslide risk awareness for Kerala&apos;s communities. Search a place, read the status, and know what to do next.
            </p>

            {/* Location Search Bar */}
            <div className="max-w-2xl pt-2">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="flex items-center bg-white border border-[#247343] rounded-full shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-[#247343]/30">
                  <div className="pl-4 text-[#526056]">
                    <Search className="w-5 h-5 text-[#247343]" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearching(true)}
                    placeholder="Search a district, Panchayat or place (e.g. Meppadi, Wayanad)..."
                    className="w-full px-3 py-3.5 text-sm text-[#202923] placeholder-[#526056] focus:outline-none bg-transparent"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-[#247343] hover:bg-[#1E5E37] text-white text-sm font-semibold whitespace-nowrap transition-colors"
                  >
                    Search
                  </button>
                </div>

                {/* Autocomplete dropdown */}
                {isSearching && searchQuery.trim() && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E1E6E1] rounded-lg shadow-lg z-30 text-left max-h-60 overflow-y-auto">
                    {filteredLocations.length > 0 ? (
                      <div>
                        <div className="px-3 py-1.5 bg-[#F3F5F3] text-[10px] font-bold uppercase tracking-wider text-[#526056]">
                          Monitored Kerala Locations
                        </div>
                        {filteredLocations.map((loc) => (
                          <button
                            key={loc.id}
                            type="button"
                            onClick={() => handleSelectLocation(loc.id)}
                            className="w-full px-4 py-2.5 text-left hover:bg-[#F3F5F3] flex items-center justify-between border-b border-[#E1E6E1] last:border-0"
                          >
                            <div>
                              <div className="text-sm font-semibold text-[#202923]">{loc.name}</div>
                              <div className="text-xs text-[#526056]">
                                {loc.panchayat}, {loc.district}
                              </div>
                            </div>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#F3F5F3] text-[#247343]">
                              {loc.riskLevel}
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 text-xs text-[#526056] text-center">
                        No local match found. Press Enter to search on the interactive map.
                      </div>
                    )}
                  </div>
                )}
              </form>

              {/* Direct Primary Action Link */}
              <div className="pt-4 flex items-center justify-start gap-3">
                <Link
                  href="/map"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-[#247343] hover:bg-[#1E5E37] text-white transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Explore Risk Map</span>
                </Link>
                <Link
                  href="/safety"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm bg-white border border-[#E1E6E1] hover:bg-[#F3F5F3] text-[#202923] transition-colors"
                >
                  <span>Safety Guidance</span>
                  <ArrowRight className="w-4 h-4 text-[#526056]" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Feature Cards (Section 1 in Plan) */}
        <section className="py-16 bg-[#F6F8F5] border-b border-[#E1E6E1]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#202923]">
                Understand landslide risk in your area
              </h2>
              <p className="text-xs sm:text-sm text-[#526056] mt-1">
                Everything you need to know about local terrain safety in simple, accessible language.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Explore the map */}
              <Link
                href="/map"
                className="bg-white p-6 rounded-lg border border-[#E1E6E1] hover:border-[#247343] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-md bg-[#F3F5F3] text-[#247343] flex items-center justify-center mb-4 group-hover:bg-[#247343] group-hover:text-white transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#202923] group-hover:text-[#247343] transition-colors">
                    Explore the map
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526056] mt-1.5 leading-relaxed">
                    View area-level risk information and interactive risk boundaries for your Panchayat.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E1E6E1] text-xs font-semibold text-[#247343] flex items-center gap-1">
                  <span>Open Risk Map</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Card 2: Rainfall information */}
              <Link
                href="/map"
                className="bg-white p-6 rounded-lg border border-[#E1E6E1] hover:border-[#247343] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-md bg-[#F3F5F3] text-[#247343] flex items-center justify-center mb-4 group-hover:bg-[#247343] group-hover:text-white transition-colors">
                    <CloudRain className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#202923] group-hover:text-[#247343] transition-colors">
                    Rainfall information
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526056] mt-1.5 leading-relaxed">
                    See available rainfall summaries and understand how precipitation saturation triggers slopes.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E1E6E1] text-xs font-semibold text-[#247343] flex items-center gap-1">
                  <span>Check Rainfall</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Card 3: Safety guidance */}
              <Link
                href="/safety"
                className="bg-white p-6 rounded-lg border border-[#E1E6E1] hover:border-[#247343] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-md bg-[#F3F5F3] text-[#247343] flex items-center justify-center mb-4 group-hover:bg-[#247343] group-hover:text-white transition-colors">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#202923] group-hover:text-[#247343] transition-colors">
                    Safety guidance
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526056] mt-1.5 leading-relaxed">
                    Know warning signs, household precautions, and emergency steps before and during rainfall.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E1E6E1] text-xs font-semibold text-[#247343] flex items-center gap-1">
                  <span>Read Guidelines</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Card 4: About GiriRaksha */}
              <Link
                href="/about"
                className="bg-white p-6 rounded-lg border border-[#E1E6E1] hover:border-[#247343] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-md bg-[#F3F5F3] text-[#247343] flex items-center justify-center mb-4 group-hover:bg-[#247343] group-hover:text-white transition-colors">
                    <Info className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#202923] group-hover:text-[#247343] transition-colors">
                    About GiriRaksha
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526056] mt-1.5 leading-relaxed">
                    Understand the platform, data sources, scientific limitations, and community purpose.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E1E6E1] text-xs font-semibold text-[#247343] flex items-center gap-1">
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 5-Level Risk Classification Guide */}
        <section className="py-14 bg-white border-b border-[#E1E6E1]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#202923]">
                Understanding the 5-Level Risk Legend
              </h2>
              <p className="text-xs sm:text-sm text-[#526056] mt-1 max-w-xl mx-auto">
                GiriRaksha evaluates areas into five straightforward categories so residents can interpret hazard levels without scientific background.
              </p>
            </div>

            <div className="space-y-3">
              {RISK_LEVEL_EXPLANATIONS.map((item) => (
                <div
                  key={item.level}
                  className="p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  style={{
                    backgroundColor: item.bg,
                    borderColor: item.border,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span
                      className="text-sm font-bold uppercase tracking-wider"
                      style={{ color: item.color }}
                    >
                      {item.level}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#202923] leading-relaxed max-w-xl">
                    {item.meaning}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-[#F3F5F3] border border-[#E1E6E1] text-xs text-[#526056] flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <p>
                <strong>Safety Reminder:</strong> A low category does not guarantee absolute safety. Unusual localized runoff or cut-slope road excavations can trigger local failures. Follow official alerts from local authorities.
              </p>
            </div>
          </div>
        </section>

        {/* Official Emergency Contact Banner */}
        <section className="py-10 bg-[#F3F5F3]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <h3 className="text-lg font-bold text-[#202923]">
              Need Immediate Emergency Assistance?
            </h3>
            <p className="text-xs sm:text-sm text-[#526056] max-w-xl mx-auto">
              If you observe active slope movement, sudden ground cracks, or rapid water springs near your home, evacuate immediately to safe higher ground and dial emergency services.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <div className="px-4 py-2 bg-white rounded-md border border-[#E1E6E1] text-xs font-semibold text-[#202923] flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#247343]" />
                <span>National Emergency: <strong>112</strong></span>
              </div>
              <div className="px-4 py-2 bg-white rounded-md border border-[#E1E6E1] text-xs font-semibold text-[#202923] flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#247343]" />
                <span>District Disaster Helpline: <strong>1077</strong></span>
              </div>
              <div className="px-4 py-2 bg-white rounded-md border border-[#E1E6E1] text-xs font-semibold text-[#202923] flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#247343]" />
                <span>State Control Room: <strong>1070</strong></span>
              </div>
            </div>
            <div className="pt-2 text-[11px] text-[#526056]">
              Illustrative homepage layout — not a live risk assessment.
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
