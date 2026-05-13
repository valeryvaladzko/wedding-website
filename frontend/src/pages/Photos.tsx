import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { PhotoGallery } from "../components/PhotoGallery";
import { GuestGate } from "../components/GuestGate";
import { Button } from "../components/Button";
import { useGuest } from "../context/GuestContext";
import { fetchPhotos } from "../api/photos";
import type { DrivePhoto } from "../types/guest";

function PhotosInner() {
  const { t } = useTranslation();
  const { token, guest } = useGuest();
  const [photos, setPhotos] = useState<DrivePhoto[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    setStatus("loading");
    fetchPhotos(token)
      .then((data) => {
        if (!cancelled) {
          setPhotos(data);
          setStatus("idle");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div>
      <PageHeader
        eyebrow={t("home.eyebrow")}
        title={t("photos.title")}
        subtitle={t("photos.subtitle")}
      />

      {guest?.drive_folder_url && (
        <div className="mb-8 max-w-sm mx-auto">
          <a
            href={guest.drive_folder_url}
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <Button variant="outline">📁 {t("photos.openFolder")}</Button>
          </a>
        </div>
      )}

      {status === "loading" && (
        <div className="text-center text-[var(--color-muted)] py-12">
          {t("common.loading")}
        </div>
      )}

      {status === "error" && (
        <div className="text-center text-[var(--color-rose-deep)] py-12">
          {t("photos.error")}
        </div>
      )}

      {status === "idle" && <PhotoGallery photos={photos} />}
    </div>
  );
}

export function Photos() {
  return (
    <GuestGate>
      <PhotosInner />
    </GuestGate>
  );
}
