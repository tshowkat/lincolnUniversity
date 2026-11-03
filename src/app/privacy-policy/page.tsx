import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";
import { PRIVACY_POLICY } from "@/data/policies";

export const metadata: Metadata = {
  title: PRIVACY_POLICY.title,
  description: PRIVACY_POLICY.summary,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return <PolicyPage policy={PRIVACY_POLICY} />;
}
