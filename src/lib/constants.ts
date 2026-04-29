const OWM_BASE_URL = "https://api.openweathermap.org";
const OWM_API_KEY = process.env.EXPO_PUBLIC_OWM_API_KEY ?? "";
const OWM_UNITS = "metric";
const TANSTACK_STALE_TIME = 10 * 60_000;

const buildQuery = (params: Record<string, string | number>): string =>
  Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

const OWMEndpoints = {
  currentByCoords: (lat: number, lon: number): string =>
    `${OWM_BASE_URL}/data/2.5/weather?${buildQuery({
      lat,
      lon,
      units: OWM_UNITS,
      appid: OWM_API_KEY,
    })}`,
  forecastByCoords: (lat: number, lon: number): string =>
    `${OWM_BASE_URL}/data/2.5/forecast?${buildQuery({
      lat,
      lon,
      units: OWM_UNITS,
      appid: OWM_API_KEY,
    })}`,
  geocode: (query: string, limit: number = 5): string =>
    `${OWM_BASE_URL}/geo/1.0/direct?${buildQuery({
      q: query,
      limit,
      appid: OWM_API_KEY,
    })}`,
} as const;

const HOME_DEFAULT_COORDS = { lat: 6.5244, lon: 3.3792 } as const;

export { HOME_DEFAULT_COORDS, OWMEndpoints, TANSTACK_STALE_TIME };
