import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { TabRoutes } from "../../types/TypeIcons";
import { HomeStackRoutes } from "../../types/HomeStackRoutes";
import { SettingsStackRoutes } from "../../types/SettingsStackRoutes";

export const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      [TabRoutes.HOME]: {
        path: "home",
        screens: {
          [HomeStackRoutes.HOME]: "",
          [HomeStackRoutes.TRANSACTIONS_LIST]: "transactions",
          [HomeStackRoutes.TRANSACTION_DETAILS]: "transaction/:transactionId",
        },
      },
      [TabRoutes.MARKET]: "market",
      [TabRoutes.SETTINGS]: {
        path: "settings",
        screens: {
          [SettingsStackRoutes.SETTINGS_MAIN]: "",
          [SettingsStackRoutes.PROFILE]: "profile",
          [SettingsStackRoutes.SECURITY]: "security",
          [SettingsStackRoutes.NOTIFICATIONS]: "notifications",
        },
      },
      [TabRoutes.SUPPORT]: "support",
    },
  },
};
