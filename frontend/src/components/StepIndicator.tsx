import { useTranslation } from "react-i18next";

interface StepIndicatorProps {
  step: number;
  steps: string[];
}

export function StepIndicator({ step, steps }: StepIndicatorProps) {
  const { t } = useTranslation();
  const safeStep = Math.min(step, steps.length);

  return (
    <div className="mb-6">
      <div className="flex gap-1.5">
        {steps.map((label, i) => (
          <div
            key={label + i}
            className={
              "h-1 flex-1 rounded-full transition-colors duration-300 " +
              (i + 1 <= step
                ? "bg-[var(--color-sage-600)]"
                : "bg-[var(--color-line)]")
            }
          />
        ))}
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
        {t("rsvp.stepOf", { step: safeStep, total: steps.length })} ·{" "}
        <span className="text-[var(--color-ink-soft)]">
          {steps[safeStep - 1]}
        </span>
      </div>
    </div>
  );
}
