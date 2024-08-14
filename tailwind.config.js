/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors :{
        'primary-white' : "#c1cfea",
        'sec-yellow':"#ffedd5",
        "def-black" : "#282828"
      }
    },
  },
  plugins: [],
};
