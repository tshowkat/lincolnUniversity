/**
 * Engineering certification programmes offered by Lincoln Online, grouped into 12 domains.
 * Source: "Engineering Programs – Domain-wise List" (72 programmes).
 *
 * To add a certification: append `[id-suffix, title, focus]` to the right domain below.
 * Ids are prefixed with `cert-` so they never collide with degree programme ids.
 * Fees, duration and entry requirements are not listed here; the admissions team sends them on request.
 */
import {
  Building2,
  Cog,
  Cpu,
  Dna,
  FlaskConical,
  Leaf,
  Pickaxe,
  Plane,
  RadioTower,
  Shirt,
  Wheat,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { CERT_IMAGE_IDS } from "./cert-images";

export interface CertDomain {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface Certification {
  id: string;
  title: string;
  focus: string;
  domain: CertDomain;
  /** AI-generated cover image in public/images/certifications, when one exists. */
  image?: string;
}

type Row = [slug: string, title: string, focus: string];

const DATA: Array<Omit<CertDomain, "icon"> & { icon: LucideIcon; items: Row[] }> = [
  {
    id: "computer-science-it",
    name: "Computer Science & IT",
    icon: Cpu,
    items: [
      ["computer-science-engineering", "Computer Science & Engineering", "Programming, algorithms, systems, networks and software design"],
      ["information-technology", "Information Technology", "Software applications, databases, networking and IT infrastructure"],
      ["software-engineering", "Software Engineering", "Systematic design, testing and maintenance of large software systems"],
      ["ai-machine-learning", "Artificial Intelligence & Machine Learning", "Intelligent systems, deep learning, NLP and computer vision"],
      ["ai-data-science", "Artificial Intelligence & Data Science", "AI techniques combined with data analytics and statistics"],
      ["data-science", "Data Science", "Data collection, analysis, visualisation and predictive modelling"],
      ["cyber-security", "Cyber Security", "Network security, cryptography, ethical hacking and digital forensics"],
      ["internet-of-things", "Internet of Things (IoT)", "Connected devices, sensors, embedded software and cloud integration"],
      ["cloud-computing", "Cloud Computing", "Distributed systems, virtualisation and cloud platforms"],
      ["blockchain-technology", "Blockchain Technology", "Distributed ledgers, smart contracts and decentralised applications"],
      ["computer-communication-engineering", "Computer & Communication Engineering", "Blend of computer science and communication systems"],
      ["mathematics-computing", "Mathematics & Computing", "Applied mathematics, scientific computing and algorithms"],
    ],
  },
  {
    id: "electronics-communication",
    name: "Electronics & Communication",
    icon: RadioTower,
    items: [
      ["electronics-communication-engineering", "Electronics & Communication Engineering", "Circuits, signal processing, communication and embedded systems"],
      ["telecommunication-engineering", "Telecommunication Engineering", "Wired and wireless communication networks and protocols"],
      ["vlsi-design-microelectronics", "VLSI Design / Microelectronics", "Integrated circuit and chip design and fabrication"],
      ["embedded-systems", "Embedded Systems", "Microcontroller-based hardware and real-time software"],
      ["electronics-computer-engineering", "Electronics & Computer Engineering", "Electronics hardware integrated with computing"],
      ["medical-electronics", "Medical Electronics", "Electronic instrumentation for healthcare and diagnostics"],
    ],
  },
  {
    id: "electrical-instrumentation",
    name: "Electrical & Instrumentation",
    icon: Zap,
    items: [
      ["electrical-engineering", "Electrical Engineering", "Power generation, transmission, machines and control"],
      ["electrical-electronics-engineering", "Electrical & Electronics Engineering", "Electrical power systems combined with electronics"],
      ["electronics-instrumentation-engineering", "Electronics & Instrumentation Engineering", "Measurement, sensors and industrial instrumentation"],
      ["instrumentation-control-engineering", "Instrumentation & Control Engineering", "Process control, automation and control systems"],
      ["power-systems-engineering", "Power Systems Engineering", "Grid design, power distribution and protection"],
    ],
  },
  {
    id: "mechanical",
    name: "Mechanical",
    icon: Cog,
    items: [
      ["mechanical-engineering", "Mechanical Engineering", "Thermodynamics, mechanics, design and manufacturing"],
      ["mechatronics-engineering", "Mechatronics Engineering", "Integration of mechanical, electronic and computer systems"],
      ["robotics-automation", "Robotics & Automation", "Design and control of robots and automated systems"],
      ["industrial-production-engineering", "Industrial & Production Engineering", "Production planning, operations and process optimisation"],
      ["manufacturing-engineering", "Manufacturing Engineering", "Manufacturing processes, CAD/CAM and quality control"],
      ["industrial-engineering-management", "Industrial Engineering & Management", "Engineering systems combined with management principles"],
      ["thermal-engineering", "Thermal Engineering", "Heat transfer, energy conversion and thermal systems"],
    ],
  },
  {
    id: "automotive-aerospace-marine",
    name: "Automotive, Aerospace & Marine",
    icon: Plane,
    items: [
      ["automobile-engineering", "Automobile Engineering", "Design, manufacture and maintenance of vehicles"],
      ["aeronautical-engineering", "Aeronautical Engineering", "Aircraft design, aerodynamics and propulsion within the atmosphere"],
      ["aerospace-engineering", "Aerospace Engineering", "Aircraft and spacecraft design, including space systems"],
      ["marine-engineering", "Marine Engineering", "Ship machinery, propulsion and onboard systems"],
      ["naval-architecture-ocean-engineering", "Naval Architecture & Ocean Engineering", "Ship design, offshore structures and ocean systems"],
      ["railway-engineering", "Railway Engineering", "Rail vehicles, track systems and railway operations"],
    ],
  },
  {
    id: "civil-infrastructure",
    name: "Civil & Infrastructure",
    icon: Building2,
    items: [
      ["civil-engineering", "Civil Engineering", "Buildings, roads, bridges, water supply and infrastructure"],
      ["structural-engineering", "Structural Engineering", "Analysis and design of load-bearing structures"],
      ["construction-technology-management", "Construction Technology & Management", "Construction methods, planning and project management"],
      ["transportation-engineering", "Transportation Engineering", "Highways, traffic systems and transport planning"],
      ["geotechnical-engineering", "Geotechnical Engineering", "Soil mechanics, foundations and earth structures"],
      ["water-resources-engineering", "Water Resources Engineering", "Hydrology, irrigation and water management"],
      ["architecture", "Architecture", "Building design and planning"],
    ],
  },
  {
    id: "chemical-process",
    name: "Chemical & Process",
    icon: FlaskConical,
    items: [
      ["chemical-engineering", "Chemical Engineering", "Chemical processes, reactors and process plant design"],
      ["petroleum-engineering", "Petroleum Engineering", "Oil and gas exploration, drilling and refining"],
      ["polymer-engineering", "Polymer Engineering", "Polymer science, processing and applications"],
      ["plastics-engineering", "Plastics Engineering", "Plastic materials, moulding and product design"],
      ["ceramic-engineering", "Ceramic Engineering", "Ceramics, glass and refractory materials"],
      ["paper-pulp-technology", "Paper & Pulp Technology", "Paper manufacturing and pulp processing"],
      ["leather-technology", "Leather Technology", "Leather processing, tanning and product manufacture"],
    ],
  },
  {
    id: "materials-mining",
    name: "Materials & Mining",
    icon: Pickaxe,
    items: [
      ["metallurgical-materials-engineering", "Metallurgical & Materials Engineering", "Metals, alloys and advanced materials"],
      ["mining-engineering", "Mining Engineering", "Mineral extraction, mine planning and safety"],
      ["nanotechnology", "Nanotechnology", "Materials and devices at the nanometre scale"],
      ["engineering-physics", "Engineering Physics", "Applied physics for advanced technology and research"],
    ],
  },
  {
    id: "biotechnology-healthcare",
    name: "Biotechnology & Healthcare",
    icon: Dna,
    items: [
      ["biotechnology", "Biotechnology", "Biological systems applied to industry, medicine and agriculture"],
      ["biomedical-engineering", "Biomedical Engineering", "Medical devices, imaging and healthcare technology"],
      ["bioinformatics", "Bioinformatics", "Computational analysis of biological data"],
      ["genetic-engineering", "Genetic Engineering", "Gene manipulation and molecular biology techniques"],
      ["pharmaceutical-engineering", "Pharmaceutical Engineering", "Drug manufacturing processes and equipment"],
    ],
  },
  {
    id: "energy-environment",
    name: "Energy & Environment",
    icon: Leaf,
    items: [
      ["environmental-engineering", "Environmental Engineering", "Pollution control, waste management and sustainability"],
      ["energy-engineering", "Energy Engineering", "Energy generation, conservation and management"],
      ["renewable-energy-engineering", "Renewable Energy Engineering", "Solar, wind, hydro and other clean energy systems"],
      ["nuclear-engineering", "Nuclear Engineering", "Nuclear reactors, radiation and nuclear power"],
      ["fire-safety-engineering", "Fire & Safety Engineering", "Fire prevention, industrial safety and hazard control"],
    ],
  },
  {
    id: "agriculture-food",
    name: "Agriculture & Food",
    icon: Wheat,
    items: [
      ["agricultural-engineering", "Agricultural Engineering", "Farm machinery, irrigation and post-harvest technology"],
      ["food-technology", "Food Technology", "Food processing, preservation and quality control"],
      ["dairy-technology", "Dairy Technology", "Milk processing and dairy product manufacture"],
      ["silk-technology", "Silk Technology", "Silk production, processing and textile applications"],
    ],
  },
  {
    id: "textile-printing-design",
    name: "Textile, Printing & Design",
    icon: Shirt,
    items: [
      ["textile-engineering", "Textile Engineering", "Fibre science, yarn and fabric manufacturing"],
      ["fashion-technology", "Fashion Technology", "Apparel production and fashion manufacturing technology"],
      ["printing-packaging-technology", "Printing & Packaging Technology", "Printing processes and packaging design"],
      ["industrial-design", "Industrial Design", "Product design combining engineering and aesthetics"],
    ],
  },
];

export const CERT_DOMAINS: CertDomain[] = DATA.map(({ id, name, icon }) => ({ id, name, icon }));

export const certifications: Certification[] = DATA.flatMap((d, i) =>
  d.items.map(([slug, title, focus]) => {
    const id = `cert-${slug}`;
    return { id, title, focus, domain: CERT_DOMAINS[i], image: CERT_IMAGE_IDS.has(id) ? `/images/certifications/${id}.jpg` : undefined };
  }),
);

export const certificationById = (id: string) => certifications.find((c) => c.id === id);

export const certificationsByDomain = (domainId: string) => certifications.filter((c) => c.domain.id === domainId);

/** Full display name, e.g. "Certification in Data Science". */
export const certTitle = (c: Pick<Certification, "title">) => `Certification in ${c.title}`;
