/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0D9488',
        secondary: '#14B8A6',
        cta: '#F97316',
        'cta-hover': '#EA580C',
        bg: '#F0FDFA',
        ink: '#134E4A',
        muted: '#475569',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
};
