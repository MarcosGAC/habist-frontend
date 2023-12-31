/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        dark: "#09090A",
        light: "#fff",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0,1fr))",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
],
};
