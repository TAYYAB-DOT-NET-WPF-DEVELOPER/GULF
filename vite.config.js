import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'



export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": { target: "https://api.gulfalolaya.com", changeOrigin: true },
      "/storage": { target: "https://api.gulfalolaya.com", changeOrigin: true },
      "/sitemap.xml": { target: "https://api.gulfalolaya.com", changeOrigin: true },
      "/robots.txt": { target: "https://api.gulfalolaya.com", changeOrigin: true },
    },
  },
});
