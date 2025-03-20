import React from 'react'
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import icons from '@/constants/icons'
import { ProfileHeaderProps } from '@/config/types'

export default function Header({
  title,
  showBackArrow = true,
  backArrowIcon,
  logo,
  rightIcon,
  onBackPress,
  onRightPress,
  rightComponent
}: ProfileHeaderProps) {
  const navigation = useNavigation()

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      navigation.goBack()
    }
  }

  return (
    <View className='flex flex-row justify-between items-center  bg-[#f0ebe9] p-8'>
      <View className='flex flex-row gap-3 items-center'>
        {showBackArrow && (
          <TouchableOpacity onPress={handleBackPress}>
            <Image source={backArrowIcon || icons.backArrow} className='size-8' />
          </TouchableOpacity>
        )}

        {logo && (
          <>
            <Image source={logo} className='h-10 w-10' resizeMode="contain" />
            <Text className='text-primary-300 '>|</Text>
          </>
        )}

        <Text className='text-xl font-rubikBold text-primary-300 font-bold'>{title}</Text>
      </View>

      {rightComponent || (
        rightIcon && (
          <TouchableOpacity onPress={onRightPress}>
            <Image source={rightIcon} className='size-5' />
          </TouchableOpacity>
        )
      )}
    </View>
  )
}