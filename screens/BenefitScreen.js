import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../utils/colors";

export default function BenefitScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: colors.text100 }}>BenefitScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg100, // Fondo de la pantalla
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
