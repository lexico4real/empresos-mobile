import MenuSvg from "@/assets/svgs/menu-svg";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AppHeaderProps {
  title: string;
}

export default function AppHeader({ title }: AppHeaderProps) {
  const router = useRouter();
  const canGoBack = router.canGoBack();

  const onBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          {canGoBack && (
            <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#E30600" />
            </TouchableOpacity>
          )}
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity>
            <Ionicons name="help-circle-outline" size={24} color="#E30600" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MenuSvg />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#f8f9fa" },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    height: 100,
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  backButton: { marginRight: 5 },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
    color: "#E30600",
    textAlign: "center",
  },
});
