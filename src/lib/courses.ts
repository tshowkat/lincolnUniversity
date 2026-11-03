import { programmeById } from "@/data/programmes";
import { certificationById, certTitle } from "@/data/certifications";

/** Anything a visitor can apply or enquire for: a degree programme or a certification. */
export interface Course {
  id: string;
  title: string;
  /** Page on this site (certifications) or the official programme page (degrees). */
  link: string;
}

export function courseById(id: string): Course | undefined {
  const p = programmeById(id);
  if (p) return { id: p.id, title: p.title, link: p.link };
  const c = certificationById(id);
  if (c) return { id: c.id, title: certTitle(c), link: `/certifications/${c.id}` };
  return undefined;
}
