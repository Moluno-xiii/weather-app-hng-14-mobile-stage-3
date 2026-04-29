import { Text, View } from "react-native";

const HomeScreenHeader = () => {
  return (
    <View className="flex-row items-center justify-between pt-2 pb-1">
      <View>
        <Text
          style={{ letterSpacing: 2 }}
          className="text-ink-muted text-[10px] uppercase font-semibold"
        >
          Right now
        </Text>
        <Text
          style={{ letterSpacing: -0.6 }}
          className="text-ink text-[26px] font-semibold mt-0.5"
        >
          Weather
        </Text>
      </View>
      <View className="bg-white/70 border border-canvas-border rounded-full px-3 py-1.5">
        <Text className="text-ink-muted text-[11px] font-semibold">°C</Text>
      </View>
    </View>
  );
};

export default HomeScreenHeader;
