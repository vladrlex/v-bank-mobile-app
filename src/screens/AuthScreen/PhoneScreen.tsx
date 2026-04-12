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
import { sendOtp } from "../../services/authService";
import { AuthStackParamList } from "../../navigation/AuthStack/AuthStack";
import { firebaseConfig } from "../../services/firebaseConfig";

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, "Phone">;
};

export default function PhoneScreen({ navigation }: Props) {
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
  const [phone, setPhone] = useState("+380");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      showMessage({ message: "Введіть коректний номер", type: "warning" });
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
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />

      <Text style={styles.title}>Вхід через телефон</Text>
      <Text style={styles.subtitle}>Введіть номер у форматі +380XXXXXXXXX</Text>

      <TextInput
        style={styles.input}
        placeholder="+380XXXXXXXXX"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSendOtp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Надіслати SMS</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "tomato",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
