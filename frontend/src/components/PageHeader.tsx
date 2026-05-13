import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: ReactNode;
  title: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: PageHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  return (
    <header className={`mb-8 sm:mb-10 ${alignClass}`}>
      {eyebrow && (
        <div className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-muted)] mb-3">
          {eyebrow}
        </div>
      )}
      <h1 className="font-serif text-4xl sm:text-5xl">{title}</h1>
      {subtitle && (
        <p className="mt-3 text-[var(--color-ink-soft)] text-base sm:text-lg">
          {subtitle}
        </p>
      )}
    </header>
  );
}
