import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import {
  Clipboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/button/button";
import AppHeader from "@/components/nav/app-header";

import { COLORS, FONTS, SIZES } from "@/constants/theme";
import usePostOtp from "@/hooks/mutation/usePostOtp";
import useSignIn from "@/hooks/mutation/useSignIn";
import { SignInData } from "@/lib/declarations";

export default function OtpScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRefs = useRef<TextInput[]>([]);

  const { isPending, handleSignIn } = useSignIn();
  const { isPending: isPendingResend, handlePostOtp } = usePostOtp();

  useEffect(() => {
    const loadEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      const password = await AsyncStorage.getItem("userPassword");
      if (email) setUserEmail(email);
      if (password) setUserPassword(password);
    };
    loadEmail();
  }, []);

  const handleOtpChange = async (text: string, index: number) => {
    // Handle paste operation
    if (text.length > 1) {
      // Clean the pasted text to only include numbers
      const cleanedText = text.replace(/\D/g, "").slice(0, 6);

      if (cleanedText.length === 6) {
        const newOtp = cleanedText.split("");
        setOtp(newOtp);
        inputRefs.current[5]?.focus();
        return;
      }
    }

    // Handle single digit input
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Add paste button handler
  const handlePasteButton = async () => {
    try {
      const clipboardContent = await Clipboard.getString();
      const cleanedText = clipboardContent.replace(/\D/g, "").slice(0, 6);

      if (cleanedText.length === 6) {
        const newOtp = cleanedText.split("");
        setOtp(newOtp);
        inputRefs.current[5]?.focus();
      }
    } catch (error) {
      console.error("Error reading clipboard:", error);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      const userSecret = await AsyncStorage.getItem("userSecret");
      const signInData: SignInData = {
        email: userEmail ?? "",
        password: userPassword ?? "",
        otp: otpString,
        secret: userSecret ?? "",
      };
      handleSignIn(signInData);
    }
  };

  const handleResend = () => {
    handlePostOtp({
      email: userEmail ?? "",
      password: userPassword ?? "",
    });
  };

  return (
    <>
      <AppHeader title="Verify OTP" />
      <SafeAreaView
        style={styles.container}
        edges={["bottom", "left", "right"]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.content}>
            <View
              style={{
                gap: SIZES.base * 4,
                marginTop: SIZES.base * 2,
                flex: 2,
                justifyContent: "center",
              }}
            >
              <View>
                <Text style={styles.title}>Enter Verification Code</Text>
                <Text style={styles.subtitle}>
                  We have sent a verification code to your email: {userEmail}
                </Text>
              </View>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      if (ref) {
                        inputRefs.current[index] = ref;
                      }
                    }}
                    style={[
                      styles.otpInput,
                      focusedIndex === index && styles.otpInputFocused,
                    ]}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(-1)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                  />
                ))}
              </View>
            </View>

            <View style={styles.actionsContainer}>
              <TouchableOpacity
                onPress={handleResend}
                disabled={isPendingResend}
              >
                <Text style={styles.linkText}>Paste Code</Text>
              </TouchableOpacity>

              <Button
                title="Verify"
                onPress={handleVerify}
                disabled={otp.join("").length !== 6 || isPending}
                loading={isPending}
                loadingText="Verifying..."
              />

              <Text style={styles.resendText}>
                Didn't receive the code?{" "}
                <Text style={styles.linkText}>Resend</Text>
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: SIZES.base * 3,
  },
  title: {
    ...FONTS.h2,
    textAlign: "center",
    marginBottom: SIZES.base,
    color: COLORS.secondary,
  },
  subtitle: {
    ...FONTS.body,
    textAlign: "center",
    color: COLORS.grey,
    paddingHorizontal: SIZES.base * 2,
  },
  centerContainer: {
    gap: SIZES.base * 4,
    marginTop: SIZES.base * 2,
    flex: 2,
    justifyContent: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpInput: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    backgroundColor: COLORS.lightGrey,
    borderRadius: SIZES.radius,
    textAlign: "center",
    ...FONTS.h2,
    color: COLORS.secondary,
  },
  otpInputFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  actionsContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    marginTop: SIZES.base * 2,
  },
  linkText: {
    ...FONTS.body,
    fontWeight: "600",
    color: COLORS.primary,
    paddingVertical: SIZES.base,
  },
  resendContainer: {
    flexDirection: "row",
    marginTop: SIZES.base * 2,
  },
  resendText: {
    ...FONTS.body,
    color: COLORS.grey,
    textAlign: "center",
    marginTop: SIZES.base * 1,
  },
});
