import { fileById } from "@/lib/files";
import { ownedOnThisDevice } from "@/lib/member";
import { readLibraryToken } from "@/lib/session";
import { fileResponse } from "@/lib/stored-files";

// One file from a buyer's library. Allowed when the library link (?t=) or this
// device's signed cookies show the buyer owns the product the file belongs to.
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const file = fileById((await params).id);
  if (!file) return new Response("Not found", { status: 404 });

  const grant = readLibraryToken(new URL(req.url).searchParams.get("t"));
  const owned = grant?.owned ?? (await ownedOnThisDevice())?.owned ?? [];
  if (!owned.includes(file.product)) {
    return new Response("This download is for buyers. Sign in at https://kaelisvoss.com/login to get your files.", {
      status: 403,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  return fileResponse(file.key, file.filename);
}
