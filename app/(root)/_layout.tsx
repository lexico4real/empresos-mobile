import { HOME_URL, SIGN_IN_URL } from '@/config/routes';
import { useAuth } from '@/context/auth-context';
import { authService } from '@/services/auth.service';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'auth';

    if (isAuthenticated && !segments.length) {
      router.replace(HOME_URL);
    } else if (!isAuthenticated && !inAuthGroup) {
      router.replace(SIGN_IN_URL);
    }
  }, [isAuthenticated, isLoading, segments, router]);

  useEffect(() => {
    if (isAuthenticated) {
      authService.loadToken();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#C33A31" />
      </View>
    );
  }

  return <Slot />;
}