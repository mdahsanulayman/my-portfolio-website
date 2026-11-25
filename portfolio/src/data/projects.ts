/**
 * ============================================================
 *  EDIT YOUR PROJECTS HERE
 * ============================================================
 * Current project entries are listed below.
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
    title: "Modern Hospital",
    description: "Modern Hospital is a modern, fully responsive hospital website demo designed to make healthcare information and services more accessible to users. It provides an intuitive platform where visitors can explore hospital facilities, medical services, doctor information, and essential healthcare resources through a clean and user-friendly interface. This project demonstrates my skills in building modern, accessible, and user-focused web experiences.",
    image: "/images/projects/project1.png",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "",
    live: "https://hospital-management-ashen-three.vercel.app/home/home.html",
  },
  {
    id: "project-2",
    title: "Red Pulse - Mobile App",
    description: "Red Pulse is an Android Blood Donation Management Application developed to connect blood donors with people in need of blood. It helps users find donors, explore live blood requests, and manage blood donation activities through a user-friendly interface. This project was developed collaboratively by a team of five university students as part of our university lab project.",
    image: "/images/projects/project2.jpeg",
    tech: ["Java", "Android Studio", "XML", "Cloud Firestore"],
    github: "https://github.com/princebytex/red-pulse",
    live: "",
  },
];
