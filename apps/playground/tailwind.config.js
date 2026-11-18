/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{ts,tsx}', '../../packages/native/src/**/*.{ts,tsx}'],
  darkMode: 'class',
  presets: [require('@fluxo-oficina/native/tailwind-preset')],
}
