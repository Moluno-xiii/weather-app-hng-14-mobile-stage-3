import { OWMEndpoints } from "../lib/constants";
import { groupForCode } from "../lib/weatherIcons";
import type {
  GeocodeSuggestion,
  OWMCurrentResponse,
  OWMForecastEntry,
  OWMForecastResponse,
  OWMGeocodeResult,
} from "../types/openWeather";
import type {
  CurrentWeather,
  DailyForecast,
  HourlySlot,
  WeatherIconCode,
} from "../types/weather";
import customTryCatch from "../utils/customTryCatch";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const capitalize = (input: string): string =>
  input.length === 0 ? input : input.charAt(0).toUpperCase() + input.slice(1);

const toLocal = (utcSeconds: number, tzOffsetSeconds: number): Date =>
  new Date((utcSeconds + tzOffsetSeconds) * 1000);

const formatHourLabel = (date: Date): string =>
  `${String(date.getUTCHours()).padStart(2, "0")}:00`;

const formatObservedAt = (dt: number, timezone: number): string => {
  const local = toLocal(dt, timezone);
  return `Today, ${formatHourLabel(local)}`;
};

const dateKey = (date: Date): string =>
  `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;

const mapCurrent = (raw: OWMCurrentResponse): CurrentWeather => {
  const descriptor = raw.weather[0];
  const iconCode = descriptor.icon as WeatherIconCode;
  return {
    city: raw.name,
    country: raw.sys.country,
    temp: raw.main.temp,
    feelsLike: raw.main.feels_like,
    humidity: raw.main.humidity,
    windSpeed: raw.wind.speed,
    pressure: raw.main.pressure,
    condition: capitalize(descriptor.description),
    iconCode,
    group: groupForCode(iconCode),
    tempMin: raw.main.temp_min,
    tempMax: raw.main.temp_max,
    observedAt: formatObservedAt(raw.dt, raw.timezone),
  };
};

const toHourlySlot = (entry: OWMForecastEntry, tz: number): HourlySlot => ({
  time: formatHourLabel(toLocal(entry.dt, tz)),
  temp: entry.main.temp,
  iconCode: entry.weather[0].icon as WeatherIconCode,
});

const mapHourly = (raw: OWMForecastResponse): HourlySlot[] =>
  raw.list.slice(0, 8).map((entry) => toHourlySlot(entry, raw.city.timezone));

const mapDaily = (raw: OWMForecastResponse): DailyForecast[] => {
  const tz = raw.city.timezone;
  const buckets = new Map<string, OWMForecastEntry[]>();

  for (const entry of raw.list) {
    const key = dateKey(toLocal(entry.dt, tz));
    const existing = buckets.get(key);
    if (existing) {
      existing.push(entry);
    } else {
      buckets.set(key, [entry]);
    }
  }

  const todayKey = dateKey(toLocal(Math.floor(Date.now() / 1000), tz));
  const days = Array.from(buckets.entries()).slice(0, 5);

  return days.map(([key, entries]) => {
    const reference = toLocal(entries[0].dt, tz);
    const dayName = DAY_NAMES[reference.getUTCDay()];
    const dayLabel = key === todayKey ? "Today" : dayName;
    const fullDate = `${dayName}, ${reference.getUTCDate()} ${MONTH_NAMES[reference.getUTCMonth()]}`;

    let tempMin = Number.POSITIVE_INFINITY;
    let tempMax = Number.NEGATIVE_INFINITY;
    for (const entry of entries) {
      if (entry.main.temp_min < tempMin) tempMin = entry.main.temp_min;
      if (entry.main.temp_max > tempMax) tempMax = entry.main.temp_max;
    }

    const midday =
      entries.find((entry) => {
        const hour = toLocal(entry.dt, tz).getUTCHours();
        return hour >= 12 && hour <= 15;
      }) ?? entries[Math.floor(entries.length / 2)];

    return {
      dayLabel,
      fullDate,
      tempMin,
      tempMax,
      condition: capitalize(midday.weather[0].description),
      iconCode: midday.weather[0].icon as WeatherIconCode,
      hourly: entries.map((entry) => toHourlySlot(entry, tz)),
    };
  });
};

const fetchCurrent = (lat: number, lon: number): Promise<CurrentWeather> =>
  customTryCatch<OWMCurrentResponse>(
    OWMEndpoints.currentByCoords(lat, lon),
  ).then(mapCurrent);

const fetchForecast = (
  lat: number,
  lon: number,
): Promise<OWMForecastResponse> =>
  customTryCatch<OWMForecastResponse>(OWMEndpoints.forecastByCoords(lat, lon));

const mapGeocode = (raw: OWMGeocodeResult[]): GeocodeSuggestion[] =>
  raw.map((item) => ({
    name: item.name,
    lat: item.lat,
    lon: item.lon,
    country: item.country,
    state: item.state ?? "",
  }));

const fetchGeocode = (
  query: string,
  limit: number = 5,
): Promise<GeocodeSuggestion[]> =>
  customTryCatch<OWMGeocodeResult[]>(OWMEndpoints.geocode(query, limit)).then(
    mapGeocode,
  );

export {
  fetchCurrent,
  fetchForecast,
  fetchGeocode,
  mapCurrent,
  mapDaily,
  mapGeocode,
  mapHourly,
};
