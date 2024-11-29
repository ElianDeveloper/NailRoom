import React from 'react';
import { View, StyleSheet } from 'react-native';
import FormInput from './FormInput';
import colors from '../../utils/colors';

export default function ContactForm({ formData, setFormData, errors }) {
  return (
    <View style={styles.form}>
      <FormInput
        label="Nombre"
        value={formData.name}
        onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
        placeholder="Ingresa el nombre"
        error={errors.name}
        icon="account"
      />
      
      <FormInput
        label="Teléfono"
        value={formData.phone}
        onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
        placeholder="Ingresa el teléfono"
        keyboardType="phone-pad"
        error={errors.phone}
        icon="phone"
      />
      
      <FormInput
        label="Notas"
        value={formData.notes}
        onChangeText={(text) => setFormData(prev => ({ ...prev, notes: text }))}
        placeholder="Agrega notas adicionales"
        multiline
        numberOfLines={4}
        icon="note-text"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 20,
  },
}); 