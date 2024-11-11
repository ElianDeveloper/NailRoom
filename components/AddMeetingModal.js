import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../utils/colors";
import ClientSelector from "./ClientSelector";
import ServiceSelector from "./ServiceSelector";

export default function AddMeetingModal({ visible, onClose }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Nuevo Turno</Text>

          <ScrollView style={styles.formContainer}>
            {/* Selector de Fecha */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Fecha</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>
                  {date.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Selector de Hora */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Hora</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.dateButtonText}>
                  {time.toLocaleTimeString().slice(0, 4)}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Componentes para selección de cliente y servicio */}
            <ClientSelector />
            <ServiceSelector />

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}

            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) setTime(selectedTime);
                }}
              />
            )}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={() => {
                // Aquí irá la lógica para guardar el turno
                onClose();
              }}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.bg100,
    borderRadius: 25,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary100,
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    maxHeight: "80%",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: colors.text100,
    marginBottom: 8,
  },
  dateButton: {
    backgroundColor: colors.bg200,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary100,
  },
  dateButtonText: {
    color: colors.text100,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: colors.bg200,
    borderWidth: 1,
    borderColor: colors.primary100,
  },
  saveButton: {
    backgroundColor: colors.primary100,
  },
  buttonText: {
    color: colors.text100,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
