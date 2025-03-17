import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SIGN_IN_URL, SIGN_UP_URL } from '@/config/routes';

export default function SignOption() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-5 justify-center">
        <View className="mb-20">
          <Text className="text-white text-4xl font-bold mb-16">YOU ARE{'\n'}WELCOME</Text>

          <View className='flex flex-col items-center justify-center'>
            <Text className="text-white text-xl mb-2">Hi there!</Text>
            <Text className="text-white text-xl mb-12">Welcome to Santander.</Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push(SIGN_UP_URL)}
            className="bg-[#C33A31] py-4 rounded-full mb-4"
          >
            <Text className="text-white text-center text-lg font-medium">Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push(SIGN_IN_URL)}
            className="border border-white py-4 rounded-full"
          >
            <Text className="text-white text-center text-lg font-medium">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
