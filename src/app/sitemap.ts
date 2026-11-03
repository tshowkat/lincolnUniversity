import type { MetadataRoute } from "next";
import { programmes } from "@/data/programmes";
import { certifications } from "@/data/certifications";
import { SITE_URL } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  });
  return [
    page("", 1, "weekly"),
    page("/portal", 0.8),
    page("/apply", 0.9),
    page("/eligibility", 0.8),
    page("/scholarships", 0.7),
    page("/faqs", 0.7),
    page("/examination-rules", 0.6, "yearly"),
    page("/verify-certificate", 0.5, "yearly"),
    page("/privacy-policy", 0.3, "yearly"),
    page("/refund-policy", 0.3, "yearly"),
    page("/terms-and-conditions", 0.3, "yearly"),
    page("/certifications", 0.9, "weekly"),
    ...programmes.map((p) => page(`/programmes/${p.id}`, 0.8)),
    ...certifications.map((c) => page(`/certifications/${c.id}`, 0.7)),
  ];
}
