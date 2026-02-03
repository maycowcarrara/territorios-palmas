import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ command }) => {
  // Define a base: no PC (serve) é "/", no GitHub (build) é a subpasta
  const base = command === 'build' ? '/territorios-palmas/' : '/';

  return {
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
          start_url: base, // Segue a base dinâmica
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
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          // Ignora os workers do OneSignal para não dar conflito com o cache do PWA
          globIgnores: ['**/OneSignalSDKWorker.js', '**/OneSignalSDK.sw.js'],

          runtimeCaching: [
            {
              urlPattern: ({ url }) => url.pathname.includes('version.json'),
              handler: 'NetworkOnly',
            }
          ]
        }
      })
    ],
    base: base, // Aplica a base dinâmica aqui
  }
})