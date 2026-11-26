# MD Ahsanul Alam — Developer Portfolio

A responsive, single-page portfolio website built with Next.js, React, TypeScript, and Tailwind CSS. It presents the author's background, services, skills, education, projects, and contact information, with a server-side Supabase integration for contact submissions.

## Project objectives

- Present academic background, skills, services, and selected projects in one accessible website.
- Provide a responsive experience across mobile, tablet, and desktop layouts.
- Let visitors send contact messages without exposing database credentials in browser code.
- Keep portfolio content in data files so common updates do not require editing section components.

## Features

- Single-page sections for Home, About, Services, Skills, Education, Projects, and Contact.
- Responsive navigation with active-section indication and a mobile menu.
- Light and dark themes; the selected theme is stored in `localStorage`.
- Scroll reveals, a rotating role label, service detail dialogs, and expandable project descriptions on small screens.
- Contact form with client and server validation, a honeypot field, and database-backed rate limiting.
- SEO metadata, sitemap, robots rules, optimized project images, and reduced-motion support.

## Technologies

- Next.js 14 App Router and React 18
- TypeScript
- Tailwind CSS 3 and PostCSS
- Framer Motion
- Lucide React
- Supabase Postgres through a server-side REST RPC call
- `next/image` and `next/font`

## Project structure

```text
portfolio/
├── public/
│   ├── files/                         # Downloadable files, including the CV
│   ├── icons/                         # Public SVG icons
│   └── images/
│       ├── background/
│       ├── profile/
│       └── projects/                  # Project screenshots
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts       # Contact API route
│   │   ├── globals.css                # Theme tokens and global styles
│   │   ├── icon.svg                   # Next.js app icon
│   │   ├── layout.tsx                 # Root layout, fonts, and metadata
│   │   ├── page.tsx                   # Single-page section composition
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── layout/                    # Navbar and footer
│   │   ├── sections/                  # Main portfolio sections
│   │   └── ui/                        # Reusable visual and motion components
│   ├── data/                          # Portfolio, project, skill, and service data
│   ├── hooks/                         # Theme and active-section hooks
│   ├── lib/
│   │   ├── contact/                   # Browser API caller and form validation
│   │   └── utils.ts                   # Shared class-name utility
│   └── server/
│       └── supabase/                  # Server-only database submission service
├── supabase/
│   └── contact_messages.sql           # Table, access rules, index, and RPC function
├── .env.example                       # Safe environment-variable template
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

### Important folders and files

- `src/components/sections/` contains the seven sections assembled by `src/app/page.tsx`.
- `src/components/ui/` contains shared elements such as `Reveal`, `SectionHeading`, `ThemeToggle`, `Background`, and `SafeImage`.
- `src/data/` is the source for editable personal details, projects, skills, education, and services.
- `src/lib/contact/` contains browser-side form validation and the request to `/api/contact`.
- `src/app/api/contact/route.ts` validates incoming requests and maps service results to HTTP responses.
- `src/server/supabase/submitContactMessage.ts` signs the rate-limit identifier and calls the Supabase RPC using server-only credentials.
- `supabase/contact_messages.sql` is the SQL setup script. It is run in the Supabase SQL Editor; it is not run automatically by the app.

## Requirements

- Node.js 18.17 or newer
- npm
- A Supabase project only if contact-message database submissions are required

## Installation and local development

1. Open the project folder in a terminal.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` (PowerShell: `Copy-Item .env.example .env.local`).
4. Set the environment values described below. Supabase credentials are required for successful database submissions; the rest of the site can run without them.
5. Start the development server:

   ```bash
   npm run dev
   ```

