/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          base: "#CBDED3",   // light minty background
          soft: "#8BA49A",   // soft green
          tan:  "#D2C49E",   // beige highlight
          dark: "#3B6255",   // forest green
          card: "#E2DFDA",   // pale card background
        },
      },
    },
  },
  plugins: [],
};
// This Tailwind CSS configuration file sets up custom colors for the Earth theme