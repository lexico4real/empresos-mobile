import Header from '@/components/common/header'
import icons from '@/constants/icons'
import React from 'react'
import { ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Index() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 '>
        <Header
          title="Empresos"
          showBackArrow={true}
          backArrowIcon={icons.back}
          logo={icons.logo}
          rightIcon={icons.close}
          onRightPress={() => console.log('Close pressed')}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
