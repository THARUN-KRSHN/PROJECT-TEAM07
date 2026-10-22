"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { LocationData } from "@/data/mockLocations";
import { getRiskColor } from "@/lib/utils";

const BASE_MAPS = {
  terrain: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://opentopomap.org/">OpenTopoMap</a> (CC-BY-SA) &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS",
  },
  osm: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
} as const;

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

export default function RiskMapLeaflet({
  locations,
  selectedLocation,
  onSelectLocation,
  activeLayers,
  baseMapType,
}: RiskMapLeafletProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markerGroupRef = useRef<L.LayerGroup | null>(null);
  const historicalGroupRef = useRef<L.LayerGroup | null>(null);
  const hasFittedLocationsRef = useRef(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Default center on Kerala Western Ghats
    const map = L.map(mapContainerRef.current, {
      center: selectedLocation.coordinates,
      zoom: 10,
      zoomControl: false,
      attributionControl: true,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    const initialBaseMap = BASE_MAPS[baseMapType];
    const tileLayer = L.tileLayer(initialBaseMap.url, {
      maxZoom: 18,
      attribution: initialBaseMap.attribution,
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Marker layers
    const markerGroup = L.layerGroup().addTo(map);
    const historicalGroup = L.layerGroup().addTo(map);

    markerGroupRef.current = markerGroup;
    historicalGroupRef.current = historicalGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Base Map switch
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    const nextBaseMap = BASE_MAPS[baseMapType];

    const newLayer = L.tileLayer(nextBaseMap.url, {
      maxZoom: 18,
      attribution: nextBaseMap.attribution,
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newLayer;
  }, [baseMapType]);

  // Update Markers when locations, selectedLocation, or activeLayers change
  useEffect(() => {
    if (!mapInstanceRef.current || !markerGroupRef.current || !historicalGroupRef.current) return;

    markerGroupRef.current.clearLayers();
    historicalGroupRef.current.clearLayers();

    // Render Risk Markers
    if (activeLayers.risk) {
      locations.forEach((loc) => {
        const isSelected = loc.id === selectedLocation.id;
        const color = getRiskColor(loc.riskLevel);

        const iconHtml = `
          <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <div style="position: absolute; inset: 0; border-radius: 9999px; background-color: ${color.hex}; opacity: ${
          isSelected ? "0.35" : "0.15"
        }; transform: scale(${isSelected ? 1.4 : 1});"></div>
            <div style="position: relative; width: 22px; height: 22px; border-radius: 9999px; background-color: #ffffff; border: 2.5px solid ${
              color.hex
            }; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
              <div style="width: 8px; height: 8px; border-radius: 9999px; background-color: ${color.hex};"></div>
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

        marker.on("click", () => {
          onSelectLocation(loc);
        });

        // Subtle hazard circle around high risk areas
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
          markerGroupRef.current?.addLayer(circle);
        }

        markerGroupRef.current?.addLayer(marker);
      });
    }

    // Historical landslide points
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
          historicalGroupRef.current?.addLayer(histMarker);
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

    if (!hasFittedLocationsRef.current && validLocations.length > 0) {
      const bounds = L.latLngBounds(validLocations.map((location) => location.coordinates));
      mapInstanceRef.current.fitBounds(bounds, {
        padding: [36, 36],
        maxZoom: 10,
        animate: false,
      });
      hasFittedLocationsRef.current = true;
    } else {
      mapInstanceRef.current.flyTo(selectedLocation.coordinates, 12, {
        duration: 1.0,
        easeLinearity: 0.25,
      });
    }
  }, [locations, selectedLocation, activeLayers, onSelectLocation]);

  return <div ref={mapContainerRef} className="w-full h-full relative" />;
}
