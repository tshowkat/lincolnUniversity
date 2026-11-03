/**
 * Single source of truth for every Lincoln Online programme shown on the site.
 *
 * To add a programme: append an object to `programmes` below. Titles, images and
 * links must come from the official Lincoln University College website
 * (https://www.lincoln.edu.my/centre-of-odl/). Do not invent details here; the
 * "View Details" button sends visitors to `link` for fees, duration and entry requirements.
 */

export type Level = "PhD" | "Master's" | "Bachelor's" | "Diploma" | "Foundation";

export type Field =
  | "Business"
  | "IT & Computing"
  | "Health & Nursing"
  | "Education"
  | "Social Sciences"
  | "Engineering & Science"
  | "Hospitality";

export interface Programme {
  id: string;
  title: string;
  level: Level;
  field: Field;
  image: string;
  link: string;
}

/** Display order of level filters (highest award first, as on the official site). */
export const LEVELS: Level[] = ["PhD", "Master's", "Bachelor's", "Diploma", "Foundation"];

export const FIELDS: Field[] = [
  "Business",
  "IT & Computing",
  "Health & Nursing",
  "Education",
  "Social Sciences",
  "Engineering & Science",
  "Hospitality",
];

export const programmes: Programme[] = [
  // ───────────── PhD ─────────────
  {
    id: "phd-management",
    title: "Doctor of Philosophy in Management",
    level: "PhD",
    field: "Business",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/04/13511.jpeg",
    link: "https://www.lincoln.edu.my/doctor-of-philosophy-in-management/",
  },
  {
    id: "phd-accounting",
    title: "Doctor of Philosophy in Accounting",
    level: "PhD",
    field: "Business",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/04/13515.jpeg",
    link: "https://www.lincoln.edu.my/doctor-of-philosophy-in-accounting-odl/",
  },
  {
    id: "phd-social-sciences",
    title: "Doctor of Philosophy in Social Sciences",
    level: "PhD",
    field: "Social Sciences",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/03/3580.jpg",
    link: "https://www.lincoln.edu.my/doctor-of-philosophy-in-social-science-odl/",
  },
  {
    id: "phd-information-technology",
    title: "Doctor of Philosophy in Information Technology",
    level: "PhD",
    field: "IT & Computing",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/04/13522.jpeg",
    link: "https://www.lincoln.edu.my/doctor-of-philosophy-in-information-technology-2/",
  },

  // ───────────── Master's ─────────────
  {
    id: "mba",
    title: "Master of Business Administration",
    level: "Master's",
    field: "Business",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/04/13512.jpeg",
    link: "https://www.lincoln.edu.my/master-of-business-administration-2/",
  },
  {
    id: "mba-hospitality-management",
    title: "Master of Business Administration in Hospitality Management",
    level: "Master's",
    field: "Hospitality",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/04/13516.jpeg",
    link: "https://www.lincoln.edu.my/master-of-business-administration-in-hospitality-management-odl/",
  },
  {
    id: "master-nursing-public-health",
    title: "Master of Nursing (Public Health)",
    level: "Master's",
    field: "Health & Nursing",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/04/13518.jpeg",
    link: "https://www.lincoln.edu.my/master-of-nursing-public-health-odl/",
  },
  {
    id: "master-computer-science",
    title: "Master of Computer Science",
    level: "Master's",
    field: "IT & Computing",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/04/13523.jpeg",
    link: "https://www.lincoln.edu.my/master-of-computer-science-2/",
  },
  {
    id: "master-construction-management",
    title: "Master in Construction Management",
    level: "Master's",
    field: "Engineering & Science",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/06/1831.jpg",
    link: "https://www.lincoln.edu.my/master-in-construction-management-2/",
  },
  {
    id: "msc-biotechnology",
    title: "Master of Science in Biotechnology",
    level: "Master's",
    field: "Engineering & Science",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/08/pin.jpg",
    link: "https://www.lincoln.edu.my/master-of-science-in-biotechnology-odl/",
  },
  {
    id: "mba-human-resource-management",
    title: "Master of Business Administration in Human Resource Management",
    level: "Master's",
    field: "Business",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/06/Untitled-1.jpg",
    link: "https://www.lincoln.edu.my/master-of-business-administration-in-human-resource-management-2/",
  },
  {
    id: "mba-project-management",
    title: "Master of Business Administration in Project Management",
    level: "Master's",
    field: "Business",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/07/project.jpg",
    link: "https://www.lincoln.edu.my/master-of-business-administration-in-project-management-odl/",
  },
  {
    id: "master-education",
    title: "Master of Education",
    level: "Master's",
    field: "Education",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/07/edu.jpg",
    link: "https://www.lincoln.edu.my/master-of-education-odl/",
  },
  {
    id: "master-social-work",
    title: "Master of Social Work",
    level: "Master's",
    field: "Social Sciences",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/08/pin2.jpg",
    link: "https://www.lincoln.edu.my/master-of-social-work-odl/",
  },
  {
    id: "matesl",
    title: "Master of Arts in Teaching of English as Second Language (MATESL)",
    level: "Master's",
    field: "Education",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/07/Untitled-1.jpg",
    link: "https://www.lincoln.edu.my/master-of-arts-in-teaching-of-english-as-second-language-matesl-odl/",
  },

  // ───────────── Bachelor's ─────────────
  {
    id: "bachelor-early-childhood-education",
    title: "Bachelor in Early Childhood Education with Honours",
    level: "Bachelor's",
    field: "Education",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/07/swach.jpg",
    link: "https://www.lincoln.edu.my/bachelor-in-early-childhood-education-with-honours-odl/",
  },
  {
    id: "bachelor-business-administration",
    title: "Bachelor (Honours) in Business Administration",
    level: "Bachelor's",
    field: "Business",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/04/13513.jpeg",
    link: "https://www.lincoln.edu.my/bachelor-honours-in-business-administration-odl/",
  },
  {
    id: "bsc-hospitality-management",
    title: "Bachelor of Science (Honours) in Hospitality Management",
    level: "Bachelor's",
    field: "Hospitality",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/04/13517.jpeg",
    link: "https://www.lincoln.edu.my/bachelor-of-science-hons-in-hospitality-management-odl/",
  },
  {
    id: "bachelor-nursing-sciences",
    title: "Bachelor of Nursing Sciences (Hons.)",
    level: "Bachelor's",
    field: "Health & Nursing",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2026/06/Nursing-Sciences.jpeg",
    link: "https://www.lincoln.edu.my/bachelor-of-nursing-sciences-honours-odl/",
  },
  {
    id: "bachelor-psychology",
    title: "Bachelor of Psychology (Honours)",
    level: "Bachelor's",
    field: "Social Sciences",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/07/swach3.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-psychology-honours-odl/",
  },
  {
    id: "bba-human-resource-management",
    title: "Bachelor in Business Administration (Human Resource Management)",
    level: "Bachelor's",
    field: "Business",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/07/swach4.jpg",
    link: "https://www.lincoln.edu.my/bachelor-in-business-administration-human-resource-management-odl/",
  },
  {
    id: "bachelor-accountancy",
    title: "Bachelor of Accountancy",
    level: "Bachelor's",
    field: "Business",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/11/swatch-66.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-accountancy-odl/",
  },
  {
    id: "bachelor-information-technology",
    title: "Bachelor of Information Technology (Honours)",
    level: "Bachelor's",
    field: "IT & Computing",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/12/swatch-77.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-information-technology-honours-odl/",
  },
  {
    id: "bcs-network-technology-cybersecurity",
    title: "Bachelor in Computer Science (Network Technology and Cybersecurity) (Honours)",
    level: "Bachelor's",
    field: "IT & Computing",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2026/03/90413.jpg",
    link: "https://www.lincoln.edu.my/bachelor-in-computer-science-network-technology-and-cybersecurity-honours/",
  },

  // ───────────── Diploma ─────────────
  {
    id: "diploma-business-administration",
    title: "Diploma in Business Administration",
    level: "Diploma",
    field: "Business",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/07/DBA.jpeg",
    link: "https://www.lincoln.edu.my/diploma-in-business-administration-odl/",
  },
  {
    id: "diploma-accounting",
    title: "Diploma in Accounting",
    level: "Diploma",
    field: "Business",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/04/5633.jpg",
    link: "https://www.lincoln.edu.my/diploma-in-accounting-odl/",
  },
  {
    id: "diploma-pharmacy",
    title: "Diploma in Pharmacy",
    level: "Diploma",
    field: "Health & Nursing",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2026/06/candid-image.jpg",
    link: "https://www.lincoln.edu.my/diploma-in-pharmacy-odl/",
  },
  {
    id: "diploma-electrical-electronic-engineering",
    title: "Diploma in Electrical and Electronic Engineering",
    level: "Diploma",
    field: "Engineering & Science",
    image:
      "https://www.lincoln.edu.my/wp-content/uploads/2025/03/freepik__the-style-is-candid-image-photography-with-natural__13521.jpeg",
    link: "https://www.lincoln.edu.my/diploma-in-electrical-and-electronics-engineering-odl/",
  },

  // ───────────── Foundation ─────────────
  {
    id: "foundation-science",
    title: "Foundation in Science",
    level: "Foundation",
    field: "Engineering & Science",
    image:
      "https://www.lincoln.edu.my/wp-content/uploads/2025/03/freepik__the-style-is-candid-image-photography-with-natural__13524.jpeg",
    link: "https://www.lincoln.edu.my/foundation-in-science-odl/",
  },
  {
    id: "foundation-arts",
    title: "Foundation in Arts",
    level: "Foundation",
    field: "Social Sciences",
    image:
      "https://www.lincoln.edu.my/wp-content/uploads/2025/03/freepik__the-style-is-candid-image-photography-with-natural__13525.jpeg",
    link: "https://www.lincoln.edu.my/foundation-in-arts-odl/",
  },
];

export const programmeById = (id: string) => programmes.find((p) => p.id === id);
