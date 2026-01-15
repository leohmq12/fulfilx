import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();

function parseArgs(argv) {
  const deleteOriginals = argv.includes("--delete-originals");
  const roots = argv.filter((arg) => !arg.startsWith("--"));

  return {
    deleteOriginals,
    roots:
      roots.length > 0
        ? roots.map((p) => path.resolve(projectRoot, p))
        : [path.resolve(projectRoot, "assets"), path.resolve(projectRoot, "public")],
  };
}

async function listFilesRecursively(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFilesRecursively(fullPath)));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function isPng(filePath) {
  return filePath.toLowerCase().endsWith(".png");
}

function toWebpPath(pngPath) {
  return pngPath.slice(0, -4) + ".webp";
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function convertOne(pngPath, deleteOriginals) {
  const webpPath = toWebpPath(pngPath);
  await sharp(pngPath).webp({ quality: 85, effort: 6 }).toFile(webpPath);

  const outExists = await fileExists(webpPath);
  if (!outExists) {
    throw new Error(`WebP output missing: ${webpPath}`);
  }

  if (deleteOriginals) {
    await fs.unlink(pngPath);
  }
}

async function main() {
  const { deleteOriginals, roots } = parseArgs(process.argv.slice(2));

  const pngFiles = [];
  for (const root of roots) {
    const stat = await fs.stat(root).catch(() => null);
    if (!stat?.isDirectory()) continue;
    const files = await listFilesRecursively(root);
    pngFiles.push(...files.filter(isPng));
  }

  if (pngFiles.length === 0) {
    console.log("No PNG files found.");
    return;
  }

  let converted = 0;
  const failures = [];

  for (const pngPath of pngFiles) {
    try {
      await convertOne(pngPath, deleteOriginals);
      converted += 1;
    } catch (err) {
      failures.push({ pngPath, message: err instanceof Error ? err.message : String(err) });
    }
  }

  console.log(`Converted ${converted}/${pngFiles.length} PNG files to WebP.`);

  if (failures.length > 0) {
    for (const f of failures) {
      console.error(`${f.pngPath}: ${f.message}`);
    }
    process.exitCode = 1;
  }
}

await main();
