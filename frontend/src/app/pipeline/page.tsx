"use client";

import React from "react";
import { DemoBanner } from "@/components/navigation/DemoBanner";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { AuthGate } from "@/components/auth/AuthGate";
import { PIPELINE_STAGES, DATA_SOURCES } from "@/data/mockPipelineData";
import {
  Database,
  ArrowDown,
} from "lucide-react";

export default function PipelinePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#202923]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-12">
        <AuthGate
          featureTitle="Big Data Architecture & Ingestion Pipeline"
          featureDescription="Distributed storage, Spark spatial queries, and model training pipeline. Restricted to authorised data architects and researchers."
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F5F3] border border-[#E1E6E1] text-[#247343] text-xs font-bold uppercase tracking-wider">
                <Database className="w-3.5 h-3.5" />
                <span>Big Data Architecture</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#202923] tracking-tight">
                Behind the Risk
              </h1>
              <p className="text-sm text-[#526056] leading-relaxed">
                The proposed distributed pipeline integrating multi-sensor earth observation telemetry,
                Hadoop distributed storage, Apache Spark spatial computing, and spatial-stratified machine learning.
              </p>
            </div>

            {/* Section 1: The 7-Stage End-to-End Pipeline */}
            <div>
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#E1E6E1]">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#247343]">
                    Architectural Blueprint
                  </span>
                  <h2 className="text-2xl font-bold text-[#202923] tracking-tight mt-0.5">
                    Distributed Processing Pipeline
                  </h2>
                </div>
                <span className="text-xs text-[#526056] hidden sm:inline">
                  Team 07 • Big Data Analytics
                </span>
              </div>

              <div className="space-y-6">
                {PIPELINE_STAGES.map((stage, idx) => (
                  <div key={stage.step} className="relative">
                    <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#E1E6E1] hover:border-[#247343] transition-colors shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        {/* Step Number + Title */}
                        <div className="space-y-2 max-w-xl">
                          <div className="flex items-center gap-3">
                            <span className="px-2.5 py-0.5 rounded bg-[#F3F5F3] text-[#247343] font-mono font-bold text-xs border border-[#E1E6E1]">
                              STEP {stage.step}
                            </span>
                            <span className="text-xs font-semibold text-[#526056] uppercase tracking-wider">
                              {stage.subtitle}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-[#202923] tracking-tight">
                            {stage.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-[#526056] leading-relaxed pt-1">
                            {stage.description}
                          </p>

                          {/* Tech Pills */}
                          <div className="pt-2 flex flex-wrap gap-1.5">
                            {stage.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#F3F5F3] border border-[#E1E6E1] text-[#202923] font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Inputs & Outputs Card */}
                        <div className="bg-[#F3F5F3] rounded-lg p-4 border border-[#E1E6E1] text-xs w-full md:w-80 shrink-0 space-y-2.5">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-[#247343]">
                            {stage.metrics}
                          </div>

                          <div>
                            <span className="text-[#526056] text-[10px] uppercase font-bold block">
                              Key Inputs:
                            </span>
                            <ul className="text-[#202923] space-y-1 mt-1 text-[11px]">
                              {stage.inputs.slice(0, 3).map((inp, i) => (
                                <li key={i} className="flex items-center gap-1.5 truncate">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#247343] shrink-0" />
                                  <span className="truncate">{inp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-2 border-t border-[#E1E6E1]">
                            <span className="text-[#526056] text-[10px] uppercase font-bold block">
                              Produced Artifact:
                            </span>
                            <span className="text-[#202923] font-mono text-[11px] mt-0.5 block truncate font-medium">
                              {stage.outputs[0]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Downward connecting arrow between stages */}
                    {idx < PIPELINE_STAGES.length - 1 && (
                      <div className="flex justify-center my-2 text-[#247343]">
                        <ArrowDown className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Data Sources Cards */}
            <div>
              <div className="mb-6 pb-3 border-b border-[#E1E6E1]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#247343]">
                  Earth Observation Inputs
                </span>
                <h2 className="text-2xl font-bold text-[#202923] tracking-tight mt-0.5">
                  Integrated Geospatial Layers
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DATA_SOURCES.map((ds) => (
                  <div
                    key={ds.name}
                    className="bg-white rounded-xl p-5 border border-[#E1E6E1] flex flex-col justify-between hover:border-[#247343] transition-colors shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F3F5F3] text-[#247343] border border-[#E1E6E1]">
                          {ds.tag}
                        </span>
                        <span className="text-[11px] text-[#526056] font-mono">
                          {ds.resolution}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#202923]">{ds.name}</h3>
                      <div className="text-xs text-[#526056] font-medium mt-0.5">
                        Provider: <strong className="text-[#202923]">{ds.source}</strong>
                      </div>

                      <p className="text-xs text-[#526056] leading-relaxed mt-2.5">
                        {ds.role}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#E1E6E1] flex items-center justify-between text-[11px] text-[#526056]">
                      <span>Frequency: {ds.updateFrequency}</span>
                      <span className="text-[#247343] font-semibold">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AuthGate>
      </main>

      <Footer />
    </div>
  );
}
