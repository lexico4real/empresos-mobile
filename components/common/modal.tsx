import { HOME_URL } from '@/config/routes';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';

interface StatusModalProps {
  visible: boolean;
  type: 'success' | 'error' | 'loading';
  message: string;
  onClose?: () => void;
}

const StatusModal: React.FC<StatusModalProps> = ({
  visible,
  type,
  message,
  onClose,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (visible && type === 'success') {
      const timer = setTimeout(() => {
        router.push(HOME_URL);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, type, router]);

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
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className={`${content.backgroundColor} p-6 rounded-lg items-center w-4/5`}>
          {content.icon ? (
            content.icon
          ) : (
            <Text className="text-4xl mb-4">{content.emoji}</Text>
          )}
          <Text className={`${content.textColor} text-center text-lg font-medium mb-4`}>
            {message}
          </Text>
          {type === 'error' && (
            <TouchableOpacity
              onPress={onClose}
              className="bg-red-500 px-6 py-2 rounded-full"
            >
              <Text className="text-white font-medium">Close</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default StatusModal;