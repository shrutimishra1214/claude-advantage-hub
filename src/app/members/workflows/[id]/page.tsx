import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/members/PageHead";
import { WorkflowSteps } from "@/components/members/WorkflowSteps";
import { workflowById } from "@/lib/toolkit/workflows";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: workflowById((await params).id)?.title ?? "Workflow" };
}

export default async function WorkflowPage({ params }: Props) {
  const wf = workflowById((await params).id);
  if (!wf) notFound();
  return (
    <article>
      <PageHead back={{ href: "/members/workflows", label: "Workflow Vault" }} eyebrow={`${wf.category} · about ${wf.minutes} min`} title={wf.title} lead={wf.outcome} />
      <p className="mt-6 rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink-soft"><strong className="text-ink">What you need:</strong> {wf.requires}</p>
      <div className="mt-8"><WorkflowSteps wf={wf} /></div>
    </article>
  );
}
