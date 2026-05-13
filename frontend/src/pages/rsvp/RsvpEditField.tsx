import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { findStepById, isFormComplete, type StepId } from "./stepRegistry";
import type { useRsvp } from "../../hooks/useRsvp";

type Rsvp = ReturnType<typeof useRsvp>;

interface RsvpEditFieldProps {
  rsvp: Rsvp;
  stepId: StepId;
  onClose: () => void;
}

export function RsvpEditField({ rsvp, stepId, onClose }: RsvpEditFieldProps) {
  const { t } = useTranslation();
  const step = findStepById(stepId);
  if (!step) return null;

  const canSave = step.isComplete(rsvp.form);

  const onSave = async () => {
    const completed = isFormComplete(rsvp.form);
    const ok = await rsvp.save({
      rsvp_completed: completed ? "true" : "false",
      rsvp_last_step: stepId,
    });
    if (ok) onClose();
  };

  const onCancel = () => {
    rsvp.reset();
    onClose();
  };

  return (
    <Card>
      <div className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
        {t(step.labelKey)}
      </div>

      <motion.div
        key={stepId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {step.render({ form: rsvp.form, setField: rsvp.setField })}
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Button variant="secondary" onClick={onCancel}>
          {t("common.cancel")}
        </Button>
        <Button
          onClick={() => void onSave()}
          disabled={!canSave || rsvp.status === "saving"}
        >
          {t("common.save")}
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
  );
}
