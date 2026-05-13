import dotenv from "dotenv";
import path from "path";

dotenv.config();

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optional(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

export const env = {
  port: Number(optional("PORT", "3000")),
  nodeEnv: optional("NODE_ENV", "development"),
  spreadsheetId: required("SPREADSHEET_ID"),
  sheetName: optional("SHEET_NAME", "Sheet1"),
  credentialsPath: path.resolve(
    process.cwd(),
    optional("GOOGLE_CREDENTIALS_PATH", "credentials.json"),
  ),
  corsOrigin: optional("CORS_ORIGIN", "*"),
};
