import io
import json
import unittest
from unittest.mock import patch

from weather import WeatherError, get_weather


class WeatherServiceTests(unittest.TestCase):
    def test_invalid_coordinates_are_rejected(self):
        with self.assertRaises(WeatherError):
            get_weather(91, 76)

    @patch("weather.urlopen")
    def test_provider_response_is_normalised_and_cached(self, urlopen):
        payload = {
            "timezone": "Asia/Kolkata",
            "current": {
                "time": "2026-10-27T18:00",
                "temperature_2m": 24,
                "relative_humidity_2m": 80,
                "precipitation": 1.2,
                "weather_code": 61,
            },
            "hourly": {"time": ["2026-10-27T18:00"], "precipitation": [1.2]},
            "daily": {"time": ["2026-10-27"], "precipitation_sum": [4.0]},
        }
        response = unittest.mock.MagicMock()
        response.__enter__.return_value = io.StringIO(json.dumps(payload))
        urlopen.return_value = response

        first = get_weather(10.0, 76.0, cache_ttl_seconds=60)
        second = get_weather(10.0, 76.0, cache_ttl_seconds=60)

        self.assertEqual(first["current"]["precipitation_mm"], 1.2)
        self.assertFalse(first["data_quality"]["observations_available"])
        self.assertEqual(second["cache_status"], "hit")
        urlopen.assert_called_once()


if __name__ == "__main__":
    unittest.main()
