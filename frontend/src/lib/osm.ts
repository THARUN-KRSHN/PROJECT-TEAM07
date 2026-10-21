// OpenStreetMap (OSM) Integration Utility
// Connects to OpenStreetMap Nominatim API & OpenStreetMap Tile Services for live geospatial details

export interface OsmPlace {
  place_id: number;
  osm_id: number;
  osm_type: string;
  lat: string;
  lon: string;
  display_name: string;
  type: string;
  importance: number;
  boundingbox?: string[];
  address?: {
    road?: string;
    suburb?: string;
    village?: string;
    town?: string;
    city?: string;
    county?: string;
    state_district?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}

const OSM_NOMINATIM_BASE = "https://nominatim.openstreetmap.org";

/**
 * Searches OpenStreetMap Nominatim for locations, villages, and hill corridors in Kerala Western Ghats.
 */
export async function searchOsmLocations(query: string): Promise<OsmPlace[]> {
  if (!query || query.trim().length < 2) return [];

  try {
    const encodedQuery = encodeURIComponent(`${query.trim()}, Kerala, India`);
    const res = await fetch(
      `${OSM_NOMINATIM_BASE}/search?format=json&q=${encodedQuery}&addressdetails=1&limit=5`,
      {
        headers: {
          "Accept-Language": "en",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`OSM Nominatim API error: ${res.status}`);
    }

    const data: OsmPlace[] = await res.json();
    return data;
  } catch (error) {
    console.warn("OpenStreetMap Nominatim fetch failed, using local index fallback", error);
    return [];
  }
}

/**
 * Reverse geocodes coordinates to get live OpenStreetMap details, road names, and district hierarchy.
 */
export async function reverseGeocodeOsm(lat: number, lon: number): Promise<OsmPlace | null> {
  try {
    const res = await fetch(
      `${OSM_NOMINATIM_BASE}/reverse?format=json&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`,
      {
        headers: {
          "Accept-Language": "en",
        },
      }
    );

    if (!res.ok) return null;
    const data: OsmPlace = await res.json();
    return data;
  } catch (error) {
    console.warn("OSM Reverse Geocode failed:", error);
    return null;
  }
}
