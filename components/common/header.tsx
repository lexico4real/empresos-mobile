import React from 'react'
import { View, Text, Image, TouchableOpacity, ImageSourcePropType, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import { ProfileHeaderProps } from '@/config/types'

export default function Header({
  title,
  showBackArrow,
  backArrowIcon,
  logo,
  rightIcon,
  onBackPress,
  onRightPress,
  rightComponent,
  className = '',
  titleAlignment = 'left'
}: ProfileHeaderProps & {
  className?: string,
  titleAlignment?: 'left' | 'center'
}) {
  const navigation = useNavigation()

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      navigation.goBack()
    }
  }

  return (
    <>
      <StatusBar
        backgroundColor="#f0ebe9"
        barStyle="dark-content"
      />
      <View style={{ backgroundColor: '#f0ebe9', position: 'absolute', top: 0, left: 0, right: 0, height: 100, zIndex: -1 }} />
      <SafeAreaView edges={['top']} style={{ backgroundColor: 'transparent' }}>
        <View className={`flex flex-row justify-between items-center px-4 py-2 ${className}`}>
          {/* Left side with back button */}
          <View className="flex-row items-center">
            {showBackArrow && (
              <TouchableOpacity onPress={handleBackPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Image
                  source={backArrowIcon || icons.backArrow}
                  className='size-6'
                  style={{ tintColor: '#C33A31' }}
                />
              </TouchableOpacity>
            )}

            {titleAlignment === 'left' && (
              <View className="flex-row items-center ml-3">
                {logo && (
                  <>
                    <Image source={logo} className='h-8 w-8' resizeMode="contain" />
                    <Text className='text-primary-300 mx-2'>|</Text>
                  </>
                )}
                <Text className='text-lg font-rubikBold text-[#C33A31] font-bold'>{title}</Text>
              </View>
            )}
          </View>

          {/* Center title */}
          {titleAlignment === 'center' && (
            <View className="absolute left-0 right-0 items-center">
              <View className="flex-row items-center">
                {logo && (
                  <>
                    <Image source={logo} className='h-8 w-8 mr-2' resizeMode="contain" />
                    <Text className='text-[#C33A31] mr-2'>|</Text>
                  </>
                )}
                <Text className='text-lg font-rubikBold text-[#C33A31] font-bold'>{title}</Text>
              </View>
            </View>
          )}

          {/* Right side */}
          {rightComponent || (
            rightIcon && (
              <TouchableOpacity onPress={onRightPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Image
                  source={rightIcon}
                  className='size-5'
                  style={{ tintColor: '#C33A31' }}
                />
              </TouchableOpacity>
            )
          )}
        </View>
      </SafeAreaView>
    </>
  )
}