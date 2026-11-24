export interface ContactValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  service: string;
}
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (v.name.trim().length < 2) errors.name = "Please enter your name (at least 2 characters).";
  if (!EMAIL_RE.test(v.email.trim())) errors.email = "Please enter a valid email address.";
  if (v.subject.trim().length < 3) errors.subject = "Please add a subject (at least 3 characters).";
  if (v.message.trim().length < 10) errors.message = "Your message should be at least 10 characters.";
  return errors;
}


