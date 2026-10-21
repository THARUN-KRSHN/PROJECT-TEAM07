"use client";

import React from "react";
import { motion } from "framer-motion";
import { REGIONAL_FEATURE_IMPORTANCE } from "@/data/mockShapData";

export function FeatureImportanceChart() {
  const maxImp = Math.max(...REGIONAL_FEATURE_IMPORTANCE.map((f) => f.importance));

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E1E6E1]">
      <div className="mb-6 pb-4 border-b border-[#E1E6E1]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#247343]">
          Regional Ensemble Architecture
        </span>
        <h3 className="text-xl font-bold text-[#202923] mt-1">
          Global Feature Importance (Western Ghats Model)
        </h3>
        <p className="text-xs text-[#526056] mt-1">
          Mean absolute SHAP impact across 10,000+ spatial grid cells in Kerala hill districts.
        </p>
      </div>

      <div className="space-y-4">
        {REGIONAL_FEATURE_IMPORTANCE.map((item, idx) => {
          const widthPercent = (item.importance / maxImp) * 100;
          return (
            <div key={item.feature} className="group">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-[#202923]">
                  {item.feature}
                </span>
                <span className="font-mono font-bold text-[#247343]">
                  {(item.importance * 100).toFixed(1)}%
                </span>
              </div>

              <div className="h-2 w-full bg-[#F3F5F3] rounded-full overflow-hidden border border-[#E1E6E1]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${widthPercent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.04, ease: "easeOut" }}
                  className="h-full rounded-full bg-[#247343]"
                />
              </div>

              <p className="text-[11px] text-[#526056] mt-1">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
