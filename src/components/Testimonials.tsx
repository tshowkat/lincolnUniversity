"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, UserRound } from "lucide-react";
import { PLACEHOLDER, TESTIMONIALS } from "@/data/content";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const total = TESTIMONIALS.length;
  const go = (next: number) => {
    setDir(next > index || (index === total - 1 && next === 0) ? 1 : -1);
    setIndex((next + total) % total);
  };
  const t = TESTIMONIALS[index];

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="section">
      <div className="container-x">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Student Stories"
          title={
            <>
              Hear from our <span className="text-gradient">Lincoln Online learners</span>
            </>
          }
        />
        <p className="mt-6 flex justify-center">
          <span className="placeholder-tag">{PLACEHOLDER} Placeholder layout. Replace with approved student testimonials.</span>
        </p>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Student testimonials"
          className="relative mx-auto mt-12 max-w-4xl"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(index + 1);
            if (e.key === "ArrowLeft") go(index - 1);
          }}
        >
          <div className="card relative overflow-hidden px-6 py-12 sm:px-14 sm:py-16">
            <Quote aria-hidden className="absolute left-6 top-6 h-16 w-16 text-brand-light sm:left-10 sm:top-8 sm:h-24 sm:w-24" strokeWidth={1.25} />
            <div aria-live="polite" className="relative min-h-[220px] sm:min-h-[180px]">
              <AnimatePresence mode="wait" initial={false} custom={dir}>
                <motion.div
                  key={index}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${total}`}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <figure>
                  <blockquote className="font-display text-xl font-semibold leading-relaxed text-brand-dark sm:text-2xl">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-brand-secondary/40 bg-brand-light text-brand-secondary">
                      <UserRound aria-hidden className="h-6 w-6" />
                      <span className="sr-only">Photo placeholder</span>
                    </span>
                    <span>
                      <span className="block font-bold text-brand-dark">{t.name}</span>
                      <span className="block text-sm text-neutral-600">
                        {t.programme} · {t.location}
                      </span>
                    </span>
                  </figcaption>
                  </figure>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-dark shadow-soft ring-1 ring-neutral-200 transition hover:text-brand-primary active:scale-95"
            >
              <ChevronLeft aria-hidden className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </button>
            <div className="flex items-center">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === index}
                  className="group inline-flex h-11 w-8 items-center justify-center"
                >
                  <span
                    className={cn(
                      "block h-2.5 rounded-full transition-all duration-300",
                      i === index ? "w-7 bg-brand-primary" : "w-2.5 bg-neutral-300 group-hover:bg-neutral-400",
                    )}
                  />
                  <span className="sr-only">Show testimonial {i + 1}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-dark shadow-soft ring-1 ring-neutral-200 transition hover:text-brand-primary active:scale-95"
            >
              <ChevronRight aria-hidden className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
