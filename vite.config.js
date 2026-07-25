import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import process from 'node:process'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const appTitle = env.VITE_APP_TITLE || 'Territórios';
  const appShortName = env.VITE_APP_SHORT_NAME || 'Territórios';
  const appDescription = env.VITE_APP_DESCRIPTION || 'Gestão de Territórios de Pregação';
  const appIcon192 = env.VITE_APP_ICON_192 || '/icon-192.png';
  const appIcon512 = env.VITE_APP_ICON_512 || '/icon-512.png';

  return {
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('leaflet') || id.includes('react-leaflet')) {
            return 'map-vendor';
          }

          if (id.includes('firebase')) {
            return 'firebase-vendor';
          }

          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
            return 'react-vendor';
          }
        }
      }
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: null,
      manifest: {
        name: appTitle,
        short_name: appShortName,
        description: appDescription,
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: appIcon192.replace(/^\//, ''), sizes: '192x192', type: 'image/png' },
          { src: appIcon512.replace(/^\//, ''), sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.includes('version.json'),
            handler: 'NetworkOnly',
          }
        ]
      }
    })
  ]
  };
})
