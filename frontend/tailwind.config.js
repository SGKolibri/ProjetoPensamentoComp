/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
    },
    extend: {
      colors: {
        'black': '#000',
      },
      colorScheme: {
      },
      backgroundImage: {
        'login': "url('/images/login-bg.png')",
      }
    }
  },
  plugins: [
  ]
}



/*
'btnBlue': '#162778',
'darkBlue': '#0a1236',
*/