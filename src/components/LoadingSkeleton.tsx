import { View } from "react-native";

const Block = ({
  className,
  style,
}: {
  className?: string;
  style?: object;
}) => {
  return (
    <View
      style={[
        {
          borderCurve: "continuous",
          backgroundColor: "rgba(14,15,18,0.18)",
          opacity: 0.85,
        },
        style,
      ]}
      className={`rounded-2xl ${className ?? ""}`}
    />
  );
};

const LoadingSkeleton = () => {
  return (
    <View style={{ gap: 20 }}>
      <Block className="h-56" />
      <View className="flex-row flex-wrap" style={{ gap: 12 }}>
        <Block className="flex-1 min-w-[46%] h-20" />
        <Block className="flex-1 min-w-[46%] h-20" />
        <Block className="flex-1 min-w-[46%] h-20" />
        <Block className="flex-1 min-w-[46%] h-20" />
      </View>
      <Block className="h-24" />
      <View style={{ gap: 12 }}>
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
