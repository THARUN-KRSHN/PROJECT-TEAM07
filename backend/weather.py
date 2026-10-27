"""Open-Meteo weather retrieval with validation and a short-lived in-memory cache."""
from __future__ import annotations

import json
import os
import threading
import time
from datetime import datetime, timezone
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"
SOURCE_URL = "https://open-meteo.com/en/docs"
DEFAULT_CACHE_TTL_SECONDS = int(os.getenv("WEATHER_CACHE_TTL_SECONDS", "600"))
_cache: dict[tuple[float, float], tuple[float, dict[str, Any]]] = {}
_cache_lock = threading.Lock()


class WeatherError(RuntimeError):
    """Raised when a weather request cannot produce a valid response."""


def _validate_coordinates(latitude: float, longitude: float) -> tuple[float, float]:
    try:
        lat, lon = float(latitude), float(longitude)
    except (TypeError, ValueError) as exc:
        raise WeatherError("latitude and longitude must be numeric") from exc
    if not -90 <= lat <= 90 or not -180 <= lon <= 180:
        raise WeatherError("coordinates are outside the valid geographic range")
    return round(lat, 4), round(lon, 4)


def _request_weather(latitude: float, longitude: float, timeout: float) -> dict[str, Any]:
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "timezone": "auto",
        "forecast_days": 7,
        "current": "temperature_2m,relative_humidity_2m,precipitation,weather_code",
        "hourly": "precipitation,precipitation_probability,temperature_2m,relative_humidity_2m",
        "daily": "precipitation_sum,precipitation_probability_max,temperature_2m_max,temperature_2m_min",
    }
    request = Request(
        f"{OPEN_METEO_URL}?{urlencode(params)}",
        headers={"Accept": "application/json", "User-Agent": "GiriRaksha/1.0"},
    )
    try:
        with urlopen(request, timeout=timeout) as response:
            payload = json.load(response)
    except (HTTPError, URLError, TimeoutError, json.JSONDecodeError, OSError) as exc:
        raise WeatherError("weather provider request failed") from exc
    if not isinstance(payload, dict) or not isinstance(payload.get("current"), dict):
        raise WeatherError("weather provider returned an invalid response")
    return payload


def get_weather(
    latitude: float,
    longitude: float,
    *,
    timeout: float = 8.0,
    cache_ttl_seconds: int = DEFAULT_CACHE_TTL_SECONDS,
) -> dict[str, Any]:
    """Return normalised current conditions and forecast metadata.

    Open-Meteo's hourly precipitation is forecast precipitation, not a local
    gauge observation. The source and forecast labels are retained in output.
    """
    lat, lon = _validate_coordinates(latitude, longitude)
    key = (lat, lon)
    now = time.time()
    with _cache_lock:
        cached = _cache.get(key)
        if cached and now - cached[0] < cache_ttl_seconds:
            result = dict(cached[1])
            result["cache_status"] = "hit"
            return result

    raw = _request_weather(lat, lon, timeout)
    current = raw["current"]
    result = {
        "source": {"name": "Open-Meteo", "url": SOURCE_URL},
        "location": {"latitude": lat, "longitude": lon, "timezone": raw.get("timezone")},
        "retrieved_at": datetime.now(timezone.utc).isoformat(),
        "forecast_issued_at": raw.get("current", {}).get("time"),
        "cache_status": "miss",
        "current": {
            "time": current.get("time"),
            "temperature_2m_c": current.get("temperature_2m"),
            "relative_humidity_percent": current.get("relative_humidity_2m"),
            "precipitation_mm": current.get("precipitation"),
            "weather_code": current.get("weather_code"),
            "label": "provider current conditions",
        },
        "hourly": raw.get("hourly", {}),
        "daily": raw.get("daily", {}),
        "data_quality": {
            "current_available": True,
            "forecast_available": bool(raw.get("hourly") and raw.get("daily")),
            "observations_available": False,
            "note": "Open-Meteo forecast data is not a local rain-gauge observation.",
        },
    }
    with _cache_lock:
        _cache[key] = (now, result)
    return result
