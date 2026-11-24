"use client";

import { Target } from "lucide-react";
import { personal } from "@/data/personal";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <SectionHeading id="about-title" title="About Me" />
      <div className="mx-auto max-w-3xl">
<Reveal delay={0.1}>
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {personal.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <h3 className="mt-8 text-lg font-semibold">Interests</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {personal.interests.map((i) => (
              <li key={i} className="chip">{i}</li>
            ))}
          </ul>

          <div className="glass mt-8 flex items-start gap-4 rounded-2xl p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Target size={22} aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-semibold">Career goal</h3>
              <p className="mt-1 text-muted">{personal.goal}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


