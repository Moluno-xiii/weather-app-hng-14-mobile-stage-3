import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import type { SearchStackNavigatorProp } from "../navigators/SearchStackNavigator";
import { mockRecent, mockSearchSuggestions } from "../src/lib/mockWeather";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const navigation = useNavigation<SearchStackNavigatorProp>();

  const suggestions = useMemo(() => {
    if (query.trim().length < 2) return [];
    return mockSearchSuggestions.filter((s) =>
      s.name.toLowerCase().startsWith(query.toLowerCase().slice(0, 3)),
    );
  }, [query]);

  const showRecent = query.trim().length === 0;
  const showNoResults = query.trim().length >= 2 && suggestions.length === 0;

  const goToCity = (params: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  }) => navigation.navigate("CityResult", params);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 32,
          gap: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="pt-2">
          <Text
            style={{ letterSpacing: 2 }}
            className="text-ink-muted text-[10px] uppercase font-semibold"
          >
            Find a city
          </Text>
          <Text
            style={{ letterSpacing: -0.6 }}
            className="text-ink text-[26px] font-semibold mt-0.5"
          >
            Search
          </Text>
        </View>

        <View
          style={{ borderCurve: "continuous" }}
          className="flex-row items-center bg-white/70 border border-canvas-border rounded-2xl px-4 py-3 gap-3"
        >
          <Ionicons name="search-outline" size={18} color="#6B6F78" />
          <TextInput
            placeholder="Try London, Lagos, Tokyo…"
            placeholderTextColor="#6B6F78"
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
            autoCapitalize="words"
            returnKeyType="search"
            className="flex-1 text-base text-ink"
            style={{ paddingVertical: 0 }}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")} hitSlop={8}>
              <Ionicons name="close-circle" size={18} color="#6B6F78" />
            </Pressable>
          )}
        </View>

        {suggestions.length > 0 && (
          <View>
            <Text
              style={{ letterSpacing: 1.5 }}
              className="text-ink-muted text-[10px] uppercase font-semibold mb-3 px-1"
            >
              Suggestions
            </Text>
            <View className="gap-2">
              {suggestions.map((s, i) => (
                <Animated.View
                  key={`${s.name}-${s.country}-${i}`}
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
                      <Text className="text-ink text-base font-semibold">
                        {s.name}
                      </Text>
                      <Text className="text-ink-muted text-xs mt-0.5">
                        {[s.state, s.country].filter(Boolean).join(" · ")}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color="#6B6F78"
                    />
                  </Pressable>
                </Animated.View>
              ))}
            </View>
          </View>
        )}

        {showNoResults && (
          <View className="items-center py-10">
            <Ionicons name="search-outline" size={28} color="#6B6F78" />
            <Text className="text-ink text-base font-semibold mt-3">
              No matches for "{query}"
            </Text>
            <Text className="text-ink-muted text-sm mt-1 text-center max-w-xs">
              Check the spelling or try a nearby city name.
            </Text>
          </View>
        )}

        {showRecent && (
          <View>
            <Text
              style={{ letterSpacing: 1.5 }}
              className="text-ink-muted text-[10px] uppercase font-semibold mb-3 px-1"
            >
              Recent
            </Text>
            <View className="gap-2">
              {mockRecent.map((c) => (
                <Pressable
                  key={`${c.name}-${c.country}`}
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
                    <Text className="text-ink text-base font-semibold">
                      {c.name}
                    </Text>
                    <Text className="text-ink-muted text-xs">{c.country}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#6B6F78" />
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {showRecent && (
          <Text className="text-ink-muted text-[11px] text-center mt-2">
            Type at least 2 characters to search.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
