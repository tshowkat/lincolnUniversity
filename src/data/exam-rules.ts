/**
 * Examination Rules & Regulations of Lincoln University College.
 * Source text: the university's official "Examination Rules & Regulations" page (wording kept as published,
 * with only light punctuation/grammar clean-up). Edit here to update /examination-rules.
 */

export interface ExamRule {
  no: string;
  text: string;
}

export interface ExamRuleSection {
  id: string;
  no: string;
  title: string;
  intro?: string;
  rules: ExamRule[];
}

export const EXAM_RULES_UPDATED = "2026-11-02";

export const EXAM_RULE_SECTIONS: ExamRuleSection[] = [
  {
    id: "conduct",
    no: "1",
    title: "Conduct of Candidates in Examination",
    intro:
      "Examinations shall be conducted in accordance with the rules and regulations of Lincoln University College. Students with disabilities who require any special or additional arrangements should notify their respective Head of Department and the Examination Unit at least 3 working days before the scheduled date of the examination. Documentary evidence of the disability and needs must be provided wherever practicable.",
    rules: [
      {
        no: "1.1",
        text: "An invigilator will be appointed for each examination to ensure that proper provisions have been made for the conduct of examinations and that the examinations are conducted in accordance with the rules and regulations.",
      },
    ],
  },
  {
    id: "candidates",
    no: "2",
    title: "Rules and Regulations for Candidates",
    intro: "The following rules and regulations apply to candidates in all examinations.",
    rules: [
      {
        no: "2.1",
        text: "Candidates will be admitted to the examination room not earlier than ten minutes before the examination is due to commence.",
      },
      {
        no: "2.2",
        text: "Only stationery is permitted in the examination centre. Candidates may use calculators and other electronic devices approved for use in an examination, provided all programmable memory has been cleared before they are brought into the examination room. Non-programmable calculators, where allowed, must have volatile memory only and must not have alpha facilities. A candidate using an authorised electronic device is responsible for its operation. Any failure or malfunction of the device will not constitute grounds for a deferred examination or other special arrangements.",
      },
      {
        no: "2.3",
        text: "Candidates must produce their identity card (IC), or passport if a foreigner, at each examination centre, and place it prominently on their desk during the examination. A candidate without photographic identification must follow the procedures prescribed by the chief invigilator. Failure to provide identification may result in suspension of access to unit results and academic transcripts until identification requirements are met.",
      },
      {
        no: "2.4",
        text: "Each desk in the examination room will normally be numbered. A candidate must occupy the desk allocated to him or her.",
      },
      {
        no: "2.5",
        text: "Before the examination begins, candidates must sign the attendance list. A candidate whose name is not on the attendance list will not be permitted to enter the examination room. Answer scripts of candidates who have not signed the attendance list will not be evaluated.",
      },
      {
        no: "2.6",
        text: "A candidate who wishes to attract the attention of the invigilator should raise his or her hand.",
      },
      {
        no: "2.7",
        text: "A candidate who wishes to leave the examination room temporarily must be accompanied by an invigilator.",
      },
      {
        no: "2.8",
        text: "Strictly no mobile phones or other electronic devices are permitted in the examination room.",
      },
      {
        no: "2.9",
        text: "Candidates should remain in their seats at the end of an examination session until all answer books have been collected by the invigilator.",
      },
      {
        no: "2.10",
        text: "A candidate whose behaviour disturbs other candidates will be warned by the invigilator. If the conduct persists, the candidate will be required to leave the examination room and the answer book will be endorsed accordingly.",
      },
      {
        no: "2.11",
        text: "Where unfair conduct is detected or suspected, the invigilator will endorse the candidate's answer book, the candidate will be required to leave the examination room, and the invigilator will inform the Examination Unit.",
      },
    ],
  },
  {
    id: "supplementary",
    no: "3",
    title: "Supplementary and Missed Examinations",
    rules: [
      {
        no: "3.1",
        text: "Supplementary examinations are for candidates who have failed the semester final examination.",
      },
      {
        no: "3.2",
        text: "Supplementary examinations will be conducted after the semester final examination results are published online. Fees are charged according to the fee structure (Memo No. G101, dated 25 October 2010).",
      },
      {
        no: "3.3",
        text: "Supplementary examination fees must be paid before the scheduled date of the examination. Candidates who do not pay the fees will not be allowed to sit the supplementary examination. The examination slip will be issued to the candidate one week before the examination.",
      },
      {
        no: "3.4",
        text: "Candidates who missed the final examination for a valid reason (such as medical leave) should notify their Head of Department and the Examination Unit, with documentary evidence wherever practicable. These candidates will be given only one chance to sit the missed examination. If they fail to do so, they will not be allowed to sit the examination, no marks will be given, and the subject must be repeated.",
      },
      {
        no: "3.5",
        text: "Candidates must submit their assignments on time. No further extension of time will be given.",
      },
    ],
  },
];

/** At-a-glance checklist shown at the top of the page (derived from the rules above). */
export const EXAM_DAY_CHECKLIST = [
  { title: "Arrive on time", body: "Entry opens 10 minutes before the start.", ref: "2.1" },
  { title: "Bring your IC or passport", body: "Keep it on your desk throughout.", ref: "2.3" },
  { title: "Sign the attendance list", body: "Unsigned candidates' scripts are not marked.", ref: "2.5" },
  { title: "No phones or devices", body: "Only stationery and approved calculators.", ref: "2.8" },
] as const;
