import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export function Card({ children, className = "", padded = true }: CardProps) {
  return (
    <div
      className={[
        "bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl shadow-[0_1px_2px_rgba(45,42,38,0.04)]",
        padded ? "p-6 sm:p-7" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
