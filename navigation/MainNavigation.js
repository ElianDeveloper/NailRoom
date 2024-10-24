import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import MeetingScreen from "../screens/MeetingScreen";
import TabsNavigation from "./TabsNavigation";
import BenefitScreen from "../screens/BenefitScreen";

//Init Stack
const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Main"
      >
        <Stack.Screen name="Meetings" component={MeetingScreen} />
        <Stack.Screen name="Main" component={TabsNavigation} />
        <Stack.Screen name="Benefit" component={BenefitScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
