/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "DancingScript": ['Dancing Script', 'cursive'],
        "Oswald": ['Oswald', 'sans-serif'],
        "BalooBhaijaan2": ['Baloo Bhaijaan 2', 'sans-serif'],
        "Kalnia": ['Kalnia', 'serif'],
        "BalooBahina2": ['Baloo Bhaina 2', 'sans-serif']
      },
    },
  },
  plugins: [],
}

