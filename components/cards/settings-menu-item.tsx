import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type SettingsMenuItemProps = {
  /** The main text label for the list item. */
  title: string;
  /** Determines the type of element rendered on the right side. */
  itemType: "navigation" | "switch" | "value";
  /** The text value to display (e.g., 'English') when itemType is 'value'. */
  currentValue?: string;
  /** The initial state of the switch when itemType is 'switch'. */
  switchValue?: boolean;
  /** Callback function when the switch value changes. */
  onSwitchChange?: (value: boolean) => void;
  /** If true, displays a small info icon next to the title. */
  hasInfo?: boolean;
  /** The function to call when the row is pressed. */
  onPress?: () => void;
  /** The name of the Ionicons icon to display on the left. If omitted, no icon is shown. */
  icon?: keyof typeof Ionicons.glyphMap;
  /** Optional custom styles for the container. */
  containerStyle?: StyleProp<ViewStyle>;
};

export default function SettingsMenuItem({
  title,
  itemType,
  currentValue,
  switchValue,
  onSwitchChange,
  hasInfo,
  onPress,
  icon,
  containerStyle,
}: SettingsMenuItemProps) {
  // Internal state to manage the switch toggle visually
  const [isEnabled, setIsEnabled] = useState(switchValue || false);

  const handleToggleSwitch = (value: boolean) => {
    setIsEnabled(value);
    if (onSwitchChange) onSwitchChange(value);
  };

  /**
   * Renders the correct element on the right side of the row based on itemType.
   */
  const renderRightElement = () => {
    switch (itemType) {
      case "switch":
        return (
          <Switch
            trackColor={{ false: COLORS.lightBorder, true: COLORS.primary }}
            thumbColor={isEnabled ? COLORS.white : COLORS.white}
            ios_backgroundColor={COLORS.lightBorder}
            onValueChange={handleToggleSwitch}
            value={isEnabled}
          />
        );
      case "value":
        return (
          <View style={styles.rightContainer}>
            <Text style={styles.valueText}>{currentValue}</Text>
            <Ionicons name="chevron-forward" size={22} color={COLORS.grey} />
          </View>
        );
      case "navigation":
      default:
        return (
          <Ionicons name="chevron-forward" size={22} color={COLORS.grey} />
        );
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[styles.container, containerStyle]}
    >
      {/* Conditionally render the icon if one is provided */}
      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color={COLORS.primary}
          style={styles.icon}
        />
      )}

      <View
        style={[styles.titleContainer, !icon && styles.titleContainerNoIcon]}
      >
        <Text style={styles.title}>{title}</Text>
        {hasInfo && (
          <Ionicons
            name="information-circle-outline"
            size={16}
            color={COLORS.grey}
            style={styles.infoIcon}
          />
        )}
      </View>
      {renderRightElement()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SIZES.base * 1.75, // 14px
    paddingHorizontal: SIZES.base * 3, // 24px
    backgroundColor: COLORS.white,
    minHeight: 56,
  },
  icon: {
    width: 30, // Provides consistent spacing
    textAlign: "center",
    marginRight: SIZES.base * 2, // 16px
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.base,
  },
  titleContainerNoIcon: {
    // When there's no icon, remove the left margin that the icon's container would have provided
    marginLeft: 0,
  },
  title: {
    ...FONTS.body,
    fontWeight: "500",
    color: COLORS.secondary,
  },
  infoIcon: {
    opacity: 0.7,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.base,
  },
  valueText: {
    ...FONTS.body,
    color: COLORS.primary,
    fontWeight: "600",
  },
});
