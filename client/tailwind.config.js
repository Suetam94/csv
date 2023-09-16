/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    theme: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      }
    },
    extend: {},
  },
  plugins: [],
}