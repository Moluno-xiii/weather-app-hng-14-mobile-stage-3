import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { SearchStackNavigatorProp } from "../navigators/SearchStackNavigator";
import NoResults from "../src/components/searchScreen/NoResults";
import RecentSearches from "../src/components/searchScreen/RecentSearches";
import SuggestionsList from "../src/components/searchScreen/SuggestionsList";
import useDebounce from "../src/hooks/useDebounce";
import useGeocode from "../src/hooks/useGeocode";
import useRecentSearches from "../src/hooks/useRecentSearches";
import { MIN_SEARCH_QUERY_LENGTH } from "../src/lib/constants";

const SearchScreen = () => {
  const {
    items: recentSearches,
    add: addRecent,
    clear: clearRecent,
  } = useRecentSearches();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const { suggestions, isLoading, isError, enabled } =
    useGeocode(debouncedQuery);
  const goToCity = (params: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  }) => {
    addRecent(params);
    navigation.navigate("CityResult", params);
  };
  const navigation = useNavigation<SearchStackNavigatorProp>();

  const trimmed = query.trim();
  const showHint =
    trimmed.length > 0 && trimmed.length < MIN_SEARCH_QUERY_LENGTH;
  const showNoResults =
    enabled && !isLoading && !isError && suggestions.length === 0;

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
          {isLoading ? (
            <ActivityIndicator size="small" color="#6B6F78" />
          ) : query.length > 0 ? (
            <Pressable onPress={() => setQuery("")} hitSlop={8}>
              <Ionicons name="close-circle" size={18} color="#6B6F78" />
            </Pressable>
          ) : null}
        </View>

        {showHint && (
          <Text className="text-ink-muted text-[12px] px-1">
            Type at least {MIN_SEARCH_QUERY_LENGTH} characters to search.
          </Text>
        )}

        {isError && (
          <View className="items-center py-8">
            <Ionicons name="alert-circle-outline" size={26} color="#A53C12" />
            <Text className="text-ink text-base font-semibold mt-3">
              Couldn't reach OpenWeatherMap
            </Text>
            <Text className="text-ink-muted text-sm mt-1 text-center max-w-xs">
              Check your connection and try again.
            </Text>
          </View>
        )}

        <SuggestionsList
          query={query}
          suggestions={suggestions}
          goToCity={goToCity}
        />
        {showNoResults && <NoResults trimmed={trimmed} />}

        <RecentSearches
          query={query}
          clearRecent={clearRecent}
          recentSearches={recentSearches}
          goToCity={goToCity}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
