import { Stack } from 'expo-router';
import React from 'react';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen
        name="contact-details"

      />
      <Stack.Screen
        name="configuration"

      />
      <Stack.Screen
        name="security"

      />
      <Stack.Screen
        name="document"

      />
      <Stack.Screen
        name="payment"

      />
      <Stack.Screen
        name="app-info"

      />
      <Stack.Screen
        name="language-configuration"
      />
    </Stack>
  );
} 