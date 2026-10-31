import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isProductId, products } from "@/lib/products";
import { getSession, readLibraryToken } from "@/lib/session";

export async function GET(req: Request, { params }: { params: Promise<{ product: string }> }) {
  const { product } = await params;
  if (!isProductId(product)) return new NextResponse("Not found", { status: 404 });

  const token = new URL(req.url).searchParams.get("t");
  const owned = readLibraryToken(token)?.owned ?? (await getSession())?.owned ?? [];
  if (!owned.includes(product)) return new NextResponse("This download link is invalid or has expired.", { status: 403 });

  const delivery = products[product].delivery;
  if (delivery.kind !== "file") return new NextResponse("This product is delivered by email.", { status: 404 });

  try {
    const file = await readFile(path.join(process.cwd(), "private-files", delivery.file));
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": "application/pdf",
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
