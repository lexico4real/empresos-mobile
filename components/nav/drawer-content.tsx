import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { useUserStore } from "@/store/userStore";
import ProfileMenuItem from "../cards/profile-menu-item";

const menuItems = [
  {
    icon: "key-outline",
    title: "Santander Key",
    subtitle: "Your safest and easiest signature",
    new: true,
  },
  { icon: "globe-outline", title: "Global position" },
  { icon: "storefront-outline", title: "POS - My shops" },
  { icon: "card-outline", title: "Santander One" },
  { icon: "cash-outline", title: "Financing" },
  { icon: "briefcase-outline", title: "My products", hasChevron: true },
  { icon: "send-outline", title: "Send money" },
  { icon: "swap-horizontal-outline", title: "Remittances" },
  { icon: "document-text-outline", title: "Bills and taxes" },
  {
    icon: "code-working-outline",
    title: "Reverse factoring advance payments",
    hasChevron: true,
  },
  { icon: "happy-outline", title: "Help us improve" },
];
const footerItems = [
  { icon: "lock-closed-outline", title: "Security" },
  { icon: "cash-outline", title: "ATMs" },
  { icon: "help-circle-outline", title: "Help Center" },
  { icon: "person-circle-outline", title: "My manager" },
];

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const { user } = useUserStore();

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        {/* --- Header Section --- */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.avatarButton}>
            <Ionicons name="camera-outline" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.userName}>
              Hello, {user?.firstName.split(" ")[0]}
            </Text>
            <TouchableOpacity
              style={styles.personalAreaButton}
              onPress={() => router.push("/profile")}
            >
              <Ionicons name="settings-outline" size={16} color={COLORS.grey} />
              <Text style={styles.personalAreaText}>Personal area</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.exitButton}
            onPress={() => {
              /* Handle Logout */
            }}
          >
            <Ionicons name="power-outline" size={28} color={COLORS.darkGrey} />
            <Text style={styles.exitText}>Exit</Text>
          </TouchableOpacity>
        </View>

        {/* --- Menu List --- */}
        {menuItems.map((item) => (
          <ProfileMenuItem
            key={item.title}
            icon={item.icon as any}
            title={item.title}
            subtitle={item.subtitle}
            onPress={() => console.log(item.title)}
          />
        ))}
      </DrawerContentScrollView>

      {/* --- Footer Navigation (fixed at the bottom) --- */}
      <View style={styles.footerContainer}>
        {footerItems.map((item) => (
          <TouchableOpacity key={item.title} style={styles.footerItem}>
            <Ionicons
              name={item.icon as any}
              size={26}
              color={COLORS.secondary}
            />
            <Text style={styles.footerItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.base * 2,
    paddingVertical: SIZES.base * 2,
    backgroundColor: COLORS.lightGrey,
  },
  avatarButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: SIZES.base * 2,
  },
  userName: {
    ...FONTS.h3,
    color: COLORS.secondary,
  },
  personalAreaButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.base / 2,
    marginTop: SIZES.base / 2,
  },
  personalAreaText: {
    ...FONTS.body,
    color: COLORS.grey,
  },
  exitButton: {
    alignItems: "center",
  },
  exitText: {
    ...FONTS.body,
    fontSize: 12,
    color: COLORS.darkGrey,
  },
  listScrollView: {
    flex: 1,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: SIZES.base * 2,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightBorder,
  },
  footerItem: {
    alignItems: "center",
    gap: SIZES.base / 2,
  },
  footerItemText: {
    ...FONTS.body,
    fontSize: 10,
    color: COLORS.secondary,
  },
});
