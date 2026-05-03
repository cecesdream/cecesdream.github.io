import sharp from "sharp";
import { readdir, stat, writeFile, readFile } from "node:fs/promises";
import { join, extname } from "node:path";

const ASSETS_DIR = "src/assets";

// Headshots display at ~150px (300px retina); 600px max gives 4x for safety.
// Hero/section images can take up the full viewport width on desktop; cap at 1920px.
const BOARD_NAMES = ["sandra", "ashley", "jared", "michael", "jenny", "peter", "tera", "davidheadshot"];
const HEADSHOT_MAX = 600;
const HERO_MAX = 1920;
const JPG_QUALITY = 82;

function isHeadshot(filename: string): boolean {
  const lower = filename.toLowerCase();
  return BOARD_NAMES.some((n) => lower.includes(n));
}

function fmt(bytes: number): string {
  if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + " MB";
  if (bytes >= 1024) return (bytes / 1024).toFixed(0) + " KB";
  return bytes + " B";
}

async function optimizeOne(filename: string) {
  const path = join(ASSETS_DIR, filename);
  const ext = extname(filename).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return null;

  const before = (await stat(path)).size;
  const buf = await readFile(path);
  const img = sharp(buf, { failOn: "none" });
  const meta = await img.metadata();

  const target = isHeadshot(filename) ? HEADSHOT_MAX : HERO_MAX;
  const longest = Math.max(meta.width || 0, meta.height || 0);
  const needsResize = longest > target;

  let pipeline = sharp(buf, { failOn: "none" });
  if (needsResize) {
    pipeline = pipeline.resize({ width: target, height: target, fit: "inside", withoutEnlargement: true });
  }

  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true });
  } else {
    pipeline = pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true });
  }

  const out = await pipeline.toBuffer();
  if (out.length >= before) {
    return { filename, before, after: before, skipped: true };
  }
  await writeFile(path, out);
  return { filename, before, after: out.length, skipped: false };
}

async function main() {
  const files = await readdir(ASSETS_DIR);
  const results: Array<Awaited<ReturnType<typeof optimizeOne>>> = [];
  for (const f of files) {
    const r = await optimizeOne(f);
    if (r) results.push(r);
  }

  const sorted = results.filter(Boolean).sort((a, b) => (b!.before - b!.after) - (a!.before - a!.after));
  let totalBefore = 0;
  let totalAfter = 0;
  console.log("\n  File                                 Before        After         Saved");
  console.log("  " + "-".repeat(78));
  for (const r of sorted) {
    if (!r) continue;
    totalBefore += r.before;
    totalAfter += r.after;
    const saved = r.before - r.after;
    const pct = r.before > 0 ? Math.round((saved / r.before) * 100) : 0;
    const tag = r.skipped ? "(unchanged)" : `${fmt(saved)} (-${pct}%)`;
    console.log(`  ${r.filename.padEnd(36)} ${fmt(r.before).padStart(10)}    ${fmt(r.after).padStart(10)}    ${tag}`);
  }
  console.log("  " + "-".repeat(78));
  const totalSaved = totalBefore - totalAfter;
  const totalPct = totalBefore > 0 ? Math.round((totalSaved / totalBefore) * 100) : 0;
  console.log(`  TOTAL                                ${fmt(totalBefore).padStart(10)}    ${fmt(totalAfter).padStart(10)}    ${fmt(totalSaved)} (-${totalPct}%)\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
