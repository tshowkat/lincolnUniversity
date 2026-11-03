import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Award, ClipboardCheck, Send } from "lucide-react";
import { HelpCard, ServicePage, StepsCard } from "@/components/ServicePage";
import { certificationById, certifications, certificationsByDomain, certTitle } from "@/data/certifications";
import { LINKS } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return certifications.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const c = certificationById(params.id);
  if (!c) return {};
  return {
    title: certTitle(c),
    description: `${certTitle(c)}: ${c.focus}. An online ${c.domain.name} certification programme from Lincoln Online, Lincoln University College.`,
    alternates: { canonical: `/certifications/${c.id}` },
  };
}

/** One page per certification. Fees, duration and entry requirements come from the admissions team on request. */
export default function CertificationPage({ params }: { params: { id: string } }) {
  const c = certificationById(params.id);
  if (!c) notFound();
  const DomainIcon = c.domain.icon;
  const q = `?programme=${encodeURIComponent(c.id)}`;
  const related = certificationsByDomain(c.domain.id).filter((r) => r.id !== c.id);

  return (
    <ServicePage
      crumb={c.title}
      eyebrow="Certification programme"
      icon={Award}
      title={certTitle(c)}
      description={
        <span className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-brand-accent px-3 py-1 text-sm font-bold text-brand-dark">Certification</span>
          <span className="inline-flex items-center gap-2 text-white/85">
            <DomainIcon aria-hidden className="h-5 w-5 text-brand-accent" />
            {c.domain.name}
          </span>
          <span className="text-white/85">· 100% online</span>
        </span>
      }
    >
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            {c.image && (
              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-4xl bg-brand-light shadow-soft">
                <Image src={c.image} alt={`${certTitle(c)}, Lincoln Online`} fill priority sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
              </div>
            )}
            <div className="card flex items-start gap-5 p-6 sm:p-8">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand-primary">
                <DomainIcon aria-hidden className="h-7 w-7" />
              </span>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-600">Focus area</h2>
                <p className="mt-2 text-xl font-semibold leading-snug text-brand-dark">{c.focus}</p>
              </div>
            </div>

            <h2 className="mt-10 text-2xl font-extrabold sm:text-3xl">Study {c.title} online</h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-700">
              The {certTitle(c)} is part of the {c.domain.name} certification track at Lincoln Online, Lincoln University
              College. Study from anywhere while you work. For the course structure, fees, duration and entry
              requirements, check your eligibility or apply and the admissions team will send you the full details.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={`${LINKS.apply}${q}`} className="btn btn-primary h-14 px-8 text-base">
                <Send aria-hidden className="h-5 w-5" />
                Apply for this certification
              </a>
              <a href={`${LINKS.eligibility}${q}`} className="btn btn-secondary h-14 px-8 text-base">
                <ClipboardCheck aria-hidden className="h-5 w-5 text-brand-primary" />
                Check eligibility
              </a>
            </div>

            {related.length > 0 && (
              <>
                <h2 className="mt-14 text-xl font-extrabold sm:text-2xl">More {c.domain.name} certifications</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {related.map((r) => (
                    <li key={r.id}>
                      <a
                        href={`/certifications/${r.id}`}
                        className="group flex min-h-[56px] items-center justify-between gap-3 rounded-2xl bg-neutral-50 px-5 py-3 font-semibold text-brand-dark ring-1 ring-neutral-900/5 transition-colors hover:bg-brand-light hover:text-brand-deep"
                      >
                        {r.title}
                        <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-brand-primary transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <a href={`/certifications#${c.domain.id}`} className="btn btn-outline btn-sm mt-10">
              <ArrowLeft aria-hidden className="h-4 w-4" />
              All certifications
            </a>
          </div>
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <StepsCard
                title="Your next steps"
                steps={["Check your eligibility for this certification.", "Apply online.", "Enrol and start learning on Lincoln Online."]}
              />
              <HelpCard title="Questions about this certification?" body="Ask the admissions team about fees, intakes and entry requirements." />
            </div>
          </aside>
        </div>
      </section>
    </ServicePage>
  );
}
