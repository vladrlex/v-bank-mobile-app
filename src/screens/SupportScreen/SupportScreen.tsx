import React, { useTransition } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function SupportScreen() {
  const { t } = useTranslation("support");
  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.subHeader}>{t("support:header")}</Text>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <View style={[styles.iconWrapper, { backgroundColor: "#E6F0FF" }]}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={22}
              color="#007AFF"
            />
          </View>
          <Text style={styles.buttonText}>{t("support:chat")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <View style={[styles.iconWrapper, { backgroundColor: "#E0F8E3" }]}>
            <Ionicons name="help-circle-outline" size={22} color="#34C759" />
          </View>
          <Text style={styles.buttonText}>{t("support:questions")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <View style={[styles.iconWrapper, { backgroundColor: "#FFF0E0" }]}>
            <Ionicons name="call-outline" size={22} color="#FF9500" />
          </View>
          <Text style={styles.buttonText}>{t("support:call")}</Text>
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
