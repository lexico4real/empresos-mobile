import Button from '@/components/common/button'
import Header from '@/components/common/header'
import { HOME_URL } from '@/config/routes'
import icons from '@/constants/icons'
import images from '@/constants/images'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignIn() {
  const [personalId, setPersonalId] = useState('')

  const handleContinue = () => {
    // Implement your sign-in logic here
    // AsyncStorage.removeItem('isOnboarded')
    if (personalId.trim()) {
      router.push(HOME_URL)
    }
  }

  const handleForgotDetails = () => {
    // Implement your forgot details logic here
  }

  return (
    <>
      <Header
        title="Sign In"
        showBackArrow={true}
        backArrowIcon={icons.back}
        rightIcon={icons.close}
        onRightPress={() => router.back()}
        titleAlignment="center"
      />
      <SafeAreaView edges={['bottom', 'left', 'right']} className="flex-1 bg-white">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 px-5">
              {/* Top section with profile image */}
              <View className="items-center mt-12">
                <Image
                  source={images.Profile}
                  className="w-24 h-24 rounded-full"
                />
              </View>

              {/* Middle section with input */}
              <View className="flex-1 justify-center items-center">
                <Text className="text-2xl font-semibold text-center mb-8">
                  Enter Your Personal ID
                </Text>

                <TextInput
                  className="w-full h-14 border border-gray-300 mb-6 rounded-lg text-center"
                  value={personalId}
                  onChangeText={setPersonalId}
                  placeholder=""
                  secureTextEntry={false}
                  autoCapitalize="none"
                />

                <Text className="text-center text-gray-600 mt-2 px-6">
                  You get a personal ID when you first sign up for Mobile or Online Banking
                </Text>
              </View>

              {/* Bottom section with buttons */}
              <View className="mb-8 mt-auto">
                <TouchableOpacity
                  onPress={handleContinue}
                  className="bg-gray-200 rounded-full py-4 mb-4"
                >
                  <Text className="text-center text-red-500 font-medium">Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleForgotDetails}
                  className="border border-red-500 rounded-full py-4"
                >
                  <Text className="text-center text-red-500">Forgotten details?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
}