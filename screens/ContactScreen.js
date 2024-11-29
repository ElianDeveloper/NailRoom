import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite/next";
import colors from "../utils/colors";
import { fetchClients, deleteClient } from "../database/querys";

const ContactScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = useSQLiteContext();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadContacts();
    });

    return unsubscribe;
  }, [navigation]);

  const loadContacts = async () => {
    try {
      const results = await fetchClients(db);
      setContacts(results);
    } catch (error) {
      console.error("Error loading contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (contact) => {
    navigation.navigate("AddContact", {
      contact,
      isEditing: true,
    });
  };

  const handleDelete = (contact) => {
    Alert.alert(
      "Eliminar Contacto",
      `¿Estás seguro de que deseas eliminar a ${contact.name}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteClient(db, contact.id);
              loadContacts(); // Recargar la lista
            } catch (error) {
              console.error("Error deleting contact:", error);
              Alert.alert("Error", "No se pudo eliminar el contacto");
            }
          },
        },
      ]
    );
  };

  const renderContact = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.mainContent}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          {item.notes && (
            <View style={styles.noteDot}>
              <MaterialCommunityIcons
                name="note-text"
                size={12}
                color={colors.bg100}
              />
            </View>
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
          {item.notes && (
            <View style={styles.notesContainer}>
              <MaterialCommunityIcons
                name="note-text-outline"
                size={16}
                color={colors.text200}
                style={styles.noteIcon}
              />
              <Text style={styles.notes} numberOfLines={2}>
                {item.notes}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.iconButton, styles.editButton]}
            onPress={() => handleEdit(item)}
          >
            <MaterialCommunityIcons
              name="pencil"
              size={20}
              color={colors.primary100}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, styles.deleteButton]}
            onPress={() => handleDelete(item)}
          >
            <MaterialCommunityIcons
              name="trash-can"
              size={20}
              color={colors.error}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary100} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contactos</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddContact")}
        >
          <MaterialCommunityIcons
            name="account-plus"
            size={24}
            color={colors.bg100}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bg100,
  },
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
  list: {
    padding: 20,
  },
  card: {
    backgroundColor: colors.bg200,
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: colors.accent200,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  mainContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary100,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.bg100,
  },
  noteDot: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: colors.accent200,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.bg200,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text100,
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: colors.text200,
    marginBottom: 6,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: `${colors.text200}20`,
  },
  noteIcon: {
    marginRight: 6,
    marginTop: 2,
  },
  notes: {
    flex: 1,
    fontSize: 14,
    color: colors.text200,
    lineHeight: 18,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 10,
    alignSelf: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: `${colors.primary100}15`,
  },
  editButton: {
    backgroundColor: `${colors.primary100}15`,
  },
  deleteButton: {
    backgroundColor: `${colors.error}15`,
  },
});

export default ContactScreen;
