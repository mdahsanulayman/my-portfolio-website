# MD Ahsanul Alam - Portfolio

A modern, responsive developer portfolio built with **Next.js 14 (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion** and **Lucide React**. Light and dark themes (saved in `localStorage`), scroll animations, a working contact form, SEO metadata, and a data-driven structure so you can edit content without touching components.

## 1. Install and run (VS Code)

1. Install **Node.js 18.17 or newer** (LTS recommended): https://nodejs.org
2. Unzip `ahsanul-portfolio.zip` and open the `portfolio` folder in VS Code (`File > Open Folder`).
3. Open the terminal in VS Code (`Ctrl + ~`) and run:

```bash
npm install
npm run dev
```

4. Open http://localhost:3000. Changes you save appear instantly.

Other commands:

```bash
npm run build   # production build (run this before deploying to catch errors)
npm run start   # run the production build locally
npm run lint    # check code quality
```

## 2. What to edit (everything is commented)

| I want to change...            | Edit this                                                        |
| ------------------------------ | ---------------------------------------------------------------- |
| Name, intro, email, phone, bio | `src/data/personal.ts`                                           |
| GitHub / LinkedIn / Facebook   | `socials` in `src/data/personal.ts` (**replace the placeholders**) |
| Profile picture                | Add `public/images/profile/profile.jpg`, then set `profileImage` in `personal.ts` |
| CV (Download CV button)        | Replace `public/files/my-cv.pdf` (keep the file name)            |
| Skills                         | `src/data/skills.ts` (add `level: 80` to a skill to show a progress bar) |
| Education                      | `src/data/education.ts`                                          |
| Projects                       | `src/data/projects.ts` + screenshots in `public/images/projects/` |
| "What I Do" cards              | `src/data/services.ts`                                           |
| Colors (light + dark)          | CSS variables at the top of `src/app/globals.css`                |
| Fonts                          | `src/app/layout.tsx` (Google fonts via `next/font`)              |
| Section order                  | `src/app/page.tsx`                                               |
| SEO title / description        | `src/data/personal.ts` and `src/app/layout.tsx`                  |

### Add a project
Copy a block in `src/data/projects.ts`, set a unique `id`, fill in `title`, `description`, `tech`, `image`, and add your `github` / `live` URLs. Remove `isPlaceholder: true`. Leave a link as `""` to hide its button. The three default projects are **placeholders**, so delete them once you have your own.

### Skill progress bars
No percentages are shown by default (none were provided). If you want a bar for a skill, add `level` (0-100) to that skill only.

## 3. Make the contact form work

The form validates input but **will not claim a message was sent unless a service is configured**. Choose one:

1. Copy `.env.example` to `.env.local`.
2. **Formspree (easiest):** create a form at https://formspree.io, then set `NEXT_PUBLIC_FORMSPREE_ID` to the form ID (the part after `/f/`).
3. **EmailJS:** at https://www.emailjs.com create a service and template, then set `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`. Use `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}` in the template.
4. Restart `npm run dev`.

Until configured, visitors see a notice with your email address instead.

## 4. Deploy on Vercel

1. Push the project to a GitHub repository (`.env.local` is git-ignored).
2. Go to https://vercel.com, click **Add New > Project**, and import the repository.
3. Under **Environment Variables**, add the same variables from `.env.local` plus `NEXT_PUBLIC_SITE_URL` (your final domain, e.g. `https://your-name.vercel.app`).
4. Click **Deploy**.

## Project structure

```
portfolio/
├── public/
│   ├── images/{profile,projects,background}/
│   ├── icons/
│   └── files/my-cv.pdf          <- placeholder, replace it
├── src/
│   ├── app/        layout.tsx, page.tsx, globals.css, icon.svg, robots.ts, sitemap.ts
│   ├── components/ Navbar, Hero, About, Services, Skills, Education, Projects, Contact, Footer
│   │   └── ui/     Reveal, SectionHeading, ThemeToggle, Background, SafeImage, MotionProvider
│   ├── data/       personal, skills, education, projects, services
│   ├── hooks/      useTheme, useActiveSection
│   └── lib/        utils, validators, sendMessage
├── .env.example  package.json  tsconfig.json  tailwind.config.ts  next.config.mjs  postcss.config.mjs
```

## Notes
- Animations respect the visitor's "reduce motion" setting.
- Placeholder images are SVGs; real JPG/PNG/WebP photos are automatically optimized by `next/image`.
