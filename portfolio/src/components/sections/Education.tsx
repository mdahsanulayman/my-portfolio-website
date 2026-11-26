import { GraduationCap } from "lucide-react";
import { education } from "@/data/education";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="section">
      <SectionHeading id="education-title" title="Education" subtitle="My academic journey so far." />
      <ol className="relative ml-4 border-l-2 border-border sm:ml-6">
        {education.map((e, i) => (
          <li key={e.id} className="relative pb-10 pl-8 last:pb-0 sm:pl-12">
            <span className="absolute -left-[1.45rem] top-1 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent2 text-white ring-4 ring-bg">
              <GraduationCap size={20} aria-hidden="true" />
            </span>
            <Reveal delay={i * 0.08}>
              <article className="glass rounded-3xl p-6">
                {e.period && <p className="text-sm font-semibold text-accent">{e.period}</p>}
                <h3 className="mt-1 text-xl font-semibold">{e.degree}</h3>
                <p className="mt-1 text-muted">{e.institution}</p>
                {e.detail && <p className="chip mt-3 inline-block">{e.detail}</p>}
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
