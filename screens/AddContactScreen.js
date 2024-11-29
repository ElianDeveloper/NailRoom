import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite/next";
import colors from "../utils/colors";
import ContactForm from "../components/contacts/ContactForm";
import { insertClient, updateClient } from "../database/querys";

export default function AddContactScreen({ navigation, route }) {
  const db = useSQLiteContext();
  const [loading, setLoading] = useState(false);
  const isEditing = route.params?.isEditing || false;
  const contactToEdit = route.params?.contact;

  const [formData, setFormData] = useState({
    name: contactToEdit?.name || "",
    phone: contactToEdit?.phone || "",
    notes: contactToEdit?.notes || "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isEditing) {
        await updateClient(
          db,
          contactToEdit.id,
          formData.name.trim(),
          formData.phone.trim(),
          formData.notes.trim()
        );
      } else {
        await insertClient(
          db,
          formData.name.trim(),
          formData.phone.trim(),
          formData.notes.trim()
        );
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error saving contact:", error);
      Alert.alert("Error", "No se pudo guardar el contacto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
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
          <Text style={styles.title}>
            {isEditing ? "Editar Contacto" : "Nuevo Contacto"}
          </Text>
          <TouchableOpacity
            onPress={handleSave}
            style={styles.saveButton}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.bg100} size="small" />
            ) : (
              <MaterialCommunityIcons
                name="check"
                size={24}
                color={colors.bg100}
              />
            )}
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ContactForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg100,
  },
  keyboardView: {
    flex: 1,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text100,
  },
  saveButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.primary100,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
});
