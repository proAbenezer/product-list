/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    screens: {
      xs: "300px",
      sm: "375px",
      md: "568px",
      lg: "768px",
      xl: "968px",
      "1xl": "1024px",
      "2xl": " 1210px",
      "3xl": "1440px",
    },
    extend: {
      fontFamily: {
        redHat: ["RedHat", "sans-serif"],
        redHatBold: ["RedHatBold", "sans-serif"],
        redHatLight: ["RedHatLight", "sans-serif"],
      },
      colors: {
        Red: "hsl(14, 86%, 42%)",
        Green: "hsl(159, 69%, 38%)",
        Rose50: "hsl(20, 50%, 98%)",
        Rose100: "hsl(13, 31%, 94%)",
        Rose300: "hsl(14, 25%, 72%)",
        Rose400: "hsl(7, 20%, 60%)",
        Rose500: "hsl(12, 20%, 44%)",
        Rose900: "hsl(14, 65%, 9%)",
      },
    },
  },
  plugins: [],
};
