/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#07090E',
          800: '#0E131F',
          700: '#171F33',
          600: '#232D47'
        },
        amber: {
          500: '#F59E0B',
          400: '#FBBF24',
          600: '#D97706'
        },
        emerald: {
          500: '#10B981',
          400: '#34D399',
          600: '#059669'
        },
        accent: {
          coral: '#FF6B6B',
          cyan: '#00F2FE',
          purple: '#9D4EDD'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'spin-slow': 'spin 12s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)' },
          '100%': { boxShadow: '0 0 35px rgba(245, 158, 11, 0.7)' }
        }
      }
    },
  },
  plugins: [],
}
