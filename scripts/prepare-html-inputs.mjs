import fs from 'node:fs';
import path from 'node:path';

const docsDir = path.join(process.cwd(), 'docs');
const excluded = new Set(['googleb706ba2b50bad689.html']);
const htmlFiles = fs.readdirSync(docsDir)
  .filter(name => name.endsWith('.html') && !excluded.has(name));

for (const name of htmlFiles) {
  const fullPath = path.join(docsDir, name);
  let html = fs.readFileSync(fullPath, 'utf8');

  // docs/ contains previously compiled pages. Remove only Vite's generated
  // hashed bundle tags; preserve page-specific SEO and Google verification.
  html = html.replace(
    /\s*<script\b[^>]*\bsrc=["'][^"']*\/assets\/main-[^"']+\.js["'][^>]*>\s*<\/script>/gi,
    ''
  );
  html = html.replace(
    /\s*<link\b[^>]*\bhref=["'][^"']*\/assets\/main-[^"']+\.css["'][^>]*\/?\s*>/gi,
    ''
  );

  if (!html.includes('id="root"')) {
    html = html.replace('</body>', '<div id="root"></div>\n</body>');
  }

  if (!html.includes('src="./src/main.jsx"')) {
    html = html.replace('</body>', '<script type="module" src="./src/main.jsx"></script>\n</body>');
  }

  fs.writeFileSync(fullPath, html);
}

console.log(`Prepared ${htmlFiles.length} HTML inputs: removed stale Vite bundles and restored source entrypoints without rewriting page metadata.`);
