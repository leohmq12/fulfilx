/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'helvetica': ['HelveticaNowDisplay-Regular', 'sans-serif'],
        'helvetica-bold': ['HelveticaNowDisplay-Bold', 'sans-serif'],
        'helvetica-medium': ['HelveticaNowDisplay-Medium', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'infinite-scroll': {
          from: {transform: 'translateX(0)' },
          to: {transform: 'translateX(calc(-100% - 4rem))'},
        },
        'infinite-scroll-reverse': {
          from: { transform: 'translateX(calc(-100% - 4rem))' },
          to: { transform: 'translateX(0)' },
        },

      },
      animation: {
        marquee: 'marquee 15s linear infinite',
        'infinite-scroll': 'infinite-scroll 10s linear infinite',
        'infinite-scroll-reverse': 'infinite-scroll-reverse 10s linear infinite',
        'infinite-scroll-slow': 'infinite-scroll 35s linear infinite'
      },
    },
  },
  plugins: [],
}
