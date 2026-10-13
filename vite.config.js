import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';

export default defineConfig({
  base: '/kawasan-masjid-public/',
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: 'docs',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'docs/index.html')
      }
    }
  }
});
