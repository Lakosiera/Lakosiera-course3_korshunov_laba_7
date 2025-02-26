import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      proxy: {
        "/api": {
          target: `http://${env.BACKEND_URL}`,
          changeOrigin: true,
          secure: false,
          rewriteWsOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  })
}
