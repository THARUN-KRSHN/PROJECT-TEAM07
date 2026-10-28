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

const googleMarkerIcon = (color: string, selected: boolean) => ({
  path: "M 0,0 m -9,0 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0",
  fillColor: color,
  fillOpacity: 1,
  strokeColor: "#FFFFFF",
  strokeWeight: selected ? 4 : 2,
  scale: selected ? 1.35 : 1,
});

export default function RiskMapLeaflet({
  locations,
  selectedLocation,
  onSelectLocation,
  activeLayers,
  baseMapType,
}: RiskMapLeafletProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Engine state: "google" or "leaflet"
  const [activeEngine, setActiveEngine] = useState<"google" | "leaflet">(() => {
    if (typeof window !== "undefined" && window.google?.maps) return "google";
    return "leaflet";
  });
  const [googleAuthError, setGoogleAuthError] = useState<string | null>(null);

  // Google Maps Refs
  const googleMapInstanceRef = useRef<GoogleMapInstance | null>(null);
  const googleMarkersRef = useRef<GoogleMarker[]>([]);
  const googleCirclesRef = useRef<GoogleCircle[]>([]);
  const googleInfoWindowRef = useRef<GoogleInfoWindow | null>(null);

  // Leaflet Refs
  const leafletMapInstanceRef = useRef<L.Map | null>(null);
  const leafletTileLayerRef = useRef<L.TileLayer | null>(null);
  const leafletMarkerGroupRef = useRef<L.LayerGroup | null>(null);
  const leafletHistoricalGroupRef = useRef<L.LayerGroup | null>(null);

  const hasFittedGoogleRef = useRef<boolean>(false);
  const hasFittedLeafletRef = useRef<boolean>(false);

  // 1. Hook to capture Google Maps auth / billing failure callback
  useEffect(() => {
    window.gm_authFailure = () => {
      console.warn(
        "Google Maps JavaScript API: gm_authFailure triggered (BillingNotEnabledMapError). Switching to Leaflet engine automatically."
      );
      setGoogleAuthError(
        "Google Maps API Key requires billing enabled in Google Cloud Console (BillingNotEnabledMapError). Falling back to OpenStreetMap / Leaflet."
      );
      setActiveEngine("leaflet");
    };

    return () => {
      delete window.gm_authFailure;
    };
  }, []);

  // 2. Try loading Google Maps if API key is present
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey || typeof window === "undefined") {
      return;
    }

    if (window.google?.maps) {
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_SCRIPT_ID;
    script.async = true;
    script.defer = true;
    // Note: added loading=async parameter to comply with current Google Maps API best practices
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&v=weekly&loading=async`;

    script.onload = () => {
      if (window.google?.maps) {
        setActiveEngine("google");
      } else {
        setActiveEngine("leaflet");
      }
    };

    script.onerror = () => {
      setGoogleAuthError("Google Maps script failed to load. Falling back to OpenStreetMap / Leaflet.");
      setActiveEngine("leaflet");
    };

    const existing = document.getElementById(GOOGLE_SCRIPT_ID);
    if (!existing) {
      document.head.appendChild(script);
    }
  }, []);

  // 3. Initialize or clean up Google Maps when activeEngine === "google"
  useEffect(() => {
    if (activeEngine !== "google" || !containerRef.current || !window.google?.maps) return;

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
    } catch (err: unknown) {
      console.warn("Google Maps initialization exception, falling back to Leaflet:", err);
      setTimeout(() => setActiveEngine("leaflet"), 0);
    }

    return () => {
      googleMarkersRef.current.forEach((m) => m.setMap(null));
      googleCirclesRef.current.forEach((c) => c.setMap(null));
      googleMarkersRef.current = [];
      googleCirclesRef.current = [];
      googleMapInstanceRef.current = null;
    };
  }, [activeEngine, baseMapType, selectedLocation.coordinates]);

  // 4. Update Google Map markers and layers
  useEffect(() => {
    if (activeEngine !== "google" || !googleMapInstanceRef.current || !window.google?.maps) return;

    googleMapInstanceRef.current.setMapTypeId(
      baseMapType === "satellite" ? "satellite" : baseMapType === "terrain" ? "terrain" : "roadmap"
    );

    googleMarkersRef.current.forEach((m) => m.setMap(null));
    googleCirclesRef.current.forEach((c) => c.setMap(null));
    googleMarkersRef.current = [];
    googleCirclesRef.current = [];

    if (activeLayers.risk) {
      locations.forEach((location) => {
        const color = getRiskColor(location.riskLevel);
        const marker = new window.google!.maps!.Marker({
          map: googleMapInstanceRef.current,
          position: toPosition(location.coordinates),
          title: `${location.name} - ${location.riskLevel}`,
          icon: googleMarkerIcon(color.hex, location.id === selectedLocation.id),
          optimized: true,
        });

        marker.addListener("click", () => {
          onSelectLocation(location);
          googleInfoWindowRef.current?.setContent(
            `<strong>${location.name}</strong><br />Risk: ${location.riskLevel}<br />Score: ${location.riskScore.toFixed(2)}`
          );
          googleInfoWindowRef.current?.open({
            map: googleMapInstanceRef.current!,
            anchor: marker,
          });
        });
        googleMarkersRef.current.push(marker);

        if (location.riskScore >= 0.7) {
          const circle = new window.google!.maps!.Circle({
            map: googleMapInstanceRef.current,
            center: toPosition(location.coordinates),
            radius: location.riskScore * 3000,
            strokeColor: color.hex,
            strokeOpacity: 0.7,
            strokeWeight: 1,
            fillColor: color.hex,
            fillOpacity: 0.08,
          });
          circle.addListener("click", () => onSelectLocation(location));
          googleCirclesRef.current.push(circle);
        }
      });
    }

    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach((loc) => bounds.extend(toPosition(loc.coordinates)));

    if (!hasFittedGoogleRef.current && locations.length > 0) {
      googleMapInstanceRef.current.fitBounds(bounds);
      hasFittedGoogleRef.current = true;
    } else {
      googleMapInstanceRef.current.panTo(toPosition(selectedLocation.coordinates));
    }
  }, [activeEngine, locations, selectedLocation, activeLayers, baseMapType, onSelectLocation]);

  // 5. Initialize or clean up Leaflet Map when activeEngine === "leaflet"
  useEffect(() => {
    if (activeEngine !== "leaflet" || !containerRef.current) return;

    if (!leafletMapInstanceRef.current) {
      const map = L.map(containerRef.current, {
        center: selectedLocation.coordinates,
        zoom: 10,
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
      }
    };
  }, [activeEngine, baseMapType, selectedLocation.coordinates]);

  // 6. Handle Leaflet base map tile switch
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

  // 7. Update Leaflet markers and layers
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

    if (activeLayers.risk) {
      locations.forEach((loc) => {
        const isSelected = loc.id === selectedLocation.id;
        const color = getRiskColor(loc.riskLevel);

        const iconHtml = `
          <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <div style="position: absolute; inset: 0; border-radius: 9999px; background-color: ${
              color.hex
            }; opacity: ${isSelected ? "0.35" : "0.15"}; transform: scale(${isSelected ? 1.4 : 1});"></div>
            <div style="position: relative; width: 22px; height: 22px; border-radius: 9999px; background-color: #ffffff; border: 2.5px solid ${
              color.hex
            }; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
              <div style="width: 8px; height: 8px; border-radius: 9999px; background-color: ${
                color.hex
              };"></div>
            </div>
            ${
              isSelected
                ? `<div style="position: absolute; bottom: -22px; white-space: nowrap; background: #ffffff; border: 1.5px solid ${color.hex}; color: #202923; font-size: 11px; font-weight: bold; padding: 2px 8px; border-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.12); pointer-events: none;">${loc.name}</div>`
                : ""
            }
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: "custom-leaflet-marker",
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        });

        const marker = L.marker(loc.coordinates, { icon: customIcon });
        marker.on("click", () => onSelectLocation(loc));

        if (loc.riskScore >= 0.7) {
          const circle = L.circle(loc.coordinates, {
            radius: loc.riskScore * 3000,
            color: color.hex,
            fillColor: color.hex,
            fillOpacity: 0.08,
            weight: 1.5,
            dashArray: "4, 6",
          });
          circle.on("click", () => onSelectLocation(loc));
          leafletMarkerGroupRef.current?.addLayer(circle);
        }

        leafletMarkerGroupRef.current?.addLayer(marker);
      });
    }

    if (activeLayers.historical) {
      locations.forEach((loc) => {
        loc.historicalEvents.forEach((ev, i) => {
          const offsetLat = loc.coordinates[0] + (i + 1) * 0.007 * (i % 2 === 0 ? 1 : -1);
          const offsetLng = loc.coordinates[1] + (i + 1) * 0.007 * (i % 2 === 0 ? -1 : 1);

          const histIcon = L.divIcon({
            html: `
              <div style="width: 14px; height: 14px; background: #D97706; border: 1.5px solid #ffffff; transform: rotate(45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2); cursor: pointer;" title="${ev.title} (${ev.year})">
              </div>
            `,
            className: "hist-marker",
            iconSize: [14, 14],
            iconAnchor: [7, 7],
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
        location.coordinates[0] >= -90 &&
        location.coordinates[0] <= 90 &&
        location.coordinates[1] >= -180 &&
        location.coordinates[1] <= 180
    );

    if (!hasFittedLeafletRef.current && validLocations.length > 0) {
      const bounds = L.latLngBounds(validLocations.map((l) => l.coordinates));
      leafletMapInstanceRef.current.fitBounds(bounds, {
        padding: [36, 36],
        maxZoom: 10,
        animate: false,
      });
      hasFittedLeafletRef.current = true;
    } else {
      leafletMapInstanceRef.current.flyTo(selectedLocation.coordinates, 12, {
        duration: 0.8,
        easeLinearity: 0.25,
      });
    }
  }, [activeEngine, locations, selectedLocation, activeLayers, onSelectLocation]);

  return (
    <div className="w-full h-full relative">
      {/* Map Engine Viewport */}
      <div ref={containerRef} className="w-full h-full relative z-0" />

      {/* Top Banner Notice when Billing Error or Fallback to Leaflet */}
      {googleAuthError && activeEngine === "leaflet" && (
        <div className="absolute top-16 right-4 z-20 max-w-sm bg-white/95 backdrop-blur border border-amber-300 rounded-lg p-2.5 shadow-lg text-xs text-[#202923] pointer-events-auto flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-semibold text-amber-900 flex items-center justify-between">
              <span>OpenStreetMap / Leaflet Engine Active</span>
              <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-mono">
                Auto Fallback
              </span>
            </div>
            <p className="text-[11px] text-[#526056] leading-tight">
              Google Maps reported <code>BillingNotEnabledMapError</code>. OpenStreetMap &amp; Esri Satellite tiles are running seamlessly.
            </p>
          </div>
        </div>
      )}

      {/* Engine Switcher Pill (Bottom Left above attribution) */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-auto flex items-center gap-1.5 bg-white/90 backdrop-blur border border-[#E1E6E1] px-2 py-1 rounded-full shadow-sm text-[11px]">
        <span className="text-[#526056] font-medium">Engine:</span>
        <button
          onClick={() => {
            if (window.google?.maps) {
              setActiveEngine("google");
            } else {
              setGoogleAuthError("Google Maps requires billing enabled in Google Cloud Console.");
            }
          }}
          className={`px-2 py-0.5 rounded-full font-semibold transition-colors ${
            activeEngine === "google"
              ? "bg-[#247343] text-white shadow-xs"
              : "text-[#526056] hover:text-[#202923]"
          }`}
          title="Google Maps JavaScript API"
        >
          Google Maps
        </button>
        <span className="text-[#E1E6E1]">|</span>
        <button
          onClick={() => setActiveEngine("leaflet")}
          className={`px-2 py-0.5 rounded-full font-semibold transition-colors ${
            activeEngine === "leaflet"
              ? "bg-[#247343] text-white shadow-xs"
              : "text-[#526056] hover:text-[#202923]"
          }`}
          title="Leaflet with OpenStreetMap / Esri World Imagery"
        >
          OpenStreetMap (Leaflet)
        </button>
      </div>
    </div>
  );
}
