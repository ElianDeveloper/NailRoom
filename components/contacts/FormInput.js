import React from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../utils/colors';

export default function FormInput({
  label,
  value,
  onChangeText,
  error,
  icon,
  ...props
}) {
  const shakeAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [error]);

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: shakeAnimation }] },
      ]}
    >
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={colors.primary100}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.text200}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: colors.text100,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${colors.primary100}30`,
    paddingHorizontal: 12,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: colors.text100,
    fontSize: 16,
    paddingVertical: 12,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 4,
  },
}); 