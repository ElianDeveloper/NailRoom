import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import colors from "../../utils/colors";
import PriceRow from "./PriceRow";

// Constants
const SPRING_CONFIG = {
  damping: 20,
  mass: 0.8,
  stiffness: 150,
};

const NAIL_TYPE_ORDER = [
  "Cortas",
  "Semicortas",
  "Medianas",
  "Largas",
  "Extralargas",
];

export default function ServiceCard({ service, onEdit, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const heightAnimation = useSharedValue(0);
  const offset = useSharedValue(0);

  const resetPosition = () => {
    offset.value = withSpring(0, SPRING_CONFIG);
  };

  const handleEdit = () => {
    onEdit(service);
    resetPosition();
  };

  const handleDelete = () => {
    onDelete(service.id);
    resetPosition();
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      const newOffset = Math.min(0, Math.max(-120, e.translationX));
      offset.value = withTiming(newOffset, {
        duration: 50,
      });
    })
    .onEnd((e) => {
      if (e.translationX < -60) {
        offset.value = withSpring(-120, SPRING_CONFIG);
      } else {
        offset.value = withSpring(0, SPRING_CONFIG);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    maxHeight: withSpring(heightAnimation.value, {
      damping: 15,
      stiffness: 100,
      mass: 0.5,
    }),
    opacity: withSpring(isExpanded ? 1 : 0, {
      damping: 15,
      stiffness: 100,
    }),
  }));

  const rightActionsStyle = useAnimatedStyle(() => {
    const opacity = withSpring(offset.value < -10 ? 1 : 0, SPRING_CONFIG);

    return {
      opacity,
      transform: [
        {
          scale: withSpring(offset.value < -10 ? 1 : 0.8, SPRING_CONFIG),
        },
      ],
    };
  });

  useEffect(() => {
    heightAnimation.value = isExpanded ? 250 : 0;
  }, [isExpanded]);

  const sortedPrices = [...service.prices].sort((a, b) => {
    const indexA = NAIL_TYPE_ORDER.indexOf(a.type);
    const indexB = NAIL_TYPE_ORDER.indexOf(b.type);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <View style={styles.serviceCardContainer}>
      <Animated.View style={[styles.rightActions, rightActionsStyle]}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={handleEdit}
        >
          <MaterialCommunityIcons
            name="pencil"
            size={24}
            color={colors.text200}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <MaterialCommunityIcons
            name="trash-can"
            size={24}
            color={colors.text200}
          />
        </TouchableOpacity>
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.cardWrapper, animatedStyle]}>
          <View style={styles.serviceCard}>
            <TouchableOpacity
              style={styles.serviceHeader}
              onPress={() => setIsExpanded(!isExpanded)}
              activeOpacity={0.7}
            >
              <Text style={styles.serviceType}>{service.service_type}</Text>
              <MaterialCommunityIcons
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={24}
                color={colors.primary100}
              />
            </TouchableOpacity>

            <Animated.View
              style={[styles.pricesContainer, contentAnimatedStyle]}
            >
              {sortedPrices.map((price, index) => (
                <PriceRow
                  key={`${service.id}-${price.nail_type_id}-${index}`}
                  price={price}
                  isLast={index === sortedPrices.length - 1}
                />
              ))}
            </Animated.View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  serviceCardContainer: {
    position: "relative",
    marginBottom: 15,
    overflow: "hidden",
  },
  rightActions: {
    position: "absolute",
    right: 0,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 10,
    zIndex: 1,
  },
  actionButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginLeft: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  editButton: {
    backgroundColor: colors.bg300,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  cardWrapper: {
    width: "100%",
    backgroundColor: colors.bg200,
    borderRadius: 20,
    zIndex: 2,
  },
  serviceCard: {
    backgroundColor: colors.bg200,
    borderRadius: 20,
    overflow: "hidden",
  },
  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.bg200,
  },
  serviceType: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary100,
  },
  pricesContainer: {
    backgroundColor: colors.bg200,
    overflow: "hidden",
  },
});
