import { ArrowRight } from "lucide-react";
import { CERT_DOMAINS, certifications, certificationsByDomain } from "@/data/certifications";
import { SectionHeading } from "./SectionHeading";

/** Homepage section: the 12 certification domains, each linking into /certifications. */
export function CertificationsTeaser() {
  return (
    <section id="certifications" aria-labelledby="certifications-title" className="section bg-white">
      <div className="container-x">
        <SectionHeading
          id="certifications-title"
          eyebrow="Certification Programmes"
          title={
            <>
              <span className="text-gradient">{certifications.length} engineering certifications</span> across{" "}
              {CERT_DOMAINS.length} domains
            </>
          }
          description="Build job-ready skills in a focused engineering field, fully online. Pick a domain to see its certifications."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CERT_DOMAINS.map((d) => {
            const Icon = d.icon;
            const count = certificationsByDomain(d.id).length;
            return (
              <li key={d.id}>
                <a
                  href={`/certifications#${d.id}`}
                  className="card group flex h-full items-center gap-4 p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-bold leading-snug text-brand-dark">{d.name}</span>
                    <span className="mt-0.5 block text-sm text-neutral-600">
                      {count} certification{count === 1 ? "" : "s"}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 text-center">
          <a href="/certifications" className="btn btn-primary h-14 px-8 text-base">
            Browse all certifications
            <ArrowRight aria-hidden className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
