import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../backend/.env") });
dotenv.config();

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function optional(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

export const env = {
  spreadsheetId: required("SPREADSHEET_ID"),
  sheetName: optional("SHEET_NAME", "Sheet1"),
  driveParentFolderId: required("DRIVE_PARENT_FOLDER_ID"),
  inviteBaseUrl: optional("INVITE_BASE_URL", "https://yourdomain.com/invite"),
  credentialsPath: path.resolve(
    __dirname,
    "../",
    optional("GOOGLE_CREDENTIALS_PATH", "../backend/credentials.json"),
  ),
  // Used by the invitation card layout in generateQR.
  weddingBride: optional("WEDDING_BRIDE", "Anna"),
  weddingGroom: optional("WEDDING_GROOM", "Иван"),
  weddingDateLabel: optional("WEDDING_DATE_LABEL", "12 июля 2026"),
  weddingVenue: optional("WEDDING_VENUE", ""),
  weddingEyebrow: optional("WEDDING_EYEBROW", "Мы женимся"),
  weddingDearLabel: optional("WEDDING_DEAR_LABEL", "Дорогой(ая)"),
  weddingScanLabel: optional("WEDDING_SCAN_LABEL", "Отсканируйте, чтобы открыть приглашение"),
};
