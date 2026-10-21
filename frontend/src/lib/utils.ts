import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type RiskLevel = "VERY LOW" | "LOW" | "MODERATE" | "HIGH" | "VERY HIGH";

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 0.80) return "VERY HIGH";
  if (score >= 0.60) return "HIGH";
  if (score >= 0.40) return "MODERATE";
  if (score >= 0.20) return "LOW";
  return "VERY LOW";
}

export function getRiskColor(level: RiskLevel): {
  bg: string;
  text: string;
  border: string;
  badge: string;
  hex: string;
  label: string;
  description: string;
} {
  switch (level) {
    case "VERY HIGH":
      return {
        bg: "bg-[#FDF2F2]",
        text: "text-[#DC2626]",
        border: "border-[#FCA5A5]",
        badge: "bg-[#DC2626] text-white",
        hex: "#DC2626",
        label: "Very High",
        description: "Severe susceptibility or extreme rainfall saturation.",
      };
    case "HIGH":
      return {
        bg: "bg-[#FFF7ED]",
        text: "text-[#C2410C]",
        border: "border-[#FDBA74]",
        badge: "bg-[#EA580C] text-white",
        hex: "#EA580C",
        label: "High",
        description: "Significant slope gradient and heavy antecedent moisture.",
      };
    case "MODERATE":
      return {
        bg: "bg-[#FFFBEB]",
        text: "text-[#B45309]",
        border: "border-[#FCD34D]",
        badge: "bg-[#D97706] text-white",
        hex: "#D97706",
        label: "Moderate",
        description: "Elevated terrain with moderate rainfall accumulation.",
      };
    case "LOW":
      return {
        bg: "bg-[#F7FEE7]",
        text: "text-[#4D7C0F]",
        border: "border-[#BEF264]",
        badge: "bg-[#65A30D] text-white",
        hex: "#65A30D",
        label: "Low",
        description: "Gentle terrain or standard drainage with low failure history.",
      };
    case "VERY LOW":
    default:
      return {
        bg: "bg-[#F3F8F5]",
        text: "text-[#1E5E37]",
        border: "border-[#A7D7B9]",
        badge: "bg-[#247343] text-white",
        hex: "#247343",
        label: "Very Low",
        description: "Flat or low-slope valley terrain with minimal historical mass-wasting.",
      };
  }
}

export function formatNumber(num: number, decimals: number = 2): string {
  return num.toFixed(decimals);
}
