import Header from '@/components/common/header'
import icons from '@/constants/icons'
import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ContactDetails() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Contact Details"
        showBackArrow={true}
        backArrowIcon={icons.back}
      />
      <View>
        <Text>Contact Details</Text>
      </View>
    </SafeAreaView>
  )
}
