/**
 * ============================================================
 *  EDIT YOUR PROJECTS HERE
 * ============================================================
 * The 3 entries below are PLACEHOLDERS (isPlaceholder: true).
 * To add a real project: copy an entry, set isPlaceholder to false (or delete it),
 * fill in the details, and put its screenshot in public/images/projects/.
 * Leave `github` or `live` empty ("") to hide that button.
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string; // e.g. "/images/projects/my-app.png"
  tech: string[];
  github: string;
  live: string;
  isPlaceholder?: boolean;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Your Project Title",
    description: "Describe what this project does, the problem it solves, and what you learned while building it.",
    image: "/images/projects/placeholder.svg",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "",
    live: "",
    isPlaceholder: true,
  },
  {
    id: "project-2",
    title: "Your Project Title",
    description: "Describe what this project does, the problem it solves, and what you learned while building it.",
    image: "/images/projects/placeholder.svg",
    tech: ["React", "Node.js", "MongoDB"],
    github: "",
    live: "",
    isPlaceholder: true,
  },
  {
    id: "project-3",
    title: "Your Project Title",
    description: "Describe what this project does, the problem it solves, and what you learned while building it.",
    image: "/images/projects/placeholder.svg",
    tech: ["C++", "Data Structures"],
    github: "",
    live: "",
    isPlaceholder: true,
  },
];
