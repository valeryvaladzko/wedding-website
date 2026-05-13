import { useTranslation } from "react-i18next";
import { Card } from "../../components/Card";
import {
  StatusBadge,
  attendanceToStatus,
} from "../../components/StatusBadge";
import { applicableSteps, type StepId } from "./stepRegistry";
import type { RsvpForm } from "../../types/guest";

interface RsvpSummaryProps {
  form: RsvpForm;
  onEdit: (stepId: StepId) => void;
}

export function RsvpSummary({ form, onEdit }: RsvpSummaryProps) {
  const { t } = useTranslation();
  const status = attendanceToStatus(form.attendance);
  const steps = applicableSteps(form);

  return (
    <Card>
      <div className="flex items-center justify-between gap-3 mb-6">
        <h2 className="font-serif text-3xl">{t("rsvp.reviewTitle")}</h2>
        <StatusBadge status={status} />
      </div>

      <div className="space-y-6">
        {steps.map((step) => {
          const rows = step.summaryRows(form, t);
          return (
            <section key={step.id}>
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  {t(step.labelKey)}
                </h3>
                <button
                  type="button"
                  onClick={() => onEdit(step.id)}
                  className="shrink-0 text-xs uppercase tracking-wider text-[var(--color-sage-700)] hover:text-[var(--color-sage-800)] underline-offset-4 hover:underline"
                >
                  {t("rsvp.editSection")}
                </button>
              </div>
              <dl className="space-y-1 border-t border-[var(--color-line)]">
                {rows.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-start gap-3 py-3 border-b border-[var(--color-line)] last:border-b-0"
                  >
                    <div className="flex-1 min-w-0">
                      <dt className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                        {r.label}
                      </dt>
                      <dd className="mt-1 text-[var(--color-ink)] break-words">
                        {r.value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </section>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-[var(--color-muted)] text-center">
        {t("rsvp.savedHint")}
      </p>
    </Card>
  );
}
