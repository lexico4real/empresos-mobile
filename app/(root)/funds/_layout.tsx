import { useAuth } from "@/providers/auth-context";
import { Stack } from "expo-router";
import React from "react";

export default function FundsLayout() {
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
          name="send-money"
          options={{
            title: "Send Money",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="transfer-options"
          options={{
            title: "Transfer Options",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="transfers"
          options={{
            title: "Transfers",
            animation: "slide_from_right",
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
