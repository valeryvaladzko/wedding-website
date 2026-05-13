import { useTranslation } from "react-i18next";
import type { DrivePhoto } from "../types/guest";

export function PhotoGallery({ photos }: { photos: DrivePhoto[] }) {
  const { t } = useTranslation();

  if (photos.length === 0) {
    return (
      <div className="text-center py-12 px-6 border border-dashed border-[var(--color-line)] rounded-2xl text-[var(--color-muted)]">
        {t("photos.empty")}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
      {photos.map((p) => (
        <a
          key={p.id}
          href={p.webViewLink ?? "#"}
          target="_blank"
          rel="noreferrer"
          className="aspect-square rounded-xl overflow-hidden bg-[var(--color-cream)] border border-[var(--color-line)] hover:opacity-90 transition-opacity"
        >
          {p.thumbnailLink ? (
            <img
              src={p.thumbnailLink}
              alt={p.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-[var(--color-muted)] p-2 text-center">
              {p.name}
            </div>
          )}
        </a>
      ))}
    </div>
  );
}
