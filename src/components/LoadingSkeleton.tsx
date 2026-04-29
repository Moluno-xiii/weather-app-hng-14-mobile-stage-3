import { View } from "react-native";
import Animated from "react-native-reanimated";
import usePulse from "../hooks/usePulse";

const Block = ({
  className,
  style,
}: {
  className?: string;
  style?: object;
}) => {
  const pulse = usePulse();
  return (
    <Animated.View
      style={[{ borderCurve: "continuous" }, style, pulse]}
      className={`bg-canvas-border rounded-2xl ${className ?? ""}`}
    />
  );
};

const LoadingSkeleton = () => {
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
};

export default LoadingSkeleton;
