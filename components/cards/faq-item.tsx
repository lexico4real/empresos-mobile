import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const FAQ_THEME_COLOR = "#00796B";

interface FAQItemProps {
  question: string;
}

export default function FAQItem({ question }: FAQItemProps) {
  const handlePress = () => console.log(`Toggling answer for: ${question}`);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>
      <Ionicons name="chevron-down" size={20} color={FAQ_THEME_COLOR} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  questionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: FAQ_THEME_COLOR,
    marginRight: 10,
  },
});
