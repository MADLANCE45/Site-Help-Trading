import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Inietta i moduli che servono a Solana e Web3
      include: ['crypto', 'stream', 'buffer'],
    }),
  ],
  define: {
    // Risolve un altro errore classico di Solana ("global is not defined")
    global: 'window',
  }
})