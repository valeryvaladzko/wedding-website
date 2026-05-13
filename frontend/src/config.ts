import vibeImage from "./assets/vibe.jpg";
import registrationImage from "./assets/registration.jpg";
import proposalImage from "./assets/proposal.jpg";

export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "http://localhost:8000/api";

export const wedding = {
  bride: "Anastasia",
  groom: "Valery",
  date: new Date("2026-07-10T15:00:00"),
  endDate: new Date("2026-07-12T12:00:00"),
  venueName: "Las Papiernia",
  venueAddress: '"Rezydencja Nowy Orlean" Papiernia 4K, Stanisławów, 05-304',
  // Google Maps embed URL (used in iframe).
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2439.025548413885!2d21.5143878!3d52.31553890000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471f27063828730b%3A0x12cedb4cfe2bda68!2sRezydencja%20Nowy%20Orlean!5e0!3m2!1sen!2spl!4v1778323831526!5m2!1sen!2spl",
  // Public Google Maps link (used in "Get directions" button).
  googleMapsUrl: "https://maps.app.goo.gl/KCcJn4EWEKyYmNeN7",
} as const;

export const images = {
  vibe: vibeImage,
  registration: registrationImage,
  proposal: proposalImage,
} as const;
