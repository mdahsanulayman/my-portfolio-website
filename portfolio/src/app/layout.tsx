import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { personal } from "@/data/personal";
import "./globals.css";
import ScrollUtilities from "@/components/ui/ScrollUtilities";

/* FONTS: swap these two for any Google fonts you like. */
const display = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

/* SEO: edit text in src/data/personal.ts */
export const metadata: Metadata = {
  metadataBase: new URL(personal.siteUrl),
  title: { default: `${personal.name} | ${personal.title}`, template: `%s | ${personal.name}` },
  description: personal.seoDescription,
  keywords: ["portfolio", "web developer", "software developer", "CSE student", "Next.js", "React", "Bangladesh"],
  authors: [{ name: personal.name }],
  openGraph: {
    title: `${personal.name} | ${personal.title}`,
    description: personal.seoDescription,
    type: "website",
    url: personal.siteUrl,
    siteName: personal.name,
  },
  twitter: { card: "summary", title: personal.name, description: personal.seoDescription },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#070a12" },
  ],
};

/* Runs before first paint so the saved theme never flashes. Defaults to the system preference. */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <ScrollUtilities />
      </body>
    </html>
  );
}
