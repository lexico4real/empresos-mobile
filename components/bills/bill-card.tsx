// components/bills/BillCard.tsx
import React, { useRef } from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';

interface BillCardProps {
  title: string;
  icon: ImageSourcePropType;
  description: string;
  onPress: () => void;
  accessibilityLabel?: string;
  testID?: string;
  isActive?: boolean;
  category?: string;
  count?: number;
  totalAmount?: string;
  lastPaid?: string;
}

export default function BillCard({
  title,
  icon,
  description,
  onPress,
  accessibilityLabel,
  testID,
  isActive = true,
  category,
  count,
  totalAmount,
  lastPaid,
}: BillCardProps) {
  const cardRef = useRef<View>(null);

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-white p-4 rounded-lg border ${isActive ? 'border-gray-200' : 'border-gray-100 opacity-50'
        }`}
      disabled={!isActive}
      accessible={true}
      accessibilityLabel={accessibilityLabel || `${title} bill card`}
      accessibilityRole="button"
      accessibilityState={{ disabled: !isActive }}
      testID={testID}
    >
      <View
        className="flex-row items-center"
        ref={cardRef}
      >
        <Image
          source={icon}
          className="w-12 h-12 mr-4"
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={`${title} icon`}
        />
        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <Text
              className="text-lg font-bold text-gray-800"
              accessible={true}
              accessibilityRole="text"
            >
              {title}
            </Text>
            {count !== undefined && (
              <View className="bg-primary-100 px-2 py-1 rounded-full">
                <Text
                  className="text-primary-600 text-xs font-medium"
                  accessible={true}
                  accessibilityRole="text"
                >
                  {count}
                </Text>
              </View>
            )}
          </View>
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
          {totalAmount && (
            <Text
              className="text-gray-400 text-xs mt-1"
              accessible={true}
              accessibilityRole="text"
            >
              Total: {totalAmount}
            </Text>
          )}
          {lastPaid && (
            <Text
              className="text-gray-400 text-xs mt-1"
              accessible={true}
              accessibilityRole="text"
            >
              Last Paid: {lastPaid}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}