"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Shield, Mountain } from "lucide-react";
import { IMAGES } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";

export function FinalCtaSection() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden flex items-center justify-center">
      {/* Full-width cinematic landscape image */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src={IMAGES.ctaBackground.url}
          alt={IMAGES.ctaBackground.alt}
          fallbackGradient={IMAGES.ctaBackground.fallbackGradient}
          fill
          className="object-cover object-center scale-105"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-zinc-950/80" />
        <div className="radial-mist absolute inset-0 opacity-80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-12 h-12 rounded-2xl bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300 mb-6 shadow-xl backdrop-blur-md"
        >
          <Mountain className="w-6 h-6" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight"
        >
          Explore the risk
          <br />
          <span className="text-emerald-400">beneath the landscape.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-base sm:text-xl text-zinc-300 mt-5 max-w-2xl leading-relaxed"
        >
          Turn terrain, rainfall and exposure into actionable intelligence before the next monsoon cloudburst.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/map"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-2xl shadow-emerald-950/80 transition-all transform hover:-translate-y-0.5"
          >
            <MapPin className="w-5 h-5 text-zinc-950 stroke-[2.5]" />
            <span>Open Risk Map</span>
            <ArrowRight className="w-4 h-4 text-zinc-950" />
          </Link>

          <Link
            href="/pipeline"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-base font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-md transition-colors"
          >
            <span>Behind the Risk</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
