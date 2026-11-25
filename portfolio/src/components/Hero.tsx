"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, FolderGit2, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { personal, socials } from "@/data/personal";
import SafeImage from "./ui/SafeImage";

const ease = [0.22, 1, 0.36, 1] as const;
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } } };
const item = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % personal.roles.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" aria-labelledby="hero-title" className="section flex min-h-screen items-center !pt-32 md:!pt-36">
      <div className="grid w-full items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="font-display text-xl text-muted sm:text-2xl">
            {"Hi, I'm"}
          </motion.p>
          <motion.h1
            id="hero-title"
            variants={item}
            className="text-gradient mt-2 pb-2 text-5xl font-extrabold leading-[1.05] sm:text-6xl md:text-7xl"
          >
            {personal.name}.
          </motion.h1>

          <motion.div variants={item} className="mt-5 flex min-h-9 w-full items-center text-xl font-semibold leading-[1.4] sm:text-2xl sm:leading-[1.4] md:h-9 md:min-h-0 md:overflow-hidden md:leading-[2rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -28, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {personal.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {personal.heroIntro}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <motion.a href="#projects" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="btn-primary">
              <FolderGit2 size={18} aria-hidden="true" /> View My Projects
            </motion.a>
            <motion.a href="#contact" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="btn-ghost">
              <Mail size={18} aria-hidden="true" /> Contact Me
            </motion.a>
          </motion.div>

          <motion.ul variants={item} className="mt-9 flex items-center gap-3" aria-label="Social media">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-accent"
                >
                  <Icon size={19} />
                </motion.a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
          className="relative mx-auto w-full max-w-sm"
        >
          <motion.div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[2.4rem] bg-gradient-to-br from-accent via-accent2 to-accent opacity-60 blur-xl"
            animate={{ rotate: [0, 6, 0, -6, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass relative aspect-[4/5] overflow-hidden rounded-[2rem] p-2"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
              <SafeImage src={personal.profileImage} alt={personal.profileAlt} fill priority sizes="(max-width: 1024px) 80vw, 384px" className="object-cover" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted md:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
