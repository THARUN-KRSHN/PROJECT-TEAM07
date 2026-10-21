"use client";

import React from "react";
import { LocationData } from "@/data/mockLocations";
import { getRiskColor } from "@/lib/utils";

interface MapFallbackProps {
  locations: LocationData[];
  selectedLocation: LocationData;
  onSelectLocation: (loc: LocationData) => void;
}

export function MapFallback({
  locations,
  selectedLocation,
  onSelectLocation,
}: MapFallbackProps) {
  const minLat = 8.2;
  const maxLat = 12.6;
  const minLng = 74.8;
  const maxLng = 77.6;

  const toSvgCoords = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 800;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 1000;
    return { x, y };
  };

  return (
    <div className="w-full h-full relative bg-[#F3F5F3] flex items-center justify-center overflow-hidden select-none">
      <svg
        className="w-full h-full max-w-4xl"
        viewBox="0 0 800 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="800" height="1000" fill="#F3F5F3" />

        {/* Western Ghats Mountain Ridge Spine Graphic */}
        <path
          d="M 320 120 Q 380 280 440 400 T 560 620 T 640 850 L 680 920"
          stroke="#E1E6E1"
          strokeWidth="60"
          strokeLinecap="round"
        />
        <path
          d="M 340 140 Q 390 280 450 420 T 570 640 T 650 860"
          stroke="#247343"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray="6 8"
          opacity="0.25"
        />

        {/* Topographic Contour Simulation Rings */}
        <ellipse cx="440" cy="320" rx="90" ry="120" stroke="#CDD5CF" strokeWidth="1.5" strokeDasharray="3 3" />
        <ellipse cx="440" cy="320" rx="60" ry="80" stroke="#A7D7B9" strokeWidth="1.5" />
        <ellipse cx="580" cy="650" rx="110" ry="140" stroke="#CDD5CF" strokeWidth="1.5" strokeDasharray="3 3" />
        <ellipse cx="580" cy="650" rx="70" ry="90" stroke="#A7D7B9" strokeWidth="1.5" />

        {/* Region Labels */}
        <text x="310" y="240" fill="#526056" fontSize="13" fontWeight="700" letterSpacing="2">
          WAYANAD PLATEAU
        </text>
        <text x="490" y="590" fill="#526056" fontSize="13" fontWeight="700" letterSpacing="2">
          IDUKKI HIGH RANGES
        </text>
        <text x="560" y="820" fill="#526056" fontSize="13" fontWeight="700" letterSpacing="2">
          AGASTHYAMALAI
        </text>
        <text x="120" y="550" fill="#99A89C" fontSize="16" fontWeight="bold" letterSpacing="4" transform="rotate(-70 120 550)">
          ARABIAN SEA COASTLINE
        </text>

        {/* Render Locations */}
        {locations.map((loc) => {
          const { x, y } = toSvgCoords(loc.coordinates[0], loc.coordinates[1]);
          const isSelected = loc.id === selectedLocation.id;
          const color = getRiskColor(loc.riskLevel);

          return (
            <g
              key={loc.id}
              className="cursor-pointer"
              onClick={() => onSelectLocation(loc)}
            >
              {/* Outer hazard circle */}
              {loc.riskScore > 0.7 && (
                <circle
                  cx={x}
                  cy={y}
                  r={loc.riskScore * 35}
                  fill={color.hex}
                  fillOpacity="0.08"
                  stroke={color.hex}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              )}

              {/* Pin Base */}
              <circle cx={x} cy={y} r="10" fill="#ffffff" stroke={color.hex} strokeWidth="3" />
              <circle cx={x} cy={y} r="4" fill={color.hex} />

              {/* Label */}
              <rect
                x={x + 14}
                y={y - 12}
                width={loc.name.length * 8 + 36}
                height="24"
                rx="4"
                fill="#ffffff"
                stroke={isSelected ? color.hex : "#E1E6E1"}
                strokeWidth={isSelected ? "2" : "1"}
              />
              <text x={x + 22} y={y + 4} fill="#202923" fontSize="11" fontWeight="bold">
                {loc.name}
              </text>
              <text
                x={x + loc.name.length * 8 + 20}
                y={y + 4}
                fill={color.hex}
                fontSize="10"
                fontWeight="800"
              >
                {loc.riskLevel.slice(0, 1)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
