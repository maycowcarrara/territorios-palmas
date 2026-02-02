import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// SUBSTITUA 'nome-do-seu-repo' PELO NOME QUE VOCÊ CRIOU NO GITHUB
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Inclui seus ícones e arquivos estáticos no cache offline
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],

      // Configurações do manifesto (substitui o arquivo manual public/manifest.json)
      manifest: {
        name: 'Territórios Palmas',
        short_name: 'Territórios',
        description: 'Gestão de Territórios de Pregação',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '.',
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

      // A MÁGICA DO CACHE AQUI:
      workbox: {
        // Faz cache de todos os arquivos estáticos gerados
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],

        // Define regras específicas de cache
        runtimeCaching: [
          {
            // IMPORTANTE: Obriga o navegador a buscar o version.json na rede (NetworkOnly)
            // Isso impede que o arquivo de versão fique preso no cache antigo
            urlPattern: ({ url }) => url.pathname.includes('version.json'),
            handler: 'NetworkOnly',
          }
        ]
      }
    })
  ],
  base: '/territorios-palmas/',
})