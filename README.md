# Weather App, HNG 14 Mobile Stage 3

A React Native / Expo weather app. Shows current conditions, an hourly strip, and a 5-day forecast for the user's current location, and lets them search any city by name.

Built for the HNG 14 Mobile Track Stage 3 task.

## Features

- **Location-based weather** — requests foreground permission on Home, then fetches the current conditions and forecast for the device's coordinates.
- **City search** — debounced (300 ms) autocomplete backed by OpenWeatherMap's geocoding API. Fires once the query is ≥ 3 characters.
- **Recent searches** — last 10 cities the user opened, persisted to AsyncStorage and deduped by `(lat, lon)`.
- **5-day forecast + 24-hour hourly strip** — both derived from a single `/forecast` call to keep request count low.
- **Per-day expand/collapse** — tap a forecast row to reveal that day's hourly slots, with an animated chevron and Reanimated `LinearTransition` for the row resize.
- **Offline-aware data layer** — React Query cache + NetInfo wired into `onlineManager` so requests pause/resume with connectivity.

## Animations

All animations run on the UI thread via `react-native-reanimated` v4 + `react-native-worklets`.

- **Forecast list entrance** — each day in the 5-day list fades + slides in with `FadeInDown.delay(i * 80).springify().damping(14)` for a staggered cascade on mount.
- **Forecast row expand / collapse** — tapping a day toggles its hourly mini-strip. The row's resize is animated with `LinearTransition.springify().damping(18)`, and the chevron rotates 0° → 180° via a `useSharedValue` + `useAnimatedStyle` driven by `withTiming` (220 ms).
- **Search suggestions entrance** — autocomplete results fade in one-by-one with `FadeInDown.delay(i * 60).springify().damping(16)` as the query resolves.
- **Offline banner** — slides in from the top via `SlideInUp.duration(220)` when connectivity drops and exits with `SlideOutUp.duration(180)` when it returns.
- **Loading skeleton pulse** — placeholder blocks pulse opacity 0.5 ↔ 1.0 via `withRepeat(withTiming(...), -1, true)` while data is in flight.
- **Screen transitions** — native-stack push/pop animations between the Search screen and the City result screen (provided by `@react-navigation/native-stack`).

## Screenshots

| Search suggestions                                           | Remote search results                                                      |
| ------------------------------------------------------------ | -------------------------------------------------------------------------- |
| ![Search suggestions](./readmeImages/search_suggestions.png) | ![Remote search suggestions](./readmeImages/remote_search_suggestions.png) |

| City result                                        | Offline banner                                       |
| -------------------------------------------------- | ---------------------------------------------------- |
| ![Search result](./readmeImages/search_result.png) | ![Offline banner](./readmeImages/offline_banner.png) |

## APIs used

[OpenWeatherMap](https://openweathermap.org/) free tier, three endpoints:

- `GET /data/2.5/weather`: [current weather](https://openweathermap.org/current) by coordinates.
- `GET /data/2.5/forecast`: [5-day / 3-hour forecast](https://openweathermap.org/forecast5) by coordinates. Both the 5-day daily summary and the 24-hour hourly strip are derived from this single call.
- `GET /geo/1.0/direct`: [geocoding](https://openweathermap.org/api/geocoding-api) for the search autocomplete.

All requests use `units=metric` and the API key from `EXPO_PUBLIC_OWM_API_KEY`.

## Architecture

The codebase is split by concern, not by feature, with a thin domain-mapping layer between the OWM responses and the UI:

```
screens/        Route-level components — compose hooks + presentational components
navigators/     React Navigation config (bottom tabs + nested native-stack)
src/
  api/          Fetcher functions; raw OWM → domain mappers
  hooks/        useCurrentLocation · useHomeWeather · useGeocode · useDebounce · useRecentSearches
  lib/          Endpoint builders, formatters, icon/gradient lookup, AsyncStorage helpers
  components/   Presentational components (no fetching, no navigation)
  types/        Domain types (`weather.ts`) + raw OWM response types (`openWeather.ts`)
  utils/        `customTryCatch` — typed fetch wrapper
```

**Data flow**

```
expo-location ─► useCurrentLocation ─► coords
                                         │
                                         ▼
                          useHomeWeather(coords)
                          ├─ useQuery(["weather","current",…])  ─► /data/2.5/weather
                          └─ useQuery(["weather","forecast",…]) ─► /data/2.5/forecast
                                         │     (select: derives daily + hourly)
                                         ▼
                          HomeScreen renders header + grid + strip + list
```

Search follows the same shape: `useGeocode(debouncedQuery)` → suggestions → tap pushes `CityResult { name, country, lat, lon }`, which calls the same two query hooks via `useHomeWeather`.

**Conventions**

- Hooks own all data fetching, persistence, and permission flow. Components never call `fetch` or React Query directly.
- The API layer in `src/api/openWeather.ts` returns _domain_ types (`CurrentWeather`, `DailyForecast`, `HourlySlot`) — screens never see raw OWM shapes.
- `react-query` is wired to NetInfo via `onlineManager.setEventListener` so queries pause/resume with connectivity.
- Recent searches are persisted to AsyncStorage (capped at 10, deduped by `lat`/`lon`).

## Tech stack

| Layer          | Choice                                                                             |
| -------------- | ---------------------------------------------------------------------------------- |
| Runtime        | Expo SDK 54, React Native 0.81, React 19                                           |
| Navigation     | `@react-navigation/native` — bottom tabs + nested native-stack for the search flow |
| Styling        | NativeWind v4 + Tailwind                                                           |
| Data           | `@tanstack/react-query` v5                                                         |
| Storage        | `@react-native-async-storage/async-storage` (recent searches)                      |
| Network status | `@react-native-community/netinfo`                                                  |
| Location       | `expo-location` (foreground, "when in use")                                        |
| Animation      | `react-native-reanimated` v4 + `react-native-worklets`                             |
| Icons          | `@expo/vector-icons` (Ionicons)                                                    |
| Gradients      | `expo-linear-gradient`                                                             |
| HTTP           | `fetch` via a small `customTryCatch` wrapper                                       |

## Getting started

### 1. Prerequisites

- Node 20+ and `pnpm` (lockfile is `pnpm-lock.yaml`).
- An [OpenWeatherMap](https://openweathermap.org/api) account — the free tier is enough.
- For native builds: Android Studio (Android) or Xcode (iOS). The dev client is required because the project uses native modules (`expo-location`, Reanimated worklets, etc.) — Expo Go will not work.

### 2. Clone & install

```bash
git clone https://github.com/Moluno-xiii/weather-app-hng-14-mobile-stage-3.git
cd weather-app-hng-14-mobile-stage-3
pnpm install
```

### 3. Configure the API key

Create a `.env` at the repo root:

```bash
EXPO_PUBLIC_OWM_API_KEY=your_openweathermap_api_key
```

`EXPO_PUBLIC_*` vars are inlined at build time, so the dev server must be restarted after changing the file.

### 4. Run

```bash
pnpm android   # build + launch on a connected Android device/emulator
pnpm ios       # build + launch on iOS simulator (macOS only)
pnpm start     # start the Metro bundler against an existing dev client build
```

The first `pnpm android` / `pnpm ios` will compile a native dev client. After that, it uses `pnpm start`.
