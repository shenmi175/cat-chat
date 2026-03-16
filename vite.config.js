import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron/simple'

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'electron/main.js',
        vite: {
          build: {
            rollupOptions: {
              // Keep native / optional-dep-heavy packages out of the bundle.
              // They are available at runtime in the Electron Node context.
              external: ['active-win', 'mock-aws-s3', 'aws-sdk', 'nock'],
            },
          },
        },
      },
      preload: {
        input: 'electron/preload.js',
      },
      renderer: {}
    }),
  ],
})
