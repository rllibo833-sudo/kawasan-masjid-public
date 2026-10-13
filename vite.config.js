import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {readdirSync} from 'node:fs';
import {resolve} from 'node:path';

const docsDir = resolve(__dirname, 'docs');
const htmlInputs = Object.fromEntries(
  readdirSync(docsDir)
    .filter((file) => file.endsWith('.html') && file !== 'googleb706ba2b50bad689.html')
    .map((file) => [file.replace(/\.html$/, ''), resolve(docsDir, file)])
);

export default defineConfig({
  root: docsDir,
  base: '/kawasan-masjid-public/',
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: { input: htmlInputs }
  }
});
