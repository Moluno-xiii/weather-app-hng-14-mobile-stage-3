import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";

type RootTabParamList = {
  home: undefined;
  search: undefined;
};
const Tab = createBottomTabNavigator<RootTabParamList>();

const RootNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="search" component={SearchScreen} />
    </Tab.Navigator>
  );
};

export type { RootTabParamList };
export default RootNavigator;
