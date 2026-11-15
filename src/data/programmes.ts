/**
 * Single source of truth for every Lincoln Online programme shown on the site.
 *
 * To add a programme: append an object to `programmes` below. Titles, images and
 * links must come from the official Lincoln University College website
 * (https://www.lincoln.edu.my/centre-of-odl/, or the school pages such as
 * https://www.lincoln.edu.my/school-of-business-management/). Every programme listed here is
 * offered online through Lincoln Online. Do not invent details here; the
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
  | "Hospitality"
  | "Arts & Design";

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
  "Arts & Design",
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

  // From the school pages on lincoln.edu.my (all offered online via Lincoln Online)
  {
    id: "bba-health-administration",
    title: "Bachelor in Business Administration with Health Administration (Honours)",
    level: "Bachelor's",
    field: "Business",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/07/swach-2.jpg",
    link: "https://www.lincoln.edu.my/bachelor-in-business-administration-with-health-administration-honours/",
  },
  {
    id: "bachelor-management-oil-gas",
    title: "Bachelor of Management (Oil and Gas Management)",
    level: "Bachelor's",
    field: "Business",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/96.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-management-oil-and-gas-management/",
  },
  {
    id: "bachelor-business-entrepreneurship",
    title: "Bachelor of Business Entrepreneurship",
    level: "Bachelor's",
    field: "Business",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/13857.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-business-entrepreneurship/",
  },
  {
    id: "bba-airline-airport-management",
    title: "Bachelor of Business Administration in Airline and Airport Management",
    level: "Bachelor's",
    field: "Business",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/18981.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-business-administration-in-airline-and-airport-management/",
  },
  {
    id: "bba-accounting",
    title: "Bachelor of Business Administration in Accounting",
    level: "Bachelor's",
    field: "Business",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/16088.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-business-administration-in-accounting/",
  },
  {
    id: "bachelor-finance",
    title: "Bachelor of Finance",
    level: "Bachelor's",
    field: "Business",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/07/Bachelor-of-Finance.jpeg",
    link: "https://www.lincoln.edu.my/bachelor-of-finance/",
  },
  {
    id: "bachelor-tourism-management",
    title: "Bachelor in Tourism Management",
    level: "Bachelor's",
    field: "Hospitality",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/44801.jpg",
    link: "https://www.lincoln.edu.my/bachelor-in-tourism-management/",
  },
  {
    id: "bachelor-education",
    title: "Bachelor of Education",
    level: "Bachelor's",
    field: "Education",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/1914.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-education/",
  },
  {
    id: "bachelor-education-tesl",
    title: "Bachelor of Education in Teaching of English as a Second Language (TESL)",
    level: "Bachelor's",
    field: "Education",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/2149272227.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-education-teaching-of-english-as-a-second-language-tesl/",
  },
  {
    id: "bachelor-mass-communication",
    title: "Bachelor of Arts in Mass Communication (Honours)",
    level: "Bachelor's",
    field: "Social Sciences",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/03/156463.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-arts-in-mass-communication-honours/",
  },
  {
    id: "bachelor-business-information-systems",
    title: "Bachelor of Business Information Systems",
    level: "Bachelor's",
    field: "IT & Computing",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/03/21821.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-business-information-systems/",
  },
  {
    id: "bit-data-analytics",
    title: "Bachelor of Information Technology (Honours) (Data Analytics)",
    level: "Bachelor's",
    field: "IT & Computing",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/Data-Analytics.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-information-technology-honours-data-analytics/",
  },
  {
    id: "bit-internet-technology-cloud-computing",
    title: "Bachelor of Information Technology (Honours) (Internet Technology and Cloud Computing)",
    level: "Bachelor's",
    field: "IT & Computing",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/Cloud-Computing.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-information-technology-honours-internet-technology-and-cloud-computing/",
  },
  {
    id: "bcs-artificial-intelligence",
    title: "Bachelor of Computer Science (Honours) (Artificial Intelligence)",
    level: "Bachelor's",
    field: "IT & Computing",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/2150714236.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-computer-science-honours-artificial-intelligence/",
  },
  {
    id: "bcs-e-commerce",
    title: "Bachelor of Computer Science with E-Commerce",
    level: "Bachelor's",
    field: "IT & Computing",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/E-Commerce.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-computer-science-with-e-commerce/",
  },
  {
    id: "ba-creative-multimedia-technology",
    title: "Bachelor of Arts (Honours) in Creative Multimedia Technology",
    level: "Bachelor's",
    field: "Arts & Design",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/Multimedia-Technology.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-arts-honours-in-creative-multimedia-technology/",
  },
  {
    id: "bachelor-digital-film-technology",
    title: "Bachelor in Digital Film Technology (Honours)",
    level: "Bachelor's",
    field: "Arts & Design",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/Digital-Film-Technology.jpg",
    link: "https://www.lincoln.edu.my/bachelor-in-digital-film-technology-honours/",
  },
  {
    id: "bachelor-fashion-design-management",
    title: "Bachelor in Fashion Design Management (Honours)",
    level: "Bachelor's",
    field: "Arts & Design",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/03/608.jpg",
    link: "https://www.lincoln.edu.my/bachelor-in-fashion-design-management-honours/",
  },
  {
    id: "bachelor-civil-engineering-technology",
    title: "Bachelor of Civil Engineering Technology with Honours",
    level: "Bachelor's",
    field: "Engineering & Science",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/122980.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-civil-engineering-technology-with-honours/",
  },
  {
    id: "bachelor-electrical-electronics-engineering-technology",
    title: "Bachelor of Electrical and Electronics Engineering Technology with Honours",
    level: "Bachelor's",
    field: "Engineering & Science",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/40.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-electrical-and-electronics-engineering-technology-hons-2/",
  },
  {
    id: "bachelor-mechanical-engineering-technology-aeronautics",
    title: "Bachelor of Mechanical Engineering Technology (Aeronautics) with Honours",
    level: "Bachelor's",
    field: "Engineering & Science",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/9515.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-mechanical-engineering-technology-aeronautics-with-honours/",
  },
  {
    id: "bachelor-mechanical-engineering-technology",
    title: "Bachelor of Mechanical Engineering Technology with Honours",
    level: "Bachelor's",
    field: "Engineering & Science",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/4759.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-mechanical-engineering-technology-with-honours/",
  },
  {
    id: "bachelor-mechatronics-engineering-technology",
    title: "Bachelor of Mechatronics Engineering Technology with Honours",
    level: "Bachelor's",
    field: "Engineering & Science",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/115.jpg",
    link: "https://www.lincoln.edu.my/bachelor-of-mechatronics-engineering-technology-with-honours/",
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

  // From the school pages on lincoln.edu.my (all offered online via Lincoln Online)
  {
    id: "diploma-hotel-management",
    title: "Diploma in Hotel Management",
    level: "Diploma",
    field: "Hospitality",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/03/42054.jpg",
    link: "https://www.lincoln.edu.my/diploma-in-hotel-management/",
  },
  {
    id: "diploma-culinary-arts",
    title: "Diploma in Culinary Arts",
    level: "Diploma",
    field: "Hospitality",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/03/5975.jpg",
    link: "https://www.lincoln.edu.my/diploma-in-culinary-arts/",
  },
  {
    id: "diploma-tesl",
    title: "Diploma in Teaching English as a Second Language",
    level: "Diploma",
    field: "Education",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/40120.jpg",
    link: "https://www.lincoln.edu.my/diploma-in-teaching-english-as-a-second-language/",
  },
  {
    id: "diploma-early-childhood-education",
    title: "Diploma in Early Childhood Education",
    level: "Diploma",
    field: "Education",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/18713.jpg",
    link: "https://www.lincoln.edu.my/diploma-in-early-childhood-education/",
  },
  {
    id: "diploma-psychology",
    title: "Diploma in Psychology",
    level: "Diploma",
    field: "Social Sciences",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/03/7297.jpg",
    link: "https://www.lincoln.edu.my/diploma-in-psychology/",
  },
  {
    id: "diploma-computer-science",
    title: "Diploma in Computer Science",
    level: "Diploma",
    field: "IT & Computing",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/Computer-Science.jpg",
    link: "https://www.lincoln.edu.my/diploma-in-computer-science/",
  },
  {
    id: "diploma-multimedia-applications",
    title: "Diploma in Multimedia Applications",
    level: "Diploma",
    field: "Arts & Design",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/Multimedia-Applications.jpg",
    link: "https://www.lincoln.edu.my/diploma-in-multimedia-applications/",
  },
  {
    id: "diploma-aeronautical-engineering-technology",
    title: "Diploma in Aeronautical Engineering Technology (Aircraft Maintenance)",
    level: "Diploma",
    field: "Engineering & Science",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/02/6385.jpg",
    link: "https://www.lincoln.edu.my/diploma-in-aeronautical-engineering-technology-aircraft-maintenance/",
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
  // From the school pages on lincoln.edu.my (all offered online via Lincoln Online)
  {
    id: "foundation-business-computing",
    title: "Foundation in Business and Computing",
    level: "Foundation",
    field: "Business",
    image: "https://www.lincoln.edu.my/wp-content/uploads/2025/07/Foundation-in-Business-and-Computing2.jpeg",
    link: "https://www.lincoln.edu.my/foundation-in-business-and-computing/",
  },
];

export const programmeById = (id: string) => programmes.find((p) => p.id === id);
