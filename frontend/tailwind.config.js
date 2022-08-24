/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#ffccd9",
          200: "#ff99b3",
          300: "#ff668c",
          400: "#ff3366",
          500: "#F8003F",
          600: "#cc0033",
          700: "#990026",
          800: "#66001a",
          900: "#33000d",
        },
        secondary: {
          100: "#dad2f9",
          200: "#b5a5f3",
          300: "#9078ed",
          400: "#6a4be7",
          500: "#451fe0",
          600: "#3718b4",
          700: "#2a1287",
          800: "#140941",
          900: "#0e062d",
        },
        light: "#F9F8F7",
        primaryLight: "#fff5f7",
      },
    },
  },
  plugins: [],
};
