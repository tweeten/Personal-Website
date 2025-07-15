export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
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
      },
    },
  },
  plugins: [],
}