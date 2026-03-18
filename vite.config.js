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
  // Exclude the Cubism SDK TypeScript demo (it's a standalone app, not part of this project)
  server: {
    watch: {
      ignored: ['**/CubismSdkForWeb-5-r.4/Samples/TypeScript/**', '**/CubismSdkForWeb-5-r.4/Framework/**']
    }
  },
  optimizeDeps: {
    exclude: ['CubismSdkForWeb-5-r.4']
  }
})
