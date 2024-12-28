/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a202c',
        secondary: '#f7fafc',
        accent: '#ed64a6'
      }
    }
  },
  plugins: []
};
