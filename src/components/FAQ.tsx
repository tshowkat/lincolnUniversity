"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { FAQS, PLACEHOLDER } from "@/data/content";
import { LINKS } from "@/data/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

export function FAQ({ showMoreLink = true }: { showMoreLink?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="section bg-neutral-50/70">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            id="faq-title"
            align="left"
            eyebrow="FAQs"
            title="Questions about studying online?"
            description="Quick answers to common questions. For anything else, send us an enquiry."
          />
          <p className="mt-6">
            <span className="placeholder-tag">{PLACEHOLDER} Answers to be supplied by LUC.</span>
          </p>
          {showMoreLink && (
            <a href={`${LINKS.faqs}#ask`} className="btn btn-secondary btn-sm mt-8">
              Ask a question
              <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
          )}
        </div>

        <ul className="space-y-3 lg:col-span-8">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const btnId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <li key={f.question} className={cn("card overflow-hidden transition-shadow", isOpen && "shadow-lift")}>
                <h3 className="text-base sm:text-lg">
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-[64px] w-full items-center justify-between gap-4 rounded-3xl px-6 py-4 text-left font-bold text-brand-dark transition-colors hover:text-brand-deep"
                  >
                    {f.question}
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-300",
                        isOpen ? "rotate-45 bg-brand-primary text-white" : "bg-brand-light text-brand-primary",
                      )}
                    >
                      <Plus aria-hidden className="h-5 w-5" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-6 leading-relaxed text-neutral-600">{f.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
