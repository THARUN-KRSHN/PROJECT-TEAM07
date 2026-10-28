"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { DesktopMockupFrame } from "@/components/presentation/DesktopMockupFrame";
import { StepVisualMockup } from "@/components/presentation/StepVisualMockup";
import { TechnicalInspector } from "@/components/presentation/TechnicalInspector";
import { PresentationControls } from "@/components/presentation/PresentationControls";
import { PRESENTATION_STEPS } from "@/data/presentationData";
import {
  ArrowLeft,
  MapPin,
  Sparkles,
  ChevronRight,
  BarChart3,
} from "lucide-react";

export default function DemoPresentationPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = PRESENTATION_STEPS[currentStepIndex];
  const stepDurationMs = (currentStep.durationSeconds * 1000) / playbackSpeed;

  // Auto-play timer and smooth progress calculation
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalStep = 100; // ms
    let elapsed = 0;

    timerRef.current = setInterval(() => {
      elapsed += intervalStep;
      const pct = Math.min(100, (elapsed / stepDurationMs) * 100);
      setProgressPercent(pct);

      if (elapsed >= stepDurationMs) {
        elapsed = 0;
        setCurrentStepIndex((prev) => (prev < PRESENTATION_STEPS.length - 1 ? prev + 1 : 0));
      }
    }, intervalStep);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, playbackSpeed, stepDurationMs]);

  const handleSelectStep = (index: number) => {
    setCurrentStepIndex(index);
    setProgressPercent(0);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleResetStep = () => {
    setProgressPercent(0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAF8] text-[#202923]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        {/* Breadcrumb & Navigation Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E1E6E1]">
          <div className="flex items-center gap-2 text-xs text-[#526056] flex-wrap">
            <Link
              href="/"
              className="hover:text-[#247343] flex items-center gap-1 transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#A0ACA2]" />
            <span className="text-[#247343] font-semibold">Demo Presentation</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#A0ACA2]" />
            <span className="text-[#38483D] font-medium">
              Step {currentStep.stepNumber}: {currentStep.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/map"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#247343] hover:bg-[#1E5E37] text-white shadow-xs text-xs font-semibold transition-all transform active:scale-95"
            >
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span>Open Live GIS Map</span>
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#EEF3EF] border border-[#E1E6E1] text-xs font-semibold text-[#202923] shadow-xs transition-colors"
            >
              <BarChart3 className="w-3.5 h-3.5 text-[#247343]" />
              <span>Research Metrics</span>
            </Link>
          </div>
        </div>

        {/* Hero Pitchdeck Banner */}
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF5EE] border border-[#CFE6D6] text-[#1E6738] text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#247343]" />
            <span>Academic & Technical Pitchdeck Walkthrough</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1A281E]">
            {currentStep.title}
          </h1>
          <p className="text-sm sm:text-base text-[#526056] max-w-3xl leading-relaxed">
            {currentStep.subtitle}
          </p>
        </div>

        {/* Main Interactive Desktop Workstation Mockup */}
        <section aria-label="Desktop Simulation">
          <DesktopMockupFrame
            activeStepNumber={currentStep.stepNumber}
            totalSteps={PRESENTATION_STEPS.length}
            currentTitle={currentStep.title}
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
            onRefresh={handleResetStep}
          >
            <StepVisualMockup step={currentStep} onJumpToStep={handleSelectStep} />
          </DesktopMockupFrame>
        </section>

        {/* Playback Controls & Synchronized Narration Script */}
        <section aria-label="Presentation Controls">
          <PresentationControls
            steps={PRESENTATION_STEPS}
            currentStepIndex={currentStepIndex}
            onSelectStep={handleSelectStep}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            playbackSpeed={playbackSpeed}
            onChangeSpeed={setPlaybackSpeed}
            progressPercent={progressPercent}
          />
        </section>

        {/* Technical Architecture & Code Inspector (Under the Hood) */}
        <section aria-label="Technical Inspector">
          <TechnicalInspector step={currentStep} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
