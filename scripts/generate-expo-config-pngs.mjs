import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const outDir = path.resolve(projectRoot, "expo-assets", "images");

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function toPng(inPath, outPath) {
  await sharp(inPath).png().toFile(outPath);
}

async function main() {
  await ensureDir(outDir);

  await toPng(
    path.resolve(projectRoot, "assets", "images", "favicon.webp"),
    path.resolve(outDir, "favicon.png")
  );

  await toPng(
    path.resolve(projectRoot, "assets", "images", "logo.webp"),
    path.resolve(outDir, "logo.png")
  );
}

await main();
