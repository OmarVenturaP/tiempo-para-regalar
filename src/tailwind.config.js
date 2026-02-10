/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regalo-rosa': '#F25C92',
        'regalo-azul-c': '#00AEEF',
        'regalo-azul-r': '#0071BC',
        'regalo-verde': '#7AC143',
        'regalo-lila': '#9B51E0',
        'regalo-amarillo': '#F2C94C',
        'regalo-negro': '#333333',
      },
    },
  },
  plugins: [],
}