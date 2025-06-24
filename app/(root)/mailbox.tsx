import React from "react";
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ProfileMenuItem from "@/components/cards/profile-menu-item";
import AppHeader from "@/components/nav/app-header";
import icons from "@/constants/icons";
import { COLORS, FONTS, SIZES } from "@/constants/theme";

// --- Component for the top cards ---
interface InfoCardProps {
  icon: ImageSourcePropType;
  title: string;
  subtitle: string;
  onPress: () => void;
}

const InfoCard = ({ icon, title, subtitle, onPress }: InfoCardProps) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={icon} style={styles.cardIcon} />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardSubtitle}>{subtitle}</Text>
  </TouchableOpacity>
);

// --- Data for the list at the bottom ---
const mailboxActions = [
  {
    icon: "document-text-outline" as const,
    title: "Mailbox contracts",
    subtitle: "Check and sign your contracts",
  },
  {
    icon: "receipt-outline" as const,
    title: "Certificates (Docubox)",
    subtitle: "Request certificates and handle paperwork",
  },
];

export default function MailboxScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Mailbox" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Top Cards */}
        <View style={styles.cardContainer}>
          <InfoCard
            icon={icons.bell}
            title="Notifications"
            subtitle="Supporting documents and communications"
            onPress={() => {}}
          />
          <InfoCard
            icon={icons.info}
            title="Alerts"
            subtitle="Check and set up your alerts"
            onPress={() => {}}
          />
        </View>

        {/* List Section */}
        <View style={styles.listGroup}>
          {mailboxActions.map((item, index) => (
            <View key={item.title}>
              <ProfileMenuItem
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                onPress={() => console.log(item.title)}
              />
              {/* Add divider if not the last item */}
              {index < mailboxActions.length - 1 && (
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
  scrollContainer: {
    padding: SIZES.base * 2,
  },
  // --- Top Cards ---
  cardContainer: {
    flexDirection: "row",
    gap: SIZES.base * 2, // 16px
    marginBottom: SIZES.base * 4, // 32px
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.base * 2,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    minHeight: 160,
    justifyContent: "center",
  },
  cardIcon: {
    width: 32,
    height: 32,
    marginBottom: SIZES.base * 1.5,
    resizeMode: "contain",
  },
  cardTitle: {
    ...FONTS.h4,
    textAlign: "center",
    marginBottom: SIZES.base,
  },
  cardSubtitle: {
    ...FONTS.body,
    fontSize: 12,
    color: COLORS.grey,
    textAlign: "center",
  },
  // --- List Section ---
  listGroup: {
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    overflow: "hidden",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightBorder,
    marginLeft: SIZES.base * 8.5,
  },
});
