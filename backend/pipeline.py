"""GiriRaksha model pipeline: ingest -> features -> labels -> spatial-CV training -> JSON exports.

Runs in 'real' mode when dem.tif + imerg_daily.csv + an event file are in data/raw,
otherwise in 'demo_synthetic' mode (clearly flagged in every export)."""
from __future__ import annotations
import json, re, datetime as dt
import numpy as np, pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import GroupKFold, cross_val_predict
from sklearn.metrics import roc_auc_score, average_precision_score, precision_score, recall_score, f1_score
from sklearn.inspection import permutation_importance
import config as C

B = C.BBOX
_ridge = lambda lat: np.interp(lat, [8.2, 10.1, 10.8, 11.6, 12.8], [77.2, 77.0, 76.7, 76.1, 75.4])
_coast = lambda lat: np.interp(lat, [8.2, 9.0, 10.0, 11.0, 12.8], [77.0, 76.5, 76.2, 75.8, 74.9])


# ---------------------------------------------------------------- grid
def make_grid():
    lats = np.arange(B["lat_min"] + C.CELL / 2, B["lat_max"], C.CELL)
    lons = np.arange(B["lon_min"] + C.CELL / 2, B["lon_max"], C.CELL)
    LAT, LON = np.meshgrid(lats, lons, indexing="ij")
    return LAT, LON


def _frame(LAT, LON, feats: dict) -> pd.DataFrame:
    mask = (LON >= _coast(LAT)) & (LON <= _ridge(LAT) + 0.1)  # rough Kerala mask; use LSG polygons when available
    df = pd.DataFrame({"latitude": LAT[mask], "longitude": LON[mask], **{k: v[mask] for k, v in feats.items()}})
    df.insert(0, "cell_id", [f"C{i:06d}" for i in range(len(df))])
    return df


# ---------------------------------------------------------------- demo (synthetic) data
def demo_data(seed=7):
    rng = np.random.default_rng(seed)
    LAT, LON = make_grid()
    ridge, coast = _ridge(LAT), _coast(LAT)
    t = np.clip((LON - coast) / (ridge - coast), 0, 1)
    noise = sum(np.sin(LAT * a + LON * b + c) for a, b, c in [(31, 17, .3), (53, 41, 1.7), (97, 83, 2.9)])
    elev = np.clip(40 + 900 * t**3 + 1300 * np.exp(-((LON - ridge + .05) / .2) ** 2) + 60 * noise, 0, 2700)
    dy = C.CELL * 111000
    dx = dy * np.cos(np.radians(LAT))
    gy, gx = np.gradient(elev, axis=0) / dy, np.gradient(elev, axis=1) / dx
    slope = np.clip(np.degrees(np.arctan(8 * np.hypot(gx, gy))) + 2 * np.abs(noise) + rng.normal(0, 1.5, elev.shape), 0, 60)
    r15 = 250 + 1100 * np.exp(-((LON - (ridge - .15)) / .45) ** 2) + 60 * noise
    f = dict(elevation_m=elev, slope_deg=slope, aspect_deg=np.degrees(np.arctan2(gx, gy)) % 360,
             curvature=np.gradient(gy, axis=0) / dy + np.gradient(gx, axis=1) / dx,
             rainfall_1d_mm=r15 * .22, rainfall_3d_mm=r15 * .45, rainfall_7d_mm=r15 * .72, rainfall_15d_mm=r15)
    df = _frame(LAT, LON, {k: v * (1 + rng.normal(0, .03, v.shape)) if k.startswith("rain") else v for k, v in f.items()})
    # hidden "truth" used ONLY to fabricate demo events
    z = 0.12 * df.slope_deg + 0.0016 * df.rainfall_15d_mm - 0.0005 * df.elevation_m
    lo, hi = -60, 60
    for _ in range(40):
        mid = (lo + hi) / 2
        lo, hi = (mid, hi) if (1 / (1 + np.exp(-(z - mid)))).mean() > 0.03 else (lo, mid)
    hit = rng.random(len(df)) < 1 / (1 + np.exp(-(z - mid)))
    ev = df[hit].copy()
    ev["lat"] = ev.latitude + rng.uniform(-C.CELL / 2, C.CELL / 2, len(ev))
    ev["lon"] = ev.longitude + rng.uniform(-C.CELL / 2, C.CELL / 2, len(ev))
    ev["date"] = [dt.date(int(rng.integers(2018, 2025)), int(rng.integers(6, 10)), int(rng.integers(1, 28))).isoformat() for _ in range(len(ev))]
    ev["trigger"], ev["source"] = "rainfall", "demo_synthetic"
    return df, ev[["lat", "lon", "date", "trigger", "source"]].reset_index(drop=True)


