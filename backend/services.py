"""Small, auditable service boundaries for location context and deterministic rules."""
from __future__ import annotations

from datetime import datetime, timezone
from typing import Any


def evaluate_risk_rules(location: dict[str, Any], weather: dict[str, Any] | None) -> dict[str, Any]:
    """Evaluate only approved rules; prototype rules remain disabled."""
    return {
        "status": "not_evaluated",
        "production_notifications_enabled": False,
        "rules": [],
        "reason": "No scientifically validated, approved operational threshold is configured.",
        "evaluated_at": datetime.now(timezone.utc).isoformat(),
        "location": location.get("slug"),
        "weather_available": weather is not None,
    }


def build_context(location: dict[str, Any], weather: dict[str, Any] | None) -> dict[str, Any]:
    meta = location.get("meta", {})
    synthetic = meta.get("data_mode") == "demo_synthetic"
    return {
        "location": {
            "slug": location.get("slug"),
            "name": location.get("name"),
            "district": location.get("district"),
            "latitude": location.get("lat"),
            "longitude": location.get("lon"),
        },
        "weather": weather,
        "risk_assessment": {
            "status": "unavailable" if synthetic else "static_export_only",
            "category": location.get("risk_label") if not synthetic else None,
            "note": "The repository export is synthetic demo data and is not a validated dynamic prediction.",
        },
        "rainfall_history": {
            "available": bool(location.get("rainfall")) and not synthetic,
            "values": location.get("rainfall") if not synthetic else None,
            "source_status": "synthetic_demo_only" if synthetic else "exported_feature_table",
        },
        "terrain": location.get("terrain"),
        "official_advisories": {
            "available": False,
            "status": "not_configured",
            "note": "No verified machine-readable official advisory feed is configured.",
        },
        "rule_evaluation": evaluate_risk_rules(location, weather),
        "limitations": [
            "No validated dynamic landslide model output is available.",
            "Official advisory retrieval is not configured.",
        ] + (["All model and rainfall values are synthetic demo data."] if synthetic else []),
    }


def fallback_insight(context: dict[str, Any]) -> dict[str, Any]:
    location = context["location"]
    weather_available = context["weather"] is not None
    return {
        "location_name": location.get("name") or "Selected location",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "language": "en",
        "headline": "Verified data summary is limited",
        "weather_summary": "Current provider weather is available." if weather_available else "Current weather is unavailable.",
        "risk_context_summary": "No validated time-specific landslide prediction or operational alert is available.",
        "preparedness_suggestions": [
            {
                "title": "Follow official guidance",
                "description": "Use local authority instructions for evacuation or travel decisions.",
                "reason": "This service has no verified official advisory feed.",
            }
        ],
        "data_status": {
            "weather_available": weather_available,
            "rainfall_history_available": context["rainfall_history"]["available"],
            "terrain_available": bool(context.get("terrain")),
            "risk_model_available": False,
            "official_advisory_available": False,
        },
        "limitations": context["limitations"],
        "sources": ([context["weather"]["source"]] if weather_available else []),
        "disclaimer": "AI or static summaries do not predict landslides and do not replace official warnings.",
        "generation_status": "fallback",
    }
