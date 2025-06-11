import MenuSvg from "@/assets/svgs/menu-svg";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface HomeHeaderProps {
  onMenuPress?: () => void;
  onSearchPress?: () => void;
  onMailPress?: () => void;
}

export default function HomeHeader({
  onMenuPress,
  onSearchPress,
  onMailPress,
}: HomeHeaderProps) {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.logoWrapper}>
            <Image
              source={require("@/assets/icons/logo.png")}
              style={styles.logo}
            />
            <View style={styles.logoDivider} />
            <Text style={styles.logoTitle}>Empresos</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={onMailPress}>
            <Ionicons name="mail-outline" size={24} color={COLORS.danger} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSearchPress}>
            <Ionicons name="search-outline" size={24} color={COLORS.danger} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onMenuPress}>
            <MenuSvg />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    height: 100,
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  logoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 32,
    height: 32,
  },
  logoDivider: {
    height: 32,
    width: 2,
    backgroundColor: COLORS.primary,
  },
  logoTitle: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "500",
  },
});
