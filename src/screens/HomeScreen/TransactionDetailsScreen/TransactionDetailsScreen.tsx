import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import {
  HomeStackParamList,
  HomeStackRoutes,
} from "../../../types/HomeStackRoutes";
import { MOCK_TRANSACTIONS } from "../../../data/MockData";

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  HomeStackRoutes.TRANSACTION_DETAILS
>;

type DetailsScreenRouteProp = RouteProp<
  HomeStackParamList,
  HomeStackRoutes.TRANSACTION_DETAILS
>;

export default function TransactionDetailsScreen() {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const route = useRoute<DetailsScreenRouteProp>();
  const { t } = useTranslation(["transactionDetails"]);

  const { transactionId } = route.params;

  const transaction = MOCK_TRANSACTIONS.find(
    (item) => item.id === transactionId
  );

  if (!transaction) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={80} color="#D32F2F" />

          <Text style={styles.errorText}>
            {t("transactionDetails:errorTitle")}
          </Text>

          <Text style={styles.subText}>
            {t("transactionDetails:errorMessage")}
          </Text>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate(HomeStackRoutes.HOME)}
          >
            <Text style={styles.homeButtonText}>
              {t("transactionDetails:homeButton")}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
          <Text style={styles.headerBackText}>
            {t("transactionDetails:backButton")}
          </Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{transaction.title}</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            {t("transactionDetails:sumLabel")}
          </Text>
          <Text
            style={[
              styles.amountText,
              {
                color: transaction.amount.includes("-") ? "#D32F2F" : "#388E3C",
              },
            ]}
          >
            {transaction.amount}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            {t("transactionDetails:dateLabel")}
          </Text>
          <Text style={styles.infoText}>{transaction.date}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            {t("transactionDetails:categoryLabel")}
          </Text>
          <Text style={styles.infoText}>{transaction.category}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            {t("transactionDetails:idLabel")}
          </Text>
          <Text style={styles.transactionId}>{transaction.id}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
  },
  subText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 22,
  },
  homeButton: {
    backgroundColor: "#333",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 10,
  },
  headerBackText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  amountText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
  transactionId: {
    fontSize: 14,
    color: "#aaa",
    fontFamily: "monospace",
  },
});
