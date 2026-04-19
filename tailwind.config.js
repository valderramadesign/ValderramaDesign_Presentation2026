/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0a0f1e',
        cyan: '#00e5ff',
        aqua: '#26c6da',
        magenta: '#ff0080',
        violet: '#8b5cf6',
      },
      fontFamily: {
        display: ['"PT Serif Caption"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
