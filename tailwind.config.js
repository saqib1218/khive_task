/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
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
