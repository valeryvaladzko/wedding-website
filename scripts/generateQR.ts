import fs from "fs";
import path from "path";
import QRCode from "qrcode";
import { env } from "./lib/env";
import { getAllGuests } from "./lib/sheets";

const OUTPUT_DIR = path.resolve(__dirname, "qr");

// A5 portrait, in points (1pt = 1/72 inch). A5 = 148 x 210 mm.
const CARD_WIDTH = 420;
const CARD_HEIGHT = 595;
const QR_SIZE = 200;

const COLOR_INK = "#2d2a26";
const COLOR_SAGE = "#44613e";
const COLOR_MUTED = "#8a8278";
const COLOR_PAPER = "#fffdf8";
const COLOR_LINE = "#c8bfa8";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildQrPath(matrix: { size: number; get(r: number, c: number): number }): string {
  const cell = QR_SIZE / matrix.size;
  const parts: string[] = [];
  for (let r = 0; r < matrix.size; r++) {
    for (let c = 0; c < matrix.size; c++) {
      if (matrix.get(r, c)) {
        const x = (c * cell).toFixed(3);
        const y = (r * cell).toFixed(3);
        const s = cell.toFixed(3);
        parts.push(`M${x},${y}h${s}v${s}h-${s}z`);
      }
    }
  }
  return parts.join("");
}

function renderCard(name: string, url: string, qrPath: string): string {
  const cx = CARD_WIDTH / 2;
  const qrX = cx - QR_SIZE / 2;
  const qrY = 320;
  const safeName = escapeXml(name || "");
  const safeUrl = escapeXml(url);
  const eyebrow = escapeXml(env.weddingEyebrow);
  const bride = escapeXml(env.weddingBride);
  const groom = escapeXml(env.weddingGroom);
  const dateLabel = escapeXml(env.weddingDateLabel);
  const venue = escapeXml(env.weddingVenue);
  const dear = escapeXml(env.weddingDearLabel);
  const scanLabel = escapeXml(env.weddingScanLabel);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}" width="${CARD_WIDTH}" height="${CARD_HEIGHT}">
  <style>
    .serif { font-family: 'Cormorant Garamond', 'Times New Roman', Georgia, serif; }
    .script { font-family: 'Italianno', 'Brush Script MT', cursive; }
    .sans { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
  </style>
  <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="${COLOR_PAPER}"/>
  <rect x="20" y="20" width="${CARD_WIDTH - 40}" height="${CARD_HEIGHT - 40}" fill="none" stroke="${COLOR_LINE}" stroke-width="0.6"/>
  <rect x="28" y="28" width="${CARD_WIDTH - 56}" height="${CARD_HEIGHT - 56}" fill="none" stroke="${COLOR_LINE}" stroke-width="0.3"/>

  <text x="${cx}" y="78" text-anchor="middle" class="sans" font-size="11" letter-spacing="3.5" fill="${COLOR_SAGE}" font-weight="500">${eyebrow.toUpperCase()}</text>

  <text x="${cx}" y="148" text-anchor="middle" class="serif" font-size="44" fill="${COLOR_INK}" font-weight="500">${bride}</text>
  <text x="${cx}" y="200" text-anchor="middle" class="script" font-size="56" fill="${COLOR_SAGE}">&amp;</text>
  <text x="${cx}" y="252" text-anchor="middle" class="serif" font-size="44" fill="${COLOR_INK}" font-weight="500">${groom}</text>

  <line x1="${cx - 40}" y1="276" x2="${cx + 40}" y2="276" stroke="${COLOR_LINE}" stroke-width="0.6"/>
  <text x="${cx}" y="296" text-anchor="middle" class="sans" font-size="10" letter-spacing="2.8" fill="${COLOR_MUTED}">${dateLabel.toUpperCase()}</text>

  <g transform="translate(${qrX} ${qrY})">
    <rect x="-12" y="-12" width="${QR_SIZE + 24}" height="${QR_SIZE + 24}" fill="${COLOR_PAPER}" stroke="${COLOR_LINE}" stroke-width="0.5"/>
    <path d="${qrPath}" fill="${COLOR_INK}"/>
  </g>

  <text x="${cx}" y="${qrY + QR_SIZE + 44}" text-anchor="middle" class="serif" font-size="13" font-style="italic" fill="${COLOR_MUTED}">${dear}</text>
  <text x="${cx}" y="${qrY + QR_SIZE + 72}" text-anchor="middle" class="serif" font-size="22" fill="${COLOR_INK}">${safeName}</text>

  <text x="${cx}" y="${CARD_HEIGHT - 78}" text-anchor="middle" class="sans" font-size="9" letter-spacing="2.2" fill="${COLOR_MUTED}">${scanLabel.toUpperCase()}</text>
  <text x="${cx}" y="${CARD_HEIGHT - 58}" text-anchor="middle" class="sans" font-size="8" fill="${COLOR_MUTED}">${safeUrl}</text>
  ${venue ? `<text x="${cx}" y="${CARD_HEIGHT - 38}" text-anchor="middle" class="serif" font-size="11" font-style="italic" fill="${COLOR_MUTED}">${venue}</text>` : ""}
</svg>
`;
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^\w-]+/g, "_").slice(0, 60);
}

async function main(): Promise<void> {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const guests = await getAllGuests();
  let count = 0;

  for (const guest of guests) {
    const { token, name } = guest.data;
    if (!token) continue;

    const url = `${env.inviteBaseUrl}?token=${encodeURIComponent(token)}`;

    const qr = QRCode.create(url, { errorCorrectionLevel: "M" });
    const qrPath = buildQrPath(qr.modules);

    const safeName = sanitizeFilename(name || token);
    const cardPath = path.join(OUTPUT_DIR, `${safeName}_${token}.svg`);
    fs.writeFileSync(cardPath, renderCard(name ?? "", url, qrPath));

    const pngPath = path.join(OUTPUT_DIR, `${safeName}_${token}.png`);
    await QRCode.toFile(pngPath, url, { width: 600, margin: 1 });

    console.log(`Generated invitation: ${cardPath}`);
    count++;
  }

  console.log(`Done. ${count} invitations generated in ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
