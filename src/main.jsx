import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Capacitor } from '@capacitor/core'
import './index.css'
import App from './App.jsx'
import 'leaflet/dist/leaflet.css'

const prepararServiceWorker = async () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

  if (Capacitor.isNativePlatform()) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations()
      await Promise.all(registrations.map((registration) => registration.unregister()))

      if ('caches' in window) {
        const cacheNames = await window.caches.keys()
        await Promise.all(cacheNames.map((cacheName) => window.caches.delete(cacheName)))
      }

      if (registrations.length > 0 && !window.sessionStorage.getItem('native-sw-cleaned')) {
        window.sessionStorage.setItem('native-sw-cleaned', '1')
        window.location.reload()
      }
    } catch (error) {
      console.warn('Nao foi possivel limpar service workers no app nativo:', error)
    }

    return
  }

  try {
    const { registerSW } = await import('virtual:pwa-register')
    registerSW({ immediate: true })
  } catch (error) {
    console.warn('Nao foi possivel registrar o service worker da PWA:', error)
  }
}

prepararServiceWorker()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
