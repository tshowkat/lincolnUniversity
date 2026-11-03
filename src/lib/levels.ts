import {
  Briefcase,
  ConciergeBell,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Laptop,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Field, Level } from "@/data/programmes";

/** Level badges — every colour is a shade of the LUC palette and passes WCAG AA. */
export const LEVEL_BADGE: Record<Level, string> = {
  PhD: "bg-brand-secondary text-white",
  "Master's": "bg-brand-deep text-white",
  "Bachelor's": "bg-brand-primary text-white",
  Diploma: "bg-brand-accent text-brand-dark",
  Foundation: "bg-brand-light text-brand-deep ring-1 ring-inset ring-brand-deep/25",
};

export const FIELD_ICON: Record<Field, LucideIcon> = {
  Business: Briefcase,
  "IT & Computing": Laptop,
  "Health & Nursing": HeartPulse,
  Education: GraduationCap,
  "Social Sciences": Users,
  "Engineering & Science": FlaskConical,
  Hospitality: ConciergeBell,
};
