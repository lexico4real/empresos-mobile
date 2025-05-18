import Header from '@/components/common/header'
import ThreeMonthLineChart from '@/components/common/three-month-line-chart'
import { BILLS_URL, PROFILE_URL, SEND_MONEY_URL } from '@/config/routes'
import icons from '@/constants/icons'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Index() {
  const router = useRouter();
  const { user } = useUserStore()

  const greeting = user?.firstName ? `Hello, ${user?.firstName}!` : 'Hello!';

  return (
    <>
      <Header
        title="Empresos"
        logo={icons.logo}
        titleAlignment="left"
      />
      <SafeAreaView edges={['bottom', 'left', 'right']} className="flex-1 bg-white">
        <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
          <View className="relative">
            <View className='bg-[#bdb8c9] px-4 py-2 rounded-bl-3xl rounded-br-3xl mb-6'>
              {/* Greeting */}
              <View className=" mb-4">
                <Text className="text-2xl font-bold text-gray-800">{greeting}</Text>
                {/* <Text className="text-sm text-gray-600 ">
                  Balance: {user?.accounts[0].balance}
                </Text> */}
                <Text className="text-sm text-black mt-1">Your finances are looking good</Text>
              </View>

              {/* Current Accounts Graph */}
              <View className="bg-[#CEC2CC] rounded-xl p-4 mb-4">
                <Text className="text-base font-bold text-gray-800 mb-4">CURRENT ACCOUNTS</Text>

                {/* Simple line graph representation */}
                <ThreeMonthLineChart
                  data={[1100, 1500, 1200]}
                />
              </View>

              {/* Action Buttons */}
              <View className="flex-row justify-between mb-6">
                <TouchableOpacity className="bg-[#CEC2CC] rounded-lg p-3 items-center w-[22%]"
                  onPress={() => router.push(SEND_MONEY_URL)}
                >
                  <Image source={icons.sendIcon} className="w-6 h-6 mb-2" />
                  <Text className="text-xs text-center text-gray-800">Send money</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-[#CEC2CC] rounded-lg p-3 items-center w-[22%]"
                  onPress={() => router.push(PROFILE_URL)}
                >
                  <Image source={icons.settingsIcons} className="w-6 h-6 mb-2" />
                  <Text className="text-xs text-center text-gray-800">Personal area</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-[#CEC2CC] rounded-lg p-3 items-center w-[22%]"
                  onPress={() => router.push(BILLS_URL)}
                >
                  <Image source={icons.billsIcon} className="w-6 h-6 mb-2" />
                  <Text className="text-xs text-center text-gray-800">View bills</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#CEC2CC] rounded-lg p-3 items-center w-[22%]"
                  onPress={() => router.push(BILLS_URL)}
                >
                  <Image source={icons.billsIcon} className="w-6 h-6 mb-2" />
                  <Text className="text-xs text-center text-gray-800">Explore Products</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* The circle with plus sign */}
            <View className="absolute left-1/2 -translate-x-1/2 bottom-[-2px] w-12 h-12 rounded-full bg-[#bdb8c9] items-center justify-center  z-10">
              <Text className="text-3xl text-[#C33A31] font-light">+</Text>
            </View>
          </View>

          <View className='px-4 mt-6'>
            {/* Financing Banner */}
            <TouchableOpacity className="bg-[#7d3c5a] rounded-xl p-4 flex-row items-center mb-4">
              <View className="w-7 h-7 mr-3 items-center justify-center">
                <Image source={icons.moneyBag} className="w-full h-full" tintColor="#fff" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-white">ARE YOU LOOKING FOR FINANCING?</Text>
                <Text className="text-xs text-white opacity-80">See all the options we have for your company</Text>
              </View>
            </TouchableOpacity>

            {/* Accounts Section */}
            <View className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
              <View className="flex-row items-center ">
                <Text className="text-lg font-bold text-gray-800">Accounts</Text>
                <View className="bg-gray-100 rounded-full w-6 h-6 items-center justify-center ml-2">
                  <Text className="text-xs font-bold text-gray-800">1</Text>
                </View>
                <Image source={icons.arrowDown} className="w-5 h-5 ml-auto" />
              </View>

              <View className='border-b border-gray-100 mb-4 ' />

              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-base text-gray-800">Balance</Text>
                <Text className="text-base font-bold text-gray-800">$450.00</Text>
              </View>

              <View className="bg-[#e6f2f7] p-3 rounded-lg mt-2">
                <Text className="text-sm text-gray-800 text-center">You have 54 new movements</Text>
              </View>
            </View>

            {/* Credit Card Section */}
            <View className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
              <View className="flex-row items-center">
                <Text className="text-lg font-bold text-gray-800">Credit Card</Text>
                <View className="bg-gray-100 rounded-full w-6 h-6 items-center justify-center ml-2">
                  <Text className="text-xs font-bold text-gray-800">1</Text>
                </View>
                <Image source={icons.arrowDown} className="w-5 h-5 ml-auto" />
              </View>
              <View className='border-b border-gray-100 mb-4 ' />

              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-base text-gray-800">Drawn balance</Text>
                <Text className="text-base font-bold text-gray-800">$450.00</Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-base text-gray-800">Undrawn</Text>
                <Text className="text-base font-bold text-gray-800">$50.00</Text>
              </View>
            </View>

            {/* Extra space at bottom for FAB */}
            <View className="h-20" />
          </View>
        </ScrollView>

        {/* Floating Action Button */}
        <TouchableOpacity className="absolute bottom-6 self-center bg-white w-14 h-14 rounded-full justify-center items-center shadow-md">
          <Image source={icons.plus} className="w-6 h-6" tintColor="#e63946" />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
}
