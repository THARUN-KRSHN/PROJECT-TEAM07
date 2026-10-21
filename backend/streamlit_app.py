"""GiriRaksha model console (Streamlit). The Next.js frontend reads the same JSON this app serves at /app/static/api/*.json"""
import json
import pandas as pd, pydeck as pdk, streamlit as st
import config as C, pipeline

st.set_page_config(page_title="GiriRaksha Model", page_icon="⛰️", layout="wide")
COLORS = [[36, 115, 67], [140, 190, 80], [240, 200, 60], [235, 120, 40], [200, 30, 30]]

def load(name):
    p = C.API_DIR / name
    if not p.exists():
        with st.spinner("Building model outputs..."):
            pipeline.run()
    return json.loads(p.read_text())

meta = load("meta.json")
st.title("GiriRaksha — landslide risk model")
if meta["data_mode"] != "real":
    st.warning("DEMO MODE: synthetic data. Add real files to backend/data/raw and rebuild. Nothing here is a real risk value.")
st.caption(meta["disclaimer"])

with st.sidebar:
    st.write(f"**Model:** {meta['model']}  \n**Mode:** {meta['data_mode']}  \n**Built:** {meta['generated_at']}")
    if st.button("Rebuild model + exports"):
        pipeline.run(); st.cache_data.clear(); st.rerun()

t_map, t_loc, t_model, t_data, t_api = st.tabs(["Risk map", "Location dossier", "Model & insights", "Dataset health", "Frontend API"])

with t_map:
    g = load("risk_grid.json")
    df = pd.DataFrame(g["rows"], columns=g["columns"])
    sel = st.multiselect("Classes", C.CLASSES, default=C.CLASSES)
    df = df[df["class"].isin([C.CLASSES.index(s) for s in sel])]
    df["color"] = df["class"].map(lambda i: COLORS[i] + [170])
    st.pydeck_chart(pdk.Deck(layers=[pdk.Layer("ScatterplotLayer", df, get_position=["lon", "lat"], get_fill_color="color", get_radius=1100)],
                             initial_view_state=pdk.ViewState(latitude=10.5, longitude=76.4, zoom=6.2), map_style=None))
    st.bar_chart(df["class"].map(lambda i: C.CLASSES[i]).value_counts().reindex(C.CLASSES, fill_value=0))

with t_loc:
    locs = load("locations.json")["locations"]
    slug = st.selectbox("Location", [l["slug"] for l in locs], format_func=lambda s: C.SEED_LOCATIONS[s][0])
    d = load(f"location/{slug}.json")
    c1, c2, c3 = st.columns(3)
    c1.metric("Risk class (relative)", d["risk_label"]); c2.metric("Score", d["score"]); c3.metric("Events within 15 km", d["history"]["count"])
    a, b = st.columns(2)
    a.subheader("Terrain"); a.json(d["terrain"])
    b.subheader("Rainfall (p99 accumulations)"); b.json(d["rainfall"]); b.caption(d["rainfall_note"])
    st.subheader("Recent nearby events"); st.dataframe(pd.DataFrame(d["history"]["recent"]), use_container_width=True)
    st.caption(d["exposure_note"])

with t_model:
    r = load("research.json")
    st.subheader("Spatially cross-validated metrics")
    st.dataframe(pd.DataFrame(r["model_metrics"]).T, use_container_width=True)
    st.caption(f"Selected: {r['selected_model']} · {r['labels']}")
    st.subheader("Feature importance"); imp = pd.DataFrame(load("insights.json")["importance"]).set_index("feature")
    st.bar_chart(imp)

with t_data:
    st.dataframe(pd.DataFrame(r["dataset_health"]), use_container_width=True)
    st.write(f"Events used: **{r['n_events']}** · sampling: {r['sampling']}")
    st.info(f"Reference comparison: {r['reference_comparison']['status']} · External evaluation: {r['external_evaluation']['status']}")

with t_api:
    st.markdown("Endpoints served as static JSON (relative to your deployed app URL):")
    st.code("\n".join(f"/app/static/api/{n}" for n in ["meta.json", "locations.json", "location/<slug>.json", "risk_grid.json",
                                                    "insights.json", "research.json", "reports.json", "pipeline.json"]))
    st.caption("Frontend rule: read only these files (or api.py). No other data source.")
