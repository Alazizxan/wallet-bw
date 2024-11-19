import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Tarmoqda mavjud bo'lishi uchun
    port: 3000, // Portni belgilash (masalan, 3000)
  },
})
