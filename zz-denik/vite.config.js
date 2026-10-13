import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // PWA pre iPhone (Safari → Pridať na plochu): manifest + service
    // worker, ktorý aplikáciu predcachuje, aby fungovala aj offline.
    // V natívnej Capacitor aplikácii sa service worker neregistruje
    // (pozri src/native/pwa.js).
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      includeAssets: ['logo.png', 'apple-touch-icon.png'],
      manifest: {
        id: './',
        name: 'Zapovězené Země - Deník',
        short_name: 'ZZ Deník',
        description: 'Deník postavy pro Forbidden Lands / Zapovězené země',
        lang: 'cs',
        start_url: './',
        scope: './',
        display: 'standalone',
        background_color: '#f7f1e6',
        theme_color: '#fdfaf3',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,woff,woff2,json}'],
        // Hlavný bundle obsahuje celý katalóg a presahuje predvolený 2 MB limit.
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        navigateFallbackDenylist: [/^\/api\//],
      },
    }),
  ],
  base: './',
  server: {
    host: true, // Toto umožní prístup z mobilu cez sieť
    proxy: {
      '/api': 'http://localhost:8787'
    }
  }
})
