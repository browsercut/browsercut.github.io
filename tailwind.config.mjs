/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'deep-navy': '#091540',
        'vivid-blue': '#1B2CC1',
        'soft-blue': '#7692FF',
        'pale-blue': '#ABD2FA',
        'coffee-yellow': '#FFDD00',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(27, 44, 193, 0.4)',
        'glow-soft': '0 0 20px -5px rgba(118, 146, 255, 0.35)',
      },
    },
  },
  plugins: [],
};
