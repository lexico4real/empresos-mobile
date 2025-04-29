import React, { useRef, useState } from 'react'
import { NativeSyntheticEvent, TextInput as RNTextInput, Text, TextInputFocusEventData, TextInputProps, View } from 'react-native'

interface CustomTextInputProps extends Omit<TextInputProps, 'onChangeText'> {
  label?: string
  error?: string
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
  onChangeText?: (text: string) => void
  required?: boolean
  accessibilityLabel?: string
  testID?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export default function TextInput({
  label,
  error,
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  required = false,
  accessibilityLabel,
  testID,
  helperText,
  leftIcon,
  rightIcon,
  ...props
}: CustomTextInputProps) {
  const inputRef = useRef<RNTextInput>(null)
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true)
    if (props.onFocus) {
      props.onFocus(e)
    }
  }

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false)
    if (props.onBlur) {
      props.onBlur(e)
    }
  }

  return (
    <View
      className={`mb-4 ${containerClassName}`}
      accessible={true}
      accessibilityLabel={accessibilityLabel || label}
      testID={testID}
    >
      {label && (
        <Text className={`text-base mb-1 pb-2 text-gray-700 ${labelClassName}`}>
          {label}
          {required && <Text className="text-red-500"> *</Text>}
        </Text>
      )}
      <View
        className={`flex-row items-center border ${error ? 'border-red-500' : isFocused ? 'border-blue-500' : 'border-gray-300'
          } rounded-lg ${inputClassName}`}
      >
        {leftIcon && (
          <View className="pl-3">
            {leftIcon}
          </View>
        )}
        <RNTextInput
          ref={inputRef}
          className={`flex-1 p-3 text-base ${leftIcon ? 'pl-0' : ''} ${rightIcon ? 'pr-0' : ''}`}
          placeholderTextColor="#9CA3AF"
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessible={true}
          accessibilityLabel={`${label || ''} input field`}
          accessibilityRole="text"
          accessibilityState={{ disabled: props.editable === false }}
          {...props}
        />
        {rightIcon && (
          <View className="pr-3">
            {rightIcon}
          </View>
        )}
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
          className={`text-red-500 text-sm mt-1 ${errorClassName}`}
          accessible={true}
          accessibilityRole="alert"
        >
          {error}
        </Text>
      )}
    </View>
  )
} 