/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        coffee: {
          50:  '#fdf6ee',
          100: '#f8e8d0',
          200: '#f0cfa0',
          300: '#e5af6a',
          400: '#d8903e',
          500: '#c97a28',
          600: '#a85e1f',
          700: '#87461c',
          800: '#6e391c',
          900: '#5c301a',
          950: '#311609',
        },
        cream: {
          50:  '#fffdf7',
          100: '#fdf8ed',
          200: '#faf0d7',
          300: '#f5e3b8',
          400: '#edcf8d',
          500: '#e3b862',
          600: '#d49c3c',
          700: '#b07e2c',
          800: '#8d6327',
          900: '#735223',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn:   { from: { opacity: '0' },                   to: { opacity: '1' } },
        slideUp:  { from: { transform: 'translateY(20px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        slideDown:{ from: { transform: 'translateY(-20px)', opacity:'0' }, to: { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
}
