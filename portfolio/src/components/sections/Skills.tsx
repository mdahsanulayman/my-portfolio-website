"use client";

import { motion } from "framer-motion";
import { concepts, otherInterests, skillCategories } from "@/data/skills";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <SectionHeading id="skills-title" title="Skills" subtitle="Technologies and tools I work with." />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map(({ id, title, icon: Icon, skills }, i) => (
          <Reveal key={id} delay={i * 0.06}>
            <motion.article whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="glass h-full rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {skills.filter((s) => s.level === undefined).map((s) => (
                  <li key={s.name} className="chip">{s.name}</li>
                ))}
              </ul>

              {/* Progress bars appear only for skills where you set `level` in src/data/skills.ts */}
              <ul className="mt-2 space-y-3">
                {skills.filter((s) => s.level !== undefined).map((s) => (
                  <li key={s.name}>
                    <div className="flex justify-between text-sm"><span>{s.name}</span><span className="text-muted">{s.level}%</span></div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-border/60" role="progressbar" aria-valuenow={s.level} aria-valuemin={0} aria-valuemax={100} aria-label={s.name}>
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent2"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.article>
          </Reveal>
        ))}

        <Reveal delay={0.3}>
          <article className="glass h-full rounded-3xl p-6">
            <h3 className="text-lg font-semibold">Core Concepts</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {concepts.map((c) => <li key={c} className="chip">{c}</li>)}
            </ul>
            <h3 className="mt-6 text-lg font-semibold">Other Interests</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {otherInterests.map((c) => <li key={c} className="chip">{c}</li>)}
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
