export const COLORS = {
  primary: "#E30600",
  secondary: "#26303A",
  tertiary: "#A0D2CF",

  white: "#FFFFFF",
  black: "#000000",
  lightGrey: "#f8f9fa",
  grey: "#6c757d",
  darkGrey: "#43474A",

  success: "#28a745",
  warning: "#ffc107",
  danger: "#dc3545",

  lightTealInfo: "#EFFBFB",
  lightBorder: "#E0E0E0",
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 10,

  h1: 30,
  h2: 22,
  h3: 18,
  h4: 16,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
};

export const FONTS = {
  h1: {
    fontSize: SIZES.h1,
    fontWeight: "700" as "700",
    color: COLORS.darkGrey,
  },
  h2: {
    fontSize: SIZES.h2,
    fontWeight: "700" as "700",
    color: COLORS.darkGrey,
  },
  h3: {
    fontSize: SIZES.h3,
    fontWeight: "600" as "600",
    color: COLORS.darkGrey,
  },
  h4: {
    fontSize: SIZES.h4,
    fontWeight: "600" as "600",
    color: COLORS.darkGrey,
  },
  body: {
    fontSize: SIZES.body4,
    fontWeight: "400" as "400",
    color: COLORS.grey,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
