import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Animated,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "../button/button";

interface StatusModalProps {
  visible: boolean;
  type: "loading" | "success" | "error" | null;
  message?: string;
  onClose: () => void;
}

const typeConfig = {
  loading: {
    icon: null,
    color: COLORS.primary,
    backgroundColor: "#FEEEEE",
  },
  success: {
    icon: "checkmark-circle" as const,
    color: COLORS.success,
    backgroundColor: "#E8F5E9",
  },
  error: {
    icon: "close-circle" as const,
    color: COLORS.danger,
    backgroundColor: "#FFEBEE",
  },
};

export default function StatusModal({
  visible,
  type,
  message,
  onClose,
}: StatusModalProps) {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!type) return null;

  const config = typeConfig[type];

  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <Animated.View style={[styles.backdrop, { opacity: opacityAnim }]}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ scale: scaleAnim }],
              backgroundColor: config.backgroundColor,
            },
          ]}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: config.color + "20" },
            ]}
          >
            {type === "loading" ? (
              <ActivityIndicator size="large" color={config.color} />
            ) : (
              <Ionicons
                name={config.icon as any}
                size={40}
                color={config.color}
              />
            )}
          </View>
          <Text style={[styles.messageText, { color: COLORS.secondary }]}>
            {message ||
              (type === "error"
                ? "An unexpected error occurred."
                : "Processing...")}
          </Text>
          {type !== "loading" && (
            <Button
              title="Close"
              onPress={onClose}
              containerStyle={styles.button}
              variant="secondary"
            />
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    borderRadius: SIZES.radius * 2,
    padding: SIZES.base * 2.5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.base * 2,
  },
  messageText: {
    ...FONTS.h3,
    textAlign: "center",
    marginBottom: SIZES.base * 2,
  },
  button: {
    width: "100%",
    marginTop: SIZES.base,
  },
});
