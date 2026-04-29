import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import type { DailyForecast } from "../types/weather";
import { iconForCode } from "../lib/weatherIcons";
import { formatTemp } from "../lib/formatters";
import { HourlyStrip } from "./HourlyStrip";

interface Props {
  data: DailyForecast;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}

export function ForecastDayItem({ data, index, expanded, onToggle }: Props) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withTiming(expanded ? 180 : 0, { duration: 220 });
  }, [expanded, rotation]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 80).springify().damping(14)}
      layout={LinearTransition.springify().damping(18)}
      style={{ borderCurve: "continuous" }}
      className="bg-white/65 border border-canvas-border rounded-2xl overflow-hidden"
    >
      <Pressable
        onPress={onToggle}
        className="flex-row items-center px-4 py-4 gap-4"
        android_ripple={{ color: "rgba(14,15,18,0.05)" }}
      >
        <View className="w-12">
          <Text className="text-ink font-semibold">{data.dayLabel}</Text>
          <Text className="text-ink-muted text-[10px] mt-0.5">
            {data.fullDate.split(", ")[1] ?? ""}
          </Text>
        </View>

        <View className="flex-row items-center gap-2 flex-1">
          <Ionicons name={iconForCode(data.iconCode)} size={22} color="#2A2C33" />
          <Text className="text-ink-soft text-sm" numberOfLines={1}>
            {data.condition}
          </Text>
        </View>

        <View className="flex-row items-center gap-3">
          <Text
            selectable
            style={{ fontVariant: ["tabular-nums"] }}
            className="text-ink-muted text-sm"
          >
            {formatTemp(data.tempMin)}
          </Text>
          <View className="h-[3px] w-12 bg-canvas-border rounded-full overflow-hidden">
            <View
              className="h-full bg-ember rounded-full"
              style={{
                width: "60%",
                marginLeft: "20%",
              }}
            />
          </View>
          <Text
            selectable
            style={{ fontVariant: ["tabular-nums"] }}
            className="text-ink text-sm font-semibold"
          >
            {formatTemp(data.tempMax)}
          </Text>
        </View>

        <Animated.View style={chevronStyle}>
          <Ionicons name="chevron-down" size={18} color="#6B6F78" />
        </Animated.View>
      </Pressable>

      {expanded && (
        <Animated.View
          entering={FadeInDown.duration(180)}
          className="px-4 pb-4"
        >
          <HourlyStrip data={data.hourly} title="Hourly" />
        </Animated.View>
      )}
    </Animated.View>
  );
}
