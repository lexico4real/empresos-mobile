import Header from '@/components/common/header'
import icons from '@/constants/icons'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Configuration() {
  return (
    <>
      <Header
        title="Configuration"
        showBackArrow={true}
        backArrowIcon={icons.back}
        titleAlignment="center"
      />
      <SafeAreaView className='flex-1 bg-white' edges={['bottom', 'left', 'right']}>
        <View>
          <Text>Configuration</Text>
        </View>
      </SafeAreaView>

    </>
  )
}
