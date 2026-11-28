/** Pipeline stages; must match the check constraint on public.leads.stage. */
export const LEAD_STAGES = ["new", "contacted", "call_booked", "proposal_sent", "won", "lost", "parked"] as const;
export type LeadStage = (typeof LEAD_STAGES)[number];

export const STAGE_LABELS: Record<LeadStage, string> = {
  new: "New",
  contacted: "Contacted",
  call_booked: "Call booked",
  proposal_sent: "Proposal sent",
  won: "Won",
  lost: "Lost",
  parked: "Parked",
};

export type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  business: string | null;
  message: string;
  source: string;
  stage: LeadStage;
};
