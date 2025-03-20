import Button from '@/components/common/button'
import { HOME } from '@/constants/routes'
import { router } from 'expo-router'
import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignIn() {
  return (
    <SafeAreaView>
      <Text>SignIn</Text>
      <Button onPress={() => {
        router.push(HOME)
      }}>
        <Text>Go Home</Text>
      </Button>
    </SafeAreaView>
  )
}
