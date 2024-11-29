import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite/next';
import colors from '../../utils/colors';
import { 
  fetchServiceTypes, 
  fetchNailTypes,
  fetchServiceTypeConfigsByService 
} from '../../database/querys';

export default function ServicePicker({ 
  selectedService, 
  selectedNailType, 
  onSelectService 
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [services, setServices] = useState([]);
  const [nailTypes, setNailTypes] = useState([]);
  const [selectedServiceData, setSelectedServiceData] = useState(null);
  const [selectedNailTypeData, setSelectedNailTypeData] = useState(null);
  const [priceConfigs, setPriceConfigs] = useState([]);
  const db = useSQLiteContext();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const serviceResults = await fetchServiceTypes(db);
      const nailTypeResults = await fetchNailTypes(db);
      setServices(serviceResults);
      setNailTypes(nailTypeResults);

      if (selectedService) {
        const service = serviceResults.find(s => s.id === selectedService);
        setSelectedServiceData(service);
        loadPriceConfigs(service.id);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const loadPriceConfigs = async (serviceId) => {
    try {
      const configs = await fetchServiceTypeConfigsByService(db, serviceId);
      setPriceConfigs(configs);
    } catch (error) {
      console.error('Error loading price configs:', error);
    }
  };

  const handleSelectService = async (service) => {
    setSelectedServiceData(service);
    await loadPriceConfigs(service.id);
    setSelectedNailTypeData(null);
    onSelectService(service.id, null, 0);
  };

  const handleSelectNailType = (config) => {
    setSelectedNailTypeData(config);
    onSelectService(selectedServiceData.id, config.nail_type_id, config.price);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Servicio</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <MaterialCommunityIcons
          name="nail"
          size={24}
          color={colors.primary100}
        />
        <Text style={styles.selectorText}>
          {selectedServiceData && selectedNailTypeData
            ? `${selectedServiceData.service_type} - ${selectedNailTypeData.nail_type}`
            : 'Seleccionar Servicio'}
        </Text>
        <MaterialCommunityIcons
          name="chevron-down"
          size={24}
          color={colors.text200}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedServiceData 
                  ? 'Seleccionar Tipo de Uña' 
                  : 'Seleccionar Servicio'}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={colors.text100}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={selectedServiceData ? priceConfigs : services}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.serviceItem,
                    selectedServiceData?.id === item.id && styles.selectedItem
                  ]}
                  onPress={() => 
                    selectedServiceData 
                      ? handleSelectNailType(item)
                      : handleSelectService(item)
                  }
                >
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>
                      {selectedServiceData ? item.nail_type : item.service_type}
                    </Text>
                    {selectedServiceData && (
                      <Text style={styles.servicePrice}>
                        ${item.price.toFixed(2)}
                      </Text>
                    )}
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color={colors.text200}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text100,
    marginBottom: 8,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg200,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${colors.primary100}30`,
  },
  selectorText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.text100,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.bg100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text100,
  },
  closeButton: {
    padding: 5,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.text200}10`,
  },
  selectedItem: {
    backgroundColor: `${colors.primary100}15`,
  },
  serviceInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 16,
    color: colors.text100,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary100,
  },
});