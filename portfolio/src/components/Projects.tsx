"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";
import Reveal from "./ui/Reveal";
import SafeImage from "./ui/SafeImage";
import SectionHeading from "./ui/SectionHeading";

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <SectionHeading id="projects-title" title="Projects" subtitle="A selection of my work." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <motion.article whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 280, damping: 20 }} className="glass group flex h-full flex-col overflow-hidden rounded-3xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                <SafeImage
                  src={p.image}
                  alt={`${p.title} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {p.isPlaceholder && (
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">Placeholder</span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => <li key={t} className="chip">{t}</li>)}
                </ul>
                {(p.github || p.live) && (
                  <div className="mt-5 flex gap-3">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2">
                        <Github size={16} aria-hidden="true" /> Code
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn-primary !px-4 !py-2">
                        <ExternalLink size={16} aria-hidden="true" /> Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
