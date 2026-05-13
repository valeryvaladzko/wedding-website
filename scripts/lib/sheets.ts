import { sheets } from "./google";
import { env } from "./env";

export interface GuestRow {
  rowIndex: number;
  data: Record<string, string>;
}

export async function getAllGuests(): Promise<GuestRow[]> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: env.spreadsheetId,
    range: `${env.sheetName}!A:Z`,
  });

  const rows = (res.data.values ?? []) as string[][];
  const headers = (rows[0] ?? []) as string[];
  const data = rows.slice(1);

  return data.map((row, i) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = row[idx] ?? "";
    });
    return { rowIndex: i + 2, data: obj };
  });
}

export async function setCell(
  rowIndex: number,
  column: string,
  value: string,
): Promise<void> {
  await sheets.spreadsheets.values.update({
    spreadsheetId: env.spreadsheetId,
    range: `${env.sheetName}!${column}${rowIndex}`,
    valueInputOption: "RAW",
    requestBody: { values: [[value]] },
  });
}
