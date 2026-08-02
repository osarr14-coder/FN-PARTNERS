"use client";

import { usePathname, Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const activeLocale = useLocale();

  return (
    <div className={cn("flex items-center gap-1 text-sm font-medium", className)}>
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          {i > 0 && <span className="text-slate-400">/</span>}
          <Link
            href={pathname}
            locale={locale}
            className={cn(
              "uppercase tracking-wide transition-colors",
              locale === activeLocale ? "text-ink-900" : "text-slate-400 hover:text-ink-700"
            )}
          >
            {locale}
          </Link>
        </span>
      ))}
    </div>
  );
}
