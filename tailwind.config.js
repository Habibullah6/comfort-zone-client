/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        shopcarttheme: {
        primary: '#f43f5e',
        secondary: '#f43f5e',
        accent: '#000036',
        neutral: "#3D4451",
        "base-100": '#FFFFFF'
        },
      },
    ],
  },


  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
