import type { Metadata } from "next";
import { Send } from "lucide-react";
import { HelpCard, ServiceBody, ServicePage, StepsCard } from "@/components/ServicePage";
import { ServiceForm } from "@/components/ServiceForm";
import { LINKS } from "@/data/site";

export const metadata: Metadata = {
  title: "Apply Online",
  description: "Apply online for a Lincoln Online programme at Lincoln University College, from Foundation to PhD.",
  alternates: { canonical: LINKS.apply },
};

export default function ApplyPage() {
  return (
    <ServicePage
      crumb="Apply Online"
      eyebrow="Admissions"
      icon={Send}
      title={
        <>
          Apply <span className="text-brand-accent">online</span>
        </>
      }
      description="Start your Lincoln Online application in a few minutes. Not sure you qualify? Check your eligibility first."
    >
      <ServiceBody
        aside={
          <>
            <StepsCard
              title="What happens next"
              steps={[
                "Submit this form with the programme you want.",
                "The admissions team contacts you by email or WhatsApp.",
                "You send the supporting documents they ask for.",
                "You receive your offer and enrolment details.",
              ]}
            />
            <a href={LINKS.eligibility} className="btn btn-outline w-full">
              Check eligibility first
            </a>
            <HelpCard body="Questions about applying, intakes or fees? Contact the admissions team." />
          </>
        }
      >
        <ServiceForm kind="apply" />
      </ServiceBody>
    </ServicePage>
  );
}
