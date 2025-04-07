import Header from '@/components/common/header'
import icons from '@/constants/icons'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Document() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Docubox" showBackArrow={true}
        backArrowIcon={icons.back}
      />
      <View>
        <Text>Document</Text>
      </View>
    </SafeAreaView>
  )
}
