import { HOME_URL } from '@/config/routes';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { AccessibilityInfo, ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';

interface StatusModalProps {
  visible: boolean;
  type: 'success' | 'error' | 'loading';
  message: string;
  onClose?: () => void;
  title?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonPress?: () => void;
  onSecondaryButtonPress?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
  accessibilityLabel?: string;
  testID?: string;
}

const StatusModal: React.FC<StatusModalProps> = ({
  visible,
  type,
  message,
  onClose,
  title,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryButtonPress,
  onSecondaryButtonPress,
  autoClose = true,
  autoCloseDelay = 2000,
  accessibilityLabel,
  testID,
}) => {
  const router = useRouter();
  const modalRef = useRef<View>(null);

  useEffect(() => {
    if (visible) {
      // Announce modal opening to screen readers
      AccessibilityInfo.announceForAccessibility(`${type} modal opened`);
    }
  }, [visible, type]);

  useEffect(() => {
    if (visible && type === 'success' && autoClose) {
      const timer = setTimeout(() => {
        router.push(HOME_URL);
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [visible, type, router, autoClose, autoCloseDelay]);

  const getModalContent = () => {
    switch (type) {
      case 'success':
        return {
          emoji: '✅',
          backgroundColor: 'bg-green-50',
          textColor: 'text-green-700',
          icon: null,
        };
      case 'error':
        return {
          emoji: '🥺',
          backgroundColor: 'bg-red-50',
          textColor: 'text-red-700',
          icon: null,
        };
      case 'loading':
        return {
          emoji: '⏳',
          backgroundColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          icon: <ActivityIndicator size="large" color="#C33A31" />,
        };
      default:
        return {
          emoji: '',
          backgroundColor: 'bg-gray-50',
          textColor: 'text-gray-700',
          icon: null,
        };
    }
  };

  const content = getModalContent();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      accessibilityViewIsModal={true}
    >
      <View
        className="flex-1 justify-center items-center bg-black/50"
        accessible={true}
        accessibilityLabel={accessibilityLabel || `${type} modal`}
        testID={testID}
      >
        <View
          className={`${content.backgroundColor} p-6 rounded-lg items-center w-4/5`}
          ref={modalRef}
        >
          {title && (
            <Text
              className={`${content.textColor} text-xl font-bold mb-2`}
              accessible={true}
              accessibilityRole="header"
            >
              {title}
            </Text>
          )}
          {content.icon ? (
            content.icon
          ) : (
            <Text
              className="text-4xl mb-4"
              accessible={true}
              accessibilityRole="image"
            >
              {content.emoji}
            </Text>
          )}
          <Text
            className={`${content.textColor} text-center text-lg font-medium mb-4`}
            accessible={true}
            accessibilityRole="text"
          >
            {message}
          </Text>
          <View className="flex-row space-x-4">
            {type === 'error' && (
              <TouchableOpacity
                onPress={onClose}
                className="bg-red-500 px-6 py-2 rounded-full"
                accessible={true}
                accessibilityLabel="Close modal"
                accessibilityRole="button"
              >
                <Text className="text-white font-medium">
                  {secondaryButtonText || 'Close'}
                </Text>
              </TouchableOpacity>
            )}
            {primaryButtonText && (
              <TouchableOpacity
                onPress={onPrimaryButtonPress}
                className="bg-primary-300 px-6 py-2 rounded-full"
                accessible={true}
                accessibilityLabel={primaryButtonText}
                accessibilityRole="button"
              >
                <Text className="text-white font-medium">
                  {primaryButtonText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default StatusModal;