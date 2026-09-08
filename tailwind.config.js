/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#e6f7fa',
          100: '#c2eef5',
          200: '#88dceb',
          300: '#4cc7de',
          400: '#22b3d0',
          500: '#0a96b8',
          600: '#047a9e',
          700: '#056483',
          800: '#0a4f68',
          900: '#0d3a52',
          950: '#0a2838',
        },
        abyss: {
          50: '#f0f5f7',
          100: '#d9e6eb',
          200: '#b3cdd7',
          300: '#80aab9',
          400: '#4d88a0',
          500: '#2d6a85',
          600: '#1d5070',
          700: '#163d57',
          800: '#102c41',
          900: '#0a1d2e',
          950: '#061220',
        },
        sonar: {
          cyan: '#00e5ff',
          teal: '#14ffec',
          glow: '#22d3ee',
          beam: '#06b6d4',
        },
        status: {
          safe: '#34d399',
          warn: '#fbbf24',
          crit: '#f87171',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'sonar-sweep': 'sonar-sweep 4s linear infinite',
        'sonar-pulse': 'sonar-pulse 2s ease-in-out infinite',
        'scan-line': 'scan-line 3s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'blink': 'blink 1.5s ease-in-out infinite',
      },
      keyframes: {
        'sonar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'sonar-pulse': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0,229,255,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0,229,255,0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
};
