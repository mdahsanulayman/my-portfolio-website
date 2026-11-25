"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";
import Reveal from "./ui/Reveal";
import SafeImage from "./ui/SafeImage";
import SectionHeading from "./ui/SectionHeading";

interface ResponsiveProjectDescriptionProps {
  projectId: string;
  description: string;
}

function ResponsiveProjectDescription({ projectId, description }: ResponsiveProjectDescriptionProps) {
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [heights, setHeights] = useState({ collapsed: 68, full: 68 });

  useEffect(() => {
    const element = descriptionRef.current;
    if (!element) return;

    const updateHeights = () => {
      const lineHeight = Number.parseFloat(window.getComputedStyle(element).lineHeight);
      const nextHeights = {
        collapsed: Number.isFinite(lineHeight) ? lineHeight * 3 : 68,
        full: element.scrollHeight,
      };
      setHeights((current) => current.collapsed === nextHeights.collapsed && current.full === nextHeights.full ? current : nextHeights);
    };

    updateHeights();
    const observer = new ResizeObserver(updateHeights);
    observer.observe(element);
    return () => observer.disconnect();
  }, [description]);

  const descriptionStyle = {
    "--project-description-height": `${expanded ? heights.full : heights.collapsed}px`,
  } as CSSProperties;

  return (
    <div className="mt-2">
      <p
        ref={descriptionRef}
        id={`project-description-${projectId}`}
        style={descriptionStyle}
        className="max-h-[var(--project-description-height)] overflow-hidden text-sm leading-relaxed text-muted transition-[max-height] duration-300 ease-in-out md:max-h-none md:overflow-visible"
      >
        {description}
      </p>
      <button
        type="button"
        aria-controls={`project-description-${projectId}`}
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        className="mt-1 text-sm font-semibold text-accent hover:underline focus-visible:underline md:hidden"
      >
        {expanded ? "See Less" : "See More"}
      </button>
    </div>
  );
}
export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <SectionHeading id="projects-title" title="Projects" subtitle="A selection of my work." />
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {projects.map((p, i) => {
          const imageHref = p.live || p.github;
          const imageLinkLabel = p.live ? "live demo" : "GitHub repository";

          return (
            <Reveal key={p.id} delay={i * 0.08} className="h-full">
              <motion.article whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 280, damping: 20 }} className="glass group flex h-full flex-col overflow-hidden rounded-3xl">
                {imageHref ? (
                  <a
                    href={imageHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${p.title} ${imageLinkLabel} in a new tab`}
                    className="group/image relative block aspect-[16/9] cursor-pointer overflow-hidden"
                  >
                    <SafeImage
                      src={p.image}
                      alt={`${p.title} preview`}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1151px) 50vw, 544px"
                      className="object-cover transition-transform duration-500 group-hover/image:scale-105"
                    />
                  </a>
                ) : (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <SafeImage
                      src={p.image}
                      alt={`${p.title} preview`}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1151px) 50vw, 544px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  {p.id === "project-2" && <p className="mt-1 text-sm font-bold text-accent">TEAM PROJECT</p>}
                  <ResponsiveProjectDescription projectId={p.id} description={p.description} />
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => <li key={t} className="chip">{t}</li>)}
                  </ul>
                  {(p.github || p.live) && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2">
                          <Github size={16} aria-hidden="true" /> GitHub Repository
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
          );
        })}
      </div>
    </section>
  );
}