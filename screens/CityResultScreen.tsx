import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { WeatherHeader } from "../src/components/WeatherHeader";
import { CurrentDetailsGrid } from "../src/components/CurrentDetailsGrid";
import { HourlyStrip } from "../src/components/HourlyStrip";
import { ForecastList } from "../src/components/ForecastList";
import { mockCityResult, mockDaily, mockHourly } from "../src/lib/mockWeather";
import type { SearchStackParamList } from "../navigators/SearchStackNavigator";

type CityResultRoute = RouteProp<SearchStackParamList, "CityResult">;

const CityResultScreen = () => {
  const route = useRoute<CityResultRoute>();
  const data = {
    ...mockCityResult(route.params.name),
    country: route.params.country,
  };

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-convas">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 32,
          gap: 24,
        }}
      >
        <WeatherHeader data={data} />
        <CurrentDetailsGrid data={data} />
        <HourlyStrip data={mockHourly} />
        <ForecastList data={mockDaily} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CityResultScreen;
