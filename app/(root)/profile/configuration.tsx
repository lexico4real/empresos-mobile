import Header from '@/components/common/header'
import icons from '@/constants/icons'
import React from 'react'
import { Text, View, Switch, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { CONTACT_DETAILS_URL, SECURITY_URL, PAYMENT_URL, DOCUMENT_URL, LANGUAGE_CONFIG_URL, APP_INFO_URL } from '@/config/routes'
import { NavigationOption, RouteType } from '@/config/types'

export default function Configuration() {
  const router = useRouter()
  const [notificationPermissions, setNotificationPermissions] = React.useState(false)

  const toggleNotifications = () => {
    setNotificationPermissions(previousState => !previousState)
  }

  const navigationOptions: NavigationOption[] = [
    { title: 'Choice of Language', hasArrow: true, route: LANGUAGE_CONFIG_URL, value: 'English' },
    { title: 'Contact Details', hasArrow: true, route: CONTACT_DETAILS_URL },
    { title: 'Security Settings', hasArrow: true, route: SECURITY_URL },
    { title: 'Payment Methods', hasArrow: true, route: PAYMENT_URL },
    { title: 'Document Management', hasArrow: true, route: DOCUMENT_URL },
    { title: 'Notification permissions', toggle: true, state: notificationPermissions, onToggle: toggleNotifications },
    { title: 'Information about the app', hasArrow: true, route: APP_INFO_URL },
  ]

  const handleNavigation = (route: RouteType) => {
    router.push(route as any)
  }

  return (
    <>
      <Header
        title="Configuration"
        showBackArrow={true}
        backArrowIcon={icons.back}
        titleAlignment="center"
      />
      <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom', 'left', 'right']}>
        <View className="px-4 py-6">
          <View className="flex-row items-center mb-6">
            <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="settings-outline" size={24} color="#E03131" />
            </View>
            <Text className="text-gray-800 flex-1 text-base">
              Personalize and set up the Bank's app in this section. Setup your alerts, app permissions...
            </Text>
          </View>

          <View className="mt-2">
            {navigationOptions.map((option, index) => (
              <React.Fragment key={option.title}>
                {'hasArrow' in option ? (
                  <TouchableOpacity
                    className="flex-row items-center justify-between py-4"
                    onPress={() => handleNavigation(option.route)}
                  >
                    <Text className="text-gray-800 text-base">{option.title}</Text>
                    <View className="flex-row items-center">
                      {option.value && <Text className="text-teal-600 mr-2">{option.value}</Text>}
                      <Ionicons name="chevron-forward" size={20} color="#AAAAAA" />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    className="flex-row items-center justify-between py-4"
                    disabled={true}
                  >
                    <Text className="text-gray-800 text-base">{option.title}</Text>
                    <Switch
                      trackColor={{ false: "#DDDDDD", true: "#AEDFD4" }}
                      thumbColor={option.state ? "#16A394" : "#F4F3F4"}
                      ios_backgroundColor="#DDDDDD"
                      onValueChange={option.onToggle}
                      value={option.state}
                    />
                  </TouchableOpacity>
                )}
                {index < navigationOptions.length - 1 && (
                  <View className="h-px bg-gray-200" />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}