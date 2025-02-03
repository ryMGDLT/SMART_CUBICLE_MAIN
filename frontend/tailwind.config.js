/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
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
