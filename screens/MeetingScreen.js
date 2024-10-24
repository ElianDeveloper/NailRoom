import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function MeetingScreen() {
  const [selectedDay, setSelectedDay] = useState("Sunday");

  const meetings = [
    { id: "1", title: "Turno A", day: "Monday", time: "10:00 AM" },
    { id: "2", title: "Turno B", day: "Tuesday", time: "11:00 AM" },
    { id: "3", title: "Turno C", day: "Wednesday", time: "12:00 PM" },
    { id: "4", title: "Turno D", day: "Thursday", time: "1:00 PM" },
    { id: "5", title: "Turno E", day: "Friday", time: "2:00 PM" },
    { id: "6", title: "Turno F", day: "Saturday", time: "3:00 PM" },
    { id: "7", title: "Turno G", day: "Sunday", time: "4:00 PM" },
    { id: "8", title: "Turno H", day: "Sunday", time: "4:00 PM" },
    { id: "9", title: "Turno I", day: "Sunday", time: "4:00 PM" },
    { id: "10", title: "Turno J", day: "Sunday", time: "4:00 PM" },
  ];

  const filteredMeetings = meetings.filter(
    (meeting) => meeting.day === selectedDay
  );
  const nextMeeting = filteredMeetings[0];

  return (
    <SafeAreaView style={styles.container}>
      {nextMeeting && (
        <View style={styles.nextMeetingCard}>
          <Text style={styles.nextMeetingTitle}>Próximo Turno</Text>
          <Text style={styles.meetingDetails}>{nextMeeting.title}</Text>
          <Text style={styles.meetingDetails}>{nextMeeting.time}</Text>
        </View>
      )}

      <FlatList
        ListHeaderComponent={
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Filtrar por día:</Text>
            <Picker
              selectedValue={selectedDay}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedDay(itemValue)}
            >
              <Picker.Item label="Domingo" value="Sunday" />
              <Picker.Item label="Lunes" value="Monday" />
              <Picker.Item label="Martes" value="Tuesday" />
              <Picker.Item label="Miercoles" value="Wednesday" />
              <Picker.Item label="Jueves" value="Thursday" />
              <Picker.Item label="Viernes" value="Friday" />
              <Picker.Item label="Sábado" value="Saturday" />
            </Picker>
          </View>
        }
        data={filteredMeetings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.meetingCard}>
            <Text style={styles.meetingTitle}>{item.title}</Text>
            <Text style={styles.meetingDetails}>{item.time}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  nextMeetingCard: {
    backgroundColor: "#4A90E2",
    width: width * 0.9,
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: "center",
  },
  nextMeetingTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  meetingCard: {
    backgroundColor: "#fff",
    width: width * 0.9,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  meetingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  meetingDetails: {
    fontSize: 16,
    color: "#666",
  },
  pickerContainer: {
    width: width * 0.9,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});
