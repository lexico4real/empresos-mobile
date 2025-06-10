import React from "react";
import { StyleSheet, Text, View } from "react-native";

export interface BillItemType {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  amount: string;
  status: "Applied" | "Pending" | "Overdue";
}

interface BillItemCardProps {
  item: BillItemType;
}

export default function BillItemCard({ item }: BillItemCardProps) {
  return (
    <View>
      <Text style={styles.dateText}>{item.date.toUpperCase()}</Text>
      <View style={styles.infoCardWrapper}>
        <View style={styles.contentWrapper}>
          <View style={styles.detailsWrapper}>
            {/* <View style={styles.iconBackground}>
              <FontAwesome5 name="university" size={16} color="#E30600" />
            </View> */}
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          </View>
          <View style={styles.amountWrapper}>
            <Text style={styles.amountText}>{item.amount}</Text>
            {item.status === "Applied" && (
              <View style={styles.statusChip}>
                <Text style={styles.statusText}>
                  {item.status.toUpperCase()}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dateText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#E30600",
    marginLeft: 15,
    marginBottom: 8,
  },
  infoCardWrapper: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  contentWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsWrapper: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBackground: {
    backgroundColor: "#FEEEEE",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 16, fontWeight: "600", color: "#26303A" },
  subtitle: { fontSize: 14, fontWeight: "400", color: "#6c757d", marginTop: 2 },
  amountWrapper: { alignItems: "flex-end" },
  amountText: { fontSize: 16, fontWeight: "700", color: "#000" },
  statusChip: {
    borderWidth: 2,
    borderColor: "#E0FFFF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 4,
  },
  statusText: { fontSize: 10, fontWeight: "600", color: "#26303A" },
});
