import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CountryCard from "@/components/cards/country-card";
import CountryListItem from "@/components/cards/country-list-item";
import SearchInput from "@/components/form/search-input";
import AppHeader from "@/components/nav/app-header";
import icons from "@/constants/icons";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import useTransferStore from "@/store/transferStore";

const commonCountries: Country[] = [
  { id: "es", name: "Spain", flag: icons.spainLogo },
  { id: "us", name: "United States Of America", flag: icons.usaLogo },
  { id: "fr", name: "France", flag: icons.franceLogo },
];
const allCountries: Country[] = [
  { id: "af", name: "Afghanistan", flag: icons.spainLogo },
  { id: "al", name: "Albania", flag: icons.spainLogo },
  // ... more countries
];

export interface Country {
  id: string;
  name: string;
  flag: ImageSourcePropType;
}

export default function TransfersScreen() {
  const router = useRouter();
  const [selectedCommonCountry, setSelectedCommonCountry] = useState<
    string | null
  >("es");

  const setCountry = useTransferStore((state) => state.setCountry);

  const handleCountrySelect = (country: Country) => {
    setCountry(country.id, country.name);

    router.push("/funds/receiver-details");
  };

  const renderListHeader = () => (
    <>
      <Text style={styles.title}>
        To which country do you want to send money?
      </Text>
      <SearchInput placeholder="Search by country" />

      <View style={styles.commonCountriesSection}>
        <Text style={styles.subtitle}>Most common countries</Text>
        <FlatList
          data={commonCountries}
          renderItem={({ item }) => (
            <CountryCard
              item={item}
              isSelected={selectedCommonCountry === item.id}
              onPress={() => {
                setSelectedCommonCountry(item.id);
                handleCountrySelect(item);
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: SIZES.base * 2 }}
        />
      </View>
      <Text style={[styles.subtitle, { paddingHorizontal: SIZES.base * 2 }]}>
        All the countries
      </Text>
    </>
  );

  return (
    <>
      <AppHeader title="Transfers" />
      <SafeAreaView
        style={styles.container}
        edges={["bottom", "left", "right"]}
      >
        <FlatList
          data={allCountries}
          renderItem={({ item }) => (
            <CountryListItem
              item={item}
              onPress={() => handleCountrySelect(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderListHeader}
          contentContainerStyle={{ paddingBottom: SIZES.base * 2 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
  },
  title: {
    ...FONTS.h3,
    color: COLORS.darkGrey,
    paddingHorizontal: SIZES.base * 2,
    marginBottom: SIZES.base * 2,
    paddingTop: SIZES.base * 2,
  },
  subtitle: {
    ...FONTS.h4,
    color: COLORS.darkGrey,
    marginBottom: SIZES.base * 1.5,
    paddingHorizontal: SIZES.base * 2,
  },
  commonCountriesSection: {
    paddingVertical: SIZES.base * 2,
  },
});
