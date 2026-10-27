# Raw and Source Data

This folder contains downloaded or source-format files before the project's
normalization and feature-engineering stages. Files may include CSV, GeoJSON,
KML, and shapefile components.

## Current contents

- Landslide inventories: `landslide_events.csv`, `UGLC_point.csv`,
  `Global_Landslide_Catalog_Export_rows.csv`, and district GSI layers.
- Terrain and boundary sources: DEM-derived tables and Kerala LSG files.
- Rainfall and feature exports: rainfall windows and integrated model features.
- External evaluation material: Kodagu inventory.

The current repository has some already-derived tables in this folder because
the legacy pipeline expects them at these paths. Do not silently move or rename
them without updating `backend/config.py`, `backend/pipeline.py`, tests, and
deployment documentation.

## Data-quality rule

Every new source must document its provider, download date, spatial/temporal
resolution, coordinate reference system, license, and known missing values.
Synthetic demo data must remain clearly labelled and must never be treated as
observed events.

Owner: Richard Robinson — GIS, Data Pipeline & Quality Assurance.
