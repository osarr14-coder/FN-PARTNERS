"use client";

import { useTransition } from "react";
import { QUOTE_STATUSES } from "@/lib/quote-status";

export function StatusForm({
  currentStatus,
  action,
}: {
  currentStatus: string;
  action: (formData: FormData) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <form action={action}>
      <select
        name="status"
        defaultValue={currentStatus}
        disabled={isPending}
        onChange={(e) => {
          startTransition(() => {
            e.currentTarget.form?.requestSubmit();
          });
        }}
        className="rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-ink-950 focus:border-ink-700 focus:outline-none focus:ring-1 focus:ring-ink-700 disabled:opacity-60"
      >
        {QUOTE_STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </form>
  );
}
