import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";
import { TERMS } from "@/data/policies";

export const metadata: Metadata = {
  title: TERMS.title,
  description: TERMS.summary,
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return <PolicyPage policy={TERMS} />;
}
