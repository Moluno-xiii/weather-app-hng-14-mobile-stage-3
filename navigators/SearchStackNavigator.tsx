import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/SearchScreen";
import CityResultScreen from "../screens/CityResultScreen";

export type SearchStackParamList = {
  Search: undefined;
  CityResult: { name: string; country: string; lat: number; lon: number };
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#F6F1E7" },
        headerTitleStyle: { color: "#0E0F12" },
        headerTintColor: "#0E0F12",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CityResult"
        component={CityResultScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
};

export default SearchStackNavigator;
