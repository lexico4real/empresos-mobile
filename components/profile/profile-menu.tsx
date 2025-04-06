import React from 'react';
import { TouchableOpacity, Text, View, Image, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import icons from '@/constants/icons';

interface ProfileMenuItemProps {
  icon: ImageSourcePropType;
  title: string;
  description: string;
  route: string;
  params?: object;
  iconColor?: string;
  chevronIcon?: ImageSourcePropType;
}

export default function ProfileMenuItem({
  icon,
  title,
  description,
  route,
  params = {},
  iconColor = '#e63946',
  chevronIcon
}: ProfileMenuItemProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handlePress = () => {
    navigation.navigate(route, params);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row items-center py-6 px-8 border-b border-gray-100"
    >
      <View className="mr-4">
        <Image
          source={icon}
          className="w-7 h-7"
          style={{ tintColor: iconColor }}
        />
      </View>

      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-800">{title}</Text>
        <Text className="text-sm text-gray-500 mt-1">{description}</Text>
      </View>

      <Image
        source={chevronIcon || icons.rightArrow}
        className="w-5 h-5"
        style={{ tintColor: '#CCCCCC' }}
      />
    </TouchableOpacity>
  );
}