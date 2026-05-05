import { View, Text, FlatList, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { HourlySlot } from "../types/weather";
import { iconForCode } from "../lib/weatherIcons";
import { formatTemp } from "../lib/formatters";

interface Props {
  data: HourlySlot[];
  title?: string;
}

interface CardProps {
  item: HourlySlot;
  flex?: boolean;
}

const HourlyCard = ({ item, flex }: CardProps) => (
  <View
    style={[
      { borderCurve: "continuous" },
      flex ? { flex: 1 } : { minWidth: 64 },
    ]}
    className="bg-white/65 border border-canvas-border rounded-2xl px-3 py-3 items-center"
  >
    <Text
      className="text-ink-muted text-[10px] mb-2"
      style={{ fontVariant: ["tabular-nums"] }}
    >
      {item.time}
    </Text>
    <Ionicons name={iconForCode(item.iconCode)} size={20} color="#2A2C33" />
    <Text
      selectable
      className="text-ink text-base font-semibold mt-2"
      style={{ fontVariant: ["tabular-nums"] }}
    >
      {formatTemp(item.temp)}
    </Text>
  </View>
);

const HourlyStrip = ({ data, title = "Next 24 hours" }: Props) => {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  return (
    <View>
      <Text
        style={{ letterSpacing: 1.5 }}
        className="text-ink-muted text-[10px] uppercase font-semibold mb-3 px-1"
      >
        {title}
      </Text>
      {isWide ? (
        <View className="flex-row" style={{ gap: 8 }}>
          {data.map((item, i) => (
            <HourlyCard key={`${item.time}-${i}`} item={item} flex />
          ))}
        </View>
      ) : (
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item, i) => `${item.time}-${i}`}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-2" />}
          renderItem={({ item }) => <HourlyCard item={item} />}
        />
      )}
    </View>
  );
};

export default HourlyStrip;
