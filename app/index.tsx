import { SIGN_IN_URL, SIGN_OPTION_URL } from '@/config/routes';
import images from '@/constants/images';
import { router, useNavigation } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Dimensions, Animated, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SlideItem } from '@/config/types';
import { slides } from '@/data';

const { width, height } = Dimensions.get('window');

export default function Onboarding() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigation = useNavigation();
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      Animated.timing(slideAnimation, {
        toValue: -(currentSlideIndex + 1) * width,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      goToLogin();
    }
  };

  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      Animated.timing(slideAnimation, {
        toValue: -(currentSlideIndex - 1) * width,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const goToLogin = () => {
    router.push(SIGN_OPTION_URL);
  };

  const renderTitle = (title: string, highlight: string) => {
    if (!highlight || !title.includes(highlight)) {
      return <Text className="text-2xl font-bold text-center">{title}</Text>;
    }

    const parts = title.split(highlight);
    return (
      <Text className="text-2xl font-bold text-center">
        {parts[0]}
        <Text className="text-primary-300">{highlight}</Text>
        {parts[1]}
      </Text>
    );
  };

  const Slide = ({ item }: { item: SlideItem }) => {
    return (
      <View className="w-screen h-screen bg-[#F5F5F5]">
        {/* Top Navigation */}
        <SafeAreaView className="px-5">
          <View className="flex-row justify-between items-center mt-2.5">
            <TouchableOpacity onPress={goToPrevSlide}>
              <Ionicons name="chevron-back" size={24} color="#C33A31" className="text-primary-300" />
            </TouchableOpacity>
            <Text className="text-base font-medium">Welcome</Text>
            <TouchableOpacity onPress={goToLogin}>
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
        <View className="bg-white px-8 pt-10 pb-8">
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
            {slides.map((_, index) => (
              <View
                key={index}
                className={`h-2 mx-0.5 rounded-full ${index === currentSlideIndex
                  ? "w-6 bg-primary-300"
                  : "w-2 bg-gray-200"
                  }`}
              />
            ))}
          </View>

          {/* Next Button */}
          <TouchableOpacity
            className="bg-primary-300 py-4 rounded-full items-center mx-5"
            onPress={goToNextSlide}
          >
            <Text className="text-white font-semibold text-base">
              {currentSlideIndex === slides.length - 1 ? "Let's get started" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <Animated.View
        className="flex-row"
        style={{
          width: width * slides.length,
          transform: [{ translateX: slideAnimation }],
        }}
      >
        {slides.map((item) => (
          <Slide key={item.id} item={item} />
        ))}
      </Animated.View>
    </View>
  );
}