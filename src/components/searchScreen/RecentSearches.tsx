import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { RecentCity } from "../../lib/recentSearches";

type PropTypes = {
  recentSearches: RecentCity[];
  query: string;
  goToCity: (params: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  }) => void;
  clearRecent: () => void;
};
const RecentSearches = ({
  query,
  recentSearches,
  goToCity,
  clearRecent,
}: PropTypes) => {
  if (query.length) return null;
  if (recentSearches.length < 1)
    return <Text className="text-center">No recent searches</Text>;

  return (
    <View>
      <View className="flex-row items-center justify-between mb-3 px-1">
        <Text
          style={{ letterSpacing: 1.5 }}
          className="text-ink-muted text-[10px] uppercase font-semibold"
        >
          Recent
        </Text>
        <Pressable onPress={() => void clearRecent()} hitSlop={8}>
          <Text className="text-ink-muted text-[11px] font-semibold">
            Clear
          </Text>
        </Pressable>
      </View>
      <View className="gap-2">
        {recentSearches.map((c) => (
          <Pressable
            key={`${c.lat}-${c.lon}`}
            onPress={() =>
              goToCity({
                name: c.name,
                country: c.country,
                lat: c.lat,
                lon: c.lon,
              })
            }
            style={{ borderCurve: "continuous" }}
            className="flex-row items-center justify-between bg-white/55 border border-canvas-border rounded-2xl px-4 py-3"
            android_ripple={{ color: "rgba(14,15,18,0.05)" }}
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="time-outline" size={16} color="#6B6F78" />
              <Text className="text-ink text-base font-semibold">{c.name}</Text>
              <Text className="text-ink-muted text-xs">{c.country}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#6B6F78" />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default RecentSearches;
