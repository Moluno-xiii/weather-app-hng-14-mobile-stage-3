import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SearchStackNavigator from "./SearchStackNavigator";

type RootTabParamList = {
  home: undefined;
  search: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#A53C12",
        tabBarInactiveTintColor: "#6B6F78",
        tabBarStyle: {
          backgroundColor: "#F6F1E7",
          borderTopColor: "rgba(14,15,18,0.08)",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          letterSpacing: 1,
          textTransform: "uppercase",
        },
        tabBarIcon: ({ color, size }) => {
          const name =
            route.name === "home" ? "partly-sunny-outline" : "search-outline";
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{ tabBarLabel: "Today" }}
      />
      <Tab.Screen
        name="search"
        component={SearchStackNavigator}
        options={{ tabBarLabel: "Search" }}
      />
    </Tab.Navigator>
  );
};

export type { RootTabParamList };
export default RootNavigator;
