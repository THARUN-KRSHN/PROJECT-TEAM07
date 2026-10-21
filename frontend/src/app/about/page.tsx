"use client";

import React, { useState } from "react";
import { DemoBanner } from "@/components/navigation/DemoBanner";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import {
  Info,
  Database,
  AlertTriangle,
  Mail,
  Send,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

export default function AboutPage() {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    district: "Wayanad",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setFormData({ name: "", email: "", district: "Wayanad", message: "" });
    }, 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#202923]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F5F3] border border-[#E1E6E1] text-[#247343] text-xs font-semibold">
              <Info className="w-3.5 h-3.5" />
              <span>Platform Transparency &amp; Trust</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#202923]">
              About GiriRaksha
            </h1>
            <p className="text-sm sm:text-base text-[#526056] leading-relaxed">
              An accessible landslide risk awareness initiative designed to help communities, ordinary citizens, and local responders understand slope hazards in Kerala.
            </p>
          </div>

          {/* Section 1: Purpose of GiriRaksha */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#202923] border-b border-[#E1E6E1] pb-2">
              Purpose of the Platform
            </h2>
            <p className="text-sm text-[#526056] leading-relaxed">
              In recent monsoons, Kerala&apos;s Western Ghats region has experienced devastating landslides (such as Meppadi and Chooralmala in Wayanad, and Pettimudi in Idukki). Complex geotechnical papers and raw meteorological satellite feeds are rarely intelligible to the ordinary residents who live on vulnerable hillsides.
            </p>
            <p className="text-sm text-[#526056] leading-relaxed">
              <strong className="text-[#202923]">GiriRaksha</strong> bridges this critical communication gap by translating complex topographic variables (slope gradient, curvature, water convergence) and antecedent precipitation windows into intuitive 5-level risk assessments, paired with actionable safety guidelines.
            </p>
          </section>

          {/* Section 2: How to Interpret the Map */}
          <section className="space-y-4 bg-[#F3F5F3] p-6 sm:p-8 rounded-xl border border-[#E1E6E1]">
            <h2 className="text-xl font-bold text-[#202923] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#247343]" />
              <span>How to Interpret the Risk Map</span>
            </h2>
            <div className="space-y-3 text-sm text-[#526056] leading-relaxed">
              <p>
                <strong className="text-[#202923]">Static Susceptibility vs. Time-Specific Risk:</strong> Susceptibility is an intrinsic physical property of the terrain (how steep the hill is, how weak the soil is, whether past failures occurred). Risk combines this susceptibility with recent rainfall saturation and community settlement exposure.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white rounded border border-[#E1E6E1]">
                  <span className="text-xs font-bold text-[#247343] block mb-1">What the map shows:</span>
                  <p className="text-xs">
                    Relative area-level susceptibility classifications to guide precautionary awareness and household preparedness.
                  </p>
                </div>
                <div className="p-3 bg-white rounded border border-[#E1E6E1]">
                  <span className="text-xs font-bold text-[#DC2626] block mb-1">What the map does NOT show:</span>
                  <p className="text-xs">
                    Live minute-by-minute failure predictions, evacuation mandates, or individual property engineering guarantees.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Data Sources and Limitations */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#202923] border-b border-[#E1E6E1] pb-2 flex items-center gap-2">
              <Database className="w-5 h-5 text-[#247343]" />
              <span>Data Sources &amp; Scientific Limitations</span>
            </h2>
            <p className="text-sm text-[#526056] leading-relaxed">
              GiriRaksha integrates multiple public geospatial and meteorological datasets:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[#526056]">
              <li>
                <strong className="text-[#202923]">Topographic Elevation:</strong> Cartosat &amp; SRTM Digital Elevation Models (DEM) at 30-metre resolution, providing slope angles, topographic wetness indices (TWI), and profile curvature.
              </li>
              <li>
                <strong className="text-[#202923]">Rainfall Telemetry:</strong> Multi-day gridded rainfall records based on IMD automatic weather stations and satellite precipitation reanalysis.
              </li>
              <li>
                <strong className="text-[#202923]">Ground Truth Catalog:</strong> Historical landslide inventories compiled from Geological Survey of India (GSI) event catalogs and district administrative records.
              </li>
            </ul>

            <div className="mt-4 p-4 rounded-lg bg-white border border-[#E1E6E1] text-xs text-[#526056] space-y-1.5">
              <span className="font-bold text-[#202923] uppercase tracking-wider text-[11px] block">
                Technical Limitations:
              </span>
              <p>
                1. <strong>Sensor Density:</strong> Automatic weather stations in remote Western Ghats valleys are limited; micro-climate cloudbursts between gauges may not be reflected instantly.
              </p>
              <p>
                2. <strong>Human Excavations:</strong> Unmapped road excavations, slope cutting for construction, or modified estate drainage are not captured in 30m satellite DEMs.
              </p>
            </div>
          </section>

          {/* Section 4: Official Warning Disclaimer */}
          <section className="p-6 rounded-xl border border-[#FCA5A5] bg-[#FDF2F2] space-y-3">
            <div className="flex items-center gap-2 text-[#DC2626] font-bold text-base">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>Official Warning Disclaimer</span>
            </div>
            <p className="text-xs sm:text-sm text-[#202923] leading-relaxed">
              Risk information presented on GiriRaksha is for general public awareness, research benchmarking, and disaster-risk literacy. It does <strong>NOT</strong> constitute an official disaster warning or evacuation directive. In all weather emergencies, residents must strictly follow instructions from the <strong>Kerala State Disaster Management Authority (KSDMA)</strong>, District Collectors, and local Panchayat emergency personnel.
            </p>
          </section>

          {/* Section 5: Contact or Feedback */}
          <section className="space-y-6 pt-4">
            <div className="border-b border-[#E1E6E1] pb-3">
              <h2 className="text-xl font-bold text-[#202923] flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#247343]" />
                <span>Contact &amp; Community Feedback</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#526056] mt-1">
                Have an observation from your Panchayat, local historical landslide records to submit, or questions about platform methodology? Send a message to the GiriRaksha team.
              </p>
            </div>

            {feedbackSent ? (
              <div className="p-6 rounded-lg bg-[#F3F8F5] border border-[#A7D7B9] text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-[#247343] mx-auto" />
                <h3 className="text-base font-bold text-[#202923]">Thank you for your feedback!</h3>
                <p className="text-xs text-[#526056]">
                  Your submission has been logged for evaluation by the project team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-[#F3F5F3] p-6 rounded-xl border border-[#E1E6E1]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#202923] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Menon"
                      className="w-full px-3 py-2 bg-white border border-[#E1E6E1] rounded text-sm text-[#202923] focus:outline-none focus:border-[#247343]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#202923] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-3 py-2 bg-white border border-[#E1E6E1] rounded text-sm text-[#202923] focus:outline-none focus:border-[#247343]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    District / Region
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E1E6E1] rounded text-sm text-[#202923] focus:outline-none focus:border-[#247343]"
                  >
                    <option value="Wayanad">Wayanad</option>
                    <option value="Idukki">Idukki</option>
                    <option value="Malappuram">Malappuram</option>
                    <option value="Palakkad">Palakkad</option>
                    <option value="Kozhikode">Kozhikode</option>
                    <option value="Other">Other Western Ghats Region</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    Message or Observation
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details of local slope observations, drainage blockages, or feedback on map usability..."
                    className="w-full px-3 py-2 bg-white border border-[#E1E6E1] rounded text-sm text-[#202923] focus:outline-none focus:border-[#247343]"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md font-semibold text-sm bg-[#247343] hover:bg-[#1E5E37] text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Feedback</span>
                </button>
              </form>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
