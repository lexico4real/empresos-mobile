import { FormFieldProps } from "@/config/types";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
} from "react-native";

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  inputStyles,
  isPassword = false,
  required = false,
  error,
  helperText,
  accessibilityLabel,
  testID,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  return (
    <View style={[{ marginBottom: 16 }, otherStyles]}>
      <Text
        className="text-base text-gray-600 font-pmedium mb-2"
        accessible={true}
        accessibilityRole="text"
      >
        {title}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>

      <View
        className={`flex-row items-center border-2 ${
          error
            ? "border-red-500"
            : isFocused
            ? "border-blue-500"
            : "border-gray-200"
        } w-full h-16 px-4 bg-gray-100 rounded-2xl focus:border-secondary items-center`}
        accessible={true}
        accessibilityLabel={accessibilityLabel || title}
        testID={testID}
      >
        {leftIcon && <View className="mr-2">{leftIcon}</View>}
        <TextInput
          ref={inputRef}
          className="flex-1 text-black font-semibold text-base"
          style={inputStyles}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={isPassword && !showPassword}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessible={true}
          accessibilityLabel={`${title} input field`}
          accessibilityRole="text"
          accessibilityState={{ disabled: props.editable === false }}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="ml-2"
            accessible={true}
            accessibilityLabel={
              showPassword ? "Hide password" : "Show password"
            }
            accessibilityRole="button"
          >
            {showPassword ? (
              <MaterialIcons name="visibility-off" size={24} color="#7B7B8B" />
            ) : (
              <MaterialIcons name="visibility" size={24} color="#7B7B8B" />
            )}
          </TouchableOpacity>
        )}
        {rightIcon && !isPassword && <View className="ml-2">{rightIcon}</View>}
      </View>

      {helperText && !error && (
        <Text
          className="text-gray-500 text-sm mt-1"
          accessible={true}
          accessibilityRole="text"
        >
          {helperText}
        </Text>
      )}

      {error && (
        <Text
          className="text-red-500 text-sm mt-1"
          accessible={true}
          accessibilityRole="alert"
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default FormField;
