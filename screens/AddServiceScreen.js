import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite/next";
import colors from "../utils/colors";
import {
  insertServiceType,
  insertNailType,
  insertServiceTypeConfig,
  fetchNailTypes,
  deleteNailType,
  deleteServiceTypeConfig,
  updateServiceType,
  fetchServiceTypeConfigsByService,
} from "../database/querys";

const DEFAULT_NAIL_TYPES = [
  "Cortas",
  "Semicortas",
  "Medianas",
  "Largas",
  "Extralargas",
];

export default function AddServiceScreen({ navigation, route }) {
  const isEditing = route.params?.isEditing || false;
  const serviceToEdit = route.params?.serviceToEdit;

  const db = useSQLiteContext();
  const [serviceType, setServiceType] = useState("");
  const [nailTypes, setNailTypes] = useState([]);
  const [prices, setPrices] = useState([]);
  const [newNailType, setNewNailType] = useState("");
  const [showAddNew, setShowAddNew] = useState(false);

  useEffect(() => {
    initializeNailTypes();
  }, []);

  useEffect(() => {
    if (isEditing && serviceToEdit) {
      setServiceType(serviceToEdit.service_type);
      const existingPrices = serviceToEdit.prices.map((price) => ({
        nailTypeId: price.nail_type_id,
        price: price.price,
      }));
      setPrices(existingPrices);
    }
  }, [isEditing, serviceToEdit]);

  const initializeNailTypes = async () => {
    try {
      const existingTypes = await fetchNailTypes(db);
      const defaultTypes = [];

      // Crear tipos predeterminados si no existen
      for (const typeName of DEFAULT_NAIL_TYPES) {
        const existingType = existingTypes.find((t) => t.name === typeName);
        if (existingType) {
          defaultTypes.push(existingType);
        } else {
          const id = await insertNailType(db, typeName);
          if (id) {
            defaultTypes.push({ id, name: typeName });
          }
        }
      }

      const validTypes = defaultTypes.filter((type) => type.id != null);
      setNailTypes(validTypes);

      // Inicializar precios vacíos
      const initialPrices = validTypes.map((type) => ({
        nailTypeId: type.id,
        price: "",
      }));
      setPrices(initialPrices);

      // Si estamos editando, actualizar con los precios existentes
      if (isEditing && serviceToEdit) {
        const existingPrices = serviceToEdit.prices.map((price) => ({
          nailTypeId: price.nail_type_id,
          price: price.price,
        }));

        setPrices(
          initialPrices.map((price) => {
            const existingPrice = existingPrices.find(
              (ep) => ep.nailTypeId === price.nailTypeId
            );
            return existingPrice || price;
          })
        );
      }
    } catch (error) {
      console.error("Error initializing nail types:", error);
    }
  };

  const handleAddNailType = async () => {
    if (newNailType.trim()) {
      try {
        const id = await insertNailType(db, newNailType.trim());
        setNailTypes([...nailTypes, { id, name: newNailType.trim() }]);
        setPrices([...prices, { nailTypeId: id, price: "" }]);
        setNewNailType("");
        setShowAddNew(false);
      } catch (error) {
        console.error("Error adding nail type:", error);
      }
    }
  };

  const handlePriceChange = (nailTypeId, value) => {
    setPrices(
      prices.map((p) =>
        p.nailTypeId === nailTypeId ? { ...p, price: value } : p
      )
    );
  };

  const handleDeleteNailType = async (nailTypeId) => {
    try {
      const typeToDelete = nailTypes.find((t) => t.id === nailTypeId);
      if (DEFAULT_NAIL_TYPES.includes(typeToDelete.name)) {
        // No permitir eliminar tipos predeterminados
        return;
      }
      setNailTypes(nailTypes.filter((type) => type.id !== nailTypeId));
      setPrices(prices.filter((price) => price.nailTypeId !== nailTypeId));
      await deleteNailType(db, nailTypeId);
    } catch (error) {
      console.error("Error deleting nail type:", error);
    }
  };

  const handleSave = async () => {
    if (!serviceType.trim()) {
      console.warn("No se puede guardar un servicio sin nombre");
      return;
    }

    try {
      if (isEditing) {
        // Actualizar servicio existente
        await updateServiceType(db, serviceToEdit.id, serviceType);

        // Eliminar configuraciones anteriores
        const existingConfigs = await fetchServiceTypeConfigsByService(
          db,
          serviceToEdit.id
        );
        await Promise.all(
          existingConfigs.map((config) =>
            deleteServiceTypeConfig(db, serviceToEdit.id, config.nail_type_id)
          )
        );

        // Insertar nuevas configuraciones
        await Promise.all(
          prices.map(async (priceConfig) => {
            if (priceConfig.price) {
              await insertServiceTypeConfig(
                db,
                serviceToEdit.id,
                priceConfig.nailTypeId,
                parseFloat(priceConfig.price)
              );
            }
          })
        );
      } else {
        // Crear nuevo servicio
        const serviceTypeId = await insertServiceType(db, serviceType);
        await Promise.all(
          prices.map(async (priceConfig) => {
            if (priceConfig.price) {
              await insertServiceTypeConfig(
                db,
                serviceTypeId,
                priceConfig.nailTypeId,
                parseFloat(priceConfig.price)
              );
            }
          })
        );
      }

      navigation.goBack();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.text100}
          />
        </TouchableOpacity>
        <Text style={styles.title}>
          {isEditing ? "Editar Servicio" : "Nuevo Servicio"}
        </Text>
        <TouchableOpacity
          onPress={handleSave}
          style={styles.saveButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons
            name="check"
            size={24}
            color={colors.primary100}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Tipo de Servicio</Text>
        <TextInput
          style={styles.input}
          value={serviceType}
          onChangeText={setServiceType}
          placeholder="Ej: Base Ruber"
          placeholderTextColor={colors.text200}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipos de Uñas y Precios</Text>
          {nailTypes
            .filter((type) => type.id != null)
            .map((type) => (
              <View key={`nail-type-${type.id}`} style={styles.priceRow}>
                <View style={styles.nailTypeContainer}>
                  <Text style={styles.nailType}>{type.name}</Text>
                  {!DEFAULT_NAIL_TYPES.includes(type.name) && (
                    <TouchableOpacity
                      onPress={() => handleDeleteNailType(type.id)}
                      style={styles.deleteButton}
                    >
                      <MaterialCommunityIcons
                        name="close"
                        size={20}
                        color={colors.error}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <TextInput
                  key={`price-input-${type.id}`}
                  style={styles.priceInput}
                  value={prices.find((p) => p.nailTypeId === type.id)?.price}
                  onChangeText={(value) => handlePriceChange(type.id, value)}
                  placeholder="0.00"
                  keyboardType="numeric"
                  placeholderTextColor={colors.text200}
                />
              </View>
            ))}
        </View>

        {!showAddNew ? (
          <TouchableOpacity
            style={styles.addTypeButton}
            onPress={() => setShowAddNew(true)}
          >
            <MaterialCommunityIcons
              name="plus"
              size={20}
              color={colors.primary100}
            />
            <Text style={styles.addTypeText}>Agregar otro tipo de uña</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.addNailTypeContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={newNailType}
              onChangeText={setNewNailType}
              placeholder="Nuevo tipo de uña"
              placeholderTextColor={colors.text200}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddNailType}
            >
              <MaterialCommunityIcons
                name="plus"
                size={24}
                color={colors.bg100}
              />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg100,
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.bg200,
  },
  backButton: {
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text100,
  },
  saveButton: {
    padding: 12,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text100,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.bg200,
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    color: colors.text100,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text100,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: colors.bg200,
    borderRadius: 10,
    padding: 4,
  },
  nailTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  nailType: {
    fontSize: 16,
    color: colors.text100,
    flex: 1,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  priceInput: {
    backgroundColor: colors.bg300,
    padding: 12,
    borderRadius: 10,
    width: 100,
    textAlign: "right",
    color: colors.text100,
  },
  addNailTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 24,
  },
  addButton: {
    backgroundColor: colors.primary100,
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addTypeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.primary100,
    borderRadius: 10,
    borderStyle: "dashed",
  },
  addTypeText: {
    marginLeft: 8,
    color: colors.primary100,
    fontSize: 16,
  },
});
