import { ArrowRight, CheckCircle2 } from "lucide-react";
import { LINKS } from "@/data/site";
import { Reveal } from "./Reveal";

export function CTABanner() {
  return (
    <section aria-labelledby="cta-title" className="pb-20 sm:pb-24 lg:pb-32">
      <div className="container-x">
        <Reveal>
          <div className="on-dark relative isolate overflow-hidden rounded-4xl bg-brand-gradient px-6 py-16 text-center shadow-lift sm:px-12 lg:py-20">
            <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
            <div aria-hidden className="absolute -bottom-32 -left-16 -z-10 h-96 w-96 rounded-full bg-brand-accent/15 blur-3xl" />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(rgb(255_255_255/0.5)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
            />
            <h2 id="cta-title" className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              Ready to start your degree <span className="text-brand-accent">online?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white">
              Check your eligibility in minutes, then apply online. No campus visit needed.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={LINKS.apply} className="btn btn-white h-14 px-8 text-base">
                Apply Now
                <ArrowRight aria-hidden className="h-5 w-5" />
              </a>
              <a href={LINKS.eligibility} className="btn btn-ghost-light h-14 px-8 text-base">
                <CheckCircle2 aria-hidden className="h-5 w-5" />
                Check Eligibility
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
