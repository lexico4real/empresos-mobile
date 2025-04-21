import Button from '@/components/common/button'
import Header from '@/components/common/header'
import { SIGN_UP_URL } from '@/config/routes'
import icons from '@/constants/icons'
import images from '@/constants/images'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link, router } from 'expo-router'
import React, { useState, useEffect } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import usePostOtp from '@/hooks/mutation/usePostOtp'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { isPending, handlePostOtp } = usePostOtp()

  useEffect(() => {
    const loadSavedEmail = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('userEmail')
        if (savedEmail) {
          setEmail(savedEmail)
        }
      } catch (error) {
        console.error('Error loading saved email:', error)
      }
    }

    loadSavedEmail()
  }, [])

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      return
    }

    setIsLoading(true)
    try {
      // Save credentials to AsyncStorage
      await AsyncStorage.setItem('userEmail', email)
      await AsyncStorage.setItem('userPassword', password)

      handlePostOtp({ email, password })
    } catch (error) {
      console.error('Error signing in:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    // TODO: Implement forgot password logic here
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
              <View className="flex-1 justify-center">
                <Text className="text-2xl font-semibold text-center mb-8">
                  Welcome Back
                </Text>

                <View className="mb-4">
                  <Text className="text-gray-600 mb-2">Email</Text>
                  <TextInput
                    className="w-full h-14 border border-gray-300 rounded-lg px-4"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>

                <View className="mb-6">
                  <Text className="text-gray-600 mb-2">Password</Text>
                  <View className="relative">
                    <TextInput
                      className="w-full h-14 border border-gray-300 rounded-lg px-4 pr-12"
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Enter your password"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoComplete="password"
                    />
                    <TouchableOpacity
                      className="absolute right-4 top-4"
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={handleForgotPassword}
                  className="self-end mb-6"
                >
                  <Text className="text-red-500">Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Bottom section with buttons */}
              <View className="mb-8">
                <Button
                  className="bg-red-500 rounded-full py-4 mb-4"
                  onPress={handleSignIn}
                  disabled={isLoading || !email.trim() || !password.trim()}
                  loading={isPending}
                  loadingText="Signing in..."
                >
                  <Text className="text-center text-white font-medium">
                    Sign In
                  </Text>
                </Button>
              </View>

              <View className="flex-1 justify-center">
                <Text className="text-center text-gray-600">
                  Don't have an account? <Link href={SIGN_UP_URL} className='text-red-500 underline'>Sign Up</Link>
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
}