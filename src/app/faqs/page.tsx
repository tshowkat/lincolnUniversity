import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { HelpCard, ServicePage } from "@/components/ServicePage";
import { ServiceForm } from "@/components/ServiceForm";
import { LINKS } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about studying with Lincoln Online, and a form to ask your own.",
  alternates: { canonical: LINKS.faqs },
};

export default function FaqsPage() {
  return (
    <ServicePage
      crumb="FAQs"
      eyebrow="Student Services"
      icon={HelpCircle}
      title={
        <>
          Frequently asked <span className="text-brand-accent">questions</span>
        </>
      }
      description="Quick answers about studying with Lincoln Online. Can't find yours? Ask us below."
    >
      <FAQ showMoreLink={false} />
      <section id="ask" aria-label="Ask a question" className="scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <ServiceForm kind="question" />
          </div>
          <aside className="lg:col-span-4">
            <HelpCard title="Prefer to talk?" body="Call or email the university and we'll help you directly." />
          </aside>
        </div>
      </section>
    </ServicePage>
  );
}
