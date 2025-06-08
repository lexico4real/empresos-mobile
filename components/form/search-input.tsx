import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface SearchInputProps extends TextInputProps {}

export default function SearchInput({ ...props }: SearchInputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="search" size={20} color={COLORS.grey} />
      </View>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.grey}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base * 1.5,
    marginHorizontal: SIZES.base * 2,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
  },
  iconContainer: {
    paddingRight: SIZES.base,
  },
  input: {
    flex: 1,
    ...FONTS.body,
    color: COLORS.secondary,
    height: 48,
  },
});
