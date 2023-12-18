/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // White And Black
      'white': '#ffffff',
      'white-ghost': "#F8FAFC",
      'black': '#10182C',
      
      // Blue
      'dark-blue': '#3f3cbb',
      'light-blue': '#6597FF',
      'luminous-blue': '#00D1FF',
      'purple-blue': '#aebde1',
      
      // Gray
      'dark-gray': '#444D5B',
      'gray-light': '#F2F8FF',
      'slate-300': '#CAD4E1',
      'slate-200': '#DFE7EF',
      'slate-50': '#EEF6FB',

      // Red
      'red-500': '#EF4444',
      'red-400': '#F77172',
      'red-300': "#fffaa5",

      // Green
      'green-500': '#23C366',
      'green-400': '#48DA8A',
    },
  },
  plugins: [],
}
