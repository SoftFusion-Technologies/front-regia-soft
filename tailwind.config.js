/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000', // Negro para reflejar el estilo "Corsa Nera"
        secondary: '#FFF', // Blanco
        accent: '#FF5733' // Color llamativo para botones o detalles
      }
    }
  },
  plugins: []
};
