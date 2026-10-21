"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mountain, Users, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";
import { IMAGES } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";
import { RiskFormulaStrip } from "@/components/risk/RiskFormulaStrip";

export function RiskSplitSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0a1511]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Large landscape image of a misty Kerala mountain road */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 h-[420px] sm:h-[500px]"
          >
            <SafeImage
              src={IMAGES.mountainRoad.url}
              alt={IMAGES.mountainRoad.alt}
              fallbackGradient={IMAGES.mountainRoad.fallbackGradient}
              fill
              className="object-cover object-center"
            />
            {/* Atmospheric overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* Overlaid Image Caption */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Thamarassery / Vythiri Ghat Corridor
              </span>
              <p className="text-xs text-zinc-300 mt-1">
                Critical lifeline NH-766 carved into unstable gneissic slopes carrying 15,000+ daily commuter trips.
              </p>
            </div>
          </motion.div>

          {/* Right: Narrative + Risk Formula Strip */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Exposure-Aware Paradigm
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2 leading-tight">
                Risk isn&apos;t just about the slope.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              A precipitous 45° cliff in an uninhabited forest creates zero human casualties.
              <strong className="text-white"> A dangerous slope matters most when people, roads and settlements are exposed.</strong>
            </p>

            <div className="space-y-3 text-sm text-zinc-400">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Susceptibility</strong> measures geological likelihood: slope angle, regolith depth, saturation pore pressure, and curvature.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Exposure</strong> measures what is in harm&apos;s way: village clusters, estate quarters, arterial highways, and water supply grids.
                </span>
              </div>
            </div>

            {/* Embedded Risk Formula Strip */}
            <div className="pt-2">
              <RiskFormulaStrip
                susceptibility={0.81}
                exposure={0.76}
                risk={0.87}
                locationName="Meppadi, Wayanad"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
