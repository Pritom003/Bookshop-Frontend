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
    },
  },
  plugins: [],
}