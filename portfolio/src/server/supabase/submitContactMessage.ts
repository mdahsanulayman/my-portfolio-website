import { createHmac } from "node:crypto";

interface ContactMessage {
  name: string;
  email: string;
  selectedService: string | null;
  subject: string;
  message: string;
}

type SubmissionResult =
  | { success: true }
  | { success: false; reason: "not_configured" | "rate_limited" | "failed" };

/** Sends a validated contact message to the Supabase RPC using server-only credentials. */
export async function submitContactMessage(
  message: ContactMessage,
  clientIp: string
): Promise<SubmissionResult> {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !supabaseSecretKey) {
    return { success: false, reason: "not_configured" };
  }

  const rateLimitHash = createHmac("sha256", supabaseSecretKey).update(clientIp).digest("hex");

  try {
    const response = await fetch(supabaseUrl + "/rest/v1/rpc/submit_contact_message", {
      method: "POST",
      headers: {
        apikey: supabaseSecretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_name: message.name,
        p_email: message.email,
        p_selected_service: message.selectedService,
        p_subject: message.subject,
        p_message: message.message,
        p_rate_limit_hash: rateLimitHash,
      }),
      cache: "no-store",
    });

    if (response.ok) return { success: true };

    const result = await response.json().catch(() => null) as { code?: string } | null;
    if (result?.code === "P0001") return { success: false, reason: "rate_limited" };

    console.error("Supabase contact submission failed with status", response.status);
    return { success: false, reason: "failed" };
  } catch {
    console.error("Supabase contact submission could not reach the database.");
    return { success: false, reason: "failed" };
  }
}
