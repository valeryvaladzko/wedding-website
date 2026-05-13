import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Parts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function diffParts(target: Date): Parts {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

interface CountdownProps {
  target: Date;
}

export function Countdown({ target }: CountdownProps) {
  const { t } = useTranslation();
  const [parts, setParts] = useState<Parts>(() => diffParts(target));

  useEffect(() => {
    const update = () => setParts(diffParts(target));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells: { label: string; value: number }[] = [
    { label: t("home.countdownDays"), value: parts.days },
    { label: t("home.countdownHours"), value: parts.hours },
    { label: t("home.countdownMinutes"), value: parts.minutes },
    { label: t("home.countdownSeconds"), value: parts.seconds },
  ];

  return (
    <div className="text-center">
      <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-muted)] mb-4">
        {t("home.countdown")}
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {cells.map((c) => (
          <div key={c.label} className="text-center">
            <div className="font-serif text-3xl sm:text-5xl text-[var(--color-sage-700)] tabular-nums leading-none">
              {String(c.value).padStart(2, "0")}
            </div>
            <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
              {c.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
