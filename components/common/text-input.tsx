import React from 'react'
import { View, Text, TextInput as RNTextInput, TextInputProps } from 'react-native'

interface CustomTextInputProps extends TextInputProps {
  label?: string
  error?: string
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
}

export default function TextInput({
  label,
  error,
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  ...props
}: CustomTextInputProps) {
  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && (
        <Text className={`text-base mb-1 pb-2 text-gray-700 ${labelClassName}`}>
          {label}
        </Text>
      )}
      <RNTextInput
        className={`border ${error ? 'border-red-500' : 'border-gray-300'
          } rounded-lg p-3 text-base ${inputClassName}`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && (
        <Text className={`text-red-500 text-sm mt-1 ${errorClassName}`}>
          {error}
        </Text>
      )}
    </View>
  )
} 