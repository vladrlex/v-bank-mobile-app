import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  SettingsStackParamList,
  SettingsStackRoutes,
} from "../../types/SettingsStackRoutes";
import { Ionicons } from "@expo/vector-icons";

import { useTranslation } from "react-i18next";

type SettingsScreenNavigationProp = NavigationProp<
  SettingsStackParamList,
  SettingsStackRoutes.SETTINGS_MAIN
>;

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { t, i18n } = useTranslation("settings");

  const handleChangeLanguage = () => {
    const nextLang = i18n.language === "ua" ? "en" : "ua";
    i18n.changeLanguage(nextLang);
  };
  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.subHeader}>{t("settings:header")}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SettingsStackRoutes.PROFILE)}
        >
          <View style={[styles.iconWrapper, { backgroundColor: "#E6F0FF" }]}>
            <Ionicons name="person-outline" size={22} color="#007AFF" />
          </View>
          <Text style={styles.buttonText}>{t("profile")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SettingsStackRoutes.NOTIFICATIONS)}
        >
          <View style={[styles.iconWrapper, { backgroundColor: "#FFF0E0" }]}>
            <Ionicons name="notifications-outline" size={22} color="#FF9500" />
          </View>
          <Text style={styles.buttonText}>{t("notifications")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SettingsStackRoutes.SECURITY)}
        >
          <View style={[styles.iconWrapper, { backgroundColor: "#E0F8E3" }]}>
            <Ionicons
              name="shield-checkmark-outline"
              size={22}
              color="#34C759"
            />
          </View>
          <Text style={styles.buttonText}>{t("security")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleChangeLanguage}>
          <View style={[styles.iconWrapper, { backgroundColor: "#f0e6ff" }]}>
            <Ionicons name="globe-outline" size={22} color="#9C27B0" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.languageButtonText}>{t("language")}</Text>
            <Text style={styles.languageText}>{t("currentLanguage")}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
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
  logoutButton: {
    marginTop: 8,
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
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 16,
  },
  languageButtonText: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "500",
  },
  languageText: {
    fontSize: 14,
    color: "#888",
    fontWeight: "400",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
});
