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
    <div className="w-full bg-white border border-[#E1E6E1] rounded-2xl overflow-hidden shadow-sm text-[#202923]">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 bg-[#FAFBF9] hover:bg-[#F2F5F2] transition-colors flex items-center justify-between border-b border-[#E1E6E1] cursor-pointer"
      >
        <div className="flex items-center gap-2.5 flex-wrap">
          <Terminal className="w-4 h-4 text-[#247343]" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#247343]">
            Technical Architecture & Code Inspector
          </span>
          <span className="text-[11px] font-mono bg-[#EAF5EE] text-[#1E6738] px-2.5 py-0.5 rounded-full border border-[#CFE6D6] font-semibold">
            {pillar.category}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#526056]">
          <span className="hidden sm:inline">{isOpen ? "Collapse Inspector" : "Expand Code & Metrics"}</span>
          {isOpen ? <ChevronUp className="w-4 h-4 text-[#247343]" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-5 sm:p-6 space-y-5">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {pillar.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E5EBE6] flex flex-col justify-between shadow-xs"
              >
                <span className="text-[11px] text-[#526056] uppercase tracking-wider font-semibold">
                  {metric.label}
                </span>
                <span className="text-base font-bold text-[#247343] font-mono mt-1">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          {/* Code Snippet Display */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#526056]">
              <span className="font-semibold text-[#202923] flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-[#247343]" /> Production Algorithm / Query:
              </span>
              <span className="text-[11px] font-mono text-[#247343] font-bold bg-[#EAF5EE] px-2.5 py-0.5 rounded-md border border-[#CFE6D6]">
                {pillar.title}
              </span>
            </div>
            <div className="bg-[#152319] rounded-xl p-4 sm:p-5 border border-[#213527] overflow-x-auto shadow-inner">
              <pre className="text-xs text-[#86EFAC] font-mono leading-relaxed">
                {pillar.codeSnippet}
              </pre>
            </div>
          </div>

          {/* Key Highlights Bullet points */}
          <div className="pt-3 border-t border-[#EDF2ED]">
            <div className="text-xs font-bold text-[#202923] mb-2 uppercase tracking-wider">
              Engineering Highlights:
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-[#38483D]">
              {pillar.keyHighlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-2 bg-[#FAFBF9] p-3 rounded-xl border border-[#E5EBE6] shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#247343] shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed text-[#38483D] font-medium">{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
