/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  theme: {
    extend: {},
    fontFamily: {
      fonts: ['"Roboto Condensed"', 'sans-serif'],
    },
    boxShadow: {
      'header': '0px 5px rgba(0, 0, 0, 0.3)',
    },
  },
  plugins: [],
}
