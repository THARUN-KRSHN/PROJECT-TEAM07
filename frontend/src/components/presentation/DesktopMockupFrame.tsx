"use client";

import React, { ReactNode } from "react";
import {
  Lock,
  RotateCw,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Activity,
  Layers,
} from "lucide-react";

interface DesktopMockupFrameProps {
  children: ReactNode;
  activeStepNumber: string;
  totalSteps: number;
  currentTitle: string;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  onRefresh?: () => void;
}

export const DesktopMockupFrame: React.FC<DesktopMockupFrameProps> = ({
  children,
  activeStepNumber,
  totalSteps,
  currentTitle,
  isFullscreen = false,
  onToggleFullscreen,
  onRefresh,
}) => {
  return (
    <div
      className={`w-full transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-[#0B130E] p-2 sm:p-4 overflow-y-auto"
          : "relative rounded-2xl shadow-2xl border border-[#2A3B30] bg-[#0E1712]"
      }`}
    >
      {/* Ambient Glow Backdrop */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 via-teal-500/10 to-green-600/20 rounded-2xl blur-xl opacity-75 -z-10 pointer-events-none" />

      {/* Main Workstation Shell */}
      <div className="w-full rounded-xl overflow-hidden bg-[#0F1913] border border-[#233529] text-slate-100 flex flex-col shadow-inner">
        {/* Top Window Bar (Chrome / macOS Style) */}
        <div className="h-11 bg-[#132019] border-b border-[#233529] px-4 flex items-center justify-between select-none">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80 cursor-pointer shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:opacity-80 cursor-pointer shadow-sm" />
            <span
              onClick={onToggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:opacity-80 cursor-pointer shadow-sm flex items-center justify-center text-[7px] text-[#0d5918]"
            >
              +
            </span>
            <div className="hidden sm:flex items-center gap-2 ml-3 pl-3 border-l border-[#24382B] text-xs text-emerald-400/80 font-medium">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>GiriRaksha Workstation v3.2</span>
            </div>
          </div>

          {/* Browser SSL Address Bar */}
          <div className="flex-1 max-w-xl mx-4">
            <div className="h-7 px-3 bg-[#09100C] rounded-lg border border-[#233529] flex items-center gap-2 text-xs text-slate-300">
              <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="text-emerald-400 font-semibold text-[11px]">https://</span>
              <span className="text-slate-200 truncate font-mono text-[11px]">
                giriraksha.kerala.gov.in/demo/step-{activeStepNumber.toLowerCase()}
              </span>
              <div className="ml-auto flex items-center gap-2 text-[10px] text-emerald-400 font-mono shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden md:inline">LIVE SIMULATION</span>
              </div>
            </div>
          </div>

          {/* Window Controls & Status Tickers */}
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              title="Re-run animation step"
              className="p-1.5 rounded-md hover:bg-[#1A2C22] text-slate-400 hover:text-emerald-300 transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
            {onToggleFullscreen && (
              <button
                onClick={onToggleFullscreen}
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mockup"}
                className="p-1.5 rounded-md hover:bg-[#1A2C22] text-slate-400 hover:text-emerald-300 transition-colors"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Sub-Header Live Telemetry Bar */}
        <div className="bg-[#111C16] border-b border-[#233529] px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span>Step {activeStepNumber} of {totalSteps}</span>
            </div>
            <span className="text-slate-500">•</span>
            <span className="text-slate-200 font-medium truncate max-w-xs sm:max-w-md">
              {currentTitle}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
            <div className="flex items-center gap-1 bg-[#0A120D] px-2 py-0.5 rounded border border-[#233529] text-emerald-300">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>KSDMA Spatial Grid Verified</span>
            </div>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300">300+ Cells Synchronized</span>
          </div>
        </div>

        {/* Inner Workstation Viewport Screen */}
        <div className="relative min-h-[500px] lg:min-h-[560px] bg-[#0A110D] overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};