# ---------------------------------------------------------------- real data loaders
def load_events() -> pd.DataFrame:
    frames = []
    p = C.RAW / "landslide_events.csv"
    if p.exists():
        d = pd.read_csv(p).rename(
            columns={
                "event_date": "date",
                "latitude": "lat",
                "longitude": "lon",
                "trigger": "trigger",
            }
        )
        frames.append(
            d.assign(source=d.get("source_name", "landslide_events"))[
                ["lat", "lon", "date", "trigger", "source"]
            ]
        )
    p = C.RAW / "coolr.csv"
    if p.exists():  # inspect the real schema; adjust aliases if your download differs
        d = pd.read_csv(p).rename(columns={"event_date": "date", "latitude": "lat", "longitude": "lon", "landslide_trigger": "trigger"})
        frames.append(d.assign(source="NASA_COOLR")[["lat", "lon", "date", "trigger", "source"]])
    p = C.RAW / "UGLC_point.csv"
    if p.exists():
        try:
            d = pd.read_csv(p)
        except pd.errors.ParserError:
            d = pd.read_csv(p, on_bad_lines="skip")
        if "WKT_GEOM" in d.columns:
            xy = d["WKT_GEOM"].str.extract(r"POINT\s*\(\s*([-\d.]+)\s+([-\d.]+)")
            d = d.assign(lon=xy[0].astype(float), lat=xy[1].astype(float), date=d.get("START DATE"),
                         trigger=d.get("PHYSICAL FACTORS"), source="UGLC")
            frames.append(d[["lat", "lon", "date", "trigger", "source"]])
    if not frames:
        return pd.DataFrame(columns=["lat", "lon", "date", "trigger", "source"])
    ev = pd.concat(frames, ignore_index=True).dropna(subset=["lat", "lon"])
    ev = ev[ev.lat.between(B["lat_min"], B["lat_max"]) & ev.lon.between(B["lon_min"], B["lon_max"])]
    ev["date"] = pd.to_datetime(ev["date"], errors="coerce").dt.date.astype("string")
    # overlapping catalogues are NOT independent events: collapse ~1 km / same day duplicates
    k = ev.lat.round(2).astype(str) + "_" + ev.lon.round(2).astype(str) + "_" + ev.date.astype(str)
    return ev.loc[~k.duplicated()].reset_index(drop=True)


def load_integrated_features() -> tuple[pd.DataFrame, pd.DataFrame]:
    """Load the repository's tabular feature and event exports.

    These files are the available raw-data contract for this repository. They
    already contain aligned terrain/rainfall features and training labels, so
    no fabricated grid or missing raster inputs are used.
    """
    features_path = C.RAW / "integrated_model_features.csv"
    if not features_path.exists():
        raise FileNotFoundError(f"Required raw feature file is missing: {features_path}")

    df = pd.read_csv(features_path)
    required = {
        "cell_id",
        "latitude",
        "longitude",
        "elevation_m",
        "slope_deg",
        "rainfall_1d_mm",
        "rainfall_3d_mm",
        "rainfall_7d_mm",
        "rainfall_15d_mm",
        "landslide_label_synthetic",
    }
    missing = required.difference(df.columns)
    if missing:
        raise ValueError(f"{features_path.name} is missing columns: {sorted(missing)}")
    for column in ("aspect_deg", "curvature"):
        if column not in df:
            df[column] = 0.0
    events = load_events()
    if events.empty:
        raise ValueError("No event rows were found in backend/data/raw.")
    return df, events


def terrain_from_dem(df: pd.DataFrame) -> pd.DataFrame:
    import rasterio
    from rasterio.enums import Resampling
    from rasterio.transform import rowcol
    with rasterio.open(C.RAW / "dem.tif") as src:
        step = max(1, int(round(0.0009 / abs(src.res[0]))))  # decimate to ~100 m
        h, w = src.height // step, src.width // step
        el = src.read(1, out_shape=(h, w), resampling=Resampling.average).astype(float)
        tr = src.transform * src.transform.scale(src.width / w, src.height / h)
    dy = abs(tr.e) * 111000
    gy, gx = np.gradient(el, axis=0) / dy, np.gradient(el, axis=1) / (dy * np.cos(np.radians(df.latitude.mean())))
    layers = dict(elevation_m=el, slope_deg=np.degrees(np.arctan(np.hypot(gx, gy))), aspect_deg=np.degrees(np.arctan2(gx, gy)) % 360,
                  curvature=np.gradient(gy, axis=0) / dy + np.gradient(gx, axis=1) / dy)
    r, c = rowcol(tr, df.longitude.values, df.latitude.values)
    r, c = np.clip(r, 0, h - 1), np.clip(c, 0, w - 1)
    return df.assign(**{k: v[r, c] for k, v in layers.items()})


