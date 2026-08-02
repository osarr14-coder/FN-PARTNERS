import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-700";

const variants = {
  primary: "bg-ink-900 text-white hover:bg-ink-800",
  accent: "bg-accent-500 text-white hover:bg-accent-600",
  outline: "border border-ink-900/20 text-ink-900 hover:bg-ink-900/5",
  ghost: "text-ink-900 hover:bg-ink-900/5",
};

interface ButtonBaseProps {
  variant?: keyof typeof variants;
  className?: string;
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonBaseProps & ComponentProps<"button">) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className,
  href,
  ...props
}: ButtonBaseProps & ComponentProps<typeof Link>) {
  return <Link href={href} className={cn(base, variants[variant], className)} {...props} />;
}
