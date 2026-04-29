import { ScrollView, View, Text, RefreshControl } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WeatherHeader } from "../src/components/WeatherHeader";
import { CurrentDetailsGrid } from "../src/components/CurrentDetailsGrid";
import { HourlyStrip } from "../src/components/HourlyStrip";
import { ForecastList } from "../src/components/ForecastList";
import { mockCurrent, mockHourly, mockDaily } from "../src/lib/mockWeather";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32, gap: 24 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#A53C12" />
        }
      >
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

        <WeatherHeader data={mockCurrent} />
        <CurrentDetailsGrid data={mockCurrent} />
        <HourlyStrip data={mockHourly} />
        <ForecastList data={mockDaily} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
