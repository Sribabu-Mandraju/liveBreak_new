/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables dark mode with class-based switching
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#ffffff",
          text: "#000000",
        },
        dark: {
          background: "#1a202c",
          text: "#f7fafc",
        },
      },
      transitionProperty: {
        theme: "background-color, color",
      },
    },
  },
  plugins: [],
};