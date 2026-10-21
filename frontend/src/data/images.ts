// Centralized Image Configuration for GiriRaksha
// High-resolution photography of Western Ghats, Kerala, tea plantations, misty mountains, rain clouds & hill roads
// Each entry includes CSS fallback gradients in case external images cannot be loaded or when offline.

export interface ImageAsset {
  url: string;
  alt: string;
  credit?: string;
  fallbackGradient: string;
}

export const IMAGES = {
  heroLandscape: {
    url: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=2000&q=80",
    alt: "Misty Western Ghats mountain ridges enveloped in monsoon clouds in Kerala",
    credit: "Unsplash - Western Ghats Valley",
    fallbackGradient: "linear-gradient(135deg, #0d281e 0%, #17382d 50%, #1f4e3d 100%)",
  },
  mistyHills: {
    url: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1600&q=80",
    alt: "Lush green tea estate and steep ridges in Munnar and Wayanad, Western Ghats",
    credit: "Unsplash - Kerala Highlands",
    fallbackGradient: "linear-gradient(145deg, #112820 0%, #1b4d3e 60%, #285e4d 100%)",
  },
  monsoonRain: {
    url: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1600&q=80",
    alt: "Intense monsoon rain sweeping over Western Ghats tropical forest slopes",
    credit: "Unsplash - Monsoon Cloudburst",
    fallbackGradient: "linear-gradient(160deg, #13241d 0%, #1c3d31 50%, #164e3b 100%)",
  },
  mountainRoad: {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    alt: "Winding Ghat road carved along steep mountain slopes in Kerala",
    credit: "Unsplash - Mountain Pass",
    fallbackGradient: "linear-gradient(135deg, #1e2d24 0%, #2d4a3e 50%, #3e4d3a 100%)",
  },
  denseForest: {
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80",
    alt: "Canopy of dense evergreen forest in Silent Valley & Western Ghats",
    credit: "Unsplash - Shola Forest",
    fallbackGradient: "linear-gradient(135deg, #0b1f17 0%, #143d2c 50%, #1e5940 100%)",
  },
  aerialTerrain: {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    alt: "Aerial digital elevation view of rugged ridge lines and valleys",
    credit: "Unsplash - High Altitude Terrain",
    fallbackGradient: "linear-gradient(140deg, #0e241c 0%, #1e4537 60%, #2f6952 100%)",
  },
  villageSettlement: {
    url: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1600&q=80",
    alt: "Vulnerable hillside rural settlement nestled below steep slope in Kerala",
    credit: "Unsplash - Hillside Settlement",
    fallbackGradient: "linear-gradient(135deg, #192720 0%, #234336 50%, #3b5042 100%)",
  },
  meppadiHero: {
    url: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1800&q=80",
    alt: "Steep verdant slopes of Wayanad landscape with heavy cloud cover",
    credit: "Unsplash - Wayanad Slopes",
    fallbackGradient: "linear-gradient(135deg, #132f24 0%, #1a4938 50%, #2b6e54 100%)",
  },
  ctaBackground: {
    url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=80",
    alt: "Dramatic misty ridges of the Western Ghats mountain range",
    credit: "Unsplash - Mountain Ridge Horizon",
    fallbackGradient: "linear-gradient(145deg, #0a1b14 0%, #143527 50%, #1e503b 100%)",
  },
  disasterManagement: {
    url: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1000&q=80",
    alt: "Emergency operations, field GIS and disaster mitigation monitoring",
    credit: "Disaster Coordination",
    fallbackGradient: "linear-gradient(135deg, #1b2f28 0%, #2c4d40 100%)",
  },
  panchayatPlanning: {
    url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
    alt: "Community ecological stewardship and local panchayat planning",
    credit: "Community Planning",
    fallbackGradient: "linear-gradient(135deg, #163629 0%, #23543f 100%)",
  },
  residentAwareness: {
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
    alt: "Hill community and residential awareness in vulnerable zones",
    credit: "Citizen Awareness",
    fallbackGradient: "linear-gradient(135deg, #17382d 0%, #295646 100%)",
  },
  researcherAnalytics: {
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    alt: "Geospatial modeling, satellite telemetry and research data",
    credit: "Geospatial Modeling",
    fallbackGradient: "linear-gradient(135deg, #122820 0%, #1f4d3c 100%)",
  },
};
