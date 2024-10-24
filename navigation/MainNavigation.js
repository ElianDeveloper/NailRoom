import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

// Screens
import MeetingScreen from "../screens/MeetingScreen";
import TabsNavigation from "./TabsNavigation";
import BenefitScreen from "../screens/BenefitScreen";

// Init Stack
const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#1f2937", // Fondo del header
          },
          headerTitle: () => (
            <Text style={styles.headerTitle}>NailRoom</Text>
          ),
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 15 }}>
              <Image
                source={require("../assets/icons/home3.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}>
              <Image
                source={require("../assets/icons/ingreso.png")}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF", // Color del texto
    fontFamily: "sans-serif-condensed", // Cambia esto a una fuente que prefieras
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF", // Asegúrate de que los íconos sean visibles
  },
});
