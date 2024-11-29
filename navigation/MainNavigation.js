import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import colors from "../utils/colors"; // Importa los colores
import { CardStyleInterpolators } from "@react-navigation/stack";

// Screens
import MeetingScreen from "../screens/MeetingScreen";
import TabsNavigation from "./TabsNavigation";
import BenefitScreen from "../screens/BenefitScreen";
import ServiceScreen from "../screens/ServiceScreen";
import ContactScreen from "../screens/ContactScreen";
import AddServiceScreen from "../screens/AddServiceScreen";
import AddContactScreen from "../screens/AddContactScreen";
import AddMeetingScreen from "../screens/AddMeetingScreen";
// Init Stack
const Stack = createNativeStackNavigator();

const screenOptions = {
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
      <Image source={require("../assets/icons/menu.png")} style={styles.icon} />
    </TouchableOpacity>
  ),
  // Configuración de animaciones
  gestureEnabled: true,
  gestureDirection: "horizontal",
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  transitionSpec: {
    open: {
      animation: "spring",
      config: {
        damping: 20,
        mass: 0.8,
        stiffness: 150,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
      },
    },
    close: {
      animation: "spring",
      config: {
        damping: 20,
        mass: 0.8,
        stiffness: 150,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
      },
    },
  },
};

export default function MainNavigation() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName="Main">
        <Stack.Screen name="Meetings" component={MeetingScreen} />
        <Stack.Screen name="Main" component={TabsNavigation} />
        <Stack.Screen name="Benefit" component={BenefitScreen} />
        <Stack.Screen name="Service" component={ServiceScreen} />
        <Stack.Screen name="Contacts" component={ContactScreen} />
        <Stack.Screen
          name="AddService"
          component={AddServiceScreen}
          options={{
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
            gestureDirection: "vertical",
            transitionSpec: {
              open: {
                animation: "spring",
                config: {
                  damping: 25,
                  mass: 0.8,
                  stiffness: 170,
                  overshootClamping: false,
                  restDisplacementThreshold: 0.01,
                  restSpeedThreshold: 0.01,
                },
              },
              close: {
                animation: "spring",
                config: {
                  damping: 25,
                  mass: 0.8,
                  stiffness: 170,
                  overshootClamping: false,
                  restDisplacementThreshold: 0.01,
                  restSpeedThreshold: 0.01,
                },
              },
            },
          }}
        />
        <Stack.Screen
          name="AddContact"
          component={AddContactScreen}
          options={{
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
            gestureDirection: "vertical",
            transitionSpec: {
              open: {
                animation: "spring",
                config: {
                  damping: 25,
                  mass: 0.8,
                  stiffness: 170,
                  overshootClamping: false,
                  restDisplacementThreshold: 0.01,
                  restSpeedThreshold: 0.01,
                },
              },
              close: {
                animation: "spring",
                config: {
                  damping: 25,
                  mass: 0.8,
                  stiffness: 170,
                  overshootClamping: false,
                  restDisplacementThreshold: 0.01,
                  restSpeedThreshold: 0.01,
                },
              },
            },
          }}
        />
        <Stack.Screen
          name="AddMeeting"
          component={AddMeetingScreen}
          options={{
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
            gestureDirection: "vertical",
            transitionSpec: {
              open: {
                animation: "spring",
                config: {
                  damping: 25,
                  mass: 0.8,
                  stiffness: 170,
                  overshootClamping: false,
                  restDisplacementThreshold: 0.01,
                  restSpeedThreshold: 0.01,
                },
              },
              close: {
                animation: "spring",
                config: {
                  damping: 25,
                  mass: 0.8,
                  stiffness: 170,
                  overshootClamping: false,
                  restDisplacementThreshold: 0.01,
                  restSpeedThreshold: 0.01,
                },
              },
            },
          }}
        />
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
