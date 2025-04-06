// screens/Bills.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/common/header';

import icons from '@/constants/icons';
import { bills, latestBills } from '@/data/index';
import BillCard from '@/components/bills/bill-card';
import BillItem from '@/components/bills/bill-items';

export default function Bills() {
  return (
    <SafeAreaView className="flex-1 bg-white" >
      <StatusBar backgroundColor="#f0ebe9" barStyle="dark-content" />

      <Header
        title="Bills & Taxes"
        showBackArrow={true}
        backArrowIcon={icons.back}
        rightIcon={icons.menu}
        onRightPress={() => console.log('Menu pressed')}
      />

      <FlatList
        data={latestBills}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-4"
        ListHeaderComponent={() => (
          <>
            {/* Bill Categories */}
            <View className="flex-row gap-4 mt-4 mb-6">
              {bills.map((category) => (
                <BillCard
                  key={category.id}
                  title={category.title}
                  icon={category.icon}
                  description={category.description}
                  onPress={() => console.log(`${category.title} pressed`)}
                />
              ))}
            </View>

            {/* Latest Bills Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-800">LATEST BILLS</Text>
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => console.log('Filters pressed')}
              >
                <Image
                  source={icons.filter || require('@/assets/icons/filter.png')}
                  className="w-5 h-5 mr-2"
                />
                <Text className="text-gray-800">Filters</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <BillItem
            date={item.date}
            day={item.day}
            biller={item.biller}
            description={item.description}
            amount={item.amount}
            status={item.status}
            onPress={() => console.log(`Bill ${item.id} pressed`)}
          />
        )}
      />
    </SafeAreaView>
  );
}