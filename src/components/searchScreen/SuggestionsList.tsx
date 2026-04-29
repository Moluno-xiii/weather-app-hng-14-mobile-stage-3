import { Text, View } from "react-native";
import type { GeocodeSuggestion } from "../../types/openWeather";
import SuggestionCard from "./SuggestionCard";

type PropTypes = {
  query: string;
  suggestions: GeocodeSuggestion[];
  goToCity: (params: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  }) => void;
};

const SuggestionsList = ({ query, suggestions, goToCity }: PropTypes) => {
  if (query.length < 3) return null;
  return (
    <View>
      <Text
        style={{ letterSpacing: 1.5 }}
        className="text-ink-muted text-[10px] uppercase font-semibold mb-3 px-1"
      >
        Suggestions
      </Text>
      <View className="gap-2">
        {suggestions.map((s, i) => (
          <SuggestionCard i={i} s={s} goToCity={goToCity} key={s.lat} />
        ))}
      </View>
    </View>
  );
};

export default SuggestionsList;
