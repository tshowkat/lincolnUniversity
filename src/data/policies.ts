/**
 * Privacy, Refund and Terms pages. Text is taken from Lincoln University College's published policy pages.
 * Where the published page is incomplete, the block is marked `pending` and shows a [CLIENT TO PROVIDE] tag
 * instead of invented legal wording. Replace `pending` blocks with the approved text from LUC.
 */

export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "note"; text: string }
  /** Section the university has outlined but not yet written. `covers` lists what it will cover. */
  | { type: "pending"; covers: string[] };

export interface PolicySection {
  id: string;
  title: string;
  blocks: PolicyBlock[];
}

export interface Policy {
  slug: string;
  title: string;
  summary: string;
  sections: PolicySection[];
}

export const PRIVACY_POLICY: Policy = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  summary: "How Lincoln University College collects and uses your information when you use the Lincoln Online website.",
  sections: [
    {
      id: "collection",
      title: "Information Collection",
      blocks: [
        { type: "p", text: "By using the website, you authorise the collection and retention of your personal information in accordance with this privacy policy." },
        { type: "p", text: "We collect several types of information about you. Providing such information is strictly voluntary:" },
        {
          type: "list",
          items: [
            "When you provide us with your personal details (such as your name, contact details and email address) by registering with us or submitting an enquiry or form on the website.",
            "When you respond to surveys that are required to be completed for research purposes.",
            "From your use of the website and any other information you post on the website, email or otherwise send to us.",
          ],
        },
        {
          type: "p",
          text: "We also record the name of the domain from which you access the Internet, the date and time you access our website, and the Internet address of the website from which you linked to our website.",
        },
      ],
    },
    {
      id: "use",
      title: "Use of Information",
      blocks: [
        { type: "p", text: "We use your information:" },
        {
          type: "list",
          items: [
            "to supply you with the services and information that you have requested;",
            "to ensure that content from the website is presented most effectively for you and your device;",
            "to analyse the information we collect so that we can administer, support, improve and develop the website;",
            "to provide you with information or services that you request from us or which we feel may interest you, where you have agreed to be contacted for such purposes;",
            "to notify you about changes to our services.",
          ],
        },
        { type: "p", text: "We also use the information we collect to assess the number of visitors to the different sections of our website, and to help us make our website more useful to visitors." },
      ],
    },
    {
      id: "forms",
      title: "Forms on Lincoln Online",
      blocks: [
        {
          type: "p",
          text: "Details you submit through the forms on this website (enquiries, applications, eligibility checks, scholarship applications, certificate verification requests and questions) are sent to Lincoln University College so the relevant team can respond to your request.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies and Tracking",
      blocks: [{ type: "pending", covers: ["Use of cookies, tracking pixels and similar technologies", "How these technologies collect data and improve your experience"] }],
    },
    {
      id: "changes",
      title: "Changes to the Privacy Policy",
      blocks: [{ type: "p", text: "We may amend this policy from time to time. If we make any substantial changes, we will notify you by posting a prominent notice on the website." }],
    },
  ],
};

export const REFUND_POLICY: Policy = {
  slug: "refund-policy",
  title: "Refund Policy",
  summary: "When Lincoln University College refunds course fees for new and current students.",
  sections: [
    {
      id: "current",
      title: "Refund for Current Students",
      blocks: [
        { type: "p", text: "Refunds of course fees for current students who choose to withdraw from their unit(s) will be made according to the university's refund guidelines." },
        { type: "pending", covers: ["Refund guidelines and percentages for withdrawing from units"] },
      ],
    },
    {
      id: "new",
      title: "Refund for New Students",
      blocks: [
        { type: "p", text: "A full refund of course fees for new students will be made when the institution is unable to conduct the course, or a student visa is denied." },
        { type: "p", text: "A partial refund of course fees will be made according to the university's refund guidelines if a student chooses to withdraw from the university." },
        { type: "pending", covers: ["Partial refund guidelines and percentages"] },
        { type: "note", text: "Other general and administrative fees are non-refundable." },
      ],
    },
    {
      id: "application",
      title: "Application for Refund",
      blocks: [{ type: "pending", covers: ["How to apply for a refund", "Documents required and processing time"] }],
    },
    {
      id: "course-fees",
      title: "Refund of Course Fees",
      blocks: [{ type: "pending", covers: ["How and when course fees are refunded"] }],
    },
  ],
};

const termsOutline: [string, string, string[]][] = [
  ["acceptance", "Acceptance of Terms", ["By enrolling, accessing university resources or using university services, you agree to abide by these terms and conditions."]],
  ["academic", "Academic Policies", ["Academic requirements, including grading policies, attendance rules, and procedures for course registration and withdrawal."]],
  ["fees", "Tuition and Fees", ["Tuition, fees, payment deadlines and refund policies.", "Available financial aid or scholarship opportunities."]],
  ["resources", "Use of University Resources", ["Responsible use of university facilities, equipment, library and online resources.", "Acceptable use of digital platforms and networks."]],
  ["conduct", "Code of Conduct", ["Expected behaviour and conduct for students, staff and visitors.", "Consequences of violations of the code of conduct."]],
  ["privacy", "Privacy and Data Usage", ["How personal data is collected, used and protected, with reference to the Privacy Policy.", "Compliance with relevant privacy laws."]],
  ["ip", "Intellectual Property", ["How intellectual property rights related to academic work, research and inventions are managed and shared."]],
  ["safety", "Health and Safety", ["Health and safety regulations, including emergency procedures and health services available to students."]],
  ["discrimination", "Discrimination and Harassment", ["The university's position against discrimination, harassment and any form of misconduct.", "Procedures for reporting and addressing such incidents."]],
  ["accommodation", "Accommodation Services", ["Accommodation services available to students and the process for requesting accommodation."]],
  ["activities", "Student Organisations and Activities", ["Participation in student organisations, events and extracurricular activities."]],
  ["grievance", "Grievance and Dispute Resolution", ["The process for addressing grievances and disputes, including the steps to take and the responsible contact."]],
  ["changes", "Changes to Terms and Conditions", ["How these terms may be updated and how you will be informed of changes."]],
  ["contact", "Contact Information", ["Contact details for the university departments that handle questions about these terms."]],
  ["law", "Governing Law", ["The jurisdiction and laws that govern the interpretation and enforcement of these terms."]],
];

export const TERMS: Policy = {
  slug: "terms-and-conditions",
  title: "Terms and Conditions",
  summary: "The terms that apply when you enrol at, or use the services of, Lincoln University College through Lincoln Online.",
  sections: termsOutline.map(([id, title, covers]): PolicySection => ({
    id,
    title,
    blocks:
      id === "accommodation"
        ? [
            { type: "p", text: "Lincoln University College, located in Petaling Jaya, Malaysia, can help you find accommodation either on or off campus. Safe, comfortable and modern accommodation is available to suit a range of budgets." },
            { type: "pending", covers },
          ]
        : [{ type: "pending", covers }],
  })),
};
