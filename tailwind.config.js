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
      }, // Missing this closing brace
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      }, // Missing this closing brace
      animation: {
        marquee: 'marquee 15s linear infinite',
      },
    },
  },
  plugins: [],
}