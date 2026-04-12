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
import { confirmOtp } from "../../services/authService";
import { AuthStackParamList } from "../../navigation/AuthStack/AuthStack";

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, "Otp">;
  route: RouteProp<AuthStackParamList, "Otp">;
};

export default function OtpScreen({ route }: Props) {
  const { verificationId } = route.params;
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (otp.length !== 6) {
      showMessage({ message: "Введіть 6-значний код", type: "warning" });
      return;
    }
    setLoading(true);
    try {
      await confirmOtp(verificationId, otp);
    } catch (e: any) {
      showMessage({
        message: "Невірний код. Спробуйте ще раз.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введіть код</Text>
      <Text style={styles.subtitle}>Код надіслано на ваш номер</Text>

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
          <Text style={styles.buttonText}>Підтвердити</Text>
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
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 8,
  },
  button: {
    backgroundColor: "tomato",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