def rainfall_from_csv(df: pd.DataFrame) -> pd.DataFrame:
    """imerg_daily.csv columns: date, lat, lon, precip_mm (already a DAILY TOTAL in mm)."""
    from scipy.spatial import cKDTree
    d = pd.read_csv(C.RAW / "imerg_daily.csv", parse_dates=["date"])
    pv = d.pivot_table(index="date", columns=["lat", "lon"], values="precip_mm").sort_index().asfreq("D")
    cols = np.array(pv.columns.tolist())
    idx = cKDTree(cols).query(df[["latitude", "longitude"]].values)[1]
    for k in (1, 3, 7, 15):
        q = pv.rolling(k, min_periods=k).sum().quantile(0.99).values  # p99 accumulation per rainfall cell
        df[f"rainfall_{k}d_mm"] = q[idx]
    return df


# ---------------------------------------------------------------- modelling
def label_cells(df, ev):
    lab = np.zeros(len(df), bool)
    key = {(round(a / C.CELL), round(b / C.CELL)) for a, b in zip(ev.lat, ev.lon)}
    lab[:] = [(round(a / C.CELL), round(b / C.CELL)) in key for a, b in zip(df.latitude, df.longitude)]
    return lab


def train(df, lab, seed=7):
    rng = np.random.default_rng(seed)
    pos = np.flatnonzero(lab)
    bg = rng.choice(np.flatnonzero(~lab), size=min(5 * len(pos), (~lab).sum()), replace=False)  # presence-background, 5:1
    tr = np.concatenate([pos, bg])
    X, y = df.loc[tr, C.FEATURES].values, lab[tr].astype(int)
    groups = (df.latitude.values[tr] // .5 * 100 + df.longitude.values[tr] // .5)  # 0.5-degree spatial blocks
    models = {"logistic_regression": make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000, class_weight="balanced")),
              "random_forest": RandomForestClassifier(300, max_depth=10, min_samples_leaf=3, class_weight="balanced_subsample", n_jobs=-1, random_state=seed)}
    try:
        from xgboost import XGBClassifier
        models["xgboost"] = XGBClassifier(n_estimators=300, max_depth=4, learning_rate=.05, scale_pos_weight=5, eval_metric="logloss")
    except ImportError:
        pass
    cv = GroupKFold(n_splits=min(5, len(np.unique(groups))))
    metrics = {}
    for name, m in models.items():
        p = cross_val_predict(m, X, y, cv=cv, groups=groups, method="predict_proba")[:, 1]
        yhat = p >= .5
        metrics[name] = dict(roc_auc=roc_auc_score(y, p), pr_auc=average_precision_score(y, p), precision=precision_score(y, yhat, zero_division=0),
                             recall=recall_score(y, yhat), f1=f1_score(y, yhat), validation="GroupKFold, 0.5-degree spatial blocks")
    best = max(metrics, key=lambda k: metrics[k]["roc_auc"])
    model = models[best].fit(X, y)
    imp = permutation_importance(model, X, y, n_repeats=5, random_state=seed, scoring="roc_auc")
    importance = sorted(({"feature": f, "importance": float(v)} for f, v in zip(C.FEATURES, imp.importances_mean)), key=lambda r: -r["importance"])
    return model, best, metrics, importance, dict(n_positive=int(len(pos)), n_background=int(len(bg)))


def classify(score):
    cuts = np.percentile(score, C.CLASS_PERCENTILES)
    return np.digitize(score, cuts)


# ---------------------------------------------------------------- orchestration / exports
def _hav(lat, lon, lats, lons):
    p = np.pi / 180
    a = np.sin((lats - lat) * p / 2) ** 2 + np.cos(lat * p) * np.cos(lats * p) * np.sin((lons - lon) * p / 2) ** 2
    return 12742 * np.arcsin(np.sqrt(a))


def _dump(name, obj):
    path = C.API_DIR / name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, default=lambda o: o.item() if hasattr(o, "item") else str(o), ensure_ascii=False))


