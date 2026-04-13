import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { showMessage } from "react-native-flash-message";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { sendOtp } from "../../services/authService";
import { firebaseConfig } from "../../services/firebaseConfig";
import { AuthStackParamList } from "../../navigation/AuthStack/AuthStack";

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, "Phone">;
};

export default function PhoneScreen({ navigation }: Props) {
  const { t } = useTranslation("auth");
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
  const [phone, setPhone] = useState("+380");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      showMessage({ message: t("invalidPhone"), type: "warning" });
      return;
    }
    setLoading(true);
    try {
      const verificationId = await sendOtp(phone, recaptchaVerifier.current!);
      navigation.navigate("Otp", { verificationId });
    } catch (e: any) {
      showMessage({ message: e.message, type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.safeArea}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <Ionicons name="phone-portrait-outline" size={40} color="#007AFF" />
          </View>
          <Text style={styles.appName}>{t("phoneLogin")}</Text>
          <Text style={styles.subtitle}>{t("phoneSubtitle")}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t("phoneTitle")}</Text>
            <TextInput
              style={styles.input}
              placeholder="+380XXXXXXXXX"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSendOtp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{t("sendSms")}</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={18} color="#007AFF" />
          <Text style={styles.linkText}>{t("backToLogin")}</Text>
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
  button: {
    backgroundColor: "tomato",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
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
