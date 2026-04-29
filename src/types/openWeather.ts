interface OWMWeatherDescriptor {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface OWMMain {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  temp_min: number;
  temp_max: number;
}

interface OWMCurrentResponse {
  name: string;
  dt: number;
  timezone: number;
  sys: { country: string };
  main: OWMMain;
  wind: { speed: number };
  weather: OWMWeatherDescriptor[];
}

interface OWMForecastEntry {
  dt: number;
  main: OWMMain;
  wind: { speed: number };
  weather: OWMWeatherDescriptor[];
}

interface OWMForecastResponse {
  list: OWMForecastEntry[];
  city: { name: string; country: string; timezone: number };
}

interface OWMGeocodeResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  local_names?: Record<string, string>;
}

interface GeocodeSuggestion {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export type {
  GeocodeSuggestion,
  OWMCurrentResponse,
  OWMForecastEntry,
  OWMForecastResponse,
  OWMGeocodeResult,
  OWMMain,
  OWMWeatherDescriptor,
};
