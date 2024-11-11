import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../utils/colors";

export default function ServiceSelector() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Servicio</Text>
      <TouchableOpacity 
        style={styles.selector}
        onPress={() => {
          // Aquí irá la lógica para mostrar la lista de servicios
        }}
      >
        <Text style={styles.selectorText}>
          {selectedService ? selectedService.name : 'Seleccionar servicio'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: colors.text100,
    marginBottom: 8,
  },
  selector: {
    backgroundColor: colors.bg200,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary100,
  },
  selectorText: {
    color: colors.text100,
    fontSize: 16,
  },
});