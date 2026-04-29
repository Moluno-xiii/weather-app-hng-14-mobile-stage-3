import { useQuery } from "@tanstack/react-query";
import { fetchGeocode } from "../api/openWeather";

const MIN_QUERY_LENGTH = 3;
const GEOCODE_STALE_TIME = 5 * 60_000;

const useGeocode = (query: string) => {
  const trimmed = query.trim();
  const enabled = trimmed.length >= MIN_QUERY_LENGTH;

  const result = useQuery({
    queryKey: ["geocode", trimmed.toLowerCase()],
    queryFn: () => fetchGeocode(trimmed),
    enabled,
    staleTime: GEOCODE_STALE_TIME,
  });

  return {
    suggestions: result.data ?? [],
    isLoading: enabled && result.isLoading,
    isFetching: result.isFetching,
    isError: result.isError,
    error: result.error,
    enabled,
  };
};

export default useGeocode;
