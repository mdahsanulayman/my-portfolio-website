import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { services } from "@/data/services";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const lengthHeader = request.headers.get("content-length");
  if (lengthHeader && Number(lengthHeader) > MAX_BODY_BYTES) {
    return errorResponse("The submitted message is too large.", 413);
  }

  let bodyText: string;
  try {
    bodyText = await request.text();
  } catch {
    return errorResponse("Invalid request.", 400);
  }

  if (new TextEncoder().encode(bodyText).byteLength > MAX_BODY_BYTES) {
    return errorResponse("The submitted message is too large.", 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(bodyText);
  } catch {
    return errorResponse("Invalid request.", 400);
  }

  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return errorResponse("Invalid request.", 400);
  }

  const record = payload as Record<string, unknown>;
  const readString = (key: string) => typeof record[key] === "string" ? record[key].trim() : "";
  const name = readString("name");
  const email = readString("email").toLowerCase();
  const serviceId = readString("service");
  const subject = readString("subject");
  const message = readString("message");
  const company = readString("company");

  if (company) {
    return errorResponse("Invalid submission.", 400);
  }

  const selectedService = serviceId ? services.find((service) => service.id === serviceId) : undefined;
  const invalid =
    name.length < 2 ||
    name.length > 120 ||
    email.length > 254 ||
    !EMAIL_RE.test(email) ||
    subject.length < 3 ||
    subject.length > 200 ||
    message.length < 10 ||
    message.length > 5_000 ||
    (serviceId !== "" && !selectedService);

  if (invalid) {
    return errorResponse("Please check the submitted fields.", 400);
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !supabaseSecretKey) {
    return errorResponse("The contact form is not configured yet.", 503);
  }

  const clientIp =
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const rateLimitHash = createHmac("sha256", supabaseSecretKey).update(clientIp).digest("hex");

  try {
    const response = await fetch(supabaseUrl + "/rest/v1/rpc/submit_contact_message", {
      method: "POST",
      headers: {
        apikey: supabaseSecretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_name: name,
        p_email: email,
        p_selected_service: selectedService?.title ?? null,
        p_subject: subject,
        p_message: message,
        p_rate_limit_hash: rateLimitHash,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null) as { code?: string } | null;
      if (result?.code === "P0001") {
        return errorResponse("Too many messages. Please try again in 15 minutes.", 429);
      }
      console.error("Supabase contact submission failed with status", response.status);
      return errorResponse("Unable to save your message right now.", 500);
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    console.error("Supabase contact submission could not reach the database.");
    return errorResponse("Unable to save your message right now.", 500);
  }
}
