import { google } from "googleapis";
import { env } from "./env";

const auth = new google.auth.GoogleAuth({
  credentials: env.googleCredentials,
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
  ],
});

export const sheets = google.sheets({ version: "v4", auth });
export const drive = google.drive({ version: "v3", auth });
