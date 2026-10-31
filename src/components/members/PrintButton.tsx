"use client";

import { Icon } from "../icons";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn-primary no-print !px-4 !py-2.5 !text-sm">
      <Icon.printer className="h-4 w-4" /> Print or save as PDF
    </button>
  );
}
