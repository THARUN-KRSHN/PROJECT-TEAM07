"""Fix mismatched district labels in integrated_model_features.csv.

The synthetic data has randomly assigned district names that don't match
the actual lat/lon coordinates of the grid cells. This script uses a
polygon-approximation of Kerala district boundaries along the Western
Ghats to reassign the correct district based on each point's coordinates.
"""
import pandas as pd
import numpy as np
from pathlib import Path

RAW = Path(__file__).parent / "data" / "raw"
INPUT = RAW / "integrated_model_features.csv"
OUTPUT = INPUT  # overwrite in-place

# Approximate district bounding boxes for the Kerala Western Ghats corridor.
# These are arranged south-to-north and use realistic lat/lon ranges
# derived from actual Kerala district boundaries.
DISTRICT_BOXES = [
    # (district_name, lat_min, lat_max, lon_min, lon_max)
    ("Thiruvananthapuram", 8.20, 8.87, 76.65, 77.50),
    ("Kollam",             8.75, 9.20, 76.50, 77.30),
    ("Pathanamthitta",     9.05, 9.58, 76.40, 77.22),
    ("Alappuzha",          9.05, 9.60, 76.20, 76.55),
    ("Kottayam",           9.40, 9.85, 76.30, 76.95),
    ("Idukki",             9.58, 10.22, 76.55, 77.38),
    ("Ernakulam",          9.75, 10.18, 76.15, 76.65),
    ("Thrissur",           10.10, 10.68, 75.90, 76.55),
    ("Palakkad",           10.33, 11.07, 76.02, 76.92),
    ("Malappuram",         10.67, 11.24, 75.71, 76.48),
    ("Kozhikode",          11.08, 11.59, 75.54, 76.13),
    ("Wayanad",            11.27, 11.92, 75.68, 76.40),
    ("Kannur",             11.50, 12.20, 75.20, 76.00),
    ("Kasaragod",          12.10, 12.80, 74.80, 75.50),
]


def assign_district(lat: float, lon: float) -> str:
    """Return the best-matching district for a given lat/lon pair."""
    best_district = "Kerala Western Ghats"
    best_dist = float("inf")

    for name, lat_min, lat_max, lon_min, lon_max in DISTRICT_BOXES:
        # Check if point falls inside the bounding box
        if lat_min <= lat <= lat_max and lon_min <= lon <= lon_max:
            # Calculate distance from centre (prefer most central match)
            clat = (lat_min + lat_max) / 2
            clon = (lon_min + lon_max) / 2
            d = np.sqrt((lat - clat)**2 + (lon - clon)**2)
            if d < best_dist:
                best_dist = d
                best_district = name

    # If no bounding box matched, find nearest district centre
    if best_district == "Kerala Western Ghats":
        for name, lat_min, lat_max, lon_min, lon_max in DISTRICT_BOXES:
            clat = (lat_min + lat_max) / 2
            clon = (lon_min + lon_max) / 2
            d = np.sqrt((lat - clat)**2 + (lon - clon)**2)
            if d < best_dist:
                best_dist = d
                best_district = name

    return best_district


def main():
    df = pd.read_csv(INPUT)
    print(f"Loaded {len(df)} rows from {INPUT.name}")
    print(f"Lat range: {df.latitude.min():.4f} – {df.latitude.max():.4f}")
    print(f"Lon range: {df.longitude.min():.4f} – {df.longitude.max():.4f}")
    print(f"\nOld district distribution:\n{df.district.value_counts().to_string()}\n")

    # Reassign districts
    df["district"] = df.apply(lambda r: assign_district(r.latitude, r.longitude), axis=1)

    print(f"New district distribution:\n{df.district.value_counts().to_string()}\n")

    # Verify no mismatch
    mismatches = 0
    for _, row in df.iterrows():
        for name, lat_min, lat_max, lon_min, lon_max in DISTRICT_BOXES:
            if row.district == name:
                if not (lat_min <= row.latitude <= lat_max and lon_min <= row.longitude <= lon_max):
                    mismatches += 1
                break
    print(f"Remaining mismatches: {mismatches}")

    df.to_csv(OUTPUT, index=False)
    print(f"Saved corrected data to {OUTPUT}")


if __name__ == "__main__":
    main()
