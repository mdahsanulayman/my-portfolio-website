"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { services, type Service } from "@/data/services";
import SectionHeading from "./ui/SectionHeading";

const iconGradients = [
  "from-cyan-400 to-blue-600",
  "from-fuchsia-400 to-violet-600",
  "from-emerald-400 to-teal-600",
  "from-amber-300 to-orange-600",
  "from-sky-400 to-indigo-600",
  "from-rose-400 to-pink-600",
];

const particles = [
  { left: "8%", top: "18%", delay: 0, size: 5 },
  { left: "91%", top: "24%", delay: 1.2, size: 4 },
  { left: "78%", top: "83%", delay: 0.6, size: 6 },
  { left: "18%", top: "76%", delay: 1.8, size: 4 },
  { left: "52%", top: "10%", delay: 0.9, size: 3 },
  { left: "95%", top: "63%", delay: 1.5, size: 3 },
];

export default function Services() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const ActiveServiceIcon = activeService?.icon;

  useEffect(() => {
    if (!activeService) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveService(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeService]);

  const orderService = (service: Service) => {
    setActiveService(null);
    window.dispatchEvent(new CustomEvent("portfolio:order-service", { detail: service.id }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" aria-labelledby="services-title" className="section">
      <SectionHeading id="services-title" title="What I Do" subtitle="Thoughtful digital services to help bring your ideas online." />
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[#071426] px-5 py-10 shadow-2xl shadow-blue-950/20 sm:px-8 sm:py-12 lg:px-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_0%,rgba(14,165,233,0.15),transparent_42%),radial-gradient(ellipse_at_90%_100%,rgba(99,102,241,0.16),transparent_40%)]" />
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full bg-cyan-200/70 shadow-[0_0_12px_rgba(103,232,249,0.8)]"
            style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
            animate={{ y: [0, -10, 0], opacity: [0.25, 0.85, 0.25] }}
            transition={{ duration: 4 + particle.delay, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] as const }}
                whileHover={{ y: -6 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.025] p-6 shadow-lg shadow-black/10 transition-[border-color,box-shadow] duration-300 hover:border-cyan-200/30 hover:shadow-cyan-950/30 sm:p-7"
              >
                <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl transition-colors group-hover:bg-cyan-300/20" />
                <span className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${iconGradients[index]} text-white shadow-lg transition duration-300 group-hover:scale-105 group-hover:shadow-xl`}>
                  <Icon size={25} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="relative mt-6 text-xl font-semibold tracking-tight text-white">{service.title}</h3>
                <p className="relative mt-3 flex-1 text-sm leading-6 text-slate-300">{service.description}</p>
                <button
                  type="button"
                  onClick={() => setActiveService(service)}
                  className="relative mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-cyan-200 transition-colors hover:text-white focus-visible:outline-white"
                  aria-haspopup="dialog"
                >
                  Learn More <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeService && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/75 p-4 backdrop-blur-sm sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveService(null); }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-dialog-title"
              className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0b1b30] p-6 text-white shadow-2xl shadow-black/40 sm:p-8"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22 }}
            >
              <button type="button" onClick={() => setActiveService(null)} aria-label="Close service details" className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white">
                <X size={20} />
              </button>
              <span className="inline-flex rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-600 p-3 text-white shadow-lg shadow-cyan-950/50">
                {ActiveServiceIcon && <ActiveServiceIcon size={25} aria-hidden="true" />}
              </span>
              <h3 id="service-dialog-title" className="mt-5 pr-8 text-2xl font-bold tracking-tight">{activeService.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{activeService.description}</p>
              <ul className="mt-6 space-y-3">
                {activeService.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-slate-200">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-200"><Check size={14} aria-hidden="true" /></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => orderService(activeService)} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:brightness-110 focus-visible:outline-white">
                Order This Service <ArrowRight size={17} aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


