"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Cpu, BrainCircuit, Sparkles, ArrowRight } from "lucide-react";
import { IMAGES } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";

const STAGES = [
  {
    number: "01",
    title: "OBSERVE",
    subtitle: "Continuous Environmental Ingestion",
    icon: Eye,
    image: IMAGES.denseForest,
    items: [
      "Terrain & 12.5m DEM rasters",
      "1D, 3D, 7D, 15D rainfall windows",
      "Sentinel-2 NDVI vegetation cover",
      "Soil depth & lithological shear zones",
      "Historical landslide inventories",
    ],
  },
  {
    number: "02",
    title: "PROCESS",
    subtitle: "Distributed Geospatial Analytics",
    icon: Cpu,
    image: IMAGES.aerialTerrain,
    items: [
      "Distributed Big Data ingestion buffer",
      "Spatial feature engineering (TWI, aspect)",
      "Hydrological saturation matrix calculations",
      "Topographic curvature & road distance transforms",
      "Spatial block cross-validation partitions",
    ],
  },
  {
    number: "03",
    title: "PREDICT",
    subtitle: "Machine Learning & Exposure",
    icon: BrainCircuit,
    image: IMAGES.monsoonRain,
    items: [
      "Spatial-stratified ensemble classification",
      "Continuous landslide susceptibility scoring",
      "Human exposure & settlement overlay",
      "5-tier operational risk classification",
      "Location-level confidence calibration",
    ],
  },
  {
    number: "04",
    title: "EXPLAIN",
    subtitle: "Interpretable Decision Science",
    icon: Sparkles,
    image: IMAGES.mountainRoad,
    items: [
      "TreeSHAP factor contribution waterfalls",
      "Precipitation vs. slope attribution",
      "Panchayat-level hazard dossiers",
      "Actionable evacuation recommendations",
      "Automated risk bulletin generation",
    ],
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#070e0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            System Workflow Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 leading-tight">
            One landscape.
            <br />
            Multiple signals.
            <br />
            <span className="text-emerald-400">One risk picture.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4">
            From raw high-resolution topographic and rainfall telemetry to transparent,
            field-actionable risk intelligence.
          </p>
        </div>

        {/* 4 Large Numbered Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 flex flex-col min-h-[420px] shadow-xl hover:border-emerald-500/50 transition-all duration-300"
              >
                {/* Background Landscape with Dark Overlay */}
                <div className="absolute inset-0 z-0">
                  <SafeImage
                    src={stage.image.url}
                    alt={stage.image.alt}
                    fallbackGradient={stage.image.fallbackGradient}
                    fill
                    className="object-cover opacity-20 group-hover:scale-105 group-hover:opacity-30 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40" />
                </div>

                {/* Card Header & Content */}
                <div className="relative z-10 p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl sm:text-4xl font-black text-emerald-400/80 font-mono">
                      {stage.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-300 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-white tracking-tight">
                    {stage.title}
                  </h3>
                  <div className="text-xs text-emerald-300/80 font-medium mt-0.5 mb-5">
                    {stage.subtitle}
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 text-xs text-zinc-300 flex-1">
                    {stage.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 mt-auto border-t border-zinc-800/80 flex items-center text-[11px] font-semibold text-emerald-400">
                    <span>Stage {stage.number} Pipeline</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto group-hover:translate-x-1 transition-transform" />
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
