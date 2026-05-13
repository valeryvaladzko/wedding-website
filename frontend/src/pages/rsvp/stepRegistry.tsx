import type { ReactNode } from "react";
import { StepAttendance, StepMenu, StepLogistics, StepNotes } from "./Steps";
import type { RsvpForm } from "../../types/guest";

export type StepId = "attend" | "menu" | "logistics" | "notes";

type T = (key: string, opts?: Record<string, unknown>) => string;

export interface StepRenderArgs {
  form: RsvpForm;
  setField: <K extends keyof RsvpForm>(key: K, value: RsvpForm[K]) => void;
}

export interface SummaryRow {
  label: string;
  value: string;
}

export interface RsvpStep {
  id: StepId;
  labelKey: string;
  isApplicable: (form: RsvpForm) => boolean;
  isComplete: (form: RsvpForm) => boolean;
  render: (args: StepRenderArgs) => ReactNode;
  summaryRows: (form: RsvpForm, t: T) => SummaryRow[];
}

const yesOnly = (form: RsvpForm) => form.attendance === "yes";

export const stepRegistry: RsvpStep[] = [
  {
    id: "attend",
    labelKey: "rsvp.steps.attend",
    isApplicable: () => true,
    isComplete: (f) => f.attendance !== "",
    render: ({ form, setField }) => (
      <StepAttendance
        value={form.attendance}
        onSelect={(v) => setField("attendance", v)}
      />
    ),
    summaryRows: (f, t) => [
      {
        label: t("rsvp.fields.attendance"),
        value:
          f.attendance === "yes"
            ? t("rsvp.attendYes")
            : f.attendance === "no"
              ? t("rsvp.attendNo")
              : "-",
      },
    ],
  },
  {
    id: "menu",
    labelKey: "rsvp.steps.menu",
    isApplicable: yesOnly,
    isComplete: (f) =>
      !!f.soup_choice &&
      !!f.meal_choice &&
      !!f.alcohol_choice &&
      (f.alcohol_choice !== "other" || f.alcohol_other.trim().length > 0),
    render: ({ form, setField }) => (
      <StepMenu
        value={{
          soup: form.soup_choice,
          meal: form.meal_choice,
          alcohol: form.alcohol_choice,
          alcoholOther: form.alcohol_other,
        }}
        onChange={(p) => {
          if (p.soup !== undefined) setField("soup_choice", p.soup);
          if (p.meal !== undefined) setField("meal_choice", p.meal);
          if (p.alcohol !== undefined) setField("alcohol_choice", p.alcohol);
          if (p.alcoholOther !== undefined)
            setField("alcohol_other", p.alcoholOther);
        }}
      />
    ),
    summaryRows: (f, t) => {
      const parts: string[] = [];
      if (f.soup_choice) parts.push(t(`rsvp.soupOptions.${f.soup_choice}`));
      if (f.meal_choice) parts.push(t(`rsvp.mealOptions.${f.meal_choice}`));
      if (f.alcohol_choice) {
        const alcohol =
          f.alcohol_choice === "other" && f.alcohol_other
            ? f.alcohol_other
            : t(`rsvp.alcoholOptions.${f.alcohol_choice}`);
        parts.push(alcohol);
      }
      return [
        {
          label: t("rsvp.fields.menu"),
          value: parts.length ? parts.join(" · ") : "-",
        },
      ];
    },
  },
  {
    id: "logistics",
    labelKey: "rsvp.steps.logistics",
    isApplicable: yesOnly,
    isComplete: (f) => !!f.second_day && !!f.transport_offer,
    render: ({ form, setField }) => (
      <StepLogistics
        value={{
          secondDay: form.second_day,
          transport: form.transport_offer,
          transportDetails: form.transport_details,
        }}
        onChange={(p) => {
          if (p.secondDay !== undefined) setField("second_day", p.secondDay);
          if (p.transport !== undefined)
            setField("transport_offer", p.transport);
          if (p.transportDetails !== undefined)
            setField("transport_details", p.transportDetails);
        }}
      />
    ),
    summaryRows: (f, t) => {
      const secondDayValue =
        f.second_day === "yes"
          ? t("rsvp.secondDayYes")
          : f.second_day === "no"
            ? t("rsvp.secondDayNo")
            : f.second_day === "maybe"
              ? t("rsvp.secondDayMaybe")
              : "-";
      const transportValue =
        f.transport_offer === "yes"
          ? f.transport_details
            ? `${t("rsvp.transportYes")} · ${f.transport_details}`
            : t("rsvp.transportYes")
          : f.transport_offer === "no"
            ? t("rsvp.transportNo")
            : "-";
      return [
        { label: t("rsvp.fields.secondDay"), value: secondDayValue },
        { label: t("rsvp.fields.transport"), value: transportValue },
      ];
    },
  },
  {
    id: "notes",
    labelKey: "rsvp.steps.notes",
    isApplicable: yesOnly,
    isComplete: () => true,
    render: ({ form, setField }) => (
      <StepNotes
        value={form.additional_notes}
        onChange={(v) => setField("additional_notes", v)}
      />
    ),
    summaryRows: (f, t) => [
      { label: t("rsvp.fields.notes"), value: f.additional_notes || "-" },
    ],
  },
];

export function applicableSteps(form: RsvpForm): RsvpStep[] {
  return stepRegistry.filter((s) => s.isApplicable(form));
}

export function findStepById(id: StepId): RsvpStep | undefined {
  return stepRegistry.find((s) => s.id === id);
}

export function findResumeIndex(form: RsvpForm): number {
  const steps = applicableSteps(form);
  const idx = steps.findIndex((s) => !s.isComplete(form));
  return idx === -1 ? steps.length - 1 : idx;
}

export function isFormComplete(form: RsvpForm): boolean {
  return applicableSteps(form).every((s) => s.isComplete(form));
}
