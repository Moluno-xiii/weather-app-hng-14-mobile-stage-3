import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { CurrentWeather } from "../types/weather";
import {
  formatHumidity,
  formatPressure,
  formatTemp,
  formatWind,
} from "../lib/formatters";

interface Props {
  data: CurrentWeather;
}

interface Cell {
  label: string;
  value: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}

const CurrentDetailsGrid = ({ data }: Props) => {
  const cells: Cell[] = [
    {
      label: "Humidity",
      value: formatHumidity(data.humidity),
      icon: "water-outline",
    },
    { label: "Wind", value: formatWind(data.windSpeed), icon: "leaf-outline" },
    {
      label: "Feels like",
      value: formatTemp(data.feelsLike),
      icon: "thermometer-outline",
    },
    {
      label: "Pressure",
      value: formatPressure(data.pressure),
      icon: "speedometer-outline",
    },
  ];

  return (
    <View className="flex-row flex-wrap gap-3">
      {cells.map((c) => (
        <View
          key={c.label}
          style={{ borderCurve: "continuous" }}
          className="flex-1 min-w-[46%] bg-white/70 border border-canvas-border rounded-2xl px-4 py-4"
        >
          <View className="flex-row items-center gap-2">
            <Ionicons name={c.icon} size={14} color="#6B6F78" />
            <Text
              style={{ letterSpacing: 1.5 }}
              className="text-ink-muted text-[10px] uppercase font-semibold"
            >
              {c.label}
            </Text>
          </View>
          <Text
            selectable
            style={{ fontVariant: ["tabular-nums"] }}
            className="text-ink text-xl mt-2 font-semibold"
          >
            {c.value}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default CurrentDetailsGrid;
