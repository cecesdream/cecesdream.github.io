import { Client } from "@notionhq/client";
import { writeFile, mkdir, readdir, unlink } from "node:fs/promises";
import { join, extname } from "node:path";
import dotenv from "dotenv";
import sharp from "sharp";
import { escapeAttr, escapeHTML, isSafeSlug, richTextToHTML } from "./notion-html.ts";

dotenv.config({ path: [".env.local", ".env"] });

const NOTION_API_TOKEN = process.env.NOTION_API_TOKEN;
const NOTION_STORIES_DB_ID = process.env.NOTION_STORIES_DB_ID;

if (!NOTION_API_TOKEN || !NOTION_STORIES_DB_ID) {
  console.error("Missing NOTION_API_TOKEN or NOTION_STORIES_DB_ID. Set them in .env.local or your environment.");
  process.exit(1);
}

const notion = new Client({ auth: NOTION_API_TOKEN });

const POSTS_JSON_PATH = "src/data/posts.json";
const IMAGES_DIR = "public/story-images";

type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  body: string;
};

function plainText(rich: any[]): string {
  return rich.map((r) => r.plain_text).join("");
}

// Phone photos arrive from Notion at full size (a 3072x4080 hero was 2.6 MB).
// Story images never display wider than the screen, and link previews (WhatsApp
// in particular) drop large images, so each one is shrunk on the way in.
const IMAGE_MAX_WIDTH = 1600;
const JPG_QUALITY = 80;

// Returns the file extension the image was written with. Real GIFs are kept as
// they are so animation survives; everything else, SVG included, is redrawn by
// sharp, so no script or markup in the source file reaches cecesdream.org.
// Anything with transparency becomes PNG; the rest is JPEG.
async function optimizeImage(buf: Buffer, ext: string): Promise<{ buf: Buffer; ext: string }> {
  if (ext === ".gif" && buf.subarray(0, 4).toString("latin1") === "GIF8") return { buf, ext };
  const img = sharp(buf, { failOn: "none" });
  const meta = await img.metadata();
  // .rotate() applies the EXIF orientation, which is dropped from the output.
  const resized = img.rotate().resize({ width: IMAGE_MAX_WIDTH, withoutEnlargement: true });
  if (meta.hasAlpha) return { buf: await resized.png({ compressionLevel: 9, palette: true }).toBuffer(), ext: ".png" };
  return { buf: await resized.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toBuffer(), ext: ".jpg" };
}

