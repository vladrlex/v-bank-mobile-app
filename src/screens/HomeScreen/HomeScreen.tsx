import {
  NavigationProp,
  useNavigation,
  CompositeNavigationProp,
} from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabParamList } from "../../types/BottomTabParamList";
import {
  HomeStackParamList,
  HomeStackRoutes,
} from "../../types/HomeStackRoutes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SettingsStackRoutes } from "../../types/SettingsStackRoutes";
import { useUserState } from "../../context/UserContext/UserContext";
import { useTranslation } from "react-i18next";

type HomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, HomeStackRoutes.HOME>,
  NavigationProp<BottomTabParamList>
>;

export default function HomeScreen() {
  const { t } = useTranslation(["home", "tabs"]);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { firstName, lastName, balance } = useUserState();

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.subHeader}>
          {t("home:greeting")}, {firstName}!
        </Text>
        <TouchableOpacity
          style={styles.headerContainer}
          onPress={() =>
            navigation.navigate("SettingsTab", {
              screen: SettingsStackRoutes.PROFILE,
            })
          }
        >
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={20} color="#007AFF" />
          </View>
          <Text style={styles.headerName}>
            {firstName} {lastName}
          </Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#888" />
        </TouchableOpacity>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>{t("home:balance")}</Text>
          <Text style={styles.balanceAmount}>
            {(balance || 0).toLocaleString("uk-UA")} ₴
          </Text>
        </View>

        <Text style={styles.subHeader}>{t("home:menuHeader")}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(HomeStackRoutes.TRANSACTIONS_LIST)}
        >
          <View style={[styles.iconWrapper, { backgroundColor: "#E6F0FF" }]}>
            <Ionicons name="list-outline" size={22} color="#007AFF" />
          </View>
          <Text style={styles.buttonText}>{t("home:transactionHistory")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("SettingsTab", {
              screen: SettingsStackRoutes.SETTINGS_MAIN,
            })
          }
        >
          <View style={[styles.iconWrapper, { backgroundColor: "#FFF0E0" }]}>
            <Ionicons name="settings-outline" size={22} color="#FF9500" />
          </View>
          <Text style={styles.buttonText}>{t("tabs:settings")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E6F0FF",
    justifyContent: "center",
    alignItems: "center",
  },
  headerName: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 12,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  balanceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  balanceLabel: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },

  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "500",
    marginLeft: 16,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});
