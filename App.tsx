import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { AppState, Platform } from "react-native";
import "./global.css";
import RootNavigator from "./navigtators/RootNavigator";

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
export default function App() {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
