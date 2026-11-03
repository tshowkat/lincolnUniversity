/**
 * Student-service request forms (apply, eligibility, scholarship, certificate verification, questions).
 * One definition drives the form UI, client-side validation and the server route, so they never drift apart.
 */
import { countryByCode } from "@/data/countries";
import { courseById } from "@/lib/courses";

export type ServiceKind = "apply" | "eligibility" | "scholarship" | "verify" | "question";

type FieldType = "text" | "email" | "country" | "phone" | "programme" | "select" | "textarea" | "year";

export interface ServiceField {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  hint?: string;
  options?: readonly string[];
  autoComplete?: string;
  /** Spans both columns on wide screens. */
  wide?: boolean;
  maxLength?: number;
}

const QUALIFICATIONS = [
  "SPM / O-Level or equivalent",
  "STPM / A-Level / Foundation or equivalent",
  "Diploma",
  "Bachelor's degree",
  "Master's degree",
  "Other",
] as const;

const BASE: ServiceField[] = [
  { name: "fullName", label: "Full Name", type: "text", required: true, placeholder: "As per your IC / passport", autoComplete: "name", wide: true, maxLength: 100 },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "name@example.com", autoComplete: "email", maxLength: 254 },
  { name: "country", label: "Country", type: "country", required: true, autoComplete: "country" },
  { name: "whatsapp", label: "WhatsApp Number", type: "phone", required: true, wide: true },
];

export const SERVICE_FORMS: Record<
  ServiceKind,
  { title: string; intro: string; submit: string; success: string; fields: ServiceField[] }
> = {
  apply: {
    title: "Online application",
    intro: "Tell us who you are and what you want to study. Our admissions team will send you the next steps and the documents to prepare.",
    submit: "Submit Application",
    success: "We've received your application. The admissions team will email you the next steps and the documents to prepare.",
    fields: [
      ...BASE,
      { name: "programme", label: "Programme", type: "programme", required: true, wide: true },
      { name: "qualification", label: "Highest Qualification", type: "select", required: true, options: QUALIFICATIONS, wide: true },
      { name: "message", label: "Anything we should know?", type: "textarea", required: false, placeholder: "Preferred intake, work experience, questions…", wide: true, maxLength: 1000 },
    ],
  },
  eligibility: {
    title: "Check your eligibility",
    intro: "Share your qualifications and the programme you want. An admissions officer will confirm whether you meet the entry requirements.",
    submit: "Check My Eligibility",
    success: "We've received your details. An admissions officer will review your qualifications and confirm your eligibility by email.",
    fields: [
      ...BASE,
      { name: "programme", label: "Programme", type: "programme", required: true, wide: true },
      { name: "qualification", label: "Highest Qualification", type: "select", required: true, options: QUALIFICATIONS, wide: true },
      { name: "details", label: "Qualification details", type: "textarea", required: true, placeholder: "Subject / field, institution, year completed, grade or CGPA", wide: true, maxLength: 1000 },
    ],
  },
  scholarship: {
    title: "Apply for a scholarship",
    intro: "Complete this form to apply for a Lincoln University College scholarship for your Lincoln Online programme.",
    submit: "Submit Scholarship Application",
    success: "We've received your scholarship application. The scholarship team will contact you by email.",
    fields: [
      ...BASE,
      { name: "idNumber", label: "IC / Passport Number", type: "text", required: true, maxLength: 30 },
      { name: "studyStatus", label: "Current Study Status", type: "select", required: true, options: ["New applicant", "Current Lincoln Online student"] },
      { name: "programme", label: "Programme Applied", type: "programme", required: true, wide: true },
      { name: "message", label: "Why are you applying?", type: "textarea", required: false, placeholder: "Achievements, financial circumstances or anything else we should consider", wide: true, maxLength: 1500 },
    ],
  },
  verify: {
    title: "Request a verification",
    intro: "Employers, institutions and graduates can ask us to confirm that a Lincoln University College result or certificate is genuine.",
    submit: "Submit Verification Request",
    success: "We've received your verification request. The Examination Unit will reply by email.",
    fields: [
      { name: "fullName", label: "Your Full Name", type: "text", required: true, autoComplete: "name", wide: true, maxLength: 100 },
      { name: "email", label: "Your Email", type: "email", required: true, placeholder: "name@example.com", autoComplete: "email", maxLength: 254 },
      { name: "organisation", label: "Organisation (if any)", type: "text", required: false, autoComplete: "organization", maxLength: 120 },
      { name: "holderName", label: "Name on the Certificate", type: "text", required: true, wide: true, maxLength: 100 },
      { name: "studentId", label: "Student ID / Certificate Number", type: "text", required: true, maxLength: 40 },
      { name: "holderIdNumber", label: "Holder's IC / Passport Number", type: "text", required: true, maxLength: 30 },
      { name: "programmeName", label: "Programme Studied", type: "text", required: true, maxLength: 160 },
      { name: "year", label: "Year of Completion", type: "year", required: true, placeholder: "e.g. 2024" },
      { name: "purpose", label: "Purpose", type: "select", required: true, options: ["Employment", "Further study", "Immigration / visa", "Personal record", "Other"], wide: true },
    ],
  },
  question: {
    title: "Ask a question",
    intro: "Can't find your answer? Send us your question and we'll reply by email.",
    submit: "Send Question",
    success: "We've received your question. Our team will reply by email.",
    fields: [
      ...BASE,
      { name: "question", label: "Your Question", type: "textarea", required: true, wide: true, maxLength: 1500 },
    ],
  },
};

