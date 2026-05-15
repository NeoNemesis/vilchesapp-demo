/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Taskit-färger
        brand: {
          primary: '#4AE54A',     // Klargrön — knappar, accenter
          accent:  '#2C7A4B',     // Mörkare grön — sekundär
          dark:    '#0a0a0a',     // Svart bakgrund
          panel:   '#141414',     // Lite ljusare för paneler
          border:  '#2a2a2a',     // Subtila ramar
          muted:   '#a3a3a3',     // Sekundär text
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
};
