import { COLORS, FONTS, SIZES } from "@/constants/theme";
import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  onPress?: () => void;
  title?: string; // It's common to use a title prop for simplicity
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "outline";
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export default function Button({
  onPress,
  title,
  children,
  disabled = false,
  loading = false,
  loadingText = "Please wait...",
  variant = "primary",
  containerStyle,
  textStyle,
  size = "medium",
  icon,
  iconPosition = "left",
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const variantStyles = {
    primary: styles.variantPrimary,
    secondary: styles.variantSecondary,
    outline: styles.variantOutline,
  };

  const textVariantStyles = {
    primary: styles.textPrimary,
    secondary: styles.textSecondary,
    outline: styles.textOutline,
  };

  const sizeStyles = {
    small: styles.sizeSmall,
    medium: styles.sizeMedium,
    large: styles.sizeLarge,
  };

  const handlePress = () => {
    if (!isDisabled && onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isDisabled}
      style={[
        styles.base,
        sizeStyles[size],
        variantStyles[variant],
        isDisabled && styles.disabled,
        containerStyle,
      ]}
    >
      {loading ? (
        <View style={styles.contentContainer}>
          <ActivityIndicator
            color={variant === "primary" ? COLORS.white : COLORS.primary}
          />
          <Text
            style={[
              styles.textBase,
              textVariantStyles[variant],
              styles.loadingText,
              textStyle,
            ]}
          >
            {loadingText}
          </Text>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === "left" && (
            <View style={styles.iconWrapper}>{icon}</View>
          )}
          <Text
            style={[styles.textBase, textVariantStyles[variant], textStyle]}
          >
            {title || children}
          </Text>
          {icon && iconPosition === "right" && (
            <View style={styles.iconWrapper}>{icon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
    borderRadius: SIZES.radius * 3, // Pill shape
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  // --- Variants ---
  variantPrimary: {
    backgroundColor: COLORS.primary,
  },
  variantSecondary: {
    backgroundColor: COLORS.lightGrey,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
  },
  variantOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  // --- Sizes ---
  sizeSmall: { paddingVertical: SIZES.base },
  sizeMedium: { paddingVertical: SIZES.base * 1.8 },
  sizeLarge: { paddingVertical: SIZES.base * 2.5 },
  // --- Text ---
  textBase: {
    ...FONTS.h4,
    fontWeight: "600",
  },
  textPrimary: {
    color: COLORS.white,
  },
  textSecondary: {
    color: COLORS.secondary,
  },
  textOutline: {
    color: COLORS.primary,
  },
  // --- States ---
  disabled: {
    opacity: 0.5,
  },
  loadingText: {
    marginLeft: SIZES.base,
  },
  iconWrapper: {
    marginHorizontal: SIZES.base / 2,
  },
});
