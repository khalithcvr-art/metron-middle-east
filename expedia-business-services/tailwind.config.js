/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Marcellus', '"Sora Variable"', 'Sora', 'serif'],
      },
      colors: {
        brand: {
          navy: '#080C14',
          'navy-2': '#0D1321',
          'navy-3': '#0A0F1A',
          gold: '#D4AF37',
          'gold-light': '#E9CE8C',
          'gold-dark': '#9C7A2C',
        },
        // Champagne-gold remap of the amber scale — retints every existing
        // text-amber-*/bg-amber-*/border-amber-* class across the site.
        amber: {
          50: '#FBF7EC',
          100: '#F7EFD8',
          200: '#F2E3BC',
          300: '#F2DFAE',
          400: '#E9CE8C',
          500: '#D4AF37',
          600: '#B8912F',
          700: '#9C7A2C',
          800: '#7A5F22',
          900: '#5C4719',
          950: '#3A2C0F',
        },
      },
    },
  },
  plugins: [],
};
