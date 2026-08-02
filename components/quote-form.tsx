"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Paperclip, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { RecaptchaScript } from "@/components/recaptcha-script";
import { getRecaptchaToken } from "@/lib/get-recaptcha-token";
import { quoteRequestSchema, type QuoteRequestInput } from "@/lib/validations/quote";
import { servicePoles, sectors } from "@/content/company";
import {
  ACCEPTED_ATTACHMENT_TYPES,
  MAX_ATTACHMENTS,
  MAX_ATTACHMENT_SIZE_BYTES,
  budgetRangeOptions,
  headcountRangeOptions,
  revenueRangeOptions,
  urgencyOptions,
} from "@/content/form-options";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink-950 placeholder:text-slate-400 focus:border-ink-700 focus:outline-none focus:ring-1 focus:ring-ink-700";

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink-950">
        {label} {optional && <span className="font-normal text-slate-400">{optional}</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function QuoteForm() {
  const locale = useLocale() as "fr" | "en";
  const t = useTranslations("devis");
  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const schema = useMemo(() => quoteRequestSchema(locale), [locale]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteRequestInput>({
    resolver: zodResolver(schema),
    defaultValues: { locale, urgency: "normal" },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length + selected.length > MAX_ATTACHMENTS) {
      setFileError(t("errorTooManyAttachments"));
      return;
    }
    for (const file of selected) {
      if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
        setFileError(t("errorAttachmentTooLarge", { name: file.name }));
        return;
      }
      if (!ACCEPTED_ATTACHMENT_TYPES.includes(file.type)) {
        setFileError(t("errorAttachmentType", { name: file.name }));
        return;
      }
    }
    setFileError(null);
    setFiles((prev) => [...prev, ...selected]);
  }

  function removeFile(name: string) {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  }

  async function onSubmit(data: QuoteRequestInput) {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const recaptchaToken = await getRecaptchaToken("quote_request");

      const fd = new FormData();
      for (const [key, value] of Object.entries(data)) {
        fd.append(key, String(value ?? ""));
      }
      fd.append("recaptchaToken", recaptchaToken ?? "");
      for (const file of files) fd.append("attachments", file);

      const res = await fetch("/api/devis", { method: "POST", body: fd });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (body.error === "service_not_configured") {
          setSubmitError(t("errorServiceNotConfigured"));
        } else if (body.error === "recaptcha_failed") {
          setSubmitError(t("errorRecaptcha"));
        } else {
          setSubmitError(t("errorGeneric"));
        }
        setSubmitting(false);
        return;
      }
      const { referenceNumber } = await res.json();
      router.push(`/devis/merci?ref=${encodeURIComponent(referenceNumber)}`);
    } catch {
      setSubmitError(t("errorGeneric"));
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12" noValidate>
      <input type="hidden" {...register("locale")} />

      <div>
        <h2 className="font-heading text-lg font-semibold text-ink-950">{t("sectionContact")}</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label={t("fullName")} htmlFor="fullName" error={errors.fullName?.message}>
            <input id="fullName" className={inputClass} {...register("fullName")} />
          </Field>
          <Field label={t("email")} htmlFor="email" error={errors.email?.message}>
            <input id="email" type="email" className={inputClass} {...register("email")} />
          </Field>
          <Field label={t("phone")} htmlFor="phone" error={errors.phone?.message}>
            <input id="phone" type="tel" className={inputClass} {...register("phone")} />
          </Field>
          <Field label={t("role")} htmlFor="role" optional={t("optional")} error={errors.role?.message}>
            <input id="role" className={inputClass} {...register("role")} />
          </Field>
        </div>
      </div>

      <div>
        <h2 className="font-heading text-lg font-semibold text-ink-950">{t("sectionCompany")}</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label={t("company")} htmlFor="company" error={errors.company?.message}>
            <input id="company" className={inputClass} {...register("company")} />
          </Field>
          <Field label={t("location")} htmlFor="location" error={errors.location?.message}>
            <input id="location" className={inputClass} {...register("location")} />
          </Field>
          <Field label={t("sector")} htmlFor="sector" error={errors.sector?.message}>
            <select id="sector" className={inputClass} defaultValue="" {...register("sector")}>
              <option value="" disabled>
                {t("selectPlaceholder")}
              </option>
              {sectors.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label[locale]}
                </option>
              ))}
            </select>
          </Field>
          <Field
            label={t("revenueRange")}
            htmlFor="revenueRange"
            optional={t("optional")}
            error={errors.revenueRange?.message}
          >
            <select id="revenueRange" className={inputClass} defaultValue="" {...register("revenueRange")}>
              <option value="">{t("selectPlaceholder")}</option>
              {revenueRangeOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label[locale]}
                </option>
              ))}
            </select>
          </Field>
          <Field
            label={t("headcountRange")}
            htmlFor="headcountRange"
            optional={t("optional")}
            error={errors.headcountRange?.message}
          >
            <select id="headcountRange" className={inputClass} defaultValue="" {...register("headcountRange")}>
              <option value="">{t("selectPlaceholder")}</option>
              {headcountRangeOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label[locale]}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <div>
        <h2 className="font-heading text-lg font-semibold text-ink-950">{t("sectionProject")}</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label={t("servicePole")} htmlFor="servicePole" error={errors.servicePole?.message}>
            <select id="servicePole" className={inputClass} defaultValue="" {...register("servicePole")}>
              <option value="" disabled>
                {t("selectPlaceholder")}
              </option>
              {servicePoles.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name[locale]}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t("urgency")} htmlFor="urgency" error={errors.urgency?.message}>
            <select id="urgency" className={inputClass} {...register("urgency")}>
              {urgencyOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label[locale]}
                </option>
              ))}
            </select>
          </Field>
          <Field
            label={t("budgetRange")}
            htmlFor="budgetRange"
            optional={t("optional")}
            error={errors.budgetRange?.message}
          >
            <select id="budgetRange" className={inputClass} defaultValue="" {...register("budgetRange")}>
              <option value="">{t("selectPlaceholder")}</option>
              {budgetRangeOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label[locale]}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="mt-5">
          <Field label={t("message")} htmlFor="message" error={errors.message?.message}>
            <textarea
              id="message"
              rows={5}
              placeholder={t("messagePlaceholder")}
              className={inputClass}
              {...register("message")}
            />
          </Field>
        </div>
      </div>

      <div>
        <h2 className="font-heading text-lg font-semibold text-ink-950">{t("sectionAttachments")}</h2>
        <p className="mt-1.5 text-xs text-slate-500">{t("attachmentsHint")}</p>
        <label
          htmlFor="attachments"
          className="mt-4 flex cursor-pointer items-center gap-2.5 rounded-lg border border-dashed border-slate-300 px-4 py-3.5 text-sm font-medium text-ink-800 hover:border-ink-700 hover:bg-slate-50"
        >
          <Paperclip size={16} />
          {t("attachmentsCta")}
        </label>
        <input
          id="attachments"
          type="file"
          multiple
          className="hidden"
          accept={ACCEPTED_ATTACHMENT_TYPES.join(",")}
          onChange={handleFileChange}
        />
        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((file) => (
              <li
                key={file.name}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-3.5 py-2 text-sm text-slate-700"
              >
                <span className="truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(file.name)}
                  className="ml-3 shrink-0 text-slate-400 hover:text-red-600"
                  aria-label="Remove"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
        {fileError && <p className="mt-2 text-xs text-red-600">{fileError}</p>}
      </div>

      <div>
        <label className="flex items-start gap-2.5 text-sm text-slate-600">
          <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-slate-300" {...register("consent")} />
          <span>
            {t("consent")}{" "}
            <Link href="/confidentialite" className="font-medium text-ink-800 underline hover:text-accent-600">
              {t("privacyLink")}
            </Link>
            .
          </span>
        </label>
        {errors.consent && <p className="mt-1.5 text-xs text-red-600">{errors.consent.message}</p>}
      </div>

      {submitError && (
        <p className={cn("rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700")} role="alert">
          {submitError}
        </p>
      )}

      <div>
        <Button type="submit" variant="accent" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? t("submitting") : t("submit")}
        </Button>
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <p className="mt-3 text-xs text-slate-400">
            {t.rich("recaptchaNotice", {
              privacy: (chunks) => (
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-slate-600"
                >
                  {chunks}
                </a>
              ),
              terms: (chunks) => (
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-slate-600"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        )}
      </div>

      <RecaptchaScript />
    </form>
  );
}
