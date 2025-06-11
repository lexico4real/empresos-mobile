import { useAuth } from "@/providers/auth-context";
import { authService } from "@/services/auth.service";
import { Slot, Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const { isAuthenticated, isLoading } = useAuth();

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

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Slot />
      </Stack.Protected>
    </Stack>
  );
}
