"use client";

import React, { useState } from "react";
import { DemoBanner } from "@/components/navigation/DemoBanner";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import {
  ShieldAlert,
  AlertTriangle,
  CloudRain,
  Activity,
  CheckSquare,
  ExternalLink,
  Phone,
} from "lucide-react";

const WARNING_SIGNS = [
  {
    title: "New cracks in ground or pavement",
    desc: "Tension cracks forming on hill slopes, foundations, retaining walls, or asphalt roads.",
    urgency: "HIGH WARNING",
    color: "#EA580C",
  },
  {
    title: "Tilting trees, fences, or utility poles",
    desc: "Vegetation or telephone poles leaning downhill indicates slow soil creep or active slip planes.",
    urgency: "EARLY SIGN",
    color: "#D97706",
  },
  {
    title: "Sudden muddy springs or water seepages",
    desc: "Previously dry ground becoming soggy, or spring water suddenly turning murky and sediment-laden.",
    urgency: "CRITICAL",
    color: "#DC2626",
  },
  {
    title: "Faint rumbling or cracking noises",
    desc: "A low rumble that increases in volume, or trees cracking without high wind, indicates moving debris.",
    urgency: "IMMEDIATE EVACUATION",
    color: "#DC2626",
  },
  {
    title: "Sticking doors and window frames",
    desc: "Structural distortion caused by shifting substrate causing door and window jambs to bind.",
    urgency: "EARLY SIGN",
    color: "#D97706",
  },
  {
    title: "Rapid stream level changes",
    desc: "A sudden drop in stream flow followed by a muddy torrent can indicate an upstream debris damming.",
    urgency: "FLASH RUNOUT DANGER",
    color: "#DC2626",
  },
];

const PRE_RAINFALL_STEPS = [
  {
    step: "01",
    title: "Monitor KSDMA & IMD Advisories",
    desc: "Follow daily district-level colour-coded rainfall alerts (Yellow, Orange, Red) issued by the Kerala State Disaster Management Authority.",
  },
  {
    step: "02",
    title: "Inspect Hillside Drains and Culverts",
    desc: "Clear roof gutters, surface runoff swales, and roadside ditches from plastic waste and debris to prevent water accumulation near slope edges.",
  },
  {
    step: "03",
    title: "Identify Nearest Safe Evacuation Shelter",
    desc: "Locate your Panchayat's designated flood and landslide relief camps on stable ridge ground, away from valley channels.",
  },
  {
    step: "04",
    title: "Prepare a 72-Hour Grab-and-Go Bag",
    desc: "Pack essential medications, drinking water, family identity documents, flashlight, portable radio, and phone power banks in a waterproof bag.",
  },
];

const DURING_EVENT_STEPS = [
  {
    step: "01",
    title: "Evacuate Quickly Out of the Path",
    desc: "Move immediately perpendicular to the direction of flow. Never attempt to outrun a fast-moving debris avalanche downhill.",
  },
  {
    step: "02",
    title: "Avoid River Valleys & Low-Lying Channels",
    desc: "Debris flows travel rapidly down stream channels. Stay away from riverbanks, bridges, and culvert junctions during torrential bursts.",
  },
  {
    step: "03",
    title: "Do Not Return to Inspect Property",
    desc: "Slopes frequently undergo secondary and tertiary collapses hours after the initial failure. Wait for clearance from the District Administration.",
  },
  {
    step: "04",
    title: "Alert Neighbours and Call 112",
    desc: "Warn nearby households if it is safe to do so. Immediately notify the nearest Village Office, Police Station, or Emergency Control Room.",
  },
];

