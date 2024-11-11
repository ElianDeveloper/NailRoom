import React, { useState } from "react";
import {
  Animated,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import colors from "../utils/colors";
import AddMeetingModal from "./AddMeetingModal";

export default function CustomTabBarButton({ children, onPress }) {
  const [animation] = useState(new Animated.Value(0));
  const [isOpen, setIsOpen] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
  };

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const firstButtonStyle = {
    transform: [
      { scale: animation },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -60],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -60],
        }),
      },
    ],
  };

  const secondButtonStyle = {
    transform: [
      { scale: animation },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 60],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -60],
        }),
      },
    ],
  };

  const thirdButtonStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -100],
        }),
      },
    ],
  };

  return (
    <View style={styles.customTabContainer}>
      <AddMeetingModal
        visible={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
      />

      <Animated.View style={[styles.floatingButton, thirdButtonStyle]}>
        <TouchableOpacity onPress={() => setShowAppointmentModal(true)}>
          <View style={[styles.button, { backgroundColor: colors.primary100 }]}>
            <Image
              source={require("../assets/icons/calendar.png")}
              style={[styles.buttonIcon, { tintColor: colors.bg100 }]}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.floatingButton, secondButtonStyle]}>
        <TouchableOpacity onPress={() => console.log("Button 2")}>
          <View style={[styles.button, { backgroundColor: colors.primary100 }]}>
            <Image
              source={require("../assets/icons/add-contact.png")}
              style={[styles.buttonIcon, { tintColor: colors.bg100 }]}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.floatingButton, firstButtonStyle]}>
        <TouchableOpacity onPress={() => console.log("Button 1")}>
          <View style={[styles.button, { backgroundColor: colors.primary100 }]}>
            <Image
              source={require("../assets/icons/add-services.png")}
              style={[styles.buttonIcon, { tintColor: colors.bg100 }]}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity onPress={toggleMenu}>
        <View style={styles.mainButton}>
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <Image
              source={require("../assets/icons/plus.png")}
              style={[styles.buttonIcon, { tintColor: colors.bg100 }]}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  customTabContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: colors.accent200,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.accent200,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonIcon: {
    width: 24,
    height: 24,
  },
  floatingButton: {
    position: "absolute",
    alignItems: "center",
  },
});
