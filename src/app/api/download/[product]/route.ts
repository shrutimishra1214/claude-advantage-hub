import { readFile } from "node:fs/promises";
import path from "node:path";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import { isProductId, products } from "@/lib/products";
import { getSession, readLibraryToken } from "@/lib/session";

type ProductBucket = { get(key: string): Promise<{ arrayBuffer(): Promise<ArrayBuffer> } | null> };

/** A paid file: from the PRODUCT_FILES R2 bucket on Cloudflare, or private-files/ on disk in development. */
async function readProductFile(name: string): Promise<Uint8Array> {
  const bucket = await getCloudflareContext({ async: true })
    .then(({ env }) => (env as { PRODUCT_FILES?: ProductBucket }).PRODUCT_FILES)
    .catch(() => undefined);
  if (bucket) {
    const object = await bucket.get(name);
    if (!object) throw new Error(`${name} is not in the bucket`);
    return new Uint8Array(await object.arrayBuffer());
  }
  return new Uint8Array(await readFile(path.join(process.cwd(), "private-files", name)));
}

export async function GET(req: Request, { params }: { params: Promise<{ product: string }> }) {
  const { product } = await params;
  if (!isProductId(product)) return new NextResponse("Not found", { status: 404 });

  const token = new URL(req.url).searchParams.get("t");
  const owned = readLibraryToken(token)?.owned ?? (await getSession())?.owned ?? [];
  if (!owned.includes(product)) return new NextResponse("This download link is invalid or has expired.", { status: 403 });

  const delivery = products[product].delivery;
  if (delivery.kind !== "file") return new NextResponse("This product is delivered by email.", { status: 404 });

  try {
    const file = await readProductFile(delivery.file);
    return new NextResponse(file, {
      headers: {
        "Content-Type": delivery.file.endsWith(".zip") ? "application/zip" : "application/pdf",
        "Content-Disposition": `attachment; filename="${delivery.filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new NextResponse(
      "This file is being prepared and will be emailed to you shortly. Questions? Reply to your receipt email.",
      { status: 404 },
    );
  }
}
