"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send, TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { personal, socials } from "@/data/personal";
import { services } from "@/data/services";
import { sendMessage } from "@/lib/sendMessage";
import { validateContact, type ContactErrors, type ContactValues } from "@/lib/validators";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

type Status = "idle" | "sending" | "success" | "error";
const empty: ContactValues = { name: "", email: "", subject: "", message: "", service: "" };

const fieldClass =
  "w-full rounded-2xl border border-border bg-surface/70 px-4 py-3 text-sm text-fg placeholder:text-muted/70 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export default function Contact() {
  const [values, setValues] = useState<ContactValues>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const submitting = useRef(false);

  useEffect(() => {
    const selectOrderedService = (event: Event) => {
      const serviceId = (event as CustomEvent<string>).detail;
      const selected = services.find((service) => service.id === serviceId);
      if (!selected) return;
      setValues((current) => ({
        ...current,
        service: selected.id,
        subject: current.subject || `Service inquiry: ${selected.title}`,
      }));
    };
    window.addEventListener("portfolio:order-service", selectOrderedService);
    return () => window.removeEventListener("portfolio:order-service", selectOrderedService);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name as keyof ContactValues]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting.current || honeypot) return;
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    submitting.current = true;
    setStatus("sending");
    try {
      await sendMessage(values, honeypot);
      setStatus("success");
      setValues(empty);
      setHoneypot("");
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  };

  const info = [
    { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
    { icon: Phone, label: "Phone", value: personal.phone, href: `tel:${personal.phoneLink}` },
    { icon: MapPin, label: "Location", value: personal.location },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <SectionHeading id="contact-title" title="Contact" subtitle="Have a question or want to work together? Send me a message." />
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="space-y-4">
          {info.map(({ icon: Icon, label, value, href }) => {
            const body = (
              <>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted">{label}</span>
                  <span className="block break-words font-medium">{value}</span>
                </span>
              </>
            );
            return href ? (
              <a key={label} href={href} className="glass flex items-center gap-4 rounded-2xl p-4 transition-transform hover:-translate-y-1">{body}</a>
            ) : (
              <div key={label} className="glass flex items-center gap-4 rounded-2xl p-4">{body}</div>
            );
          })}
          <ul className="flex gap-3 pt-2" aria-label="Social media">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <motion.a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} whileHover={{ y: -4 }} whileTap={{ scale: 0.94 }} className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-accent">
                  <Icon size={19} />
                </motion.a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="glass space-y-5 rounded-3xl p-6 sm:p-8" aria-label="Contact form">
            <div className="grid gap-5 sm:grid-cols-2">
              {(["name", "email"] as const).map((f) => (
                <div key={f}>
                  <label htmlFor={f} className="mb-1.5 block text-sm font-medium capitalize">{f}</label>
                  <input id={f} name={f} type={f === "email" ? "email" : "text"} autoComplete={f} value={values[f]} onChange={onChange} placeholder={f === "name" ? "Your name" : "you@example.com"} aria-invalid={!!errors[f]} aria-describedby={errors[f] ? `${f}-error` : undefined} className={fieldClass} />
                  {errors[f] && <p id={`${f}-error`} role="alert" className="mt-1.5 text-xs text-red-500">{errors[f]}</p>}
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="service" className="mb-1.5 block text-sm font-medium">Service</label>
              <select id="service" name="service" value={values.service} onChange={onChange} className={fieldClass}>
                <option value="">Choose a service (optional)</option>
                {services.map((service) => <option key={service.id} value={service.id}>{service.title}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">Subject</label>
              <input id="subject" name="subject" type="text" value={values.subject} onChange={onChange} placeholder="What is this about?" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined} className={fieldClass} />
              {errors.subject && <p id="subject-error" role="alert" className="mt-1.5 text-xs text-red-500">{errors.subject}</p>}
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message</label>
              <textarea id="message" name="message" rows={5} value={values.message} onChange={onChange} placeholder="Write your message here..." aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} className={`${fieldClass} resize-y`} />
              {errors.message && <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
            </div>

            {/* Honeypot: hidden from people, catches bots */}
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" name="company" />

            <motion.button type="submit" disabled={status === "sending"} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-primary w-full disabled:opacity-70 sm:w-auto">
              {status === "sending" ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>

            <div aria-live="polite">
              {status === "success" && (
                <p className="flex items-center gap-2 text-sm text-emerald-500"><CheckCircle2 size={18} aria-hidden="true" /> Message sent. Thank you, I will reply soon.</p>
              )}
              {status === "error" && (
                <p className="flex items-center gap-2 text-sm text-red-500"><TriangleAlert size={18} aria-hidden="true" /> Something went wrong. Please try again or email me directly.</p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

