import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron/simple'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    // Must come before react()
    nodePolyfills({
      // Polyfill Node.js built-ins needed by pixi.js v6 in browser context
      include: ['url', 'querystring', 'path', 'util', 'buffer', 'process'],
      globals: { process: true, Buffer: true },
    }),
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
  server: {
    watch: {
      ignored: ['**/CubismSdkForWeb-5-r.4/**']
    }
  },
})
