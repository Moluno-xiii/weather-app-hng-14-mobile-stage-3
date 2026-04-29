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

The first `pnpm android` / `pnpm ios` will compile a native dev client. After that, day-to-day work uses `pnpm start`.
