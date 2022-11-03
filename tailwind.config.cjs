/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    backgroundImage: {
      "img-drops": "url('./public/drops.png')",
    },
    extend: {
      colors: {
        background: "#FFFF",
        primary: "#233E6D",
        secondary: "#233E6D",
        selected: "##EBEBEB",
        text: "#EBEBEB",
        textBlue: "#bacbe8",
      },
      boxShadow: {
        header: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
