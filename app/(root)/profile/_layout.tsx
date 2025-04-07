import { Stack } from 'expo-router';
import React from 'react';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="contact-details"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="configuration"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="security"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="document"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="payment"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="app-info"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="language-configuration"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 