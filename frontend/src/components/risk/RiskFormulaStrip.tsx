"use client";

import React from "react";
import { AlertTriangle, Users, Mountain } from "lucide-react";

interface RiskFormulaStripProps {
  susceptibility?: number;
  exposure?: number;
  risk?: number;
  locationName?: string;
  className?: string;
}

export function RiskFormulaStrip({
  susceptibility = 0.81,
  exposure = 0.76,
  risk = 0.87,
  locationName = "Meppadi, Wayanad",
  className = "",
}: RiskFormulaStripProps) {
  return (
    <div
      className={`bg-white rounded-xl p-6 sm:p-8 border border-[#E1E6E1] ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-[#E1E6E1] pb-4">
        <div>
          <span className="text-[11px] font-bold tracking-wider uppercase text-[#247343]">
            Conceptual Risk Synthesis
          </span>
          <h4 className="text-lg font-bold text-[#202923]">
            Hazard is physical. Risk is human.
          </h4>
        </div>
        <span className="text-xs text-[#526056] bg-[#F3F5F3] px-3 py-1 rounded-md border border-[#E1E6E1] self-start sm:self-auto">
          {locationName}
        </span>
      </div>

      {/* The 3 Cards + Multiplication Synthesis */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
        {/* Susceptibility */}
        <div className="md:col-span-2 bg-[#F3F5F3] rounded-lg p-5 border border-[#E1E6E1]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-[#526056] font-medium">
              Susceptibility
            </span>
            <Mountain className="w-4 h-4 text-[#247343]" />
          </div>
          <div className="text-3xl font-extrabold text-[#202923] tracking-tight">
            {susceptibility.toFixed(2)}
          </div>
          <p className="text-[11px] text-[#526056] mt-2">
            Terrain geometry + antecedent rainfall saturation
          </p>
        </div>

        {/* Multiplication Operator */}
        <div className="flex justify-center text-[#526056] font-bold text-xl my-1 md:my-0">
          <span className="w-8 h-8 rounded-full bg-[#F3F5F3] flex items-center justify-center border border-[#E1E6E1] text-[#247343]">
            ×
          </span>
        </div>

        {/* Exposure */}
        <div className="md:col-span-2 bg-[#F3F5F3] rounded-lg p-5 border border-[#E1E6E1]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-[#526056] font-medium">
              Exposure
            </span>
            <Users className="w-4 h-4 text-[#D97706]" />
          </div>
          <div className="text-3xl font-extrabold text-[#202923] tracking-tight">
            {exposure.toFixed(2)}
          </div>
          <p className="text-[11px] text-[#526056] mt-2">
            Settlements, population density &amp; transport lifelines
          </p>
        </div>

        {/* Equals Operator */}
        <div className="flex justify-center text-[#526056] font-bold text-xl my-1 md:my-0">
          <span className="w-8 h-8 rounded-full bg-[#F3F5F3] flex items-center justify-center border border-[#E1E6E1] text-[#247343]">
            =
          </span>
        </div>

        {/* Final Risk */}
        <div className="md:col-span-1 md:min-w-[170px] bg-[#FDF2F2] rounded-lg p-5 border border-[#FCA5A5]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-[#DC2626] font-semibold">
              Final Risk
            </span>
            <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
          </div>
          <div className="text-3xl font-extrabold text-[#DC2626] tracking-tight">
            {risk.toFixed(2)}
          </div>
          <div className="mt-2">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-[#DC2626] text-white">
              VERY HIGH
            </span>
          </div>
        </div>
      </div>

      {/* Formula Footnote */}
      <div className="mt-5 pt-3 border-t border-[#E1E6E1] flex items-center justify-between text-xs text-[#526056]">
        <span className="font-mono text-[#247343]">
          RISK = SUSCEPTIBILITY × EXPOSURE COEFFICIENT
        </span>
        <span className="text-[11px]">Conceptual Framework</span>
      </div>
    </div>
  );
}
