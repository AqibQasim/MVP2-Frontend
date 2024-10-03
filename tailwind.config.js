/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/svgs/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      
      screens: {
        "1220px": "1220px",
      },
      boxShadow: {
        xl: "0 0 25px -5px rgba(0, 0, 0, 0.1)", // Adjust values here
      },
      spacing: {
        4.5: "18px",
      },
      fontFamily: {
        satoshi: ["var(--font-satoshi)"],
        lufga: ["var(--font-lufga)"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },
      colors: {
        recruitinn: {
          darkPurple: "#241B3E",
          primary: "#6137DB",
          "neutral-dark": "#170D23",
          "white-purple-shade": "#F8F7FA",
          "light-purple-shade": "#FAF5FF",
          "light-grey": "#ebebeb",
          steel: "#4A525D",
          danger: "#ff0000",
          "danger-bg": "#fff5f5",
          btnPurple: "#220772",
          lightPurple: "#6137DB",
          smallText: "#ADA9B8",
          themePurple: "#6E48D5",
          somePurple: "#2E2547",
          elementGradOne: "#0A0A0A",
          elementGradTwo: "#1E143A",
          smallDiv: "#0E0A18",
          lightPurpleText: "#9A79F7",
          spanBg: "#16161C",
          lightText: "#AC90FB",
          verySmallText: "#716690",
          borderColor: "#2A2538",
          goldenShade: "#EDB371",
          darkGolden: "#6E4628",
          paymentPurple: "#9A8BC3",
          darkPaymentPurple: "#3F3855",
          goldenTextColor: "#FFC27B",
          goldenLightText: "#C3A38B",
          accent: "#F6F5FA"
        },
        primary: {
          DEFAULT: "#4624E0",
          shade: {
            10: "#3F20CA",
            20: "#381DB3",
            30: "#31199D",
            40: "#2A1686",
            50: "#231270",
            60: "#1C0E5A",
            70: "#150B43",
            80: "#0E072D",
            90: "#070416",
            100: "#03020A",
          },
          tint: {
            10: "#593AE3",
            20: "#6B50E6",
            30: "#7E66E9",
            40: "#907CEC",
            50: "#A392F0",
            60: "#B5A7F3",
            70: "#C8BDF6",
            80: "#DAD3F9",
            90: "#EDE9FC",
            100: "#F6F4FC",
          },
        },
        grey: {
          primary: {
            DEFAULT: "#BFB8DE",
            shade: {
              10: "#ACA6C8",
              20: "#9993B2",
              30: "#86819B",
              40: "#736E85",
              50: "#605C6F",
              60: "#4C4A59",
              70: "#393743",
              80: "#26252C",
              90: "#131216",
            },
            tint: {
              10: "#C5BFE1",
              20: "#CCC6E5",
              30: "#D2CDE8",
              40: "#D9D4EB",
              50: "#DFDCEF",
              60: "#E5E3F2",
              70: "#ECEAF5",
              80: "#F2F1F8",
              90: "#F9F8FC",
            },
          },
        },
        fulfilled: {
          text: "#2AA700",
          bg: "#F0FFEB",
        },
        neutral: {
          dark: "#0D0D0F",
          white: "#FFFFFF",
        },
        bg: {
          avatar: "#FADCD0",
          frame: "#F7F7F7",
        },
        "heavy-metal": "#2C2C2C",
      },
    },
  },
  plugins: [],
};
