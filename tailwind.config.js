/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      height: {
        'navBar': '30px',
        'page': 'calc(100vh - 30px)'

      },

      top: {'navBar': '30px'},

      colors: {

        white:{
          500: '#E1E1E6'
        },

        blue:{
          500:'#78D1E1'
        },

        purple:{
          900: '#13111B',
          800: '#191622',
          700: '#201B2D',
          600: '#252131',
          500: '#44475A70',
          400: '#41414D',
          300: '#626483',
          200: '#5A4B81',
          100: '#988bc7'
        },

        gray: {
          100: '#EFEFEF',
          200: '#DDDDDD',
          300: '#BAC1CC',
          400: '#A1A7BA',
          500: '#5D6F7D',
          600: '#455866',
          700: '#2D3945',
          800: '#212a33',
          900: '#13181d'
      }

      }

    },
    
  },

  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
