import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite/next';
import colors from '../../utils/colors';
import { fetchClients } from '../../database/querys';

export default function ClientPicker({ selectedClient, onSelectClient }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClientData, setSelectedClientData] = useState(null);
  const db = useSQLiteContext();

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const results = await fetchClients(db);
      setClients(results);
      if (selectedClient) {
        const client = results.find(c => c.id === selectedClient);
        setSelectedClientData(client);
      }
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectClient = (client) => {
    setSelectedClientData(client);
    onSelectClient(client.id);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cliente</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <MaterialCommunityIcons
          name="account"
          size={24}
          color={colors.primary100}
        />
        <Text style={styles.selectorText}>
          {selectedClientData ? selectedClientData.name : 'Seleccionar Cliente'}
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
              <Text style={styles.modalTitle}>Seleccionar Cliente</Text>
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

            <TextInput
              style={styles.searchInput}
              placeholder="Buscar cliente..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colors.text200}
            />

            <FlatList
              data={filteredClients}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.clientItem,
                    selectedClientData?.id === item.id && styles.selectedItem
                  ]}
                  onPress={() => handleSelectClient(item)}
                >
                  <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>
                      {item.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.clientInfo}>
                    <Text style={styles.clientName}>{item.name}</Text>
                    <Text style={styles.clientPhone}>{item.phone}</Text>
                  </View>
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
  searchInput: {
    backgroundColor: colors.bg200,
    margin: 20,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    color: colors.text100,
  },
  clientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.text200}10`,
  },
  selectedItem: {
    backgroundColor: `${colors.primary100}15`,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: colors.bg100,
    fontSize: 18,
    fontWeight: 'bold',
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text100,
  },
  clientPhone: {
    fontSize: 14,
    color: colors.text200,
  },
});