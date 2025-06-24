import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import SettingsMenuItem from "@/components/cards/settings-menu-item";
import AppHeader from "@/components/nav/app-header";
import { COLORS, FONTS, SIZES } from "@/constants/theme";

// --- Data for the settings list ---
const settingsData = [
  {
    type: "value",
    title: "Choice of language",
    currentValue: "English",
    onPress: () => {},
  },
  {
    type: "navigation",
    title: "Personalisation of accounts overview",
    onPress: () => {},
  },
  {
    type: "switch",
    title: "Notification permissions",
    hasInfo: true,
    switchValue: true,
    onSwitchChange: (val: boolean) => console.log("Notifications:", val),
  },
  { type: "navigation", title: "Set up alerts", onPress: () => {} },
  { type: "navigation", title: "App permissions", onPress: () => {} },
  { type: "navigation", title: "Information about the App", onPress: () => {} },
];

export default function ConfigurationScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Configuration" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- Top Banner Section --- */}
        <View style={styles.bannerContainer}>
          <Ionicons name="settings-outline" size={28} color={COLORS.primary} />
          <Text style={styles.bannerText}>
            Personalise and set up the Bank's app in this section. Setup your
            alerts, app permissions...
          </Text>
        </View>

        {/* --- Settings List --- */}
        <View style={styles.listContainer}>
          {settingsData.map((item, index) => (
            <View key={item.title}>
              <SettingsMenuItem
                title={item.title}
                itemType={item.type as any}
                currentValue={item.currentValue}
                switchValue={item.switchValue}
                onSwitchChange={item.onSwitchChange}
                hasInfo={item.hasInfo}
                onPress={item.onPress}
              />
              {index < settingsData.length - 1 && (
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
