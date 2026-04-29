import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";

interface Props {
  visible: boolean;
}

export function OfflineBanner({ visible }: Props) {
  if (!visible) return null;
  return (
    <Animated.View
      entering={SlideInUp.duration(220)}
      exiting={SlideOutUp.duration(180)}
      className="bg-ink"
    >
      <View className="flex-row items-center justify-center gap-2 py-2 px-4">
        <Ionicons name="cloud-offline-outline" size={14} color="#fff" />
        <Text className="text-white text-xs font-semibold">
          You're offline · showing cached weather
        </Text>
      </View>
    </Animated.View>
  );
}
