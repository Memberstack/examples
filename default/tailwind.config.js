const colors = require("tailwindcss/colors");

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        "9/16": "56.25%",
      },
      lineHeight: {
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
      },
      colors: {
        brand: "#2AA8FF",
      },
      // typography: (theme) => ({
      //   DEFAULT: {
      //     css: {
      //       color: theme("colors.slate.300"),
      //       a: {
      //         color: theme("colors.sky.500"),
      //         "&:hover": {
      //           color: `${theme("colors.sky.600")} !important`,
      //         },
      //         code: { color: theme("colors.sky.400") },
      //       },
      //       h1: {
      //         fontWeight: "700",
      //         letterSpacing: theme("letterSpacing.tight"),
      //         color: theme("colors.slate.100"),
      //       },
      //       h2: {
      //         fontWeight: "700",
      //         letterSpacing: theme("letterSpacing.tight"),
      //         color: theme("colors.slate.100"),
      //       },
      //       h3: {
      //         fontWeight: "600",
      //         color: theme("colors.slate.100"),
      //       },
      //       "h4,h5,h6": {
      //         color: theme("colors.slate.100"),
      //       },
      //       pre: {
      //         backgroundColor: theme("colors.gray.800"),
      //       },
      //       code: {
      //         color: theme("colors.pink.500"),
      //         backgroundColor: theme("colors.gray.100"),
      //         paddingLeft: "4px",
      //         paddingRight: "4px",
      //         paddingTop: "2px",
      //         paddingBottom: "2px",
      //         borderRadius: "0.25rem",
      //       },
      //       "code::before": {
      //         content: "none",
      //       },
      //       "code::after": {
      //         content: "none",
      //       },
      //       details: {
      //         backgroundColor: theme("colors.gray.100"),
      //         paddingLeft: "4px",
      //         paddingRight: "4px",
      //         paddingTop: "2px",
      //         paddingBottom: "2px",
      //         borderRadius: "0.25rem",
      //       },
      //       hr: { borderColor: theme("colors.gray.200") },
      //       "ol li::marker": {
      //         fontWeight: "600",
      //         color: theme("colors.gray.500"),
      //       },
      //       "ul li::marker": {
      //         backgroundColor: theme("colors.gray.500"),
      //       },
      //       strong: { color: theme("colors.slate.100") },
      //       blockquote: {
      //         color: theme("colors.slate.100"),
      //         borderLeftColor: theme("colors.slate.700"),
      //       },
      //     },
      //   },
      // }),
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
