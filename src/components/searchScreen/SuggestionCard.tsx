import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import type { GeocodeSuggestion } from "../../types/openWeather";
import { Ionicons } from "@expo/vector-icons";

type PropTypes = {
  s: GeocodeSuggestion;
  i: number;
  goToCity: (params: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  }) => void;
};

const SuggestionCard = ({ s, i, goToCity }: PropTypes) => {
  return (
    <Animated.View
      key={`${s.name}-${s.country}-${s.lat}-${s.lon}`}
      entering={FadeInDown.delay(i * 60)
        .springify()
        .damping(16)}
    >
      <Pressable
        onPress={() =>
          goToCity({
            name: s.name,
            country: s.country,
            lat: s.lat,
            lon: s.lon,
          })
        }
        style={{ borderCurve: "continuous" }}
        className="flex-row items-center justify-between bg-white/70 border border-canvas-border rounded-2xl px-4 py-3"
        android_ripple={{ color: "rgba(14,15,18,0.05)" }}
      >
        <View className="flex-1 pr-3">
          <Text className="text-ink text-base font-semibold">{s.name}</Text>
          <Text className="text-ink-muted text-xs mt-0.5">
            {[s.state, s.country].filter(Boolean).join(" · ")}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#6B6F78" />
      </Pressable>
    </Animated.View>
  );
};

export default SuggestionCard;
