import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View, Image } from "react-native";

//Screens
import MeetingScreen from "../screens/MeetingScreen";
import BenefitScreen from "../screens/BenefitScreen";

const Tab = createBottomTabNavigator();

const TabsNavigation = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Meetings"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Meetings"
        component={MeetingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/home3.png")}
                style={{
                  width: 26,
                  height: 26,
                  tintColor: focused ? "#0AB578" : "#748c95",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Benefit"
        component={BenefitScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/gasto.png")}
                style={{
                  width: 26,
                  height: 26,
                  tintColor: focused ? "#0AB578" : "#748c95",
                }}
              />
            </View>
          ),
        }}
      />

      {/* <Tab.Screen
        name="Ingress"
        component={IngressScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/ingreso.png")}
                style={{
                  width: 26,
                  height: 26,
                  tintColor: focused ? "#0AB578" : "#748c95",
                }}
              />
            </View>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    padding: 0,
    left: 16,
    right: 16,
    bottom: 36,
    height: 60,
    borderRadius: 16,
    backgroundColor: "white",
    borderTopColor: "transparent",
    shadowColor: "black",
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabIconContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 10,
  },
  tabIcon: {
    width: 32,
    height: 32,
    //tintColor: focused ? "#e32f45" : "#748c95",
  },
});

export default TabsNavigation;
