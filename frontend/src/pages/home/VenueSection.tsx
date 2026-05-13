import { useTranslation } from "react-i18next";
import { wedding } from "../../config";
import { Button } from "../../components/Button";
import { downloadIcs } from "../../utils/calendar";

export function VenueSection() {
  const { t } = useTranslation();

  return (
    <section>
      <div className="text-center mb-6">
        <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-sage-600)]">
          {t("home.venueTitle")}
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl mt-3">
          {wedding.venueName}
        </h2>
        <div className="mt-2 text-[var(--color-ink-soft)]">
          {wedding.venueAddress}
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden border border-[var(--color-line)]">
        <iframe
          title="Venue map"
          src={wedding.mapEmbedUrl}
          className="w-full h-72 sm:h-96 block"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        <a
          href={wedding.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="block"
        >
          <Button variant="outline">📍 {t("home.getDirections")}</Button>
        </a>
        <Button onClick={downloadIcs}>🗓 {t("common.addToCalendar")}</Button>
      </div>
    </section>
  );
}
