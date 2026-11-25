import { Facebook, Github, Instagram, type LucideIcon } from "lucide-react";

/**
 * ============================================================
 *  EDIT YOUR PERSONAL INFORMATION HERE
 * ============================================================
 */
export const personal = {
  name: "MD Ahsanul Alam",
  initials: "AA",
  title: "CSE Student | Aspiring Software Developer",

  // Words that rotate under your name in the hero section
  roles: ["CSE Student", "Aspiring Software Developer", "Web & App Development Enthusiast"],

  // Short text shown in the hero section
  heroIntro:
    "I build for the web and learn something new with every project. Currently studying Computer Science & Engineering and working toward becoming a skilled software developer.",

  // Paragraphs shown in the About section
  about: [
    "I am a Computer Science and Engineering student interested in Web Development, Application Development, and Programming. I enjoy learning new technologies, building projects, and improving my technical skills.",
    "I work with HTML, CSS, JavaScript, React, Next.js, Node.js, Express.js, MongoDB, MySQL, C, and C++. Beyond code, I am curious about graphic design, UI/UX, and computer networking.",
  ],
  goal: "My goal is to become a skilled software developer.",
  interests: ["Web Development", "Application Development", "Programming", "Graphic Design", "UI/UX", "Computer Networking"],

  // Contact details
  email: "mdahsanul777@gmail.com",
  phone: "01302982948",
  phoneLink: "+8801302982948", // used for tap-to-call
  location: "Cumilla, Bangladesh",

  // Replace these files to change your pictures / CV (keep the same names, or edit the paths)
  profileImage: "/images/profile/my-photo.jpg.jpeg",
  profileAlt: "Portrait of MD Ahsanul Alam",
  cvPath: "/files/my-cv.pdf",

  // Used for SEO. Set NEXT_PUBLIC_SITE_URL in .env.local / Vercel after deploying.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  seoDescription:
    "Portfolio of MD Ahsanul Alam, a Computer Science & Engineering student and aspiring software developer from Cumilla, Bangladesh.",
};

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

/**
 * TODO: replace these with your real profile URLs.
 * Delete an entry to remove it everywhere (hero, contact, footer).
 */
export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/mdahsanulayman", icon: Github },
  { label: "Instagram", href: "https://www.instagram.com/md.ayman0.0?dmpr=MWlxM2Z4azlwZGp6Zw==", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/md.ayman0.0", icon: Facebook },
];

/** Navbar + footer links. `id` must match the section id on the page. */
export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

