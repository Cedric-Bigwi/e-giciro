/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B5E20',
          50: '#E8F5E9',
          100: '#C8E6C9',
          400: '#3F8F45',
          600: '#1B5E20',
          700: '#154A19',
          800: '#0F3812'
        },
        secondary: {
          DEFAULT: '#F9A825',
          400: '#FBC02D',
          600: '#F9A825',
          700: '#E08E0B'
        },
        ink: '#1A1A1A',
        surface: '#F5F5F5'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 2px 4px rgba(0,0,0,0.06), 0 12px 24px rgba(0,0,0,0.1)'
      },
      borderRadius: {
        card: '14px'
      }
    }
  },
  plugins: []
};
