import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { Country } from "@/hooks/query/useBankList";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CountryCardProps {
  item: Country;
  isSelected: boolean;
  onPress: () => void;
}

export default function CountryCard({
  item,
  isSelected,
  onPress,
}: CountryCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, isSelected && styles.selectedCard]}
    >
      <View style={styles.flagContainer}>
        <Image
          source={item.flag as ImageSourcePropType}
          style={styles.flag}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.nameText} numberOfLines={2}>
        {item.country}
      </Text>
      {isSelected && (
        <View style={styles.checkmarkContainer}>
          <Ionicons name="checkmark" size={10} color={COLORS.white} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    backgroundColor: COLORS.white,
    marginRight: SIZES.base * 1.5,
  },
  selectedCard: {
    borderColor: COLORS.success,
    backgroundColor: "#F0FFF0",
  },
  flagContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.lightGrey,
    marginBottom: SIZES.base,
    overflow: "hidden",
  },
  flag: {
    width: "100%",
    height: "100%",
  },
  nameText: {
    ...FONTS.body,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    color: COLORS.darkGrey,
  },
  checkmarkContainer: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.success,
    justifyContent: "center",
    alignItems: "center",
  },
});
