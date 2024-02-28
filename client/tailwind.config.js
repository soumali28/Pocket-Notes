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
          neutral: "#292929",
          info: "#001F8B",

          error: "#B38BFA",
          "error-content": "#FF79F2",
          warning: "#43E6FC",
          "warning-content": "#F19576",
          success: "#0047FF",
          "success-content": "#6691FF",
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
