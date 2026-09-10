import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "./container";
import { contact, company } from "@/content/company";

export function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const locale = useLocale() as "fr" | "en";

  const links = [
    { href: "/a-propos", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/actualites", label: t("news") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <footer className="border-t border-slate-200 bg-ink-950 text-slate-300">
      <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/fn-partners-logo-white.png"
            alt={company.name}
            width={1860}
            height={800}
            className="h-9 w-auto"
          />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{tf("tagline")}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{tf("navigation")}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-slate-400 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{tf("contact")}</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-accent-500" />
              <span>{contact.addressLines[locale].join(", ")}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-accent-500" />
              <a href={contact.phoneHref} className="hover:text-white">
                {contact.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail size={16} className="mt-0.5 shrink-0 text-accent-500" />
              <span className="flex flex-col">
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
                <a href={`mailto:${contact.emailFounder}`} className="hover:text-white">
                  {contact.emailFounder}
                </a>
              </span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{tf("legal")}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/mentions-legales" className="text-slate-400 transition-colors hover:text-white">
                {tf("legalNotice")}
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="text-slate-400 transition-colors hover:text-white">
                {tf("privacy")}
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-5">
        <Container className="text-xs text-slate-500">
          © {new Date().getFullYear()} {company.name}. {tf("rights")}
        </Container>
      </div>
    </footer>
  );
}
