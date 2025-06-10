import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { ChevronDown } from "lucide-react-native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface SelectItem {
  label: string;
  value: string;
  data?: any;
}

interface SelectInputProps {
  title: string;
  value: string;
  items: SelectItem[];
  onSelect: (item: SelectItem) => void;
  placeholder: string;
  isLoading?: boolean;
  error?: string;
}

export default function SelectInput({
  title,
  value,
  items,
  onSelect,
  placeholder,
  isLoading = false,
  error,
}: SelectInputProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value);
  const [isFocused, setIsFocused] = React.useState(false);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  // Dynamic border color logic (same as FormField)
  const borderColor = error
    ? COLORS.danger
    : isFocused
    ? COLORS.primary
    : COLORS.lightBorder;
  const chevronColor = error
    ? COLORS.danger
    : isFocused
    ? COLORS.primary
    : COLORS.grey;

  // Prepare data for DropDownPicker
  const dropdownItems = items.map((item) => ({
    label: item.label,
    value: item.value,
    data: item.data,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <DropDownPicker
        open={open}
        value={selectedValue}
        items={dropdownItems}
        setOpen={setOpen}
        setValue={(callback) => {
          const val = callback(selectedValue);
          setSelectedValue(val);
          const selected = items.find((item) => item.value === val);
          if (selected) onSelect(selected);
        }}
        setItems={() => {}}
        placeholder={placeholder}
        disabled={isLoading}
        style={{ ...styles.inputWrapper, borderColor }}
        dropDownContainerStyle={{
          ...styles.dropdownListContainer,
          borderColor,
          marginTop: 2,
          zIndex: 1000,
          maxHeight: 250,
        }}
        textStyle={selectedValue ? styles.selectedText : styles.placeholderText}
        placeholderStyle={styles.placeholderText}
        ArrowDownIconComponent={() => (
          <ChevronDown
            size={20}
            color={chevronColor}
            style={styles.chevronIcon}
          />
        )}
        ArrowUpIconComponent={() => (
          <ChevronDown
            size={20}
            color={chevronColor}
            style={[styles.chevronIcon, { transform: [{ rotate: "180deg" }] }]}
          />
        )}
        onOpen={() => setIsFocused(true)}
        onClose={() => setIsFocused(false)}
        listItemLabelStyle={styles.optionText}
        selectedItemLabelStyle={styles.selectedText}
        zIndex={1000}
        autoScroll={true}
        closeAfterSelecting={true}
        listMode="SCROLLVIEW"
        scrollViewProps={{ showsVerticalScrollIndicator: true }}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.base * 2,
    zIndex: 1000, // To ensure dropdown overlays other fields
  },
  title: {
    ...FONTS.body,
    color: COLORS.darkGrey,
    marginBottom: SIZES.base,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    width: "100%",
    height: 50,
    paddingHorizontal: SIZES.base * 2,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    zIndex: 1000,
  },
  selectedText: {
    flex: 1,
    ...FONTS.body,
    color: COLORS.secondary,
  },
  placeholderText: {
    flex: 1,
    ...FONTS.body,
    color: COLORS.grey,
  },
  chevronIcon: {
    marginLeft: SIZES.base,
  },
  optionText: {
    ...FONTS.body,
    color: COLORS.black,
  },
  errorText: {
    ...FONTS.body,
    fontSize: 12,
    color: COLORS.danger,
    marginTop: SIZES.base / 2,
  },
  dropdownListContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: SIZES.base * 2,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    zIndex: 1000,
  },
});
