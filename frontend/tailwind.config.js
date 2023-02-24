/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'dark-blue': '#212D3A',
      'blue': '#3278AE',
      'light-blue': '#6DB2C9',
      'dark-grey': '#3A3D40',
      'grey': '#8A8C8E',
      'cyan': '#32AEA7',
      'red': '#FD5555',
      'orange': '#EC8B32',
      'yellow': '#ECB832',
      'green': '60B75E'
    },
    extend: {},
  },
  
  plugins: [require("@tailwindcss/typography"), require("daisyui")],

  daisyui: {
    themes: false
  }
}
