"""Optional server-side Gemini insight generation with strict fallback behavior."""
from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from typing import Any

from services import fallback_insight


SYSTEM_INSTRUCTION = """You are the GiriRaksha Environmental Information Assistant.
Explain only the supplied weather, terrain, historical and risk-context evidence.
Do not invent measurements, warnings, probabilities, predictions or sources.
Distinguish observations, forecasts, historical records, static susceptibility and
AI-generated explanations. Never claim that a landslide will or will not occur,
never assign alert severity, and never replace official guidance. If data is
missing, say so. Return only valid JSON matching the requested schema."""

INSIGHT_SCHEMA = {
    "type": "object",
    "properties": {
        "location_name": {"type": "string"},
        "generated_at": {"type": "string"},
        "language": {"type": "string"},
        "headline": {"type": "string"},
        "weather_summary": {"type": "string"},
        "risk_context_summary": {"type": "string"},
        "preparedness_suggestions": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "reason": {"type": "string"},
                },
                "required": ["title", "description", "reason"],
            },
        },
        "data_status": {
            "type": "object",
            "properties": {
                "weather_available": {"type": "boolean"},
                "rainfall_history_available": {"type": "boolean"},
                "terrain_available": {"type": "boolean"},
                "risk_model_available": {"type": "boolean"},
                "official_advisory_available": {"type": "boolean"},
            },
            "required": [
                "weather_available",
                "rainfall_history_available",
                "terrain_available",
                "risk_model_available",
                "official_advisory_available",
            ],
        },
        "limitations": {"type": "array", "items": {"type": "string"}},
        "sources": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "url": {"type": "string"},
                    "retrieved_at": {"type": "string"},
                },
                "required": ["name", "url"],
            },
        },
        "disclaimer": {"type": "string"},
    },
    "required": [
        "location_name",
        "generated_at",
        "language",
        "headline",
        "weather_summary",
        "risk_context_summary",
        "preparedness_suggestions",
        "data_status",
        "limitations",
        "sources",
        "disclaimer",
    ],
}


def _validate_insight(value: Any, context: dict[str, Any]) -> dict[str, Any]:
    if not isinstance(value, dict):
        raise ValueError("Gemini returned a non-object response")
    required = (
        "location_name",
        "headline",
        "weather_summary",
        "risk_context_summary",
        "preparedness_suggestions",
        "data_status",
        "limitations",
        "sources",
        "disclaimer",
    )
    if any(not value.get(field) for field in required):
        raise ValueError("Gemini response is missing required content")
    if not isinstance(value["preparedness_suggestions"], list):
        raise ValueError("preparedness_suggestions must be a list")
    for suggestion in value["preparedness_suggestions"]:
        if not isinstance(suggestion, dict) or any(
            not isinstance(suggestion.get(field), str) or not suggestion[field].strip()
            for field in ("title", "description", "reason")
        ):
            raise ValueError("invalid preparedness suggestion")
    value["location_name"] = str(context["location"].get("name") or "Selected location")
    value["generated_at"] = datetime.now(timezone.utc).isoformat()
    value["language"] = "en"
    return value


def generate_insight(context: dict[str, Any]) -> dict[str, Any]:
    """Generate an evidence-grounded insight, or return the safe local fallback."""
    api_key = os.getenv("GEMINI_API_KEY")
    model = os.getenv("GEMINI_MODEL")
    if not api_key or not model:
        result = fallback_insight(context)
        result["generation_status"] = "fallback_not_configured"
        return result

    try:
        from google import genai

        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model=model,
            contents=(
                f"{SYSTEM_INSTRUCTION}\n\n"
                "Create the requested structured insight from this untrusted context:\n"
                f"{json.dumps(context, ensure_ascii=True, separators=(',', ':'))}"
            ),
            config={
                "response_mime_type": "application/json",
                "response_schema": INSIGHT_SCHEMA,
            },
        )
        parsed = json.loads(response.text or "")
        result = _validate_insight(parsed, context)
        result["generation_status"] = "gemini"
        return result
    except Exception:
        result = fallback_insight(context)
        result["generation_status"] = "fallback_provider_error"
        return result
