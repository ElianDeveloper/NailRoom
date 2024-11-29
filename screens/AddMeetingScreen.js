import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSQLiteContext } from "expo-sqlite/next";
import colors from "../utils/colors";
import ClientPicker from "../components/meetings/ClientPicker";
import ServicePicker from "../components/meetings/ServicePicker";
import { insertMeeting } from "../database/querys";

export default function AddMeetingScreen({ navigation }) {
  const db = useSQLiteContext();
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [formData, setFormData] = useState({
    date: new Date(),
    time: new Date(),
    clientId: null,
    serviceTypeId: null,
    nailTypeId: null,
    price: 0,
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      await insertMeeting(
        db,
        formData.date.toISOString().split("T")[0],
        formData.time.toLocaleTimeString(),
        formData.clientId
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la cita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.text100}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Nueva Cita</Text>
        <TouchableOpacity
          onPress={handleSave}
          style={styles.saveButton}
          disabled={loading}
        >
          <MaterialCommunityIcons name="check" size={24} color={colors.bg100} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Fecha y Hora */}
        <View style={styles.dateTimeContainer}>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowDatePicker(true)}
          >
            <MaterialCommunityIcons
              name="calendar"
              size={24}
              color={colors.primary100}
            />
            <Text style={styles.dateTimeText}>
              {formData.date.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowTimePicker(true)}
          >
            <MaterialCommunityIcons
              name="clock"
              size={24}
              color={colors.primary100}
            />
            <Text style={styles.dateTimeText}>
              {formData.time.toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Selectores */}
        <ClientPicker
          selectedClient={formData.clientId}
          onSelectClient={(id) =>
            setFormData((prev) => ({ ...prev, clientId: id }))
          }
        />

        <ServicePicker
          selectedService={formData.serviceTypeId}
          selectedNailType={formData.nailTypeId}
          onSelectService={(serviceId, nailTypeId, price) =>
            setFormData((prev) => ({
              ...prev,
              serviceTypeId: serviceId,
              nailTypeId: nailTypeId,
              price: price,
            }))
          }
        />

        {/* Resumen de Precio */}
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total:</Text>
          <Text style={styles.priceValue}>${formData.price.toFixed(2)}</Text>
        </View>

        {/* Date/Time Pickers */}
        {showDatePicker && (
          <DateTimePicker
            value={formData.date}
            mode="date"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setFormData((prev) => ({ ...prev, date: selectedDate }));
              }
            }}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={formData.time}
            mode="time"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) {
                setFormData((prev) => ({ ...prev, time: selectedTime }));
              }
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.text200}20`,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: `${colors.text200}15`,
  },
  saveButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.primary100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text100,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bg200,
    padding: 15,
    borderRadius: 12,
    width: "48%",
  },
  dateTimeText: {
    marginLeft: 10,
    color: colors.text100,
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.bg200,
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  priceLabel: {
    fontSize: 18,
    color: colors.text100,
    fontWeight: "bold",
  },
  priceValue: {
    fontSize: 24,
    color: colors.primary100,
    fontWeight: "bold",
  },
});
