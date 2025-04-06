import Header from '@/components/common/header'
import icons from '@/constants/icons'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Svg, Path, Circle, Line, Text as SvgText } from 'react-native-svg';


export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-[#f0ece9]">
      {/* Using the existing Header component */}
      <Header
        title="Empresos"
        showBackArrow={true}
        backArrowIcon={icons.back}
        logo={icons.logo}
        rightIcon={icons.close}
        onRightPress={() => {/* Handle menu press */ }}
        className="px-4 py-2"
      />

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View className="mt-2 mb-4">
          <Text className="text-2xl font-bold text-gray-800">Hello Debs!</Text>
          <Text className="text-sm text-gray-600 mt-1">Your finances are looking good</Text>
        </View>

        {/* Current Accounts Graph */}
        <View className="bg-[#e8dcd7] rounded-xl p-4 mb-4">
          <Text className="text-base font-bold text-gray-800 mb-4">CURRENT ACCOUNTS</Text>

          {/* Simple line graph representation */}
          <View className="h-32">
            <Svg height="100%" width="100%" viewBox="0 0 300 100">
              <Line x1="0" y1="90" x2="300" y2="90" stroke="#333" strokeWidth="1" />
              <SvgText x="20" y="110" fontSize="12" fill="#333">Total balance</SvgText>
              <SvgText x="120" y="110" fontSize="12" fill="#333">OCT</SvgText>
              <SvgText x="200" y="110" fontSize="12" fill="#333">NOV</SvgText>
              <SvgText x="280" y="110" fontSize="12" fill="#333">DEC</SvgText>

              {/* Line graph */}
              <Path
                d="M20,50 L100,20 L180,40 L240,30 L300,80"
                fill="none"
                stroke="#2D8A78"
                strokeWidth="2"
              />
              <Circle cx="20" cy="50" r="3" fill="white" stroke="#2D8A78" strokeWidth="1" />
              <Circle cx="100" cy="20" r="3" fill="white" stroke="#2D8A78" strokeWidth="1" />
              <Circle cx="180" cy="40" r="3" fill="white" stroke="#2D8A78" strokeWidth="1" />
              <Circle cx="240" cy="30" r="3" fill="white" stroke="#2D8A78" strokeWidth="1" />
              <Circle cx="300" cy="80" r="3" fill="white" stroke="#2D8A78" strokeWidth="1" />
            </Svg>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity className="bg-[#e8dcd7] rounded-lg p-3 items-center w-[22%]">
            <Image source={icons.sendIcon} className="w-6 h-6 mb-2" />
            <Text className="text-xs text-center text-gray-800">Send money</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#e8dcd7] rounded-lg p-3 items-center w-[22%]">
            <Image source={icons.settingsIcons} className="w-6 h-6 mb-2" />
            <Text className="text-xs text-center text-gray-800">Personal area</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#e8dcd7] rounded-lg p-3 items-center w-[22%]">
            <Image source={icons.billsIcon} className="w-6 h-6 mb-2" />
            <Text className="text-xs text-center text-gray-800">View bills</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity className="bg-[#7d3c5a] rounded-lg p-3 items-center w-[22%]">
            <Image source={homeIcons.tpv} className="w-6 h-6 mb-2 tint-white" />
            <Text className="text-xs text-center text-white">TPV</Text>
          </TouchableOpacity> */}
        </View>

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
        <View className="bg-white rounded-xl p-4 mb-4">
          <View className="flex-row items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">Accounts</Text>
            <View className="bg-gray-100 rounded-full w-6 h-6 items-center justify-center ml-2">
              <Text className="text-xs font-bold text-gray-800">1</Text>
            </View>
            <Image source={icons.arrowDown} className="w-5 h-5 ml-auto" />
          </View>

          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base text-gray-800">Balance</Text>
            <Text className="text-base font-bold text-gray-800">$450.00</Text>
          </View>

          <View className="bg-[#e6f2f7] p-3 rounded-lg mt-2">
            <Text className="text-sm text-gray-800 text-center">You have 54 new movements</Text>
          </View>
        </View>

        {/* Credit Card Section */}
        <View className="bg-white rounded-xl p-4 mb-4">
          <View className="flex-row items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">Credit Card</Text>
            <View className="bg-gray-100 rounded-full w-6 h-6 items-center justify-center ml-2">
              <Text className="text-xs font-bold text-gray-800">1</Text>
            </View>
            <Image source={icons.arrowDown} className="w-5 h-5 ml-auto" />
          </View>

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
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-6 self-center bg-white w-14 h-14 rounded-full justify-center items-center shadow-md">
        <Image source={icons.plus} className="w-6 h-6" tintColor="#e63946" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}
