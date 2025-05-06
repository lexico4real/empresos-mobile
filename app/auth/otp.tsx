import Button from '@/components/common/button';
import Header from '@/components/common/header';
import icons from '@/constants/icons';
import usePostOtp from '@/hooks/mutation/usePostOtp';
import useSignIn from '@/hooks/mutation/useSignIn';
import { SignInData } from '@/lib/declarations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Clipboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Otp() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const inputRefs = useRef<TextInput[]>([]);

  const { isPending, handleSignIn } = useSignIn()
  const { isPending: isPendingResend, handlePostOtp } = usePostOtp()

  useEffect(() => {
    const loadEmail = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      const password = await AsyncStorage.getItem('userPassword');
      if (email) setUserEmail(email);
      if (password) setUserPassword(password);
    };
    loadEmail();
  }, []);

  const handleOtpChange = async (text: string, index: number) => {
    // Handle paste operation
    if (text.length > 1) {
      // Clean the pasted text to only include numbers
      const cleanedText = text.replace(/\D/g, '').slice(0, 6);

      if (cleanedText.length === 6) {
        const newOtp = cleanedText.split('');
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
      const cleanedText = clipboardContent.replace(/\D/g, '').slice(0, 6);

      if (cleanedText.length === 6) {
        const newOtp = cleanedText.split('');
        setOtp(newOtp);
        inputRefs.current[5]?.focus();
      }
    } catch (error) {
      console.error('Error reading clipboard:', error);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      const userSecret = await AsyncStorage.getItem('userSecret');
      const signInData: SignInData = {
        email: userEmail ?? '',
        password: userPassword ?? '',
        otp: otpString,
        secret: userSecret ?? ''
      }
      handleSignIn(signInData)
    }
  };

  const handleResend = () => {
    handlePostOtp({
      email: userEmail ?? '',
      password: userPassword ?? ''
    })
  }

  return (
    <>
      <Header
        title="Verify OTP"
        showBackArrow={true}
        backArrowIcon={icons.back}
        titleAlignment="center"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 "
      >
        <View className="flex-1 px-5 justify-center bg-white">
          <View className="mt-12">
            <Text className="text-2xl font-semibold text-center mb-2">
              Enter Verification Code
            </Text>
            <Text className="text-gray-600 text-center mb-8">
              We have sent a verification code to your email: {userEmail}
            </Text>

            <View className="flex-row justify-center space-x-4 mb-8 gap-2 space-y-2">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref as TextInput)}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-xl"
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={6}
                  selectTextOnFocus
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={handlePasteButton}
              className="mb-4"
            >
              <Text className="text-red-500 text-center">Paste Code</Text>
            </TouchableOpacity>

            <Button
              variant="primary"
              className="bg-red-500 py-4 rounded-full mb-4"
              onPress={handleVerify}
              disabled={otp.join('').length !== 6}
              loading={isPending}
              loadingText="Verifying..."
            >
              <Text className="text-white text-center text-lg font-medium">
                Verify
              </Text>
            </Button>

            <View className="flex-row justify-center">
              <Text className="text-gray-600">Didn't receive the code? </Text>
              <TouchableOpacity onPress={handleResend}>
                <Text className="text-red-500">Resend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      <Modal
        visible={isPendingResend}
        transparent
        animationType="fade"
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg items-center">
            <ActivityIndicator size="large" color="#C33A31" />
            <Text className="mt-4 text-gray-700">Resending verification code...</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}
