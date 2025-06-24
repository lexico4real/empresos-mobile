import BillItemCard, { BillItemType } from "@/components/cards/bill-item-card";
import ProfileMenuItem from "@/components/cards/profile-menu-item";
import AppHeader from "@/components/nav/app-header";
import { COLORS, SIZES } from "@/constants/theme";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React, { useCallback, useMemo, useRef } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const LATEST_BILLS_DATA: BillItemType[] = [
  {
    id: "1",
    date: "09 Dec | Monday",
    title: "Santander Generales",
    subtitle: "Cuenta Santander",
    amount: "3€",
    status: "Applied",
  },
  {
    id: "2",
    date: "06 Nov | Wednesday",
    title: "Santander Generales",
    subtitle: "Cuenta Santander",
    amount: "5€",
    status: "Applied",
  },
  {
    id: "3",
    date: "08 Oct | Tuesday",
    title: "Santander Generales",
    subtitle: "Cuenta Santander",
    amount: "5€",
    status: "Applied",
  },
];

const taxSheetActions = [
  {
    icon: "business-outline" as const,
    title: "AEAT taxes",
    subtitle: "Quarterly VAT, corporate income tax (IS), state taxes etc.",
  },
  {
    icon: "map-outline" as const,
    title: "Autonomous and local taxes",
    subtitle: "Business activities tax (IAE), property tax (IBI)...",
  },
  {
    icon: "document-outline" as const,
    title: "Fines",
    subtitle: "Traffic, administrative and other fines",
  },
];

const CustomBackdrop = () => {
  const { dismiss } = useBottomSheetModal();
  return (
    <Pressable onPress={() => dismiss()} style={StyleSheet.absoluteFill}>
      <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={50} />
    </Pressable>
  );
};

export default function BillsAndTaxesScreen() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const renderBillItem = ({ item }: ListRenderItemInfo<BillItemType>) => (
    <BillItemCard item={item} />
  );

  const renderSheetContent = () => (
    <BottomSheetView style={styles.sheetContentContainer}>
      {taxSheetActions.map((item, index) => (
        <React.Fragment key={item.title}>
          <ProfileMenuItem
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            onPress={() => console.log(item.title)}
          />
          {index < taxSheetActions.length - 1 && (
            <View style={styles.divider} />
          )}
        </React.Fragment>
      ))}
    </BottomSheetView>
  );

  const renderCustomHandle = (props: any) => (
    <View {...props} style={styles.handleContainer}>
      <TouchableOpacity
        onPress={handleCloseModalPress}
        style={styles.closeButton}
      >
        <Ionicons name="close" size={24} color={COLORS.darkGrey} />
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <AppHeader title="Bills and taxes" />

          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>Online payments for:</Text>
            <View style={styles.selectionContainer}>
              <TouchableOpacity style={styles.selectionCard}>
                <FontAwesome5
                  name="file-invoice-dollar"
                  size={24}
                  color="#E30600"
                />
                <Text style={styles.selectionCardTitle}>Bills</Text>
                <Text style={styles.selectionCardSubtitle}>
                  Water, electricity, insurance, chamber of commerce etc.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.selectionCard}
                onPress={handlePresentModalPress}
              >
                <FontAwesome5 name="landmark" size={24} color="#E30600" />
                <Text style={styles.selectionCardTitle}>Taxes</Text>
                <Text style={styles.selectionCardSubtitle}>
                  Spanish Tax Administration Agency (AEAT), autonomous bodies...
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>LATEST BILLS</Text>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="filter" size={20} color="#43474A" />
              <Text style={styles.filterText}>Filters</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={LATEST_BILLS_DATA}
            renderItem={renderBillItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            handleComponent={renderCustomHandle}
            backdropComponent={CustomBackdrop}
          >
            {renderSheetContent()}
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  banner: {
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#43474A",
    marginBottom: 15,
  },
  selectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  selectionCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    alignItems: "flex-start",
  },
  selectionCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#26303A",
    marginTop: 10,
  },
  selectionCardSubtitle: {
    fontSize: 12,
    fontWeight: "400",
    color: "#6c757d",
    marginTop: 4,
    lineHeight: 16,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 25,
    paddingBottom: 10,
  },
  listHeaderText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#26303A",
    letterSpacing: 0.5,
  },
  filterButton: { flexDirection: "row", alignItems: "center", gap: 5 },
  filterText: { fontSize: 14, fontWeight: "600", color: "#43474A" },
  listContainer: { paddingTop: 5, paddingBottom: 20 },
  sheetContentContainer: {
    flex: 1,
    paddingHorizontal: SIZES.base * 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginVertical: SIZES.base,
    marginLeft: SIZES.base * 6,
  },
  handleContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: SIZES.base,
  },
  closeButton: {
    padding: SIZES.base,
  },
});
