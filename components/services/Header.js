import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from '../../utils/colors';

export default function Header({ onAddPress }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Servicios</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={onAddPress}
      >
        <MaterialCommunityIcons name="plus" size={24} color={colors.bg100} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text100,
  },
  addButton: {
    backgroundColor: colors.primary100,
    padding: 10,
    borderRadius: 12,
    elevation: 2,
    shadowColor: colors.primary100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
}); 