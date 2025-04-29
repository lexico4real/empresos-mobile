import icons from '@/constants/icons';
import { Href, useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';

interface ProfileMenuItemProps {
  icon: ImageSourcePropType;
  title: string;
  description: string;
  route: Href;
  iconColor?: string;
  chevronIcon?: ImageSourcePropType;
  accessibilityLabel?: string;
  testID?: string;
  isActive?: boolean;
  badge?: string | number;
  onPress?: () => void;
}

export default function ProfileMenuItem({
  icon,
  title,
  description,
  route,
  iconColor = '#C33A31',
  chevronIcon = icons.rightArrow,
  accessibilityLabel,
  testID,
  isActive = true,
  badge,
  onPress,
}: ProfileMenuItemProps) {
  const router = useRouter();
  const itemRef = useRef<View>(null);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(route);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={!isActive}
      className={`flex-row items-center justify-between p-4 border-b border-gray-100 ${!isActive ? 'opacity-50' : ''
        }`}
      accessible={true}
      accessibilityLabel={accessibilityLabel || `${title} menu item`}
      accessibilityRole="button"
      accessibilityState={{ disabled: !isActive }}
      testID={testID}
    >
      <View
        className="flex-row items-center flex-1"
        ref={itemRef}
      >
        <View
          className="w-10 h-10 rounded-full items-center justify-center mr-4"
          style={{ backgroundColor: `${iconColor}20` }}
        >
          <Image
            source={icon}
            className="w-5 h-5"
            style={{ tintColor: iconColor }}
            resizeMode="contain"
            accessible={true}
            accessibilityLabel={`${title} icon`}
          />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center">
            <Text
              className="text-base font-semibold text-gray-800"
              accessible={true}
              accessibilityRole="text"
            >
              {title}
            </Text>
            {badge && (
              <View className="bg-primary-100 px-2 py-0.5 rounded-full ml-2">
                <Text
                  className="text-primary-600 text-xs font-medium"
                  accessible={true}
                  accessibilityRole="text"
                >
                  {badge}
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
        </View>
      </View>
      <Image
        source={chevronIcon}
        className="w-5 h-5"
        style={{ tintColor: '#9CA3AF' }}
        resizeMode="contain"
        accessible={true}
        accessibilityLabel="Navigate"
      />
    </TouchableOpacity>
  );
}