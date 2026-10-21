"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mountain, Phone, AlertCircle, CheckSquare } from "lucide-react";
import { PublicChecklistModal } from "@/components/ui/PublicChecklistModal";

export function Footer() {
  const [checklistOpen, setChecklistOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-[#E1E6E1] bg-[#F3F5F3] text-[#526056] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Column 1: Brand & Purpose */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E1E6E1] flex items-center justify-center text-[#247343]">
                  <Mountain className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-xl font-bold tracking-tight text-[#202923]">
                  Giri<span className="text-[#247343]">Raksha</span>
                </span>
              </div>
              <p className="text-sm text-[#526056] leading-relaxed max-w-sm">
                Landslide risk awareness platform for the people of Kerala. Helping citizens understand local risk easily and prepare safely before and during heavy monsoon rainfall.
              </p>
              <div className="pt-2 text-xs text-[#526056]">
                <p className="font-semibold text-[#202923]">Team 07 — Data Analytics & Big Data Processing</p>
                <p className="mt-0.5">Academic Evaluation &amp; Community Demonstration</p>
              </div>
            </div>

            {/* Column 2: Public Navigation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#202923] mb-3">
                Public Website
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-[#247343] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/map" className="hover:text-[#247343] transition-colors">
                    Risk Map
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="hover:text-[#247343] transition-colors">
                    Safety Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#247343] transition-colors">
                    About GiriRaksha
                  </Link>
                </li>
                <li>
                  <Link href="/signin" className="hover:text-[#247343] transition-colors">
                    Sign In (Authorised)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Emergency Helplines */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#202923] mb-3">
                Official Helplines
              </h4>
              <ul className="space-y-2 text-sm text-[#526056]">
                <li className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#247343]" />
                  <span>National Emergency: <strong>112</strong></span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#247343]" />
                  <span>District Disaster Helpline: <strong>1077</strong></span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#247343]" />
                  <span>State Control Room: <strong>1070</strong></span>
                </li>
                <li className="pt-2 text-xs text-[#526056]">
                  <a
                    href="https://sdma.kerala.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#247343] hover:underline"
                  >
                    KSDMA Portal →
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Implementation Verification */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#202923] mb-3">
                Quality & Verification
              </h4>
              <p className="text-xs text-[#526056] leading-relaxed mb-3">
                Audited against the 34-point public landslide awareness specification.
              </p>
              <button
                onClick={() => setChecklistOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold bg-white border border-[#E1E6E1] text-[#247343] hover:bg-[#247343] hover:text-white transition-colors"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Public Checklist (34 Items)</span>
              </button>
            </div>
          </div>

          {/* Bottom Disclaimer */}
          <div className="mt-10 pt-6 border-t border-[#E1E6E1] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#526056]">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0" />
              <p>
                <strong>Disclaimer:</strong> Assessed risk categories indicate general terrain susceptibility and baseline rainfall saturation. They do not constitute official warnings. Follow instructions from local emergency authorities.
              </p>
            </div>
            <div className="shrink-0 text-right">
              &copy; {new Date().getFullYear()} GiriRaksha. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Public Checklist Modal */}
      <PublicChecklistModal
        isOpen={checklistOpen}
        onClose={() => setChecklistOpen(false)}
      />
    </>
  );
}
