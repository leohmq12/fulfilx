import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const targets = ["app", "components", "app.json", "global.css", "README.md"].map((p) =>
  path.resolve(projectRoot, p)
);

const allowedExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".json", ".md", ".html"]);

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
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

async function replaceInFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!allowedExtensions.has(ext)) return { changed: false };

  const original = await fs.readFile(filePath, "utf8");
  const updated = original.split(".png").join(".webp");
  if (updated === original) return { changed: false };

  await fs.writeFile(filePath, updated, "utf8");
  return { changed: true };
}

async function main() {
  let changedFiles = 0;
  for (const target of targets) {
    if (!(await exists(target))) continue;
    const stat = await fs.stat(target);
    if (stat.isDirectory()) {
      const files = await listFilesRecursively(target);
      for (const file of files) {
        const res = await replaceInFile(file);
        if (res.changed) changedFiles += 1;
      }
    } else if (stat.isFile()) {
      const res = await replaceInFile(target);
      if (res.changed) changedFiles += 1;
    }
  }

  console.log(`Updated PNG references in ${changedFiles} files.`);
}

await main();
