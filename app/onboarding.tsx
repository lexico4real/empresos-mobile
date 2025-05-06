import { SIGN_OPTION_URL } from '@/config/routes';

import { SlideItem } from '@/config/types';
import { slides } from '@/data';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const Slide = ({ item, currentIndex, totalSlides, onNext, onPrev, onSkip }: {
  item: SlideItem;
  currentIndex: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
}) => {
  const renderTitle = (title: string, highlight: string) => {
    if (!highlight || !title.includes(highlight)) {
      return <Text className="text-2xl font-bold text-center">{title}</Text>;
    }

    const parts = title.split(highlight);
    return (
      <Text className="text-3xl font-bold text-center">
        {parts[0]}
        <Text className="text-primary-300">{highlight}</Text>
        {parts[1]}
      </Text>
    );
  };

  return (
    <View className="w-screen h-screen bg-[#F5F5F5]">
      {/* Top Navigation */}
      <SafeAreaView className="px-5">
        <View className="flex-row justify-between items-center mt-2.5">
          <TouchableOpacity onPress={onPrev}>
            <Ionicons name="chevron-back" size={24} color="#C33A31" className="text-primary-300" />
          </TouchableOpacity>
          <Text className="text-base font-medium text-primary-300">Welcome</Text>
          <TouchableOpacity onPress={onSkip}>
            <Ionicons name="close" size={24} color="#888" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Image Section */}
      <View className="flex-1 justify-center items-center px-5">
        <Image
          source={item.image}
          className="w-4/5 h-3/5"
          resizeMode="contain"
        />
      </View>

      {/* Content Section */}
      <View className={`bg-white px-8 pt-10 pb-8 ${Platform.OS === "android" && "my-16"}`}>
        {/* Title */}
        <View className="mb-4">
          {renderTitle(item.title, item.titleHighlight)}
        </View>

        {/* Subtitle */}
        <Text className="text-center text-gray-600 mb-8 leading-6">
          {item.subtitle}
        </Text>

        {/* Pagination Dots */}
        <View className="flex-row justify-center mb-8">
          {Array(totalSlides).fill(0).map((_, index) => (
            <View
              key={index}
              className={`h-2 mx-0.5 rounded-full ${index === currentIndex
                ? "w-6 bg-primary-300"
                : "w-2 bg-gray-200"
                }`}
            />
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          className={`bg-primary-300 py-4 rounded-full items-center mx-5 ${Platform.OS === "android" && "relative "} ${currentIndex === totalSlides - 1 ? "bg-primary-300" : "bg-primary-300 "}`}
          onPress={onNext}
        >
          <Text className="text-white font-semibold text-base">
            {currentIndex === totalSlides - 1 ? "Let's Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function Onboarding() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentSlideIndex + 1,
        animated: true
      });
    } else {
      goToLogin();
    }
  };

  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentSlideIndex - 1,
        animated: true
      });
    }
  };

  const goToLogin = async () => {
    try {
      await AsyncStorage.setItem('isOnboarded', 'true');
      router.push(SIGN_OPTION_URL);
    } catch (error) {
      console.error('Error setting onboarding status:', error);
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentSlideIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item, index }) => (
          <Slide
            item={item}
            currentIndex={currentSlideIndex}
            totalSlides={slides.length}
            onNext={goToNextSlide}
            onPrev={goToPrevSlide}
            onSkip={goToLogin}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
    </View>
  );
}