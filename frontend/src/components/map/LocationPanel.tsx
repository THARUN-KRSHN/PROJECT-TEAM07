"use client";

import React from "react";
import Link from "next/link";
import { LocationData } from "@/data/mockLocations";
import { ModelAnalysis } from "@/lib/model";
import { getRiskColor } from "@/lib/utils";
import {
  MapPin,
  CloudRain,
  History,
  AlertTriangle,
  ArrowRight,
  Shield,
  Lock,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/authContext";

interface LocationPanelProps {
  location: LocationData;
  analysis?: ModelAnalysis | null;
  onClose?: () => void;
  className?: string;
}

export function LocationPanel({ location, analysis, onClose, className = "" }: LocationPanelProps) {
  const { isAuthenticated } = useAuth();
  const riskColor = getRiskColor(location.riskLevel);

  // Latest available rainfall observation
  const latestRecord =
    location.rainfall.records && location.rainfall.records.length > 0
      ? location.rainfall.records[location.rainfall.records.length - 1]
      : null;

  return (
    <div
      className={`bg-white border-t lg:border-t-0 lg:border-l border-[#E1E6E1] text-[#202923] flex flex-col h-full overflow-y-auto ${className}`}
    >
      {/* Panel Header */}
      <div className="p-4 sm:p-5 border-b border-[#E1E6E1] bg-[#F3F5F3] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#247343]">
            Selected location
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#202923] leading-tight mt-0.5">
            {location.name}
          </h2>
          <div className="text-xs text-[#526056] flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-[#247343]" />
            <span>
              {location.panchayat}, {location.district}, Kerala
            </span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close location summary"
            className="p-1 rounded text-[#526056] hover:text-[#202923] hover:bg-[#E1E6E1] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 space-y-5 flex-1">
        {/* 1. Risk Category Badge & Short Plain-Language Explanation */}
        <div
          className="p-4 rounded-lg border space-y-2"
          style={{
            backgroundColor: riskColor.bg,
            borderColor: riskColor.border,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#526056]">
              Risk Category
            </span>
            <span
              className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: riskColor.hex }}
            >
              {location.riskLevel}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#202923] leading-relaxed">
            This category represents the area&apos;s assessed landslide susceptibility or risk, depending on the available terrain and rainfall data. Check current official advisories before making safety decisions.
          </p>
        </div>

        {/* 2. Water inflow summary across all backend rainfall windows */}
        <div className="bg-[#F3F5F3] rounded-lg p-4 border border-[#E1E6E1] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#202923] flex items-center gap-1.5">
              <CloudRain className="w-4 h-4 text-[#247343]" />
              <span>Water Inflow Summary</span>
            </span>
            <span className="text-[11px] text-[#526056]">
              {latestRecord ? `Observed: ${latestRecord.date}` : "Status"}
            </span>
          </div>

          {latestRecord ? (
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-white p-2.5 rounded border border-[#E1E6E1]">
                <div className="text-[10px] uppercase text-[#526056]">1-Day Inflow</div>
                <div className="text-lg font-bold text-[#202923] mt-0.5">
                  {location.rainfall.day1} <span className="text-xs font-normal text-[#526056]">mm</span>
                </div>
              </div>
              <div className="bg-white p-2.5 rounded border border-[#E1E6E1]">
                <div className="text-[10px] uppercase text-[#526056]">3-Day Cumulative</div>
                <div className="text-lg font-bold text-[#202923] mt-0.5">
                  {location.rainfall.day3} <span className="text-xs font-normal text-[#526056]">mm</span>
                </div>
              </div>
              <div className="bg-white p-2.5 rounded border border-[#E1E6E1]">
                <div className="text-[10px] uppercase text-[#526056]">7-Day Cumulative</div>
                <div className="text-lg font-bold text-[#202923] mt-0.5">
                  {location.rainfall.day7} <span className="text-xs font-normal text-[#526056]">mm</span>
                </div>
              </div>
              <div className="bg-white p-2.5 rounded border border-[#E1E6E1]">
                <div className="text-[10px] uppercase text-[#526056]">15-Day Cumulative</div>
                <div className="text-lg font-bold text-[#202923] mt-0.5">
                  {location.rainfall.day15} <span className="text-xs font-normal text-[#526056]">mm</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-white rounded border border-[#E1E6E1] text-xs text-[#526056] text-center">
              Rainfall observation: <strong>Unavailable</strong>
            </div>
          )}

          <div className="text-[11px] text-[#526056]">
            Precipitation status: <strong className="text-[#202923]">{location.rainfallStatus || "Unavailable"}</strong>
          </div>
          <p className="text-[10px] leading-relaxed text-[#526056]">
            Backend rolling rainfall estimates at the nearest rainfall cell; approximately 10 km resolution, not direct 30 m measurements.
          </p>
        </div>

        {/* 3. Historical Landslides */}
        <div className="bg-[#F3F5F3] rounded-lg p-4 border border-[#E1E6E1] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#202923] flex items-center gap-1.5">
              <History className="w-4 h-4 text-[#247343]" />
              <span>Historical Landslides</span>
            </span>
            <span className="text-[11px] text-[#526056]">
              {location.historicalEvents.length} recorded
            </span>
          </div>

          {location.historicalEvents.length > 0 ? (
            <div className="space-y-2 pt-1">
              {location.historicalEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-white p-3 rounded border border-[#E1E6E1] text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#202923]">{ev.title}</span>
                    <span className="font-bold text-[#247343]">{ev.year}</span>
                  </div>
                  <p className="text-[#526056] leading-relaxed">{ev.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 bg-white rounded border border-[#E1E6E1] text-xs text-[#526056] text-center">
              No historical landslide events recorded in local inventory.
            </div>
          )}
        </div>

        {/* 4. Safety Reminder */}
        <div className="p-3.5 rounded-lg bg-white border border-[#E1E6E1] flex items-start gap-2.5 text-xs text-[#526056]">
          <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#202923]">Safety reminder:</strong> A low category does not guarantee safety. Follow official alerts and local authorities&apos; instructions.
          </p>
        </div>

        {analysis && (
          <div className="bg-[#F3F5F3] rounded-lg p-4 border border-[#E1E6E1] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#202923]">Backend model analysis</span>
              <span className="text-[10px] uppercase font-semibold text-[#247343]">
                {analysis.selected_model?.replaceAll("_", " ") || "Unavailable"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-white rounded border border-[#E1E6E1] p-2">
                <span className="block text-[#526056]">ROC-AUC</span>
                <strong>{analysis.model_metrics?.[analysis.selected_model || ""]?.roc_auc?.toFixed(3) || "Unavailable"}</strong>
              </div>
              <div className="bg-white rounded border border-[#E1E6E1] p-2">
                <span className="block text-[#526056]">Events</span>
                <strong>{analysis.n_events ?? "Unavailable"}</strong>
              </div>
            </div>
            <div className="text-[11px] text-[#526056]">
              <span className="font-semibold text-[#202923]">Top features: </span>
              {(analysis.importance || []).slice(0, 3).map((item) => item.feature).join(", ") || "Unavailable"}
            </div>
            <div className="text-[10px] text-[#526056]">
              {analysis.sampling?.n_positive ?? 0} positive cells · {analysis.sampling?.n_background ?? 0} background cells
            </div>
          </div>
        )}

        {/* 5. Actions: Safety Guidance & Authorised Analysis */}
        <div className="pt-2 space-y-2">
          <Link
            href="/safety"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-xs font-semibold bg-white border border-[#247343] text-[#247343] hover:bg-[#F3F5F3] transition-colors"
          >
            <Shield className="w-4 h-4" />
            <span>Read Safety Guidance &amp; Precautions</span>
          </Link>

          {isAuthenticated ? (
            <Link
              href={`/location/${location.id}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-xs font-semibold bg-[#247343] hover:bg-[#1E5E37] text-white transition-colors"
            >
              <span>View Full Scientific Dossier</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href={`/location/${location.id}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-xs font-medium bg-[#F3F5F3] hover:bg-[#E1E6E1] text-[#202923] border border-[#E1E6E1] transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-[#526056]" />
              <span>Detailed Analysis (Authorised Access)</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
