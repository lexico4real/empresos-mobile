import Header from '@/components/common/header'
import icons from '@/constants/icons'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 '>
        <Header
          title="Personal Area"
          showBackArrow={true}
          backArrowIcon={icons.back}
          rightIcon={icons.close}
          onRightPress={() => console.log('Close pressed')}
        />

        {/* User Profile Section */}
        <View className='flex-row items-center mt-6 mb-8 px-8'>
          <Image
            source={icons.person}
            className='size-24 rounded-full bg-gray-100'
          />
          <View className='ml-4'>
            <Text className='text-lg font-bold'>Iris Schamberger</Text>
            <Text className='text-gray-400'>1-297-784-7430 x30167</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
