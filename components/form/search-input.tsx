import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface SearchInputProps extends TextInputProps {}

export default function SearchInput({
  onFocus,
  onBlur,
  ...props
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, isFocused && styles.focusedContainer]}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="search"
          size={20}
          color={isFocused ? COLORS.primary : COLORS.grey}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.grey}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
  focusedContainer: {
    borderColor: COLORS.primary,
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
