import type { Preview } from '@storybook/react-vite'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '../src/styles.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Tema',
      toolbar: { title: 'Tema', icon: 'circlehollow', items: ['light', 'dark'], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, ctx) => {
      const escuro = ctx.globals.theme === 'dark'
      document.documentElement.classList.toggle('dark', escuro)
      document.body.style.background = 'var(--background)'
      return Story()
    },
  ],
  parameters: { layout: 'padded', a11y: { test: 'error' } },
}
export default preview
