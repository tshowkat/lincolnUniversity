import Image from "next/image";
import { ArrowRight, MessageSquareText } from "lucide-react";
import type { Certification } from "@/data/certifications";
import { requestEnquiry } from "@/lib/utils";

/** Explorer card for a certification. Same footprint as ProgrammeCard, with the domain icon in place of a photo. */
export function CertificationCard({ certification }: { certification: Certification }) {
  const { id, title, focus, domain, image } = certification;
  const Icon = domain.icon;
  const headingId = `cert-${id}`;

  return (
    <article
      aria-labelledby={headingId}
      className="card group flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lift focus-within:-translate-y-1.5 focus-within:shadow-lift"
    >
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-brand-secondary">
        {image ? (
          <>
            <Image
              src={image}
              alt={`Certification in ${title}, Lincoln Online`}
              fill
              sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-dark/35 via-transparent to-transparent" />
          </>
        ) : (
          <>
            <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-primary/30 blur-2xl" />
            <div aria-hidden className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-brand-accent/20 blur-2xl" />
            <Icon aria-hidden className="relative h-20 w-20 text-white/90 transition-transform duration-700 ease-out group-hover:scale-110" strokeWidth={1.4} />
          </>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-brand-accent px-3 py-1 text-xs font-bold text-brand-dark shadow-sm">
          Certification
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-extrabold tracking-[0.06em] text-brand-secondary shadow-sm backdrop-blur">
          Lincoln Online
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-sm font-medium text-neutral-600">
          <Icon aria-hidden className="h-4 w-4 text-brand-primary" />
          {domain.name}
        </p>
        <h3 id={headingId} className="mt-3 text-lg font-bold leading-snug sm:text-xl">
          Certification in {title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{focus}</p>

        <div className="mt-auto flex gap-3 pt-6">
          <a href={`/certifications/${id}`} aria-label={`View details: Certification in ${title}`} className="btn btn-primary btn-sm flex-1">
            View Details
            <ArrowRight aria-hidden className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => requestEnquiry(id)}
            aria-label={`Enquire about Certification in ${title}`}
            className="btn btn-outline btn-sm"
          >
            <MessageSquareText aria-hidden className="h-4 w-4" />
            Enquire
          </button>
        </div>
      </div>
    </article>
  );
}
