import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'dark': '#131313',
        'dim': '#323232',
        'light': '#EEEEEE',
        'teal': '#13FFEC',
        'dark-teal': '#0D7377',
        'pink': '#F806CC'
      },
    },
  },
  plugins: [],
}
export default config
