// components/bills/BillItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface BillItemProps {
  date: string;
  day: string;
  biller: string;
  description: string;
  amount: string;
  status: string;
  onPress: () => void;
}

export default function BillItem({
  date,
  day,
  biller,
  description,
  amount,
  status,
  onPress
}: BillItemProps) {
  return (
    <View className="mb-4">
      <Text className="text-red-500 font-medium mb-1">{date} | {day}</Text>
      <TouchableOpacity
        onPress={onPress}
        className="bg-white p-4 rounded-lg border border-gray-100"
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-base font-bold text-gray-800">{biller}</Text>
            <Text className="text-gray-500 text-sm mt-1">{description}</Text>
          </View>
          <Text className="text-base font-bold text-gray-800">{amount}</Text>
        </View>

        <View className="flex-row justify-end mt-2">
          <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-600 text-xs font-medium">{status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}