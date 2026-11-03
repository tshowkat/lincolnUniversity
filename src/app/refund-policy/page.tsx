import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";
import { REFUND_POLICY } from "@/data/policies";

export const metadata: Metadata = {
  title: REFUND_POLICY.title,
  description: REFUND_POLICY.summary,
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPage() {
  return <PolicyPage policy={REFUND_POLICY} />;
}
