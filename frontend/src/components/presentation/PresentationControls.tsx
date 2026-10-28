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
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E1E6E1] shadow-sm space-y-3.5">
        {/* Progress Bar */}
        <div className="w-full bg-[#EEF2EE] h-2 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#247343] via-[#2F9E58] to-[#34A853] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Navigation Pills */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {steps.map((st, idx) => {
            const isActive = idx === currentStepIndex;
            return (
              <button
                key={st.id}
                onClick={() => onSelectStep(idx)}
                className={`py-2 px-1.5 rounded-xl text-center transition-all flex flex-col items-center justify-center border cursor-pointer ${
                  isActive
                    ? "bg-[#247343] text-white border-[#247343] shadow-sm font-bold scale-[1.02]"
                    : "bg-[#F7F9F7] text-[#526056] border-[#E2E8E2] hover:bg-[#EAF5EE] hover:text-[#202923] hover:border-[#CFE6D6]"
                }`}
              >
                <span className="text-[10px] font-mono opacity-85">Step {st.stepNumber}</span>
                <span className="text-[11px] truncate max-w-[80px] hidden sm:inline font-medium">
                  {st.slug.split("-")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Playback Action Bar */}
      <div className="bg-[#FAFBF9] p-4 rounded-2xl border border-[#E1E6E1] shadow-sm flex flex-wrap items-center justify-between gap-3 text-[#202923]">
        {/* Play/Pause & Step Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            title="Previous Step"
            className="p-2.5 rounded-xl bg-white hover:bg-[#EEF3EF] border border-[#E1E6E1] text-[#526056] hover:text-[#202923] transition-all shadow-xs cursor-pointer"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={onTogglePlay}
            className="px-5 py-2.5 rounded-xl bg-[#247343] hover:bg-[#1E5E37] text-white font-semibold flex items-center gap-2 shadow-sm transition-all transform active:scale-95 cursor-pointer"
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
            className="p-2.5 rounded-xl bg-white hover:bg-[#EEF3EF] border border-[#E1E6E1] text-[#526056] hover:text-[#202923] transition-all shadow-xs cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelectStep(0)}
            title="Restart Presentation"
            className="p-2.5 rounded-xl bg-white hover:bg-[#EEF3EF] border border-[#E1E6E1] text-[#718075] hover:text-[#202923] transition-all shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#526056] flex items-center gap-1 font-mono text-[11px] font-medium">
            <Gauge className="w-3.5 h-3.5 text-[#247343]" /> Speed:
          </span>
          <div className="flex bg-white p-0.5 rounded-xl border border-[#E1E6E1] shadow-xs">
            {[0.75, 1.0, 1.5, 2.0].map((spd) => (
              <button
                key={spd}
                onClick={() => onChangeSpeed(spd)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                  playbackSpeed === spd
                    ? "bg-[#247343] text-white font-bold shadow-xs"
                    : "text-[#526056] hover:text-[#202923] hover:bg-[#F2F5F2]"
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
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border shadow-xs cursor-pointer ${
              showSpeakerNotes
                ? "bg-[#EAF5EE] border-[#247343] text-[#247343]"
                : "bg-white border-[#E1E6E1] text-[#526056] hover:bg-[#F2F5F2] hover:text-[#202923]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#247343]" />
            <span>Speaker Notes</span>
          </button>
        </div>
      </div>

      {/* Synchronized Narration Script & Teleprompter Card */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E1E6E1] shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs pb-2.5 border-b border-[#EDF2ED]">
          <span className="font-bold text-[#247343] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#247343]" /> Presenter Script & Narration Flow
          </span>
          <span className="text-[#526056] font-mono text-[11px] font-medium bg-[#F4F6F4] px-2.5 py-0.5 rounded-full border border-[#E1E6E1]">
            Step {currentStep.stepNumber} of {steps.length}
          </span>
        </div>

        <h4 className="text-base font-bold text-[#202923]">{currentStep.narration.heading}</h4>

        <div className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E8ECE8]">
          <p className="text-sm text-[#38483D] leading-relaxed font-sans">
            &ldquo;{currentStep.narration.script}&rdquo;
          </p>
        </div>

        {showSpeakerNotes && (
          <div className="mt-3 p-3.5 rounded-xl bg-[#FFF9E6] border border-[#F2C94C]/50 text-xs text-[#7A5B04] leading-relaxed">
            <strong className="font-semibold text-[#664C00]">Key Presenter Note:</strong> {currentStep.narration.speakerNote}
          </div>
        )}
      </div>
    </div>
  );
};
