import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

// Get the width of the screen
const { width } = Dimensions.get("window");

// Import colors
import colors from "../utils/colors";

export default function MeetingScreen() {
  const [selectedDay, setSelectedDay] = useState("Domingo");

  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const meetings = [
    { id: "1", title: "Reunión A", day: "Lunes", time: "10:00 AM" },
    { id: "2", title: "Reunión B", day: "Martes", time: "11:00 AM" },
    { id: "3", title: "Reunión C", day: "Miercoles", time: "12:00 PM" },
    { id: "4", title: "Reunión D", day: "Jueves", time: "1:00 PM" },
    { id: "5", title: "Reunión E", day: "Viernes", time: "2:00 PM" },
    { id: "6", title: "Reunión F", day: "Sábado", time: "3:00 PM" },
    { id: "7", title: "Reunión G", day: "Domingo", time: "4:00 PM" },
    { id: "8", title: "Reunión H", day: "Lunes", time: "5:00 PM" },
    { id: "9", title: "Reunión I", day: "Martes", time: "6:00 PM" },
    { id: "10", title: "Reunión J", day: "Miercoles", time: "7:00 PM" },
    { id: "11", title: "Reunión K", day: "Jueves", time: "8:00 PM" },
    { id: "12", title: "Reunión L", day: "Viernes", time: "9:00 PM" },
    { id: "13", title: "Reunión M", day: "Sábado", time: "10:00 PM" },
    { id: "14", title: "Reunión N", day: "Domingo", time: "11:00 PM" },
  ];

  const filteredMeetings = meetings.filter(
    (meeting) => meeting.day === selectedDay
  );
  const nextMeeting = filteredMeetings[0];

  return (
    <SafeAreaView style={styles.container}>
      {/* Próxima reunión */}
      {nextMeeting && (
        <LinearGradient
          colors={[colors.primary100, colors.primary200, colors.primary300]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.nextMeetingCard}
        >
          <Text style={styles.nextMeetingTitle}>Próximo Truno</Text>
          <Text style={styles.meetingDetails}>{nextMeeting.title}</Text>
          <Text style={styles.meetingDetails}>{nextMeeting.time}</Text>
        </LinearGradient>
      )}

      {/* Filtro por día */}
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.daySelector}
      >
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayCard,
              selectedDay === day && styles.selectedDayCard,
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}

      {/* Listado de reuniones */}
      <FlatList
        ListHeaderComponent={() => (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.daySelector}
          >
            {daysOfWeek.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayCard,
                  selectedDay === day && styles.selectedDayCard,
                ]}
                onPress={() => setSelectedDay(day)}
              >
                <Text style={styles.dayText}>{day}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
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
    backgroundColor: colors.bg100, // Fondo de la pantalla
    alignItems: "center",
    justifyContent: "flex-start",
  },
  nextMeetingCard: {
    width: width * 0.9,
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: "center",
    shadowColor: colors.accent200, // Sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  nextMeetingTitle: {
    fontSize: 20,
    color: colors.text100, // Color del texto
    fontWeight: "bold",
    marginBottom: 10,
  },
  meetingCard: {
    backgroundColor: colors.bg200, // Fondo de las tarjetas de reuniones
    width: width * 0.9,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: colors.accent200, // Sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  meetingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text100, // Color del texto
  },
  meetingDetails: {
    fontSize: 16,
    color: colors.text200, // Color del texto
  },
  daySelector: {
    marginVertical: 10,
  },
  dayCard: {
    backgroundColor: colors.bg300,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDayCard: {
    backgroundColor: colors.primary200,
  },
  dayText: {
    color: colors.text100, // Color del texto
    fontWeight: "bold",
    fontSize: 14,
  },
});
