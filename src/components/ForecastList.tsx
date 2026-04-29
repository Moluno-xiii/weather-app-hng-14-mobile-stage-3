import { useState } from "react";
import { Text, View } from "react-native";
import type { DailyForecast } from "../types/weather";
import { ForecastDayItem } from "./ForecastDayItem";

interface Props {
  data: DailyForecast[];
}

export function ForecastList({ data }: Props) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <View>
      <Text
        style={{ letterSpacing: 1.5 }}
        className="text-ink-muted text-[10px] uppercase font-semibold mb-3 px-1"
      >
        5-day forecast
      </Text>
      <View className="gap-3">
        {data.map((day, i) => (
          <ForecastDayItem
            key={day.fullDate}
            data={day}
            index={i}
            expanded={expandedIndex === i}
            onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
          />
        ))}
      </View>
    </View>
  );
}
