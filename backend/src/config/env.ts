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
  port: Number(optional("PORT", "8000")),
  nodeEnv: optional("NODE_ENV", "development"),
  spreadsheetId: required("SPREADSHEET_ID"),
  sheetName: optional("SHEET_NAME", "Sheet1"),
  googleCredentials: {
    type: required("GOOGLE_CREDENTIALS_TYPE"),
    project_id: required("GOOGLE_CREDENTIALS_PROJECT_ID"),
    private_key_id: required("GOOGLE_CREDENTIALS_PRIVATE_KEY_ID"),
    private_key: required("GOOGLE_CREDENTIALS_PRIVATE_KEY"),
    client_email: required("GOOGLE_CREDENTIALS_CLIENT_EMAIL"),
    client_id: required("GOOGLE_CREDENTIALS_CLIENT_ID"),
    auth_uri: required("GOOGLE_CREDENTIALS_AUTH_URL"),
    token_uri: required("GOOGLE_CREDENTIALS_TOKEN_URL"),
    auth_provider_x509_cert_url: required("GOOGLE_CREDENTIALS_AUTH_PROVIDER"),
    client_x509_cert_url: required("GOOGLE_CREDENTIALS_CLIENT_CERT_URL"),
    universe_domain: required("GOOGLE_CREDENTIALS_UNIVERSE_DOMAIN"),
  },
  corsOrigin: optional("CORS_ORIGIN", "*"),
};
