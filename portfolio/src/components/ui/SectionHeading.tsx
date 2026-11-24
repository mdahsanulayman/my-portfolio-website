import Reveal from "./Reveal";

export default function SectionHeading({ id, title, subtitle }: { id?: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <h2 id={id} className="text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent to-accent2" aria-hidden="true" />
      {subtitle && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
