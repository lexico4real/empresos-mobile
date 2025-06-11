import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <View style={styles.infoRow}>
    <Text style={styles.tableTitle}>{label}</Text>
    <Text style={styles.tableContent}>{value}</Text>
  </View>
);

interface AccountInfoCardProps {
  title: string;
  count: number;
  infoRows: InfoRowProps[];
  movementText: string;
  open?: boolean;
  onToggle?: () => void;
}

export default function AccountInfoCard({
  title,
  count,
  infoRows,
  movementText,
  open = true,
  onToggle,
}: AccountInfoCardProps) {
  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Text style={FONTS.h3}>{title}</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{count}</Text>
          </View>
        </View>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={24}
          color={COLORS.grey}
        />
      </TouchableOpacity>

      {open && <View style={styles.divider} />}

      {open && (
        <>
          {infoRows.map((row, index) => (
            <View key={index}>
              <InfoRow label={row.label} value={row.value} />
              {index < infoRows.length - 1 && (
                <View style={{ height: SIZES.base }} />
              )}
            </View>
          ))}

          <View style={styles.movementBanner}>
            <Text style={styles.movementText}>{movementText}</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    borderRadius: SIZES.radius,
    marginHorizontal: 15,
    backgroundColor: COLORS.white,
    padding: SIZES.base * 2,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  countBadge: {
    width: 22,
    height: 22,
    backgroundColor: "#d9d9d9",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  countText: { fontSize: 14, fontWeight: "600", color: COLORS.black },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightBorder,
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tableTitle: { ...FONTS.body, color: COLORS.secondary },
  tableContent: { ...FONTS.h4, color: COLORS.black },
  movementBanner: {
    backgroundColor: COLORS.lightTealInfo,
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  movementText: { fontSize: 13, fontWeight: "600", color: COLORS.secondary },
});
