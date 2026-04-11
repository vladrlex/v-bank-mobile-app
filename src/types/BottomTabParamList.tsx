import { NavigatorScreenParams } from "@react-navigation/native";
import { SettingsStackParamList } from "../types/SettingsStackRoutes";
import { HomeStackParamList } from "./HomeStackRoutes";

export type BottomTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  SettingsTab: NavigatorScreenParams<SettingsStackParamList>;
  Support: undefined;
  Market: undefined;
};
