/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        siteBlack: '#0b0c15',
        siteDim: '#1a1b25',
        siteViolet: '#bc13fe',
        siteWhite: '#ffffff',
        siteCyan: '#00f3ff',
      },
      backgroundImage: {
        astral: "url('/src/assets/background/astral.jpg')",
        saiman: "url('/src/assets/background/saiman.jpg')",
        eoaalien: "url('/src/assets/background/eoaalien.jpg')",
        panight: "url('/src/assets/background/panight.jpg')",
        heroImg: "url('/src/assets/background/hero-img.jpg')",
      },
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
      },

    },
  },
  plugins: [],
};
