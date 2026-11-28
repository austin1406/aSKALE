"use client";

import { useRef } from "react";

import { updateLeadStage } from "@/app/admin/actions";
import { LEAD_STAGES, STAGE_LABELS, type LeadStage } from "@/lib/leads";

/** Changing the dropdown saves right away. */
export function StageSelect({ id, stage }: { id: string; stage: LeadStage }) {
  const form = useRef<HTMLFormElement>(null);
  return (
    <form ref={form} action={updateLeadStage}>
      <input type="hidden" name="id" value={id} />
      <label className="sr-only" htmlFor={`stage-${id}`}>
        Stage
      </label>
      <select
        id={`stage-${id}`}
        name="stage"
        defaultValue={stage}
        onChange={() => form.current?.requestSubmit()}
        className="h-9 rounded-lg border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {LEAD_STAGES.map((s) => (
          <option key={s} value={s}>
            {STAGE_LABELS[s]}
          </option>
        ))}
      </select>
    </form>
  );
}
