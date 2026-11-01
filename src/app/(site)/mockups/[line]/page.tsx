import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductScene } from "@/components/Mockups";
import { lines, type LineId } from "@/lib/lines";

// A bare page with one product scene, for exporting mockup images for ads:
//   /mockups/copilot, /mockups/claude (add ?bg=none for a transparent background)
export const metadata: Metadata = { title: "Mockup", robots: { index: false, follow: false } };

export default async function MockupPage({ params, searchParams }: { params: Promise<{ line: string }>; searchParams: Promise<{ bg?: string }> }) {
  const { line } = await params;
  const clear = (await searchParams).bg === "none";
  if (!(line in lines)) notFound();
  const L = lines[line as LineId];
  return (
    <div className={`${L.themeClass} ${clear ? "" : "bg-canvas"} flex min-h-dvh items-center justify-center p-[3vw]`}>
      {clear && <style>{"body{background:transparent}"}</style>}
      <ProductScene line={L.id} extraBook={L.id === "claude" ? "operator" : undefined} className="max-w-[1600px]" priority floor={!clear} />
    </div>
  );
}
