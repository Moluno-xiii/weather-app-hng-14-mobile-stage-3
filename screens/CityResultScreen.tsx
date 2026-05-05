import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useMemo } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { SearchStackParamList } from "../navigators/SearchStackNavigator";
import CurrentDetailsGrid from "../src/components/CurrentDetailsGrid";
import ErrorState from "../src/components/ErrorState";
import ForecastList from "../src/components/ForecastList";
import HourlyStrip from "../src/components/HourlyStrip";
import LoadingSkeleton from "../src/components/LoadingSkeleton";
import WeatherHeader from "../src/components/WeatherHeader";
import useHomeWeather from "../src/hooks/useHomeWeather";

type CityResultRoute = RouteProp<SearchStackParamList, "CityResult">;

const CityResultScreen = () => {
  const route = useRoute<CityResultRoute>();
  const { name, country, lat, lon } = route.params;

  const coords = useMemo(() => ({ lat, lon }), [lat, lon]);
  const { current, daily, hourly, isLoading, isRefetching, isError, refetch } =
    useHomeWeather(coords);

  const onRefresh = () => {
    void refetch();
  };

  const headerData = current ? { ...current, city: name, country } : null;

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-canvas">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            tintColor="#A53C12"
          />
        }
      >
        <View
          style={{
            width: "100%",
            maxWidth: 900,
            alignSelf: "center",
            paddingHorizontal: 20,
            gap: 24,
          }}
        >
          {isLoading ? (
            <LoadingSkeleton />
          ) : isError || !headerData || !daily || !hourly ? (
            <ErrorState kind="generic" onRetry={onRefresh} />
          ) : (
            <>
              <WeatherHeader data={headerData} />
              <CurrentDetailsGrid data={headerData} />
              <HourlyStrip data={hourly} />
              <ForecastList data={daily} />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CityResultScreen;
