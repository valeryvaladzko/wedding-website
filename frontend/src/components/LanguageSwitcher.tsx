import { useTranslation } from "react-i18next";
import {
  LANGUAGE_LABELS,
  SUPPORTED_LANGUAGES,
  type Language,
} from "../i18n";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = (
    SUPPORTED_LANGUAGES.includes(i18n.resolvedLanguage as Language)
      ? i18n.resolvedLanguage
      : "ru"
  ) as Language;

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] p-0.5 text-xs font-medium tracking-wider"
    >
      {SUPPORTED_LANGUAGES.map((lang) => {
        const active = lang === current;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => void i18n.changeLanguage(lang)}
            className={
              "px-2.5 py-1 rounded-full transition-colors " +
              (active
                ? "bg-[var(--color-sage-600)] text-white"
                : "text-[var(--color-muted)] hover:text-[var(--color-ink)]")
            }
            aria-pressed={active}
          >
            {LANGUAGE_LABELS[lang]}
          </button>
        );
      })}
    </div>
  );
}
