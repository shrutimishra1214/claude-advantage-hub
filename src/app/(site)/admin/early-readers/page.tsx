import type { Metadata } from "next";
import { Logo } from "@/components/Header";
import { SpotsMeter } from "@/components/SpotsMeter";
import { listApplications, TOTAL_SPOTS } from "@/lib/early-readers";
import { isAdmin, release } from "./actions";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Early readers · Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function Admin() {
  if (!process.env.ADMIN_PASSWORD) {
    return <Frame><p className="text-ink-muted">Set <code className="rounded bg-ink/5 px-1.5 py-0.5">ADMIN_PASSWORD</code> (at least 8 characters) in your environment to use this page.</p></Frame>;
  }
  if (!(await isAdmin())) return <Frame><LoginForm /></Frame>;

  const apps = await listApplications();
  return (
    <Frame wide>
      <SpotsMeter claimed={apps.length} total={TOTAL_SPOTS} compact />
      <h2 className="mt-10 text-xl font-medium">Applicants</h2>
      {apps.length === 0 ? (
        <p className="mt-3 text-ink-muted">No applications yet.</p>
      ) : (
        <ol className="mt-4 grid gap-3">
          {apps.map((a, i) => (
            <li key={a.email} className="flex flex-wrap items-start gap-4 rounded-2xl border border-ink/10 p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white">{i + 1}</span>
              <div className="min-w-0 flex-1 text-sm leading-relaxed">
                <p className="text-base font-semibold">{a.name}</p>
                <p><a className="text-brand-violet hover:underline" href={`mailto:${a.email}`}>{a.email}</a></p>
                <p className="text-ink-muted">{a.role} · Uses Copilot: {a.usage}</p>
                {a.linkedin && <p><a className="text-brand-violet hover:underline" href={a.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>}
                <p className="text-xs text-ink-muted">Claimed {new Date(a.claimedAt).toLocaleString("en-IN")}</p>
              </div>
              <form action={release}>
                <input type="hidden" name="email" value={a.email} />
                <button className="btn-ghost !py-2 text-red-700 hover:!bg-red-50">Release spot</button>
              </form>
            </li>
          ))}
        </ol>
      )}
      <p className="mt-8 text-xs text-ink-muted">Releasing a spot reopens it on the website immediately. The applicant is not notified.</p>
    </Frame>
  );
}

function Frame({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <main className={`container py-16 ${wide ? "max-w-3xl" : "max-w-md"}`}>
      <div className="flex justify-center"><Logo /></div>
      <div className="card mt-10 p-6 md:p-8">
        <h1 className="mb-6 text-2xl font-medium">Early reader spots</h1>
        {children}
      </div>
    </main>
  );
}
