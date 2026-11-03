import { Award, Briefcase, CalendarClock, Globe2, LifeBuoy, MonitorSmartphone, type LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const REASONS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: CalendarClock,
    title: "Flexible schedule",
    body: "Plan your study hours around work, family and other commitments instead of a fixed timetable.",
  },
  {
    icon: Globe2,
    title: "Study from anywhere",
    body: "Learn from home, the office or on the move. All you need is an internet connection.",
  },
  {
    icon: Award,
    title: "Recognised qualification",
    body: "Graduate with an award from Lincoln University College. Accreditation details are listed on each official programme page.",
  },
  {
    icon: MonitorSmartphone,
    title: "Online learning portal",
    body: "Access your learning materials and coursework through the Lincoln Online Portal on desktop or mobile.",
  },
  {
    icon: LifeBuoy,
    title: "Academic support",
    body: "Stay connected with lecturers and the Lincoln Online team for guidance throughout your studies.",
  },
  {
    icon: Briefcase,
    title: "Career-ready",
    body: "Apply what you learn in your current role while you work towards your next career move.",
  },
];

export function WhyODL() {
  return (
    <section id="why-odl" aria-labelledby="why-title" className="section relative overflow-hidden">
      <div aria-hidden className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="container-x">
        <SectionHeading
          id="why-title"
          eyebrow="Why Lincoln Online"
          title={
            <>
              Your degree, <span className="text-gradient">on your terms</span>
            </>
          }
          description="Lincoln Online gives you the structure of a university programme with the flexibility to study wherever you are."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {REASONS.map(({ icon: Icon, title, body }, i) => (
            <li key={title}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <div className="card group relative h-full overflow-hidden p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div
                    aria-hidden
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-light transition-transform duration-500 group-hover:scale-150"
                  />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary text-white shadow-glow transition-transform duration-300 group-hover:-rotate-6">
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>
                  <h3 className="relative mt-6 text-xl font-bold">{title}</h3>
                  <p className="relative mt-3 leading-relaxed text-neutral-600">{body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
