import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AppHeader from "@/components/nav/app-header";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { useUserStore } from "@/store/userStore";

// --- Reusable Row Component for displaying info ---
interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

// --- The Screen Component ---
export default function ContactDetailsScreen() {
  const router = useRouter();
  const { user } = useUserStore();

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Contact details" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* --- Add Photo Section --- */}
        <View style={styles.photoSection}>
          <TouchableOpacity style={styles.addPhotoButton}>
            <Ionicons name="camera-outline" size={40} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.addPhotoText}>Add photo</Text>
        </View>

        {/* --- Details List Section --- */}
        <View style={styles.detailsContainer}>
          <InfoRow label="E-mail" value={user?.email ?? ""} />
          <View style={styles.divider} />
          <InfoRow label="Phone" value={user?.phoneNumber ?? ""} />
        </View>

        {/* --- Disclaimer Section --- */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>
            <Text style={{ color: COLORS.primary }}>* </Text>
            For security reasons, you can only view your contact details here.
            If you would like to change them, please contact your manager or
            your branch.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  // --- Photo Section ---
  photoSection: {
    backgroundColor: COLORS.lightGrey,
    paddingVertical: SIZES.base * 4, // 32px
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightBorder,
  },
  addPhotoButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.base * 1.5,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
  },
  addPhotoText: {
    ...FONTS.body,
    fontWeight: "600",
    color: COLORS.primary,
  },
  // --- Details Section ---
  detailsContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.base * 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.base * 3,
    paddingVertical: SIZES.base * 2,
  },
  infoLabel: {
    ...FONTS.body,
    color: COLORS.grey,
  },
  infoValue: {
    ...FONTS.body,
    fontWeight: "600",
    color: COLORS.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightBorder,
    marginLeft: SIZES.base * 3, // Indent the divider
  },
  // --- Disclaimer ---
  disclaimerContainer: {
    padding: SIZES.base * 3,
    marginTop: SIZES.base * 2,
  },
  disclaimerText: {
    ...FONTS.body,
    fontSize: 12,
    color: COLORS.grey,
    lineHeight: 18,
  },
});
