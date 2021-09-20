module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(200px, 1fr))'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
