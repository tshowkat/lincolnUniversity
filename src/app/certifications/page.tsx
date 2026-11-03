import type { Metadata } from "next";
import { Award } from "lucide-react";
import { ServicePage } from "@/components/ServicePage";
import { CertificationExplorer } from "@/components/CertificationExplorer";
import { CERT_DOMAINS, certifications } from "@/data/certifications";

export const metadata: Metadata = {
  title: "Engineering Certification Programmes",
  description: `${certifications.length} engineering certification programmes across ${CERT_DOMAINS.length} domains, offered online by Lincoln Online, Lincoln University College.`,
  alternates: { canonical: "/certifications" },
};

export default function CertificationsPage() {
  return (
    <ServicePage
      crumb="Certifications"
      eyebrow="Certification programmes"
      icon={Award}
      title={
        <>
          Engineering <span className="text-brand-accent">certifications</span>
        </>
      }
      description={`${certifications.length} certification programmes across ${CERT_DOMAINS.length} engineering domains, from Computer Science and AI to Civil, Mechanical, Energy and Biotechnology. Study online and apply in minutes.`}
    >
      <CertificationExplorer />
    </ServicePage>
  );
}
