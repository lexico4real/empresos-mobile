import { ProfileHeaderProps } from '@/config/types'
import icons from '@/constants/icons'
import { useNavigation } from '@react-navigation/native'
import React, { useRef } from 'react'
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface HeaderProps extends ProfileHeaderProps {
  className?: string
  titleAlignment?: 'left' | 'center'
  accessibilityLabel?: string
  testID?: string
  showStatusBar?: boolean
  statusBarStyle?: 'light-content' | 'dark-content'
  statusBarBackgroundColor?: string
  onBackPress?: () => void
  onRightPress?: () => void
  rightComponent?: React.ReactNode
  leftComponent?: React.ReactNode
}

export default function Header({
  title,
  showBackArrow,
  backArrowIcon,
  logo,
  rightIcon,
  onBackPress,
  onRightPress,
  rightComponent,
  leftComponent,
  className = '',
  titleAlignment = 'left',
  accessibilityLabel,
  testID,
  showStatusBar = true,
  statusBarStyle = 'dark-content',
  statusBarBackgroundColor = '#f0ebe9',
}: HeaderProps) {
  const navigation = useNavigation()
  const headerRef = useRef<View>(null)

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      navigation.goBack()
    }
  }

  return (
    <>
      {showStatusBar && (
        <StatusBar
          backgroundColor={statusBarBackgroundColor}
          barStyle={statusBarStyle}
        />
      )}
      <View
        style={{
          backgroundColor: statusBarBackgroundColor,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          zIndex: -1
        }}
      />
      <SafeAreaView edges={['top']} style={{ backgroundColor: 'transparent' }}>
        <View
          className={`flex flex-row justify-between items-center px-4 py-2 ${className}`}
          ref={headerRef}
          accessible={true}
          accessibilityLabel={accessibilityLabel || title}
          testID={testID}
        >
          {/* Left side with back button */}
          <View className="flex-row items-center">
            {leftComponent || (
              showBackArrow && (
                <TouchableOpacity
                  onPress={handleBackPress}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  accessible={true}
                  accessibilityLabel="Go back"
                  accessibilityRole="button"
                >
                  <Image
                    source={backArrowIcon || icons.backArrow}
                    className='size-6'
                    style={{ tintColor: '#C33A31' }}
                  />
                </TouchableOpacity>
              )
            )}

            {titleAlignment === 'left' && (
              <View className="flex-row items-center ml-3">
                {logo && (
                  <>
                    <Image
                      source={logo}
                      className='h-8 w-8'
                      resizeMode="contain"
                      accessible={true}
                      accessibilityLabel="Logo"
                    />
                    <Text className='text-primary-300 mx-2'>|</Text>
                  </>
                )}
                <Text
                  className='text-lg font-rubikBold text-[#C33A31] font-bold'
                  accessible={true}
                  accessibilityRole="header"
                >
                  {title}
                </Text>
              </View>
            )}
          </View>

          {/* Center title */}
          {titleAlignment === 'center' && (
            <View className="absolute left-0 right-0 items-center">
              <View className="flex-row items-center">
                {logo && (
                  <>
                    <Image
                      source={logo}
                      className='h-8 w-8 mr-2'
                      resizeMode="contain"
                      accessible={true}
                      accessibilityLabel="Logo"
                    />
                    <Text className='text-[#C33A31] mr-2'>|</Text>
                  </>
                )}
                <Text
                  className='text-lg font-rubikBold text-[#C33A31] font-bold'
                  accessible={true}
                  accessibilityRole="header"
                >
                  {title}
                </Text>
              </View>
            </View>
          )}

          {/* Right side */}
          {rightComponent || (
            rightIcon && (
              <TouchableOpacity
                onPress={onRightPress}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                accessible={true}
                accessibilityLabel="Right action"
                accessibilityRole="button"
              >
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