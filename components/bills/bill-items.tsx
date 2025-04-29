// components/bills/BillItem.tsx
import React, { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface BillItemProps {
  date: string;
  day: string;
  biller: string;
  description: string;
  amount: string;
  status: string;
  onPress: () => void;
  accessibilityLabel?: string;
  testID?: string;
  isPaid?: boolean;
  dueDate?: string;
  paymentMethod?: string;
  category?: string;
}

export default function BillItem({
  date,
  day,
  biller,
  description,
  amount,
  status,
  onPress,
  accessibilityLabel,
  testID,
  isPaid = false,
  dueDate,
  paymentMethod,
  category,
}: BillItemProps) {
  const itemRef = useRef<View>(null);

  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'paid':
        return { bg: 'bg-green-100', text: 'text-green-600' };
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-600' };
      case 'overdue':
        return { bg: 'bg-red-100', text: 'text-red-600' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600' };
    }
  };

  const statusColors = getStatusColor();

  return (
    <View
      className="mb-4"
      ref={itemRef}
      accessible={true}
      accessibilityLabel={accessibilityLabel || `${biller} bill`}
      testID={testID}
    >
      <Text
        className="text-red-500 font-medium mb-1"
        accessible={true}
        accessibilityRole="text"
      >
        {date} | {day}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        className="bg-white p-4 rounded-lg border border-gray-100"
        accessible={true}
        accessibilityLabel={`${biller} bill details`}
        accessibilityRole="button"
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text
              className="text-base font-bold text-gray-800"
              accessible={true}
              accessibilityRole="text"
            >
              {biller}
            </Text>
            <Text
              className="text-gray-500 text-sm mt-1"
              accessible={true}
              accessibilityRole="text"
            >
              {description}
            </Text>
            {category && (
              <Text
                className="text-gray-400 text-xs mt-1"
                accessible={true}
                accessibilityRole="text"
              >
                Category: {category}
              </Text>
            )}
            {dueDate && (
              <Text
                className="text-gray-400 text-xs mt-1"
                accessible={true}
                accessibilityRole="text"
              >
                Due: {dueDate}
              </Text>
            )}
            {paymentMethod && (
              <Text
                className="text-gray-400 text-xs mt-1"
                accessible={true}
                accessibilityRole="text"
              >
                Payment Method: {paymentMethod}
              </Text>
            )}
          </View>
          <Text
            className="text-base font-bold text-gray-800"
            accessible={true}
            accessibilityRole="text"
          >
            {amount}
          </Text>
        </View>

        <View className="flex-row justify-end mt-2">
          <View className={`${statusColors.bg} px-3 py-1 rounded-full`}>
            <Text
              className={`${statusColors.text} text-xs font-medium`}
              accessible={true}
              accessibilityRole="text"
              accessibilityState={{ selected: isPaid }}
            >
              {status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}