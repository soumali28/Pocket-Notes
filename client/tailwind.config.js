/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#fff",
          secondary: "#16008B",
          accent: "#DAE5F5",
          "neutral": "#292929"
        },
      },
      "light",
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
