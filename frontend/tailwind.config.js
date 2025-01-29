/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fafbfe: '#FAFBFE',
        grayish: '#8F8F8F', 
        'gray-1': {
          DEFAULT: '#BFBFBF', 
          500: '#999999',     
        },
      },
    },
  },
  plugins: [],
};
