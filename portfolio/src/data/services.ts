import { Code2, Globe2, LayoutTemplate, Palette, Wrench, type LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Building responsive and modern websites using HTML, CSS, JavaScript, React and Next.js.",
    features: ["Responsive Design", "Modern UI Development", "Cross-browser Compatibility"],
    icon: Globe2,
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "Creating clean, intuitive and user-friendly interfaces for modern digital experiences.",
    features: ["User Interface Design", "User Experience", "Wireframing & Prototyping"],
    icon: Palette,
  },
  {
    id: "backend-development",
    title: "Backend Development",
    description: "Building basic server-side functionality and API integrations.",
    features: ["Node.js & Express.js", "REST API Integration", "Database Integration"],
    icon: Code2,
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    description: "Creating professional personal portfolio websites to showcase skills, projects and achievements.",
    features: ["Modern Portfolio Design", "Responsive Layout", "Personal Branding"],
    icon: LayoutTemplate,
  },
  {
    id: "landing-page-design",
    title: "Landing Page Design",
    description: "Designing attractive landing pages for businesses, products and personal brands.",
    features: ["Modern Layout", "Mobile Optimization", "Call-to-Action Design"],
    icon: LayoutTemplate,
  },
  {
    id: "website-maintenance",
    title: "Website Maintenance",
    description: "Helping improve existing websites through updates, bug fixing and performance improvements.",
    features: ["Bug Fixing", "Content Updates", "Basic Performance Optimization"],
    icon: Wrench,
  },
];
