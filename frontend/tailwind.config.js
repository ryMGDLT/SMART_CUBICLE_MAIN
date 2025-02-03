/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        fafbfe: "#FAFBFE",
        grayish: "#8F8F8F",
        Icpetgreen: "#23897D",
        Icpetgreen1: "#31AB9F",
        Canvas: "#F8F9FD",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
