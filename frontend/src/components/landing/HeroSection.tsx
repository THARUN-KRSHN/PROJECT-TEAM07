"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Shield, Mountain, Activity, MapPin } from "lucide-react";
import { IMAGES } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16" style={{ position: "relative" }}>
      {/* Cinematic Full Viewport Landscape Image */}
      <div className="absolute inset-0 z-0" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <SafeImage
          src={IMAGES.heroLandscape.url}
          alt={IMAGES.heroLandscape.alt}
          fallbackGradient={IMAGES.heroLandscape.fallbackGradient}
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1410] via-black/60 to-black/75" style={{ position: "absolute", inset: 0 }} />
        <div className="radial-mist absolute inset-0 opacity-60" style={{ position: "absolute", inset: 0 }} />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center" style={{ position: "relative", zIndex: 10 }}>
        {/* Small Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>WESTERN GHATS • KERALA</span>
        </motion.div>

        {/* Large Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl"
        >
          Know the slope.
          <br />
          <span className="bg-gradient-to-r from-emerald-200 via-emerald-400 to-teal-200 bg-clip-text text-transparent">
            Before it moves.
          </span>
        </motion.h1>

        {/* Supporting Text & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl space-y-3"
        >
          <p className="text-lg sm:text-xl font-medium text-emerald-100/90 leading-relaxed">
            Rainfall-aware landslide risk intelligence for the Western Ghats of Kerala.
          </p>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
            GiriRaksha combines terrain, rainfall, historical landslides and exposure data to
            transform complex geospatial information into explainable, location-level risk intelligence.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <Link
            href="/map"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-base font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-xl shadow-emerald-950/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MapPin className="w-5 h-5 text-emerald-950 stroke-[2.5]" />
            <span>Explore Risk Map</span>
            <ArrowRight className="w-4 h-4 text-emerald-950" />
          </Link>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-base font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-md transition-colors"
          >
            <Compass className="w-4 h-4 text-emerald-300" />
            <span>See How It Works</span>
          </a>
        </motion.div>

        {/* Bottom Hero Statistic Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 w-full max-w-4xl"
        >
          <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-emerald-500/20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
            <div className="text-center pt-2 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                14
              </div>
              <div className="text-xs uppercase tracking-wider text-emerald-300/80 font-medium mt-1">
                Districts Monitored
              </div>
            </div>

            <div className="text-center pt-2 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                1000s
              </div>
              <div className="text-xs uppercase tracking-wider text-emerald-300/80 font-medium mt-1">
                Historical Events
              </div>
            </div>

            <div className="text-center pt-2 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                15-Day
              </div>
              <div className="text-xs uppercase tracking-wider text-emerald-300/80 font-medium mt-1">
                Rainfall Windows
              </div>
            </div>

            <div className="text-center pt-2 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                5
              </div>
              <div className="text-xs uppercase tracking-wider text-emerald-300/80 font-medium mt-1">
                Risk Levels
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
