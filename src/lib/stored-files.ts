import { readFile } from "node:fs/promises";
import path from "node:path";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Paid files: the PRODUCT_FILES R2 bucket on Cloudflare, or private-files/ on disk
// in development. Callers check ownership first; nothing here does.

type R2Object = { body: ReadableStream; size: number };
type ProductBucket = { get(key: string): Promise<R2Object | null> };

async function bucket(): Promise<ProductBucket | undefined> {
  return getCloudflareContext({ async: true })
    .then(({ env }) => (env as { PRODUCT_FILES?: ProductBucket }).PRODUCT_FILES)
    .catch(() => undefined);
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
    const b = await bucket();
    if (b) {
      const object = await b.get(key);
      if (!object) throw new Error(`${key} is not in the bucket`);
      return new Response(object.body, { headers: { ...headers, "Content-Length": String(object.size) } });
    }
    if (process.env.NODE_ENV === "production") throw new Error("PRODUCT_FILES (R2) is not bound");
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
