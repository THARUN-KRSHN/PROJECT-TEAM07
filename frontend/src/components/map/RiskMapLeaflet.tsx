"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { LocationData } from "@/data/mockLocations";
import { getRiskColor } from "@/lib/utils";

declare global {
  interface Window {
    gm_authFailure?: () => void;
  }
}

interface RiskMapLeafletProps {
  locations: LocationData[];
  selectedLocation: LocationData;
  onSelectLocation: (location: LocationData) => void;
  activeLayers: {
    risk: boolean;
    historical: boolean;
    rainfall: boolean;
    settlements: boolean;
  };
  baseMapType: "terrain" | "satellite" | "osm";
}

const LEAFLET_BASE_MAPS = {
  terrain: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://opentopomap.org/">OpenTopoMap</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, USGS",
  },
  osm: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
} as const;

const GOOGLE_SCRIPT_ID = "giri-raksha-google-maps";

export default function RiskMapLeaflet({
  locations,
  selectedLocation,
  onSelectLocation,
  activeLayers,
  baseMapType,
}: RiskMapLeafletProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Leaflet Map & Layer References
  const leafletMapInstanceRef = useRef<L.Map | null>(null);
  const leafletTileLayerRef = useRef<L.TileLayer | null>(null);
  const leafletMarkerGroupRef = useRef<L.LayerGroup | null>(null);
  const leafletHistoricalGroupRef = useRef<L.LayerGroup | null>(null);
  const leafletSelectedCircleRef = useRef<L.Circle | null>(null);

  const hasFittedLeafletRef = useRef<boolean>(false);

  // Suppress unbilled Google Maps billing errors and clean up any injected Google scripts
  useEffect(() => {
    // 1. Remove any legacy or injected Google Maps script tags
    if (typeof document !== "undefined") {
      const existing = document.getElementById(GOOGLE_SCRIPT_ID);
      if (existing) existing.remove();
      const allGoogleScripts = document.querySelectorAll('script[src*="maps.googleapis.com"]');
      allGoogleScripts.forEach((s) => s.remove());
    }

    // 2. Intercept console errors & warnings to strictly suppress BillingNotEnabledMapError
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    console.error = (...args: unknown[]) => {
      const msg = typeof args[0] === "string" ? args[0] : "";
      if (
        msg.includes("BillingNotEnabledMapError") ||
        msg.includes("billing-not-enabled-map-error") ||
        msg.includes("google.maps") ||
        msg.includes("maps.googleapis.com") ||
        msg.includes("Google Maps JavaScript API")
      ) {
        return; // Silently ignore as requested
      }
      originalConsoleError.apply(console, args);
    };

    console.warn = (...args: unknown[]) => {
      const msg = typeof args[0] === "string" ? args[0] : "";
      if (
        msg.includes("BillingNotEnabledMapError") ||
        msg.includes("billing-not-enabled-map-error") ||
        msg.includes("google.maps") ||
        msg.includes("maps.googleapis.com") ||
        msg.includes("Google Maps JavaScript API")
      ) {
        return;
      }
      originalConsoleWarn.apply(console, args);
    };

    // 3. Prevent window.gm_authFailure popup
    window.gm_authFailure = () => {
      // Intentionally silent
    };

    return () => {
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
    };
  }, []);

  // Initialize Leaflet Map (Zero billing, high-performance OpenStreetMap & Esri)
  useEffect(() => {
    if (!containerRef.current) return;

    if (!leafletMapInstanceRef.current) {
      const map = L.map(containerRef.current, {
        center: selectedLocation.coordinates,
        zoom: 9,
        zoomControl: false,
        attributionControl: true,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);

      const initialBaseMap = LEAFLET_BASE_MAPS[baseMapType];
      const tileLayer = L.tileLayer(initialBaseMap.url, {
        maxZoom: 18,
        attribution: initialBaseMap.attribution,
      }).addTo(map);

      leafletTileLayerRef.current = tileLayer;
      leafletMarkerGroupRef.current = L.layerGroup().addTo(map);
      leafletHistoricalGroupRef.current = L.layerGroup().addTo(map);
      leafletMapInstanceRef.current = map;
    }

    return () => {
      if (leafletMapInstanceRef.current) {
        leafletMapInstanceRef.current.remove();
        leafletMapInstanceRef.current = null;
        leafletTileLayerRef.current = null;
        leafletMarkerGroupRef.current = null;
        leafletHistoricalGroupRef.current = null;
        leafletSelectedCircleRef.current = null;
      }
    };
  }, []);

  // Handle Leaflet base map tile switch (Terrain / Satellite / OSM)
  useEffect(() => {
    if (!leafletMapInstanceRef.current || !leafletTileLayerRef.current) return;

    leafletMapInstanceRef.current.removeLayer(leafletTileLayerRef.current);
    const nextBaseMap = LEAFLET_BASE_MAPS[baseMapType];

    const newLayer = L.tileLayer(nextBaseMap.url, {
      maxZoom: 18,
      attribution: nextBaseMap.attribution,
    }).addTo(leafletMapInstanceRef.current);

    leafletTileLayerRef.current = newLayer;
  }, [baseMapType]);

  // Update Leaflet markers (Clean, uncluttered, professional pin styling with hover tooltips)
  useEffect(() => {
    if (
      !leafletMapInstanceRef.current ||
      !leafletMarkerGroupRef.current ||
      !leafletHistoricalGroupRef.current
    )
      return;

    leafletMarkerGroupRef.current.clearLayers();
    leafletHistoricalGroupRef.current.clearLayers();

    if (leafletSelectedCircleRef.current) {
      leafletMapInstanceRef.current.removeLayer(leafletSelectedCircleRef.current);
      leafletSelectedCircleRef.current = null;
    }

    if (activeLayers.risk) {
      locations.forEach((loc) => {
        const isSelected = loc.id === selectedLocation.id;
        const color = getRiskColor(loc.riskLevel);

        // Sleek, compact marker design to avoid overcrowding
        const size = isSelected ? 24 : 16;
        const innerSize = isSelected ? 12 : 8;
        const pulseRing = isSelected
          ? `<div style="position: absolute; inset: -6px; border-radius: 9999px; background-color: ${color.hex}; opacity: 0.35; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>`
          : "";

        const nameLabel = isSelected
          ? `<div style="position: absolute; bottom: -24px; left: 50%; transform: translateX(-50%); white-space: nowrap; background: #ffffff; border: 1.5px solid ${color.hex}; color: #202923; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.15); pointer-events: none; z-index: 1000;">${loc.name}</div>`
          : "";

        const iconHtml = `
          <div style="position: relative; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            ${pulseRing}
            <div style="position: relative; width: ${size}px; height: ${size}px; border-radius: 9999px; background-color: #ffffff; border: ${isSelected ? "2.5px" : "2px"} solid ${color.hex}; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.18);">
              <div style="width: ${innerSize}px; height: ${innerSize}px; border-radius: 9999px; background-color: ${color.hex};"></div>
            </div>
            ${nameLabel}
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: "custom-leaflet-marker",
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });

        const marker = L.marker(loc.coordinates, {
          icon: customIcon,
          zIndexOffset: isSelected ? 1000 : Math.round(loc.riskScore * 100),
        });

        // Instant hover tooltip showing place name and risk
        marker.bindTooltip(
          `<div style="font-weight: 700; font-size: 12px; color: #202923;">${loc.name}</div><div style="color: ${color.hex}; font-size: 11px; font-weight: 600;">Risk: ${loc.riskLevel} (${(loc.riskScore * 100).toFixed(0)}%)</div>`,
          { direction: "top", offset: [0, -size / 2], opacity: 0.95 }
        );

        marker.on("click", () => onSelectLocation(loc));
        leafletMarkerGroupRef.current?.addLayer(marker);
      });

      // Show hazard radius circle ONLY for the selected location (avoids screen clutter)
      if (selectedLocation.riskScore >= 0.70) {
        const selColor = getRiskColor(selectedLocation.riskLevel);
        const radiusMeters = Math.max(1500, selectedLocation.riskScore * 3500);
        const circle = L.circle(selectedLocation.coordinates, {
          radius: radiusMeters,
          color: selColor.hex,
          fillColor: selColor.hex,
          fillOpacity: 0.08,
          weight: 1.5,
          dashArray: "4, 6",
        });
        circle.addTo(leafletMapInstanceRef.current);
        leafletSelectedCircleRef.current = circle;
      }
    }

    // Historical landslide points
    if (activeLayers.historical) {
      locations.forEach((loc) => {
        loc.historicalEvents.forEach((ev, i) => {
          const offsetLat = loc.coordinates[0] + (i + 1) * 0.007 * (i % 2 === 0 ? 1 : -1);
          const offsetLng = loc.coordinates[1] + (i + 1) * 0.007 * (i % 2 === 0 ? -1 : 1);

          const histIcon = L.divIcon({
            html: `
              <div style="width: 12px; height: 12px; background: #D97706; border: 1.5px solid #ffffff; transform: rotate(45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2); cursor: pointer;" title="${ev.title} (${ev.year})">
              </div>
            `,
            className: "hist-marker",
            iconSize: [12, 12],
            iconAnchor: [6, 6],
          });

          const histMarker = L.marker([offsetLat, offsetLng], { icon: histIcon });
          histMarker.bindPopup(`
            <div style="font-size: 11px; padding: 4px; color: #202923;">
              <strong style="color: #D97706;">${ev.title} (${ev.year})</strong>
              <p style="margin-top: 4px; color: #526056;">${ev.description}</p>
              <div style="margin-top: 4px; color: #202923; font-weight: 500;">Volume: ${ev.volumeEstimatedM3}</div>
            </div>
          `);
          leafletHistoricalGroupRef.current?.addLayer(histMarker);
        });
      });
    }

    const validLocations = locations.filter(
      (location) =>
        Number.isFinite(location.coordinates[0]) &&
        Number.isFinite(location.coordinates[1]) &&
        location.coordinates[0] >= 8.0 &&
        location.coordinates[0] <= 13.0 &&
        location.coordinates[1] >= 74.5 &&
        location.coordinates[1] <= 78.0
    );

    if (!hasFittedLeafletRef.current && validLocations.length > 0) {
      const bounds = L.latLngBounds(validLocations.map((l) => l.coordinates));
      leafletMapInstanceRef.current.fitBounds(bounds, {
        padding: [36, 36],
        maxZoom: 9,
        animate: false,
      });
      hasFittedLeafletRef.current = true;
    } else {
      leafletMapInstanceRef.current.flyTo(selectedLocation.coordinates, 11, {
        duration: 0.8,
        easeLinearity: 0.25,
      });
    }
  }, [locations, selectedLocation, activeLayers, onSelectLocation]);

  return (
    <div className="w-full h-full relative">
      {/* Map Engine Viewport */}
      <div ref={containerRef} className="w-full h-full relative z-0" />

      {/* Geospatial Engine Status Pill (OpenStreetMap & Esri World Imagery) */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-auto flex items-center gap-2 bg-white/95 backdrop-blur border border-[#E1E6E1] px-3 py-1.5 rounded-full shadow-sm text-xs">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[#526056] font-medium">Map Engine:</span>
        <span className="text-[#247343] font-semibold">OpenStreetMap &amp; Esri Satellite</span>
        <span className="text-[#8E9B90] text-[10px] hidden sm:inline">(Live Kerala DEM)</span>
      </div>
    </div>
  );
}
