import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/button/button";
import { SIGN_IN_URL } from "@/config/routes";
import { SlideItem } from "@/config/types";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { slides } from "@/data";

const { width, height } = Dimensions.get("window");

const Slide = ({
  item,
  currentIndex,
  totalSlides,
  onNext,
  onPrev,
  onSkip,
}: {
  item: SlideItem;
  currentIndex: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
}) => {
  const renderTitle = (title: string, highlight: string) => {
    if (!highlight || !title.includes(highlight)) {
      return <Text style={styles.titleText}>{title}</Text>;
    }
    const parts = title.split(highlight);
    return (
      <Text style={styles.titleText}>
        {parts[0]}
        <Text style={{ color: COLORS.primary }}>{highlight}</Text>
        {parts[1]}
      </Text>
    );
  };

  return (
    <View style={styles.slideContainer}>
      {/* Top Navigation */}
      <SafeAreaView style={styles.topNav}>
        <TouchableOpacity onPress={onPrev} disabled={currentIndex === 0}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={currentIndex === 0 ? "transparent" : COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.topNavTitle}>Welcome</Text>
        <TouchableOpacity onPress={onSkip}>
          <Ionicons name="close" size={24} color={COLORS.grey} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={item.image}
          style={styles.slideImage}
          resizeMode="contain"
        />
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {renderTitle(item.title, item.titleHighlight)}
        <Text style={styles.subtitleText}>{item.subtitle}</Text>

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {Array(totalSlides)
            .fill(0)
            .map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === currentIndex && styles.activeDot]}
              />
            ))}
        </View>

        {/* Next Button */}
        <Button
          title={
            currentIndex === totalSlides - 1 ? "Let's Get Started" : "Next"
          }
          onPress={onNext}
        />
      </View>
    </View>
  );
};

export default function OnboardingScreen() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentSlideIndex + 1 });
    } else {
      completeOnboarding();
    }
  };

  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentSlideIndex - 1 });
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("isOnboarded", "true");
      router.replace(SIGN_IN_URL);
    } catch (error) {
      console.error("Error setting onboarding status:", error);
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentSlideIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.lightGrey} />
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item }) => (
          <Slide
            item={item}
            currentIndex={currentSlideIndex}
            totalSlides={slides.length}
            onNext={goToNextSlide}
            onPrev={goToPrevSlide}
            onSkip={completeOnboarding}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        keyExtractor={(item) => item.id}
        bounces={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  slideContainer: {
    width: width,
    height: height,
    backgroundColor: COLORS.lightGrey,
    alignItems: "center",
  },
  topNav: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.base * 3,
    marginTop: Platform.OS === "android" ? SIZES.base * 2 : 0,
  },
  topNavTitle: {
    ...FONTS.h4,
    color: COLORS.primary,
  },
  imageContainer: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  slideImage: {
    width: "80%",
    height: "80%",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius * 3,
    borderTopRightRadius: SIZES.radius * 3,
    paddingHorizontal: SIZES.base * 4,
    paddingTop: SIZES.base * 5,
    paddingBottom: SIZES.base * 4,
    alignItems: "center",
  },
  titleText: {
    ...FONTS.h2,
    fontSize: SIZES.h1,
    textAlign: "center",
    color: COLORS.secondary,
    marginBottom: SIZES.base * 2,
  },
  subtitleText: {
    ...FONTS.body,
    textAlign: "center",
    color: COLORS.grey,
    lineHeight: 22,
    marginBottom: SIZES.base * 4,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.base * 4,
  },
  dot: {
    height: SIZES.base,
    width: SIZES.base,
    borderRadius: SIZES.base / 2,
    backgroundColor: COLORS.lightBorder,
    marginHorizontal: SIZES.base / 2,
  },
  activeDot: {
    width: SIZES.base * 3,
    backgroundColor: COLORS.primary,
  },
});
