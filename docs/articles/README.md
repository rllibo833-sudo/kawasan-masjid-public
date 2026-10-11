# Perpustakaan Artikel

> **Kumpulan editorial:** artikel publik Kawasan Masjid disimpan dan dikelola di sini dalam Markdown dengan metadata tags agar mudah dicari, direview, dan dikembangkan tanpa menambah file acak di root repository.

- **Sumber konten yang dipakai situs:** [src/articles.js](../../src/articles.js)
- **Indeks artikel di situs:** [artikel.html](../../artikel.html)
- **Gambar artikel:** [public/images](../../public/images/)
- **Aturan editorial:** panduan edukatif, bukan fatwa. Artikel belum melalui tinjauan independen ahli agama; periksa rujukan primer dan kirim koreksi bila menemukan kekeliruan.
- **Visi:** Kawasan Masjid 1.000 Ha tetap merupakan visi jangka panjang, bukan klaim bahwa pembangunan fisik sudah terwujud.

## Daftar artikel dan tags

| Artikel | Tags | Halaman publik |
|---|---|---|
| [Cara Memeriksa Hoaks Agama Sebelum Membagikannya](cek-hoaks-agama-sebelum-membagikan.md) | `tabayyun`, `hoaks`, `literasi-digital` | [Baca](https://rllibo833-sudo.github.io/kawasan-masjid-public/cek-hoaks-agama-sebelum-membagikan.html) |
| [Cara Mencari Sumber Asli Hadis di Internet](cara-mencari-sumber-hadis.md) | `hadis`, `rujukan`, `riset-islam` | [Baca](https://rllibo833-sudo.github.io/kawasan-masjid-public/cara-mencari-sumber-hadis.html) |
| [Cara Memahami Konteks Ayat Al-Qur'an Sebelum Mengutipnya](memahami-konteks-ayat-al-quran.md) | `alquran`, `tafsir`, `rujukan` | [Baca](https://rllibo833-sudo.github.io/kawasan-masjid-public/memahami-konteks-ayat-al-quran.html) |
| [Cara Memilih Sumber Belajar Islam yang Tepercaya di Internet](memilih-sumber-belajar-islam-online.md) | `belajar-islam`, `literasi-digital`, `kredibilitas` | [Baca](https://rllibo833-sudo.github.io/kawasan-masjid-public/memilih-sumber-belajar-islam-online.html) |
| [Tabayyun di Media Sosial](tabayyun-di-media-sosial.md) | `tabayyun`, `akhlak-digital`, `media-sosial` | [Baca](https://rllibo833-sudo.github.io/kawasan-masjid-public/tabayyun-di-media-sosial.html) |
| [Adab Berbeda Pendapat di Internet](adab-berbeda-pendapat-di-internet.md) | `adab`, `diskusi`, `akhlak-digital` | [Baca](https://rllibo833-sudo.github.io/kawasan-masjid-public/adab-berbeda-pendapat-di-internet.html) |
| [Cara Memeriksa Video Kajian yang Dipotong atau Viral](memeriksa-video-kajian-potongan.md) | `video`, `verifikasi`, `konteks` | [Baca](https://rllibo833-sudo.github.io/kawasan-masjid-public/memeriksa-video-kajian-potongan.html) |
| [Literasi Digital Keluarga Muslim](literasi-digital-keluarga-muslim.md) | `keluarga`, `privasi`, `literasi-digital` | [Baca](https://rllibo833-sudo.github.io/kawasan-masjid-public/literasi-digital-keluarga-muslim.html) |
| [Menggunakan AI untuk Belajar Islam](menggunakan-ai-untuk-belajar-islam.md) | `ai`, `verifikasi`, `belajar-islam` | [Baca](https://rllibo833-sudo.github.io/kawasan-masjid-public/menggunakan-ai-untuk-belajar-islam.html) |
| [Cara Menilai Kredibilitas Konten Dakwah di Media Sosial](menilai-kredibilitas-konten-dakwah.md) | `dakwah`, `kredibilitas`, `media-sosial` | [Baca](https://rllibo833-sudo.github.io/kawasan-masjid-public/menilai-kredibilitas-konten-dakwah.html) |

## Konvensi pengelolaan

1. Satu artikel Markdown per file di folder ini; jangan menaruh artikel di root repository.
2. Setiap artikel memakai YAML frontmatter: `title`, `slug`, `tags`, `status`, dan `public_url`.
3. Data yang dirender website tetap dikelola di `src/articles.js`. Saat mengubah artikel, sinkronkan kedua versi dalam pull request yang sama.
4. Pertahankan URL publik yang sudah ada. Jangan mengubah slug atau memindahkan halaman tanpa alasan teknis dan rencana redirect.
5. Setiap artikel harus memiliki sumber yang dapat ditelusuri, bahasa yang tidak menghakimi, serta catatan batas pengetahuan.
6. Tags memakai huruf kecil dan tanda hubung; gunakan istilah yang sudah ada bila sesuai, bukan membuat variasi baru tanpa kebutuhan.

### Tag yang disarankan

`alquran`, `hadis`, `tafsir`, `tabayyun`, `hoaks`, `rujukan`, `riset-islam`, `belajar-islam`, `literasi-digital`, `akhlak-digital`, `media-sosial`, `kredibilitas`, `verifikasi`, `video`, `keluarga`, `privasi`, `ai`, `dakwah`, `diskusi`.

### Sumber konten kanonis

Untuk menghindari dua sumber konten situs yang berbeda, komponen artikel yang tampil di website tetap berasal dari `src/articles.js`. File Markdown di folder ini adalah salinan editorial untuk review, arsip, pencarian, dan kolaborasi. Perubahan substansi wajib diselaraskan di kedua tempat.
