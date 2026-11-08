import { readFile } from "node:fs/promises";
import path from "node:path";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Paid files: the PRODUCT_FILES_KV namespace on Cloudflare (or an R2 bucket bound
// as PRODUCT_FILES, if one is added later), or private-files/ on disk in
// development. Callers check ownership first; nothing here does.

type R2Object = { body: ReadableStream; size: number };
type ProductBucket = { get(key: string): Promise<R2Object | null> };
type KvStore = {
  getWithMetadata(key: string, opts: { type: "stream" }): Promise<{ value: ReadableStream | null; metadata: { size?: number } | null }>;
};
type Env = { PRODUCT_FILES?: ProductBucket; PRODUCT_FILES_KV?: KvStore };

async function env(): Promise<Env> {
  return getCloudflareContext({ async: true })
    .then(({ env }) => env as Env)
    .catch(() => ({}));
}

const types: Record<string, string> = { pdf: "application/pdf", zip: "application/zip" };

/** A download response for one stored file, streamed (the books are up to ~22 MB). */
export async function fileResponse(key: string, filename: string): Promise<Response> {
  const headers = {
    "Content-Type": types[key.split(".").pop() ?? ""] ?? "application/octet-stream",
    "Content-Disposition": `attachment; filename="${filename.replace(/"/g, "")}"`,
    "Cache-Control": "private, no-store",
    "X-Robots-Tag": "noindex",
  };
  try {
    const { PRODUCT_FILES: r2, PRODUCT_FILES_KV: kv } = await env();
    if (r2) {
      const object = await r2.get(key);
      if (!object) throw new Error(`${key} is not in the bucket`);
      return new Response(object.body, { headers: { ...headers, "Content-Length": String(object.size) } });
    }
    if (kv) {
      const { value, metadata } = await kv.getWithMetadata(key, { type: "stream" });
      if (!value) throw new Error(`${key} is not in the KV namespace`);
      return new Response(value, { headers: metadata?.size ? { ...headers, "Content-Length": String(metadata.size) } : headers });
    }
    if (process.env.NODE_ENV === "production") throw new Error("No file store bound: PRODUCT_FILES_KV (or PRODUCT_FILES) is missing");
    const data = await readFile(path.join(process.cwd(), "private-files", key));
    return new Response(new Uint8Array(data), { headers });
  } catch (err) {
    console.error(`[files] Couldn't serve ${key}`, err);
    return new Response(
      "This file couldn't be loaded just now. Please try again in a few minutes, or reply to your receipt email and we'll send it.",
      { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }
}
