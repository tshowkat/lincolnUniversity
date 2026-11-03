import type { Metadata } from "next";
import { ClipboardCheck } from "lucide-react";
import { HelpCard, ServiceBody, ServicePage, StepsCard } from "@/components/ServicePage";
import { ServiceForm } from "@/components/ServiceForm";
import { LINKS } from "@/data/site";

export const metadata: Metadata = {
  title: "Check Eligibility",
  description: "Check whether your qualifications meet the entry requirements for a Lincoln Online programme.",
  alternates: { canonical: LINKS.eligibility },
};

export default function EligibilityPage() {
  return (
    <ServicePage
      crumb="Check Eligibility"
      eyebrow="Admissions"
      icon={ClipboardCheck}
      title={
        <>
          Check your <span className="text-brand-accent">eligibility</span>
        </>
      }
      description="Tell us about your qualifications and the programme you are interested in. An admissions officer will confirm whether you meet the entry requirements."
    >
      <ServiceBody
        aside={
          <>
            <StepsCard
              title="How it works"
              steps={[
                "Choose a programme and describe your highest qualification.",
                "An admissions officer reviews your details.",
                "You receive your eligibility result by email.",
              ]}
            />
            <a href={LINKS.apply} className="btn btn-outline w-full">
              Ready? Apply online
            </a>
            <HelpCard body="Unsure which programme suits your background? Talk to the admissions team." />
          </>
        }
      >
        <ServiceForm kind="eligibility" />
      </ServiceBody>
    </ServicePage>
  );
}
