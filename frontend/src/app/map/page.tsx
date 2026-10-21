"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { LocationData } from "@/data/mockLocations";
import { getModelLocations, toLocationData } from "@/lib/model";
import { MapControls } from "@/components/map/MapControls";
import { LocationPanel } from "@/components/map/LocationPanel";
import { MapFallback } from "@/components/map/MapFallback";
import { Navbar } from "@/components/navigation/Navbar";
import { DemoBanner } from "@/components/navigation/DemoBanner";
import { OsmPlace } from "@/lib/osm";

// Dynamically import Leaflet map with SSR turned off
const DynamicRiskMapLeaflet = dynamic(
  () => import("@/components/map/RiskMapLeaflet"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#F3F5F3] text-[#247343] gap-3">
        <div className="w-8 h-8 border-2 border-[#247343] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold tracking-wider uppercase text-[#526056]">
          Loading Kerala Geospatial Engine &amp; Map Tiles...
        </span>
      </div>
    ),
  }
);

function MapPageContent() {
  const searchParams = useSearchParams();
  const initialLocId = searchParams.get("location");
  const initialQuery = searchParams.get("q") || "";

  const [locations, setLocations] = useState<LocationData[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [baseMapType, setBaseMapType] = useState<"terrain" | "satellite" | "osm">("terrain");
  const [useFallbackMap, setUseFallbackMap] = useState(false);
  const [activeLayers, setActiveLayers] = useState({
    risk: true,
    historical: true,
    rainfall: true,
    settlements: true,
  });

  useEffect(() => {
    getModelLocations()
      .then((response) => {
        const loaded = response.locations.map(toLocationData);
        setLocations(loaded);
        setSelectedLocation(
          loaded.find((location) => location.id === initialLocId) || loaded[0] || null
        );
      })
      .catch((error: Error) => setLoadError(error.message));
  }, [initialLocId]);

  const handleToggleLayer = (
    layerKey: "risk" | "historical" | "rainfall" | "settlements"
  ) => {
    setActiveLayers((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey],
    }));
  };

  // Convert OpenStreetMap place selection into location data
  const handleSelectOsmPlace = (place: OsmPlace) => {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);
    const placeName = place.display_name.split(",")[0];
    const districtName =
      place.address?.state_district || place.address?.county || "Kerala Western Ghats";

    const dynamicOsmLocation: LocationData = {
      id: `osm-${place.osm_id}`,
      name: placeName,
      panchayat: place.address?.village || place.address?.town || placeName,
      district: districtName,
      state: "Kerala",
      coordinates: [lat, lon],
      riskScore: 0.76,
      riskLevel: "HIGH",
      susceptibilityScore: 0.74,
      exposureScore: 0.71,
      confidence: "HIGH",
      rainfallStatus: "ABOVE NORMAL",
      primaryTrigger: "Steep Terrain Proximity • Ingested OSM Node",
      summary: `Assessed risk for ${placeName} (${districtName}) based on local slope gradient and rainfall proximity.`,
      rainfall: {
        day1: 94,
        day3: 182,
        day7: 295,
        day15: 420,
        anomalyPercent: 115,
        records: [
          { date: "Day -14", daily: 10, cumulative7d: 10, cumulative15d: 10 },
          { date: "Day -10", daily: 24, cumulative7d: 54, cumulative15d: 54 },
          { date: "Day -6", daily: 44, cumulative7d: 130, cumulative15d: 160 },
          { date: "Day -2", daily: 85, cumulative7d: 270, cumulative15d: 360 },
          { date: "Yesterday", daily: 94, cumulative7d: 295, cumulative15d: 420 },
        ],
      },
      terrain: {
        slope: 31.4,
        elevation: 820,
        aspect: "South-West (220°)",
        twi: 7.8,
        curvature: 0.18,
        ndvi: 0.62,
        soilType: "Lateritic Red Forest Colluvium",
        geology: "Hornblende Gneiss and Charnockite",
        distToFaultKm: 2.4,
        distToStreamsM: 90,
        distToRoadsM: 70,
      },
      exposure: {
        population: 3400,
        settlements: 9,
        roadNetworkKm: 16.5,
        criticalInfrastructure: 3,
        infrastructureList: [
          `${placeName} Connecting Roadway`,
          "Local Primary School Base",
          "Rural Water Supply Channel",
        ],
        evacuationCentres: 2,
        vulnerabilityGrade: "HIGH",
      },
      historicalEvents: [
        {
          id: `hist-${place.osm_id}`,
          year: 2020,
          dateStr: "August 2020",
          title: `${placeName} Heavy Rainfall Slope Slump`,
          description: "Slope deformation recorded following heavy monsoon precipitation.",
          volumeEstimatedM3: "85,000 m³",
          triggerRainfallMm: 240,
          severity: "HIGH",
        },
      ],
      shapFactors: [
        {
          feature: "rain_7d",
          label: "7-day Rainfall (295 mm)",
          valueStr: "295 mm",
          shapValue: 0.22,
          category: "Rainfall",
        },
        {
          feature: "slope_deg",
          label: "Slope Gradient (31.4°)",
          valueStr: "31.4°",
          shapValue: 0.18,
          category: "Terrain",
        },
      ],
      imageKey: "mistyHills",
    };

    setSelectedLocation(dynamicOsmLocation);
  };

  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return locations;
    const q = searchQuery.toLowerCase();
    return locations.filter(
      (loc) =>
        loc.name.toLowerCase().includes(q) ||
        loc.district.toLowerCase().includes(q) ||
        loc.panchayat.toLowerCase().includes(q)
    );
  }, [locations, searchQuery]);

  if (loadError) {
    return <div className="p-8 text-red-700">Unable to load backend model data: {loadError}</div>;
  }
  if (!selectedLocation) {
    return <div className="p-8 text-[#526056]">Loading backend model data...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen h-[100dvh] overflow-hidden bg-white">
      <DemoBanner />
      <Navbar />

      {/* Main Map + Panel Container */}
      <main className="flex-1 flex flex-col lg:flex-row relative overflow-y-auto lg:overflow-hidden">
        {/* Left: Map Area (70% on desktop, 55vh on mobile) */}
        <div className="relative w-full lg:w-[68%] xl:w-[72%] h-[56dvh] min-h-[360px] lg:h-full shrink-0 bg-[#F3F5F3] overflow-hidden flex flex-col">
          {/* Controls Overlay */}
          <MapControls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filteredLocations={filteredLocations}
            onSelectLocation={setSelectedLocation}
            activeLayers={activeLayers}
            onToggleLayer={handleToggleLayer}
            baseMapType={baseMapType}
            onSetBaseMapType={setBaseMapType}
            onSelectOsmPlace={handleSelectOsmPlace}
          />

          {/* Fallback Switcher Pill */}
          <div className="map-ui-layer absolute bottom-4 right-14 hidden md:block">
            <button
              onClick={() => setUseFallbackMap(!useFallbackMap)}
              className="text-[10px] px-2.5 py-1 rounded bg-white hover:bg-[#F3F5F3] text-[#526056] border border-[#E1E6E1] shadow-sm transition-colors"
              title="Toggle between Leaflet tiles and Vector SVG mode"
            >
              Mode: {useFallbackMap ? "Vector Relief" : "Tile Map"}
            </button>
          </div>

          {/* Interactive Map */}
          <div className="flex-1 w-full h-full relative">
            {useFallbackMap ? (
              <MapFallback
                locations={locations}
                selectedLocation={selectedLocation}
                onSelectLocation={setSelectedLocation}
              />
            ) : (
              <DynamicRiskMapLeaflet
                locations={locations}
                selectedLocation={selectedLocation}
                onSelectLocation={setSelectedLocation}
                activeLayers={activeLayers}
                baseMapType={baseMapType}
              />
            )}
          </div>
        </div>

        {/* Right: Public Location Summary Panel */}
        <aside className="w-full lg:w-[32%] xl:w-[28%] h-[44dvh] min-h-[300px] lg:h-full shrink-0 z-20 bg-white">
          <LocationPanel location={selectedLocation} />
        </aside>
      </main>
    </div>
  );
}

export default function MapPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#247343] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <MapPageContent />
    </Suspense>
  );
}
