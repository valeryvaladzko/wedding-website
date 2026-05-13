export interface ScheduleEntry {
  time: string;
  title: string;
  description?: string;
}

export function ScheduleItem({ entry }: { entry: ScheduleEntry }) {
  return (
    <div className="relative pl-8 sm:pl-10 pb-8 last:pb-0 border-l border-[var(--color-line)]">
      <span
        aria-hidden
        className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-[var(--color-sage-500)] ring-4 ring-[var(--color-ivory)]"
      />
      <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage-600)] font-medium">
        {entry.time}
      </div>
      <div className="font-serif text-2xl sm:text-3xl mt-1">{entry.title}</div>
      {entry.description && (
        <p className="text-[var(--color-ink-soft)] mt-2 leading-relaxed">
          {entry.description}
        </p>
      )}
    </div>
  );
}
