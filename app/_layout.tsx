import { SIGN_OPTION_URL } from '@/config/routes';
import { AuthProvider } from "@/context/auth-context";
import TanstackProvider from "@/context/tanstack-provider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slot, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "./global.css";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();


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

  return <TanstackProvider>
    <AuthProvider>
      <Slot />
    </AuthProvider>
  </TanstackProvider>;
}
