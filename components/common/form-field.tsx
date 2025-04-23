import React, { useState } from 'react';
import { StyleProp, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';


interface FormFieldProps extends Omit<TextInputProps, 'onChangeText'> {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: StyleProp<ViewStyle>;
  inputStyles?: StyleProp<TextStyle>;
  isPassword?: boolean; // Optional prop for password fields
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  inputStyles,
  isPassword = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[{ marginBottom: 16 }, otherStyles]}>
      <Text className="text-base text-gray-600 font-pmedium mb-2">{title}</Text>

      <View className="border-2 border-gray-200 w-full h-16 px-4 bg-gray-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-black font-psemibold text-base"
          style={inputStyles}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />

        {/* {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide} // Assuming these icons exist
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );
};

export default FormField; 