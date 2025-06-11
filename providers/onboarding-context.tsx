import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface OnboardingContextType {
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
  isLoading: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOnboarded, setIsOnboardedState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOnboarding = async () => {
      const onboardedStatus = await AsyncStorage.getItem("isOnboarded");
      setIsOnboardedState(onboardedStatus === "true");
      setIsLoading(false);
    };
    loadOnboarding();
  }, []);

  const setIsOnboarded = (value: boolean) => {
    setIsOnboardedState(value);
    AsyncStorage.setItem("isOnboarded", value ? "true" : "false");
  };

  return (
    <OnboardingContext.Provider
      value={{ isOnboarded, setIsOnboarded, isLoading }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context)
    throw new Error("useOnboarding must be used within OnboardingProvider");
  return context;
}
