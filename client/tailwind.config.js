/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          'primary': {
            'light': '#85d7ff',
            'DEFAULT': '#1fb6ff',
            'dark': '#009eeb',
          },
          'secondary': {
            'light': '#ff7ce5',
            'DEFAULT': '#ff49db',
            'dark': '#ff16d1',
          },
          'neutral': {
            'lightest': '#f8fafc',
            'light': '#e2e8f0',
            'DEFAULT': '#94a3b8',
            'dark': '#334155',
            'darkest': '#0f172a',
          }
        },
      },
    },
    plugins: [],
  }