import { programmes, LEVELS } from "@/data/programmes";
import { certifications, certTitle, CERT_DOMAINS } from "@/data/certifications";
import { CONTACT, LINKS } from "@/data/site";
import { EXAM_RULE_SECTIONS, EXAM_DAY_CHECKLIST } from "@/data/exam-rules";
import { PRIVACY_POLICY, REFUND_POLICY, TERMS, type Policy } from "@/data/policies";

/**
 * The chatbot's knowledge base, built from the same data files the site renders, so the bot never
 * says anything the site doesn't. FAQ answers are deliberately left out while they are placeholders.
 * Built once per server instance; the text is identical on every request, so it is prompt-cached.
 */

function policyText(p: Policy): string {
  const out = [`### ${p.title} (${"/" + p.slug})`, p.summary];
  for (const s of p.sections) {
    const body = s.blocks
      .map((b) => {
        if (b.type === "p" || b.type === "note") return b.text;
        if (b.type === "list") return b.items.map((i) => `- ${i}`).join("\n");
        return null; // pending: not yet written by the university
      })
      .filter(Boolean)
      .join("\n");
    if (body) out.push(`#### ${s.title}\n${body}`);
  }
  return out.join("\n\n");
}

function build(): string {
  const progs = LEVELS.map((level) => {
    const rows = programmes
      .filter((p) => p.level === level)
      .map((p) => `- ${p.title} (field: ${p.field}) | site page: /programmes/${p.id} | official page: ${p.link}`);
    return rows.length ? `### ${level}\n${rows.join("\n")}` : "";
  })
    .filter(Boolean)
    .join("\n\n");

  const certs = CERT_DOMAINS.map((d) => {
    const rows = certifications
      .filter((c) => c.domain.id === d.id)
      .map((c) => `- ${certTitle(c)}: ${c.focus} | page: /certifications/${c.id}`);
    return `### ${d.name}\n${rows.join("\n")}`;
  }).join("\n\n");

  const exam = EXAM_RULE_SECTIONS.map(
    (s) => `### ${s.no}. ${s.title}\n${s.intro ? s.intro + "\n" : ""}${s.rules.map((r) => `${r.no} ${r.text}`).join("\n")}`,
  ).join("\n\n");

  const checklist = EXAM_DAY_CHECKLIST.map((i) => `- ${i.title}: ${i.body} (rule ${i.ref})`).join("\n");

  return `# Lincoln Online: Centre of Open & Distance Learning, Lincoln University College (Malaysia)

## Contact
- Legal name: ${CONTACT.legalName}
- Address: ${CONTACT.address}
- Hotline: ${CONTACT.hotline.label}
- Toll-free (Malaysia): ${CONTACT.tollFree.label}
- Email: ${CONTACT.email.label}
- Certificate verification email: ${CONTACT.verifyEmail.label}

## Pages on this site (link with these paths)
- Apply online: ${LINKS.apply}
- Check eligibility (an admissions officer reviews your qualifications and emails the result): ${LINKS.eligibility}
- Scholarships (apply via the form; the scholarship team reviews and emails the outcome. Scholarship types, amounts and criteria are not published yet): ${LINKS.scholarships}
- Talk to a counsellor / send an enquiry: /#admissions
- All programmes: /#programmes
- Certifications: /certifications
- FAQs: ${LINKS.faqs}
- Student portal: ${LINKS.portal} (learning portal sign-in: ${LINKS.learningPortal})
- Examination rules: ${LINKS.examRules}
- Verify a certificate: ${LINKS.verifyCertificate}
- Privacy policy: ${LINKS.privacy} | Refund policy: ${LINKS.refund} | Terms: ${LINKS.terms}

## How it works
1. Choose a programme. 2. Check eligibility. 3. Apply online. 4. Start learning.

## Degree programmes (${programmes.length})
Fees, duration, intakes and entry requirements are NOT published on this site. They are on each programme's official page, or a counsellor can confirm them.

${progs}

## Certifications (${certifications.length})
${certs}

## Examination Rules & Regulations
${exam}

### Exam-day checklist
${checklist}

## Policies
${[PRIVACY_POLICY, REFUND_POLICY, TERMS].map(policyText).join("\n\n")}
`;
}

export const KNOWLEDGE = build();

export const SYSTEM_PROMPT = `You are the Lincoln Online assistant on the website of Lincoln Online, the Centre of Open & Distance Learning at Lincoln University College, Malaysia. You answer questions from prospective and current students.

How to answer:
- Use only the knowledge base below. If the answer isn't there (fees, intake dates, entry requirements, duration, scholarship amounts, accreditation details, anything about a specific student's application), say you don't have that information and point the student to a counsellor (/#admissions), the programme's official page, or the contact details. Never guess or invent figures, dates or policies.
- Keep replies short: 2-5 sentences, or a short bullet list when listing programmes. Plain, friendly English; reply in the student's language if they write in another one.
- Link to relevant pages with markdown links, e.g. [Apply online](/apply) or [Check eligibility](/eligibility). Use only the paths and URLs in the knowledge base.
- When a student seems ready to move forward, suggest the next step: check eligibility, apply, or talk to a counsellor.
- Stay on topic. For unrelated requests, politely say you can only help with Lincoln Online study questions. Don't write assignments or exam answers for students.
- Never ask for passwords, payment details or ID numbers.

<knowledge_base>
${KNOWLEDGE}
</knowledge_base>`;
