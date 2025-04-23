import { Stack } from 'expo-router';
import React from 'react';

export default function FundsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="send-money"
      />
      <Stack.Screen
        name="transfer-options"
      />
      <Stack.Screen
        name="transfers"
      />

    </Stack>
  );
} 