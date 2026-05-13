import { useTranslation } from "react-i18next";
import type { Attendance } from "../types/guest";

export type RsvpStatus = "pending" | "accepted" | "declined";

export function attendanceToStatus(
  attendance: Attendance | undefined,
): RsvpStatus {
  if (attendance === "yes") return "accepted";
  if (attendance === "no") return "declined";
  return "pending";
}

interface StatusBadgeProps {
  status: RsvpStatus;
  size?: "sm" | "md";
}

const styles: Record<RsvpStatus, string> = {
  pending: "bg-stone-100 text-stone-500 border-stone-300 grayscale opacity-70",
  accepted:
    "bg-[var(--color-sage-100)] text-[var(--color-sage-700)] border-[var(--color-sage-300)]",
  declined:
    "bg-rose-50 text-[var(--color-rose-deep)] border-[var(--color-rose-soft)]",
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const { t } = useTranslation();
  const sizing =
    size === "sm" ? "px-2 py-0.5 text-[12px]" : "px-3 py-1 text-xs";

  return (
    <span
      className={
        "inline-flex items-center justify-center rounded-full border text-center font-medium  tracking-wider " +
        sizing +
        " " +
        styles[status]
      }
    >
      {t(`status.${status}`)}
    </span>
  );
}
