import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = dirname(fileURLToPath(import.meta.url))

// Deux applications : le site (index.html) et l'outil de sondage (survey/index.html),
// servi sur survey.immer-executive.com par le Worker.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        survey: resolve(root, 'survey/index.html'),
      },
    },
  },
})
