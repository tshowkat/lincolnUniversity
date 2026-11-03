export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const ENQUIRE_EVENT = "luc:enquire";

/** Pre-select a programme in the enquiry form and bring the form into view. */
export function requestEnquiry(programmeId?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<string | undefined>(ENQUIRE_EVENT, { detail: programmeId }));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("admissions")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
