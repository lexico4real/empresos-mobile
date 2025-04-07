import Header from '@/components/common/header'
import icons from '@/constants/icons'
import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Language = {
  id: string;
  name: string;
};

export default function LanguageConfiguration() {
  const [selectedLanguage, setSelectedLanguage] = useState('2');

  const languages: Language[] = [
    { id: '1', name: 'Spain' },
    { id: '2', name: 'English' },
    { id: '3', name: 'Spain' },
    { id: '4', name: 'Spain' },
    { id: '5', name: 'Spain' },
    { id: '6', name: 'Spain' },
  ];

  const renderLanguageItem = ({ item }: { item: Language }) => {
    const isSelected = selectedLanguage === item.id;

    return (
      <TouchableOpacity
        onPress={() => setSelectedLanguage(item.id)}
        className={`w-[30%] aspect-square rounded-lg mb-4 items-center justify-center ${isSelected ? 'bg-[#137E84]' : 'bg-white'
          }`}
        style={{
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
      >
        <Image source={icons.languageIcon} className="w-4 h-4" resizeMode="contain" />
        <Text className={`mt-2 text-base ${isSelected ? 'text-white' : 'text-black'}`}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header
        title="Choice of Language"
        showBackArrow={true}
        backArrowIcon={icons.back}
        titleAlignment="center"
      />
      <SafeAreaView edges={['bottom', 'left', 'right']} className="flex-1 bg-gray-50">
        <View className="px-4 py-6">
          <Text className="text-xl font-bold mb-6">What language would you want to use?</Text>

          <FlatList
            data={languages}
            renderItem={renderLanguageItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            scrollEnabled={false}
          />
        </View>
      </SafeAreaView>
    </>
  )
}