"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  CloudRain,
  History,
  Users,
  Sparkles,
  FileText,
  ArrowRight,
} from "lucide-react";
import { IMAGES } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";

const FEATURES = [
  {
    number: "01",
    title: "Interactive Risk Map",
    subtitle: "High-Fidelity Geospatial Canvas",
    description:
      "Explorable Kerala Western Ghats map with terrain contours, satellite layers, and 5-tier hazard boundaries.",
    icon: MapPin,
    image: IMAGES.mistyHills,
    link: "/map",
    linkText: "Open Map",
  },
  {
    number: "02",
    title: "Dynamic Rainfall Intelligence",
    subtitle: "1D, 3D, 7D, 15D Saturation",
    description:
      "Telemetry tracking cumulative precipitation windows and hydrological pore pressure anomalies in near real-time.",
    icon: CloudRain,
    image: IMAGES.monsoonRain,
    link: "/location/meppadi",
    linkText: "View Telemetry",
  },
  {
    number: "03",
    title: "Historical Landslide Overlay",
    subtitle: "Ground-Truth Spatial Catalog",
    description:
      "Curated repository of past Western Ghats events (Puthumala, Kavalappara, Pettimudi) with volumetric records.",
    icon: History,
    image: IMAGES.denseForest,
    link: "/map",
    linkText: "View History",
  },
  {
    number: "04",
    title: "Exposure Analysis",
    subtitle: "Human Vulnerability Mapping",
    description:
      "Quantifies exposed populations, critical road kilometers, rural settlements, and evacuation bases.",
    icon: Users,
    image: IMAGES.villageSettlement,
    link: "/location/meppadi",
    linkText: "Inspect Exposure",
  },
  {
    number: "05",
    title: "Explainable AI (SHAP)",
    subtitle: "Transparent Model Waterfalls",
    description:
      "Mathematical SHAP breakdowns showing exactly why a location is flagged as High or Very High risk.",
    icon: Sparkles,
    image: IMAGES.aerialTerrain,
    link: "/insights",
    linkText: "Inspect SHAP",
  },
  {
    number: "06",
    title: "Hazard Bulletins & Reports",
    subtitle: "Evacuation Action Advisories",
    description:
      "Automated PDF hazard briefs for KSDMA district emergency cells, revenue divisions, and local panchayats.",
    icon: FileText,
    image: IMAGES.mountainRoad,
    link: "/reports",
    linkText: "Access Reports",
  },
];

export function FeatureShowcaseSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#09120e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2">
            Engineered for proactive disaster response.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3">
            Every capability is designed to help incident commanders, geologists, and panchayat
            officials act before slopes give way.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 flex flex-col h-[380px] shadow-xl hover:border-emerald-500/50 transition-all duration-300"
              >
                {/* Background Landscape Photo */}
                <div className="absolute inset-0 z-0">
                  <SafeImage
                    src={feat.image.url}
                    alt={feat.image.alt}
                    fallbackGradient={feat.image.fallbackGradient}
                    fill
                    className="object-cover opacity-25 group-hover:scale-105 group-hover:opacity-35 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">
                      {feat.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-700/80 flex items-center justify-center text-emerald-300 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {feat.title}
                  </h3>
                  <div className="text-xs text-emerald-300/80 font-medium mt-0.5 mb-3">
                    {feat.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {feat.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-zinc-800/80 flex items-center">
                    <Link
                      href={feat.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <span>{feat.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
