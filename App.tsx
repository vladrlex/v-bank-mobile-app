import "./src/localization/i18n";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import FlashMessage from "react-native-flash-message";
import { useTranslation } from "react-i18next";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { COMMON_HEADER_STYLES } from "./src/navigation/NavigationStyles";
import HomeStack from "./src/navigation/HomeStack/HomeStack";
import SettingsStack from "./src/navigation/SettingsStack/SettingsStack";
import MarketScreen from "./src/screens/MarketScreen/MarketScreen";
import SupportScreen from "./src/screens/SupportScreen/SupportScreen";
import { TabIcons, TabRoutes } from "./src/types/TypeIcons";
import { UserProvider } from "./src/context/UserContext";
import { linking } from "./src/navigation/Linking/Linking";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MarketStackWrapper = () => {
  const { t } = useTranslation("tabs");
  return (
    <Stack.Navigator screenOptions={COMMON_HEADER_STYLES} id={undefined}>
      <Stack.Screen
        name="MarketBase"
        component={MarketScreen}
        options={{ title: t("market") }}
      />
    </Stack.Navigator>
  );
};

const SupportStackWrapper = () => {
  const { t } = useTranslation("tabs");
  return (
    <Stack.Navigator screenOptions={COMMON_HEADER_STYLES} id={undefined}>
      <Stack.Screen
        name="SupportBase"
        component={SupportScreen}
        options={{ title: t("support") }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <NavigationContainer linking={linking}>
          <Tab.Navigator
            id={undefined}
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarShowLabel: false,
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
              tabBarIcon: ({ focused, color, size }) => {
                const icons = TabIcons[route.name as TabRoutes];
                return (
                  <Ionicons
                    name={(focused ? icons.active : icons.inactive) as any}
                    size={size}
                    color={color}
                  />
                );
              },
            })}
          >
            <Tab.Screen name={TabRoutes.HOME} component={HomeStack} />
            <Tab.Screen
              name={TabRoutes.MARKET}
              component={MarketStackWrapper}
            />
            <Tab.Screen name={TabRoutes.SETTINGS} component={SettingsStack} />
            <Tab.Screen
              name={TabRoutes.SUPPORT}
              component={SupportStackWrapper}
            />
          </Tab.Navigator>
          <FlashMessage position="top" />
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
  );
}
