import type { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";
import type { ConditionGroup, WeatherIconCode } from "../types/weather";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

const iconForCode = (code: WeatherIconCode): IoniconName => {
  switch (code) {
    case "01d":
      return "sunny";
    case "01n":
      return "moon";
    case "02d":
      return "partly-sunny";
    case "02n":
      return "cloudy-night";
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      return "cloudy";
    case "09d":
    case "09n":
      return "rainy";
    case "10d":
    case "10n":
      return "rainy-outline";
    case "11d":
    case "11n":
      return "thunderstorm";
    case "13d":
    case "13n":
      return "snow";
    case "50d":
    case "50n":
      return "reorder-three-outline";
    default:
      return "ellipse-outline";
  }
};

const groupForCode = (code: WeatherIconCode): ConditionGroup => {
  const isNight = code.endsWith("n");
  const head = code.slice(0, 2);
  switch (head) {
    case "01":
      return isNight ? "clear-night" : "clear-day";
    case "02":
    case "03":
    case "04":
      return "cloudy";
    case "09":
    case "10":
      return "rain";
    case "11":
      return "storm";
    case "13":
      return "snow";
    case "50":
      return "mist";
    default:
      return "cloudy";
  }
};

const gradientForGroup = (group: ConditionGroup): [string, string, string] => {
  switch (group) {
    case "clear-day":
      return ["#FFD08A", "#F08A4B", "#A8451B"];
    case "clear-night":
      return ["#1B2454", "#0E1538", "#04060F"];
    case "cloudy":
      return ["#A4B0BC", "#6F7C8C", "#3E4856"];
    case "rain":
      return ["#7B95AE", "#475D7A", "#1F2D44"];
    case "snow":
      return ["#E6EEF6", "#B8CADD", "#7E94AC"];
    case "storm":
      return ["#5B5773", "#322F46", "#0E0C1B"];
    case "mist":
      return ["#D6D8DC", "#9CA0A8", "#5E626B"];
  }
};

export { gradientForGroup, groupForCode, iconForCode };
