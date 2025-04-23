import Header from "@/components/common/header";
import SearchInput from "@/components/common/search";
import icons from "@/constants/icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// --- Dummy Data (Replace with your actual data and flag sources) ---
const commonCountries = [
  { id: "es", name: "Spain", flag: icons.spainLogo }, // Replace with actual flag icon
  { id: "us", name: "United States Of America", flag: icons.usaLogo },
  { id: "fr", name: "France", flag: icons.franceLogo },
  { id: "de", name: "Germany", flag: icons.germanyLogo },
  { id: "ae", name: "United Arab Emirates", flag: icons.spainLogo },
];

const allCountries = [
  { id: "af", name: "Afghanistan", flag: icons.spainLogo },
  { id: "al", name: "Albania", flag: icons.spainLogo },
  { id: "dz", name: "Algeria", flag: icons.spainLogo },
  { id: "as", name: "American Samoa", flag: icons.spainLogo },
  { id: "ad", name: "Andorra", flag: icons.spainLogo },
  // Add more countries...
];
// --- End Dummy Data ---

export default function Transfers() {
  const router = useRouter();
  const [selectedCommonCountry, setSelectedCommonCountry] = useState<string | null>("es"); // Default selection

  const handleCountrySelect = (countryId: string, countryName: string) => {
    router.push(`/funds/receiver-details?countryId=${countryId}&countryName=${encodeURIComponent(countryName)}`);
  };

  const renderCommonCountry = ({ item }: { item: typeof commonCountries[0] }) => {
    const isSelected = selectedCommonCountry === item.id;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedCommonCountry(item.id);
          handleCountrySelect(item.id, item.name);
        }}
        className={`items-center justify-center p-4 rounded-xl border ${isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'} w-32 h-32 mr-3`}
        style={{ elevation: 1 }}
      >
        {/* Replace with actual flag component/image */}
        <View className="w-10 h-10 rounded-full bg-gray-300 mb-2 items-center justify-center overflow-hidden">
          <Image source={item.flag} className='w-full h-full' resizeMode='cover' />
        </View>
        <Text className="text-center text-xs font-medium text-gray-700" numberOfLines={2}>{item.name}</Text>
        {isSelected && (
          <View className="absolute top-1 right-1 bg-green-500 rounded-full w-4 h-4 items-center justify-center">
            <Image source={icons.spainLogo} className="w-2 h-2" tintColor="white" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <React.Fragment>
      <Header
        title="Transfers"
        showBackArrow={true}
        backArrowIcon={icons.back}
        titleAlignment="center"
      />
      <SafeAreaView className="flex-1 bg-gray-50" edges={["bottom", "left", "right"]}>

        <View className="flex-1">
          <View className="px-4 pt-6 pb-2">

            <Text className="text-lg font-semibold mb-4 text-gray-700">To which country do you want to send money?</Text>
          </View>

          <SearchInput
            placeholder="Search by country"

          />

          {/* Most Common Countries Section */}
          <View className="py-6">
            <Text className="text-base font-semibold mb-4 text-gray-600 px-4">
              Most common countries
            </Text>
            <FlatList
              data={commonCountries}
              renderItem={renderCommonCountry}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
              className="mb-4" // Add some margin below the list
            />
          </View>

          {/* All Countries Section */}
          <View className="px-4 pb-6 flex-1">
            <Text className="text-base font-semibold mb-4 text-gray-600">
              All the countries
            </Text>
            {/* Using ScrollView for the rest of the content including 'All countries' */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {allCountries.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="bg-white rounded-lg p-4 mb-3 flex-row items-center justify-between"
                  style={{ elevation: 1 }}
                  onPress={() => handleCountrySelect(item.id, item.name)}
                >
                  <Text className="text-sm text-gray-800">{item.name}</Text>
                  {/* Replace with actual flag component/image */}
                  <View className="w-6 h-6 rounded-full bg-gray-300 items-center justify-center overflow-hidden">
                    <Image source={item.flag} className='w-full h-full' resizeMode='cover' />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
}
