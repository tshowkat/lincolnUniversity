/**
 * Editorial content. Anything marked [CLIENT TO PROVIDE] is a placeholder that
 * must be replaced with approved copy before launch.
 */

export const PLACEHOLDER = "[CLIENT TO PROVIDE]";

export interface Testimonial {
  quote: string;
  name: string;
  programme: string;
  location: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: `${PLACEHOLDER} Student testimonial — a short quote (2–3 sentences) about studying a Lincoln Online programme at Lincoln University College.`,
    name: `${PLACEHOLDER} Student name`,
    programme: `${PLACEHOLDER} Programme`,
    location: `${PLACEHOLDER} Country`,
  },
  {
    quote: `${PLACEHOLDER} Graduate testimonial — how flexible online study fitted around their work and family.`,
    name: `${PLACEHOLDER} Graduate name`,
    programme: `${PLACEHOLDER} Programme`,
    location: `${PLACEHOLDER} Country`,
  },
  {
    quote: `${PLACEHOLDER} Learner testimonial — their experience with the Lincoln Online Portal and academic support.`,
    name: `${PLACEHOLDER} Learner name`,
    programme: `${PLACEHOLDER} Programme`,
    location: `${PLACEHOLDER} Country`,
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "What is Lincoln Online?",
    answer: `${PLACEHOLDER} Explain how Lincoln Online works: delivery mode, learning materials and interaction with lecturers.`,
  },
  {
    question: "Is a Lincoln Online qualification the same as an on-campus qualification?",
    answer: `${PLACEHOLDER} Confirm how the award, transcript and recognition compare with on-campus study, citing official accreditation references.`,
  },
  {
    question: "What are the entry requirements?",
    answer: `${PLACEHOLDER} Summarise entry requirements by level, or direct applicants to the online eligibility checker and the official programme pages.`,
  },
  {
    question: "How much are the tuition fees, and are scholarships available?",
    answer: `${PLACEHOLDER} Provide fee information or a link to the official fee schedule, plus scholarship and instalment details.`,
  },
  {
    question: "How are assessments and examinations conducted?",
    answer: `${PLACEHOLDER} Describe assignment, online assessment and examination arrangements, referencing the Examination Rules & Regulations.`,
  },
  {
    question: "Can I study while working full-time?",
    answer: `${PLACEHOLDER} Describe the expected weekly study hours and how learners can plan their schedule.`,
  },
  {
    question: "When are the intakes, and how long does it take to apply?",
    answer: `${PLACEHOLDER} List intake months and the typical application processing time.`,
  },
];
