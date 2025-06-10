import AppHeader from "@/components/nav/app-header";
import ProfileMenuItem from "@/components/cards/profile-menu-item";
import { SIGN_IN_URL } from "@/config/routes";
import { useAuth } from "@/providers/auth-context";
import { authService } from "@/services/auth.service";
import { useUserStore } from "@/store/userStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const menuData = [
  {
    type: "item",
    icon: "person-outline",
    title: "Contact details",
    subtitle: "Add photo, email, phone and addresses",
  },
  {
    type: "item",
    icon: "settings-outline",
    title: "Configuration",
    subtitle: "Personalise and set up the Bank’s app",
  },
  // {
  //   type: "sub-item",
  //   icon: "options-outline",
  //   title: "Personalisation of the Account overview",
  // },
  {
    type: "item",
    icon: "lock-closed-outline",
    title: "Security and privacy",
    subtitle: "You can feel totally confident about security",
  },
  {
    type: "item",
    icon: "document-text-outline",
    title: "Docubox",
    subtitle: "All the documents we have shared between the Bank and yourself.",
  },
  {
    type: "item",
    icon: "timer-outline",
    title: "Get your payments up to date",
    subtitle:
      "Manage your debts: total payment, partial payment or set up payment.",
  },
];

export default function PersonalAreaScreen() {
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();
  const { user } = useUserStore();

  const handleSignOut = async () => {
    await authService.signOut();
    setIsAuthenticated(false);
    router.push(SIGN_IN_URL);
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Personal area" canGoBack={true} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="#E30600" />
          </View>
          <View>
            <Text style={styles.profileName}>
              {" "}
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuListContainer}>
          <View style={styles.divider} />
          {menuData.map((item, index) => (
            <View key={item.title}>
              <ProfileMenuItem
                icon={item.icon as keyof typeof Ionicons.glyphMap}
                title={item.title}
                subtitle={item.subtitle}
                isSubItem={item.type === "sub-item"}
                onPress={() => console.log(`Pressed ${item.title}`)}
              />
              {/* Render a full-width divider after every item except the last one */}
              {index < menuData.length && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  // --- Banner & Profile Card ---
  banner: {
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 15,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FEEEEE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#26303A",
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6c757d",
    marginTop: 2,
  },
  // --- Menu List ---
  menuListContainer: {
    marginVertical: 15,
    gap: 15,
  },
  divider: {
    height: 2,
    backgroundColor: "#F0F0F0",
  },
});

// import Header from "@/components/common/header";
// import ProfileMenuItem from "@/components/profile/profile-menu-item";
// import {
//   CONFIGURATION_URL,
//   CONTACT_DETAILS_URL,
//   DOCUMENT_URL,
//   PAYMENT_URL,
//   SECURITY_URL,
//   SIGN_IN_URL,
// } from "@/config/routes";
// import icons from "@/constants/icons";
// import images from "@/constants/images";
// import { useAuth } from "@/providers/auth-context";
// import { authService } from "@/services/auth.service";
// import { useUserStore } from "@/store/userStore";
// import { useRouter } from "expo-router";
// import React from "react";
// import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function Profile() {
//   const { setIsAuthenticated } = useAuth();
//   const router = useRouter();
//   const { user } = useUserStore();

//   const handleSignOut = async () => {
//     await authService.signOut();
//     setIsAuthenticated(false);
//     router.push(SIGN_IN_URL);
//   };

//   return (
//     <>
//       <Header
//         title="Personal Area"
//         showBackArrow={true}
//         backArrowIcon={icons.back}
//         rightIcon={icons.close}
//         onRightPress={() => console.log("Close pressed")}
//         titleAlignment="center"
//       />
//       <SafeAreaView
//         edges={["bottom", "left", "right"]}
//         className="flex-1 bg-white"
//       >
//         <ScrollView showsVerticalScrollIndicator={false}>
//           {/* User Profile Section */}
//           <View className="flex-row items-center mt-6 mb-8 px-8">
//             <Image
//               source={images.Profile}
//               className="size-24 rounded-full bg-gray-100"
//             />
//             <View className="ml-4">
//               <Text className="text-lg font-bold">
//                 {user?.firstName} {user?.lastName}
//               </Text>
//               <Text className="text-gray-400">{user?.phoneNumber}</Text>
//             </View>
//           </View>

//           {/* Menu Items */}
//           <View className="flex-1">
//             <ProfileMenuItem
//               icon={icons.contact}
//               title="Contact Details"
//               description="Add photos, email, phone and addresses"
//               route={CONTACT_DETAILS_URL}
//               iconColor="#e63946"
//             />

//             <ProfileMenuItem
//               icon={icons.settingsIcons}
//               title="Configuration"
//               description="Personalise and set up the Bank's app in this section"
//               route={CONFIGURATION_URL}
//               iconColor="#e63946"
//             />

//             <ProfileMenuItem
//               icon={icons.padlock}
//               title="Security and Privacy"
//               description="You can feel totally confident about security"
//               route={SECURITY_URL}
//               iconColor="#e63946"
//             />

//             <ProfileMenuItem
//               icon={icons.document}
//               title="Docubox"
//               description="All the documents we have shared between the Bank"
//               route={DOCUMENT_URL}
//               iconColor="#e63946"
//             />

//             <ProfileMenuItem
//               icon={icons.refresh}
//               title="Get your payments up to date"
//               description="manage your debts: total payments"
//               route={PAYMENT_URL}
//               iconColor="#e63946"
//             />

//             {/* Logout */}
//             <TouchableOpacity
//               onPress={handleSignOut}
//               className="flex-row items-center py-6 px-8 border-b border-black/10"
//             >
//               <View className="mr-4">
//                 <Image
//                   source={icons.logout}
//                   className="w-7 h-7"
//                   style={{ tintColor: "#e63946" }}
//                 />
//               </View>

//               <View className="flex-1">
//                 <Text className="text-lg font-semibold text-red-600">
//                   Logout
//                 </Text>
//                 <Text className="text-sm text-gray-500 mt-1">
//                   Logout from the app
//                 </Text>
//               </View>

//               <Image
//                 source={icons.rightArrow}
//                 className="w-5 h-5"
//                 style={{ tintColor: "#CCCCCC" }}
//               />
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// }
