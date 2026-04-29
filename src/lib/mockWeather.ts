import type {
  CurrentWeather,
  DailyForecast,
  HourlySlot,
} from "../types/weather";

const buildHourly = (baseTemp: number, startHour: number): HourlySlot[] =>
  Array.from({ length: 8 }, (_, i) => {
    const hour = (startHour + i * 3) % 24;
    const drift = Math.round(Math.sin(i / 2) * 3);
    return {
      time: `${hour.toString().padStart(2, "0")}:00`,
      temp: baseTemp + drift,
      iconCode: i < 4 ? "02d" : "03n",
    };
  });

export const mockCurrent: CurrentWeather = {
  city: "Lagos",
  country: "NG",
  temp: 31,
  feelsLike: 36,
  humidity: 78,
  windSpeed: 5.4,
  pressure: 1012,
  condition: "Partly cloudy",
  iconCode: "02d",
  group: "clear-day",
  tempMin: 27,
  tempMax: 33,
  observedAt: "Today, 14:00",
};

export const mockHourly: HourlySlot[] = buildHourly(31, 14);

export const mockDaily: DailyForecast[] = [
  {
    dayLabel: "Today",
    fullDate: "Mon, 28 Apr",
    tempMin: 27,
    tempMax: 33,
    condition: "Partly cloudy",
    iconCode: "02d",
    hourly: buildHourly(31, 6),
  },
  {
    dayLabel: "Tue",
    fullDate: "Tue, 29 Apr",
    tempMin: 26,
    tempMax: 32,
    condition: "Light rain",
    iconCode: "10d",
    hourly: buildHourly(28, 6),
  },
  {
    dayLabel: "Wed",
    fullDate: "Wed, 30 Apr",
    tempMin: 25,
    tempMax: 30,
    condition: "Thunderstorms",
    iconCode: "11d",
    hourly: buildHourly(27, 6),
  },
  {
    dayLabel: "Thu",
    fullDate: "Thu, 1 May",
    tempMin: 26,
    tempMax: 31,
    condition: "Cloudy",
    iconCode: "04d",
    hourly: buildHourly(29, 6),
  },
  {
    dayLabel: "Fri",
    fullDate: "Fri, 2 May",
    tempMin: 27,
    tempMax: 34,
    condition: "Sunny",
    iconCode: "01d",
    hourly: buildHourly(32, 6),
  },
];

export const mockSearchSuggestions = [
  { name: "London", state: "England", country: "GB", lat: 51.5072, lon: -0.1276 },
  { name: "Long Beach", state: "California", country: "US", lat: 33.7701, lon: -118.1937 },
  { name: "Lomé", state: "", country: "TG", lat: 6.1319, lon: 1.2228 },
  { name: "Lourdes", state: "Occitanie", country: "FR", lat: 43.0917, lon: -0.0456 },
];

export const mockRecent = [
  { name: "Accra", country: "GH", lat: 5.6037, lon: -0.187 },
  { name: "Cape Town", country: "ZA", lat: -33.9249, lon: 18.4241 },
  { name: "Tokyo", country: "JP", lat: 35.6762, lon: 139.6503 },
];

export const mockCityResult = (
  name: string,
): CurrentWeather => ({
  ...mockCurrent,
  city: name,
  country: "—",
  temp: 24,
  feelsLike: 26,
  humidity: 64,
  windSpeed: 3.2,
  pressure: 1018,
  condition: "Clear",
  iconCode: "01d",
  group: "clear-day",
  tempMin: 19,
  tempMax: 26,
});
