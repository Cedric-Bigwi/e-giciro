import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Forwards any request the frontend makes to /api/* straight to the
      // Express backend during local development, so the browser never has
      // to deal with cross-origin requests and VITE_API_URL can be left
      // unset in dev.
      '/api': {
        target: process.env.VITE_BACKEND_URL || 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
