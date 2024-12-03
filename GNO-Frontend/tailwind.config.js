/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html', './src/**/*.js', 'node_modules/preline/dist/*.js', 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      boxShadow:{
        'custom':'0px 25px 20px -20px rgba(34,197,94,1)',
      }
    },
  },
  plugins: [
    require('preline/plugin'),
    // require('flowbite/plugin'),
  ],
}

