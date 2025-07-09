const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-notion-x/**/*.{js,ts,jsx,tsx}', // ← 追加
  ],
  theme: {
    extend: {
      colors: {
        'wabi-bg': '#fdfaf6',
        'wabi-text': '#333333',
        'wabi-accent': '#a19182',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'), // ← 追加
  ],
}