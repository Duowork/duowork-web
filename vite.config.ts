import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { staticToolRoutes } from './scripts/static-tool-routes.ts'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), staticToolRoutes()],
})
