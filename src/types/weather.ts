type WeatherIconCode =
  | "01d"
  | "01n"
  | "02d"
  | "02n"
  | "03d"
  | "03n"
  | "04d"
  | "04n"
  | "09d"
  | "09n"
  | "10d"
  | "10n"
  | "11d"
  | "11n"
  | "13d"
  | "13n"
  | "50d"
  | "50n";

type ConditionGroup =
  | "clear-day"
  | "clear-night"
  | "cloudy"
  | "rain"
  | "snow"
  | "storm"
  | "mist";

type CurrentWeather = {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  condition: string;
  iconCode: WeatherIconCode;
  group: ConditionGroup;
  tempMin: number;
  tempMax: number;
  observedAt: string;
};

type HourlySlot = {
  time: string;
  temp: number;
  iconCode: WeatherIconCode;
};

type DailyForecast = {
  dayLabel: string;
  fullDate: string;
  tempMin: number;
  tempMax: number;
  condition: string;
  iconCode: WeatherIconCode;
  hourly: HourlySlot[];
};

export type {
  WeatherIconCode,
  ConditionGroup,
  CurrentWeather,
  HourlySlot,
  DailyForecast,
};
