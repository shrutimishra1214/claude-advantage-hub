import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <p className="font-display text-7xl font-medium accent-em">404</p>
        <h1 className="mt-4 text-2xl font-medium">This page doesn&apos;t exist</h1>
        <Link href="/" className="btn-primary mt-8">Back to home</Link>
      </div>
    </main>
  );
}
