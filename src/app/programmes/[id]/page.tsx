import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ClipboardCheck, GraduationCap, Send } from "lucide-react";
import { HelpCard, ServicePage, StepsCard } from "@/components/ServicePage";
import { programmeById, programmes } from "@/data/programmes";
import { LINKS } from "@/data/site";
import { FIELD_ICON, LEVEL_BADGE } from "@/lib/levels";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return programmes.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = programmeById(params.id);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.title}: a ${p.level} programme offered fully online by Lincoln Online, Lincoln University College.`,
    alternates: { canonical: `/programmes/${p.id}` },
  };
}

/**
 * Programme page on Lincoln Online. Shows only details held in `programmes.ts`. Fees, duration and entry
 * requirements are handled by the admissions team (eligibility / enquiry forms) rather than invented here.
 */
export default function ProgrammePage({ params }: { params: { id: string } }) {
  const p = programmeById(params.id);
  if (!p) notFound();
  const FieldIcon = FIELD_ICON[p.field];
  const q = `?programme=${encodeURIComponent(p.id)}`;

  return (
    <ServicePage
      crumb={p.title}
      eyebrow={`${p.level} programme`}
      icon={GraduationCap}
      title={p.title}
      description={
        <span className="flex flex-wrap items-center gap-3">
          <span className={cn("rounded-full px-3 py-1 text-sm font-bold", LEVEL_BADGE[p.level])}>{p.level}</span>
          <span className="inline-flex items-center gap-2 text-white/85">
            <FieldIcon aria-hidden className="h-5 w-5 text-brand-accent" />
            {p.field}
          </span>
          <span className="text-white/85">· 100% online</span>
        </span>
      }
    >
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-4xl bg-brand-light shadow-soft">
              <Image src={p.image} alt={`${p.title}, Lincoln Online`} fill priority sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
            </div>
            <h2 className="mt-10 text-2xl font-extrabold sm:text-3xl">Study {p.title} online</h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-700">
              {p.title} is offered by Lincoln University College through Lincoln Online, so you can study from anywhere
              while you work. For the programme structure, fees, duration and entry requirements, check your eligibility
              or send an enquiry and the admissions team will send you the full details.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={`${LINKS.apply}${q}`} className="btn btn-primary h-14 px-8 text-base">
                <Send aria-hidden className="h-5 w-5" />
                Apply for this programme
              </a>
              <a href={`${LINKS.eligibility}${q}`} className="btn btn-secondary h-14 px-8 text-base">
                <ClipboardCheck aria-hidden className="h-5 w-5 text-brand-primary" />
                Check eligibility
              </a>
            </div>
            <a href="/#programmes" className="btn btn-outline btn-sm mt-10">
              <ArrowLeft aria-hidden className="h-4 w-4" />
              All programmes
            </a>
          </div>
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <StepsCard
                title="Your next steps"
                steps={["Check your eligibility for this programme.", "Apply online.", "Enrol and start learning on Lincoln Online."]}
              />
              <HelpCard title="Questions about this programme?" body="Ask the admissions team about fees, intakes and entry requirements." />
            </div>
          </aside>
        </div>
      </section>
    </ServicePage>
  );
}
