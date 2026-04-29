import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  visible: boolean;
}

const OfflineBanner = ({ visible }: Props) => {
  const insets = useSafeAreaInsets();
  if (!visible) return null;
  return (
    <Animated.View
      entering={SlideInUp.duration(220)}
      exiting={SlideOutUp.duration(180)}
      className="bg-ink"
      style={{ paddingTop: insets.top }}
    >
      <View className="flex-row items-center justify-center gap-2 py-2 px-4">
        <Ionicons name="cloud-offline-outline" size={14} color="#fff" />
        <Text className="text-white text-xs font-semibold">
          You're offline.
        </Text>
      </View>
    </Animated.View>
  );
};

export default OfflineBanner;
