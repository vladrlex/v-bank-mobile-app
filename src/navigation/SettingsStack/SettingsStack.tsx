import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SettingsScreen from "../../screens/SettingsScreen/SettingsScreen";
import ProfileScreen from "../../screens/SettingsScreen/ProfileScreen/ProfileScreen";
import {
  SettingsStackParamList,
  SettingsStackRoutes,
} from "../../types/SettingsStackRoutes";
import NotificationScreen from "../../screens/SettingsScreen/NotificationScreen/NotificationScreen";
import SecurityScreen from "../../screens/SettingsScreen/SecurityScreen/SecurityScreen";
import { COMMON_HEADER_STYLES } from "../NavigationStyles";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsStack() {
  const { t } = useTranslation(["settings"]);

  return (
    <Stack.Navigator id={undefined} screenOptions={COMMON_HEADER_STYLES}>
      <Stack.Screen
        name={SettingsStackRoutes.SETTINGS_MAIN}
        component={SettingsScreen}
        options={{ title: t("settings:title") }}
      />
      <Stack.Screen
        name={SettingsStackRoutes.PROFILE}
        component={ProfileScreen}
        options={{ title: "Профіль" }}
      />
      <Stack.Screen
        name={SettingsStackRoutes.NOTIFICATIONS}
        component={NotificationScreen}
        options={{ title: "Сповіщення" }}
      />
      <Stack.Screen
        name={SettingsStackRoutes.SECURITY}
        component={SecurityScreen}
        options={{ title: "Безпека" }}
      />
    </Stack.Navigator>
  );
}
