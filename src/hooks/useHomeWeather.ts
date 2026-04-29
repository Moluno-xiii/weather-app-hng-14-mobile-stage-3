import { useQuery } from "@tanstack/react-query";
import {
  fetchCurrent,
  fetchForecast,
  mapDaily,
  mapHourly,
} from "../api/openWeather";
import { TANSTACK_STALE_TIME } from "../lib/constants";

interface Coords {
  lat: number;
  lon: number;
}

const useHomeWeather = (coords: Coords | null) => {
  const enabled = coords !== null;
  const lat = coords?.lat ?? 0;
  const lon = coords?.lon ?? 0;

  const current = useQuery({
    queryKey: ["weather", "current", { lat, lon }],
    queryFn: () => fetchCurrent(lat, lon),
    staleTime: TANSTACK_STALE_TIME,
    enabled,
  });

  const forecast = useQuery({
    queryKey: ["weather", "forecast", { lat, lon }],
    queryFn: () => fetchForecast(lat, lon),
    staleTime: TANSTACK_STALE_TIME,
    enabled,
    select: (data) => ({
      daily: mapDaily(data),
      hourly: mapHourly(data),
    }),
  });

  const refetch = async (): Promise<void> => {
    await Promise.all([current.refetch(), forecast.refetch()]);
  };

  return {
    current: current.data,
    daily: forecast.data?.daily,
    hourly: forecast.data?.hourly,
    isLoading: enabled && (current.isLoading || forecast.isLoading),
    isRefetching: current.isRefetching || forecast.isRefetching,
    isError: current.isError || forecast.isError,
    error: current.error ?? forecast.error,
    refetch,
    forecast: forecast.data,
  };
};

export default useHomeWeather;
