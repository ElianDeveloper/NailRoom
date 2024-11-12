import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../utils/colors';

export default function PriceRow({ price, isLast }) {
  return (
    <View
      style={[
        styles.priceRow,
        !isLast && styles.priceDivider,
      ]}
    >
      <Text style={styles.nailType}>{price.type}</Text>
      <Text style={styles.price}>${price.price.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.bg200,
  },
  priceDivider: {
    borderBottomWidth: 1,
    borderBottomColor: `${colors.primary100}20`,
  },
  nailType: {
    fontSize: 16,
    color: colors.text200,
    fontWeight: "500",
  },
  price: {
    fontSize: 16,
    color: colors.primary100,
    fontWeight: "bold",
  },
}); 