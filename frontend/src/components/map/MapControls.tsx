"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Map as MapIcon,
  Globe,
  ShieldAlert,
  CloudRain,
  History,
  Home,
  Navigation,
  Info,
} from "lucide-react";
import { LocationData } from "@/data/mockLocations";
import { searchOsmLocations, OsmPlace } from "@/lib/osm";

interface MapControlsProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filteredLocations: LocationData[];
  onSelectLocation: (loc: LocationData) => void;
  activeLayers: {
    risk: boolean;
    historical: boolean;
    rainfall: boolean;
    settlements: boolean;
  };
  onToggleLayer: (layerKey: "risk" | "historical" | "rainfall" | "settlements") => void;
  baseMapType: "terrain" | "satellite" | "osm";
  onSetBaseMapType: (type: "terrain" | "satellite" | "osm") => void;
  onSelectOsmPlace?: (place: OsmPlace) => void;
}

export function MapControls({
  searchQuery,
  onSearchChange,
  filteredLocations,
  onSelectLocation,
  activeLayers,
  onToggleLayer,
  baseMapType,
  onSetBaseMapType,
  onSelectOsmPlace,
}: MapControlsProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [osmResults, setOsmResults] = useState<OsmPlace[]>([]);
  const [isSearchingOsm, setIsSearchingOsm] = useState(false);

  // Debounced search using OpenStreetMap Nominatim API
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 3) {
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingOsm(true);
      const results = await searchOsmLocations(searchQuery);
      setOsmResults(results);
      setIsSearchingOsm(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const displayedOsmResults = searchQuery.trim().length >= 3 ? osmResults : [];

  return (
    <>
      {/* Top Left: Search & Layer Toggles */}
      <div className="map-ui-layer absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-2 max-w-sm w-[calc(100%-1.5rem)] sm:w-88 pointer-events-auto">
        {/* Search Bar */}
        <div className="relative">
          <div className="bg-white rounded-lg shadow-md flex items-center px-3.5 py-2.5 border border-[#E1E6E1] focus-within:border-[#247343] focus-within:ring-2 focus-within:ring-[#247343]/20 transition-all">
            <Search className="w-4 h-4 text-[#247343] mr-2.5 shrink-0" />
            <input
              type="text"
              placeholder="Search district, Panchayat or place..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 300)}
              className="bg-transparent text-sm text-[#202923] placeholder-[#526056] focus:outline-none w-full"
            />
            {isSearchingOsm && (
              <span className="text-[10px] text-[#247343] font-mono animate-pulse">
                OSM...
              </span>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {searchFocused && (filteredLocations.length > 0 || displayedOsmResults.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-[#E1E6E1] max-h-72 overflow-y-auto shadow-xl z-30 divide-y divide-[#E1E6E1]">
              {/* Monitored Points */}
              {filteredLocations.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 bg-[#F3F5F3] text-[10px] font-bold uppercase tracking-wider text-[#526056]">
                    Monitored Risk Sectors
                  </div>
                  {filteredLocations.slice(0, 5).map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => {
                        onSelectLocation(loc);
                        onSearchChange(loc.name);
                        setSearchFocused(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-[#F3F5F3] flex items-center justify-between transition-colors"
                    >
                      <div>
                        <div className="text-xs font-semibold text-[#202923]">{loc.name}</div>
                        <div className="text-[10px] text-[#526056]">
                          {loc.panchayat}, {loc.district}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F3F5F3] text-[#247343] border border-[#E1E6E1]">
                        {loc.riskLevel}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* OpenStreetMap Results */}
              {displayedOsmResults.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 bg-[#F3F5F3] text-[10px] font-bold uppercase tracking-wider text-[#247343] flex items-center justify-between">
                    <span>OpenStreetMap Live Nodes</span>
                    <span className="text-[9px] text-[#526056]">Nominatim</span>
                  </div>
                  {displayedOsmResults.slice(0, 4).map((place) => (
                    <button
                      key={place.place_id}
                      type="button"
                      onClick={() => {
                        if (onSelectOsmPlace) {
                          onSelectOsmPlace(place);
                        }
                        onSearchChange(place.display_name.split(",")[0]);
                        setSearchFocused(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-[#F3F5F3] flex items-center justify-between transition-colors"
                    >
                      <div className="truncate mr-2">
                        <div className="text-xs font-semibold text-[#202923] truncate">
                          {place.display_name.split(",")[0]}
                        </div>
                        <div className="text-[10px] text-[#526056] truncate">
                          {place.display_name}
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-[#526056] px-1.5 py-0.5 rounded bg-[#F3F5F3] border border-[#E1E6E1] shrink-0">
                        OSM
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Filter Pill Layers */}
        <div className="bg-white rounded-lg p-1.5 flex flex-wrap gap-1.5 text-xs border border-[#E1E6E1] shadow-sm">
          <button
            type="button"
            onClick={() => onToggleLayer("risk")}
            className={`px-2.5 py-1 rounded text-xs flex items-center gap-1.5 transition-colors ${
              activeLayers.risk
                ? "bg-[#247343] text-white font-medium"
                : "bg-[#F3F5F3] text-[#526056] hover:text-[#202923]"
            }`}
          >
            <ShieldAlert className="w-3 h-3" />
            <span>Risk Layer</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleLayer("historical")}
            className={`px-2.5 py-1 rounded text-xs flex items-center gap-1.5 transition-colors ${
              activeLayers.historical
                ? "bg-[#D97706] text-white font-medium"
                : "bg-[#F3F5F3] text-[#526056] hover:text-[#202923]"
            }`}
          >
            <History className="w-3 h-3" />
            <span>Historical</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleLayer("rainfall")}
            className={`px-2.5 py-1 rounded text-xs flex items-center gap-1.5 transition-colors ${
              activeLayers.rainfall
                ? "bg-[#247343] text-white font-medium"
                : "bg-[#F3F5F3] text-[#526056] hover:text-[#202923]"
            }`}
          >
            <CloudRain className="w-3 h-3" />
            <span>Rainfall</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleLayer("settlements")}
            className={`px-2.5 py-1 rounded text-xs flex items-center gap-1.5 transition-colors ${
              activeLayers.settlements
                ? "bg-[#247343] text-white font-medium"
                : "bg-[#F3F5F3] text-[#526056] hover:text-[#202923]"
            }`}
          >
            <Home className="w-3 h-3" />
            <span>Settlements</span>
          </button>
        </div>
      </div>

      {/* Top Right: Satellite / Terrain / OpenStreetMap Switch */}
      <div className="absolute top-4 right-4 z-20 pointer-events-auto">
        <div className="bg-white rounded-lg p-1 flex items-center gap-1 border border-[#E1E6E1] text-xs shadow-md">
          <button
            type="button"
            onClick={() => onSetBaseMapType("terrain")}
            className={`px-2.5 sm:px-3 py-1.5 rounded text-xs flex items-center gap-1.5 font-medium transition-colors ${
              baseMapType === "terrain"
                ? "bg-[#247343] text-white"
                : "text-[#526056] hover:text-[#202923] hover:bg-[#F3F5F3]"
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Terrain</span>
          </button>

          <button
            type="button"
            onClick={() => onSetBaseMapType("satellite")}
            className={`px-2.5 sm:px-3 py-1.5 rounded text-xs flex items-center gap-1.5 font-medium transition-colors ${
              baseMapType === "satellite"
                ? "bg-[#247343] text-white"
                : "text-[#526056] hover:text-[#202923] hover:bg-[#F3F5F3]"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Satellite</span>
          </button>

          <button
            type="button"
            onClick={() => onSetBaseMapType("osm")}
            className={`px-2.5 sm:px-3 py-1.5 rounded text-xs flex items-center gap-1.5 font-medium transition-colors ${
              baseMapType === "osm"
                ? "bg-[#247343] text-white"
                : "text-[#526056] hover:text-[#202923] hover:bg-[#F3F5F3]"
            }`}
            title="OpenStreetMap Standard Vector & Road Tiles"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>OpenStreetMap</span>
          </button>
        </div>
      </div>

      {/* Bottom Left: 5-Level Risk Legend & Data Source Info */}
      <div className="absolute bottom-6 left-4 z-20 pointer-events-auto hidden sm:flex flex-col gap-2 max-w-sm">
        {/* Simple 5-Level Risk Legend */}
        <div className="bg-white rounded-lg p-3 border border-[#E1E6E1] text-xs shadow-md">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#526056] mb-2 flex items-center justify-between">
            <span>Risk Legend</span>
            <span className="text-[9px] text-[#247343] font-semibold">5 Levels</span>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#247343]" />
              <span className="text-xs text-[#202923] font-medium">Very Low</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#65A30D]" />
              <span className="text-xs text-[#202923] font-medium">Low</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#D97706]" />
              <span className="text-xs text-[#202923] font-medium">Moderate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#EA580C]" />
              <span className="text-xs text-[#202923] font-medium">High</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#DC2626]" />
              <span className="text-xs text-[#DC2626] font-bold">Very High</span>
            </div>
          </div>
        </div>

        {/* Data Source & Last-Updated Info Strip */}
        <div className="bg-white rounded-lg px-3 py-1.5 border border-[#E1E6E1] text-[10px] text-[#526056] shadow-sm flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Info className="w-3 h-3 text-[#247343]" />
            <span>Data: Cartosat DEM &amp; Precipitation model</span>
          </div>
          <span className="font-semibold text-[#202923]">Baseline 2024-25</span>
        </div>
      </div>
    </>
  );
}
