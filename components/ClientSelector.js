import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../utils/colors";

export default function ClientSelector() {
  const [selectedClient, setSelectedClient] = useState(null);

  const clientesEjemplo = [
    { id: 1, name: 'María González', telefono: '555-1234' },
    { id: 2, name: 'Juan Pérez', telefono: '555-5678' },
    { id: 3, name: 'Ana Rodríguez', telefono: '555-9012' },
    { id: 4, name: 'Carlos López', telefono: '555-3456' },
    { id: 5, name: 'Laura Martínez', telefono: '555-7890' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cliente</Text>
      <TouchableOpacity 
        style={styles.selector}
        onPress={() => {
          // Aquí irá la lógica para mostrar la lista de clientes
          console.log(clientesEjemplo);
        }}
      >
        <Text style={styles.selectorText}>
          {selectedClient ? selectedClient.name : 'Seleccionar cliente'}
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