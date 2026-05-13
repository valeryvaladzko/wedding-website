export interface FaqEntryData {
  q: string;
  a: string;
}

export function FaqEntry({ entry }: { entry: FaqEntryData }) {
  return (
    <div className="py-6 border-b border-[var(--color-line)] last:border-b-0">
      <h3 className="font-serif text-2xl sm:text-3xl text-[var(--color-ink)]">
        {entry.q}
      </h3>
      <p className="mt-3 text-[var(--color-ink-soft)] leading-relaxed">
        {entry.a}
      </p>
    </div>
  );
}
