import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const NoResults = ({ trimmed }: { trimmed: string }) => {
  return (
    <View className="items-center py-10">
      <Ionicons name="search-outline" size={28} color="#6B6F78" />
      <Text className="text-ink text-base font-semibold mt-3">
        No matches for "{trimmed}"
      </Text>
      <Text className="text-ink-muted text-sm mt-1 text-center max-w-xs">
        Check the spelling or try a nearby city name.
      </Text>
    </View>
  );
};

export default NoResults;
