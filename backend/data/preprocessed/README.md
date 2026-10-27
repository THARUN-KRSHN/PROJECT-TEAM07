# Preprocessed Data

This folder is reserved for datasets after schema normalization, coordinate
validation, duplicate removal, missing-value handling, and spatial/temporal
alignment.

## Current status

The current pipeline reads `backend/data/raw/integrated_model_features.csv`
as its repository data contract. Although that file contains processed
features, it remains in `raw` for backward compatibility with the existing
pipeline and deployment exports. It must not be described as a clean,
independently validated dataset.

When the pipeline is split into explicit stages, place outputs here and record:

- input source and source timestamp;
- coordinate reference system and spatial resolution;
- temporal resolution;
- transformations and missing-data handling;
- processing version and data-quality status.

## Ownership

Primary role: Richard Robinson — GIS, Data Pipeline & Quality Assurance.
Supporting role: Udhay Jose M — Data Science and Machine Learning.
