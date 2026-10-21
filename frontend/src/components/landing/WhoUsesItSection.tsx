"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Building2, Users2, Microscope, ArrowRight } from "lucide-react";
import { IMAGES } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";

const STAKEHOLDERS = [
  {
    title: "Disaster Management",
    subtitle: "KSDMA & District Authorities",
    description:
      "Incident commanders use real-time rainfall anomaly thresholds to stage NDRF rescue teams and issue precautionary evacuation bulletins.",
    icon: ShieldCheck,
    image: IMAGES.disasterManagement,
  },
  {
    title: "Panchayat Officials",
    subtitle: "Local Ward & Village Governance",
    description:
      "Grama Panchayat leaders identify vulnerable hillside settlement clusters, plan relief camp capacity, and monitor road blockages.",
    icon: Building2,
    image: IMAGES.panchayatPlanning,
  },
  {
    title: "High-Range Residents",
    subtitle: "Community Early Warning",
    description:
      "Hillside families gain location-level awareness during extreme monsoon cloudbursts, understanding when their slope reaches saturation.",
    icon: Users2,
    image: IMAGES.residentAwareness,
  },
  {
    title: "Geospatial Researchers",
    subtitle: "Data-Driven Hazard Modeling",
    description:
      "Geologists and academic researchers analyze spatial feature importance, validate ML AUC-ROC metrics, and model climate resilience.",
    icon: Microscope,
    image: IMAGES.researcherAnalytics,
  },
];

export function WhoUsesItSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#091410]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Stakeholder Value
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2">
            Built for multi-tiered disaster governance.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3">
            From the State Emergency Operations Centre in Thiruvananthapuram down to the ward member
            in Meppadi.
          </p>
        </div>

        {/* 4 Large Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAKEHOLDERS.map((st, idx) => {
            const Icon = st.icon;
            return (
              <motion.div
                key={st.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 flex flex-col h-[400px] shadow-xl hover:border-emerald-500/50 transition-all duration-300"
              >
                {/* Full Card Background Image */}
                <div className="absolute inset-0 z-0">
                  <SafeImage
                    src={st.image.url}
                    alt={st.image.alt}
                    fallbackGradient={st.image.fallbackGradient}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Rich Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/30" />
                </div>

                {/* Overlaid Content */}
                <div className="relative z-10 p-6 flex flex-col h-full justify-end">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/90 border border-emerald-500/40 flex items-center justify-center text-emerald-300 mb-4 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {st.title}
                  </h3>
                  <div className="text-xs text-emerald-300 font-medium mb-3">
                    {st.subtitle}
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {st.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
