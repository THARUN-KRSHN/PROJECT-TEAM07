"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { LocationData } from "@/data/mockLocations";
import { getRiskColor } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface GoogleLatLng {
  lat: number;
  lng: number;
}

interface GoogleMapInstance {
  fitBounds(bounds: GoogleLatLngBounds): void;
  panTo(position: GoogleLatLng): void;
  setZoom(zoom: number): void;
  setMapTypeId(mapTypeId: string): void;
}

interface GoogleLatLngBounds {
  extend(position: GoogleLatLng): void;
}

interface GoogleMarker {
  setMap(map: GoogleMapInstance | null): void;
  addListener(event: string, handler: () => void): void;
}

interface GoogleCircle {
  setMap(map: GoogleMapInstance | null): void;
  addListener(event: string, handler: () => void): void;
}

interface GoogleInfoWindow {
  setContent(content: string): void;
  open(options: { map: GoogleMapInstance; anchor?: GoogleMarker }): void;
}

interface GoogleMapsNamespace {
  Map: new (element: HTMLElement, options: Record<string, unknown>) => GoogleMapInstance;
  Marker: new (options: Record<string, unknown>) => GoogleMarker;
  Circle: new (options: Record<string, unknown>) => GoogleCircle;
  InfoWindow: new () => GoogleInfoWindow;
  LatLngBounds: new () => GoogleLatLngBounds;
}

interface GoogleMapsWindow {
  maps?: GoogleMapsNamespace;
}

