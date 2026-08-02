import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cn("text-xs font-semibold uppercase tracking-wider", light ? "text-accent-500" : "text-accent-600")}>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-2 text-balance font-heading text-3xl font-semibold sm:text-4xl",
          light ? "text-white" : "text-ink-950"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-3 leading-relaxed", light ? "text-slate-300" : "text-slate-600")}>{subtitle}</p>
      )}
    </div>
  );
}
