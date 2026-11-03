/**
 * URLs, contact details and navigation. Every student service is a page on this site (no outside links);
 * `mainSite` is kept only for structured data (JSON-LD) and is not linked anywhere.
 */

export const LINKS = {
  mainSite: "https://www.lincoln.edu.my/",
  apply: "/apply",
  eligibility: "/eligibility",
  scholarships: "/scholarships",
  faqs: "/faqs",
  /** Lincoln Online Portal page on this site (student hub). All student services live on this site. */
  portal: "/portal",
  /** Learning portal sign-in on Lincoln Online. */
  learningPortal: "/portal/sign-in",
  /** Staff sign-in for the LUC ODL Admin Portal (lead management). */
  adminLogin: "https://luc-odl-admin.vercel.app/login",
  examRules: "/examination-rules",
  verifyCertificate: "/verify-certificate",
  privacy: "/privacy-policy",
  refund: "/refund-policy",
  terms: "/terms-and-conditions",
} as const;

export const BRAND_ASSETS = {
  logo: "https://www.lincoln.edu.my/wp-content/uploads/2025/01/logo.webp",
  logoWidth: 360,
  logoHeight: 149,
  favicon: "https://www.lincoln.edu.my/wp-content/uploads/2025/01/cropped-icon-270x270.webp",
} as const;

export const CONTACT = {
  legalName: "Kolej Universiti Lincoln",
  address: "No. 12, 14, 16 & 18, Jalan SS 6/12, 47301 Petaling Jaya, Selangor",
  hotline: { label: "+603-7806 3478", href: "tel:+60378063478" },
  tollFree: { label: "1300 880 111", href: "tel:1300880111" },
  email: { label: "info@lincoln.edu.my", href: "mailto:info@lincoln.edu.my" },
  verifyEmail: { label: "verify@lincoln.edu.my", href: "mailto:verify@lincoln.edu.my" },
} as const;

/** [CLIENT TO PROVIDE] Set NEXT_PUBLIC_WHATSAPP_NUMBER (digits only, e.g. 60123456789). */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Programmes", href: "/#programmes" },
  { label: "Why Lincoln Online", href: "/#why-odl" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Admissions", href: "/#admissions" },
  { label: "Contact", href: "/#contact" },
] as const;

export const ADDITIONAL_INFO_LINKS = [
  { label: "Exam Rules", href: LINKS.examRules },
  { label: "Verify Certificate", href: LINKS.verifyCertificate },
  { label: "Privacy Policy", href: LINKS.privacy },
  { label: "Refund Policy", href: LINKS.refund },
  { label: "Terms & Conditions", href: LINKS.terms },
] as const;

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");
