# Analysis Data and Results

This folder is reserved for reproducible analysis artifacts, including
exploratory summaries, feature distributions, model evaluation tables,
validation outputs, explainability exports, and plots.

Analysis outputs must identify the exact input dataset, processing version,
experiment date, model configuration, and validation strategy. Never present
synthetic demo metrics or relative susceptibility rankings as operational
predictions.

## Big-data and analytics concepts

- **Feature engineering:** converts terrain and rainfall inputs into
  model-ready predictors such as rolling rainfall windows and slope.
- **Spatial validation:** groups nearby cells to reduce spatial leakage between
  training and validation.
- **Classification:** compares Logistic Regression and Random Forest baselines.
- **Model evaluation:** uses ROC-AUC, PR-AUC, precision, recall and F1 where
  labels and validation data are suitable.
- **Explainable analytics:** permutation importance and SHAP-style views show
  which factors influence a displayed result.

Primary role: Udhay Jose M — Data Science and Machine Learning.
