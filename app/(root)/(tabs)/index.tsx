import ArrowDownSvg from "@/assets/svgs/arrow-down-svg";
import ArrowRightSvg from "@/assets/svgs/arrow-right-svg";
import CashSvg from "@/assets/svgs/cash-svg";
import DocumentSvg from "@/assets/svgs/document-svg";
import GearSvg from "@/assets/svgs/gear-svg";
import MailSvg from "@/assets/svgs/mail-svg";
import SmileySvg from "@/assets/svgs/smiley-svg";
import icons from "@/constants/icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
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
    <ScrollView style={styles.container}>
      <View>
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
                <Image
                  source={icons.search}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Image
                  source={icons.menu}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
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
            <TouchableOpacity
              style={[styles.menuCard, { width: cardWidth }]}
              onPress={() => router.push("/funds/send-money")}
            >
              <CashSvg />
              <Text style={styles.cardTitle}>Send Money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuCard, { width: cardWidth }]}>
              <GearSvg />
              <Text style={styles.cardTitle}>Personal area</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuCard, { width: cardWidth }]}>
              <DocumentSvg />
              <Text style={styles.cardTitle}>View bills</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuCard, { width: cardWidth }]}>
              <DocumentSvg />
              <Text style={styles.cardTitle}>Explore products</Text>
            </TouchableOpacity>
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
            <Text style={styles.movementInfoText}>
              You have 54 new movements
            </Text>
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
            <Text style={styles.movementInfoText}>
              You have 50 new movements
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 80,
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
