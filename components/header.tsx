"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { ButtonLink } from "./button";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t("home") },
    { href: "/a-propos", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/secteurs", label: t("sectors") },
    { href: "/actualites", label: t("news") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center py-4">
          <Image src="/images/fn-partners-logo.png" alt="FN Partners Consulting" width={460} height={225} className="h-9 w-auto sm:h-10" priority />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-ink-900" : "text-slate-600 hover:text-ink-800"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitcher />
          <ButtonLink href="/devis" variant="accent" className="px-5 py-2.5">
            {t("quote")}
          </ButtonLink>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="p-2 text-ink-900 lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <LanguageSwitcher />
            <ButtonLink href="/devis" variant="accent" onClick={() => setOpen(false)}>
              {t("quote")}
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
