import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Use root '/' for local dev to prevent MIME errors, use '/business-brain/' for GitHub Pages build
  base: command === 'serve' ? '/' : '/business-brain/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
