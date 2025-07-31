export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Josefin Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      colors: {
        beige: '#F7F3EB',
        dark: '#3C3A36',
        accent: '#B75C3D',
        gold: '#D3A95C',
        green: '#6B8E56',
        border: '#E6DFD0',
        // Dark mode colors
        'dark-bg': '#1a1a1a',
        'dark-surface': '#2d2d2d',
        'dark-text': '#e5e5e5',
        'dark-text-secondary': '#a0a0a0',
        'dark-border': '#404040',
      },
    },
  },
  plugins: [],
}