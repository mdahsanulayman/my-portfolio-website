"use client";

import { AnimatePresence, motion } from "framer-motion";

import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, personal } from "@/data/personal";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import ThemeToggle from "../ui/ThemeToggle";
import BrandLogo from "../ui/BrandLogo";

const ids = navLinks.map((l) => l.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Main navigation"
        className={cn(
          "mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full px-4 transition-shadow sm:px-6",
          scrolled ? "glass shadow-lg shadow-black/5" : "border border-transparent"
        )}
      >
        <motion.a
          href="#home"
          aria-label="AYMAN - home"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
          className="group flex shrink-0 items-center gap-2 font-display text-lg font-extrabold tracking-[0.16em] text-fg transition-colors duration-300 hover:text-accent sm:text-xl"
        >
          <BrandLogo />
        </motion.a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active === link.id ? "text-fg" : "text-muted hover:text-fg"
                )}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-accent/15"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <motion.a
            href={personal.cvPath}
            download="CV_of_Md_Ahsanul_Alam.pdf"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-primary hidden !px-4 !py-2.5 sm:inline-flex"
          >
            <Download size={16} aria-hidden="true" /> Download CV
          </motion.a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="glass flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center rounded-full p-0 lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-3 lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.li key={link.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-2xl px-4 py-3 text-base font-medium",
                      active === link.id ? "bg-accent/15 text-fg" : "text-muted hover:text-fg"
                    )}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href={personal.cvPath} download="CV_of_Md_Ahsanul_Alam.pdf" className="btn-primary mt-3 w-full">
              <Download size={16} aria-hidden="true" /> Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

