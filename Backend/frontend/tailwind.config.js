/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        "DancingScript": ['Dancing Script', 'cursive'],
        "Oswald": ['Oswald', 'sans-serif'],
        "BalooBhaijaan2": ['Baloo Bhaijaan 2', 'sans-serif'],
        "Kalnia": ['Kalnia', 'serif'],
        "BalooBahina2": ['Baloo Bhaina 2', 'sans-serif'],
        "Sevillana": ['Sevillana', 'cursive'],
        "Caveat": ['Caveat', 'cursive'],
      },
      colors:{
        'darkMode': '#343541',
      }
    },
  },
  layers: {
    'no-tailwindcss': {
      // Add any styles you want to disable here
      '.no-tailwindcss': {
        all: 'unset',
      },
    },
  },
  plugins: [],
}