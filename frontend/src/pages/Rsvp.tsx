import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { GuestGate } from "../components/GuestGate";
import { useGuest } from "../context/GuestContext";
import { guestToForm, useRsvp } from "../hooks/useRsvp";
import { RsvpWizard } from "./rsvp/RsvpWizard";
import { RsvpSummary } from "./rsvp/RsvpSummary";
import { RsvpEditField } from "./rsvp/RsvpEditField";
import { findResumeIndex, type StepId } from "./rsvp/stepRegistry";

type Mode =
  | { kind: "summary" }
  | { kind: "wizard"; startStep: number }
  | { kind: "edit"; stepId: StepId };

function RsvpInner() {
  const { t } = useTranslation();
  const { guest } = useGuest();
  const rsvp = useRsvp();

  const isCompleted = guest?.rsvp_completed === "true";
  const initialMode: Mode = isCompleted
    ? { kind: "summary" }
    : { kind: "wizard", startStep: findResumeIndex(guestToForm(guest)) };
  const [mode, setMode] = useState<Mode>(initialMode);

  const goSummary = () => setMode({ kind: "summary" });
  const goWizard = (startStep = 0) => setMode({ kind: "wizard", startStep });
  const goEdit = (stepId: StepId) => setMode({ kind: "edit", stepId });

  const onEditClose = () => {
    if (guest?.rsvp_completed === "true") goSummary();
    else goWizard(findResumeIndex(rsvp.form));
  };

  return (
    <div>
      <PageHeader
        eyebrow={t("home.eyebrow")}
        title={t("rsvp.title")}
        subtitle={
          guest ? t("rsvp.subtitleNamed", { name: guest.name }) : undefined
        }
      />
      <motion.div
        key={mode.kind + ("stepId" in mode ? mode.stepId : "")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {mode.kind === "summary" && (
          <RsvpSummary form={rsvp.form} onEdit={goEdit} />
        )}
        {mode.kind === "wizard" && (
          <RsvpWizard
            rsvp={rsvp}
            startStep={mode.startStep}
            onComplete={goSummary}
            onCancel={isCompleted ? goSummary : undefined}
          />
        )}
        {mode.kind === "edit" && (
          <RsvpEditField
            rsvp={rsvp}
            stepId={mode.stepId}
            onClose={onEditClose}
          />
        )}
      </motion.div>
    </div>
  );
}

export function Rsvp() {
  return (
    <GuestGate>
      <RsvpInner />
    </GuestGate>
  );
}
