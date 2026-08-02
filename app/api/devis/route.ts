import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { quoteRequestSchema } from "@/lib/validations/quote";
import { ACCEPTED_ATTACHMENT_TYPES, MAX_ATTACHMENTS, MAX_ATTACHMENT_SIZE_BYTES } from "@/content/form-options";
import { createServiceClient, ServiceNotConfiguredError } from "@/lib/supabase/server";
import { formatReferenceNumber } from "@/lib/quote-reference";
import { sendQuoteRequestEmails } from "@/lib/email/resend";
import { verifyRecaptcha } from "@/lib/recaptcha";

const STORAGE_BUCKET = "quote-attachments";

export async function POST(request: Request) {
  const formData = await request.formData();

  const raw = {
    fullName: formData.get("fullName")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
    role: formData.get("role")?.toString() ?? "",
    sector: formData.get("sector")?.toString() ?? "",
    servicePole: formData.get("servicePole")?.toString() ?? "",
    revenueRange: formData.get("revenueRange")?.toString() ?? "",
    headcountRange: formData.get("headcountRange")?.toString() ?? "",
    location: formData.get("location")?.toString() ?? "",
    urgency: formData.get("urgency")?.toString() ?? "",
    budgetRange: formData.get("budgetRange")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
    consent: formData.get("consent")?.toString() === "true",
    locale: formData.get("locale")?.toString() ?? "",
  };

  const locale = raw.locale === "en" ? "en" : "fr";
  const parsed = quoteRequestSchema(locale).safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_error", issues: parsed.error.issues }, { status: 400 });
  }
  const data = parsed.data;

  const recaptchaToken = formData.get("recaptchaToken")?.toString() || null;
  const recaptchaOk = await verifyRecaptcha(recaptchaToken);
  if (!recaptchaOk) {
    return NextResponse.json({ error: "recaptcha_failed" }, { status: 400 });
  }

  const attachments = formData.getAll("attachments").filter((v): v is File => v instanceof File && v.size > 0);

  if (attachments.length > MAX_ATTACHMENTS) {
    return NextResponse.json({ error: "too_many_attachments" }, { status: 400 });
  }
  for (const file of attachments) {
    if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
      return NextResponse.json({ error: "attachment_too_large", fileName: file.name }, { status: 400 });
    }
    if (!ACCEPTED_ATTACHMENT_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "attachment_type_not_allowed", fileName: file.name }, { status: 400 });
    }
  }

  try {
    const supabase = createServiceClient();
    const requestId = randomUUID();

    const uploadedAttachments: { name: string; path: string; size: number; type: string }[] = [];
    for (const [index, file] of attachments.entries()) {
      const safeName = file.name.replace(/[^\w.\-]/g, "_");
      const path = `${requestId}/${index}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
        contentType: file.type,
      });
      if (uploadError) throw uploadError;
      uploadedAttachments.push({ name: file.name, path, size: file.size, type: file.type });
    }

    const { data: inserted, error: insertError } = await supabase
      .from("quote_requests")
      .insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        role: data.role || null,
        sector: data.sector,
        service_pole: data.servicePole,
        revenue_range: data.revenueRange || null,
        headcount_range: data.headcountRange || null,
        location: data.location,
        urgency: data.urgency,
        budget_range: data.budgetRange || null,
        message: data.message,
        attachments: uploadedAttachments,
        locale: data.locale,
      })
      .select("id, created_at")
      .single();

    if (insertError) throw insertError;

    const referenceNumber = formatReferenceNumber(inserted.id, inserted.created_at);

    await sendQuoteRequestEmails(data, referenceNumber, uploadedAttachments.length);

    return NextResponse.json({ referenceNumber });
  } catch (error) {
    if (error instanceof ServiceNotConfiguredError) {
      return NextResponse.json({ error: "service_not_configured" }, { status: 503 });
    }
    console.error("[api/devis] échec du traitement de la demande de devis:", error);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
