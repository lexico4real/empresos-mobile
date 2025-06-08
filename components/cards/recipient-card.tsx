import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RecipientCardProps {
  initials: string;
  name: string;
  accountNumber: string;
  bgColor: string;
}

export default function RecipientCard({
  initials,
  name,
  accountNumber,
  bgColor,
}: RecipientCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={[styles.avatar, { backgroundColor: bgColor }]}>
        <Text style={styles.initials}>{initials}</Text>
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.accountNumber}>
        {accountNumber.replace(/(\d{3})\d{4}(\d{3})/, "$1****$2")}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 130,
    height: 130,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    padding: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  initials: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  name: {
    fontSize: 12,
    fontWeight: "500",
    color: "#26303A",
    textAlign: "center",
    paddingHorizontal: 4,
  },
  accountNumber: {
    fontSize: 10,
    fontWeight: "400",
    color: "#6c757d",
    marginTop: 2,
    lineHeight: 12,
  },
});
