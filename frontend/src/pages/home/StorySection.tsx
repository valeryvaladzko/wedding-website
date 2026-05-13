import { useTranslation } from "react-i18next";
import { images } from "../../config";

export function StorySection() {
  const { t } = useTranslation();

  return (
    <section className="grid sm:grid-cols-2 gap-6 sm:gap-10 items-center">
      <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--color-line)] order-1">
        <img
          src={images.registration}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="order-2">
        <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-sage-600)]">
          {t("home.storyTitle")}
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl mt-3">
          {t("home.storyTitle")}
        </h2>
        <p className="mt-5 text-[var(--color-ink-soft)] leading-relaxed">
          {t("home.storyP1")}
        </p>
        <p className="mt-4 text-[var(--color-ink-soft)] leading-relaxed">
          {t("home.storyP2")}
        </p>
      </div>
    </section>
  );
}
