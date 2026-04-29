import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import type { CurrentWeather } from "../types/weather";
import { gradientForGroup, iconForCode } from "../lib/weatherIcons";
import { formatTemp } from "../lib/formatters";

interface Props {
  data: CurrentWeather;
}

const WeatherHeader = ({ data }: Props) => {
  const [c1, c2, c3] = gradientForGroup(data.group);
  return (
    <LinearGradient
      colors={[c1, c2, c3]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderCurve: "continuous",
        borderRadius: 28,
        overflow: "hidden",
      }}
    >
      <View className="px-6 pt-8 pb-9">
        <View className="flex-row justify-between items-start">
          <View className="flex-1 pr-4">
            <Text
              selectable
              style={{ letterSpacing: 3 }}
              className="text-white/80 text-[11px] uppercase font-semibold"
              numberOfLines={1}
            >
              {data.city}, {data.country}
            </Text>
            <Text className="text-white/70 text-[11px] mt-1">
              {data.observedAt}
            </Text>
          </View>
          <View className="bg-white/15 rounded-full p-3">
            <Ionicons
              name={iconForCode(data.iconCode)}
              size={28}
              color="#fff"
            />
          </View>
        </View>

        <View className="mt-12">
          <Text
            selectable
            style={{
              color: "#fff",
              fontSize: 116,
              lineHeight: 116,
              fontWeight: "200",
              letterSpacing: -5,
              fontVariant: ["tabular-nums"],
            }}
          >
            {formatTemp(data.temp)}
          </Text>
          <Text className="text-white text-base mt-2 font-medium">
            {data.condition}
          </Text>
          <View className="flex-row gap-4 mt-2">
            <Text
              className="text-white/80 text-xs"
              style={{ fontVariant: ["tabular-nums"] }}
            >
              H {formatTemp(data.tempMax)}
            </Text>
            <Text
              className="text-white/80 text-xs"
              style={{ fontVariant: ["tabular-nums"] }}
            >
              L {formatTemp(data.tempMin)}
            </Text>
            <Text
              className="text-white/80 text-xs"
              style={{ fontVariant: ["tabular-nums"] }}
            >
              Feels {formatTemp(data.feelsLike)}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default WeatherHeader;
