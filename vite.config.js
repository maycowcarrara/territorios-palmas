import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // No Firebase, a base é sempre a raiz '/'
  base: '/',

  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],

      manifest: {
        name: 'Territórios Palmas',
        short_name: 'Territórios',
        description: 'Gestão de Territórios de Pregação',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/', // Ajustado para a raiz
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },

      workbox: {
        // Faz o cache dos arquivos essenciais para o PWA funcionar offline
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],

        runtimeCaching: [
          {
            // Mantemos a regra do version.json para o sistema de auto-update
            urlPattern: ({ url }) => url.pathname.includes('version.json'),
            handler: 'NetworkOnly',
          }
        ]
      }
    })
  ]
})