/** @type {import('tailwindcss').Config} */

const theme = require('./src/theme.js')

module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      height: {
        'navBar': '30px',
        'page': 'calc(100vh - 30px)',
        'tabPage': 'calc(100vh - 58px)',
        'card': 'calc(100% - 35px)',
        'titlecard': '35px',
        
      },

      width:{
        'sideMenuReduce': '50px',
        'sideMenuFull': '256px',
      },

      top: {'navBar': '30px'},

      colors: { 

        white:{
          500: '#E1E1E6'
        },

        ...theme

      }

    },
    
  },

  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
