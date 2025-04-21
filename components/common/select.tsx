import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native'

interface SelectProps {
  label?: string
  value: string
  options: { label: string; value: string }[]
  onSelect: (value: string) => void
  error?: string
  containerClassName?: string
  labelClassName?: string
  selectClassName?: string
  errorClassName?: string
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
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = options.find(option => option.value === value)

  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && (
        <Text className={`text-base mb-1 text-gray-700 ${labelClassName}`}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        className={`border ${error ? 'border-red-500' : 'border-gray-300'
          } rounded-lg p-3 text-base ${selectClassName}`}
        onPress={() => setIsOpen(true)}
      >
        <Text className={value ? 'text-black' : 'text-gray-400'}>
          {selectedOption?.label || 'Select an option'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-xl p-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold">{label}</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Text className="text-blue-500">Close</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="py-3 border-b border-gray-200"
                  onPress={() => {
                    onSelect(item.value)
                    setIsOpen(false)
                  }}
                >
                  <Text className={value === item.value ? 'text-blue-500' : 'text-gray-700'}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {error && (
        <Text className={`text-red-500 text-sm mt-1 ${errorClassName}`}>
          {error}
        </Text>
      )}
    </View>
  )
} 