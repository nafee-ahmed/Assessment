/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#176AE6",
        grayCustom: "#707070",
      },
      padding: {
        smallSidePadding: "0.5rem",
        mediumSidePadding: "1rem",
        bigSidePadding: "4rem",
      },
      screens: {
        xs: "350px",
      },
    },
  },
  plugins: [],
};
