import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const usePulse = () => {
  const opacity = useSharedValue(0.5);
  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [opacity]);
  return useAnimatedStyle(() => ({ opacity: opacity.value }));
};

const Block = ({ className, style }: { className?: string; style?: object }) => {
  const pulse = usePulse();
  return (
    <Animated.View
      style={[{ borderCurve: "continuous" }, style, pulse]}
      className={`bg-canvas-border rounded-2xl ${className ?? ""}`}
    />
  );
};

export function LoadingSkeleton() {
  return (
    <View className="gap-5">
      <Block className="h-56" />
      <View className="flex-row flex-wrap gap-3">
        <Block className="flex-1 min-w-[46%] h-20" />
        <Block className="flex-1 min-w-[46%] h-20" />
        <Block className="flex-1 min-w-[46%] h-20" />
        <Block className="flex-1 min-w-[46%] h-20" />
      </View>
      <Block className="h-24" />
      <View className="gap-3">
        <Block className="h-14" />
        <Block className="h-14" />
        <Block className="h-14" />
        <Block className="h-14" />
        <Block className="h-14" />
      </View>
    </View>
  );
}
