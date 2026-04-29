import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type ErrorKind =
  | "offline"
  | "configMissing"
  | "rateLimit"
  | "notFound"
  | "permissionDenied"
  | "generic";

interface Props {
  kind: ErrorKind;
  onRetry?: () => void;
  secondary?: { label: string; onPress: () => void };
  isOnline?: boolean;
}

const COPY: Record<
  ErrorKind,
  { icon: React.ComponentProps<typeof Ionicons>["name"]; title: string; body: string }
> = {
  offline: {
    icon: "cloud-offline-outline",
    title: "You're offline",
    body: "Connect to the internet to load fresh weather. Cached cities still work.",
  },
  configMissing: {
    icon: "key-outline",
    title: "API key missing or invalid",
    body: "Set EXPO_PUBLIC_OWM_API_KEY in your .env and restart the dev server.",
  },
  rateLimit: {
    icon: "hourglass-outline",
    title: "Too many requests",
    body: "OpenWeatherMap is rate-limiting us. Try again in a minute.",
  },
  notFound: {
    icon: "search-outline",
    title: "We couldn't find that city",
    body: "Check the spelling or try a nearby city name.",
  },
  permissionDenied: {
    icon: "location-outline",
    title: "Location permission needed",
    body: "Allow location access to see weather where you are. You can also search for any city.",
  },
  generic: {
    icon: "alert-circle-outline",
    title: "Something went wrong",
    body: "Please try again in a moment.",
  },
};

export function ErrorState({ kind, onRetry, secondary, isOnline = true }: Props) {
  const { icon, title, body } = COPY[kind];
  const retryDisabled = !isOnline && kind !== "permissionDenied";
  return (
    <View className="items-center px-6 py-10">
      <View
        style={{ borderCurve: "continuous" }}
        className="w-16 h-16 rounded-3xl bg-white/70 border border-canvas-border items-center justify-center mb-5"
      >
        <Ionicons name={icon} size={26} color="#A53C12" />
      </View>
      <Text
        selectable
        className="text-ink text-xl font-semibold text-center"
        style={{ letterSpacing: -0.4 }}
      >
        {title}
      </Text>
      <Text
        selectable
        className="text-ink-muted text-sm text-center mt-2 max-w-xs leading-5"
      >
        {body}
      </Text>

      <View className="flex-row gap-3 mt-6">
        {onRetry && (
          <Pressable
            onPress={onRetry}
            disabled={retryDisabled}
            style={{ borderCurve: "continuous", opacity: retryDisabled ? 0.5 : 1 }}
            className="bg-ink rounded-full px-6 py-3"
            android_ripple={{ color: "rgba(255,255,255,0.15)" }}
          >
            <Text className="text-white text-sm font-semibold">
              {retryDisabled ? "You're offline" : "Try again"}
            </Text>
          </Pressable>
        )}
        {secondary && (
          <Pressable
            onPress={secondary.onPress}
            style={{ borderCurve: "continuous" }}
            className="border border-ink/20 rounded-full px-6 py-3"
            android_ripple={{ color: "rgba(14,15,18,0.06)" }}
          >
            <Text className="text-ink text-sm font-semibold">
              {secondary.label}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
