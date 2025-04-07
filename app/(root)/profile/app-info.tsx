import Header from '@/components/common/header'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { newFeatures } from '@/data'
import React from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AppInfo() {


  return (
    <>
      <Header
        title="Information about the app"
        showBackArrow={true}
        backArrowIcon={icons.back}
        titleAlignment="center"
      />
      <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom', 'left', 'right']}>
        <View className="px-4 py-6">
          <View className="flex-row items-center gap-4">
            <Image source={images.empresosIconRed} className="w-10 h-10 bg-[#E4F4FF] rounded-full p-2" />
            <Text className="text-lg font-bold">Santander Empresas</Text>
          </View>

          <View className="flex-row items-center justify-between my-3">
            <Text className="text-lg font-normal">Version of the App</Text>
            <Text className="text-lg font-normal text-[#137E84]">4.3.0</Text>
          </View>

          <View className="h-[1px] bg-gray-200 my-5" />

          <View className="flex-row items-center justify-between my-3">
            <Text className="text-lg font-normal">Operating System version</Text>
            <Text className="text-lg font-normal text-[#137E84]">13</Text>
          </View>

          <View className="h-[1px] bg-gray-200 my-5" />

          <Text className="text-2xl font-bold mb-6">What&apos;s new in the latest updates?</Text>

          <Text className="text-xl font-bold mb-4">V2.0</Text>
          <Text className="text-lg font-bold mb-3">Main new features</Text>

          <FlatList
            data={newFeatures}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="flex-row mb-4">
                <Text className="text-base mr-2">•</Text>
                <Text className="text-base flex-1">{item.text}</Text>
              </View>
            )}
            scrollEnabled={false}
          />
        </View>
      </SafeAreaView>
    </>
  )
}
