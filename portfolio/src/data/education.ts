/**
 * ============================================================
 *  EDIT YOUR EDUCATION HERE (newest first)
 * ============================================================
 * `period` and `detail` are optional.
 */
export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period?: string;
  detail?: string;
}

export const education: EducationItem[] = [
  {
    id: "bsc",
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "CCN University of Science and Technology",
    period: "2024 – Present",
  },
  {
    id: "hsc",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Sonar Bangla College",
    detail: "GPA 5.00",
  },
  {
    id: "ssc",
    degree: "Secondary School Certificate (SSC)",
    institution: "Cumilla Modern High School",
    detail: "GPA 5.00",
  },
];
