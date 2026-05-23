import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',  // Changed from '/Portfolio-/' to '/'
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
