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
        name="docubox"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="payments"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 