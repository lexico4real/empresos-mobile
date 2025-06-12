module.exports = {
  expo: {
    name: "empresos",
    slug: "empresos",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icons/logo.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/splash-screen.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.empresos.app",
    },
    android: {
      adaptiveIcon: {
        // foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.empresos.app",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "8c03ffcf-5daa-4a65-965d-10f2964cb8ff",
      },
      BASE_URL:
        process.env.BASE_URL || "https://empresos-backend.onrender.com/api/v1",
    },
  },
  plugins: [
    "expo-font",
    "expo-router",
    "expo-secure-store",
    "expo-web-browser",
  ],
};
