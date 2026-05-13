import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { FaqEntry } from "../components/FaqEntry";
import type { FaqEntryData } from "../components/FaqEntry";

export function Faq() {
  const { t } = useTranslation();
  const items = t("faq.items", { returnObjects: true }) as FaqEntryData[];

  return (
    <div>
      <PageHeader
        eyebrow={t("home.eyebrow")}
        title={t("faq.title")}
        subtitle={t("faq.subtitle")}
      />

      <div className="max-w-2xl mx-auto">
        {items.map((entry, i) => (
          <FaqEntry key={`${entry.q}-${i}`} entry={entry} />
        ))}
      </div>
    </div>
  );
}
