import CustomDrawerContent from "@/components/nav/drawer-content";
import { useAuth } from "@/providers/auth-context";
import { authService } from "@/services/auth.service";
import { Drawer } from "expo-router/drawer";
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#C33A31" />
      </View>
    );
  }

  return (
    <Drawer
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        swipeEnabled: true,
        drawerStyle: {
          width: "85%",
        },
      }}
    />
  );
}
