interface SectionDividerProps {
  label?: string;
}

export function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="flex items-center gap-4 my-2 text-[var(--color-muted)]">
      <span className="flex-1 h-px bg-[var(--color-line)]" />
      {label && (
        <span className="font-script text-3xl text-[var(--color-sage-600)] leading-none">
          {label}
        </span>
      )}
      <span className="flex-1 h-px bg-[var(--color-line)]" />
    </div>
  );
}
