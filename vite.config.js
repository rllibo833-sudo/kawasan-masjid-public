import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';
export default defineConfig({
  base:'/kawasan-masjid-public/',
  plugins:[react()],
  build:{rollupOptions:{input:{
    main:resolve(__dirname,'index.html'),
    digitalIslam:resolve(__dirname,'belajar-islam-digital.html'),
    hadisViral:resolve(__dirname,'cara-memeriksa-hadis-viral.html'),
    quranViral:resolve(__dirname,'cara-memeriksa-ayat-quran-viral.html'),
    articleHub:resolve(__dirname,'artikel.html'),
    article1:resolve(__dirname,'cek-hoaks-agama-sebelum-membagikan.html'),
    article2:resolve(__dirname,'cara-mencari-sumber-hadis.html'),
    article3:resolve(__dirname,'memahami-konteks-ayat-al-quran.html'),
    article4:resolve(__dirname,'memilih-sumber-belajar-islam-online.html'),
    article5:resolve(__dirname,'tabayyun-di-media-sosial.html'),
    article6:resolve(__dirname,'adab-berbeda-pendapat-di-internet.html'),
    article7:resolve(__dirname,'memeriksa-video-kajian-potongan.html'),
    article8:resolve(__dirname,'literasi-digital-keluarga-muslim.html'),
    article9:resolve(__dirname,'menggunakan-ai-untuk-belajar-islam.html'),
    article10:resolve(__dirname,'menilai-kredibilitas-konten-dakwah.html'),
    vision:resolve(__dirname,'vision.html'),
    ecosystem:resolve(__dirname,'ecosystem.html'),
    system:resolve(__dirname,'system.html'),
    research:resolve(__dirname,'research.html'),
    collaborate:resolve(__dirname,'collaborate.html'),
    about:resolve(__dirname,'about.html'),
    privacy:resolve(__dirname,'privacy-policy.html'),
    support:resolve(__dirname,'support.html')
  }}}
});
