import fs from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
const base = 'https://rllibo833-sudo.github.io/kawasan-masjid-public/';
const errors = [];
const check = (ok, message) => { if (!ok) errors.push(message); };

const sitemapPath = path.join(dist, 'sitemap.xml');
const robotsPath = path.join(dist, 'robots.txt');
check(fs.existsSync(sitemapPath), 'dist/sitemap.xml is missing');
check(fs.existsSync(robotsPath), 'dist/robots.txt is missing');

if (fs.existsSync(sitemapPath)) {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  check(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'Sitemap XML declaration is missing');
  check(xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), 'Sitemap namespace is missing or invalid');
  check(xml.includes('</urlset>'), 'Sitemap closing tag is missing');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].trim());
  check(urls.length > 0, 'Sitemap contains no URLs');
  check(new Set(urls).size === urls.length, 'Sitemap contains duplicate URLs');
  for (const url of urls) {
    check(url.startsWith(base), 'Sitemap URL is outside the canonical site base: ' + url);
    if (!url.startsWith(base)) continue;
    const relative = url.slice(base.length);
    const target = path.join(dist, relative || 'index.html');
    check(fs.existsSync(target), 'Sitemap URL has no built file: ' + url);
    if (fs.existsSync(target) && target.endsWith('.html')) {
      const html = fs.readFileSync(target, 'utf8');
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
      check(canonical === url, 'Canonical URL differs from sitemap URL: ' + url);
    }
  }
  check(urls.length === 23, 'Expected 23 stable public URLs; found ' + urls.length);
}
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  check(robots.includes('Sitemap: ' + base + 'sitemap.xml'), 'robots.txt sitemap URL is incorrect');
  check(!/^Disallow:\s*\/$/m.test(robots), 'robots.txt blocks the whole site');
}

for (const file of fs.readdirSync(dist).filter(name => name.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(dist, file), 'utf8');
  check(/<title>[^<]+<\/title>/i.test(html), file + ' has no title');
  check(/<meta name="description" content="[^"]+"/i.test(html), file + ' has no meta description');
  check(/<link rel="canonical" href="[^"]+"/i.test(html), file + ' has no canonical URL');
  check(/<meta name="robots" content="[^"]+"/i.test(html), file + ' has no robots metadata');
}
for (const asset of ['images/panduan-periksa-hadis.svg', 'images/panduan-periksa-ayat-quran.svg', 'images/ilustrasi-cek-hoaks-agama.svg', 'images/ilustrasi-cari-sumber-hadis.svg', 'images/ilustrasi-konteks-ayat.svg', 'images/ilustrasi-sumber-belajar.svg', 'images/ilustrasi-tabayyun.svg', 'images/ilustrasi-adab-digital.svg', 'images/ilustrasi-video-potongan.svg', 'images/ilustrasi-keluarga-digital.svg', 'images/ilustrasi-ai-belajar-islam.svg', 'images/ilustrasi-kredibilitas-dakwah.svg']) {
  check(fs.existsSync(path.join(dist, asset)), 'Missing article image: ' + asset);
}
if (errors.length) {
  console.error('SEO validation failed:');
  errors.forEach(error => console.error(' - ' + error));
  process.exit(1);
}
console.log('SEO validation passed: sitemap, canonical URLs, robots.txt, metadata, and article images are consistent.');
