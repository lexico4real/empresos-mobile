import Header from '@/components/common/header';
import { Recipient, TransferOption } from '@/config/types';
import icons from '@/constants/icons';
import { recipients, transferOptions } from '@/data';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SendMoney() {
  const router = useRouter();

  const renderRecipient = ({ item }: { item: Recipient }) => {
    if (item.type === 'new') {
      return (
        <TouchableOpacity
          className='bg-white rounded-xl p-4 flex-1 items-center justify-center mr-4'
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
          }}
          onPress={() => router.push('/funds/transfer-options')}
        >
          <View className='w-12 h-12 bg-[#137E84] rounded-full items-center justify-center mb-2'>
            <Text className='text-white text-2xl'>+</Text>
          </View>
          <Text className='text-base font-medium mb-1'>New transfer</Text>
          <Text className='text-xs text-gray-500 text-center'>
            {item.accountNumber}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        className='bg-white rounded-xl p-4 items-center justify-center w-24 mr-4'
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        }}
      >
        <View className='w-12 h-12 bg-[#E4F4FF] rounded-full items-center justify-center mb-2'>
          <Text className='text-[#137E84] text-xl font-medium'>{item.initial}</Text>
        </View>
        <Text className='text-xs text-gray-500'>{item.accountNumber}</Text>
      </TouchableOpacity>
    );
  };

  const renderTransferOption = ({ item }: { item: TransferOption }) => (
    <TouchableOpacity
      className='bg-white rounded-xl p-4 mb-4 flex-row items-center justify-between'
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      <View className='flex-row items-center gap-4'>
        <Image source={icons.moneyIcon} className='w-5 h-5' resizeMode="contain" />
        <View>
          <Text className='text-base font-medium'>{item.title}</Text>
          <Text className='text-sm text-gray-500'>{item.subtitle}</Text>
        </View>
      </View>
      <Image source={icons.rightArrow} className='w-5 h-5' resizeMode="contain" />
    </TouchableOpacity>
  );

  return (
    <>
      <Header
        title="Send Money"
        showBackArrow={true}
        backArrowIcon={icons.back}
        titleAlignment="center"
      />
      <SafeAreaView className='flex-1 bg-white' edges={['bottom', 'left', 'right']}>
        <View className='flex-1 px-6 py-6'>
          <Text className='text-xl font-bold mb-4'>Choose Recipient</Text>

          <FlatList
            data={recipients}
            renderItem={renderRecipient}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            className='mb-6'
          />

          {/* No Data Section */}
          <View
            className='bg-white rounded-xl p-8 items-center mb-8'
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 1,
            }}
          >
            <Image
              source={icons.cloudIcon}
              className='w-8 h-8 mb-4'
              resizeMode="contain"
            />
            <Text className='text-lg font-medium mb-2'>No data yet!</Text>
            <Text className='text-sm text-gray-500 text-center'>
              Your history will appear here once you start transactions
            </Text>
          </View>

          <Text className='text-xl font-bold mb-4'>All Options</Text>

          <FlatList
            data={transferOptions}
            renderItem={renderTransferOption}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </SafeAreaView>
    </>
  );
}