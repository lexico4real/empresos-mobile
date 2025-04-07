import Header from '@/components/common/header'
import icons from '@/constants/icons'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Payment() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Payments" showBackArrow={true}
        backArrowIcon={icons.back}
      />
      <View>
        <Text>Payments</Text>
      </View>
    </SafeAreaView>
  )
}
