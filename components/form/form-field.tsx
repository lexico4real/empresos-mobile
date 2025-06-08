import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// Assuming FormFieldProps is defined in a types file
export interface FormFieldProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  isPassword?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  [key: string]: any; // To accept other TextInput props
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  containerStyle,
  inputStyle,
  isPassword = false,
  required = false,
  error,
  helperText,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur(e);
  };

  // Dynamically determine border color
  const borderColor = error
    ? COLORS.danger
    : isFocused
    ? COLORS.primary
    : COLORS.lightBorder;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.titleText}>
        {title}
        {required && <Text style={{ color: COLORS.danger }}> *</Text>}
      </Text>

      <View style={[styles.inputWrapper, { borderColor }]}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}

        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={COLORS.grey}
          onChangeText={handleChangeText}
          secureTextEntry={isPassword && !showPassword}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {isPassword ? (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff size={24} color={COLORS.grey} />
            ) : (
              <Eye size={24} color={COLORS.grey} />
            )}
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={styles.iconContainer}>{rightIcon}</View>
        ) : null}
      </View>

      {helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.base * 2,
  },
  titleText: {
    ...FONTS.body,
    fontWeight: "500",
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
  },
  input: {
    flex: 1,
    ...FONTS.body,
    color: COLORS.secondary,
    height: "100%",
  },
  iconContainer: {
    marginHorizontal: SIZES.base / 2,
  },
  helperText: {
    ...FONTS.body,
    fontSize: 12,
    color: COLORS.grey,
    marginTop: SIZES.base / 2,
  },
  errorText: {
    ...FONTS.body,
    fontSize: 12,
    color: COLORS.danger,
    marginTop: SIZES.base / 2,
  },
});

export default FormField;
