import Header from '@/components/common/header';
import { SALARY_PENSION_URL, SCHEDULED_TRANSFERS_URL, TRANSFERS_URL } from '@/config/routes';
import icons from '@/constants/icons';
import { Link } from 'expo-router'; // Import Link for navigation if needed later
import React, { useState } from 'react';
import { Image, LayoutAnimation, Platform, ScrollView, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Define the structure for transfer options based on the image
const transferOptions = [
  {
    id: '1',
    icon: icons.moneyIcon,
    title: 'Transfers',
    subtitle: 'National and international',
    route: TRANSFERS_URL,
  },
  {
    id: '2',
    icon: icons.moneyBag,
    title: 'Salary and pension payments',
    subtitle: 'Immediate payment',
    route: SALARY_PENSION_URL,
  },
  {
    id: '3',
    icon: icons.refresh,
    title: 'Scheduled and periodic transfers',
    subtitle: 'Schedule and manage your transfers',
    route: SCHEDULED_TRANSFERS_URL,
  },
];

// Define the structure for FAQ items (add dummy answer)
const faqItems = [
  { id: 'faq1', question: 'How to make a periodic transfer?', answer: 'This is how you make a periodic transfer. [Details...] ' },
  { id: 'faq2', question: 'How to make a national transfer?', answer: 'This is how you make a national transfer. [Details...]' },
  { id: 'faq3', question: 'How to make a deferred transfer?', answer: 'This is how you make a deferred transfer. [Details...]' },
  { id: 'faq4', question: 'How to make a transfer?', answer: 'This is how you make a transfer. [Details...]' },
];

export default function TransferOptionsScreen() {
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  return (
    <>
      <Header
        title="Sending money"
        showBackArrow={true}
        backArrowIcon={icons.back}
        titleAlignment="center"
      />
      <SafeAreaView className='flex-1 bg-gray-50' edges={['bottom', 'left', 'right']}>
        <ScrollView className='flex-1'>
          <View className='px-4 py-6'>
            <Text className='text-lg font-semibold mb-4 text-gray-700'>All options</Text>

            {/* Transfer Options List */}
            {transferOptions.map((item) => (
              // Using Link component for potential navigation later
              <Link key={item.id} href={item.route as any} asChild>
                <TouchableOpacity
                  className='bg-white rounded-lg p-4 mb-3 flex-row items-center justify-between'
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 1,
                  }}
                // onPress={() => router.push(item.route)} // Or handle press directly
                >
                  <View className='flex-row items-center gap-4 flex-1'>

                    <Image source={item.icon} className='w-6 h-6 text-red-600' resizeMode="contain" tintColor="#D32F2F" />
                    <View className='flex-1'>
                      <Text className='text-base font-medium text-gray-800'>{item.title}</Text>
                      <Text className='text-sm text-gray-500'>{item.subtitle}</Text>
                    </View>
                  </View>
                  <Image source={icons.rightArrow} className='w-4 h-4' resizeMode="contain" tintColor="#A0A0A0" />
                </TouchableOpacity>
              </Link>
            ))}
          </View>

          {/* FAQ Section */}
          <View className='bg-[#004D50] mt-4 p-4 mx-4 rounded-lg'>
            <Text className='text-white text-lg font-semibold mb-2'>Do you have any doubt?</Text>
            {faqItems.map((item, index) => {
              const isExpanded = expandedFaqId === item.id;
              return (
                <View key={item.id} className={`border-b border-gray-600 ${index === faqItems.length - 1 ? 'border-b-0' : ''}`}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => toggleFaq(item.id)}
                    className={'flex-row justify-between items-center py-3'}
                  >
                    <Text className='text-white text-sm flex-1 pr-2'>{item.question}</Text>
                    <Image
                      source={isExpanded ? icons.arrowDown : icons.arrowDown} // Change icon based on state
                      className='w-4 h-4'
                      resizeMode='contain'
                      tintColor="#FFFFFF"
                    />
                  </TouchableOpacity>
                  {isExpanded && (
                    <View className="pb-3">
                      <Text className='text-gray-300 text-sm'>{item.answer}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
} 