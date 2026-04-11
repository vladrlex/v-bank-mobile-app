import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MarketScreen from "../../screens/MarketScreen/MarketScreen";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();

export default function MarketStack() {
  const { t } = useTranslation("market");

  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#1A1A1A",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#f5f5f5" },
        headerTitleStyle: { fontWeight: "700", fontSize: 18 },
      }}
    >
      <Stack.Screen
        name="MarketMain"
        component={MarketScreen}
        options={{ title: t("header") }}
      />
    </Stack.Navigator>
  );
}