declare global {
  interface Window {
    google?: GoogleMapsWindow;
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

const toPosition = (coordinates: [number, number]): GoogleLatLng => ({
  lat: coordinates[0],
  lng: coordinates[1],
});

export default function RiskMapLeaflet({
  locations,
  selectedLocation,
  onSelectLocation,
  activeLayers,
  baseMapType,
}: RiskMapLeafletProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Default to Leaflet / OpenStreetMap for 100% reliable, zero-billing, high-performance rendering
  const [activeEngine, setActiveEngine] = useState<"google" | "leaflet">("leaflet");
  const [googleAuthError, setGoogleAuthError] = useState<string | null>(null);

  // Google Maps Refs
  const googleMapInstanceRef = useRef<GoogleMapInstance | null>(null);
  const googleMarkersRef = useRef<GoogleMarker[]>([]);
  const googleCircleRef = useRef<GoogleCircle | null>(null);
  const googleInfoWindowRef = useRef<GoogleInfoWindow | null>(null);

  // Leaflet Refs
  const leafletMapInstanceRef = useRef<L.Map | null>(null);
  const leafletTileLayerRef = useRef<L.TileLayer | null>(null);
  const leafletMarkerGroupRef = useRef<L.LayerGroup | null>(null);
  const leafletHistoricalGroupRef = useRef<L.LayerGroup | null>(null);
  const leafletSelectedCircleRef = useRef<L.Circle | null>(null);

  const hasFittedLeafletRef = useRef<boolean>(false);
  const hasFittedGoogleRef = useRef<boolean>(false);

  // Handle Google Maps auth/billing failures gracefully
  useEffect(() => {
    window.gm_authFailure = () => {
      console.warn("Google Maps auth failure (BillingNotEnabledMapError). Keeping Leaflet engine active.");
      setGoogleAuthError(
        "Google Maps API key has billing disabled in Google Cloud (BillingNotEnabledMapError). OpenStreetMap & Esri Satellite engine is active."
      );
      setActiveEngine("leaflet");
    };

    return () => {
      delete window.gm_authFailure;
    };
  }, []);

  // Try optional Google Maps script load in the background only
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey || typeof window === "undefined") return;

    if (window.google?.maps?.Map) return;

    const existing = document.getElementById(GOOGLE_SCRIPT_ID);
    if (!existing) {
      const script = document.createElement("script");
      script.id = GOOGLE_SCRIPT_ID;
      script.async = true;
      script.defer = true;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
        apiKey
      )}&v=weekly&loading=async`;

      script.onerror = () => {
        setGoogleAuthError("Google Maps script unavailable. Leaflet active.");
      };

      document.head.appendChild(script);
    }
  }, []);

  // Initialize Leaflet Map (Primary Engine)
  useEffect(() => {
    if (activeEngine !== "leaflet" || !containerRef.current) return;

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
  }, [activeEngine]);

  // Handle Leaflet base map tile switch
  useEffect(() => {
    if (activeEngine !== "leaflet" || !leafletMapInstanceRef.current || !leafletTileLayerRef.current)
      return;

    leafletMapInstanceRef.current.removeLayer(leafletTileLayerRef.current);
    const nextBaseMap = LEAFLET_BASE_MAPS[baseMapType];

    const newLayer = L.tileLayer(nextBaseMap.url, {
      maxZoom: 18,
      attribution: nextBaseMap.attribution,
    }).addTo(leafletMapInstanceRef.current);

    leafletTileLayerRef.current = newLayer;
  }, [activeEngine, baseMapType]);

  // Update Leaflet markers (Clean, uncluttered, professional pin styling with hover tooltips)
  useEffect(() => {
    if (
      activeEngine !== "leaflet" ||
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
  }, [activeEngine, locations, selectedLocation, activeLayers, onSelectLocation]);

  // Google Maps safe initialization if user explicitly requests it and constructor exists
  useEffect(() => {
    if (activeEngine !== "google" || !containerRef.current) return;

    if (typeof window.google?.maps?.Map !== "function") {
      setGoogleAuthError("Google Maps requires an active billing account in Google Cloud Console.");
      setTimeout(() => setActiveEngine("leaflet"), 0);
      return;
    }

    try {
      if (!googleMapInstanceRef.current) {
        googleMapInstanceRef.current = new window.google.maps.Map(containerRef.current, {
          center: toPosition(selectedLocation.coordinates),
          zoom: 10,
          mapTypeId:
            baseMapType === "satellite"
              ? "satellite"
              : baseMapType === "terrain"
              ? "terrain"
              : "roadmap",
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          clickableIcons: false,
          gestureHandling: "greedy",
        });
        googleInfoWindowRef.current = new window.google.maps.InfoWindow();
      }
    } catch {
      setTimeout(() => setActiveEngine("leaflet"), 0);
    }

    return () => {
      googleMarkersRef.current.forEach((m) => m.setMap(null));
      if (googleCircleRef.current) googleCircleRef.current.setMap(null);
      googleMarkersRef.current = [];
      googleCircleRef.current = null;
      googleMapInstanceRef.current = null;
    };
  }, [activeEngine, baseMapType, selectedLocation.coordinates]);

  return (
    <div className="w-full h-full relative">
      {/* Map Engine Viewport */}
      <div ref={containerRef} className="w-full h-full relative z-0" />

      {/* Subtle notification banner if Google Maps fails */}
      {googleAuthError && (
        <div className="absolute top-16 right-4 z-20 max-w-sm bg-white/95 backdrop-blur border border-emerald-300 rounded-lg p-2.5 shadow-md text-xs text-[#202923] pointer-events-auto flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-[#247343] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="font-semibold text-[#247343]">OpenStreetMap / Leaflet Engine Active</div>
            <p className="text-[11px] text-[#526056]">
              All 130+ Kerala Western Ghats sectors are rendering on OpenStreetMap &amp; Esri Satellite.
            </p>
          </div>
        </div>
      )}

      {/* Engine Switcher Pill */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-auto flex items-center gap-1.5 bg-white/95 backdrop-blur border border-[#E1E6E1] px-2.5 py-1 rounded-full shadow-sm text-[11px]">
        <span className="text-[#526056] font-medium">Map Engine:</span>
        <button
          onClick={() => setActiveEngine("leaflet")}
          className={`px-2.5 py-0.5 rounded-full font-semibold transition-colors ${
            activeEngine === "leaflet"
              ? "bg-[#247343] text-white shadow-xs"
              : "text-[#526056] hover:text-[#202923]"
          }`}
          title="Leaflet with OpenStreetMap & Esri World Imagery"
        >
          OpenStreetMap (Leaflet)
        </button>
        <span className="text-[#E1E6E1]">|</span>
        <button
          onClick={() => {
            if (typeof window.google?.maps?.Map === "function") {
              setActiveEngine("google");
            } else {
              setGoogleAuthError(
                "Google Maps API requires billing enabled in Google Cloud Console. Running on OpenStreetMap."
              );
            }
          }}
          className={`px-2.5 py-0.5 rounded-full font-semibold transition-colors ${
            activeEngine === "google"
              ? "bg-[#247343] text-white shadow-xs"
              : "text-[#526056] hover:text-[#202923]"
          }`}
          title="Google Maps JavaScript API"
        >
          Google Maps
        </button>
      </div>
    </div>
  );
}
