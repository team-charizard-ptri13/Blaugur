/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'literata': ['Literata', 'sans-serif'],
        'lexend': ['Lexend', 'sans-serif']
      }
    },
    colors: {
      'backgroundcolor': '#FAF8FF',
      'neutralcolor': '#E8E7EF',
      'textcolor': '#36365C',
      'accentcolor': '#5DC0B3',
      'secondarycolor': '#E0DFFF',
      'primarycolor': '#4E3ACF'
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}
