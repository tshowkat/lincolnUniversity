import type { Metadata } from "next";
import { ArrowRight, LogIn, ScrollText } from "lucide-react";
import { HelpCard, ServiceBody, ServicePage } from "@/components/ServicePage";
import { PLACEHOLDER } from "@/data/content";
import { LINKS } from "@/data/site";

export const metadata: Metadata = {
  title: "Learning Portal Sign-in",
  description: "Sign in to the Lincoln Online learning portal.",
  alternates: { canonical: LINKS.learningPortal },
  robots: { index: false },
};

/**
 * [CLIENT TO PROVIDE] Student sign-in needs the university's learning system connected to this site
 * (e.g. single sign-on). Until then this page explains the status instead of linking to another website.
 */
export default function SignInPage() {
  return (
    <ServicePage
      crumb="Learning Portal"
      eyebrow="Learning Portal"
      icon={LogIn}
      title={
        <>
          Lincoln Online <span className="text-brand-accent">Learning Portal</span>
        </>
      }
      description="Your courses, learning materials and coursework, on Lincoln Online."
    >
      <ServiceBody aside={<HelpCard title="Can't access your course?" body="Contact the university with your student ID and we'll help you get back into your course." />}>
        <div className="card p-6 sm:p-10">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-brand-primary">
            <LogIn aria-hidden className="h-7 w-7" />
          </span>
          <h2 className="mt-6 text-2xl font-extrabold sm:text-3xl">Student sign-in is coming to Lincoln Online</h2>
          <p className="mt-3 leading-relaxed text-neutral-600">
            We are bringing the learning portal onto the Lincoln Online website, so you can reach your courses and every
            student service in one place.
          </p>
          <p className="mt-4">
            <span className="placeholder-tag">{PLACEHOLDER} Connect the learning system (single sign-on) to enable sign-in.</span>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={LINKS.portal} className="btn btn-primary">
              Student services
              <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
            <a href={LINKS.examRules} className="btn btn-secondary">
              <ScrollText aria-hidden className="h-4 w-4 text-brand-primary" />
              Examination rules
            </a>
          </div>
        </div>
      </ServiceBody>
    </ServicePage>
  );
}
