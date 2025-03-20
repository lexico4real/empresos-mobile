import { Slot, Stack, router } from "expo-router";
import "./global.css";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIGN_OPTION_URL } from '@/config/routes';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Development only: Function to clear onboarding status
const clearOnboardingStatus = async () => {
  try {
    await AsyncStorage.removeItem('isOnboarded');
    console.log('Onboarding status cleared');
  } catch (error) {
    console.error('Error clearing onboarding status:', error);
  }
};

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    async function prepare() {
      try {
        // Clear onboarding status
        // await clearOnboardingStatus();

        // Check if user has completed onboarding
        const onboardedStatus = await AsyncStorage.getItem('isOnboarded');
        setIsOnboarded(onboardedStatus === 'true');

        // Artificially delay for 2 seconds to see the splash screen
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsReady(true);
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  // Handle navigation after mount
  useEffect(() => {
    if (isReady && isOnboarded === true) {
      router.push(SIGN_OPTION_URL);
    }
  }, [isReady, isOnboarded]);

  if (!isReady) {
    return null;
  }

  return <Slot />;
}
