// components/bills/BillCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';

interface BillCardProps {
  title: string;
  icon: ImageSourcePropType;
  description: string;
  onPress: () => void;
}

export default function BillCard({ title, icon, description, onPress }: BillCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1 min-h-[120px]"
    >
      <View className="flex-row items-center gap-2 mb-2">
        <Image
          source={icon}
          className="w-6 h-6"
          resizeMode="contain"
          tintColor={title === "Bills" ? "#e63946" : "#e63946"}
        />
        <Text className="text-lg font-semibold text-gray-800">{title}</Text>
      </View>
      <Text className="text-gray-500 text-sm">{description}</Text>
    </TouchableOpacity>
  );
}