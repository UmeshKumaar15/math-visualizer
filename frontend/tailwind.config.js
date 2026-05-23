/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        geminiDark: '#000000',
        geminiPanel: '#111111',
        geminiBlue: '#8ab4f8',
      }
    },
  },
  plugins: [],
}