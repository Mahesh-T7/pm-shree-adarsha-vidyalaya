/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6',
          DEFAULT: '#0b3d91', // Dark blue from Sri Chaitanya reference
          dark: '#1e3a8a',
        },
        accent: {
          light: '#f43f5e',
          DEFAULT: '#d91b5c', // Crimson/ruby red from Sri Chaitanya reference navbar
          dark: '#9f1239',
        },
        gold: {
          light: '#fbbf24',
          DEFAULT: '#d97706',
          dark: '#b45309',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
