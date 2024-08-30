/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
        neutral: {
          dark: "#0D0D0F",
          white: "#FFFFFF",
        },
        bg: {
          avatar: "#FADCD0",
          frame: "#F7F7F7",
        },
        recruitinn: { accent: "#F6F5FA" },
        "heavy-metal": "#2C2C2C",
      },
    },
  },
  plugins: [],
};
