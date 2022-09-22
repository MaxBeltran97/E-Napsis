import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@hooks' : path.resolve(__dirname, './src/hooks')
    }
  },
  plugins: [react()]
})
