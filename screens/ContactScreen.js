import { StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../utils/colors";

const ContactScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: colors.text100 }}>ContactScreen</Text>
    </SafeAreaView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg100, // Fondo de la pantalla
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
