/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{vue, js, cjs, ts, jsx, tsx}",

  ],
  theme: {
      colors: {
          bggreen: '#065f46',
          lightgreen: '#6D9D87',
          white:'#FFFFFF',
          orange: '#FFB613',
          blue: '#699AE2',
          green: '#87CD99',
          darkblue: '#2A4C8A',
          black: '#000000'

      },
    extend: {},
  },
  plugins: [],
}
