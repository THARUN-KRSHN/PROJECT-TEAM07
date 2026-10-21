"use client";

import React from "react";
import { RiskLevel, getRiskColor, getRiskLevel } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface RiskScoreBadgeProps {
  score: number;
  level?: overrideRiskLevel;
  size?: "sm" | "md" | "lg" | "xl";
  showLabel?: boolean;
  className?: string;
}

type overrideRiskLevel = RiskLevel;

export function RiskScoreBadge({
  score,
  level: overrideLevel,
  size = "md",
  showLabel = true,
  className,
}: RiskScoreBadgeProps) {
  const level = overrideLevel || getRiskLevel(score);
  const color = getRiskColor(level);

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-semibold gap-1.5",
    md: "px-2.5 py-1 text-xs font-bold gap-2",
    lg: "px-3.5 py-1.5 text-sm font-bold gap-2",
    xl: "px-4 py-2 text-base font-bold gap-2.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-semibold text-white",
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: color.hex }}
    >
      <span>{score.toFixed(2)}</span>
      {showLabel && (
        <>
          <span className="opacity-50">|</span>
          <span className="tracking-wide uppercase text-[0.85em] font-bold">
            {level}
          </span>
        </>
      )}
    </span>
  );
}

export function RiskLevelIndicator({ level }: { level: RiskLevel }) {
  const color = getRiskColor(level);
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider text-white"
      style={{ backgroundColor: color.hex }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white" />
      {level}
    </span>
  );
}
