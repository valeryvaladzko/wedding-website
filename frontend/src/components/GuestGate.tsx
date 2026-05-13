import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useGuest } from "../context/GuestContext";
import { Card } from "./Card";

interface GuestGateProps {
  children: ReactNode;
  requireGuest?: boolean;
}

export function GuestGate({ children, requireGuest = true }: GuestGateProps) {
  const { status, error } = useGuest();
  const { t } = useTranslation();

  if (status === "loading") {
    return (
      <div className="text-[var(--color-muted)] py-8 text-center">
        {t("common.loading")}
      </div>
    );
  }

  if (status === "no-token") {
    if (!requireGuest) return <>{children}</>;
    return (
      <Card>
        <h2 className="font-serif text-3xl">{t("guestGate.welcomeTitle")}</h2>
        <p className="mt-3 text-[var(--color-ink-soft)] leading-relaxed">
          {t("guestGate.welcomeBody")}
        </p>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Card>
        <h2 className="font-serif text-3xl text-[var(--color-rose-deep)]">
          {t("guestGate.errorTitle")}
        </h2>
        <p className="mt-3 text-[var(--color-ink-soft)] leading-relaxed">
          {error ?? t("guestGate.errorBody")}
        </p>
      </Card>
    );
  }

  return <>{children}</>;
}
