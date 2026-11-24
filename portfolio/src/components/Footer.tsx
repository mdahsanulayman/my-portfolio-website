import { navLinks, personal, socials } from "@/data/personal";

export default function Footer() {
  return (
    <footer className="border-t border-border/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <a href="#home" className="flex items-center gap-2.5 font-display text-lg font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-sm text-white">{personal.initials}</span>
            {personal.name}
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{personal.title}</p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-sm font-semibold">Quick links</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted">
            {navLinks.map((l) => (
              <li key={l.id}><a href={`#${l.id}`} className="transition-colors hover:text-accent">{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold">Connect</h2>
          <ul className="mt-4 flex gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="glass flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:text-accent">
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </ul>
          <a href={`mailto:${personal.email}`} className="mt-4 inline-block text-sm text-muted hover:text-accent">{personal.email}</a>
          <div className="mt-5">
            <h3 className="mb-2 text-sm font-semibold">Find Me Here</h3>
            <div className="glass overflow-hidden rounded-2xl p-1.5">
              <iframe
                title="Google Maps location in Cumilla, Bangladesh"
                src="https://www.google.com/maps?q=23.4419689,91.1734314&z=15&output=embed"
                className="h-32 w-full rounded-xl border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted">
        &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
      </div>
    </footer>
  );
}
