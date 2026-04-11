import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {
  HomeStackParamList,
  HomeStackRoutes,
} from "../../../types/HomeStackRoutes";
import { MOCK_TRANSACTIONS, Transaction } from "../../../data/MockData";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type ListScreenNavigationProp = NavigationProp<HomeStackParamList>;

export default function TransactionsListScreen() {
  const navigation = useNavigation<ListScreenNavigationProp>();

  const handleTransactionPress = (transactionId: string) => {
    navigation.navigate(HomeStackRoutes.TRANSACTION_DETAILS, {
      transactionId: transactionId,
    });
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handleTransactionPress(item.id)}
    >
      <View style={[styles.iconWrapper, { backgroundColor: "#E0F8E3" }]}>
        <Ionicons name="receipt-outline" size={22} color="#34C759" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.buttonText}>{item.title}</Text>
        <Text style={styles.amountText}>{item.amount}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={MOCK_TRANSACTIONS}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
      />
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
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "500",
  },
  amountText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
});
