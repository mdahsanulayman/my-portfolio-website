import type { ContactValues } from "./validators";

export async function sendMessage(values: ContactValues, company: string): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...values, company }),
  });

  if (!response.ok) {
    throw new Error("Contact message submission failed");
  }
}
