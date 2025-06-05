import ArrowDownSvg from "@/assets/svgs/arrow-down-svg";
import ArrowRightSvg from "@/assets/svgs/arrow-right-svg";
import CashSvg from "@/assets/svgs/cash-svg";
import DocumentSvg from "@/assets/svgs/document-svg";
import GearSvg from "@/assets/svgs/gear-svg";
import MailSvg from "@/assets/svgs/mail-svg";
import MenuSvg from "@/assets/svgs/menu-svg";
import SearchSvg from "@/assets/svgs/search-svg";
import SmileySvg from "@/assets/svgs/smiley-svg";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";

const { width: DEVICE_WIDTH } = Dimensions.get("window");

export default function Index() {
  const cardWidth = (DEVICE_WIDTH - 70) / 4;
  const chartWidth = DEVICE_WIDTH - 105;

  const customDataPoint = () => {
    return (
      <View
        style={{
          width: 14,
          height: 14,
          backgroundColor: "#fff",
          borderWidth: 3,
          borderRadius: 7,
          borderColor: "#A4D1D4",
        }}
      />
    );
  };

  const lineData = [
    {
      value: 6,
      dataPointText: "$6",
      label: "JAN",
      customDataPoint: customDataPoint,
      showStrip: true,
    },
    {
      value: 10,
      dataPointText: "$10",
      label: "FEB",
      customDataPoint: customDataPoint,
      showStrip: true,
    },
    {
      value: 46,
      dataPointText: "$46",
      label: "MAR",
      customDataPoint: customDataPoint,
      showStrip: true,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header View section */}
      <ImageBackground
        source={require("@/assets/images/bg-header.png")}
        resizeMode={"cover"}
        style={styles.banner}
      >
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            {/* Left menu */}
            <View style={styles.logoWrapper}>
              <Image
                source={require("@/assets/icons/logo.png")}
                style={styles.logo}
              />
              <View style={styles.logoDivider} />
              <Text style={styles.LogoTitle}>Empresos</Text>
            </View>
            {/* Right menus */}
            <View style={styles.headerIcons}>
              <>
                <MailSvg />
              </>
              <>
                <SearchSvg />
              </>
              <>
                <MenuSvg />
              </>
            </View>
          </View>
        </SafeAreaView>
        <Text style={styles.welcomeText}>Hello Frank,</Text>
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
        {/* Menus list */}
        <View style={styles.menusWrapper}>
          <View style={[styles.menuCard, { width: cardWidth }]}>
            <CashSvg />
            <Text style={styles.cardTitle}>Send Money</Text>
          </View>
          <View style={[styles.menuCard, { width: cardWidth }]}>
            <GearSvg />
            <Text style={styles.cardTitle}>Personal area</Text>
          </View>
          <View style={[styles.menuCard, { width: cardWidth }]}>
            <DocumentSvg />
            <Text style={styles.cardTitle}>View bills</Text>
          </View>
          <View style={[styles.menuCard, { width: cardWidth }]}>
            <DocumentSvg />
            <Text style={styles.cardTitle}>Explore products</Text>
          </View>
        </View>
      </ImageBackground>
      {/* Floating button */}
      <View style={styles.bannerAddWrapper}>
        <View style={styles.bannerAddIcon}>
          <FontAwesome6 name="add" size={24} color="#E30600" />
        </View>
      </View>
      {/* menu slider section*/}
      <View style={styles.improveBtnWrapper}>
        <View style={styles.improveBtnLeft}>
          <SmileySvg />
          <Text style={styles.imroveBtnText}>Help us improve</Text>
        </View>
        <ArrowRightSvg />
      </View>
      {/* Account card section */}
      <View style={styles.infoCardWrapper}>
        {/* Header secition */}
        <View style={styles.infoCardHeaderWrapper}>
          <View style={styles.infoCardHeaderLeft}>
            <Text style={styles.infoCardHeaderTitle}>Accounts</Text>
            <View style={styles.infoCardHeaderCount}>
              <Text style={styles.infoCardHeaderCountText}>1</Text>
            </View>
          </View>
          <ArrowDownSvg />
        </View>
        <View style={styles.divider} />
        {/* Content section */}
        <View style={[styles.infoCardHeaderWrapper]}>
          <Text style={styles.tableTitle}>Balance</Text>
          <Text style={styles.tableContent}>$450.00</Text>
        </View>
        <View style={styles.tableContentSpacing} />
        {/* banner */}
        <View style={styles.movementInfoWrapper}>
          <Text style={styles.movementInfoText}>You have 54 new movements</Text>
        </View>
      </View>
      {/* credit card  section*/}
      <View style={styles.infoCardWrapper}>
        {/* Header secition */}
        <View style={styles.infoCardHeaderWrapper}>
          <View style={styles.infoCardHeaderLeft}>
            <Text style={styles.infoCardHeaderTitle}>Credit card</Text>
            <View style={styles.infoCardHeaderCount}>
              <Text style={styles.infoCardHeaderCountText}>1</Text>
            </View>
          </View>
          <ArrowDownSvg />
        </View>
        <View style={styles.divider} />
        {/* Content section */}
        <View style={[styles.infoCardHeaderWrapper]}>
          <Text style={styles.tableTitle}>Drawn balance</Text>
          <Text style={styles.tableContent}>$450.00</Text>
        </View>
        <View style={styles.tableContentSpacing} />
        <View style={[styles.infoCardHeaderWrapper]}>
          <Text style={styles.tableTitle}>Undrawn</Text>
          <Text style={styles.tableContent}>$450.00</Text>
        </View>
        <View style={styles.tableContentSpacing} />
        {/* banner */}
        <View style={styles.movementInfoWrapper}>
          <Text style={styles.movementInfoText}>You have 50 new movements</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  banner: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: "#f8f9fa",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  logo: {
    width: 32,
    height: 32,
  },
  LogoTitle: {
    fontSize: 16,
    color: "#E30600",
    fontWeight: "400",
  },
  logoDivider: {
    height: 40,
    width: 2,
    borderRadius: 30,
    backgroundColor: "#E30600",
  },
  logoWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  welcomeText: {
    fontSize: 18,
    color: "#43474A",
    fontWeight: "600",
    marginBottom: 20,
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
  menusWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuCard: {
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  cardTitle: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 16,
  },
  improveBtnWrapper: {
    backgroundColor: "#26303A",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 14,
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  improveBtnLeft: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  imroveBtnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  infoCardWrapper: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 7,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  infoCardHeaderWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoCardHeaderLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#cccc",
    marginBottom: 10,
  },
  infoCardHeaderTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  infoCardHeaderCount: {
    width: 22,
    height: 22,
    backgroundColor: "#d9d9d9",
    borderRadius: 11,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  infoCardHeaderCountText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  tableTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#26303A",
  },
  tableContent: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  tableContentSpacing: {
    height: 10,
  },
  movementInfoWrapper: {
    backgroundColor: "#EFFBFB",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  movementInfoText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#26303A",
  },

  chartTitle: {
    fontSize: 10,
    color: "#000",
    fontWeight: "600",
    marginTop: -14,
  },
});

// import Header from '@/components/common/header'
// import ThreeMonthLineChart from '@/components/common/three-month-line-chart'
// import { BILLS_URL, PROFILE_URL, SEND_MONEY_URL } from '@/config/routes'
// import icons from '@/constants/icons'
// import { useUserStore } from '@/store/userStore'
// import { useRouter } from 'expo-router'
// import React from 'react'
// import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'

// export default function Index() {
//   const router = useRouter();
//   const { user } = useUserStore()

//   const greeting = user?.firstName ? `Hello, ${user?.firstName}!` : 'Hello!';

//   return (
//     <>
//       <Header
//         title="Empresos"
//         logo={icons.logo}
//         titleAlignment="left"
//       />
//       <SafeAreaView edges={['bottom', 'left', 'right']} className="flex-1 bg-white">
//         <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
//           <View className="relative">
//             <View className='bg-[#bdb8c9] px-4 py-2 rounded-bl-3xl rounded-br-3xl mb-6'>
//               {/* Greeting */}
//               <View className=" mb-4">
//                 <Text className="text-2xl font-bold text-gray-800">{greeting}</Text>
//                 {/* <Text className="text-sm text-gray-600 ">
//                   Balance: {user?.accounts[0].balance}
//                 </Text> */}
//                 <Text className="text-sm text-black mt-1">Your finances are looking good</Text>
//               </View>

//               {/* Current Accounts Graph */}
//               <View className="bg-[#CEC2CC] rounded-xl p-4 mb-4">
//                 <Text className="text-base font-bold text-gray-800 mb-4">CURRENT ACCOUNTS</Text>

//                 {/* Simple line graph representation */}
//                 <ThreeMonthLineChart
//                   data={[1100, 1500, 1200]}
//                 />
//               </View>

//               {/* Action Buttons */}
//               <View className="flex-row justify-between mb-6">
//                 <TouchableOpacity className="bg-[#CEC2CC] rounded-lg p-3 items-center w-[22%]"
//                   onPress={() => router.push(SEND_MONEY_URL)}
//                 >
//                   <Image source={icons.sendIcon} className="w-6 h-6 mb-2" />
//                   <Text className="text-xs text-center text-gray-800">Send money</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity className="bg-[#CEC2CC] rounded-lg p-3 items-center w-[22%]"
//                   onPress={() => router.push(PROFILE_URL)}
//                 >
//                   <Image source={icons.settingsIcons} className="w-6 h-6 mb-2" />
//                   <Text className="text-xs text-center text-gray-800">Personal area</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity className="bg-[#CEC2CC] rounded-lg p-3 items-center w-[22%]"
//                   onPress={() => router.push(BILLS_URL)}
//                 >
//                   <Image source={icons.billsIcon} className="w-6 h-6 mb-2" />
//                   <Text className="text-xs text-center text-gray-800">View bills</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity className="bg-[#CEC2CC] rounded-lg p-3 items-center w-[22%]"
//                   onPress={() => router.push(BILLS_URL)}
//                 >
//                   <Image source={icons.billsIcon} className="w-6 h-6 mb-2" />
//                   <Text className="text-xs text-center text-gray-800">Explore Products</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* The circle with plus sign */}
//             <View className="absolute left-1/2 -translate-x-1/2 bottom-[-2px] w-12 h-12 rounded-full bg-[#bdb8c9] items-center justify-center  z-10">
//               <Text className="text-3xl text-[#C33A31] font-light">+</Text>
//             </View>
//           </View>

//           <View className='px-4 mt-6'>
//             {/* Financing Banner */}
//             <TouchableOpacity className="bg-[#7d3c5a] rounded-xl p-4 flex-row items-center mb-4">
//               <View className="w-7 h-7 mr-3 items-center justify-center">
//                 <Image source={icons.moneyBag} className="w-full h-full" tintColor="#fff" />
//               </View>
//               <View className="flex-1">
//                 <Text className="text-base font-bold text-white">ARE YOU LOOKING FOR FINANCING?</Text>
//                 <Text className="text-xs text-white opacity-80">See all the options we have for your company</Text>
//               </View>
//             </TouchableOpacity>

//             {/* Accounts Section */}
//             <View className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
//               <View className="flex-row items-center ">
//                 <Text className="text-lg font-bold text-gray-800">Accounts</Text>
//                 <View className="bg-gray-100 rounded-full w-6 h-6 items-center justify-center ml-2">
//                   <Text className="text-xs font-bold text-gray-800">1</Text>
//                 </View>
//                 <Image source={icons.arrowDown} className="w-5 h-5 ml-auto" />
//               </View>

//               <View className='border-b border-gray-100 mb-4 ' />

//               <View className="flex-row justify-between items-center mb-2">
//                 <Text className="text-base text-gray-800">Balance</Text>
//                 <Text className="text-base font-bold text-gray-800">$450.00</Text>
//               </View>

//               <View className="bg-[#e6f2f7] p-3 rounded-lg mt-2">
//                 <Text className="text-sm text-gray-800 text-center">You have 54 new movements</Text>
//               </View>
//             </View>

//             {/* Credit Card Section */}
//             <View className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
//               <View className="flex-row items-center">
//                 <Text className="text-lg font-bold text-gray-800">Credit Card</Text>
//                 <View className="bg-gray-100 rounded-full w-6 h-6 items-center justify-center ml-2">
//                   <Text className="text-xs font-bold text-gray-800">1</Text>
//                 </View>
//                 <Image source={icons.arrowDown} className="w-5 h-5 ml-auto" />
//               </View>
//               <View className='border-b border-gray-100 mb-4 ' />

//               <View className="flex-row justify-between items-center mb-2">
//                 <Text className="text-base text-gray-800">Drawn balance</Text>
//                 <Text className="text-base font-bold text-gray-800">$450.00</Text>
//               </View>

//               <View className="flex-row justify-between items-center">
//                 <Text className="text-base text-gray-800">Undrawn</Text>
//                 <Text className="text-base font-bold text-gray-800">$50.00</Text>
//               </View>
//             </View>

//             {/* Extra space at bottom for FAB */}
//             <View className="h-20" />
//           </View>
//         </ScrollView>

//         {/* Floating Action Button */}
//         <TouchableOpacity className="absolute bottom-6 self-center bg-white w-14 h-14 rounded-full justify-center items-center shadow-md">
//           <Image source={icons.plus} className="w-6 h-6" tintColor="#e63946" />
//         </TouchableOpacity>
//       </SafeAreaView>
//     </>
//   )
// }
