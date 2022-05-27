module.exports = {
  purge: ["./src/**/*.{html,js}"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat'],
        'lato': ['Lato'],
        'garamond': ['Garamond']
    },
    backgroundImage: {
      'hero-pattern': "url('https://raw.githubusercontent.com/shubhamdharpude26/generative-art-opensource/9d628f2cd341a2326f2e0de40f81e26744ccab69/output/vectorArt.svg')",
    }
    },
  },
  plugins: [],
}
