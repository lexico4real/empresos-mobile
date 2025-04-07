import Header from '@/components/common/header'
import ProfileMenuItem from '@/components/profile/profile-menu'
import { CONFIGURATION_URL, CONTACT_DETAILS_URL, SECURITY_URL, DOCUMENT_URL, PAYMENT_URL } from '@/config/routes'
import icons from '@/constants/icons'
import images from '@/constants/images'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
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
              <Text className='text-lg font-bold'>Iris Schamberger</Text>
              <Text className='text-gray-400'>1-297-784-7430 x30167</Text>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
