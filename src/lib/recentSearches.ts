import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "weather:recentSearches";
const MAX_ITEMS = 10;

interface RecentCity {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

const sameCity = (a: RecentCity, b: RecentCity): boolean =>
  a.lat === b.lat && a.lon === b.lon;

const readRecentSearches = async (): Promise<RecentCity[]> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as RecentCity[]) : [];
  } catch {
    // console.log('Asnc storage error ', e)
    return [];
  }
};

const writeRecentSearches = async (items: RecentCity[]): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const addRecentSearch = async (city: RecentCity): Promise<RecentCity[]> => {
  const existing = await readRecentSearches();
  const deduped = existing.filter((item) => !sameCity(item, city));
  const next = [city, ...deduped].slice(0, MAX_ITEMS);
  await writeRecentSearches(next);
  return next;
};

const clearRecentSearches = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};

export {
  addRecentSearch,
  clearRecentSearches,
  MAX_ITEMS,
  readRecentSearches,
  writeRecentSearches,
};
export type { RecentCity };
