import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Dashboard UI',
        short_name: 'Dashboard',
        description: 'Modern React Dashboard with TypeScript',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'charts-vendor': ['recharts'],
          'icons-vendor': ['@heroicons/react'],
          'i18n-vendor': ['react-i18next', 'i18next', 'i18next-browser-languagedetector'],
          'utils-vendor': ['date-fns', 'clsx'],
          
          // Feature chunks
          'analytics': [
            './src/pages/Analytics',
          ],
          'sales': [
            './src/pages/Sales',
          ],
          'customers': [
            './src/pages/Customers',
          ],
          'inventory': [
            './src/pages/Inventory',
          ],
          'support': [
            './src/pages/Support',
          ],
          'returns': [
            './src/pages/Returns',
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
