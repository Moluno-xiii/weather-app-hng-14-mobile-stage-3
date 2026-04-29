import { useCallback, useEffect, useState } from "react";
import {
  addRecentSearch,
  clearRecentSearches,
  readRecentSearches,
  type RecentCity,
} from "../lib/recentSearches";

const useRecentSearches = () => {
  const [items, setItems] = useState<RecentCity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const stored = await readRecentSearches();
        if (!cancelled) setItems(stored);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const add = useCallback(async (city: RecentCity): Promise<void> => {
    const next = await addRecentSearch(city);
    setItems(next);
  }, []);

  const clear = useCallback(async (): Promise<void> => {
    await clearRecentSearches();
    setItems([]);
  }, []);

  return { items, isLoading, add, clear };
};

export default useRecentSearches;
