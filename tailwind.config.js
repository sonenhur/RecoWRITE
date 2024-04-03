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
        'main': "url('./assets/images/main.png')",
        'mainReco' : "url('./assets/images/mainReco.png')",
        'mainPrint' : "url('./assets/images/mainPrint.png')",
        'mainCheck' : "url('./assets/images/mainCheck.png')",
        'mainDetail' : "url('./assets/images/mainDetail.png')"
      }
    },
  },
  plugins: [],
}

