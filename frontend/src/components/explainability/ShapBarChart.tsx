"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShapFactor } from "@/data/mockLocations";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ShapBarChartProps {
  factors: ShapFactor[];
  locationName?: string;
  riskScore?: number;
  showExploreLink?: boolean;
  className?: string;
}

export function ShapBarChart({
  factors,
  locationName = "Meppadi, Wayanad",
  riskScore = 0.87,
  showExploreLink = true,
  className = "",
}: ShapBarChartProps) {
  // Find max absolute value for proportional scaling
  const maxAbs = Math.max(...factors.map((f) => Math.abs(f.shapValue)), 0.3);

  return (
    <div className={`bg-white rounded-xl p-6 sm:p-8 border border-[#E1E6E1] ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E1E6E1]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#247343]">
              Explainable AI (TreeSHAP)
            </span>
            <span className="text-[10px] bg-[#F3F5F3] text-[#526056] px-2 py-0.5 rounded border border-[#E1E6E1]">
              Additive Attribution
            </span>
          </div>
          <h3 className="text-xl font-bold text-[#202923] tracking-tight">
            Factor Contributions for {locationName}
          </h3>
          <p className="text-xs text-[#526056] mt-1">
            Baseline mean risk is <strong>0.32</strong>. Below is the local additive breakdown towards assessed score <strong>{riskScore.toFixed(2)}</strong>.
          </p>
        </div>

        <div className="bg-[#F3F5F3] rounded-lg px-4 py-2 border border-[#E1E6E1] flex items-center gap-3 self-start sm:self-auto">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-[#526056]">Assessed Score</div>
            <div className="text-xl font-bold text-[#202923]">{riskScore.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Chart Bars */}
      <div className="space-y-4">
        {factors.map((factor, idx) => {
          const isPositive = factor.shapValue >= 0;
          const percentage = (Math.abs(factor.shapValue) / maxAbs) * 100;

          return (
            <div key={factor.feature} className="group">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#202923]">
                    {factor.label}
                  </span>
                  <span className="text-[10px] text-[#526056] px-1.5 py-0.5 rounded bg-[#F3F5F3] border border-[#E1E6E1]">
                    {factor.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-[#526056] text-[11px]">{factor.valueStr}</span>
                  <span
                    className={`font-bold ${
                      isPositive ? "text-[#DC2626]" : "text-[#247343]"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {factor.shapValue.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Progress bar container */}
              <div className="h-2.5 w-full bg-[#F3F5F3] rounded-full overflow-hidden border border-[#E1E6E1] flex items-center">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.05, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    isPositive ? "bg-[#DC2626]" : "bg-[#247343]"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Insight */}
      <div className="mt-6 pt-4 border-t border-[#E1E6E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#526056]">
        <p className="leading-relaxed">
          <strong className="text-[#202923]">Key Driver:</strong> Antecedent rainfall accumulation and slope shear angle account for the majority of risk surge above baseline.
        </p>
        {showExploreLink && (
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-[#247343] hover:underline font-semibold shrink-0"
          >
            <span>Explore Full SHAP Breakdown</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
