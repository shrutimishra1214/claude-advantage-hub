// Uploads the paid files in private-files/ to the PRODUCT_FILES_KV namespace, each under
// its path (the key src/lib/files.ts and src/lib/products.ts use), with its size as metadata.
// Calls Cloudflare's API directly, with wrangler's sign-in, because `wrangler kv key put`
// gives up after five minutes on a large file over a slow connection.
//
//   npx wrangler login                       (once)
//   node scripts/upload-files.mjs            (everything; safe to re-run)
//   node scripts/upload-files.mjs Vault.pdf  (only files whose path ends with this)
//
// KV holds up to 25 MiB per file.
import { join, relative } from "node:path";
import { homedir } from "node:os";
const root = new URL("../private-files", import.meta.url).pathname;
const account = "9936addeb790ec1ae8e1e96632d5342f";
const ns = "5a08ab957e784b5bb033f7ffe3fc8d57"; // PRODUCT_FILES_KV in wrangler.jsonc
const only = process.argv[2];
const cfg = readFileSync([join(homedir(), "Library/Preferences/.wrangler/config/default.toml"), join(homedir(), ".config/.wrangler/config/default.toml")].find((f) => { try { return statSync(f).isFile(); } catch { return false; } }) ?? "", "utf8");
const token = cfg.match(/oauth_token\s*=\s*"([^"]+)"/)?.[1];
if (!token) throw new Error("No wrangler OAuth token found");
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(root).filter((p) => !p.endsWith("README.md") && !p.split("/").pop().startsWith(".")).filter((p) => !only || p.endsWith(only)).sort();
let failed = 0;
for (const p of files) {
  const key = relative(root, p), size = statSync(p).size, t = Date.now();
  const form = new FormData();
  form.append("value", new Blob([readFileSync(p)]));
  form.append("metadata", JSON.stringify({ size }));
  try {
    const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/storage/kv/namespaces/${ns}/values/${encodeURIComponent(key)}`, {
      method: "PUT", headers: { Authorization: `Bearer ${token}` }, body: form, signal: AbortSignal.timeout(30 * 60 * 1000),
    });
    const body = await res.json();
    if (!res.ok || !body.success) throw new Error(`${res.status} ${JSON.stringify(body.errors)}`);
    console.log(`✓ ${key} (${(size / 1e6).toFixed(2)} MB, ${((Date.now() - t) / 1000).toFixed(0)}s)`);
  } catch (e) { failed++; console.log(`✘ ${key}: ${e.message}`); }
}
console.log(failed ? `${failed} failed` : `All ${files.length} uploaded`);
