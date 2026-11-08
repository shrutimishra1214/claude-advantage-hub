import { ownedOnThisDevice } from "@/lib/member";
import { isProductId, products } from "@/lib/products";
import { readLibraryToken } from "@/lib/session";
import { fileResponse } from "@/lib/stored-files";

// A book (a product delivered as one file). Allowed when the library link (?t=)
// or this device's signed cookies show the buyer owns it.
export async function GET(req: Request, { params }: { params: Promise<{ product: string }> }) {
  const { product } = await params;
  if (!isProductId(product)) return new Response("Not found", { status: 404 });

  const grant = readLibraryToken(new URL(req.url).searchParams.get("t"));
  const owned = grant?.owned ?? (await ownedOnThisDevice())?.owned ?? [];
  if (!owned.includes(product)) return new Response("This download link is invalid or has expired.", { status: 403 });

  const delivery = products[product].delivery;
  if (delivery.kind !== "file") return new Response("This product is opened from your member area.", { status: 404 });
  return fileResponse(delivery.file, delivery.filename);
}
