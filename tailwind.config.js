/** @type {import('tailwindcss').Config} */
export default {
  // 1. IL RADAR: Diciamo a Tailwind dove cercare le tue classi per far apparire i testi
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 2. LA PALETTE INTELLIGENTE: Eliminiamo il blu e usiamo neri profondi
      colors: {
        gray: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#18181b', // Grigio scuro puro (niente blu)
          900: '#09090b', // Quasi nero (stile terminale)
        },
        background: '#050505', // Nero assoluto per lo sfondo principale
      }
    },
  },
  plugins: [],
}