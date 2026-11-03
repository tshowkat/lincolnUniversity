import { ArrowRight, ClipboardCheck, Mail, Phone } from "lucide-react";
import { CONTACT, LINKS } from "@/data/site";
import { EnquiryForm } from "./EnquiryForm";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function EnquirySection() {
  return (
    <section id="admissions" aria-labelledby="admissions-title" className="section relative overflow-hidden">
      <div aria-hidden className="absolute -left-32 top-24 -z-10 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="admissions-title"
            align="left"
            eyebrow="Admissions & Enquiries"
            title={
              <>
                Talk to our <span className="text-gradient">admissions team</span>
              </>
            }
            description="Tell us which programme you're interested in and we'll help with entry requirements, fees and intakes."
          />

          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-4">
              <li>
                <a
                  href={LINKS.eligibility}
                  className="card group flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white">
                    <ClipboardCheck aria-hidden className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-bold text-brand-dark">Check your eligibility</span>
                    <span className="block text-sm text-neutral-600">Confirm you meet the entry requirements</span>
                  </span>
                  <ArrowRight aria-hidden className="h-5 w-5 text-neutral-500 transition group-hover:text-brand-primary" />
                </a>
              </li>
              <li>
                <a href={CONTACT.hotline.href} className="card group flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-lift">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-secondary text-white">
                    <Phone aria-hidden className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-bold text-brand-dark">{CONTACT.hotline.label}</span>
                    <span className="block text-sm text-neutral-600">Hotline · {CONTACT.tollFree.label} (Malaysia toll free)</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={CONTACT.email.href} className="card group flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-lift">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-deep text-white">
                    <Mail aria-hidden className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-bold text-brand-dark">{CONTACT.email.label}</span>
                    <span className="block text-sm text-neutral-600">Email the admissions team</span>
                  </span>
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="lg:col-span-7">
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
