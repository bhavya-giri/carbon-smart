/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#161816',
        'primary': '#CCD095',
        'secondary': '#E4EFDC',
        'accent': '#AFD095',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "background": "#121113"
        },
      },
      "light",
      "dark"
    ],
  },
}

