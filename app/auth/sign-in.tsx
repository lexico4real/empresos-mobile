import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/button/button";
import FormField from "@/components/form/form-field";
import StatusModal from "@/components/modals/status-modal";
import AppHeader from "@/components/nav/app-header";

import { SIGN_UP_URL } from "@/config/routes";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import usePostOtp from "@/hooks/mutation/usePostOtp";
import { useModalStore } from "@/store/modalStore";

export default function SignInScreen() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const { isPending, handlePostOtp } = usePostOtp();
  const { showModal, hideModal, ...modalState } = useModalStore();

  useEffect(() => {
    // Logic to load saved credentials remains the same
    const loadSavedCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("userEmail");
        if (savedEmail) setForm((prev) => ({ ...prev, email: savedEmail }));
      } catch (error) {
        console.error("Failed to load saved email:", error);
      }
    };
    loadSavedCredentials();
  }, []);

  const handleSignIn = async () => {
    if (!form.email.trim() || !form.password.trim()) {
      showModal("error", "Please fill in all fields");
      return;
    }

    try {
      await AsyncStorage.setItem("userEmail", form.email);
      await AsyncStorage.setItem("userPassword", form.password);
      showModal("loading", "Signing in...");
      handlePostOtp({ email: form.email, password: form.password });
    } catch (error) {
      console.error("Error signing in:", error);
      showModal("error", "Failed to sign in. Please try again.");
    }
  };

  useEffect(() => {
    hideModal();
  }, []);

  return (
    <>
      <AppHeader title="Sign In" />
      <SafeAreaView
        style={styles.container}
        edges={["bottom", "left", "right"]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.content}>
              {/* Top section with profile image */}
              {/* <View style={styles.imageContainer}>
                <Image source={images.Profile} style={styles.profileImage} />
              </View> */}

              {/* Middle section with form */}
              <View style={styles.formContainer}>
                <Text style={styles.title}>Welcome Back</Text>

                <FormField
                  title="Email"
                  value={form.email}
                  handleChangeText={(text) => setForm({ ...form, email: text })}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  containerStyle={styles.formField}
                />

                <FormField
                  title="Password"
                  value={form.password}
                  handleChangeText={(text) =>
                    setForm({ ...form, password: text })
                  }
                  placeholder="Enter your password"
                  isPassword={true}
                  containerStyle={styles.formField}
                />

                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.forgotPasswordButton}
                >
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Bottom section with buttons */}
              <View style={styles.bottomContainer}>
                <Button
                  title="Sign In"
                  onPress={handleSignIn}
                  disabled={!form.email || !form.password || isPending}
                  loading={isPending}
                  loadingText="Signing in..."
                />
                <Text style={styles.signUpText}>
                  Don't have an account?{" "}
                  <Link href={SIGN_UP_URL} style={styles.signUpLink}>
                    Sign Up
                  </Link>
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <StatusModal
        visible={modalState.visible}
        type={modalState.type}
        message={modalState.message}
        onClose={hideModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: SIZES.base * 2,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: SIZES.base * 3,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  formContainer: {
    flex: 2,
    justifyContent: "center",
    marginTop: SIZES.base * 2,
  },
  title: {
    ...FONTS.h2,
    textAlign: "center",
    marginBottom: SIZES.base * 2,
    color: COLORS.secondary,
  },
  formField: {
    marginBottom: SIZES.base,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: SIZES.base,
    marginBottom: SIZES.base * 2,
  },
  forgotPasswordText: {
    ...FONTS.body,
    fontWeight: "500",
    color: COLORS.primary,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: SIZES.base * 2,
  },
  signUpText: {
    ...FONTS.body,
    textAlign: "center",
    color: COLORS.grey,
    marginTop: SIZES.base,
  },
  signUpLink: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
