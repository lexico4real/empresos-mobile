import Header from '@/components/common/header'
import ProfileMenuItem from '@/components/profile/profile-menu'
import { CONFIGURATION_URL, CONTACT_DETAILS_URL, DOCUMENT_URL, PAYMENT_URL, SECURITY_URL, SIGN_IN_URL } from '@/config/routes'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { useAuth } from '@/context/auth-context'
import { authService } from '@/services/auth.service'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
  const { setIsAuthenticated } = useAuth()
  const router = useRouter()
  const { user } = useUserStore()

  const handleSignOut = async () => {
    await authService.signOut()
    setIsAuthenticated(false)
    router.push(SIGN_IN_URL)
  }

  return (
    <>
      <Header
        title="Personal Area"
        showBackArrow={true}
        backArrowIcon={icons.back}
        rightIcon={icons.close}
        onRightPress={() => console.log('Close pressed')}
        titleAlignment="center"
      />
      <SafeAreaView edges={['bottom', 'left', 'right']} className="flex-1 bg-white">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* User Profile Section */}
          <View className='flex-row items-center mt-6 mb-8 px-8'>
            <Image
              source={images.Profile}
              className='size-24 rounded-full bg-gray-100'
            />
            <View className='ml-4'>
              <Text className='text-lg font-bold'>{user?.firstName} {user?.lastName}</Text>
              <Text className='text-gray-400'>{user?.phoneNumber}</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View className="flex-1">
            <ProfileMenuItem
              icon={icons.contact}
              title="Contact Details"
              description="Add photos, email, phone and addresses"
              route={CONTACT_DETAILS_URL}
              iconColor="#e63946"
            />

            <ProfileMenuItem
              icon={icons.settingsIcons}
              title="Configuration"
              description="Personalise and set up the Bank's app in this section"
              route={CONFIGURATION_URL}
              iconColor="#e63946"
            />

            <ProfileMenuItem
              icon={icons.padlock}
              title="Security and Privacy"
              description="You can feel totally confident about security"
              route={SECURITY_URL}
              iconColor="#e63946"
            />

            <ProfileMenuItem
              icon={icons.document}
              title="Docubox"
              description="All the documents we have shared between the Bank"
              route={DOCUMENT_URL}
              iconColor="#e63946"
            />

            <ProfileMenuItem
              icon={icons.refresh}
              title="Get your payments up to date"
              description="manage your debts: total payments"
              route={PAYMENT_URL}
              iconColor="#e63946"
            />

            {/* Logout */}
            <TouchableOpacity
              onPress={handleSignOut}
              className="flex-row items-center py-6 px-8 border-b border-black/10"
            >
              <View className="mr-4">
                <Image
                  source={icons.logout}
                  className="w-7 h-7"
                  style={{ tintColor: '#e63946' }}
                />
              </View>

              <View className="flex-1">
                <Text className="text-lg font-semibold text-red-600">Logout</Text>
                <Text className="text-sm text-gray-500 mt-1">Logout from the app</Text>
              </View>

              <Image
                source={icons.rightArrow}
                className="w-5 h-5"
                style={{ tintColor: '#CCCCCC' }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
