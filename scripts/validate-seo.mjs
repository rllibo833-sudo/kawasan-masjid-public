import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const docs = path.join(root, 'docs');
const dist = path.join(root, 'dist');
const base = 'https://rllibo833-sudo.github.io/kawasan-masjid-public/';
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const read = (filePath, label) => {
  check(fs.existsSync(filePath), `${label} is missing: ${path.relative(root, filePath)}`);
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
};

// Golden URL contract: changing/removing/adding a public URL must be an
// intentional SEO change with an explicit review, not an accidental build side effect.
const expectedUrls = [
  base,
  base + 'research.html',
  base + 'belajar-islam-digital.html',
  base + 'about.html',
  base + 'cara-memeriksa-hadis-viral.html',
  base + 'cara-memeriksa-ayat-quran-viral.html',
  base + 'privacy-policy.html',
  base + 'artikel.html',
  base + 'cek-hoaks-agama-sebelum-membagikan.html',
  base + 'cara-mencari-sumber-hadis.html',
  base + 'memahami-konteks-ayat-al-quran.html',
  base + 'memilih-sumber-belajar-islam-online.html',
  base + 'tabayyun-di-media-sosial.html',
  base + 'adab-berbeda-pendapat-di-internet.html',
  base + 'memeriksa-video-kajian-potongan.html',
  base + 'literasi-digital-keluarga-muslim.html',
  base + 'menggunakan-ai-untuk-belajar-islam.html',
  base + 'menilai-kredibilitas-konten-dakwah.html'
];

const sourceSitemap = read(path.join(docs, 'sitemap.xml'), 'Published sitemap source');
const mirrorSitemap = read(path.join(docs, 'public', 'sitemap.xml'), 'Sitemap mirror');
const sourceRobots = read(path.join(docs, 'robots.txt'), 'Published robots.txt');
const mirrorRobots = read(path.join(docs, 'public', 'robots.txt'), 'robots.txt mirror');
const googleVerification = read(
  path.join(docs, 'googleb706ba2b50bad689.html'),
  'Google Search Console verification file'
);
const homepageTemplate = read(path.join(root, 'site-index.template.html'), 'Homepage template');
const builtIndexPath = path.join(dist, 'index.html');

check(sourceSitemap === mirrorSitemap, 'docs/sitemap.xml and docs/public/sitemap.xml must be byte-identical');
check(sourceRobots === mirrorRobots, 'docs/robots.txt and docs/public/robots.txt must be byte-identical');
check(
  googleVerification.trim() === 'google-site-verification: googleb706ba2b50bad689.html',
  'Google verification file content changed unexpectedly'
);

if (sourceSitemap) {
  check(
    sourceSitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>'),
    'Sitemap XML declaration is missing'
  );
  check(
    sourceSitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'),
    'Sitemap namespace is missing or invalid'
  );
  check(sourceSitemap.includes('</urlset>'), 'Sitemap closing tag is missing');

  const urls = [...sourceSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].trim());
  check(urls.length === 18, `Expected exactly 18 stable public URLs; found ${urls.length}`);
  check(new Set(urls).size === urls.length, 'Sitemap contains duplicate URLs');
  check(
    JSON.stringify(urls) === JSON.stringify(expectedUrls),
    'The ordered URL list differs from the approved 23-URL contract'
  );

  for (const url of urls) {
    check(url.startsWith(base), 'Sitemap URL is outside the canonical site base: ' + url);
    if (!url.startsWith(base)) continue;
    const relative = url.slice(base.length);
    const target = path.join(dist, relative || 'index.html');
    check(fs.existsSync(target), 'Sitemap URL has no built HTML file: ' + url);
    if (fs.existsSync(target) && target.endsWith('.html')) {
      const html = fs.readFileSync(target, 'utf8');
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
      check(canonical === url, 'Canonical URL differs from sitemap URL: ' + url);
    }
  }
}

if (sourceRobots) {
  check(sourceRobots.includes('User-agent: *'), 'robots.txt is missing the wildcard user-agent rule');
  check(sourceRobots.includes('Allow: /'), 'robots.txt must keep the site crawlable');
  check(sourceRobots.includes('Sitemap: ' + base + 'sitemap.xml'), 'robots.txt sitemap URL is incorrect');
  check(!/^Disallow:\s*\/$/m.test(sourceRobots), 'robots.txt blocks the entire site');
}

const expectedVerificationTokens = [
  'kE8jjIcgQQcnv5XlcsT0nVszTvtOqYqGTYNMaUCb3Zs',
  'DJVj_8KpBEp38LxFoUsSljrm27SfQm2iZI_KieYSVh8'
];
for (const token of expectedVerificationTokens) {
  check(homepageTemplate.includes(token), 'Homepage template lost an existing Google verification token');
}
if (fs.existsSync(builtIndexPath)) {
  const builtIndex = fs.readFileSync(builtIndexPath, 'utf8');
  for (const token of expectedVerificationTokens) {
    check(builtIndex.includes(token), 'Built homepage lost an existing Google verification token');
  }
}

if (fs.existsSync(dist)) {
  for (const file of fs.readdirSync(dist).filter(name => name.endsWith('.html'))) {
    const html = fs.readFileSync(path.join(dist, file), 'utf8');
    check(/<title>[^<]+<\/title>/i.test(html), file + ' has no title');
    check(/<meta name="description" content="[^"]+"/i.test(html), file + ' has no meta description');
    check(/<link rel="canonical" href="[^"]+"/i.test(html), file + ' has no canonical URL');
    check(/<meta name="robots" content="[^"]+"/i.test(html), file + ' has no robots metadata');
  }
} else {
  check(false, 'dist/ is missing; run the production build before SEO validation');
}

const articleImages = [
  'panduan-periksa-hadis.svg',
  'panduan-periksa-ayat-quran.svg',
  'ilustrasi-cek-hoaks-agama.svg',
  'ilustrasi-cari-sumber-hadis.svg',
  'ilustrasi-konteks-ayat.svg',
  'ilustrasi-sumber-belajar.svg',
  'ilustrasi-tabayyun.svg',
  'ilustrasi-adab-digital.svg',
  'ilustrasi-video-potongan.svg',
  'ilustrasi-keluarga-digital.svg',
  'ilustrasi-ai-belajar-islam.svg',
  'ilustrasi-kredibilitas-dakwah.svg'
];
for (const asset of articleImages) {
  check(
    fs.existsSync(path.join(docs, 'public', 'images', asset)),
    'Missing source article image: docs/public/images/' + asset
  );
}

if (errors.length) {
  console.error('SEO validation failed:');
  for (const error of errors) console.error(' - ' + error);
  process.exit(1);
}
console.log('SEO validation passed: exact 23-URL contract, sitemap mirrors, robots.txt, canonical URLs, metadata, Google verification, and source article images.');