def run() -> dict:
    present = {d[0]: (C.RAW / d[2]).exists() for d in C.DATASETS}
    raw_feature_file = (C.RAW / "integrated_model_features.csv").exists()
    raw_event_file = (C.RAW / "landslide_events.csv").exists()
    if not (raw_feature_file and raw_event_file):
        raise RuntimeError(
            "Raw backend data is incomplete. Expected integrated_model_features.csv "
            "and landslide_events.csv in backend/data/raw."
        )
    df, ev = load_integrated_features()
    mode = "raw_repository_data"
    df = df.dropna(subset=C.FEATURES).reset_index(drop=True)
    lab = df["landslide_label_synthetic"].astype(bool).values
    model, best, metrics, importance, sampling = train(df, lab)
    df["score"] = model.predict_proba(df[C.FEATURES].values)[:, 1]
    df["risk_class"] = classify(df.score.values)
    df["risk_label"] = [C.CLASSES[i] for i in df.risk_class]
    gen = dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")
    meta = dict(project="GiriRaksha", data_mode=mode, generated_at=gen, model=best, classes=C.CLASSES, cell_deg=C.CELL,
                disclaimer="Academic prototype. Static susceptibility ranking, NOT a warning system. Classes are relative percentile bands. "
                           + "Values are generated from the repository raw-data exports; verify provenance and experiments before presenting as validated.")
    # risk grid (compact arrays)
    _dump("risk_grid.json", dict(meta=meta, columns=["lat", "lon", "score", "class"],
          rows=[[round(a, 4), round(b, 4), round(s, 4), int(c)] for a, b, s, c in zip(df.latitude, df.longitude, df.score, df.risk_class)]))
    # Every feature row is a location point. No frontend seed locations are used.
    locs = []
    for i, r in df.iterrows():
        slug = str(r.cell_id).lower()
        district = str(r.get("district", "Kerala Western Ghats"))
        name = str(r.get("name", f"{district} {r.cell_id}"))
        panchayat = str(r.get("panchayat", district))
        lat, lon = float(r.latitude), float(r.longitude)
        r = df.iloc[i]
        near = ev[_hav(lat, lon, ev.lat.values, ev.lon.values) <= C.NEIGHBOUR_KM] if len(ev) else ev
        card = dict(slug=slug, name=name, panchayat=panchayat, district=district, lat=lat, lon=lon, cell_id=r.cell_id, risk_class=int(r.risk_class),
                    risk_label=r.risk_label, score=round(float(r.score), 4))
        locs.append(card)
        _dump(f"location/{slug}.json", dict(meta=meta, **card,
              terrain={k: round(float(r[k]), 2) for k in ("elevation_m", "slope_deg", "aspect_deg", "curvature")},
              rainfall={k: round(float(r[k]), 1) for k in C.FEATURES if k.startswith("rainfall")},
              rainfall_note="p99 rolling accumulations at the nearest rainfall cell; coarse (~10 km), not 30 m measurements",
              history=dict(events_within_km=C.NEIGHBOUR_KM, count=int(len(near)),
                           recent=near.sort_values("date", ascending=False).head(5).to_dict("records")),
              exposure=dict(population=int(r.get("population_estimate", 0)),
                            road_distance_m=float(r.get("distance_to_road_m", 0))),
              exposure_note="Exposure values are included only when present in integrated_model_features.csv.",
              source_status=str(r.get("data_status", "raw repository data"))))
    _dump("locations.json", dict(meta=meta, locations=sorted(locs, key=lambda x: -x["score"])))
    _dump("insights.json", dict(meta=meta, method="permutation importance (ROC-AUC drop), model-agnostic", importance=importance))
    health = [dict(id=i, name=n, file=f, purpose=p, status="loaded" if present[i] else "missing") for i, n, f, p in C.DATASETS]
    _dump("research.json", dict(meta=meta, dataset_health=health, sampling=sampling, labels="cell is positive if >=1 recorded event falls in it; "
          "background cells are NOT confirmed landslide-free", n_events=int(len(ev)), model_metrics=metrics, selected_model=best,
          reference_comparison=dict(status="not_loaded", note="Add ksdma_susceptibility.geojson and compare class agreement"),
          external_evaluation=dict(status="not_run", note="Kodagu 2018 not yet used")))
    dist = df.risk_label.value_counts().reindex(C.CLASSES, fill_value=0).to_dict()
    _dump("reports.json", dict(meta=meta, class_distribution=dist, top_locations=locs[:0] or sorted(locs, key=lambda x: -x["score"])[:5]))
    _dump("pipeline.json", dict(meta=meta, stages=[
        dict(stage="Ingest", status=mode, detail=f"{len(ev)} events, {len(df)} grid cells"),
        dict(stage="Features", status=mode, detail=", ".join(C.FEATURES)),
        dict(stage="Train + spatial CV", status="done", detail=f"best={best}"),
        dict(stage="Export", status="done", detail="static/api/*.json")]))
    _dump("meta.json", meta)
    return dict(meta=meta, metrics=metrics, importance=importance, sampling=sampling)


if __name__ == "__main__":
    out = run()
    print(json.dumps({k: out[k] for k in ("meta", "sampling")}, indent=2))
    for k, v in out["metrics"].items():
        print(k, {m: round(x, 3) for m, x in v.items() if isinstance(x, float)})
