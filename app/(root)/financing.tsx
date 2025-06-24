import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AppHeader from "@/components/nav/app-header";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

const financingOptions = [
  {
    title: "Agile Collection",
    image: require("@/assets/images/slider-screen-1.png"),
  },
  {
    title: "Guarantees",
    image: require("@/assets/images/slider-screen-1.png"),
  },
  {
    title: "Advance Confirming",
    image: require("@/assets/images/slider-screen-1.png"),
  },
  { title: "Cards", image: require("@/assets/images/slider-screen-1.png") },
];

export default function FinancingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Financing" />

      <View style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.contentCard}>
            <Text style={styles.title}>Finance your forward sales</Text>
            <Text style={styles.description}>
              Agile Payment is the solution for your short-term financing needs
              because you can obtain liquidity from the moment your collection
              rights are generated. This finance solution enables you to manage
              and ensure the collection of payments: invoices, building
              certifications, subsidies, confirming letters from other
              institutions and VAT or similar settlements are paid. All of this
              is done quickly through your Online Banking account.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.optionsContainer}>
          <View style={styles.optionsTitleContainer}>
            <Text style={styles.optionsTitle}>Find out more</Text>
            <Ionicons
              name="chevron-forward"
              size={22}
              color={COLORS.darkGrey}
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.optionsScroll}
          >
            {financingOptions.map((item, index) => (
              <TouchableOpacity key={index} style={styles.optionCard}>
                <Image source={item.image} style={styles.optionImage} />
                <Text style={styles.optionTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    paddingVertical: SIZES.base * 3,
    flexGrow: 1,
  },
  contentCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginHorizontal: SIZES.base * 2,
    marginBottom: SIZES.base * 4,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.secondary,
    marginBottom: SIZES.base * 2,
  },
  description: {
    ...FONTS.body,
    color: COLORS.darkGrey,
    lineHeight: 24,
  },
  optionsContainer: {
    backgroundColor: COLORS.lightTealInfo,
    paddingVertical: SIZES.base * 2,
    marginBottom: SIZES.base * 2,
  },
  optionsTitle: {
    ...FONTS.h3,
    color: COLORS.secondary,
    marginBottom: SIZES.base * 2,
  },
  optionsScroll: {
    paddingHorizontal: SIZES.base * 2,
  },
  optionCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    marginRight: SIZES.base * 2,
    width: 160,
    paddingVertical: SIZES.base * 2,
  },
  optionImage: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    backgroundColor: COLORS.lightGrey,
  },
  optionTitle: {
    ...FONTS.h4,
    fontWeight: "600",
    textAlign: "center",
    padding: SIZES.base * 1.5,
  },
  optionsTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.base * 2,
  },
});
