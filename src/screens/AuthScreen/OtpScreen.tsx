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
import { RouteProp } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { confirmOtp } from "../../services/authService";
import { AuthStackParamList } from "../../navigation/AuthStack/AuthStack";

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, "Otp">;
  route: RouteProp<AuthStackParamList, "Otp">;
};

export default function OtpScreen({ route }: Props) {
  const { t } = useTranslation("auth");
  const { verificationId } = route.params;
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (otp.length !== 6) {
      showMessage({ message: t("invalidOtp"), type: "warning" });
      return;
    }
    setLoading(true);
    try {
      await confirmOtp(verificationId, otp);
    } catch (e: any) {
      showMessage({ message: t("invalidOtp"), type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={40}
              color="#007AFF"
            />
          </View>
          <Text style={styles.appName}>{t("otpTitle")}</Text>
          <Text style={styles.subtitle}>{t("otpCode")}</Text>
        </View>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="000000"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleConfirm}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{t("confirm")}</Text>
            )}
          </TouchableOpacity>
        </View>
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
  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: { fontSize: 14, color: "#888", textAlign: "center" },
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
  input: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 28,
    color: "#333",
    textAlign: "center",
    letterSpacing: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "tomato",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
