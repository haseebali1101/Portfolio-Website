import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Production build configuration
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
  },
})

