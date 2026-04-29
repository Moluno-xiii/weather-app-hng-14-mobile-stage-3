import { ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WeatherHeader from "../src/components/WeatherHeader";
import CurrentDetailsGrid from "../src/components/CurrentDetailsGrid";
import ForecastList from "../src/components/ForecastList";
import LoadingSkeleton from "../src/components/LoadingSkeleton";
import ErrorState from "../src/components/ErrorState";
import HourlyStrip from "../src/components/HourlyStrip";
import useHomeWeather from "../src/hooks/useHomeWeather";
import useCurrentLocation from "../src/hooks/useCurrentLocation";
import HomeScreenHeader from "../src/components/HomeScreenHeader";

const HomeScreen = () => {
  const {
    coords,
    status: locationStatus,
    requestLocation,
  } = useCurrentLocation();

  const { current, daily, hourly, isLoading, isRefetching, isError, refetch } =
    useHomeWeather(coords);

  const onRefresh = () => {
    void refetch();
  };

  const isLocationLoading =
    locationStatus === "idle" || locationStatus === "loading";
  const showSkeleton = isLocationLoading || isLoading;
  const showPermissionDenied = locationStatus === "denied";
  const showLocationError = locationStatus === "error";

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 32,
          gap: 24,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            tintColor="#A53C12"
          />
        }
      >
        <HomeScreenHeader />
        {showPermissionDenied ? (
          <ErrorState
            kind="permissionDenied"
            onRetry={() => void requestLocation()}
          />
        ) : showLocationError ? (
          <ErrorState kind="generic" onRetry={() => void requestLocation()} />
        ) : showSkeleton ? (
          <LoadingSkeleton />
        ) : isError || !current || !daily || !hourly ? (
          <ErrorState kind="generic" onRetry={onRefresh} />
        ) : (
          <>
            <WeatherHeader data={current} />
            <CurrentDetailsGrid data={current} />
            <HourlyStrip data={hourly} />
            <ForecastList data={daily} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
