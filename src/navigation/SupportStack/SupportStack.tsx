import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import SupportScreen from "../../screens/SupportScreen/SupportScreen";

const Stack = createNativeStackNavigator();

export default function SupportStack() {
  const { t } = useTranslation("support");

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
        name="SupportMain"
        component={SupportScreen}
        options={{ title: t("header") }}
      />
    </Stack.Navigator>
  );
}
