import { cn } from '@/lib/utils';
import React, { useRef } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  type?: 'submit' | 'button';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  textClassName?: string;
  accessibilityLabel?: string;
  testID?: string;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function Button({
  onPress,
  children,
  type = 'button',
  disabled = false,
  loading = false,
  loadingText = 'Please wait...',
  variant = 'primary',
  className = '',
  textClassName = '',
  accessibilityLabel,
  testID,
  fullWidth = true,
  size = 'medium',
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  const buttonRef = useRef<View>(null);

  const sizeStyles = {
    small: 'h-10',
    medium: 'h-14',
    large: 'h-16',
  };

  const baseStyles = `${fullWidth ? 'w-full' : ''} ${sizeStyles[size]} rounded-md justify-center items-center rounded-full`;
  const variantStyles = {
    primary: 'bg-primary-300',
    secondary: 'bg-gray-100',
    outline: 'border border-primary-300',
  };

  const textStyles = {
    primary: 'text-white',
    secondary: 'text-gray-900',
    outline: 'text-primary-300',
  };

  const isDisabled = disabled || loading;

  const handlePress = () => {
    if (!isDisabled && onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      ref={buttonRef}
      onPress={handlePress}
      disabled={isDisabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        isDisabled && 'opacity-50',
        className
      )}
      accessible={true}
      accessibilityLabel={accessibilityLabel || (typeof children === 'string' ? children : 'Button')}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      testID={testID}
    >
      {loading ? (
        <View className="flex-row items-center space-x-2 gap-2">
          <ActivityIndicator color={variant === 'outline' ? '#4338CA' : '#ffffff'} />
          <Text
            className={cn(
              'text-base font-semibold',
              textStyles[variant],
              textClassName
            )}
          >
            {loadingText}
          </Text>
        </View>
      ) : (
        <View className="flex-row items-center justify-center space-x-2">
          {icon && iconPosition === 'left' && icon}
          <Text
            className={cn(
              'text-base font-semibold',
              textStyles[variant],
              textClassName
            )}
          >
            {children}
          </Text>
          {icon && iconPosition === 'right' && icon}
        </View>
      )}
    </TouchableOpacity>
  );
} 