import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SendMoneyItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  isSubItem?: boolean;
  onPress: () => void;
}

export default function SendMoneyItem({
  icon,
  title,
  subtitle,
  isSubItem = false,
  onPress,
}: SendMoneyItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.itemContainer, isSubItem && styles.subItemContainer]}
    >
      {/* Icon */}
      <View
        style={[styles.iconContainer, isSubItem && styles.subItemIconContainer]}
      >
        <Ionicons
          name={icon}
          size={isSubItem ? 20 : 22}
          color={isSubItem ? "#43474A" : "#E30600"}
        />
      </View>

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {/* Chevron */}
      <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 12,
    marginVertical: 4,
  },
  subItemContainer: {
    paddingLeft: 30,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#FEEEEE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  subItemIconContainer: {
    backgroundColor: "transparent",
    width: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#26303A",
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "400",
    color: "#6c757d",
    marginTop: 2,
  },
});
