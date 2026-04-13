import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { showMessage } from "react-native-flash-message";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { registerWithEmail } from "../../services/authService";
import { AuthStackParamList } from "../../navigation/AuthStack/AuthStack";

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, "Register">;
};

export default function RegisterScreen({ navigation }: Props) {
  const { t } = useTranslation("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirm) {
      showMessage({ message: t("fillFields"), type: "warning" });
      return;
    }
    if (password !== confirm) {
      showMessage({ message: t("passwordMismatch"), type: "warning" });
      return;
    }
    if (password.length < 6) {
      showMessage({ message: t("passwordTooShort"), type: "warning" });
      return;
    }
    setLoading(true);
    try {
      await registerWithEmail(email, password);
    } catch (e: any) {
      showMessage({ message: e.message, type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <Ionicons name="person-add-outline" size={40} color="#007AFF" />
          </View>
          <Text style={styles.appName}>{t("registerTitle")}</Text>
          <Text style={styles.subtitle}>{t("registerSubtitle")}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t("email")}</Text>
            <TextInput
              style={styles.input}
              placeholder="example@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t("password")}</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t("confirmPassword")}</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••"
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry={!showConfirm}
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Ionicons
                  name={showConfirm ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{t("register")}</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={18} color="#007AFF" />
          <Text style={styles.linkText}>{t("hasAccount")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  container: { flex: 1, paddingHorizontal: 16, justifyContent: "center" },
  logoContainer: { alignItems: "center", marginBottom: 32 },
  logoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E6F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  appName: { fontSize: 28, fontWeight: "700", color: "#333", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#888" },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, color: "#888", marginBottom: 6 },
  input: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  passwordInput: { flex: 1, paddingVertical: 12, fontSize: 16, color: "#333" },
  button: {
    backgroundColor: "tomato",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  linkText: { color: "#007AFF", fontSize: 15, fontWeight: "500" },
});
