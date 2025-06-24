import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import SettingsMenuItem from "@/components/cards/settings-menu-item";
import AppHeader from "@/components/nav/app-header";
import { COLORS, FONTS, SIZES } from "@/constants/theme";

// --- Data for the settings list ---
const securitySettings = [
  { type: "switch", title: "Touch ID", switchValue: false },
  { type: "switch", title: "Geolocation", switchValue: true },
  {
    type: "navigation",
    title: "Santander Key",
    icon: "key-outline",
    onPress: () => {},
  },
  {
    type: "navigation",
    title: "Change password",
    icon: "lock-open-outline",
    onPress: () => {},
  },
  {
    type: "navigation",
    title: "Cookie settings",
    icon: "cog-outline",
    onPress: () => {},
  },
];

export default function SecurityAndPrivacyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Security and privacy" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- Top Banner Section --- */}
        <View style={styles.bannerContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={28}
            color={COLORS.primary}
          />
          <Text style={styles.bannerText}>
            You can feel totally confident about security. Here you can set up
            all your security options.
          </Text>
        </View>

        {/* --- Settings List --- */}
        <View style={styles.listContainer}>
          {securitySettings.map((item, index) => (
            <View key={item.title}>
              <SettingsMenuItem
                title={item.title}
                itemType={item.type as any}
                icon={item.icon as any}
                switchValue={item.switchValue}
                onPress={item.onPress}
              />
              {index < securitySettings.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    padding: SIZES.base * 3,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SIZES.base * 2,
  },
  bannerText: {
    ...FONTS.body,
    color: COLORS.grey,
    flex: 1,
    lineHeight: 20,
  },
  listContainer: {
    marginTop: SIZES.base * 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightBorder,
    marginLeft: SIZES.base * 3,
  },
});
