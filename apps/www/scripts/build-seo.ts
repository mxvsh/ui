import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL } from '../src/lib/site';

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, '..');
const contentDir = resolve(appRoot, 'content/docs');
const publicDir = resolve(appRoot, 'public');

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return walk(full);
      if (entry.isFile() && /\.mdx?$/.test(entry.name)) return [full];
      return [];
    }),
  );
  return files.flat();
}

function fileToUrl(file: string): string {
  const rel = relative(contentDir, file).replace(/\\/g, '/');
  const withoutExt = rel.replace(/\.mdx?$/, '');
  const noIndex = withoutExt.replace(/\/?index$/, '');
  const path = `/docs/${noIndex}`.replace(/\/$/, '') || '/docs';
  return path.replace(/^\/docs\/components\//, '/components/');
}

async function buildSitemap() {
  const now = new Date().toISOString();

  const staticPaths: Array<{ path: string; priority: string }> = [
    { path: '/', priority: '1.0' },
    { path: '/components', priority: '0.8' },
  ];

  const files = await walk(contentDir);
  const pagePaths = files.map((file) => ({
    path: fileToUrl(file),
    priority: '0.7',
  }));

  const seen = new Set<string>();
  const urls = [...staticPaths, ...pagePaths].filter((u) => {
    if (seen.has(u.path)) return false;
    seen.add(u.path);
    return true;
  });

  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .map(
        (u) =>
          `  <url>\n` +
          `    <loc>${SITE_URL}${u.path}</loc>\n` +
          `    <lastmod>${now}</lastmod>\n` +
          `    <changefreq>weekly</changefreq>\n` +
          `    <priority>${u.priority}</priority>\n` +
          `  </url>`,
      )
      .join('\n') +
    '\n</urlset>\n';

  await writeFile(resolve(publicDir, 'sitemap.xml'), body, 'utf8');
  return urls.length;
}

async function buildRobots() {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');

  await writeFile(resolve(publicDir, 'robots.txt'), body, 'utf8');
}

async function main() {
  await mkdir(publicDir, { recursive: true });
  const count = await buildSitemap();
  await buildRobots();
  console.log(`[seo] wrote public/sitemap.xml (${count} urls) and public/robots.txt`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
