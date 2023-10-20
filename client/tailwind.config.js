/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '50': '12.5rem',
        '60': '15rem',
        '70': '17.5rem',
        '80': '20rem',
        '90': '22.5rem',
        '100': '25rem',
        '110': '27.5rem',
        '120': '30rem',
        '130': '32.5rem',
        '140': '35rem',
        '150': '37.5rem',
      },
    },
  },
  plugins: [],
}

