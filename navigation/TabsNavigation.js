import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import colors from "../utils/colors";
import CustomTabBarButton from "../components/CustomTabBarButton";

//Screens
import MeetingScreen from "../screens/MeetingScreen";
import BenefitScreen from "../screens/BenefitScreen";
import ServiceScreen from "../screens/ServiceScreen";
import ContactScreen from "../screens/ContactScreen";

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
                  tintColor: focused ? colors.primary100 : colors.text200,
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
                source={require("../assets/icons/stats.png")}
                style={{
                  width: 26,
                  height: 26,
                  tintColor: focused ? colors.primary100 : colors.text200,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Add"
        component={ServiceScreen}
        options={{
          tabBarIcon: () => <CustomTabBarButton />,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Service"
        component={ServiceScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/services.png")}
                style={{
                  width: 26,
                  height: 26,
                  tintColor: focused ? colors.primary100 : colors.text200,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/contact.png")}
                style={{
                  width: 26,
                  height: 26,
                  tintColor: focused ? colors.primary100 : colors.text200,
                }}
              />
            </View>
          ),
        }}
      />
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
    backgroundColor: colors.bg200,
    borderTopColor: "transparent",
    shadowColor: colors.accent200,
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default TabsNavigation;
