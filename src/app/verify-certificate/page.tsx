import type { Metadata } from "next";
import { BadgeCheck, Mail } from "lucide-react";
import { HelpCard, ServiceBody, ServicePage, StepsCard } from "@/components/ServicePage";
import { ServiceForm } from "@/components/ServiceForm";
import { CONTACT, LINKS } from "@/data/site";

export const metadata: Metadata = {
  title: "Verify Result / Certificate",
  description: "Request verification of a Lincoln University College result or certificate.",
  alternates: { canonical: LINKS.verifyCertificate },
};

export default function VerifyCertificatePage() {
  return (
    <ServicePage
      crumb="Verify Result / Certificate"
      eyebrow="Student Services"
      icon={BadgeCheck}
      title={
        <>
          Verify a result or <span className="text-brand-accent">certificate</span>
        </>
      }
      description="Employers, institutions and graduates can ask Lincoln University College to confirm that a result or certificate is genuine."
    >
      <ServiceBody
        aside={
          <>
            <StepsCard
              title="How verification works"
              steps={[
                "Enter the certificate holder's details exactly as printed.",
                "The Examination Unit checks them against university records.",
                "You receive the verification result by email.",
              ]}
            />
            <div className="card p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-600">Verification email</h2>
              <a href={CONTACT.verifyEmail.href} className="mt-3 inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand-deep hover:underline">
                <Mail aria-hidden className="h-4 w-4" />
                {CONTACT.verifyEmail.label}
              </a>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                To send a copy of the certificate, email it here after you submit the form.
              </p>
            </div>
            <HelpCard body="For anything else, contact the university." />
          </>
        }
      >
        <ServiceForm kind="verify" />
      </ServiceBody>
    </ServicePage>
  );
}
