import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "ua", label: "Українська", flag: "🇺🇦" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

type Props = {
  compact?: boolean;
  inline?: boolean;
};

export default function LanguageSwitcher({
  compact = false,
  inline = false,
}: Props) {
  const { i18n } = useTranslation();
  const [visible, setVisible] = useState(false);

  const currentLang =
    LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    setVisible(false);
  };

  return (
    <>
      {compact ? (
        <TouchableOpacity
          style={styles.compactTrigger}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.compactFlag}>{currentLang.flag}</Text>
        </TouchableOpacity>
      ) : inline ? (
        <TouchableOpacity
          style={styles.inlineTrigger}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.flag}>{currentLang.flag}</Text>
          <Text style={styles.inlineTriggerText}>{currentLang.label}</Text>
          <Ionicons name="chevron-down-outline" size={16} color="#888" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.trigger}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.flag}>{currentLang.flag}</Text>
          <Text style={styles.triggerText}>{currentLang.label}</Text>
          <Ionicons name="chevron-down-outline" size={16} color="#888" />
        </TouchableOpacity>
      )}

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Оберіть мову</Text>
            <FlatList
              data={LANGUAGES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.code === i18n.language && styles.optionActive,
                  ]}
                  onPress={() => handleSelect(item.code)}
                >
                  <Text style={styles.flag}>{item.flag}</Text>
                  <Text
                    style={[
                      styles.optionText,
                      item.code === i18n.language && styles.optionTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.code === i18n.language && (
                    <Ionicons name="checkmark" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  compactTrigger: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  compactFlag: { fontSize: 22 },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    gap: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  triggerText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  inlineTrigger: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  inlineTriggerText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  flag: { fontSize: 18 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 10,
    marginBottom: 8,
  },
  optionActive: { backgroundColor: "#E6F0FF" },
  optionText: { fontSize: 16, color: "#333", flex: 1 },
  optionTextActive: { color: "#007AFF", fontWeight: "600" },
});
