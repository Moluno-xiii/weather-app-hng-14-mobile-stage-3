import "./global.css";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AppState, Platform, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./navigators/RootNavigator";
import OfflineBanner from "./src/components/OfflineBanner";

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

function onAppStateChange(status: string) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient();

function AppShell() {
  const netInfo = useNetInfo();
  const isOffline = netInfo.isConnected === false;

  return (
    <View style={{ flex: 1 }}>
      <OfflineBanner visible={isOffline} />
      <RootNavigator />
    </View>
  );
}

export default function App() {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <StatusBar style="dark" />
          <AppShell />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
