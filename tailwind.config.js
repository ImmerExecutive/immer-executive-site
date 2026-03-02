/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'hind': ['Hind', 'sans-serif'],
      },
      colors: {
        'immer-blue': '#01001e',
        'immer-light': '#0000a3',
        'soft-gray': '#f8f8f8',
        'line-gray': '#e5e5e5',
      }
    },
  },
  plugins: [],
}
