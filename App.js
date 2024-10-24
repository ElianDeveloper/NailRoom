import { Button, StyleSheet, Text, View } from "react-native";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { init } from "./database/db";
import { useEffect, useState } from "react";

//Models
import {
  deleteMeeting,
  fetchMeetings,
  insertMeetings,
} from "./database/models/Meetings";

export default function App() {
  return (
    <View style={styles.container}>
      <SQLiteProvider databaseName="test4.db" onInit={init}>
        <Content />
      </SQLiteProvider>
    </View>
  );
}

export function Content() {
  const db = useSQLiteContext();
  const [todos, setTodos] = useState([]);
  const [Services, setServices] = useState([]);

  const fetchServices = async () => {
    const services = await db.getAllAsync("SELECT * FROM ServiceTypes");
    setServices(services);
  };

  async function setup() {
    const result = await fetchMeetings(db);
    setTodos(result);
  }
  useEffect(() => {
    setup();
  }, []);

  async function insert() {
    const currentDate = new Date().toISOString().split("T")[0];
    insertMeetings(db, currentDate, "12:00:00");
    setup();
  }

  async function deleteMeetingA(id) {
    deleteMeeting(db, id);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  return (
    <View>
      {todos.map((todo, index) => (
        <View key={todo.id}>
          <Text>{`${todo.id} - ${todo.meeting_date} - ${todo.meeting_time}`}</Text>
          <Button
            title="DeleteMeeting"
            onPress={() => deleteMeetingA(todo.id)}
          />
        </View>
      ))}
      <Button title="Agregar" onPress={() => insert()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
