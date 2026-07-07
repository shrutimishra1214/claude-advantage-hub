import { access, mkdir, rename } from "node:fs/promises";
import path from "node:path";

const clientDir = path.resolve("dist/client");
const nestedDir = path.join(clientDir, "the-claude-advantage");

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Vite emits files under dist/client/assets, but with base "/the-claude-advantage/"
// the Worker must serve them at /the-claude-advantage/assets/*.
if (!(await exists(path.join(clientDir, "assets")))) {
  console.log("nest-client-assets: no dist/client/assets — skipping");
  process.exit(0);
}

await mkdir(nestedDir, { recursive: true });
await rename(path.join(clientDir, "assets"), path.join(nestedDir, "assets"));
console.log("nest-client-assets: moved assets -> the-claude-advantage/assets");
