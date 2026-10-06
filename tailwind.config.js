export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'] },
    colors: { ink: '#0F1530', brand: { 500: '#4F46E5', 600: '#4338CA' }, teal: { 400: '#2DD4BF', 500: '#14B8A6' } }
  } }, plugins: []
}
