/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0A1929',
        'navy-light': '#132F4C',
        'teal': '#1FB2A6',
        'teal-dark': '#148F85',
        'green': '#10B981',
        'bright-green': '#34D399',
        'accent': '#06B6D4',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'title': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
}
