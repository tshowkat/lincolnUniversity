import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface Props {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, description, align = "center", className }: Props) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className="eyebrow">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[44px]">
        {title}
      </h2>
      {description && <p className="mt-5 text-lg leading-relaxed text-neutral-600">{description}</p>}
    </Reveal>
  );
}
