import BillItemCard, { BillItemType } from "@/components/cards/bill-item-card";
import AppHeader from "@/components/nav/app-header";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

export default function BillsAndTaxesScreen() {
  const renderBillItem = ({ item }: ListRenderItemInfo<BillItemType>) => (
    <BillItemCard item={item} />
  );

  return (
    <View style={styles.container}>
      <AppHeader title="Bills and taxes" canGoBack={true} />

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
          <TouchableOpacity style={styles.selectionCard}>
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
    </View>
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
});
