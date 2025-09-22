import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'

export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/static': resolve(__dirname, 'src/static'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/pages': resolve(__dirname, 'src/pages'),
      '@/utils': resolve(__dirname, 'src/utils'),
      '@/api': resolve(__dirname, 'src/api'),
      '@/store': resolve(__dirname, 'src/store'),
      '@/shared': resolve(__dirname, 'src/shared'),
    }
  },
  define: {
    ROUTES: JSON.stringify([])
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
})