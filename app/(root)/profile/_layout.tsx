import { useAuth } from "@/providers/auth-context";
import { Stack } from "expo-router";
import React from "react";

export default function ProfileLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen
          name="contact-details"
          options={{
            title: "Contact Details",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="configuration"
          options={{
            title: "Configuration",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="security"
          options={{
            title: "Security",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="document"
          options={{
            title: "Document",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="payment"
          options={{
            title: "Payment",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="app-info"
          options={{
            title: "App Info",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="language-configuration"
          options={{
            title: "Language Configuration",
            animation: "slide_from_right",
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
