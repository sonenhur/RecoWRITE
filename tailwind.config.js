/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens:{
      sm:{ min: "700px", max: "819px"},
      md:{ min: "820px", max: "1080px"}
    },
    extend: {
      backgroundImage: {
        'main': "url('./assets/images/main.png')"
      }
    },
  },
  plugins: [],
}

