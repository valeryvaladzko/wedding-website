import { useTranslation } from "react-i18next";
import { images } from "../../config";

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section className="grid sm:grid-cols-2 gap-6 sm:gap-10 items-center">
      <div className="order-2 sm:order-1">
        <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-sage-600)]">
          {t("home.aboutTitle")}
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl mt-3">
          {t("home.aboutTitle")}
        </h2>
        <p className="mt-5 text-[var(--color-ink-soft)] leading-relaxed">
          {t("home.aboutBody")}
        </p>
      </div>
      <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--color-line)] order-1 sm:order-2">
        <img
          src={images.proposal}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
