import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all API requests starting with /api to Laravel backend
      '/api': {
        target: 'http://127.0.0.1:8000', // Laravel backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api') // Remove /api prefix if needed
      }
    }
  }
})
