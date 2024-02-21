const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,js,astro,jsx,ts,tsx,svelte}'],
  plugins: [
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['Satoshi', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}
