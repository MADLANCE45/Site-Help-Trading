/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // QUESTA RIGA È FONDAMENTALE
  ],
  theme: {
    extend: {
      colors: {
        background: '#020202', // Un nero più profondo e premium
      },
      fontFamily: {
        // Forza un font moderno di sistema se non ne hai caricati altri
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}