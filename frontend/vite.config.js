import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // github pages cerca le risorse su /nome-repo/ , non dalla root/
  base: '/Social-events/',
})
