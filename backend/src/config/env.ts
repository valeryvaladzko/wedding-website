import dotenv from "dotenv";

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
  port: Number(optional("PORT", "8000")),
  nodeEnv: optional("NODE_ENV", "development"),
  spreadsheetId: required("SPREADSHEET_ID"),
  sheetName: optional("SHEET_NAME", "Sheet1"),
  googleCredentials: JSON.parse(
    Buffer.from(required("GOOGLE_CREDENTIALS_BASE64"), "base64").toString(
      "utf8",
    ),
  ),
  corsOrigin: optional("CORS_ORIGIN", "*"),
};