// Notion-hosted image URLs are presigned S3 links that expire ~1 hour after fetch.
// They MUST be downloaded at build time and served from our own /public dir.
async function downloadImage(url: string, destBasename: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download image: ${res.status} ${url}`);
  const contentType = res.headers.get("content-type") || "";
  let ext = extname(new URL(url).pathname).toLowerCase();
  if (!ext) {
    if (contentType.includes("png")) ext = ".png";
    else if (contentType.includes("webp")) ext = ".webp";
    else if (contentType.includes("gif")) ext = ".gif";
    else ext = ".jpg";
  }
  const optimized = await optimizeImage(Buffer.from(await res.arrayBuffer()), ext);
  const filename = `${destBasename}${optimized.ext}`;
  await writeFile(join(IMAGES_DIR, filename), optimized.buf);
  return `/story-images/${filename}`;
}

function fileUrlFromProperty(prop: any): string | null {
  const files = prop?.files;
  if (!files?.length) return null;
  const f = files[0];
  return f.type === "external" ? f.external.url : f.file.url;
}

function fileUrlFromBlock(block: any): string | null {
  const f = block.image;
  if (!f) return null;
  return f.type === "external" ? f.external.url : f.file.url;
}

async function blocksToHTML(pageId: string, slug: string): Promise<string> {
  const html: string[] = [];
  let imageCounter = 0;
  let cursor: string | undefined;
  let openList: "ul" | "ol" | null = null;

  const closeList = () => {
    if (openList) {
      html.push(`</${openList}>`);
      openList = null;
    }
  };

  do {
    const res = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });

    for (const block of res.results as any[]) {
      const t = block.type;
      if (t === "bulleted_list_item" || t === "numbered_list_item") {
        const wantList = t === "bulleted_list_item" ? "ul" : "ol";
        if (openList !== wantList) {
          closeList();
          html.push(`<${wantList}>`);
          openList = wantList;
        }
        html.push(`<li>${richTextToHTML(block[t].rich_text)}</li>`);
        continue;
      }
      closeList();

      switch (t) {
        case "paragraph": {
          const inner = richTextToHTML(block.paragraph.rich_text);
          if (inner.trim()) html.push(`<p>${inner}</p>`);
          break;
        }
        case "heading_1":
          html.push(`<h2>${richTextToHTML(block.heading_1.rich_text)}</h2>`);
          break;
        case "heading_2":
          html.push(`<h2>${richTextToHTML(block.heading_2.rich_text)}</h2>`);
          break;
        case "heading_3":
          html.push(`<h3>${richTextToHTML(block.heading_3.rich_text)}</h3>`);
          break;
        case "quote":
          html.push(`<blockquote>${richTextToHTML(block.quote.rich_text)}</blockquote>`);
          break;
        case "divider":
          html.push(`<hr />`);
          break;
        case "image": {
          const url = fileUrlFromBlock(block);
          if (url) {
            imageCounter++;
            const localPath = await downloadImage(url, `${slug}-body-${imageCounter}`);
            const caption = plainText(block.image.caption || []);
            html.push(`<img src="${escapeAttr(localPath)}" alt="${escapeAttr(caption)}" />`);
            if (caption) html.push(`<p><em>${escapeHTML(caption)}</em></p>`);
          }
          break;
        }
        default:
          // Unsupported block types are skipped silently — extend this switch as needed.
          break;
      }
    }

    cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
  } while (cursor);

  closeList();
  return html.join("");
}

async function clearOldImages() {
  const files = await readdir(IMAGES_DIR).catch(() => []);
  await Promise.all(files.map((f) => unlink(join(IMAGES_DIR, f))));
}

async function main() {
  await mkdir(IMAGES_DIR, { recursive: true });
  await clearOldImages();

  const db: any = await notion.databases.retrieve({ database_id: NOTION_STORIES_DB_ID! });
  const dataSourceId = db.data_sources?.[0]?.id;
  if (!dataSourceId) {
    throw new Error("No data source found on the Stories database.");
  }

  const dbResults: any[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: { property: "Published", checkbox: { equals: true } },
      sorts: [{ property: "Date", direction: "descending" }],
      start_cursor: cursor,
      page_size: 100,
    });
    dbResults.push(...res.results);
    cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
  } while (cursor);

  const posts: Post[] = [];

  for (const page of dbResults) {
    const props = page.properties;
    const title = plainText(props.Title?.title || []);
    const slug = plainText(props.Slug?.rich_text || []).trim();
    const date = props.Date?.date?.start || "";
    const category = props.Category?.select?.name || "";
    const excerpt = plainText(props.Excerpt?.rich_text || []);
    const heroUrl = fileUrlFromProperty(props["Hero image"]);

    if (!slug) {
      console.warn(`Skipping page "${title}" — missing Slug`);
      continue;
    }
    if (!isSafeSlug(slug)) {
      console.warn(`Skipping page "${title}" — Slug "${slug}" must be lowercase words joined by hyphens`);
      continue;
    }

    const image = heroUrl ? await downloadImage(heroUrl, `${slug}-hero`) : "";
    const body = await blocksToHTML(page.id, slug);

    posts.push({ slug, title, date, category, excerpt, image, body });
    console.log(`✓ Synced "${title}" (${slug})`);
  }

  await writeFile(POSTS_JSON_PATH, JSON.stringify(posts, null, 2) + "\n", "utf8");
  console.log(`\nWrote ${posts.length} stories to ${POSTS_JSON_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
