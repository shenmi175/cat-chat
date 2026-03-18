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
  resolve: {
    alias: {
      '@pixi/core': 'pixi.js',
      '@pixi/display': 'pixi.js',
      '@pixi/utils': 'pixi.js',
      '@pixi/math': 'pixi.js',
      '@pixi/runner': 'pixi.js',
      '@pixi/ticker': 'pixi.js',
      '@pixi/settings': 'pixi.js',
      '@pixi/constants': 'pixi.js',
      '@pixi/extensions': 'pixi.js',
      '@pixi/graphics': 'pixi.js',
    }
  },
  optimizeDeps: {
    include: ['pixi.js', 'pixi-live2d-display']
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})
