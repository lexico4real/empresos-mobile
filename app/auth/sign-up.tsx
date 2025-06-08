import { Link } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import Button from "@/components/button/button";
import FormField from "@/components/form/form-field";
import AppHeader from "@/components/nav/app-header";

import { SIGN_IN_URL } from "@/config/routes";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import useOnboardCustomer from "@/hooks/mutation/useOnboardCustomer";

// Validation schema remains unchanged
const signUpSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Email is required"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10,}$/, "Please enter a valid phone number"),
  password: z.string().min(15, "Password must be at least 15 characters"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SignUpFormData, string>>
  >({});
  const { isPending, handleOnboardCustomer } = useOnboardCustomer();

  // Validation and state logic remains unchanged
  const handleChange = (field: keyof SignUpFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateField = (field: keyof SignUpFormData) => {
    const result = signUpSchema.shape[field].safeParse(formData[field]);
    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [field]: result.error.errors[0].message,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    const result = signUpSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }
    handleOnboardCustomer(result.data);
  };

  return (
    <>
      <AppHeader title="Create Account" />
      <SafeAreaView
        style={styles.container}
        edges={["bottom", "left", "right"]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Your Personal Details</Text>
          <Text style={styles.subtitle}>
            Create your account to start your journey with us.
          </Text>

          <View>
            <FormField
              title="Email"
              placeholder="Enter your email"
              value={formData.email}
              handleChangeText={(text) => handleChange("email", text)}
              onBlur={() => validateField("email")}
              error={errors.email}
              keyboardType="email-address"
            />
            <FormField
              title="First Name"
              placeholder="Enter your first name"
              value={formData.firstName}
              handleChangeText={(text) => handleChange("firstName", text)}
              onBlur={() => validateField("firstName")}
              error={errors.firstName}
            />
            <FormField
              title="Last Name"
              placeholder="Enter your last name"
              value={formData.lastName}
              handleChangeText={(text) => handleChange("lastName", text)}
              onBlur={() => validateField("lastName")}
              error={errors.lastName}
            />
            <FormField
              title="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              handleChangeText={(text) => handleChange("phoneNumber", text)}
              onBlur={() => validateField("phoneNumber")}
              error={errors.phoneNumber}
              keyboardType="phone-pad"
            />
            <FormField
              title="Password"
              placeholder="Enter your password"
              value={formData.password}
              handleChangeText={(text) => handleChange("password", text)}
              onBlur={() => validateField("password")}
              error={errors.password}
              isPassword={true}
              helperText="Must be at least 15 characters."
            />
          </View>

          <View style={styles.bottomContainer}>
            <Button
              title={isPending ? "Creating Account..." : "Create Account"}
              onPress={handleSubmit}
              disabled={isPending}
              loading={isPending}
            />
            <Text style={styles.signInText}>
              Already have an account?{" "}
              <Link href={SIGN_IN_URL} style={styles.signInLink}>
                Sign In
              </Link>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    // ✅ Use consistent padding for the entire screen content
    padding: SIZES.base * 3,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.secondary,
    marginBottom: SIZES.base,
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.grey,
    marginBottom: SIZES.base * 4,
  },
  bottomContainer: {
    marginTop: SIZES.base * 3,
  },
  signInText: {
    ...FONTS.body,
    textAlign: "center",
    color: COLORS.grey,
    marginTop: SIZES.base * 2,
  },
  signInLink: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
