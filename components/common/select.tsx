import React, { useEffect, useRef, useState } from 'react'
import { AccessibilityInfo, FlatList, Modal, Text, TouchableOpacity, View } from 'react-native'

interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

interface SelectProps {
  label?: string
  value: string
  options: SelectOption[]
  onSelect: (value: string) => void
  error?: string
  containerClassName?: string
  labelClassName?: string
  selectClassName?: string
  errorClassName?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  accessibilityLabel?: string
  testID?: string
}

export default function Select({
  label,
  value,
  options,
  onSelect,
  error,
  containerClassName = '',
  labelClassName = '',
  selectClassName = '',
  errorClassName = '',
  placeholder = 'Select an option',
  disabled = false,
  required = false,
  accessibilityLabel,
  testID,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<View>(null)

  const selectedOption = options.find(option => option.value === value)

  useEffect(() => {
    if (isOpen) {
      // Announce modal opening to screen readers
      AccessibilityInfo.announceForAccessibility('Select options opened')
    }
  }, [isOpen])

  const handleSelect = (value: string) => {
    onSelect(value)
    setIsOpen(false)
    // Announce selection to screen readers
    AccessibilityInfo.announceForAccessibility('Option selected')
  }

  return (
    <View
      className={`mb-4 ${containerClassName}`}
      accessible={true}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityRole="combobox"
      accessibilityState={{ expanded: isOpen, disabled }}
      testID={testID}
    >
      {label && (
        <Text className={`text-base mb-1 text-gray-700 ${labelClassName}`}>
          {label}
          {required && <Text className="text-red-500"> *</Text>}
        </Text>
      )}
      <TouchableOpacity
        ref={selectRef}
        className={`border ${error ? 'border-red-500' : 'border-gray-300'
          } rounded-lg p-3 text-base ${disabled ? 'opacity-50' : ''} ${selectClassName}`}
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        accessible={true}
        accessibilityLabel={`${label || ''} ${selectedOption?.label || placeholder}`}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        <Text className={value ? 'text-black' : 'text-gray-400'}>
          {selectedOption?.label || placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
        accessibilityViewIsModal={true}
      >
        <View
          className="flex-1 justify-end bg-black/50"
          accessible={true}
          accessibilityLabel="Select options modal"
        >
          <View className="bg-white rounded-t-xl p-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold">{label}</Text>
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                accessible={true}
                accessibilityLabel="Close select options"
                accessibilityRole="button"
              >
                <Text className="text-blue-500">Close</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`py-3 border-b border-gray-200 ${item.disabled ? 'opacity-50' : ''}`}
                  onPress={() => !item.disabled && handleSelect(item.value)}
                  disabled={item.disabled}
                  accessible={true}
                  accessibilityLabel={item.label}
                  accessibilityRole="button"
                  accessibilityState={{ selected: value === item.value, disabled: item.disabled }}
                >
                  <Text
                    className={`${value === item.value ? 'text-blue-500' : 'text-gray-700'} ${item.disabled ? 'text-gray-400' : ''
                      }`}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

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