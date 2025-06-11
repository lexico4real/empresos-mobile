import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

import Button from "@/components/button/button";
import { SIGN_IN_URL, SIGN_UP_URL } from "@/config/routes";
import images from "@/constants/images";
import { COLORS, FONTS, SIZES } from "@/constants/theme";

export default function SignOptionScreen() {
  const router = useRouter();

  const handleNavigation = async (route: string) => {
    try {
      await AsyncStorage.setItem("isOnboarded", "true");
      router.push(route);
    } catch (error) {
      console.error("Error setting onboarding status:", error);
      router.push(route);
    }
  };

  return (
    <ImageBackground
      source={images.LadyWithPhone}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.contentContainer}>
        <Image
          source={images.empresosIconWhite}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Hi there!</Text>
          <Text style={styles.welcomeText}>Welcome to Santander.</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Sign Up"
            onPress={() => handleNavigation(SIGN_UP_URL)}
          />

          <Button
            title="Sign In"
            onPress={() => handleNavigation(SIGN_IN_URL)}
            variant="outline"
            containerStyle={styles.signInButton}
            textStyle={styles.signInButtonText}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: SIZES.base * 4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 128,
    height: 128,
    position: "absolute",
    top: "20%",
  },
  welcomeContainer: {
    position: "absolute",
    bottom: "45%",
    alignItems: "center",
  },
  welcomeText: {
    ...FONTS.h2,
    color: COLORS.white,
    textAlign: "center",
    marginBottom: SIZES.base,
  },
  buttonContainer: {
    position: "absolute",
    bottom: "15%",
    width: "100%",
    gap: SIZES.base * 2,
  },
  signInButton: {
    backgroundColor: "transparent",
    borderColor: COLORS.white,
  },
  signInButtonText: {
    color: COLORS.white,
  },
});
