import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import colors from "../utils/colors"; // Importa los colores

// Screens
import MeetingScreen from "../screens/MeetingScreen";
import TabsNavigation from "./TabsNavigation";
import BenefitScreen from "../screens/BenefitScreen";
import ServiceScreen from "../screens/ServiceScreen";
import ContactScreen from "../screens/ContactScreen";
// Init Stack
const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.bg100, // Usa el color de fondo
          },
          headerTitleAlign: "center",
          headerTitle: () => <Text></Text>,
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 15 }}>
              <Text style={styles.headerTitle}>NailRoom</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}>
              <Image
                source={require("../assets/icons/menu.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          ),
        }}
        initialRouteName="Main"
      >
        <Stack.Screen name="Meetings" component={MeetingScreen} />
        <Stack.Screen name="Main" component={TabsNavigation} />
        <Stack.Screen name="Benefit" component={BenefitScreen} />
        <Stack.Screen name="Service" component={ServiceScreen} />
        <Stack.Screen name="Contacts" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text100, // Usa el color del texto
    fontFamily: "sans-serif-condensed",
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.text100, // Asegúrate de que los íconos sean visibles
  },
});
