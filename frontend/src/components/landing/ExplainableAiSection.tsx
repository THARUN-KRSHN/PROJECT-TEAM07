"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BrainCircuit, ShieldAlert, Cpu } from "lucide-react";
import { ShapBarChart } from "@/components/explainability/ShapBarChart";
import { MOCK_LOCATIONS } from "@/data/mockLocations";

export function ExplainableAiSection() {
  const meppadi = MOCK_LOCATIONS[0];

  return (
    <section className="py-24 relative overflow-hidden bg-[#070e0b]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-950/20 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wider uppercase">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Transparent Decision Science</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Don&apos;t just show the risk.
              <br />
              <span className="text-emerald-400">Explain it.</span>
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Black-box machine learning models fail when human lives depend on evacuation orders.
              GiriRaksha helps emergency managers and geologists understand exactly which environmental
              drivers triggered the predicted threshold.
            </p>

            <div className="bg-zinc-950/80 p-5 rounded-2xl border border-zinc-800 space-y-3 text-xs sm:text-sm text-zinc-400">
              <p>
                <strong className="text-white">TreeSHAP Mathematical Attribution:</strong> Disentangles whether today&apos;s alert is driven by sudden extreme 48-hour rainfall, long-term soil moisture accumulation, or steep terrain cutting.
              </p>
              <p className="text-emerald-400/90 font-medium">
                Allows district collectors to defend relocation orders with empirical spatial factor weights.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/insights"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950 transition-all"
              >
                <span>Explore Explainability Engine</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors"
              >
                <span>Model Benchmarks (AUC)</span>
              </Link>
            </div>
          </motion.div>

          {/* Right: Realistic SHAP Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <ShapBarChart
              factors={meppadi.shapFactors}
              locationName="Meppadi, Wayanad"
              riskScore={meppadi.riskScore}
              showExploreLink={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
