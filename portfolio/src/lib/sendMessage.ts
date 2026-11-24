import type { ContactValues } from "./validators";

/**
 * Contact form delivery. Configure ONE provider with environment variables
 * (see .env.example). If none is configured, the form tells the visitor
 * honestly that it is not connected yet - it never fakes a "sent" message.
 */
export type Provider = "formspree" | "emailjs" | "none";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const EMAILJS_SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export function getProvider(): Provider {
  if (FORMSPREE_ID) return "formspree";
  if (EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_KEY) return "emailjs";
  return "none";
}

export async function sendMessage(values: ContactValues): Promise<void> {
  const provider = getProvider();

  if (provider === "formspree") {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw new Error("Formspree request failed");
    return;
  }

  if (provider === "emailjs") {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE,
        template_id: EMAILJS_TEMPLATE,
        user_id: EMAILJS_KEY,
        // Use these names in your EmailJS template: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
        template_params: {
          from_name: values.name,
          from_email: values.email,
          service: values.service,
          subject: values.subject,
          message: values.message,
        },
      }),
    });
    if (!res.ok) throw new Error("EmailJS request failed");
    return;
  }

  throw new Error("NOT_CONFIGURED");
}


