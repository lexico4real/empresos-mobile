import icons from "@/constants/icons";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { CountryListItem } from "@/hooks/query/useBankList";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CountryListItemProps {
  item: CountryListItem;
  onPress: () => void;
}

export default function CountryListItemComponent({
  item,
  onPress,
}: CountryListItemProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <Text style={styles.nameText}>{item.name}</Text>
      <View style={styles.flagContainer}>
        <Image
          source={item.flag ? item.flag : icons.defaultFlag}
          style={styles.flag}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.base * 2,
    marginBottom: SIZES.base,
    marginHorizontal: SIZES.base * 2,
  },
  nameText: {
    ...FONTS.body,
    fontWeight: "500",
    color: COLORS.secondary,
  },
  flagContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: "hidden",
  },
  flag: {
    width: "100%",
    height: "100%",
  },
});
