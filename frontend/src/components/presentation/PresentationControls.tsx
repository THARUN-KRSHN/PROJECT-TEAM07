"use client";

import React, { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Gauge,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { PresentationStep } from "@/data/presentationData";

interface PresentationControlsProps {
  steps: PresentationStep[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  progressPercent: number;
}

export const PresentationControls: React.FC<PresentationControlsProps> = ({
  steps,
  currentStepIndex,
  onSelectStep,
  isPlaying,
  onTogglePlay,
  playbackSpeed,
  onChangeSpeed,
  progressPercent,
}) => {
  const currentStep = steps[currentStepIndex];
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(false);

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      onSelectStep(currentStepIndex - 1);
    } else {
      onSelectStep(steps.length - 1);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      onSelectStep(currentStepIndex + 1);
    } else {
      onSelectStep(0);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Step Pills & Progress Scrubber */}
      <div className="bg-[#0C1510] p-4 rounded-xl border border-[#213527] space-y-3">
        {/* Progress Bar */}
        <div className="w-full bg-[#15251B] h-1.5 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-green-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Navigation Pills */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
          {steps.map((st, idx) => {
            const isActive = idx === currentStepIndex;
            return (
              <button
                key={st.id}
                onClick={() => onSelectStep(idx)}
                className={`py-2 px-1.5 rounded-lg text-center transition-all flex flex-col items-center justify-center border ${
                  isActive
                    ? "bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950 font-bold"
                    : "bg-[#111E16] text-slate-400 border-[#1B2F22] hover:bg-[#182C20] hover:text-slate-200"
                }`}
              >
                <span className="text-[10px] font-mono opacity-80">Step {st.stepNumber}</span>
                <span className="text-[11px] truncate max-w-[80px] hidden sm:inline">
                  {st.slug.split("-")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Playback Action Bar */}
      <div className="bg-[#0E1812] p-4 rounded-xl border border-[#213527] flex flex-wrap items-center justify-between gap-3 text-slate-200">
        {/* Play/Pause & Step Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            title="Previous Step"
            className="p-2 rounded-lg bg-[#15241B] hover:bg-[#1E3427] text-slate-300 transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={onTogglePlay}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-2 shadow-md shadow-emerald-950 transition-all transform active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span className="text-xs">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span className="text-xs">Auto Play</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            title="Next Step"
            className="p-2 rounded-lg bg-[#15241B] hover:bg-[#1E3427] text-slate-300 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelectStep(0)}
            title="Restart Presentation"
            className="p-2 rounded-lg bg-[#15241B] hover:bg-[#1E3427] text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
            <Gauge className="w-3.5 h-3.5 text-emerald-400" /> Speed:
          </span>
          <div className="flex bg-[#122017] p-0.5 rounded-lg border border-[#213527]">
            {[0.75, 1.0, 1.5, 2.0].map((spd) => (
              <button
                key={spd}
                onClick={() => onChangeSpeed(spd)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                  playbackSpeed === spd
                    ? "bg-emerald-600 text-white font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Teleprompter / Speaker Notes Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              showSpeakerNotes
                ? "bg-emerald-950 border-emerald-500/60 text-emerald-300"
                : "bg-[#14231A] border-[#213527] text-slate-300 hover:bg-[#1A2E22]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Speaker Notes</span>
          </button>
        </div>
      </div>

      {/* Synchronized Narration Script & Teleprompter Card */}
      <div className="bg-[#0A130E] p-4 sm:p-5 rounded-xl border border-emerald-900/40 space-y-2">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1A2E22]">
          <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Presenter Script & Narration Flow
          </span>
          <span className="text-slate-400 font-mono text-[10px]">
            Step {currentStep.stepNumber} of {steps.length}
          </span>
        </div>

        <h4 className="text-sm font-bold text-slate-100">{currentStep.narration.heading}</h4>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          &ldquo;{currentStep.narration.script}&rdquo;
        </p>

        {showSpeakerNotes && (
          <div className="mt-3 p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
            <strong>Key Presenter Note:</strong> {currentStep.narration.speakerNote}
          </div>
        )}
      </div>
    </div>
  );
};
