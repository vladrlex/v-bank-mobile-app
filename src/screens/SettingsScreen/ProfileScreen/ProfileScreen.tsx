import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";
import {
  useUserState,
  useUserDispatch,
  updateUserProfile,
} from "../../../context/UserContext";

export default function ProfileScreen() {
  const state = useUserState();
  const dispatch = useUserDispatch();
  const { t } = useTranslation(["profile", "common"]);

  const [localFirstName, setLocalFirstName] = useState(state.firstName);
  const [localLastName, setLocalLastName] = useState(state.lastName);
  const [localEmail, setLocalEmail] = useState(state.email);

  const [isLoading, setIsLoading] = useState(false);

  const onSaveChanges = async () => {
    if (!localFirstName || !localLastName || !localEmail) {
      showMessage({ message: t("profile:emptyFieldError"), type: "danger" });
      return;
    }

    setIsLoading(true);

    await updateUserProfile(dispatch, {
      firstName: localFirstName,
      lastName: localLastName,
      email: localEmail,
    });

    setTimeout(() => {
      setIsLoading(false);
      showMessage({
        message: t("common:save"),
        description: t("profile:successMessage"),
        type: "success",
        icon: "success",
      });
    }, 500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.avatarContainer}>
          <TouchableOpacity style={styles.avatarWrapper}>
            <Ionicons name="person" size={50} color="#007AFF" />
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={18} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>{t("profile:title")}</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{t("profile:firstName")}</Text>
          <TextInput
            style={styles.input}
            value={localFirstName ?? ""}
            onChangeText={setLocalFirstName}
            placeholder={t("profile:firstNamePlaceholder")}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{t("profile:lastName")}</Text>
          <TextInput
            style={styles.input}
            value={localLastName ?? ""}
            onChangeText={setLocalLastName}
            placeholder={t("profile:lastNamePlaceholder")}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{t("profile:email")}</Text>
          <TextInput
            style={styles.input}
            value={localEmail ?? ""}
            onChangeText={setLocalEmail}
            placeholder={t("profile:emailPlaceholder")}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
          onPress={onSaveChanges}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.saveButtonText}>{t("profile:saveButton")}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
    paddingBottom: 40,
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E6F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007AFF",
    padding: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#f5f5f5",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  saveButtonDisabled: {
    backgroundColor: "#a0a0a0",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
