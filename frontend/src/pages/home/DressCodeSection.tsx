import { useTranslation } from "react-i18next";
import { Card } from "../../components/Card";

const swatches = [
  "bg-[#0B0B0B]",
  "bg-[#5C4734]",
  "bg-[#856A57]",
  "bg-[#D8CCB5]",
  "bg-[#E2D2C5]",
  "bg-[#AEBFA4]",
  "bg-[#5E6845]",
];

export function DressCodeSection() {
  const { t } = useTranslation();

  return (
    <Card className="text-center">
      <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-sage-600)]">
        {t("home.dressCodeTitle")}
      </div>
      <h2 className="font-serif text-4xl sm:text-5xl mt-3">
        {t("home.dressCodeTitle")}
      </h2>
      <p className="mt-5 text-[var(--color-ink-soft)] leading-relaxed max-w-prose mx-auto">
        {t("home.dressCodeBody")}
      </p>
      <p className="mt-3 text-[var(--color-ink-soft)] leading-relaxed max-w-prose mx-auto">
        {t("home.dressCodeBody2")}
      </p>
      <div className="mt-6 flex justify-center gap-3">
        {swatches.map((bg, i) => (
          <span
            key={i}
            className={`h-10 w-10 rounded-full border border-[var(--color-line)] ${bg}`}
          />
        ))}
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
        {t("home.dressCodePalette")}
      </div>
    </Card>
  );
}
