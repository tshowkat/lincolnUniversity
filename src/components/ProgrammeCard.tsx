import Image from "next/image";
import { ArrowRight, MessageSquareText } from "lucide-react";
import type { Programme } from "@/data/programmes";
import { FIELD_ICON, LEVEL_BADGE } from "@/lib/levels";
import { cn, requestEnquiry } from "@/lib/utils";

export function ProgrammeCard({ programme }: { programme: Programme }) {
  const { id, title, level, field, image } = programme;
  const FieldIcon = FIELD_ICON[field];
  const headingId = `prog-${id}`;

  return (
    <article
      aria-labelledby={headingId}
      className="card group flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lift focus-within:-translate-y-1.5 focus-within:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-light">
        <Image
          src={image}
          alt={`${title} — ${level} programme by Lincoln Online`}
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-dark/35 via-transparent to-transparent" />
        <span className={cn("absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold shadow-sm", LEVEL_BADGE[level])}>
          {level}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-extrabold tracking-[0.06em] text-brand-secondary shadow-sm backdrop-blur">
          Lincoln Online
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-sm font-medium text-neutral-600">
          <FieldIcon aria-hidden className="h-4 w-4 text-brand-primary" />
          {field}
        </p>
        <h3 id={headingId} className="mt-3 text-lg font-bold leading-snug sm:text-xl">
          {title}
        </h3>

        <div className="mt-auto flex gap-3 pt-6">
          <a
            href={`/programmes/${id}`}
            aria-label={`View details: ${title}`}
            className="btn btn-primary btn-sm flex-1"
          >
            View Details
            <ArrowRight aria-hidden className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => requestEnquiry(id)}
            aria-label={`Enquire about ${title}`}
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
