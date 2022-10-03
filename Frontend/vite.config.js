import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@models': path.resolve(__dirname, './src/models'),
      '@components': path.resolve(__dirname, './src/pages/enapsis/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@reduxSlices': path.resolve(__dirname, './src/redux/slices'),
    }
  },
  plugins: [react()]
})
