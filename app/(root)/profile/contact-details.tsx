import Header from '@/components/common/header'
import icons from '@/constants/icons'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ContactDetails() {
  return (
    <>
      <Header
        title="Contact Details"
        showBackArrow={true}
        backArrowIcon={icons.back}
        titleAlignment="center"
      />
      <SafeAreaView className="flex-1 bg-white" edges={['bottom', 'left', 'right']}>
        <View className="flex-1 px-4 py-6">
          {/* Profile Photo Section */}
          <View className="items-center mb-12">
            <View className="w-32 h-32 rounded-full bg-[#E9D8FF] items-center justify-center mb-4">
              <Image
                source={icons.person}
                className="w-16 h-16"
                resizeMode="contain"
              />
            </View>
            <Text className="text-lg font-medium text-gray-800">Add Photo</Text>
          </View>

          {/* Email Section */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-base font-medium text-gray-600 mb-1">
              Email address
            </Text>
            <Text className="text-lg text-gray-800">
              debsy@gmail.com
            </Text>
          </View>

          {/* Security Notice */}
          <Text className="text-base text-gray-600 leading-6">
            *For security reasons, you can only view your contact details here.{'\n'}
            If you would like to change them, please contact your manager or your branch.
          </Text>
        </View>
      </SafeAreaView>
    </>
  )
}
