"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  CloudRain,
  Mountain,
  MapPin,
  TrendingUp,
  Layers,
  ArrowRight,
  Maximize2,
  AlertTriangle,
} from "lucide-react";
import { IMAGES } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";

export function ProductPreviewSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-[#09120e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Intelligent Geospatial Synthesis
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2">
            From terrain data to decisions.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3">
            An unified situational intelligence surface turning satellite rasters, DEM slopes,
            and continuous precipitation telemetry into actionable evacuation boundaries.
          </p>
        </div>

        {/* Browser-style Dashboard Mockup Container */}
        <div className="relative mx-auto max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-2xl shadow-black/80 overflow-hidden">
          {/* Mock Browser Title Bar */}
          <div className="bg-zinc-900/90 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="text-xs text-zinc-400 font-mono ml-2 hidden sm:inline">
                giriraksha.internal/gis/kerala-western-ghats
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE MONSOON TELEMETRY</span>
            </div>
          </div>

          {/* Main Visual Display Inside Browser */}
          <div className="relative h-[480px] sm:h-[580px] w-full overflow-hidden bg-[#08110d]" style={{ position: "relative" }}>
            {/* Background Landscape / Terrain */}
            <div style={{ position: "absolute", inset: 0 }}>
              <SafeImage
                src={IMAGES.mistyHills.url}
                alt="Western Ghats terrain layer"
                fallbackGradient={IMAGES.mistyHills.fallbackGradient}
                fill
                className="object-cover opacity-50"
              />
            </div>
            {/* Topographic Grid Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(#1f5c45_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

            {/* Map Contours / Polygons overlay simulation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <path
                d="M 120,400 Q 240,280 400,320 T 680,240 T 920,380"
                fill="none"
                stroke="#dc2626"
                strokeWidth="4"
                strokeDasharray="8 6"
              />
              <circle cx="480" cy="270" r="80" fill="#dc2626" fillOpacity="0.15" stroke="#dc2626" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="280" cy="380" r="50" fill="#f97316" fillOpacity="0.12" stroke="#f97316" strokeWidth="1" />
            </svg>

            {/* Pulsing Marker on Meppadi */}
            <div className="absolute top-[44%] left-[48%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-red-500/30 animate-ping absolute" />
              <div className="w-7 h-7 rounded-full bg-zinc-950 border-2 border-red-500 flex items-center justify-center shadow-lg shadow-red-950">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              </div>
            </div>

            {/* Top Bar inside mockup */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="glass-panel rounded-xl px-3 py-1.5 text-xs font-semibold text-zinc-300 flex items-center gap-2 border border-zinc-700">
                <Mountain className="w-3.5 h-3.5 text-emerald-400" />
                <span>Wayanad High Ranges • Sector 04</span>
              </div>
              <div className="glass-panel rounded-xl px-3 py-1.5 text-xs text-zinc-300 flex items-center gap-2 border border-zinc-700">
                <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                <span>AWS Rainfall: 126 mm/24h</span>
              </div>
            </div>

            {/* Floating Card: "Meppadi, Wayanad" (VERY HIGH RISK 0.87, "Why? Heavy 7-day rainfall + Steep slope") */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute top-16 right-4 sm:right-8 w-72 sm:w-80 glass-panel rounded-2xl p-5 border border-red-500/40 shadow-2xl shadow-black/80"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Target Location
                  </span>
                  <h4 className="text-base font-extrabold text-white">
                    Meppadi, Wayanad
                  </h4>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/30">
                    VERY HIGH RISK
                  </span>
                  <div className="text-2xl font-black text-red-400 leading-none mt-1">
                    0.87
                  </div>
                </div>
              </div>

              {/* "Why?" Explanation */}
              <div className="mt-3.5 pt-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Why this score?</span>
                </div>
                <p className="text-xs text-zinc-300 font-medium leading-relaxed bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                  Heavy 7-day rainfall (387 mm)
                  <br />
                  <span className="text-emerald-400">+</span> Steep 34.2° slope shear stress
                </p>
              </div>

              {/* Historical notice */}
              <div className="mt-3 text-[11px] text-zinc-400 flex items-center justify-between">
                <span>Historical Events: <strong>3 major</strong></span>
                <Link
                  href="/location/meppadi"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
                >
                  <span>Dossier</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>

            {/* Bottom floating telemetry pill */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto glass-panel rounded-xl p-3 border border-zinc-800 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-zinc-300">DEM Slope Ingested</span>
              </div>
              <div className="h-4 w-px bg-zinc-800" />
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span className="text-zinc-300">15-day Antecedent Saturation</span>
              </div>
              <div className="h-4 w-px bg-zinc-800 hidden sm:block" />
              <Link
                href="/map"
                className="hidden sm:inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold ml-auto"
              >
                <span>Launch Interactive View</span>
                <Maximize2 className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
