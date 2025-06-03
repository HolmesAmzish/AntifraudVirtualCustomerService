import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, 'src/home/index.html'),
        chat: path.resolve(__dirname, 'src/chat/index.html')
      }
    }
  },
  server: {
    port: 3000,
    open: '/home/index.html'  // 启动 dev server 默认打开 home 页
  }
})
