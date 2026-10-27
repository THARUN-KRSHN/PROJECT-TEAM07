"use client";

import React, { useState } from "react";
import { Info, X } from "lucide-react";
import Link from "next/link";

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Academic prototype notice"
      className="bg-[#fff8df] border-b border-[#f2c94c]/40 text-[#526056] text-xs py-2.5 px-4 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#247343] shrink-0" />
          <p className="text-xs">
            <strong className="font-semibold text-[#202923]">GiriRaksha notice:</strong> Risk awareness for Kerala communities. Always follow official emergency advisories.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs shrink-0">
          <Link
            href="/about"
            className="hidden sm:inline-block text-[#247343] hover:underline font-medium"
          >
            How to interpret the map
          </Link>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="text-[#526056] hover:text-[#202923] p-1 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
