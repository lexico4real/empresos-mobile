import ProfileMenuItem from "@/components/cards/profile-menu-item";
import AppHeader from "@/components/nav/app-header";
import { SIGN_IN_URL } from "@/config/routes";
import { COLORS, FONTS } from "@/constants/theme";
import { useAuth } from "@/providers/auth-context";
import { authService } from "@/services/auth.service";
import { useUserStore } from "@/store/userStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const menuData = [
  {
    type: "item",
    icon: "person-outline",
    title: "Contact details",
    subtitle: "Add photo, email, phone and addresses",
    route: "/profile/contact-details",
  },
  {
    type: "item",
    icon: "settings-outline",
    title: "Configuration",
    subtitle: "Personalise and set up the Bank's app",
    route: "/profile/configuration",
  },
  // {
  //   type: "sub-item",
  //   icon: "options-outline",
  //   title: "Personalisation of the Account overview",
  // },
  {
    type: "item",
    icon: "lock-closed-outline",
    title: "Security and privacy",
    subtitle: "You can feel totally confident about security",
    route: "/profile/security",
  },
  {
    type: "item",
    icon: "document-text-outline",
    title: "Docubox",
    subtitle: "All the documents we have shared between the Bank and yourself.",
  },
  {
    type: "item",
    icon: "timer-outline",
    title: "Get your payments up to date",
    subtitle:
      "Manage your debts: total payment, partial payment or set up payment.",
  },
  {
    type: "item",
    icon: "log-out-outline",
    title: "Logout",
    subtitle: "Sign out from your account",
    isDestructive: true,
  },
];

export default function PersonalAreaScreen() {
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();
  const { user } = useUserStore();

  const handleSignOut = async () => {
    await authService.signOut();
    setIsAuthenticated(false);
    router.replace(SIGN_IN_URL);
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Personal area" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="#E30600" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuListContainer}>
          <View style={styles.divider} />
          {menuData.map((item, index) => (
            <View key={item.title}>
              <ProfileMenuItem
                icon={item.icon as keyof typeof Ionicons.glyphMap}
                title={item.title}
                subtitle={item.subtitle}
                isSubItem={item.type === "sub-item"}
                onPress={() => {
                  if (item.title === "Logout") {
                    handleSignOut();
                  } else {
                    router.push(item.route as any);
                  }
                }}
              />
              {/* Render a full-width divider after every item except the last one */}
              {index < menuData.length && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  // --- Banner & Profile Card ---
  banner: {
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 15,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FEEEEE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileName: {
    ...FONTS.h2,
    color: COLORS.secondary,
  },
  profileEmail: {
    ...FONTS.body,
    color: COLORS.grey,
  },
  profileInfo: {
    alignItems: "flex-start",
  },
  // --- Menu List ---
  menuListContainer: {
    marginVertical: 15,
    gap: 15,
  },
  divider: {
    height: 2,
    backgroundColor: "#F0F0F0",
  },
});
