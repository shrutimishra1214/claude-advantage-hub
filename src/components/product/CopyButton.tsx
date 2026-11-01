"use client";

import { useState } from "react";
import { Icon } from "../icons";

export function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          // Clipboard blocked: leave the text selectable instead.
        }
      }}
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold transition ${className}`}
    >
      {copied ? <Icon.check className="h-3.5 w-3.5" /> : <Icon.copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