export type ServiceValues = Record<string, string>;
export type ServiceErrors = Record<string, string | undefined>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateServiceField(f: ServiceField, values: ServiceValues): string | undefined {
  const raw = (values[f.name] ?? "").trim();
  if (!raw) {
    if (!f.required) return;
    if (f.type === "select" || f.type === "programme" || f.type === "country") return `Please choose an option for ${f.label}.`;
    return `${f.label} is required.`;
  }
  if (f.maxLength && raw.length > f.maxLength) return `Must be ${f.maxLength} characters or fewer.`;
  switch (f.type) {
    case "text":
      if (f.autoComplete === "name" && (raw.length < 2 || !/\p{L}/u.test(raw))) return "Please enter a valid name.";
      return;
    case "email":
      return EMAIL_RE.test(raw) ? undefined : "Please enter a valid email, e.g. name@example.com.";
    case "country":
      return countryByCode(raw) ? undefined : "Please select your country.";
    case "phone": {
      if (!/^\+?[\d\s()-]+$/.test(raw)) return "Use digits only (spaces and dashes are fine).";
      const digits = raw.replace(/\D/g, "");
      return digits.length < 6 || digits.length > 15 ? "Please enter a valid phone number (6–15 digits)." : undefined;
    }
    case "programme":
      return courseById(raw) ? undefined : "Please choose a programme or certification.";
    case "select":
      return f.options?.includes(raw) ? undefined : `Please choose an option for ${f.label}.`;
    case "year": {
      const y = Number(raw);
      return /^\d{4}$/.test(raw) && y >= 2002 && y <= new Date().getFullYear() ? undefined : "Please enter a valid year (2002 or later).";
    }
    default:
      return;
  }
}

export function validateService(kind: ServiceKind, values: ServiceValues): ServiceErrors {
  const errors: ServiceErrors = {};
  for (const f of SERVICE_FORMS[kind].fields) {
    const msg = validateServiceField(f, values);
    if (msg) errors[f.name] = msg;
  }
  return errors;
}

export function isServiceKind(v: unknown): v is ServiceKind {
  return typeof v === "string" && v in SERVICE_FORMS;
}

/** Human-readable payload for the webhook (country names, full WhatsApp number, programme title). */
export function servicePayload(kind: ServiceKind, values: ServiceValues) {
  const out: Record<string, string | undefined> = {};
  for (const f of SERVICE_FORMS[kind].fields) {
    const v = (values[f.name] ?? "").trim();
    if (f.type === "country") out[f.name] = countryByCode(v)?.name ?? v;
    else if (f.type === "programme") {
      out.programmeId = v;
      out.programme = courseById(v)?.title;
    } else if (f.type === "phone") {
      const digits = v.replace(/\D/g, "");
      const dial = countryByCode(values.country ?? "")?.dial ?? "";
      out[f.name] = dial ? `${dial}${digits.replace(/^0+/, "")}` : `+${digits}`;
    } else if (f.type === "email") out[f.name] = v.toLowerCase();
    else out[f.name] = v;
  }
  return out;
}
