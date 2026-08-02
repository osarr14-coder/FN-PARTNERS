"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/button";

const STORAGE_KEY = "fnp-cookie-consent";

export function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // localStorage n'existe pas côté serveur : la lecture ne peut se faire qu'après
    // le montage, pour éviter un mismatch d'hydratation.
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!stored) setVisible(true);
  }, []);

  function choose(value: "accepted" | "declined") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          {t("message")}{" "}
          <Link href="/confidentialite" className="font-medium text-ink-800 underline hover:text-accent-600">
            {t("learnMore")}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => choose("declined")}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {t("decline")}
          </button>
          <Button onClick={() => choose("accepted")} variant="primary" className="px-4 py-2">
            {t("accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
