import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { StepIndicator } from "../../components/StepIndicator";
import { applicableSteps } from "./stepRegistry";
import type { useRsvp } from "../../hooks/useRsvp";

type Rsvp = ReturnType<typeof useRsvp>;

interface RsvpWizardProps {
  rsvp: Rsvp;
  startStep?: number;
  onComplete: () => void;
  onCancel?: () => void;
}

export function RsvpWizard({
  rsvp,
  startStep = 0,
  onComplete,
  onCancel,
}: RsvpWizardProps) {
  const { t } = useTranslation();
  const steps = useMemo(() => applicableSteps(rsvp.form), [rsvp.form]);
  const [index, setIndex] = useState(startStep);

  useEffect(() => {
    if (index > steps.length - 1) setIndex(Math.max(steps.length - 1, 0));
  }, [steps.length, index]);

  const safeIndex = Math.min(index, steps.length - 1);
  const current = steps[safeIndex];
  const isLast = safeIndex >= steps.length - 1;
  const canAdvance = current ? current.isComplete(rsvp.form) : false;

  const labels = useMemo(() => steps.map((s) => t(s.labelKey)), [steps, t]);

  const next = async () => {
    if (!current) return;
    if (isLast) {
      const ok = await rsvp.save({
        rsvp_completed: "true",
        rsvp_last_step: current.id,
      });
      if (ok) onComplete();
    } else {
      const ok = await rsvp.save({ rsvp_last_step: current.id });
      if (ok) setIndex(safeIndex + 1);
    }
  };
  const back = () => setIndex((i) => Math.max(i - 1, 0));

  return (
    <div>
      <StepIndicator step={safeIndex + 1} steps={labels} />

      <Card>
        <motion.div
          key={current?.id ?? "empty"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {current?.render({ form: rsvp.form, setField: rsvp.setField })}
        </motion.div>
        <div className="border-t border-gray-300 mt-8" />
        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8">
          {safeIndex > 0 ? (
            <Button variant="secondary" onClick={back}>
              {t("common.back")}
            </Button>
          ) : (
            onCancel && (
              <Button variant="secondary" onClick={onCancel}>
                {t("common.cancel")}
              </Button>
            )
          )}
          <Button
            onClick={() => void next()}
            disabled={!canAdvance || rsvp.status === "saving"}
          >
            {isLast ? t("rsvp.confirm") : t("common.next")}
          </Button>
        </div>

        {rsvp.status === "saving" && (
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            {t("common.saving")}
          </p>
        )}
        {rsvp.status === "error" && (
          <p className="mt-4 text-sm text-[var(--color-rose-deep)]">
            {rsvp.errorMessage ?? t("rsvp.saveError")}
          </p>
        )}
      </Card>
    </div>
  );
}
