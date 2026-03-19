// vite.config.js
import { defineConfig } from "file:///home/zmb/snap/cat-chat/node_modules/vite/dist/node/index.js";
import react from "file:///home/zmb/snap/cat-chat/node_modules/@vitejs/plugin-react/dist/index.js";
import electron from "file:///home/zmb/snap/cat-chat/node_modules/vite-plugin-electron/dist/simple.mjs";
import { nodePolyfills } from "file:///home/zmb/snap/cat-chat/node_modules/vite-plugin-node-polyfills/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    // Must come before react()
    nodePolyfills({
      // Polyfill Node.js built-ins needed by pixi.js v6 in browser context
      include: ["url", "querystring", "path", "util", "buffer", "process"],
      globals: { process: true, Buffer: true }
    }),
    react(),
    electron({
      main: {
        entry: "electron/main.js",
        vite: {
          build: {
            rollupOptions: {
              external: ["active-win", "mock-aws-s3", "aws-sdk", "nock"]
            }
          }
        }
      },
      preload: {
        input: "electron/preload.js"
      },
      renderer: {}
    })
  ],
  server: {
    watch: {
      ignored: ["**/CubismSdkForWeb-5-r.4/**"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS96bWIvc25hcC9jYXQtY2hhdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvem1iL3NuYXAvY2F0LWNoYXQvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvem1iL3NuYXAvY2F0LWNoYXQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IGVsZWN0cm9uIGZyb20gJ3ZpdGUtcGx1Z2luLWVsZWN0cm9uL3NpbXBsZSdcbmltcG9ydCB7IG5vZGVQb2x5ZmlsbHMgfSBmcm9tICd2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxscydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIC8vIE11c3QgY29tZSBiZWZvcmUgcmVhY3QoKVxuICAgIG5vZGVQb2x5ZmlsbHMoe1xuICAgICAgLy8gUG9seWZpbGwgTm9kZS5qcyBidWlsdC1pbnMgbmVlZGVkIGJ5IHBpeGkuanMgdjYgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgICBpbmNsdWRlOiBbJ3VybCcsICdxdWVyeXN0cmluZycsICdwYXRoJywgJ3V0aWwnLCAnYnVmZmVyJywgJ3Byb2Nlc3MnXSxcbiAgICAgIGdsb2JhbHM6IHsgcHJvY2VzczogdHJ1ZSwgQnVmZmVyOiB0cnVlIH0sXG4gICAgfSksXG4gICAgcmVhY3QoKSxcbiAgICBlbGVjdHJvbih7XG4gICAgICBtYWluOiB7XG4gICAgICAgIGVudHJ5OiAnZWxlY3Ryb24vbWFpbi5qcycsXG4gICAgICAgIHZpdGU6IHtcbiAgICAgICAgICBidWlsZDoge1xuICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgICBleHRlcm5hbDogWydhY3RpdmUtd2luJywgJ21vY2stYXdzLXMzJywgJ2F3cy1zZGsnLCAnbm9jayddLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHByZWxvYWQ6IHtcbiAgICAgICAgaW5wdXQ6ICdlbGVjdHJvbi9wcmVsb2FkLmpzJyxcbiAgICAgIH0sXG4gICAgICByZW5kZXJlcjoge31cbiAgICB9KSxcbiAgXSxcbiAgc2VydmVyOiB7XG4gICAgd2F0Y2g6IHtcbiAgICAgIGlnbm9yZWQ6IFsnKiovQ3ViaXNtU2RrRm9yV2ViLTUtci40LyoqJ11cbiAgICB9XG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UCxTQUFTLG9CQUFvQjtBQUNwUixPQUFPLFdBQVc7QUFDbEIsT0FBTyxjQUFjO0FBQ3JCLFNBQVMscUJBQXFCO0FBRTlCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQTtBQUFBLElBRVAsY0FBYztBQUFBO0FBQUEsTUFFWixTQUFTLENBQUMsT0FBTyxlQUFlLFFBQVEsUUFBUSxVQUFVLFNBQVM7QUFBQSxNQUNuRSxTQUFTLEVBQUUsU0FBUyxNQUFNLFFBQVEsS0FBSztBQUFBLElBQ3pDLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxRQUNKLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxVQUNKLE9BQU87QUFBQSxZQUNMLGVBQWU7QUFBQSxjQUNiLFVBQVUsQ0FBQyxjQUFjLGVBQWUsV0FBVyxNQUFNO0FBQUEsWUFDM0Q7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLE9BQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxVQUFVLENBQUM7QUFBQSxJQUNiLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxTQUFTLENBQUMsNkJBQTZCO0FBQUEsSUFDekM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
