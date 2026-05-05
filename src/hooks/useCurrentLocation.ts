import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";

type LocationStatus = "idle" | "loading" | "granted" | "denied" | "error";

interface Coords {
  lat: number;
  lon: number;
}

interface UseCurrentLocationResult {
  coords: Coords | null;
  status: LocationStatus;
  error: string | null;
  requestLocation: () => Promise<void>;
}

const useCurrentLocation = (): UseCurrentLocationResult => {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const requestLocation = useCallback(async (): Promise<void> => {
    setStatus("loading");
    setError(null);
    try {
      const isElectron =
        typeof window !== "undefined" && "electronAPI" in window;

      if (isElectron) {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error("IP location lookup failed");
        const data: { latitude?: number; longitude?: number } = await res.json();
        if (
          typeof data.latitude !== "number" ||
          typeof data.longitude !== "number"
        ) {
          throw new Error("Invalid IP location response");
        }
        setCoords({ lat: data.latitude, lon: data.longitude });
        setStatus("granted");
        return;
      }

      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== "granted") {
        setStatus("denied");
        return;
      }
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      setStatus("granted");
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Could not read your location.";
      setError(message);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return { coords, status, error, requestLocation };
};

export default useCurrentLocation;
