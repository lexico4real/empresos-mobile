import MenuSvg from "@/assets/svgs/menu-svg";
import AccountInfoCard from "@/components/cards/account-info-card";
import { PROFILE_URL, SEND_MONEY_URL } from "@/config/routes";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { useUserStore } from "@/store/userStore";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";

const { width: DEVICE_WIDTH } = Dimensions.get("window");

// Mock Data
const accountData = {
  title: "Accounts",
  count: 1,
  infoRows: [{ label: "Balance", value: "$450.00" }],
  movementText: "You have 54 new movements",
};

const creditCardData = {
  title: "Credit card",
  count: 1,
  infoRows: [
    { label: "Drawn balance", value: "$450.00" },
    { label: "Undrawn", value: "$450.00" },
  ],
  movementText: "You have 50 new movements",
};

const lineData = [
  {
    value: 6,
    dataPointText: "$6",
    label: "JAN",
    showStrip: true,
  },
  { value: 10, dataPointText: "$10", label: "FEB" },
  { value: 46, dataPointText: "$46", label: "MAR" },
].map((item) => ({
  ...item,
  customDataPoint: () => <View style={styles.customDataPoint} />,
}));

export default function IndexScreen() {
  const { user } = useUserStore();

  const cardWidth = (DEVICE_WIDTH - SIZES.base * 4 - SIZES.base * 3) / 4;

  const chartWidth = DEVICE_WIDTH - 105;

  const actionMenuItems = [
    {
      icon: "swap-horizontal",
      text: "Send Money",
      onPress: () => router.push(SEND_MONEY_URL),
    },
    {
      icon: "settings",
      text: "Personal area",
      onPress: () => router.push(PROFILE_URL),
    },
    { icon: "document-text", text: "View bills", onPress: () => {} },
    { icon: "apps", text: "Explore", onPress: () => {} },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* --- HEADER BANNER --- */}
      <ImageBackground
        source={require("@/assets/images/bg-header.png")}
        resizeMode="cover"
        style={styles.banner}
      >
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <View style={styles.logoWrapper}>
              <Image
                source={require("@/assets/icons/logo.png")}
                style={styles.logo}
              />
              <View style={styles.logoDivider} />
              <Text style={styles.logoTitle}>Empresos</Text>
            </View>
            <View style={styles.headerIcons}>
              <Ionicons name="mail-outline" size={24} color={COLORS.danger} />
              <Ionicons name="search-outline" size={24} color={COLORS.danger} />
              <TouchableOpacity onPress={() => {}}>
                <MenuSvg />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>

        <Text style={styles.welcomeText}>Hello, {user?.firstName}</Text>

        {/* --- CURRENT ACCOUNT BANNER --- */}
        <View style={styles.currentAccountBanner}>
          <Text style={styles.currentAccountHeader}>Current Accounts</Text>

          <LineChart
            data={lineData}
            color={"#A0D2CF"}
            thickness={2}
            curved
            yAxisOffset={4}
            initialSpacing={90}
            stripOverDataPoints
            stripWidth={2}
            dataPointsColor={"#000"}
            hideYAxisText={true}
            hideRules={true}
            xAxisColor={"#A4D1D4"}
            yAxisColor={"transparent"}
            xAxisThickness={3}
            height={80}
            width={chartWidth}
            spacing={80}
            dataPointsHeight={10}
            dataPointsWidth={5}
            xAxisLabelTextStyle={{
              color: "#43474A",

              fontSize: 12,

              marginTop: 5,

              textAlign: "center",

              width: 30,
            }}
          />

          <Text style={styles.chartTitle}>Total Balance</Text>
        </View>

        {/* --- ACTION MENU --- */}
        <View style={styles.actionMenuWrapper}>
          {actionMenuItems.map((item) => (
            <TouchableOpacity
              key={item.text}
              style={[styles.actionMenuCard, { width: cardWidth }]}
              onPress={item.onPress}
            >
              <Ionicons
                name={item.icon as any}
                size={28}
                color={COLORS.primary}
              />
              <Text style={styles.actionMenuTitle}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ImageBackground>

      {/* Floating button */}
      <View style={styles.bannerAddWrapper}>
        <View style={styles.bannerAddIcon}>
          <FontAwesome6 name="add" size={24} color="#E30600" />
        </View>
      </View>

      {/* --- FINANCING BANNER --- */}
      <TouchableOpacity style={styles.improveBanner}>
        <Ionicons name="wallet-outline" size={24} color={COLORS.white} />
        <View style={styles.improveBannerTextWrapper}>
          <Text style={styles.improveBannerText}>
            Are you looking for financing?
          </Text>
          <Text style={styles.improveBannerSubText}>
            See all the options we have for your company
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color={COLORS.white} />
      </TouchableOpacity>

      {/* --- ACCOUNT INFO CARDS --- */}
      <AccountInfoCard {...accountData} />
      <AccountInfoCard {...creditCardData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  banner: {
    paddingHorizontal: SIZES.base * 2,
    paddingBottom: SIZES.base * 1.5,
    backgroundColor: COLORS.lightGrey,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZES.base * 2,
  },
  logoWrapper: { flexDirection: "row", alignItems: "center", gap: SIZES.base },
  logo: { width: 32, height: 32 },
  logoDivider: { height: 32, width: 2, backgroundColor: COLORS.primary },
  logoTitle: { fontSize: 16, color: COLORS.primary, fontWeight: "500" },
  headerIcons: { flexDirection: "row", alignItems: "center", gap: 20 },
  welcomeText: { ...FONTS.h3, marginBottom: SIZES.base * 2 },
  statsCard: {
    backgroundColor: COLORS.white,
    padding: SIZES.base * 2,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base * 2,
  },
  customDataPoint: {
    width: 14,
    height: 14,
    backgroundColor: COLORS.white,
    borderWidth: 3,
    borderRadius: 7,
    borderColor: COLORS.tertiary,
  },
  chartTitle: {
    fontSize: 10,
    color: COLORS.black,
    fontWeight: "600",
    position: "absolute",
    bottom: SIZES.base * 2,
    left: SIZES.base * 2,
  },
  actionMenuWrapper: { flexDirection: "row", justifyContent: "space-between" },
  actionMenuCard: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.base,
    height: 80,
    marginBottom: SIZES.base * 2,
  },
  actionMenuTitle: {
    fontSize: 12,
    color: COLORS.black,
    textAlign: "center",
    marginTop: SIZES.base,
    flexWrap: "wrap",
  },
  fabContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: -30,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  improveBanner: {
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    gap: SIZES.base * 0.5,
    borderRadius: SIZES.radius,
    padding: SIZES.base * 1.5,
    marginVertical: 20,
  },
  improveBannerText: {
    ...FONTS.h4,
    color: COLORS.white,
    fontWeight: "700",
  },
  improveBannerSubText: {
    ...FONTS.body,
    color: COLORS.white,
  },
  bannerAddIcon: {
    height: 60,
    width: 60,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  bannerAddWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
  },
  currentAccountBanner: {
    backgroundColor: "#fff",

    paddingHorizontal: 20,

    paddingVertical: 18,

    borderRadius: 10,

    marginBottom: 20,
  },

  currentAccountHeader: {
    fontSize: 18,

    color: "#43474A",

    fontWeight: "700",

    marginBottom: 20,
  },
  improveBannerTextWrapper: {
    flex: 1,
    marginLeft: SIZES.base,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
