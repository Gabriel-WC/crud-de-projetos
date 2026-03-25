/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d9efff',
          200: '#bbe3ff',
          300: '#8bd2ff',
          400: '#52b7ff',
          500: '#2897ff',
          600: '#0d78f0',
          700: '#0b61d1',
          800: '#104fa9',
          900: '#134487'
        }
      },
      boxShadow: {
        panel: '0 20px 45px rgba(15, 23, 42, 0.18)'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
