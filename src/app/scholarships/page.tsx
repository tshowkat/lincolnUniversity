import type { Metadata } from "next";
import { Award } from "lucide-react";
import { HelpCard, ServiceBody, ServicePage, StepsCard } from "@/components/ServicePage";
import { ServiceForm } from "@/components/ServiceForm";
import { PLACEHOLDER } from "@/data/content";
import { LINKS } from "@/data/site";

export const metadata: Metadata = {
  title: "Scholarships",
  description: "Apply for a Lincoln University College scholarship for your Lincoln Online programme.",
  alternates: { canonical: LINKS.scholarships },
};

export default function ScholarshipsPage() {
  return (
    <ServicePage
      crumb="Scholarships"
      eyebrow="Student Services"
      icon={Award}
      title={
        <>
          <span className="text-brand-accent">Scholarships</span> for Lincoln Online learners
        </>
      }
      description="Lincoln University College offers scholarships to new and current students. Apply below and the scholarship team will review your application."
    >
      <ServiceBody
        aside={
          <>
            <div className="card p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-600">Available scholarships</h2>
              <p className="mt-3 leading-relaxed text-ink">
                Scholarship types, amounts and criteria will be listed here.
              </p>
              <p className="mt-4">
                <span className="placeholder-tag">{PLACEHOLDER} Scholarship details to be supplied by LUC.</span>
              </p>
            </div>
            <StepsCard
              title="How to apply"
              steps={[
                "Complete the scholarship application form.",
                "The scholarship team reviews your application.",
                "You are notified of the outcome by email.",
              ]}
            />
            <HelpCard body="Questions about scholarships or fees? Contact the university." />
          </>
        }
      >
        <ServiceForm kind="scholarship" />
      </ServiceBody>
    </ServicePage>
  );
}
