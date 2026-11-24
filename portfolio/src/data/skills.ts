import { Code2, Database, LayoutTemplate, Server, Wrench, type LucideIcon } from "lucide-react";

/**
 * ============================================================
 *  EDIT YOUR SKILLS HERE
 * ============================================================
 * Add or remove skills freely. Optional: add `level: 0-100` to a skill
 * to show an animated progress bar. Skills without `level` show as plain
 * chips, so no proficiency is ever invented.
 */
export interface Skill {
  name: string;
  level?: number;
}
export interface SkillCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming Languages",
    icon: Code2,
    skills: [{ name: "C" }, { name: "C++" }, { name: "JavaScript" }],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    icon: LayoutTemplate,
    skills: [{ name: "HTML5" }, { name: "CSS3" }, { name: "React.js" }, { name: "Next.js" }],
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: Server,
    skills: [{ name: "Node.js" }, { name: "Express.js" }, { name: "REST APIs" }],
  },
  {
    id: "database",
    title: "Database Management",
    icon: Database,
    skills: [{ name: "MongoDB" }, { name: "MySQL" }],
  },
  {
    id: "tools",
    title: "Tools & Technologies",
    icon: Wrench,
    skills: [
      { name: "VS Code" },
      { name: "Android Studio" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "Postman" },
      { name: "Vercel" },
    ],
  },
];

/** Shown under the skill cards */
export const concepts = ["OOP", "Data Structures", "Algorithms", "Problem Solving"];
export const otherInterests = ["Graphic Design", "UI/UX", "Computer Networking"];
