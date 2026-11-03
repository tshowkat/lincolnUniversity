import { LEVELS, programmes } from "@/data/programmes";
import { CERT_DOMAINS, certTitle, certificationsByDomain } from "@/data/certifications";

/** <option>s for every degree programme (by level) and certification (by domain). */
export function CourseOptions() {
  return (
    <>
      <option value="" disabled>
        Select a programme or certification
      </option>
      {LEVELS.map((level) => (
        <optgroup key={level} label={level}>
          {programmes
            .filter((p) => p.level === level)
            .map((p) => (
              <option key={p.id} value={p.id} className="text-brand-dark">
                {p.title}
              </option>
            ))}
        </optgroup>
      ))}
      {CERT_DOMAINS.map((d) => (
        <optgroup key={d.id} label={`Certification: ${d.name}`}>
          {certificationsByDomain(d.id).map((c) => (
            <option key={c.id} value={c.id} className="text-brand-dark">
              {certTitle(c)}
            </option>
          ))}
        </optgroup>
      ))}
    </>
  );
}
