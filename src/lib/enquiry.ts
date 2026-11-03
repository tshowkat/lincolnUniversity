import { countryByCode } from "@/data/countries";
import { courseById } from "@/lib/courses";

export interface EnquiryInput {
  fullName: string;
  email: string;
  country: string;
  whatsapp: string;
  programme: string;
  /** PDPA consent to be contacted about the enquiry. Must be ticked. */
  consent: boolean;
  /** Honeypot — must stay empty. */
  company?: string;
}

export type EnquiryField = Exclude<keyof EnquiryInput, "company">;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(field: EnquiryField, v: EnquiryInput): string | undefined {
  switch (field) {
    case "fullName": {
      const name = v.fullName.trim();
      if (!name) return "Please enter your full name.";
      if (name.length < 2 || !/\p{L}/u.test(name)) return "Please enter a valid name.";
      if (name.length > 100) return "Name must be 100 characters or fewer.";
      return;
    }
    case "email":
      if (!v.email.trim()) return "Please enter your email address.";
      if (!EMAIL_RE.test(v.email.trim()) || v.email.length > 254) return "Please enter a valid email, e.g. name@example.com.";
      return;
    case "country":
      if (!countryByCode(v.country)) return "Please select your country.";
      return;
    case "whatsapp": {
      const raw = v.whatsapp.trim();
      if (!raw) return "Please enter your WhatsApp number.";
      if (!/^\+?[\d\s()-]+$/.test(raw)) return "Use digits only (spaces and dashes are fine).";
      const digits = raw.replace(/\D/g, "");
      if (digits.length < 6 || digits.length > 15) return "Please enter a valid phone number (6–15 digits).";
      return;
    }
    case "programme":
      if (!courseById(v.programme)) return "Please choose a programme or certification.";
      return;
    case "consent":
      if (v.consent !== true) return "Please agree so our admissions team can contact you.";
      return;
  }
}

export const ENQUIRY_FIELDS: EnquiryField[] = ["fullName", "email", "country", "whatsapp", "programme", "consent"];

export function validateEnquiry(v: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};
  for (const f of ENQUIRY_FIELDS) {
    const msg = validateField(f, v);
    if (msg) errors[f] = msg;
  }
  return errors;
}

/** Combine dial code + local number into an E.164-style string. */
export function fullWhatsappNumber(v: EnquiryInput) {
  const digits = v.whatsapp.replace(/\D/g, "");
  const dial = countryByCode(v.country)?.dial ?? "";
  return dial ? `${dial}${digits.replace(/^0+/, "")}` : `+${digits}`;
}

const UTM_KEY = "luc-utm";
export type Utm = { utm_source?: string; utm_medium?: string; utm_campaign?: string };

/** First-touch UTM tags for this visit: read from the landing URL once and kept for the session. */
export function captureUtm(): Utm {
  try {
    const saved = sessionStorage.getItem(UTM_KEY);
    if (saved) return JSON.parse(saved) as Utm;
    const sp = new URLSearchParams(window.location.search);
    const utm: Utm = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign"] as const) {
      const v = sp.get(k)?.slice(0, 150);
      if (v) utm[k] = v;
    }
    if (Object.keys(utm).length) sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
    return utm;
  } catch {
    return {};
  }
}
