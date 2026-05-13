import { wedding } from "../config";

function formatICSDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  );
}

export function downloadIcs(): void {
  const event = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Website//EN",
    "BEGIN:VEVENT",
    `UID:wedding-${wedding.date.getTime()}@wedding`,
    `SUMMARY:${wedding.bride} & ${wedding.groom} - Wedding`,
    `DTSTART:${formatICSDate(wedding.date)}`,
    `DTEND:${formatICSDate(wedding.endDate)}`,
    `LOCATION:${wedding.venueAddress}`,
    "DESCRIPTION:Wedding Ceremony & Reception",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([event], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;

  a.target = "_blank";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
