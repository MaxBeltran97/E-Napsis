import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@models': path.resolve(__dirname, './src/models'),
      '@components': path.resolve(__dirname, './src/pages/enapsis/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@reduxSlices': path.resolve(__dirname, './src/redux/slices'),
    }
  },
  plugins: [react()]
})
