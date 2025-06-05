import Button from "@/components/common/button";
import TextInput from "@/components/common/text-input";
import { SIGN_IN_URL } from "@/config/routes";
import useOnboardCustomer from "@/hooks/mutation/useOnboardCustomer";
import { Link } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { z } from "zod";
// Validation schema
const signUpSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Email is required"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10,}$/, "Please enter a valid phone number"),
  // securityQuestion: z
  //   .string()
  //   .min(1, 'Security question is required')
  //   .refine((val) => SECURITY_QUESTIONS.some(q => q.value === val), {
  //     message: 'Please select a valid security question'
  //   }),
  // securityAnswer: z
  //   .string()
  //   .min(1, 'Security answer is required'),
  password: z
    .string()
    .min(1, "Password is required")
    .min(15, "Password must be at least 15 characters")
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*]).{15,}$/,
    //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    // ),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    // securityQuestion: '',
    // securityAnswer: '',
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { isPending, handleOnboardCustomer } = useOnboardCustomer();
  const handleChange = (field: keyof SignUpFormData, value: string) => {
    setFormData((prev: SignUpFormData) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: Record<string, string>) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateField = (field: keyof SignUpFormData, value: string) => {
    try {
      signUpSchema.shape[field].parse(value);
      setErrors((prev: Record<string, string>) => ({
        ...prev,
        [field]: "",
      }));
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        setErrors((prev: Record<string, string>) => ({
          ...prev,
          [field]: error.errors[0].message,
        }));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      signUpSchema.parse(formData);
      // If validation passes, proceed with form submission
      const payload = {
        ...formData,
      };
      handleOnboardCustomer(payload);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center p-5">
          <Text className="text-2xl font-bold text-center mb-8">
            Create Account
          </Text>

          <View className="space-y-4">
            <TextInput
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
              onBlur={() => validateField("email", formData.email)}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <TextInput
              label="First Name"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChangeText={(text) => handleChange("firstName", text)}
              onBlur={() => validateField("firstName", formData.firstName)}
              error={errors.firstName}
            />

            <TextInput
              label="Last Name"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChangeText={(text) => handleChange("lastName", text)}
              onBlur={() => validateField("lastName", formData.lastName)}
              error={errors.lastName}
            />

            <TextInput
              label="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChangeText={(text) => handleChange("phoneNumber", text)}
              onBlur={() => validateField("phoneNumber", formData.phoneNumber)}
              keyboardType="phone-pad"
              error={errors.phoneNumber}
            />

            {/* <Select
              label="Security Question"
              value={formData.securityQuestion}
              options={SECURITY_QUESTIONS}
              onSelect={(value) => handleChange('securityQuestion', value)}
              error={errors.securityQuestion}
            />

            <TextInput
              label="Security Answer"
              placeholder="Enter your security answer"
              value={formData.securityAnswer}
              onChangeText={(text) => handleChange('securityAnswer', text)}
              onBlur={() => validateField('securityAnswer', formData.securityAnswer)}
              error={errors.securityAnswer}
            /> */}

            <TextInput
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
              onBlur={() => validateField("password", formData.password)}
              secureTextEntry
              error={errors.password}
            />
          </View>

          <Button className="mt-8" onPress={handleSubmit} disabled={isPending}>
            <Text className="text-white text-base font-bold">
              {isPending ? "Signing Up..." : "Sign Up"}
            </Text>
          </Button>

          <View className="mt-6">
            <Text className="text-center text-gray-600">
              Already have an account?{" "}
              <Link href={SIGN_IN_URL} className="text-red-500 underline">
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
