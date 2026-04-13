import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COMMON_HEADER_STYLES } from "../NavigationStyles";
import LoginScreen from "../../screens/AuthScreen/LoginScreen";
import RegisterScreen from "../../screens/AuthScreen/RegisterScreen";
import PhoneScreen from "../../screens/AuthScreen/PhoneScreen";
import OtpScreen from "../../screens/AuthScreen/OtpScreen";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Phone: undefined;
  Otp: { verificationId: string };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  const { t, i18n } = useTranslation("auth");

  const headerRight = () => (
    <View style={{ marginRight: 4 }}>
      <LanguageSwitcher compact />
    </View>
  );

  return (
    <Stack.Navigator
      key={i18n.language}
      id={undefined}
      screenOptions={{
        ...COMMON_HEADER_STYLES,
        headerRight,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: t("loginTitle") }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: t("registerTitle") }}
      />
      <Stack.Screen
        name="Phone"
        component={PhoneScreen}
        options={{ title: t("phoneTitle") }}
      />
      <Stack.Screen
        name="Otp"
        component={OtpScreen}
        options={{ title: t("otpTitle") }}
      />
    </Stack.Navigator>
  );
}
