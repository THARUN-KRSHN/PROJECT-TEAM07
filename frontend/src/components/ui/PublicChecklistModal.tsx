"use client";

import React, { useState } from "react";
import { Check, X, Copy, RotateCcw, CheckSquare } from "lucide-react";

interface ChecklistItem {
  id: string;
  category: string;
  label: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Navigation and homepage
  { id: "nav-logo", category: "Navigation and homepage", label: "GiriRaksha logo and name" },
  { id: "nav-home", category: "Navigation and homepage", label: "Home" },
  { id: "nav-map", category: "Navigation and homepage", label: "Risk Map" },
  { id: "nav-safety", category: "Navigation and homepage", label: "Safety Guidelines" },
  { id: "nav-about", category: "Navigation and homepage", label: "About" },
  { id: "nav-signin", category: "Navigation and homepage", label: "Sign in button" },

  // Risk map
  { id: "map-interactive", category: "Risk map", label: "Interactive Kerala map" },
  { id: "map-search", category: "Risk map", label: "Search district, Panchayat or place" },
  { id: "map-legend", category: "Risk map", label: "Simple five-level risk legend" },
  { id: "map-click", category: "Risk map", label: "Click an area to view its summary" },
  { id: "map-controls", category: "Risk map", label: "Map zoom and location controls" },
  { id: "map-source", category: "Risk map", label: "Data source and last-updated information" },

  // Location details
  { id: "loc-name", category: "Location details", label: "Location name and administrative area" },
  { id: "loc-risk", category: "Location details", label: "Risk category with clear colour and text label" },
  { id: "loc-explain", category: "Location details", label: "Short plain-language explanation" },
  { id: "loc-rainfall", category: "Location details", label: "Available recent rainfall summary" },
  { id: "loc-history", category: "Location details", label: "Historical landslide information, if available" },
  { id: "loc-link", category: "Location details", label: "Link to detailed analysis for authorised users" },

  // Safety and awareness
  { id: "safe-signs", category: "Safety and awareness", label: "Common landslide warning signs" },
  { id: "safe-before", category: "Safety and awareness", label: "What to do before heavy rainfall" },
  { id: "safe-during", category: "Safety and awareness", label: "What to do during a suspected landslide" },
  { id: "safe-prep", category: "Safety and awareness", label: "Emergency preparedness checklist" },
  { id: "safe-links", category: "Safety and awareness", label: "Official emergency and disaster-management links" },

  // About and trust
  { id: "about-purpose", category: "About and trust", label: "Purpose of GiriRaksha" },
  { id: "about-interpret", category: "About and trust", label: "How to interpret the map" },
  { id: "about-sources", category: "About and trust", label: "Data sources and limitations" },
  { id: "about-disclaimer", category: "About and trust", label: "Disclaimer that risk information is not an official warning" },
  { id: "about-contact", category: "About and trust", label: "Contact or feedback link" },

  // Visual design
  { id: "vis-white", category: "Visual design", label: "White background" },
  { id: "vis-solid", category: "Visual design", label: "Solid colours only; no gradients" },
  { id: "vis-palette", category: "Visual design", label: "Consistent 3–4 colour palette" },
  { id: "vis-responsive", category: "Visual design", label: "Mobile-responsive layout" },
  { id: "vis-contrast", category: "Visual design", label: "Accessible text sizes and contrast" },
  { id: "vis-states", category: "Visual design", label: "Loading, empty and error states" },
];

const DEFAULT_CHECKED = CHECKLIST_ITEMS.reduce((acc, item) => {
  acc[item.id] = true;
  return acc;
}, {} as Record<string, boolean>);

export function PublicChecklistModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Lazy initial state avoids cascading render warning in React 19
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return DEFAULT_CHECKED;
    try {
      const stored = localStorage.getItem("giriraksha_checklist");
      return stored ? JSON.parse(stored) : DEFAULT_CHECKED;
    } catch {
      return DEFAULT_CHECKED;
    }
  });

  const [copyFeedback, setCopyFeedback] = useState(false);

  if (!isOpen) return null;

  const toggleItem = (id: string) => {
    const next = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(next);
    try {
      localStorage.setItem("giriraksha_checklist", JSON.stringify(next));
    } catch {
      // Ignore
    }
  };

  const handleReset = () => {
    const empty: Record<string, boolean> = {};
    CHECKLIST_ITEMS.forEach((item) => {
      empty[item.id] = false;
    });
    setCheckedItems(empty);
    try {
      localStorage.setItem("giriraksha_checklist", JSON.stringify(empty));
    } catch {
      // Ignore
    }
  };

  const handleCheckAll = () => {
    setCheckedItems(DEFAULT_CHECKED);
    try {
      localStorage.setItem("giriraksha_checklist", JSON.stringify(DEFAULT_CHECKED));
    } catch {
      // Ignore
    }
  };

  const handleCopy = () => {
    const completedCount = Object.values(checkedItems).filter(Boolean).length;
    const lines = [
      `GiriRaksha Public Website Checklist (${completedCount}/${CHECKLIST_ITEMS.length})`,
      "",
    ];

    const categories = Array.from(new Set(CHECKLIST_ITEMS.map((i) => i.category)));
    categories.forEach((cat) => {
      lines.push(`### ${cat}`);
      CHECKLIST_ITEMS.filter((i) => i.category === cat).forEach((item) => {
        lines.push(`[${checkedItems[item.id] ? "x" : " "}] ${item.label}`);
      });
      lines.push("");
    });

    navigator.clipboard.writeText(lines.join("\n"));
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const categories = Array.from(new Set(CHECKLIST_ITEMS.map((i) => i.category)));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Public website implementation checklist"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div className="bg-white rounded-xl border border-[#E1E6E1] shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E1E6E1] flex items-center justify-between bg-[#F3F5F3]">
          <div>
            <h2 className="text-lg font-bold text-[#202923]">Public website checklist</h2>
            <div className="text-xs text-[#526056] font-medium mt-0.5">
              <span className="font-bold text-[#247343]">{checkedCount}</span> / {CHECKLIST_ITEMS.length} items verified
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checklist"
            className="p-1 rounded text-[#526056] hover:text-[#202923] hover:bg-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {categories.map((category) => {
            const items = CHECKLIST_ITEMS.filter((i) => i.category === category);

            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-[#E1E6E1]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#202923]">
                    {category}
                  </h3>
                  <span className="text-[11px] text-[#526056]">
                    {items.filter((i) => checkedItems[i.id]).length} / {items.length}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {items.map((item) => {
                    const isChecked = !!checkedItems[item.id];
                    return (
                      <label
                        key={item.id}
                        className="flex items-center gap-2.5 p-2 rounded hover:bg-[#F3F5F3] cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(item.id)}
                          className="w-4 h-4 rounded text-[#247343] focus:ring-[#247343] accent-[#247343]"
                        />
                        <span className={`text-xs ${isChecked ? "text-[#202923]" : "text-[#526056]"}`}>
                          {item.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-3 border-t border-[#E1E6E1] bg-[#F3F5F3] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-[#E1E6E1] text-[#202923] hover:bg-[#E1E6E1]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset checklist</span>
            </button>
            <button
              onClick={handleCheckAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-[#E1E6E1] text-[#247343] hover:bg-[#E1E6E1]"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Check all</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#247343] text-white hover:bg-[#1E5E37] font-medium"
            >
              {copyFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy checklist</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded border border-[#E1E6E1] bg-white text-[#202923] hover:bg-[#E1E6E1]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
