import { AuthProvider, useAuth } from "@/providers/auth-context";
import {
  OnboardingProvider,
  useOnboarding,
} from "@/providers/onboarding-context";
import TanstackProvider from "@/providers/tanstack-provider";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "./global.css";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function AppStack() {
  const { isOnboarded, isLoading: isOnboardingLoading } = useOnboarding();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const isLoading = isOnboardingLoading || isAuthLoading;

  if (isLoading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Main app for authenticated and onboarded users */}
      <Stack.Protected guard={isAuthenticated && isOnboarded}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      {/* Onboarding for users who haven't onboarded */}
      <Stack.Protected guard={!isOnboarded}>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack.Protected>
      {/* Login for onboarded but not authenticated users */}
      <Stack.Protected guard={isOnboarded && !isAuthenticated}>
        <Stack.Screen name="auth/sign-in" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsReady(true);
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <TanstackProvider>
      <AuthProvider>
        <OnboardingProvider>
          <AppStack />
        </OnboardingProvider>
      </AuthProvider>
    </TanstackProvider>
  );
}
