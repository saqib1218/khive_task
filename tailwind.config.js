/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#19ECB7',
      },
      keyframes: {
        
        dashMove: {
          to: { strokeDashoffset: "70" },
        },
      },
      animation: {
        dash: "dashMove 2s linear infinite",
      },
    },
  },
  plugins: [],
};
