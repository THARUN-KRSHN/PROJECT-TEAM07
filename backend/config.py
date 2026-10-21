"""GiriRaksha backend configuration."""
from pathlib import Path

ROOT = Path(__file__).parent
RAW = ROOT / "data" / "raw"          # drop real downloads here
API_DIR = ROOT / "static" / "api"    # JSON the frontend reads (served by Streamlit static serving)

BBOX = dict(lat_min=8.2, lat_max=12.8, lon_min=74.8, lon_max=77.5)  # Kerala / Western Ghats
CELL = 0.02                                                          # grid size in degrees (~2.2 km)
CLASSES = ["Very Low", "Low", "Moderate", "High", "Very High"]
CLASS_PERCENTILES = [50, 75, 90, 97]   # RELATIVE rank cut-offs (not calibrated probabilities)
FEATURES = ["elevation_m", "slope_deg", "aspect_deg", "curvature",
            "rainfall_1d_mm", "rainfall_3d_mm", "rainfall_7d_mm", "rainfall_15d_mm"]
NEIGHBOUR_KM = 15

# Gazetteer seeds for the location search / dossier (approximate coordinates; replace with LSG centroids).
SEED_LOCATIONS = {
    "meppadi": ("Meppadi", "Wayanad", 11.55, 76.13),
    "puthumala": ("Puthumala", "Wayanad", 11.53, 76.12),
    "kavalappara": ("Kavalappara", "Malappuram", 11.35, 76.20),
    "pettimudi": ("Pettimudi", "Idukki", 10.17, 77.00),
    "munnar": ("Munnar", "Idukki", 10.09, 77.06),
    "kokkayar": ("Kokkayar", "Kottayam", 9.57, 76.85),
    "adimali": ("Adimali", "Idukki", 10.01, 76.96),
    "nilambur": ("Nilambur", "Malappuram", 11.28, 76.23),
    "ranni": ("Ranni", "Pathanamthitta", 9.38, 76.78),
    "vithura": ("Vithura", "Thiruvananthapuram", 8.69, 77.00),
}

DATASETS = [  # (id, name, expected file in data/raw, purpose)
    ("events", "Landslide event inventory", "landslide_events.csv", "Observed/event rows supplied to the model"),
    ("features", "Integrated terrain and rainfall features", "integrated_model_features.csv", "Model feature table"),
    ("rainfall", "Daily rainfall and rolling windows", "rainfall_daily_and_windows.csv", "Rainfall provenance"),
    ("terrain", "Terrain feature table", "dem_terrain_features.csv", "Terrain provenance"),
    ("admin", "Administrative unit table", "admin_units.csv", "Location metadata"),
    ("lsg", "Kerala LSG boundaries", "kerala_lsg_data.geojson", "Boundary reference"),
    ("kodagu", "Kodagu external inventory", "kodagu_external_inventory.csv", "External evaluation"),
]
