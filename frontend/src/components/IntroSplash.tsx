import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useGuest } from "../context/GuestContext";
import { hasSeenIntro, markIntroSeen } from "../utils/storage";
import { wedding } from "../config";

const AUTO_DISMISS_MS = 6000;

export function IntroSplash() {
  const { t, i18n } = useTranslation();
  const { guest } = useGuest();

  const guestName = guest?.name;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasSeenIntro()) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = window.setTimeout(() => {
      setVisible(false);
    }, AUTO_DISMISS_MS);
    return () => window.clearTimeout(id);
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
  };

  const dateLabel = wedding.date.toLocaleDateString(i18n.language, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <AnimatePresence
      onExitComplete={() => {
        markIntroSeen();
      }}
    >
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={dismiss}
          role="button"
          aria-label={t("intro.skip")}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-ivory)] cursor-pointer px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-xl"
          >
            <AnimatePresence
              onExitComplete={() => {
                markIntroSeen();
              }}
            >
              {guestName && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-sage-600)] mb-6"
                >
                  {t("intro.greeting")}
                  {guest?.name ? `, ${guest.name}` : ""}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="font-serif text-5xl sm:text-6xl text-[var(--color-ink)] leading-tight">
              {wedding.bride}
            </div>

            <div className="font-script text-6xl sm:text-7xl text-[var(--color-sage-600)] my-2">
              {t("intro.coupleAnd")}
            </div>

            <div className="font-serif text-5xl sm:text-6xl text-[var(--color-ink)] leading-tight">
              {wedding.groom}
            </div>

            <div className="mt-8 text-sm tracking-[0.25em] uppercase text-[var(--color-muted)]">
              {dateLabel}
            </div>

            <div className="mt-3 font-serif italic text-[var(--color-ink-soft)]">
              {t("intro.tagline")}
            </div>

            <div className="mt-12 text-[10px] uppercase tracking-[0.35em] text-[var(--color-muted)]">
              {t("intro.skip")}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
