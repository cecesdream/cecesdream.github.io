/**
 * Runs after `vite build`. GitHub Pages serves static files only, so without
 * this every address gets the home page's <head>: a link preview for a story
 * shows the site's title, and a direct load of /about is answered by 404.html
 * with a 404 status. For each page this writes `<path>.html` and
 * `<path>/index.html` (GitHub Pages resolves an extensionless address to one
 * or the other) with that page's title, description, preview image and
 * canonical URL. The body stays the app shell; React renders it as before.
 * Also writes 404.html (noindex), sitemap.xml and robots.txt.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { allPaths, metaFor, NOT_FOUND_META, SITE_URL, type PageMeta } from "../src/seo/pageMeta";

const DIST = "dist";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// The tags this script owns. index.html keeps copies so the dev server has them.
const MANAGED = [
  /\s*<title>[\s\S]*?<\/title>/g,
  /\s*<meta name="description"[^>]*>/g,
  /\s*<meta (?:property|name)="(?:og|twitter):[^"]*"[^>]*>/g,
  /\s*<link rel="canonical"[^>]*>/g,
  /\s*<!-- (?:Open Graph \/ Facebook|Twitter) -->/g,
];

function head(meta: PageMeta, path: string | null): string {
  const url = path === null ? null : SITE_URL + path;
  const image = SITE_URL + meta.image;
  const tags = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    url ? `<link rel="canonical" href="${url}" />` : `<meta name="robots" content="noindex" />`,
    `<meta property="og:type" content="${path?.startsWith("/blog/") ? "article" : "website"}" />`,
    `<meta property="og:site_name" content="CECE's Dream" />`,
    url ? `<meta property="og:url" content="${url}" />` : "",
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(meta.title)}" />`,
    `<meta name="twitter:description" content="${escape(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ];
  return tags.filter(Boolean).map((t) => `    ${t}`).join("\n");
}

function render(shell: string, meta: PageMeta, path: string | null): string {
  let html = shell;
  for (const re of MANAGED) html = html.replace(re, "");
  return html.replace(/(<meta name="viewport"[^>]*>)/, `$1\n${head(meta, path)}`);
}

async function write(file: string, content: string) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content);
}

const shell = await readFile(join(DIST, "index.html"), "utf8");
const paths = allPaths();

for (const path of paths) {
  const html = render(shell, metaFor(path)!, path);
  if (path === "/") {
    await write(join(DIST, "index.html"), html);
  } else {
    await write(join(DIST, `${path.slice(1)}.html`), html);
    await write(join(DIST, path.slice(1), "index.html"), html);
  }
}
await write(join(DIST, "404.html"), render(shell, NOT_FOUND_META, null));

await write(
  join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    paths.map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join("\n") +
    `\n</urlset>\n`,
);
await write(join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`prerender: ${paths.length} pages, 404.html, sitemap.xml, robots.txt`);
