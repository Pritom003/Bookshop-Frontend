/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [ "Oswald", "sans-serif"],
      },
      screens: {
        xs: "450px", // Custom breakpoint for extra small screens
      },
      colors: {
        primary: "#2972b6", // Blue (Primary Color)
        button: "#1D7B84", // Teal (Button Color)
      },
    },
  },
  plugins: [],
}