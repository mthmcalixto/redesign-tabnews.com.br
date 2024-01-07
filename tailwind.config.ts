import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      padding: {
        'header-py': '1rem',
      },
      height: {
        'card-trending': '9.6rem',
      },
      colors: {
        'footer-nav-links': '#0969DA',
        'header-color': '#24292F',
        'header-color-secondary': '#C9D1D9',
      },
    },
  },
  plugins: [],
}
export default config
