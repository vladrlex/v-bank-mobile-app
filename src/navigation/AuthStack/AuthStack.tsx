import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COMMON_HEADER_STYLES } from "../NavigationStyles";
import LoginScreen from "../../screens/AuthScreen/LoginScreen";
import RegisterScreen from "../../screens/AuthScreen/RegisterScreen";
import PhoneScreen from "../../screens/AuthScreen/PhoneScreen";
import OtpScreen from "../../screens/AuthScreen/OtpScreen";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Phone: undefined;
  Otp: { verificationId: string };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={COMMON_HEADER_STYLES} id={undefined}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Вхід" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Реєстрація" }}
      />
      <Stack.Screen
        name="Phone"
        component={PhoneScreen}
        options={{ title: "Телефон" }}
      />
      <Stack.Screen
        name="Otp"
        component={OtpScreen}
        options={{ title: "Підтвердження" }}
      />
    </Stack.Navigator>
  );
}
