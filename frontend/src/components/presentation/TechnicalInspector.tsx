"use client";

import React, { useState } from "react";
import {
  Code2,
  ChevronDown,
  ChevronUp,
  Terminal,
  CheckCircle2,
} from "lucide-react";
import { PresentationStep } from "@/data/presentationData";

interface TechnicalInspectorProps {
  step: PresentationStep;
}

export const TechnicalInspector: React.FC<TechnicalInspectorProps> = ({ step }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const pillar = step.technicalPillars[0];

  if (!pillar) return null;

  return (
    <div className="w-full bg-[#0E1812] border border-[#213527] rounded-xl overflow-hidden shadow-lg text-slate-200">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-[#132219] hover:bg-[#182A20] transition-colors flex items-center justify-between border-b border-[#213527]"
      >
        <div className="flex items-center gap-2.5">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            Technical Architecture & Code Inspector
          </span>
          <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/50">
            {pillar.category}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>{isOpen ? "Collapse Inspector" : "Expand Code & Metrics"}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-4 sm:p-5 space-y-4">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {pillar.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-[#09110D] p-3 rounded-lg border border-[#1E3324] flex flex-col justify-between"
              >
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  {metric.label}
                </span>
                <span className="text-sm font-bold text-emerald-400 font-mono mt-1">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          {/* Code Snippet Display */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" /> Production Algorithm / Query:
              </span>
              <span className="text-[11px] font-mono text-emerald-400">{pillar.title}</span>
            </div>
            <div className="bg-[#070D09] rounded-lg p-3.5 border border-[#1A2E22] overflow-x-auto">
              <pre className="text-xs text-emerald-300 font-mono leading-relaxed">
                {pillar.codeSnippet}
              </pre>
            </div>
          </div>

          {/* Key Highlights Bullet points */}
          <div className="pt-2 border-t border-[#1C3022]">
            <div className="text-[11px] font-bold text-slate-300 mb-1.5">Engineering Highlights:</div>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300">
              {pillar.keyHighlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-1.5 bg-[#0A130E] p-2 rounded border border-[#1A2E22]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-tight text-slate-300">{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
