import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import TransactionDetailsScreen from "../../screens/HomeScreen/TransactionDetailsScreen/TransactionDetailsScreen";
import {
  HomeStackParamList,
  HomeStackRoutes,
} from "../../types/HomeStackRoutes";
import TransactionsListScreen from "../../screens/HomeScreen/TransactionsListScreen/TransactionsListScreen";
import { useTranslation } from "react-i18next";
import { COMMON_HEADER_STYLES } from "../NavigationStyles";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  const { t } = useTranslation(["home", "tabs", "transactionDetails"]);

  return (
    <Stack.Navigator id={undefined} screenOptions={COMMON_HEADER_STYLES}>
      <Stack.Screen
        name={HomeStackRoutes.HOME}
        component={HomeScreen}
        options={{ title: t("tabs:home") }}
      />
      <Stack.Screen
        name={HomeStackRoutes.TRANSACTIONS_LIST}
        component={TransactionsListScreen}
        options={{ title: t("home:transactionHistory") }}
      />
      <Stack.Screen
        name={HomeStackRoutes.TRANSACTION_DETAILS}
        component={TransactionDetailsScreen}
        options={{ title: t("transactionDetails:backButton") }}
      />
    </Stack.Navigator>
  );
}