6. Visit [http://localhost:3000](http://localhost:3000).

On Windows PowerShell, use `npm.cmd` instead of `npm` if the PowerShell execution policy blocks the npm script shim.

## Environment variables

The tracked `.env.example` contains placeholders only. Put real local values in the ignored `.env.local` file, and configure production values in the hosting provider's environment settings.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for metadata, sitemap, and robots output. Local default: `http://localhost:3000`. |
| `SUPABASE_URL` | Supabase project URL used by the server-side submission service. |
| `SUPABASE_SECRET_KEY` | Server-only Supabase secret key used for the RPC request and IP hash. Never add the `NEXT_PUBLIC_` prefix. |

Never commit `.env.local`, deployment environment files, or actual credentials. Only the sanitized `.env.example` belongs in the repository or an academic submission archive.

## Supabase and database setup

1. Create a Supabase project.
2. Run [`supabase/contact_messages.sql`](supabase/contact_messages.sql) in the Supabase SQL Editor. This defines the existing `public.contact_messages` table, its rate-limit index, row-level security and grants, plus the `public.submit_contact_message` RPC function.
3. Set `SUPABASE_URL` and `SUPABASE_SECRET_KEY` in `.env.local` for local development. Use the server-side secret key from the Supabase project settings; never expose it to browser code.

### Existing database objects

- **`public.contact_messages`** stores submitted names, email addresses, optional selected service, subject, message, submission time, and a hashed rate-limit identifier.
- **`public.submit_contact_message(...)`** checks the recent submission count and inserts a valid message. The SQL limits an identifier to five submissions in a 15-minute window.
- Row-level security is enabled. The SQL revokes direct access from `anon` and `authenticated` and grants the required table and RPC permissions to `service_role`.

### Contact submission flow

1. The Contact section validates fields in the browser and calls `src/lib/contact/sendMessage.ts`.
2. That function posts JSON to the Next.js endpoint `/api/contact`.
3. The API route validates the payload, checks the honeypot and selected service, and reads the request IP from proxy headers.
4. `src/server/supabase/submitContactMessage.ts` hashes the IP with HMAC-SHA-256 using the server secret, then sends the message to the Supabase RPC over HTTPS.
5. The API returns success only when Supabase accepts the RPC. Rate limits and configuration errors are returned as appropriate HTTP errors.

The project does not use a browser-side Supabase SDK. Database access and the secret key remain on the server.

## Content updates

- Personal details, roles, social links, and contact information: `src/data/personal.ts`
- Projects and screenshot paths: `src/data/projects.ts` and `public/images/projects/`
- Skills: `src/data/skills.ts`
- Education: `src/data/education.ts`
- Service cards and dialog details: `src/data/services.ts`
- Section order: `src/app/page.tsx`
- Theme colors and global styles: `src/app/globals.css`
- Fonts and site metadata: `src/app/layout.tsx`
- CV file: replace `public/files/CV_of_Md_Ahsanul_Alam.pdf` while retaining that path

Project images are rendered with `next/image`; SVG sources are served without image optimization. The profile image is prioritized for the above-the-fold hero section.

## Build and production server

Create an optimized production build:

```bash
npm run build
```

Run the generated build locally:

```bash
npm run start
```

Run ESLint:

```bash
npm run lint
```

## Deployment

The project can be deployed to Vercel or another platform that supports Next.js 14. Import the repository, configure `NEXT_PUBLIC_SITE_URL`, `SUPABASE_URL`, and `SUPABASE_SECRET_KEY` in the deployment environment, and deploy. Apply the SQL setup script to Supabase separately before expecting contact submissions to be stored.

For a submission ZIP, include `.env.example` but exclude `.env`, `.env.local`, `.env.production`, and any other file containing real credentials. The repository ignore rules exclude environment files while allowing the sanitized template.

## Troubleshooting

- **Contact form reports that it is not configured:** check `SUPABASE_URL` and `SUPABASE_SECRET_KEY`, then restart the local server after editing `.env.local`.
- **Contact messages are not stored:** verify that the SQL setup script was applied and that the configured secret key can call the RPC.
- **Too many messages response:** the database RPC enforces a limit of five submissions per 15 minutes per hashed request IP.
- **Project image does not appear:** confirm that the file exists under `public/images/projects/` and that `src/data/projects.ts` uses its correct public URL, such as `/images/projects/project1.png`.
- **Port 3000 is already in use:** stop the other local server or configure a different development port.

## Validation status

The project provides `build` and `lint` scripts; no dedicated automated test script is currently configured.
