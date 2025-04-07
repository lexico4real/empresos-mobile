import { Stack } from 'expo-router';
import React from 'react';

export default function FundsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="send-money"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 