export default function SafetyPage() {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    id1: true,
    id2: true,
    id3: false,
    id4: true,
    id5: false,
    id6: false,
  });

  const toggleItem = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#202923]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F5F3] border border-[#E1E6E1] text-[#247343] text-xs font-semibold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Public Safety Guidance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#202923]">
              Landslide Safety Guidelines for Residents
            </h1>
            <p className="text-sm sm:text-base text-[#526056] leading-relaxed">
              Living in high-range Kerala terrain requires continuous vigilance during the monsoon seasons. Use these clear, practical steps to protect your family and neighbourhood.
            </p>
          </div>

          {/* Section 1: Warning Signs */}
          <section className="space-y-6">
            <div className="border-b border-[#E1E6E1] pb-3">
              <h2 className="text-xl font-bold text-[#202923] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#EA580C]" />
                <span>Common Landslide Warning Signs</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#526056] mt-1">
                Slopes usually show warning indicators prior to catastrophic failure. Pay close attention to your surroundings.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WARNING_SIGNS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-lg border border-[#E1E6E1] hover:border-[#247343] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded uppercase"
                        style={{
                          backgroundColor: `${item.color}15`,
                          color: item.color,
                        }}
                      >
                        {item.urgency}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#202923] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#526056] mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: What to Do Before Heavy Rain */}
          <section className="space-y-6">
            <div className="border-b border-[#E1E6E1] pb-3">
              <h2 className="text-xl font-bold text-[#202923] flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-[#247343]" />
                <span>What to Do Before Heavy Rainfall</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#526056] mt-1">
                Proactive preparedness drastically reduces disaster vulnerability before saturated soils give way.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRE_RAINFALL_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="bg-[#F3F5F3] p-5 rounded-lg border border-[#E1E6E1] flex gap-4"
                >
                  <span className="text-lg font-black text-[#247343] shrink-0">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-[#202923]">{step.title}</h3>
                    <p className="text-xs text-[#526056] mt-1.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: What to Do During a Suspected Landslide */}
          <section className="space-y-6">
            <div className="border-b border-[#E1E6E1] pb-3">
              <h2 className="text-xl font-bold text-[#202923] flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#DC2626]" />
                <span>What to Do During a Suspected Landslide</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#526056] mt-1">
                Quick, calm reactions are critical when slope movement is heard or witnessed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DURING_EVENT_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="bg-white p-5 rounded-lg border border-[#E1E6E1] flex gap-4"
                >
                  <span className="text-lg font-black text-[#DC2626] shrink-0">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-[#202923]">{step.title}</h3>
                    <p className="text-xs text-[#526056] mt-1.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Emergency Preparedness Checklist */}
          <section className="bg-[#F3F5F3] p-6 sm:p-8 rounded-xl border border-[#E1E6E1] space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#202923] flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-[#247343]" />
                <span>Emergency Household Preparedness Checklist</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#526056] mt-1">
                Check off each item to ensure your family is ready before the heavy monsoon arrives.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#E1E6E1] cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.id1}
                  onChange={() => toggleItem("id1")}
                  className="w-4 h-4 text-[#247343] accent-[#247343] rounded"
                />
                <span className="text-xs text-[#202923]">
                  Water-resistant pouch with ration cards, Aadhaar, deed, and prescriptions
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#E1E6E1] cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.id2}
                  onChange={() => toggleItem("id2")}
                  className="w-4 h-4 text-[#247343] accent-[#247343] rounded"
                />
                <span className="text-xs text-[#202923]">
                  Charged torch/flashlight and spare batteries
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#E1E6E1] cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.id3}
                  onChange={() => toggleItem("id3")}
                  className="w-4 h-4 text-[#247343] accent-[#247343] rounded"
                />
                <span className="text-xs text-[#202923]">
                  Portable power bank for mobile phone communication
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#E1E6E1] cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.id4}
                  onChange={() => toggleItem("id4")}
                  className="w-4 h-4 text-[#247343] accent-[#247343] rounded"
                />
                <span className="text-xs text-[#202923]">
                  3-day supply of personal medications and first-aid kit
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#E1E6E1] cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.id5}
                  onChange={() => toggleItem("id5")}
                  className="w-4 h-4 text-[#247343] accent-[#247343] rounded"
                />
                <span className="text-xs text-[#202923]">
                  Pre-agreed family meeting point on elevated, non-slope terrain
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#E1E6E1] cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.id6}
                  onChange={() => toggleItem("id6")}
                  className="w-4 h-4 text-[#247343] accent-[#247343] rounded"
                />
                <span className="text-xs text-[#202923]">
                  Contact numbers for local Ward Member, ASHA worker, and Village Officer
                </span>
              </label>
            </div>
          </section>

          {/* Section 5: Official Links & Emergency Numbers */}
          <section className="space-y-6">
            <div className="border-b border-[#E1E6E1] pb-3">
              <h2 className="text-xl font-bold text-[#202923] flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#247343]" />
                <span>Official Emergency &amp; Disaster Management Links</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#526056] mt-1">
                Save these emergency numbers and consult official portals during active weather events.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-lg border border-[#E1E6E1] bg-white space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#247343]">Emergency Response</div>
                <div className="text-2xl font-black text-[#202923]">112</div>
                <p className="text-xs text-[#526056]">
                  Unified National Emergency Line for Police, Fire & Rescue, and Ambulance services.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-[#E1E6E1] bg-white space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#247343]">District Control Room</div>
                <div className="text-2xl font-black text-[#202923]">1077</div>
                <p className="text-xs text-[#526056]">
                  Direct helpline to your District Disaster Management Authority (DDMA).
                </p>
              </div>

              <div className="p-5 rounded-lg border border-[#E1E6E1] bg-white space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#247343]">State Emergency Ops</div>
                <div className="text-2xl font-black text-[#202923]">1070</div>
                <p className="text-xs text-[#526056]">
                  State Emergency Operations Centre (SEOC) under the Government of Kerala.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium">
              <a
                href="https://sdma.kerala.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#247343] hover:underline"
              >
                <span>Kerala State Disaster Management Authority (KSDMA)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://mausam.imd.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#247343] hover:underline"
              >
                <span>India Meteorological Department (IMD) Rainfall Bulletins</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://ndma.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#247343] hover:underline"
              >
                <span>National Disaster Management Authority (NDMA)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
