import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite/next";
import colors from "../utils/colors";
import {
  fetchServiceTypes,
  fetchServiceTypeConfigsByService,
  deleteServiceType,
  deleteServiceTypeConfig,
} from "../database/querys";
import ServiceCard from "../components/services/ServiceCard";
import Header from "../components/services/Header";


export default function ServiceScreen({ navigation }) {
  const db = useSQLiteContext();
  const [services, setServices] = useState([]);

  const loadServices = async () => {
    try {
      const serviceTypes = await fetchServiceTypes(db);
      const servicesWithPrices = await Promise.all(
        serviceTypes.map(async (service) => {
          const configs = await fetchServiceTypeConfigsByService(db, service.id);
          return {
            id: service.id,
            service_type: service.service_type,
            prices: configs.map((config) => ({
              type: config.nail_type,
              price: config.price,
              nail_type_id: config.nail_type_id,
            })),
          };
        })
      );

      setServices(servicesWithPrices);
    } catch (error) {
      console.error("Error loading services:", error);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadServices();
    });
    return unsubscribe;
  }, [navigation]);

  const handleEditService = (service) => {
    const formattedService = {
      id: service.id,
      service_type: service.service_type,
      prices: service.prices.map(price => ({
        nail_type_id: price.nail_type_id,
        price: price.price.toString(),
        type: price.type
      }))
    };
    
    navigation.navigate('AddService', { 
      serviceToEdit: formattedService,
      isEditing: true 
    });
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const configs = await fetchServiceTypeConfigsByService(db, serviceId);
      await Promise.all(
        configs.map(config => 
          deleteServiceTypeConfig(db, serviceId, config.nail_type_id)
        )
      );
      await deleteServiceType(db, serviceId);
      loadServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header onAddPress={() => navigation.navigate("AddService")} />
      <ScrollView
        style={styles.servicesContainer}
        showsVerticalScrollIndicator={false}
      >
        {services.map((service) => (
          <ServiceCard 
            key={service.id} 
            service={service}
            onEdit={handleEditService}
            onDelete={handleDeleteService}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg100,
  },
  servicesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
