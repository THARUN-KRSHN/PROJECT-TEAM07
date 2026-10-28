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
          ? "fixed inset-0 z-50 bg-[#F6F8F5] p-3 sm:p-6 overflow-y-auto"
          : "relative rounded-3xl shadow-xl border border-[#E1E6E1] bg-white"
      }`}
    >
      {/* Soft Ambient Glow Ring */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-100 via-teal-50 to-green-100 rounded-3xl blur-md opacity-80 -z-10 pointer-events-none" />

      {/* Main Workstation Shell (Light Theme) */}
      <div className="w-full rounded-2xl overflow-hidden bg-white border border-[#E1E6E1] text-[#202923] flex flex-col shadow-sm">
        {/* Top Window Bar (Chrome / macOS Light Style) */}
        <div className="h-12 bg-[#F8FAFC] border-b border-[#E1E6E1] px-4 sm:px-5 flex items-center justify-between select-none">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-85 cursor-pointer shadow-xs transition-opacity" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:opacity-85 cursor-pointer shadow-xs transition-opacity" />
            <span
              onClick={onToggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:opacity-85 cursor-pointer shadow-xs transition-opacity flex items-center justify-center text-[8px] font-bold text-[#0d5918]"
            >
              +
            </span>
            <div className="hidden sm:flex items-center gap-2 ml-4 pl-4 border-l border-[#E2E8F0] text-xs text-[#247343] font-semibold">
              <Layers className="w-4 h-4 text-[#247343]" />
              <span>GiriRaksha Workstation v3.2</span>
            </div>
          </div>

          {/* Browser SSL Address Bar */}
          <div className="flex-1 max-w-lg mx-3 sm:mx-6">
            <div className="h-8 px-3.5 bg-white rounded-full border border-[#CBD5E1] shadow-xs flex items-center gap-2 text-xs text-[#526056]">
              <Lock className="w-3.5 h-3.5 text-[#247343] shrink-0" />
              <span className="text-[#247343] font-semibold text-[11px]">https://</span>
              <span className="text-[#202923] truncate font-mono text-[11px] font-medium">
                giriraksha.kerala.gov.in/demo/step-{activeStepNumber.toLowerCase()}
              </span>
              <div className="ml-auto flex items-center gap-1.5 text-[10px] text-[#247343] font-mono shrink-0 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#247343] animate-pulse" />
                <span className="hidden md:inline">SIMULATION ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Window Controls & Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onRefresh}
              title="Replay step animation"
              className="p-2 rounded-lg hover:bg-[#E2E8F0] text-[#526056] hover:text-[#202923] transition-colors"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            {onToggleFullscreen && (
              <button
                onClick={onToggleFullscreen}
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Workstation"}
                className="p-2 rounded-lg hover:bg-[#E2E8F0] text-[#526056] hover:text-[#202923] transition-colors"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Sub-Header Live Telemetry Bar */}
        <div className="bg-[#F1F5F9] border-b border-[#E1E6E1] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#247343] font-bold text-[11px] border border-emerald-300">
              <Activity className="w-3.5 h-3.5 animate-pulse text-[#247343]" />
              <span>Step {activeStepNumber} of {totalSteps}</span>
            </div>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-[#202923] font-bold truncate max-w-xs sm:max-w-md">
              {currentTitle}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#526056] font-mono">
            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-[#E2E8F0] text-[#247343] font-semibold shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#247343]" />
              <span>KSDMA Spatial Grid Verified</span>
            </div>
            <span className="hidden sm:inline text-[#CBD5E1]">|</span>
            <span className="hidden sm:inline text-[#202923] font-medium">131 Monitored Sectors</span>
          </div>
        </div>

        {/* Inner Workstation Viewport Screen (Light Theme Surface) */}
        <div className="relative min-h-[500px] lg:min-h-[560px] bg-[#FAFCFA] overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};
